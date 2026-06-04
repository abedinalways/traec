"use client";
import { useEffect, useRef } from "react";
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
  const userIdRef = useRef(currentUserId);
  const dispatchRef = useRef(dispatch);

  useEffect(() => { activeRef.current = activeReceiverId; }, [activeReceiverId]);
  useEffect(() => { userIdRef.current = currentUserId; }, [currentUserId]);
  useEffect(() => { dispatchRef.current = dispatch; }, [dispatch]);

  const handleMessageRef = useRef<(payload: unknown) => void>(() => {});

  handleMessageRef.current = (payload: unknown) => {
    const d = dispatchRef.current;
    console.log("[Pusher] Event received:", payload);

    const msg = normalizePayload(payload);
    if (!msg) {
      console.warn("[Pusher] Could not normalize payload:", payload);
      d(chatApi.util.invalidateTags(["Chat"]));
      return;
    }

    const senderId = msg.sender_id ? String(msg.sender_id) : "";
    const receiverId = msg.receiver_id ? String(msg.receiver_id) : "";
    const myId = userIdRef.current ? String(userIdRef.current) : "";
    const activeId = activeRef.current ? String(activeRef.current) : "";

    let targetReceiverId = "";
    if (myId && senderId === myId && receiverId) {
      targetReceiverId = receiverId;
    } else if (myId && receiverId === myId && senderId) {
      targetReceiverId = senderId;
    } else if (activeId && (senderId === activeId || receiverId === activeId)) {
      targetReceiverId = activeId;
    }

    if (!targetReceiverId) {
      console.log("[Pusher] No targetReceiverId, invalidating all chat tags");
      d(chatApi.util.invalidateTags(["Chat"]));
      return;
    }

    // Update messages cache for the target receiver
    try {
      d(
        chatApi.util.updateQueryData(
          "getMessages",
          { receiverId: targetReceiverId },
          (draft: any) => {
            const indexData = draft.data;
            const existingMessages = getMessagesFromIndexData(indexData);

            if (existingMessages.some((m: Message) => String(m.id) === String(msg.id))) {
              return;
            }

            const next = dedupeMessages([...existingMessages, msg]);

            if (Array.isArray(indexData)) {
              draft.data = next;
            } else if (indexData && typeof indexData === "object") {
              draft.data = { ...indexData, messages: next };
            } else {
              draft.data = next;
            }

            console.log("[Pusher] Messages cache updated for:", targetReceiverId, "total:", next.length);
          },
        ),
      );
    } catch (e) {
      console.log("[Pusher] No existing messages cache for:", targetReceiverId, "(conversation not opened yet)");
    }

    // Update conversations cache
    try {
      d(
        chatApi.util.updateQueryData("getConversations", undefined, (draft: any) => {
          const conversations: any[] = draft.data || [];
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

          draft.data = conversations;
        }),
      );
    } catch (e) {
      console.log("[Pusher] No existing conversations cache yet");
    }

    console.log(`[Pusher] Message processed for receiver ${targetReceiverId}:`, msg.id);
  };

  useEffect(() => {
    if (!currentUserId || typeof window === "undefined") return;

    const pusher = getPusherClient();
    const channelName = "conversation";

    console.log("[Pusher] Subscribing to:", channelName, "for user:", currentUserId);

    const channel = pusher.subscribe(channelName);

    const boundHandler = (payload: unknown) => handleMessageRef.current(payload);
    channel.bind("message.sent", boundHandler);

    channel.bind_global((name: string, data: any) => {
      if (name.startsWith("pusher:")) return;
      console.log(`[Pusher Global] Event: "${name}"`, data);
    });

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("[Pusher] Successfully subscribed to:", channelName);
    });

    channel.bind("pusher:subscription_error", (status: any) => {
      console.error("[Pusher] Subscription error:", status);
    });

    return () => {
      channel.unbind("message.sent", boundHandler);
      pusher.unsubscribe(channelName);
      console.log("[Pusher] Unsubscribed from:", channelName);
    };
  }, [currentUserId]);

  // Fallback: poll for new messages every 5 seconds when a conversation is active
  useEffect(() => {
    if (!activeReceiverId || !currentUserId) return;

    const interval = setInterval(() => {
      console.log("[Poll] Refreshing messages for:", activeReceiverId);
      dispatch(chatApi.util.invalidateTags([
        { type: "Chat" as const, id: String(activeReceiverId) },
      ]));
    }, 5000);

    return () => clearInterval(interval);
  }, [activeReceiverId, currentUserId, dispatch]);
}
