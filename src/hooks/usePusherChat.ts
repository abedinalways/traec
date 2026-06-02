"use client";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Pusher from "pusher-js";
import { getPusherClient } from "@/lib/pusherClient";
import { useAppDispatch } from "@/app/store";
import type { RootState } from "@/app/store";
import {
  chatApi,
  dedupeMessages,
  getMessagesFromIndexData,
  Message,
} from "@/app/api/messages/chatApi";
import { getConversationReceiverId } from "@/lib/chatHelpers";

// Common event names for Laravel broadcasting - adjust based on your backend
const eventNames = [
  "message.sent",
  // "MessageSent",
  // "SendMessage",
  // "Illuminate\\Notifications\\Events\\NotificationSent",
  // "notification.sent",
];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const asStringOrNumber = (value: unknown): string | number | undefined => {
  return typeof value === "string" || typeof value === "number"
    ? value
    : undefined;
};

const asString = (value: unknown): string | undefined => {
  return typeof value === "string" ? value : undefined;
};

const looksLikeMessage = (value: unknown): value is Record<string, unknown> => {
  if (!isRecord(value)) return false;

  return (
    ("sender_id" in value || "senderId" in value || "user_id" in value) &&
    ("message" in value || "text" in value || "body" in value)
  );
};

const normalizeRealtimeMessage = (payload: unknown): Message | null => {
  const candidates: unknown[] = [payload];

  if (isRecord(payload)) {
    candidates.push(
      payload.data,
      payload.message,
      payload.chat,
      payload.data && isRecord(payload.data) ? payload.data.message : null,
      payload.data && isRecord(payload.data) ? payload.data.chat : null,
      payload.message && isRecord(payload.message)
        ? payload.message.data
        : null,
    );
  }

  const raw = candidates.find(looksLikeMessage);

  if (!isRecord(raw)) return null;

  const id =
    asStringOrNumber(raw.id) ||
    `realtime-${asStringOrNumber(raw.sender_id) !== undefined ? asStringOrNumber(raw.sender_id) : "sender"}-${
      asStringOrNumber(raw.receiver_id) !== undefined
        ? asStringOrNumber(raw.receiver_id)
        : "receiver"
    }-${asString(raw.created_at) !== undefined ? asString(raw.created_at) : Date.now()}`;

  const normalized: Message = {
    id,
    sender_id: asStringOrNumber(raw.sender_id),
    receiver_id: asStringOrNumber(raw.receiver_id),
    conversation_id: asStringOrNumber(raw.conversation_id) ?? null,
    message:
      asString(raw.message) ?? asString(raw.text) ?? asString(raw.body) ?? "",
    type: asString(raw.type) ?? "text",
    created_at: asString(raw.created_at) ?? null,
    updated_at: asString(raw.updated_at) ?? null,
    sender: isRecord(raw.sender)
      ? (raw.sender as unknown as Message["sender"])
      : null,
    receiver: isRecord(raw.receiver)
      ? (raw.receiver as unknown as Message["receiver"])
      : null,
  };

  return normalized;
};

export default function usePusherChat() {
  const dispatch = useAppDispatch();
  const activeReceiverId = useSelector(
    (state: RootState) => state.chat.activeReceiverId,
  );
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  // Use a ref for activeReceiverId to avoid stale closures in the event handler
  // without needing to restart the Pusher subscription.
  const activeReceiverIdRef = useRef(activeReceiverId);
  useEffect(() => {
    activeReceiverIdRef.current = activeReceiverId;
  }, [activeReceiverId]);

  useEffect(() => {
    if (!currentUserId) return;
    if (typeof window === "undefined") return;

    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

    if (!key) {
      console.error("Pusher error: NEXT_PUBLIC_PUSHER_APP_KEY is missing");
      return;
    }

    if (!cluster) {
      console.error("Pusher error: NEXT_PUBLIC_PUSHER_APP_CLUSTER is missing");
      return;
    }

    let pusher: Pusher;

    try {
      pusher = getPusherClient();
    } catch (error) {
      console.error("[Pusher] initialization failed:", error);
      return;
    }

    // IMPROVED: Try multiple common Laravel channel formats
    // Laravel typically uses: App.Models.User.{id} or private-user.{id}
    const possibleChannels = [
      `private-user.${currentUserId}`, // Our current format
      `App.Models.User.${currentUserId}`, // Laravel default format
      `user.${currentUserId}`, // Alternative format
      `private-${currentUserId}`, // Another alternative
    ];

    console.log("[Pusher] Attempting to subscribe to channels:", possibleChannels);

    // Try each channel until one works
    let pusherChannel: Pusher.Channel | null = null;
    let successfulChannel: string | null = null;

    for (const channelName of possibleChannels) {
      try {
        console.log("[Pusher] Trying to subscribe to:", channelName);
        const channel = pusher.subscribe(channelName);
        
        // Set up a temporary success listener
        const successListener = () => {
          console.log("[Pusher] Successfully subscribed to:", channelName);
          successfulChannel = channelName;
          // Clean up the temporary listener
          channel.unbind("pusher:subscription_succeeded", successListener);
        };
        
        channel.bind("pusher:subscription_succeeded", successListener);
        
        // Also set up error listener
        const errorListener = (error: unknown) => {
          console.error("[Pusher] Subscription error for", channelName, error);
          channel.unbind("pusher:subscription_error", errorListener);
        };
        
        channel.bind("pusher:subscription_error", errorListener);
        
        // If we get here without immediate error, assume it's working for now
        // The actual success/error will be handled by the listeners
        pusherChannel = channel;
        break; // Exit loop if we successfully subscribed
      } catch (subscribeError) {
        console.error("[Pusher] Failed to subscribe to", channelName, subscribeError);
        continue; // Try next channel
      }
    }

    if (!pusherChannel) {
      console.error("[Pusher] Failed to subscribe to any channel");
      return;
    }

    console.log("[Pusher] Using channel:", successfulChannel);

    const handleRealtimeMessage = (payload: unknown) => {
      console.log("[Pusher] Real-time message received:", payload);

      const message = normalizeRealtimeMessage(payload);

      // Help debugging: if normalization fails, we need to know why
      if (!message) {
        console.warn(
          "[Pusher] Failed to normalize message. Check payload structure:",
          payload,
        );
        dispatch(chatApi.util.invalidateTags(["Chat"]));
        return;
      }

      const senderId = message.sender_id ? String(message.sender_id) : "";
      const receiverId = message.receiver_id ? String(message.receiver_id) : "";
      const userId = currentUserId ? String(currentUserId) : "";
      const activeId = activeReceiverIdRef.current
        ? String(activeReceiverIdRef.current)
        : "";

      // Determine which conversation this message belongs to relative to the current user
      let receiverIdForQuery: string = "";

      if (userId && senderId === userId && receiverId) {
        // Current user sent the message; update the cache for the recipient
        receiverIdForQuery = receiverId;
      } else if (userId && receiverId === userId && senderId) {
        // Current user received the message; update the cache for the sender
        receiverIdForQuery = senderId;
      } else if (
        activeId &&
        (senderId === activeId || receiverId === activeId)
      ) {
        // Fallback for missing user context
        receiverIdForQuery = String(activeId);
      }

      // Update messages for this conversation
      if (receiverIdForQuery) {
        dispatch(
          chatApi.util.updateQueryData(
            "getMessages",
            { receiverId: String(receiverIdForQuery) },
            (draft) => {
              const existingMessages = getMessagesFromIndexData(draft.data);

              // Don't add if message already exists
              if (
                existingMessages.some(
                  (m) => String(m.id) === String(message.id),
                )
              )
                return;

              const nextMessages = dedupeMessages([
                ...existingMessages,
                message,
              ]);

              if (Array.isArray(draft.data)) {
                draft.data = nextMessages;
              } else if (draft.data) {
                draft.data.messages = nextMessages;
              }
            },
          ),
        );
      }

      // Update conversation list
      dispatch(
        chatApi.util.updateQueryData("getConversations", undefined, (draft) => {
          const conversations = draft.data || [];
          const matchedConversation = conversations.find(
            (conversation) =>
              String(getConversationReceiverId(conversation, currentUserId)) ===
              receiverIdForQuery,
          );

          if (!matchedConversation) {
            const otherUser =
              message.sender_id &&
              String(message.sender_id) !== String(currentUserId)
                ? message.sender
                : message.receiver;

            const newConv = {
              id:
                message.conversation_id ||
                `temp-${receiverIdForQuery}-${Date.now()}`,
              sender_id: message.sender_id,
              receiver_id: message.receiver_id,
              last_message: message,
              message: message.message,
              created_at: message.created_at || new Date().toISOString(),
              updated_at: message.created_at || new Date().toISOString(),
              unread_count: activeId === receiverIdForQuery ? 0 : 1,
              sender: message.sender,
              receiver: message.receiver,
              user: otherUser,
            };

            draft.data = [newConv, ...conversations];
          } else {
            matchedConversation.last_message = message;
            matchedConversation.message = message.message;
            matchedConversation.updated_at =
              message.created_at || new Date().toISOString();

            if (activeId !== receiverIdForQuery && receiverIdForQuery !== "") {
              matchedConversation.unread_count =
                Number(matchedConversation.unread_count || 0) + 1;
            }
          }
        }),
      );

      // DO NOT call invalidateTags here immediately!
      // invalidateTags triggers a network refetch. If the backend hasn't persisted
      // the message yet (race condition), the refetch returns stale data and
      // OVERWRITES our optimistic update, making the real-time message disappear.
      //
      // Instead, schedule a delayed refetch for eventual consistency.
      setTimeout(() => {
        dispatch(chatApi.util.invalidateTags([{ type: "Chat" as const }]));
        if (receiverIdForQuery) {
          dispatch(
            chatApi.util.invalidateTags([
              { type: "Chat" as const, id: String(receiverIdForQuery) },
            ]),
          );
        }
      }, 3000); // 3 second delay gives backend time to persist
    };

    // Bind to multiple possible event names
    eventNames.forEach((name) => {
      console.log(`[Pusher] Binding to event: "${name}"`);
      pusherChannel.bind(name, handleRealtimeMessage);
    });

    // CRITICAL DEBUGGING: This will show you EVERY event coming through Pusher
    pusherChannel.bind_global((name: string, data: any) => {
      if (name.startsWith("pusher:")) return;
      console.log(`[Pusher Debug] Event Name: "${name}"`, data);
      // If the event name here doesn't match our list, still process it
      if (!eventNames.includes(name)) handleRealtimeMessage(data);
    });

    pusherChannel.bind("pusher:subscription_succeeded", () => {
      console.log("Pusher subscribed successfully to:", successfulChannel);
    });

    pusherChannel.bind("pusher:subscription_error", (error: unknown) => {
      console.error("Pusher subscription error on:", successfulChannel, error);
    });

    // Unsubscribe on cleanup
    return () => {
      console.log("Cleaning up Pusher subscription");
      if (pusherChannel) {
        eventNames.forEach((name) => {
          pusherChannel.unbind(name, handleRealtimeMessage);
        });
        pusher.unsubscribe(successfulChannel || possibleChannels[0]);
      }
    };
  }, [dispatch, currentUserId]); // Removed activeReceiverId to prevent constant re-subscriptions
}