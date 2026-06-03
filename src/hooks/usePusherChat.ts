"use client";
import { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import Pusher from "pusher-js";
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
      payload.data,
      payload.message,
      payload.chat,
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
    id:
      asStringOrNumber(raw.id) ||
      `rt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
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
  useEffect(() => { activeRef.current = activeReceiverId; }, [activeReceiverId]);

  const handleMessage = useCallback(
    (payload: unknown) => {
      console.log("[Pusher] Event received:", payload);

      const msg = normalizePayload(payload);
      if (!msg) {
        console.warn("[Pusher] Could not normalize payload:", payload);
        dispatch(chatApi.util.invalidateTags(["Chat"]));
        return;
      }

      const senderId = msg.sender_id ? String(msg.sender_id) : "";
      const receiverId = msg.receiver_id ? String(msg.receiver_id) : "";
      const myId = currentUserId ? String(currentUserId) : "";
      const activeId = activeRef.current ? String(activeRef.current) : "";

      let targetReceiverId = "";
      if (myId && senderId === myId && receiverId) {
        targetReceiverId = receiverId;
      } else if (myId && receiverId === myId && senderId) {
        targetReceiverId = senderId;
      } else if (activeId && (senderId === activeId || receiverId === activeId)) {
        targetReceiverId = activeId;
      }

      if (!targetReceiverId) return;

      // Update messages cache — draft.data is ApiResponse<MessageIndexData>
      dispatch(
        chatApi.util.updateQueryData(
          "getMessages",
          { receiverId: targetReceiverId },
          (draft: any) => {
            const apiData = draft.data; // ApiResponse<MessageIndexData>
            const existingMessages = getMessagesFromIndexData(apiData?.data);
            if (existingMessages.some((m: Message) => String(m.id) === String(msg.id))) return;
            const next = dedupeMessages([...existingMessages, msg]);
            if (Array.isArray(apiData?.data)) {
              apiData.data = next;
            } else if (apiData?.data) {
              apiData.data = { ...apiData.data, messages: next };
            } else {
              apiData.data = next;
            }
          },
        ),
      );

      // Update conversations cache — draft.data is ApiResponse<Conversation[]>
      dispatch(
        chatApi.util.updateQueryData("getConversations", undefined, (draft: any) => {
          const apiData = draft.data; // ApiResponse<Conversation[]>
          const conversations: any[] = apiData?.data || [];
          const idx = conversations.findIndex(
            (c: any) =>
              String(c.sender_id) === targetReceiverId ||
              String(c.receiver_id) === targetReceiverId,
          );

          if (idx === -1) {
            const otherUser = String(msg.sender_id) !== myId ? msg.sender : msg.receiver;
            conversations.unshift({
              id: msg.conversation_id || `temp-${targetReceiverId}-${Date.now()}`,
              sender_id: msg.sender_id,
              receiver_id: msg.receiver_id,
              last_message: msg,
              message: msg.message,
              created_at: msg.created_at || new Date().toISOString(),
              updated_at: msg.created_at || new Date().toISOString(),
              unread_count: activeId === targetReceiverId ? 0 : 1,
              sender: msg.sender,
              receiver: msg.receiver,
              user: otherUser,
            });
          } else {
            conversations[idx].last_message = msg;
            conversations[idx].message = msg.message;
            conversations[idx].updated_at = msg.created_at || new Date().toISOString();
            if (activeId !== targetReceiverId) {
              conversations[idx].unread_count = Number(conversations[idx].unread_count || 0) + 1;
            }
            const [item] = conversations.splice(idx, 1);
            conversations.unshift(item);
          }

          apiData.data = conversations;
        }),
      );

      // Delayed refetch for consistency
      setTimeout(() => {
        dispatch(chatApi.util.invalidateTags(["Chat", { type: "Chat" as const, id: targetReceiverId }]));
      }, 2000);

      console.log(`[Pusher] Message processed for receiver ${targetReceiverId}:`, msg.id);
    },
    [dispatch, currentUserId],
  );

  useEffect(() => {
    if (!currentUserId || typeof window === "undefined") return;

    const pusher = getPusherClient();
    const channelName = "conversation";
    console.log("[Pusher] Subscribing to:", channelName);
    const channel = pusher.subscribe(channelName);

    channel.bind("message.sent", handleMessage);

    channel.bind_global((name: string, data: any) => {
      if (name.startsWith("pusher:")) return;
      console.log(`[Pusher Global] Event: "${name}"`, data);
    });

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("[Pusher] Subscribed to:", channelName);
    });

    channel.bind("pusher:subscription_error", (status: any) => {
      console.error("[Pusher] Subscription error:", status);
    });

    return () => {
      channel.unbind("message.sent", handleMessage);
      pusher.unsubscribe(channelName);
      console.log("[Pusher] Unsubscribed from:", channelName);
    };
  }, [currentUserId, handleMessage]);
}
