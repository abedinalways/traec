"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  ApiResponse,
  ChatAttachment,
  Conversation,
  Message,
  MessageIndexData,
  chatApi,
  dedupeMessages,
  getMessagesFromIndexData,
  useGetConversationsQuery,
} from "@/app/api/messages/chatApi";
import { notificationApi } from "@/app/api/notification/notificationApi";

import { useAppDispatch } from "@/app/store";
import type { RootState } from "@/app/store";
import { getPusherClient } from "@/lib/pusherClient";
import { useSelector } from "react-redux";
import type { Channel } from "pusher-js";

const isRecord = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null;

const asString = (val: unknown): string | null =>
  typeof val === "string" ? val : null;

const asStringOrNumber = (val: unknown): string | number | null =>
  typeof val === "string" || typeof val === "number" ? val : null;

const normalizePayload = (rawPayload: unknown): Message | null => {
  if (!isRecord(rawPayload)) return null;

  const raw = isRecord(rawPayload.message)
    ? rawPayload.message
    : isRecord(rawPayload.data)
      ? rawPayload.data
      : rawPayload;

  // Extract attachments if present
  let attachments: ChatAttachment[] | undefined;
  if (isRecord(raw) && raw.attachments && Array.isArray(raw.attachments)) {
    attachments = (raw.attachments as Record<string, unknown>[]).map((att) => ({
      id: asStringOrNumber(att.id) ?? undefined,
      message_id: asStringOrNumber(att.message_id) ?? undefined,
      file_path: asString(att.file_path) ?? undefined,
      file_name: asString(att.file_name) ?? undefined,
      file_type: asString(att.file_type) ?? undefined,
      file_size: asStringOrNumber(att.file_size) ?? undefined,
      created_at: asString(att.created_at),
      updated_at: asString(att.updated_at),
    }));
  }

  return {
    id:
      asStringOrNumber(raw.id) ||
      `rt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    sender_id: asStringOrNumber(raw.sender_id) ?? undefined,
    receiver_id: asStringOrNumber(raw.receiver_id) ?? undefined,
    conversation_id: asStringOrNumber(raw.conversation_id),
    message:
      asString(raw.message) ?? asString(raw.text) ?? asString(raw.body) ?? "",
    type: asString(raw.type) ?? "text",
    created_at: asString(raw.created_at),
    updated_at: asString(raw.updated_at),
    sender: isRecord(raw.sender)
      ? (raw.sender as unknown as Message["sender"])
      : null,
    receiver: isRecord(raw.receiver)
      ? (raw.receiver as unknown as Message["receiver"])
      : null,
    attachments,
  };
};

export function PusherListener() {
  const dispatch = useAppDispatch();
  const activeReceiverId = useSelector(
    (s: RootState) => s.chat.activeReceiverId,
  );
  const currentUserId = useSelector((s: RootState) => s.auth.user?.id);
  const { data: conversationsData } = useGetConversationsQuery();

  const activeRef = useRef(activeReceiverId);
  const userIdRef = useRef(currentUserId);
  const dispatchRef = useRef(dispatch);

  useEffect(() => {
    activeRef.current = activeReceiverId;
  }, [activeReceiverId]);
  useEffect(() => {
    userIdRef.current = currentUserId;
  }, [currentUserId]);
  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  const handleMessage = useCallback((payload: unknown) => {
    const d = dispatchRef.current;
    const myId = userIdRef.current ? String(userIdRef.current) : "";
    const activeId = activeRef.current ? String(activeRef.current) : "";

    const msg = normalizePayload(payload);
    if (!msg) {
      d(chatApi.util.invalidateTags(["Chat"]));
      d(notificationApi.util.invalidateTags(["Notifications"]));
      return;
    }

    const senderId = msg.sender_id ? String(msg.sender_id) : "";
    const receiverId = msg.receiver_id ? String(msg.receiver_id) : "";

    let targetReceiverId = "";
    if (myId && senderId === myId && receiverId) targetReceiverId = receiverId;
    else if (myId && receiverId === myId && senderId)
      targetReceiverId = senderId;
    else if (activeId && (senderId === activeId || receiverId === activeId))
      targetReceiverId = activeId;

    if (!targetReceiverId) {
      d(chatApi.util.invalidateTags(["Chat"]));
      return;
    }

    try {
      d(
        chatApi.util.updateQueryData(
          "getMessages",
          { receiverId: targetReceiverId },
          (draft: ApiResponse<MessageIndexData>) => {
            const indexData = draft.data;
            const existing = getMessagesFromIndexData(indexData);
            if (existing.some((m: Message) => String(m.id) === String(msg.id)))
              return;
            const next = dedupeMessages([...existing, msg]);
            if (Array.isArray(indexData)) draft.data = next;
            else if (indexData && typeof indexData === "object")
              draft.data = { ...indexData, messages: next };
            else draft.data = next;
          },
        ),
      );
    } catch {
      /* no cache */
    }

    try {
      d(
        chatApi.util.updateQueryData(
          "getConversations",
          undefined,
          (draft: Conversation[]) => {
            if (!Array.isArray(draft)) return;
            const idx = draft.findIndex(
              (c: Conversation) =>
                String(c.sender_id) === targetReceiverId ||
                String(c.receiver_id) === targetReceiverId,
            );
            const now = msg.created_at || new Date().toISOString();
            const otherUser =
              String(msg.sender_id) !== myId ? msg.sender : msg.receiver;

            if (idx === -1) {
              draft.unshift({
                id: msg.conversation_id || `temp-${targetReceiverId}`,
                sender_id: targetReceiverId,
                receiver_id: myId,
                message: msg.message,
                created_at: now,
                updated_at: now,
                unread_count: activeId === targetReceiverId ? 0 : 1,
                sender: otherUser,
                last_message: msg,
              });
            } else {
              draft[idx].message = msg.message;
              draft[idx].updated_at = now;
              draft[idx].last_message = msg;
              if (otherUser) draft[idx].sender = otherUser;
              if (activeId !== targetReceiverId) {
                draft[idx].unread_count =
                  Number(draft[idx].unread_count || 0) + 1;
              }
              const [item] = draft.splice(idx, 1);
              draft.unshift(item);
            }
          },
        ),
      );
    } catch {
      d(chatApi.util.invalidateTags(["Chat"]));
    }
  }, []);

  useEffect(() => {
    if (!currentUserId || typeof window === "undefined") return;

    const pusher = getPusherClient();
    if (!pusher) return;
    const subscribed: Array<{ name: string; ref: Channel }> = [];

    // Collect all conversation IDs
    const convIds = new Set<string>();
    if (Array.isArray(conversationsData)) {
      for (const c of conversationsData) {
        if (c.conversation_id) convIds.add(String(c.conversation_id));
        if (c.id) convIds.add(String(c.id));
      }
    }

    // Subscribe to each conversation channel
    for (const id of convIds) {
      const chName = `conversation.${id}`;
      try {
        const ch = pusher.subscribe(chName);
        ch.bind("message.sent", handleMessage);
        subscribed.push({ name: chName, ref: ch });
      } catch {
        /* ignore */
      }
    }

    // Also subscribe to user channel
    const userChName = `conversation.${currentUserId}`;
    try {
      const userCh = pusher.subscribe(userChName);
      userCh.bind("message.sent", handleMessage);
      subscribed.push({ name: userChName, ref: userCh });
    } catch {
      /* ignore */
    }

    return () => {
      for (const { name, ref: ch } of subscribed) {
        try {
          ch.unbind("message.sent", handleMessage);
          pusher.unsubscribe(name);
        } catch {
          /* ignore */
        }
      }
    };
  }, [currentUserId, handleMessage, conversationsData]);

  return null;
}
