"use client";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getPusherClient } from "@/lib/pusherClient";
import { useAppDispatch } from "@/app/store";
import type { RootState } from "@/app/store";
import { chatApi, dedupeMessages, getMessagesFromIndexData, useGetConversationsQuery, type Message } from "@/app/api/messages/chatApi";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const asStringOrNumber = (value: unknown): string | number | undefined =>
  typeof value === "string" || typeof value === "number" ? value : undefined;

const asString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

const normalizePayload = (payload: unknown): Message | null => {
  const candidates: unknown[] = [payload];
  if (isRecord(payload)) {
    candidates.push(
      payload.data, payload.message, payload.chat,
      isRecord(payload.data) ? payload.data.message : null,
      isRecord(payload.data) ? payload.data.chat : null,
    );
  }
  const raw = candidates.find(
    (v) =>
      isRecord(v) &&
      ("sender_id" in v || "senderId" in v || "user_id" in v),
  );
  if (!isRecord(raw)) return null;

  // Extract attachments if present
  let attachments: any[] | undefined;
  if (isRecord(raw) && raw.attachments && Array.isArray(raw.attachments)) {
    attachments = raw.attachments.map((att: any) => ({
      id: att.id,
      message_id: att.message_id,
      file_path: att.file_path,
      file_name: att.file_name,
      file_type: att.file_type,
      file_size: att.file_size,
      created_at: att.created_at || null,
      updated_at: att.updated_at || null,
    }));
  }

  return {
    id: asStringOrNumber(raw.id) || `rt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    sender_id: asStringOrNumber(raw.sender_id),
    receiver_id: asStringOrNumber(raw.receiver_id),
    conversation_id: asStringOrNumber(raw.conversation_id) ?? null,
    message: asString(raw.message) ?? asString(raw.text) ?? asString(raw.body) ?? "",
    type: asString(raw.type) ?? "text",
    created_at: asString(raw.created_at) ?? null,
    updated_at: asString(raw.updated_at) ?? null,
    sender: isRecord(raw.sender) ? raw.sender as unknown as Message["sender"] : null,
    receiver: isRecord(raw.receiver) ? raw.receiver as unknown as Message["receiver"] : null,
    attachments,
  };
};

export function PusherListener() {
  const dispatch = useAppDispatch();
  const activeReceiverId = useSelector((s: RootState) => s.chat.activeReceiverId);
  const currentUserId = useSelector((s: RootState) => s.auth.user?.id);
  const { data: conversationsData } = useGetConversationsQuery();

  const activeRef = useRef(activeReceiverId);
  const userIdRef = useRef(currentUserId);
  const dispatchRef = useRef(dispatch);

  useEffect(() => { activeRef.current = activeReceiverId; }, [activeReceiverId]);
  useEffect(() => { userIdRef.current = currentUserId; }, [currentUserId]);
  useEffect(() => { dispatchRef.current = dispatch; }, [dispatch]);

  const handleMessage = useCallback((payload: unknown) => {
    const d = dispatchRef.current;
    const myId = userIdRef.current ? String(userIdRef.current) : "";
    const activeId = activeRef.current ? String(activeRef.current) : "";

    console.log("[Pusher] ✅ Event received:", JSON.stringify(payload)?.slice(0, 1000));

    const msg = normalizePayload(payload);
    if (!msg) {
      d(chatApi.util.invalidateTags(["Chat"]));
      return;
    }

    const senderId = msg.sender_id ? String(msg.sender_id) : "";
    const receiverId = msg.receiver_id ? String(msg.receiver_id) : "";

    let targetReceiverId = "";
    if (myId && senderId === myId && receiverId) targetReceiverId = receiverId;
    else if (myId && receiverId === myId && senderId) targetReceiverId = senderId;
    else if (activeId && (senderId === activeId || receiverId === activeId)) targetReceiverId = activeId;

    if (!targetReceiverId) {
      d(chatApi.util.invalidateTags(["Chat"]));
      return;
    }

    try {
      d(chatApi.util.updateQueryData("getMessages", { receiverId: targetReceiverId }, (draft: any) => {
        const indexData = draft.data;
        const existing = getMessagesFromIndexData(indexData);
        if (existing.some((m: Message) => String(m.id) === String(msg.id))) return;
        const next = dedupeMessages([...existing, msg]);
        if (Array.isArray(indexData)) draft.data = next;
        else if (indexData && typeof indexData === "object") draft.data = { ...indexData, messages: next };
        else draft.data = next;
      }));
    } catch { /* no cache */ }

    try {
      d(chatApi.util.updateQueryData("getConversations", undefined, (draft: any) => {
        if (!Array.isArray(draft)) return;
        const idx = draft.findIndex(
          (c: any) => String(c.sender_id) === targetReceiverId || String(c.receiver_id) === targetReceiverId,
        );
        const now = msg.created_at || new Date().toISOString();
        const otherUser = String(msg.sender_id) !== myId ? msg.sender : msg.receiver;

        if (idx === -1) {
          draft.unshift({
            id: msg.conversation_id || `temp-${targetReceiverId}`,
            sender_id: targetReceiverId,
            receiver_id: myId,
            message: msg.message,
            created_at: now, updated_at: now,
            unread_count: activeId === targetReceiverId ? 0 : 1,
            sender: otherUser,
            type: msg.type || "text",
            attachments: msg.attachments,
            last_message: msg,
          });
        } else {
          draft[idx].message = msg.message;
          draft[idx].updated_at = now;
          draft[idx].attachments = msg.attachments;
          draft[idx].last_message = msg;
          if (otherUser) draft[idx].sender = otherUser;
          if (activeId !== targetReceiverId) {
            draft[idx].unread_count = Number(draft[idx].unread_count || 0) + 1;
          }
          const [item] = draft.splice(idx, 1);
          draft.unshift(item);
        }
      }));
    } catch {
      d(chatApi.util.invalidateTags(["Chat"]));
    }
  }, []);

  useEffect(() => {
    if (!currentUserId || typeof window === "undefined") return;

    const pusher = getPusherClient();
    const subscribed: Array<{ name: string; ref: any }> = [];

    // Collect all conversation IDs
    const convIds = new Set<string>();
    if (Array.isArray(conversationsData)) {
      for (const c of conversationsData) {
        if (c.conversation_id) convIds.add(String(c.conversation_id));
        if (c.id) convIds.add(String(c.id));
      }
    }

    // Subscribe to each conversation channel (backend broadcasts on conversation.{conversationId})
    for (const id of convIds) {
      const chName = `conversation.${id}`;
      try {
        const ch = pusher.subscribe(chName);
        ch.bind("message.sent", handleMessage);
        ch.bind_global((name: string, data: any) => {
          // console.log(`[Pusher][${chName}] ${name}:`, JSON.stringify(data)?.slice(0, 300));
        });
        subscribed.push({ name: chName, ref: ch });
      } catch { /* ignore */ }
    }

    // Also subscribe to user channel
    const userChName = `conversation.${currentUserId}`;
    try {
      const userCh = pusher.subscribe(userChName);
      userCh.bind("message.sent", handleMessage);
      userCh.bind_global((name: string, data: any) => {
        console.log(`[Pusher][${userChName}] ${name}:`, JSON.stringify(data)?.slice(0, 300));
      });
      subscribed.push({ name: userChName, ref: userCh });
    } catch { /* ignore */ }

    // console.log(`[Pusher] Subscribed to ${subscribed.length} channels:`, subscribed.map(s => s.name));

    return () => {
      for (const { name, ref: ch } of subscribed) {
        try { ch.unbind("message.sent", handleMessage); pusher.unsubscribe(name); } catch { /* */ }
      }
    };
  }, [currentUserId, handleMessage, conversationsData]);

  return null;
}
