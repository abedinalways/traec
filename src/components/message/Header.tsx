"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { useAppSelector } from "@/app/store";
import {
  getConversationAvatar,
  getConversationName,
  getConversationReceiverId,
} from "@/lib/chatHelpers";
import { useGetConversationsQuery } from "@/app/api/messages/chatApi";

export default function Header() {
  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const { data } = useGetConversationsQuery();

  const conversations = data?.data || [];

  const activeConversation = conversations.find(
    (conv) => getConversationReceiverId(conv, currentUserId) === activeReceiverId,
  );

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
          <p className="text-[10px] font-medium text-slate-400">Messages are private & secure.</p>
        </div>
      </div>
    );
  }

  const name = getConversationName(activeConversation, currentUserId);
  const avatar = getConversationAvatar(activeConversation, currentUserId);

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
          {/* Status dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
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
