"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { setActiveReceiverId } from "@/features/chat/chatSlice";
import {
  formatChatTime,
  getConversationAvatar,
  getConversationName,
  getLastMessageText,
} from "@/lib/chatHelpers";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "@/app/api/messages/chatApi";
import {
  useGetChatUnreadCountQuery,
  useMarkNotificationReadMutation,
} from "@/app/api/notification/notificationApi";
import type { Conversation, ChatUser } from "@/app/api/messages/chatApi";

const userCache = new Map<string, ChatUser>();

export default function MessageListSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const { data, isLoading, isError, refetch } = useGetConversationsQuery();
  const { data: chatUnreadData, refetch: refetchChatUnread } = useGetChatUnreadCountQuery();
  const [markNotificationRead] = useMarkNotificationReadMutation();

  const conversationsList: Conversation[] = data || [];

  const { data: messagesData } = useGetMessagesQuery(
    { receiverId: activeReceiverId ? String(activeReceiverId) : "" },
    { skip: !activeReceiverId },
  );

  useEffect(() => {
    if (!messagesData?.data) return;
    const msgs = messagesData.data;
    if (!Array.isArray(msgs)) return;
    for (const msg of msgs) {
      if (msg.sender?.id) userCache.set(String(msg.sender.id), msg.sender);
      if (msg.receiver?.id)
        userCache.set(String(msg.receiver.id), msg.receiver);
    }
  }, [messagesData]);

  useEffect(() => {
    for (const conv of conversationsList) {
      if (conv.sender?.id) userCache.set(String(conv.sender.id), conv.sender);
      if (conv.receiver?.id)
        userCache.set(String(conv.receiver.id), conv.receiver);
    }
  }, [conversationsList]);

  useEffect(() => {
    refetchChatUnread();
  }, [refetchChatUnread]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const parseConvTime = (dateStr?: string | null) => {
    if (!dateStr) return 0;
    let normalized = dateStr.replace(" ", "T");
    if (!normalized.endsWith("Z") && !normalized.includes("+") && !normalized.match(/-\d{2}:\d{2}$/)) {
      normalized += "Z";
    }
    return new Date(normalized).getTime() || 0;
  };

  const conversations = useMemo(() => {
    const map = new Map<string, Conversation>();
    for (const conv of conversationsList) {
      const senderId = conv.sender_id ? String(conv.sender_id) : null;
      const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
      const myId = currentUserId ? String(currentUserId) : null;

      let otherId = "";
      if (senderId && myId && senderId !== myId) otherId = senderId;
      else if (receiverId && myId && receiverId !== myId) otherId = receiverId;
      else if (receiverId) otherId = receiverId;
      else if (senderId) otherId = senderId;
      if (!otherId) continue;

      const existing = map.get(otherId);
      if (!existing) {
        map.set(otherId, conv);
      } else {
        const existingTime = parseConvTime(existing.updated_at || existing.created_at);
        const convTime = parseConvTime(conv.updated_at || conv.created_at);
        if (convTime > existingTime) map.set(otherId, conv);
      }
    }
    return Array.from(map.values()).sort((a, b) => {
      const dateA = parseConvTime(a.updated_at || a.created_at);
      const dateB = parseConvTime(b.updated_at || b.created_at);
      return dateB - dateA;
    });
  }, [conversationsList, currentUserId]);

  const chatUnreadMap = useMemo(() => {
    const map = new Map<string, number>();
    if (chatUnreadData?.data) {
      for (const item of chatUnreadData.data) {
        map.set(String(item.sender_id), item.unread_count);
      }
    }
    return map;
  }, [chatUnreadData]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      const name = getConversationName(conv, currentUserId).toLowerCase();
      const lastMessage = getLastMessageText(conv).toLowerCase();
      const searchValue = search.toLowerCase();
      if (!name.includes(searchValue) && !lastMessage.includes(searchValue))
        return false;
      if (activeFilter === "Unread") {
        const senderId = conv.sender_id ? String(conv.sender_id) : null;
        const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
        const myId = currentUserId ? String(currentUserId) : null;
        let otherId = "";
        if (senderId && myId && senderId !== myId) otherId = senderId;
        else if (receiverId && myId && receiverId !== myId) otherId = receiverId;

        const unreadCount = Number(chatUnreadMap.get(otherId) ?? conv.unread_count ?? 0);
        return unreadCount > 0;
      }
      return true;
    });
  }, [activeFilter, conversations, currentUserId, search, chatUnreadMap]);

  const totalUnread = useMemo(() => {
    let sum = 0;
    for (const conv of conversations) {
      const senderId = conv.sender_id ? String(conv.sender_id) : null;
      const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
      const myId = currentUserId ? String(currentUserId) : null;
      let otherId = "";
      if (senderId && myId && senderId !== myId) otherId = senderId;
      else if (receiverId && myId && receiverId !== myId) otherId = receiverId;
      else if (receiverId) otherId = receiverId;
      else if (senderId) otherId = senderId;

      const unreadCount = chatUnreadMap.get(otherId) ?? 0;
      sum += Number(unreadCount);
    }
    return sum;
  }, [conversations, currentUserId, chatUnreadMap]);

  const handleConversationClick = async (otherId: string) => {
    dispatch(setActiveReceiverId(otherId));
    router.push(`/messages/${otherId}`);

    if (otherId) {
      try {
        await markNotificationRead({ sender_id: Number(otherId) }).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F0F2F5] border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-[#111B21]">Chats</h3>
        </div>
        {totalUnread > 0 && (
          <span className="px-2 py-0.5 text-xs font-semibold bg-[#25D366] text-white rounded-full">
            {totalUnread} new
          </span>
        )}
      </div>

      {/* Search + tabs */}
      <div className="px-3 py-2 bg-[#F0F2F5] space-y-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 bg-white rounded-lg text-sm outline-none focus:bg-white border-b-2 border-transparent focus:border-[#00A884] transition-colors shadow-sm"
          />
        </div>

        <div className="flex gap-1 bg-gray-200 p-1 rounded-xl">
          {["All", "Unread"].map((tab) => {
            const isTabActive = activeFilter === tab;
            const count = tab === "Unread" ? totalUnread : conversations.length;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${isTabActive
                    ? "bg-[#D9FDD3] text-[#111B21] shadow-sm"
                    : "text-[#54656F] hover:bg-gray-300/50"
                  }`}
              >
                {tab}
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${isTabActive
                      ? "bg-[#25D366] text-white"
                      : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-xs font-medium text-gray-400">
              Loading conversations...
            </p>
          </div>
        ) : isError ? (
          <div className="py-12 text-center">
            <p className="text-xs font-medium text-red-500 bg-red-50 py-2 rounded-xl">
              Failed to load.
            </p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-gray-400">No chats found</p>
            <p className="text-xs text-gray-400/80">
              Start a chat from a profile page
            </p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const senderId = conv.sender_id ? String(conv.sender_id) : null;
            const receiverId = conv.receiver_id
              ? String(conv.receiver_id)
              : null;
            const myId = currentUserId ? String(currentUserId) : null;

            let otherId = "";
            if (senderId && myId && senderId !== myId) otherId = senderId;
            else if (receiverId && myId && receiverId !== myId)
              otherId = receiverId;
            else if (receiverId) otherId = receiverId;
            else if (senderId) otherId = senderId;

            const isActive =
              activeReceiverId && String(activeReceiverId) === otherId;
            const unreadCount = chatUnreadMap.get(otherId) ?? Number(conv.unread_count ?? 0);
            const lastMsg = getLastMessageText(conv);

            const cachedUser = otherId ? userCache.get(otherId) : null;
            const displayName = cachedUser?.name
              ? [cachedUser.name, cachedUser.last_name]
                .filter(Boolean)
                .join(" ") || cachedUser.name
              : getConversationName(conv, currentUserId);

            const cachedImg =
              cachedUser?.image || cachedUser?.avatar || cachedUser?.avatar_url;
            const displayAvatar = cachedImg
              ? cachedImg.startsWith("http") || cachedImg.startsWith("/")
                ? cachedImg
                : `/api/image?path=${encodeURIComponent(cachedImg)}`
              : getConversationAvatar(conv, currentUserId);

            return (
              <div
                key={`conv-${otherId}`}
                onClick={() => handleConversationClick(otherId)}
                className={`flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-[#F5F6F6] transition-colors ${isActive ? "bg-[#F0F2F5]" : "bg-white"
                  }`}
              >
                <div className="relative flex-shrink-0">
                  {displayAvatar.includes("provider-profile-img.svg") ||
                  displayAvatar.includes("placeholder-image.png") ? (
                    <div className="w-[44px] h-[44px] rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-white shadow-sm">
                      <User className="text-gray-400" size={24} />
                    </div>
                  ) : (
                    <Image
                      src={displayAvatar}
                      alt={displayName}
                      width={44}
                      height={44}
                      className="rounded-full object-cover ring-2 ring-white shadow-sm"
                      unoptimized
                    />
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-white rounded-full" />
                </div>

                <div className="flex-1 min-w-0 border-b border-gray-100 pb-3 pt-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <p
                      className={`text-sm font-semibold truncate ${isActive ? "text-[#111B21]" : "text-[#111B21]"}`}
                    >
                      {displayName}
                    </p>
                    <span className={`text-[12px] whitespace-nowrap ml-2 ${unreadCount > 0 ? "text-[#25D366] font-medium" : "text-[#667781]"}`}>
                      {formatChatTime(conv.updated_at || conv.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-[13px] truncate flex-1 ${unreadCount > 0 ? "font-semibold text-[#111B21]" : "text-[#667781]"}`}
                    >
                      {lastMsg}
                    </p>
                    {unreadCount > 0 && (
                      <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#25D366] px-1.5 text-[11px] font-bold text-white shadow-sm">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}