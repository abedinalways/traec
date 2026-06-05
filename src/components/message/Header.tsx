"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { useAppSelector } from "@/app/store";
import {
  getConversationAvatar,
  getConversationName,
  getConversationReceiverId,
} from "@/lib/chatHelpers";
import { useGetConversationsQuery, useGetMessagesQuery } from "@/app/api/messages/chatApi";
import type { ChatUser } from "@/app/api/messages/chatApi";

// Shared user cache
const userCache = new Map<string, ChatUser>();

export default function Header() {
  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const { data, isLoading } = useGetConversationsQuery();
  const conversations = data || [];

  // Fetch messages to populate user cache
  const { data: messagesData } = useGetMessagesQuery(
    { receiverId: activeReceiverId ? String(activeReceiverId) : "" },
    { skip: !activeReceiverId },
  );

  // Populate user cache from messages
  if (messagesData?.data && Array.isArray(messagesData.data)) {
    for (const msg of messagesData.data) {
      if (msg.sender?.id) userCache.set(String(msg.sender.id), msg.sender);
      if (msg.receiver?.id) userCache.set(String(msg.receiver.id), msg.receiver);
    }
  }

  const activeConversation = conversations.find((conv) => {
    const senderId = conv.sender_id ? String(conv.sender_id) : null;
    const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
    const myId = currentUserId ? String(currentUserId) : null;

    if (senderId && myId && senderId !== myId && String(activeReceiverId) === senderId) return true;
    if (receiverId && myId && receiverId !== myId && String(activeReceiverId) === receiverId) return true;
    return false;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[74px] items-center gap-3 border-b border-slate-100 bg-white px-6 py-3.5 shadow-xs animate-pulse">
        <div className="h-11 w-11 rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-3 w-20 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!activeConversation) {
    return (
      <div className="flex min-h-[74px] items-center gap-3 border-b border-slate-100 bg-white px-6 py-3.5 shadow-xs">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-[#4F46E5] border border-slate-100">
          <MessageCircle size={20} />
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">
            {activeReceiverId ? "New Conversation" : "Chat Workspace"}
          </p>
          <p className="text-[10px] font-medium text-slate-400">
            Messages are private & secure.
          </p>
        </div>
      </div>
    );
  }

  // Determine other user ID
  const senderId = activeConversation.sender_id ? String(activeConversation.sender_id) : null;
  const receiverId = activeConversation.receiver_id ? String(activeConversation.receiver_id) : null;
  const myId = currentUserId ? String(currentUserId) : null;

  let otherId = "";
  if (senderId && myId && senderId !== myId) {
    otherId = senderId;
  } else if (receiverId && myId && receiverId !== myId) {
    otherId = receiverId;
  } else if (receiverId) {
    otherId = receiverId;
  }

  // Try to get name/avatar from user cache first
  const cachedUser = otherId ? userCache.get(otherId) : null;
  const name = cachedUser?.name
    ? [cachedUser.name, cachedUser.last_name].filter(Boolean).join(" ") || cachedUser.name
    : getConversationName(activeConversation, currentUserId);

  const cachedImg = cachedUser?.image || cachedUser?.avatar || cachedUser?.avatar_url;
  const avatar = cachedImg
    ? (cachedImg.startsWith("http") || cachedImg.startsWith("/") ? cachedImg : `/api/image?path=${encodeURIComponent(cachedImg)}`)
    : getConversationAvatar(activeConversation, currentUserId);

  return (
    <div className="flex min-h-[74px] items-center justify-between border-b border-slate-100 bg-white px-6 py-3.5 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={avatar}
            alt={name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100 shadow-xs"
            unoptimized
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
        </div>

        <div className="min-w-0">
          <h4 className="truncate font-bold text-slate-800 text-sm tracking-tight leading-tight">
            {name}
          </h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-semibold text-slate-400">Active Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
