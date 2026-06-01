"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { useAppSelector } from "@/app/store";
import {
  getConversationAvatar,
  getConversationName,
  getConversationReceiverId,
  isOwnMessage,
} from "@/lib/chatHelpers";
import { useGetConversationsQuery, useGetMessagesQuery } from "@/app/api/messages/chatApi";

export default function MessageSection() {
  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conversationsData } = useGetConversationsQuery();

  const conversations = conversationsData?.data || [];

  const activeConversation = conversations.find(
    (conv) => getConversationReceiverId(conv) === activeReceiverId,
  );

  const {
    data: messagesData,
    isLoading,
    isError,
  } = useGetMessagesQuery(
    { receiverId: activeReceiverId || "" },
    { skip: !activeReceiverId },
  );

  const messages = messagesData?.data || [];

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  if (!activeReceiverId) {
    return (
      <div className="overflow-y-auto bg-gray-50 px-6 py-6 h-full flex items-center justify-center">
        <p className="text-sm text-gray-500">No conversation selected.</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="overflow-y-auto bg-gray-50 px-6 py-6 h-full"
    >
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading messages...</p>
      ) : isError ? (
        <p className="text-sm text-red-500">Failed to load messages.</p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="mb-4 flex">
            {!isOwnMessage(msg) ? (
              <div className="flex gap-3 max-w-[70%]">
                <Image
                  src={getConversationAvatar(activeConversation)}
                  alt={getConversationName(activeConversation)}
                  width={36}
                  height={36}
                  className="rounded-full h-fit object-cover w-[36px]"
                />

                <div className="bg-gray-200 px-4 py-3 rounded-2xl text-sm">
                  {msg.message}
                </div>
              </div>
            ) : (
              <div className="ml-auto max-w-[70%]">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-3 rounded-2xl text-sm">
                  {msg.message}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
