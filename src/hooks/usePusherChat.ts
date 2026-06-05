"use client";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getPusherClient } from "@/lib/pusherClient";
import { useAppDispatch } from "@/app/store";
import type { RootState } from "@/app/store";
import { chatApi, dedupeMessages, getMessagesFromIndexData, type Message } from "@/app/api/messages/chatApi";

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
      ("sender_id" in v || "senderId" in v || "user_id" in v) &&
      ("message" in v || "text" in v || "body" in v),
  );
  if (!isRecord(raw)) return null;
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
  };
};

export default function usePusherChat() {
  const dispatch = useAppDispatch();
  const activeReceiverId = useSelector((s: RootState) => s.chat.activeReceiverId);
  const currentUserId = useSelector((s: RootState) => s.auth.user?.id);

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

    // Update messages cache
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

    // Update conversations cache (sidebar real-time update)
    try {
      d(chatApi.util.updateQueryData("getConversations", undefined, (draft: any) => {
        const conversations: any[] = draft.data || [];
        const idx = conversations.findIndex(
          (c: any) => String(c.sender_id) === targetReceiverId || String(c.receiver_id) === targetReceiverId,
        );
        const now = msg.created_at || new Date().toISOString();
        const otherUser = String(msg.sender_id) !== myId ? msg.sender : msg.receiver;

        if (idx === -1) {
          conversations.unshift({
            id: msg.conversation_id || `temp-${targetReceiverId}`,
            sender_id: targetReceiverId,
            receiver_id: myId,
            message: msg.message,
            created_at: now, updated_at: now,
            unread_count: activeId === targetReceiverId ? 0 : 1,
            sender: otherUser,
            type: msg.type || "text",
          });
        } else {
          conversations[idx].message = msg.message;
          conversations[idx].updated_at = now;
          if (otherUser) conversations[idx].sender = otherUser;
          if (activeId !== targetReceiverId) {
            conversations[idx].unread_count = Number(conversations[idx].unread_count || 0) + 1;
          }
          const [item] = conversations.splice(idx, 1);
          conversations.unshift(item);
        }
        draft.data = conversations;
      }));
    } catch {
      d(chatApi.util.invalidateTags(["Chat"]));
    }
  }, []);

  useEffect(() => {
    if (!currentUserId || typeof window === "undefined") return;

    const pusher = getPusherClient();
    const channel = pusher.subscribe(`conversation.${currentUserId}`);

    channel.bind("message.sent", handleMessage);
    channel.bind("pusher:subscription_succeeded", () => {});
    channel.bind("pusher:subscription_error", () => {});

    return () => {
      channel.unbind("message.sent", handleMessage);
      channel.unbind("pusher:subscription_succeeded");
      channel.unbind("pusher:subscription_error");
      pusher.unsubscribe(`conversation.${currentUserId}`);
    };
  }, [currentUserId, handleMessage]);

  // Polling fallback for conversations sidebar
  useEffect(() => {
    if (!activeReceiverId || !currentUserId) return;
    const interval = setInterval(() => {
      dispatch(chatApi.util.invalidateTags(["Chat"]));
    }, 3000);
    return () => clearInterval(interval);
  }, [activeReceiverId, currentUserId, dispatch]);
}
