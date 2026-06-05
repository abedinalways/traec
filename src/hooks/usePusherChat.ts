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
    console.log("[Pusher] Event received RAW:", JSON.stringify(payload)?.slice(0, 2000));

    const msg = normalizePayload(payload);
    if (!msg) {
      console.warn("[Pusher] Could not normalize payload:", payload);
      d(chatApi.util.invalidateTags(["Chat"]));
      return;
    }

    console.log("[Pusher] Normalized message:", { id: msg.id, sender_id: msg.sender_id, receiver_id: msg.receiver_id, message: msg.message, sender: msg.sender, receiver: msg.receiver });

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

    // Update messages cache
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
    } catch {
      console.log("[Pusher] No existing messages cache for:", targetReceiverId);
    }

    // Update conversations cache — this is what drives the sidebar real-time update
    d(
      chatApi.util.updateQueryData("getConversations", undefined, (draft: any) => {
        const conversations: any[] = draft.data || [];

        // Find by matching sender_id OR receiver_id against targetReceiverId
        const idx = conversations.findIndex(
          (c: any) =>
            String(c.sender_id) === targetReceiverId ||
            String(c.receiver_id) === targetReceiverId,
        );

        const now = msg.created_at || new Date().toISOString();

        // Determine who the other user is (not me)
        const otherUser = String(msg.sender_id) !== myId ? msg.sender : msg.receiver;

        if (idx === -1) {
          // New conversation from Pusher — create entry
          // Store the OTHER user as `sender` so getOtherUserFromConversation resolves correctly
          conversations.unshift({
            id: msg.conversation_id || `temp-${targetReceiverId}-${Date.now()}`,
            sender_id: targetReceiverId,
            receiver_id: myId,
            message: msg.message,
            created_at: now,
            updated_at: now,
            unread_count: activeId === targetReceiverId ? 0 : 1,
            sender: otherUser,
            receiver: String(msg.sender_id) === myId ? msg.receiver : msg.sender,
            type: msg.type || "text",
          });
        } else {
          // Update existing conversation
          conversations[idx].message = msg.message;
          conversations[idx].updated_at = now;
          // Update sender info if available (so name/avatar resolves)
          if (otherUser) {
            conversations[idx].sender = otherUser;
          }
          if (activeId !== targetReceiverId) {
            conversations[idx].unread_count = Number(conversations[idx].unread_count || 0) + 1;
          }
          // Move to top
          const [item] = conversations.splice(idx, 1);
          conversations.unshift(item);
        }

        draft.data = conversations;
      }),
    );

    console.log(`[Pusher] Message processed for receiver ${targetReceiverId}:`, msg.id);
  };

  useEffect(() => {
    if (!currentUserId || typeof window === "undefined") return;

    const pusher = getPusherClient();
    const channelName = `conversation.${currentUserId}`;

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

  // Fallback polling
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
