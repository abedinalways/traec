"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MessageCircle, Sparkles } from "lucide-react";

import { useAppSelector } from "@/app/store";
import {
  formatChatTime,
  getConversationAvatar,
  getConversationName,
  getConversationReceiverId,
  isOwnMessage,
} from "@/lib/chatHelpers";
import {
  Message,
  MessageIndexData,
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "@/app/api/messages/chatApi";

// NOTE: usePusherChat() is already called in the parent layout.tsx
// Do NOT call it here — duplicate subscriptions cause double event handling

const getMessagesFromPayload = (payload?: MessageIndexData): Message[] => {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload;

  return payload.messages || [];
};

export default function MessageSection() {

  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conversationsData } = useGetConversationsQuery();

  const conversations = conversationsData?.data || [];

  const activeConversation = conversations.find(
    (conv) =>
      String(getConversationReceiverId(conv, currentUserId)) ===
      String(activeReceiverId),
  );

  const {
    data: messagesData,
    isLoading,
    isError,
  } = useGetMessagesQuery(
    { receiverId: activeReceiverId ? String(activeReceiverId) : "" },
    { skip: !activeReceiverId || activeReceiverId === "" },
  );

  const messages = getMessagesFromPayload(messagesData?.data);
  const activeName = getConversationName(activeConversation, currentUserId);
  const activeAvatar = getConversationAvatar(activeConversation, currentUserId);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  if (!activeReceiverId) {
    return (
      <div className="bg-slate-50 px-6 py-6 h-full flex items-center justify-center relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4F46E5]/5 rounded-full blur-3xl" />

        <div className="text-center relative z-10 max-w-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#4F46E5] shadow-md border border-slate-100 animate-pulse">
            <MessageCircle size={26} />
          </div>
          <h4 className="text-base font-bold text-slate-800 tracking-tight">
            Your Event Inbox
          </h4>
          <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
            Choose a provider or client conversation from the left sidebar to
            start messaging in real-time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="overflow-y-auto bg-slate-50 px-4 py-6 sm:px-6 h-full scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
    >
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`flex gap-3 items-end ${
                item % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="h-9 w-9 rounded-full bg-slate-200 animate-pulse flex-shrink-0" />
              <div
                className={`h-12 w-48 rounded-2xl bg-slate-200 animate-pulse ${
                  item % 2 === 0 ? "rounded-br-sm" : "rounded-bl-sm"
                }`}
              />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 text-xs text-red-600 flex items-center justify-center font-medium shadow-xs">
          Failed to load messages. Please reload the page.
        </div>
      ) : messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#4F46E5]/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#4F46E5] shadow-md border border-slate-100">
              <Sparkles
                size={22}
                className="animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <h4 className="text-sm font-bold text-slate-800 tracking-tight">
              Say Hello!
            </h4>
            <p className="mt-1 text-xs text-slate-400 max-w-xs leading-relaxed">
              No previous messages found. Type your first message below to spark
              the conversation.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const isOwn = isOwnMessage(msg, currentUserId, activeReceiverId);

            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                {!isOwn ? (
                  <div className="flex max-w-[82%] gap-3 sm:max-w-[70%] items-start">
                    <Image
                      src={activeAvatar}
                      alt={activeName}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow-xs flex-shrink-0"
                      unoptimized
                    />

                    <div>
                      <div className="rounded-2xl rounded-tl-md bg-white border border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-sm">
                        <p className="whitespace-pre-wrap break-words">
                          {msg.message || ""}
                        </p>
                      </div>
                      <p className="mt-1 px-1 text-[10px] font-medium text-slate-400">
                        {formatChatTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[82%] sm:max-w-[70%] flex flex-col items-end">
                    <div className="rounded-2xl rounded-tr-md bg-[#4F46E5] px-4 py-3 text-sm leading-relaxed text-white shadow-sm shadow-[#4F46E5]/10">
                      <p className="whitespace-pre-wrap break-words">
                        {msg.message || ""}
                      </p>
                    </div>
                    <p className="mt-1 px-1 text-[10px] font-medium text-slate-400 text-right">
                      {formatChatTime(msg.created_at)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
