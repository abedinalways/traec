
"use client";

import Image from "next/image";
import { MessageCircle, User } from "lucide-react";
import { useAppSelector } from "@/app/store";
import { getConversationAvatar, getConversationName } from "@/lib/chatHelpers";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "@/app/api/messages/chatApi";
import type { ChatUser } from "@/app/api/messages/chatApi";

const userCache = new Map<string, ChatUser>();

export default function Header() {
  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const { data, isLoading } = useGetConversationsQuery();
  const conversations = data || [];

  const { data: messagesData } = useGetMessagesQuery(
    { receiverId: activeReceiverId ? String(activeReceiverId) : "" },
    { skip: !activeReceiverId },
  );

  if (messagesData?.data && Array.isArray(messagesData.data)) {
    for (const msg of messagesData.data) {
      if (msg.sender?.id) userCache.set(String(msg.sender.id), msg.sender);
      if (msg.receiver?.id)
        userCache.set(String(msg.receiver.id), msg.receiver);
    }
  }

  const activeConversation = conversations.find((conv) => {
    const senderId = conv.sender_id ? String(conv.sender_id) : null;
    const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
    const myId = currentUserId ? String(currentUserId) : null;
    if (
      senderId &&
      myId &&
      senderId !== myId &&
      String(activeReceiverId) === senderId
    )
      return true;
    if (
      receiverId &&
      myId &&
      receiverId !== myId &&
      String(activeReceiverId) === receiverId
    )
      return true;
    return false;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[56px] items-center gap-3 border-b border-gray-200 bg-[#F0F2F5] px-4 animate-pulse">
        <div className="h-9 w-9 rounded-full bg-gray-300" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-gray-300" />
          <div className="h-3 w-16 rounded bg-gray-300" />
        </div>
      </div>
    );
  }

  if (!activeConversation) {
    return (
      <div className="flex flex-col min-h-[56px] items-center border rounded-xl justify-center gap-3  px-4">
        <div className="flex h-9 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
          <MessageCircle size={18} />
        </div>
        <div className="">
          <p className="text-md font-semibold text-gray-800 text-center">Chat Workspace</p>
          <p className="text-[10px] text-gray-400">
            Messages are private & secure.
          </p>
        </div>
      </div>
    );
  }

  const senderId = activeConversation.sender_id
    ? String(activeConversation.sender_id)
    : null;
  const receiverId = activeConversation.receiver_id
    ? String(activeConversation.receiver_id)
    : null;
  const myId = currentUserId ? String(currentUserId) : null;

  let otherId = "";
  if (senderId && myId && senderId !== myId) otherId = senderId;
  else if (receiverId && myId && receiverId !== myId) otherId = receiverId;
  else if (receiverId) otherId = receiverId;

  const cachedUser = otherId ? userCache.get(otherId) : null;
  const name = cachedUser?.name
    ? [cachedUser.name, cachedUser.last_name].filter(Boolean).join(" ") ||
    cachedUser.name
    : getConversationName(activeConversation, currentUserId);

  const cachedImg =
    cachedUser?.image || cachedUser?.avatar || cachedUser?.avatar_url;
  const avatar = cachedImg
    ? cachedImg.startsWith("http") || cachedImg.startsWith("/")
      ? cachedImg
      : `/api/image?path=${encodeURIComponent(cachedImg)}`
    : getConversationAvatar(activeConversation, currentUserId);

  return (
    <div className="flex items-center h-20 px-4 bg-[#F0F2F5] border-b border-gray-200 shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          {avatar.includes("provider-profile-img.svg") ||
          avatar.includes("placeholder-image.png") ? (
            <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-white shadow-sm">
              <User className="text-gray-400" size={20} />
            </div>
          ) : (
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="rounded-full object-cover ring-2 ring-white"
              unoptimized
            />
          )}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-white rounded-full" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-800 leading-tight">
            {name}
          </h4>
          <p className="text-xs text-gray-500">online</p>
        </div>
      </div>
    </div>
  );
}