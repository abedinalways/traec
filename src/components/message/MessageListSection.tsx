// "use client";

// import Image from "next/image";
// import { useEffect, useMemo, useState } from "react";
// import { Search, Sparkles } from "lucide-react";
// import { useRouter } from "next/navigation";

// import { useAppDispatch, useAppSelector } from "@/app/store";
// import { setActiveReceiverId } from "@/features/chat/chatSlice";
// import {
//   formatChatTime,
//   getConversationAvatar,
//   getConversationName,
//   getConversationReceiverId,
//   getLastMessageText,
//   getMessagePreview,
// } from "@/lib/chatHelpers";
// import { useGetConversationsQuery, useGetMessagesQuery } from "@/app/api/messages/chatApi";
// import type { Conversation, ChatUser } from "@/app/api/messages/chatApi";

// // Module-level user cache populated from API data
// const userCache = new Map<string, ChatUser>();

// export default function MessageListSection() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const activeReceiverId = useAppSelector((state) => state.chat.activeReceiverId);
//   const currentUserId = useAppSelector((state) => state.auth.user?.id);

//   const { data, isLoading, isError } = useGetConversationsQuery();
//   const conversationsList: Conversation[] = data || [];

//   // Fetch messages for active conversation to populate user names/avatars
//   const { data: messagesData } = useGetMessagesQuery(
//     { receiverId: activeReceiverId ? String(activeReceiverId) : "" },
//     { skip: !activeReceiverId },
//   );

//   // Populate user cache from messages API
//   useEffect(() => {
//     if (!messagesData?.data) return;
//     const msgs = messagesData.data;
//     if (!Array.isArray(msgs)) return;
//     for (const msg of msgs) {
//       if (msg.sender?.id) userCache.set(String(msg.sender.id), msg.sender);
//       if (msg.receiver?.id) userCache.set(String(msg.receiver.id), msg.receiver);
//     }
//   }, [messagesData]);

//   // Also populate from conversations list
//   useEffect(() => {
//     for (const conv of conversationsList) {
//       if (conv.sender?.id) userCache.set(String(conv.sender.id), conv.sender);
//       if (conv.receiver?.id) userCache.set(String(conv.receiver.id), conv.receiver);
//     }
//   }, [conversationsList]);

//   const [activeFilter, setActiveFilter] = useState("All");
//   const [search, setSearch] = useState("");

//   // Deduplicate and sort conversations
//   const conversations = useMemo(() => {
//     const map = new Map<string, Conversation>();

//     for (const conv of conversationsList) {
//       const senderId = conv.sender_id ? String(conv.sender_id) : null;
//       const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
//       const myId = currentUserId ? String(currentUserId) : null;

//       let otherId = "";
//       if (senderId && myId && senderId !== myId) otherId = senderId;
//       else if (receiverId && myId && receiverId !== myId) otherId = receiverId;
//       else if (receiverId) otherId = receiverId;
//       else if (senderId) otherId = senderId;
//       if (!otherId) continue;

//       const existing = map.get(otherId);
//       if (!existing) {
//         map.set(otherId, conv);
//       } else {
//         const existingTime = new Date(existing.updated_at || existing.created_at || 0).getTime();
//         const convTime = new Date(conv.updated_at || conv.created_at || 0).getTime();
//         if (convTime > existingTime) map.set(otherId, conv);
//       }
//     }

//     return Array.from(map.values()).sort((a, b) => {
//       const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
//       const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
//       return dateB - dateA;
//     });
//   }, [conversationsList, currentUserId]);

//   const filteredConversations = useMemo(() => {
//     return conversations.filter((conv) => {
//       const name = getConversationName(conv, currentUserId).toLowerCase();
//       const lastMessage = getLastMessageText(conv).toLowerCase();
//       const searchValue = search.toLowerCase();
//       if (!name.includes(searchValue) && !lastMessage.includes(searchValue)) return false;
//       if (activeFilter === "Unread") return Number(conv.unread_count || 0) > 0;
//       return true;
//     });
//   }, [activeFilter, conversations, currentUserId, search]);

//   const totalUnread = useMemo(() => {
//     return conversations.reduce((sum, conv) => sum + Number(conv.unread_count || 0), 0);
//   }, [conversations]);

//   return (
//     <div className="h-full flex flex-col font-[inter] bg-slate-50/50 rounded-2xl">
//       <div className="p-4 pb-2">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 bg-[#4F46E5]/10 rounded-lg text-[#4F46E5]">
//               <Sparkles size={18} className="animate-pulse" />
//             </div>
//             <h3 className="text-lg font-bold text-slate-800 tracking-tight">Messages</h3>
//           </div>
//           {totalUnread > 0 && (
//             <span className="px-2 py-0.5 text-xs font-semibold bg-[#4F46E5] text-white rounded-full shadow-sm animate-bounce">
//               {totalUnread} new
//             </span>
//           )}
//         </div>

//         <div className="relative mb-4 group">
//           <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4F46E5] transition-colors duration-200" />
//           <input
//             type="text"
//             placeholder="Search conversations..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 bg-white text-sm outline-none shadow-sm focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all duration-300 placeholder-slate-400 text-slate-700"
//           />
//         </div>

//         <div className="flex gap-1.5 mb-2 bg-slate-100 p-1 rounded-xl">
//           {["All", "Unread"].map((tab) => {
//             const isTabActive = activeFilter === tab;
//             const count = tab === "Unread" ? totalUnread : conversations.length;
//             return (
//               <button
//                 key={tab}
//                 onClick={() => setActiveFilter(tab)}
//                 className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
//                   isTabActive
//                     ? "bg-white text-[#4F46E5] shadow-sm font-semibold"
//                     : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
//                 }`}
//               >
//                 {tab}
//                 <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
//                   isTabActive ? "bg-[#4F46E5]/10 text-[#4F46E5]" : "bg-slate-200 text-slate-600"
//                 }`}>
//                   {count}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-12 px-4 space-y-3">
//             <div className="w-8 h-8 border-3 border-[#4F46E5]/20 border-t-[#4F46E5] rounded-full animate-spin" />
//             <p className="text-xs font-medium text-slate-400">Loading conversations...</p>
//           </div>
//         ) : isError ? (
//           <div className="py-12 text-center px-4">
//             <p className="text-xs font-medium text-red-500 bg-red-50 py-2 rounded-xl">Failed to load conversations.</p>
//           </div>
//         ) : filteredConversations.length === 0 ? (
//           <div className="py-16 text-center px-4 flex flex-col items-center justify-center space-y-2">
//             <p className="text-sm font-medium text-slate-400">No chats found</p>
//             <p className="text-xs text-slate-400/80">Start a chat from a profile page</p>
//           </div>
//         ) : (
//           filteredConversations.map((conv) => {
//             const senderId = conv.sender_id ? String(conv.sender_id) : null;
//             const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
//             const myId = currentUserId ? String(currentUserId) : null;

//             let otherId = "";
//             if (senderId && myId && senderId !== myId) otherId = senderId;
//             else if (receiverId && myId && receiverId !== myId) otherId = receiverId;
//             else if (receiverId) otherId = receiverId;
//             else if (senderId) otherId = senderId;

//             const isActive = activeReceiverId && String(activeReceiverId) === otherId;
//             const unreadCount = Number(conv.unread_count || 0);
//             const lastMsg = getLastMessageText(conv);

//             // Resolve name: user cache first, then conversation data
//             const cachedUser = otherId ? userCache.get(otherId) : null;
//             const displayName = cachedUser?.name
//               ? [cachedUser.name, cachedUser.last_name].filter(Boolean).join(" ") || cachedUser.name
//               : getConversationName(conv, currentUserId);

//             // Resolve avatar: user cache first, then conversation data
//             const cachedImg = cachedUser?.image || cachedUser?.avatar || cachedUser?.avatar_url;
//             const displayAvatar = cachedImg
//               ? (cachedImg.startsWith("http") || cachedImg.startsWith("/") ? cachedImg : `/api/image?path=${encodeURIComponent(cachedImg)}`)
//               : getConversationAvatar(conv, currentUserId);

//             return (
//               <div
//                 key={`conv-${otherId}`}
//                 onClick={() => {
//                   if (!otherId) return;
//                   dispatch(setActiveReceiverId(otherId));
//                   router.push(`/messages/${otherId}`);
//                 }}
//                 className={`group flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-b border-slate-100/50 last:border-b-0 relative ${
//                   isActive
//                     ? "bg-white shadow-sm border-l-4 border-l-[#4F46E5] pl-2"
//                     : "hover:bg-white hover:shadow-xs"
//                 }`}
//               >
//                 <div className="relative flex-shrink-0">
//                   <Image
//                     src={displayAvatar}
//                     alt={displayName}
//                     width={44}
//                     height={44}
//                     className="rounded-full object-cover w-[44px] h-[44px] ring-2 ring-slate-100 group-hover:scale-105 transition-transform duration-200"
//                     unoptimized
//                   />
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-center mb-1">
//                     <p className={`text-sm truncate max-w-[140px] ${isActive ? "font-bold text-[#4F46E5]" : "font-semibold text-slate-800"} group-hover:text-[#4F46E5] transition-colors`}>
//                       {displayName}
//                     </p>
//                     <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
//                       {formatChatTime(conv.updated_at || conv.created_at)}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-2">
//                     <p className={`text-xs truncate flex-1 ${unreadCount > 0 ? "font-semibold text-slate-800" : "text-slate-400"}`}>
//                       {lastMsg}
//                     </p>
//                     {unreadCount > 0 && (
//                       <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4F46E5] px-1.5 text-[9px] font-bold text-white shadow-xs">
//                         {unreadCount}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
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
import type { Conversation, ChatUser } from "@/app/api/messages/chatApi";

const userCache = new Map<string, ChatUser>();

export default function MessageListSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const { data, isLoading, isError } = useGetConversationsQuery();
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

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

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
        const existingTime = new Date(
          existing.updated_at || existing.created_at || 0,
        ).getTime();
        const convTime = new Date(
          conv.updated_at || conv.created_at || 0,
        ).getTime();
        if (convTime > existingTime) map.set(otherId, conv);
      }
    }
    return Array.from(map.values()).sort((a, b) => {
      const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
      const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
      return dateB - dateA;
    });
  }, [conversationsList, currentUserId]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      const name = getConversationName(conv, currentUserId).toLowerCase();
      const lastMessage = getLastMessageText(conv).toLowerCase();
      const searchValue = search.toLowerCase();
      if (!name.includes(searchValue) && !lastMessage.includes(searchValue))
        return false;
      if (activeFilter === "Unread") return Number(conv.unread_count || 0) > 0;
      return true;
    });
  }, [activeFilter, conversations, currentUserId, search]);

  const totalUnread = useMemo(() => {
    return conversations.reduce(
      (sum, conv) => sum + Number(conv.unread_count || 0),
      0,
    );
  }, [conversations]);

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F0F2F5] border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500">
            <Sparkles size={18} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Messages</h3>
        </div>
        {totalUnread > 0 && (
          <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500 text-white rounded-full">
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
            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-200"
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
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isTabActive
                    ? "bg-white text-indigo-500 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                    isTabActive
                      ? "bg-indigo-100 text-indigo-500"
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
            const unreadCount = Number(conv.unread_count || 0);
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
                onClick={() => {
                  if (!otherId) return;
                  dispatch(setActiveReceiverId(otherId));
                  router.push(`/messages/${otherId}`);
                }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  isActive ? "bg-[#F0F2F5]" : "bg-white"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={displayAvatar}
                    alt={displayName}
                    width={44}
                    height={44}
                    className="rounded-full object-cover ring-2 ring-white shadow-sm"
                    unoptimized
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p
                      className={`text-sm font-semibold truncate ${isActive ? "text-indigo-500" : "text-gray-800"}`}
                    >
                      {displayName}
                    </p>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                      {formatChatTime(conv.updated_at || conv.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs truncate flex-1 ${unreadCount > 0 ? "font-semibold text-gray-800" : "text-gray-500"}`}
                    >
                      {lastMsg}
                    </p>
                    {unreadCount > 0 && (
                      <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-500 px-1.5 text-[9px] font-bold text-white shadow-sm">
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