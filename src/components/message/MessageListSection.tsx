// // "use client";

// // import Image from "next/image";
// // import { useState } from "react";
// // import { Search, SlidersHorizontal } from "lucide-react";
// // import { useChat } from "@/app/(client)/context/ChatContext";

// // export default function MessageListSection() {
// //   const { conversations, selectConversation, activeConversation } = useChat();
// //   const [activeFilter, setActiveFilter] = useState("All");

// //   return (
// //     <div className="h-full flex flex-col font-[inter]">
// //       {/* Title */}
// //       <h3 className="text-lg font-semibold mb-4">Conversations</h3>

// //       {/* Search + Filter */}
// //       <div className="relative mb-4">
// //         <Search
// //           size={16}
// //           className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Search messages..."
// //           className="w-full pl-10 pr-10 py-2 rounded-full border bg-gray-50 text-sm outline-none"
// //         />
// //         <SlidersHorizontal
// //           size={18}
// //           className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
// //         />
// //       </div>

// //       {/* Filter Tabs */}
// //       <div className="flex gap-2 mb-4 flex-wrap">
// //         {["All", "Unread", "Starred", "Spam (1)"].map((tab) => (
// //           <button
// //             key={tab}
// //             onClick={() => setActiveFilter(tab)}
// //             className={`px-4 py-1.5 text-xs rounded-full transition ${
// //               activeFilter === tab
// //                 ? "bg-red-500 text-white"
// //                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //             }`}
// //           >
// //             {tab}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Conversation List */}
// //       <div className="flex-1 overflow-y-auto pr-2">
// //         {conversations.map((conv) => {
// //           const lastMessage = conv.messages.at(-1);

// //           return (
// //             <div
// //               key={conv.id}
// //               onClick={() => selectConversation(conv.id)}
// //               className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition border-b last:border-b-0 ${
// //                 activeConversation?.id === conv.id
// //                   ? "bg-gray-100"
// //                   : "hover:bg-gray-50"
// //               }`}
// //             >
// //               {/* Avatar */}
// //               <div className="relative">
// //                 <Image
// //                   src={conv.avatar}
// //                   alt={conv.name}
// //                   width={42}
// //                   height={42}
// //                   className="rounded-full object-cover"
// //                 />
// //                 {/* Online indicator */}
// //                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
// //               </div>

// //               {/* Text Content */}
// //               <div className="flex-1 min-w-0">
// //                 <div className="flex justify-between items-center">
// //                   <p className="text-sm font-semibold truncate">{conv.name}</p>
// //                   <span className="text-xs text-gray-400">9:45 AM</span>
// //                 </div>

// //                 <p className="text-xs text-gray-500 truncate">
// //                   {lastMessage?.text || "No messages yet"}
// //                 </p>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import Image from "next/image";
// import { useMemo, useState } from "react";
// import { Search, SlidersHorizontal } from "lucide-react";
// import { useChat } from "@/app/(client)/context/ChatContext";

// const formatTime = (value?: string | null) => {
//   if (!value) return "";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "";

//   return date.toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "2-digit",
//   });
// };

// export default function MessageListSection() {
//   const {
//     conversations,
//     selectConversation,
//     activeConversation,
//     isLoadingConversations,
//     error,
//   } = useChat();

//   const [activeFilter, setActiveFilter] = useState("All");
//   const [search, setSearch] = useState("");

//   const spamCount = conversations.filter((conv) => conv.isSpam).length;

//   const filteredConversations = useMemo(() => {
//     return conversations.filter((conv) => {
//       const searchMatch =
//         conv.name.toLowerCase().includes(search.toLowerCase()) ||
//         conv.lastMessageText.toLowerCase().includes(search.toLowerCase());

//       if (!searchMatch) return false;

//       if (activeFilter === "Unread") return conv.unreadCount > 0;
//       if (activeFilter === "Starred") return conv.isStarred;
//       if (activeFilter.startsWith("Spam")) return conv.isSpam;

//       return true;
//     });
//   }, [activeFilter, conversations, search]);

//   return (
//     <div className="h-full flex flex-col font-[inter]">
//       {/* Title */}
//       <h3 className="text-lg font-semibold mb-4">Conversations</h3>

//       {/* Search + Filter */}
//       <div className="relative mb-4">
//         <Search
//           size={16}
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//         />
//         <input
//           type="text"
//           placeholder="Search messages..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-10 pr-10 py-2 rounded-full border bg-gray-50 text-sm outline-none"
//         />
//         <SlidersHorizontal
//           size={18}
//           className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
//         />
//       </div>

//       {/* Filter Tabs */}
//       <div className="flex gap-2 mb-4 flex-wrap">
//         {["All", "Unread", "Starred", `Spam (${spamCount})`].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveFilter(tab)}
//             className={`px-4 py-1.5 text-xs rounded-full transition ${
//               activeFilter === tab
//                 ? "bg-red-500 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Conversation List */}
//       <div className="flex-1 overflow-y-auto pr-2">
//         {isLoadingConversations ? (
//           <p className="text-sm text-gray-500">Loading conversations...</p>
//         ) : error ? (
//           <p className="text-sm text-red-500">{error}</p>
//         ) : filteredConversations.length === 0 ? (
//           <p className="text-sm text-gray-500">No conversations found.</p>
//         ) : (
//           filteredConversations.map((conv) => {
//             return (
//               <div
//                 key={conv.id}
//                 onClick={() => selectConversation(conv.id)}
//                 className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition border-b last:border-b-0 ${
//                   activeConversation?.id === conv.id
//                     ? "bg-gray-100"
//                     : "hover:bg-gray-50"
//                 }`}
//               >
//                 {/* Avatar */}
//                 <div className="relative">
//                   <Image
//                     src={conv.avatar}
//                     alt={conv.name}
//                     width={42}
//                     height={42}
//                     className="rounded-full object-cover"
//                   />
//                   {/* Online indicator */}
//                   {conv.online && (
//                     <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                   )}
//                 </div>

//                 {/* Text Content */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-semibold truncate">
//                       {conv.name}
//                     </p>
//                     <span className="text-xs text-gray-400">
//                       {formatTime(conv.lastMessageAt)}
//                     </span>
//                   </div>

//                   <p className="text-xs text-gray-500 truncate">
//                     {conv.lastMessageText || "No messages yet"}
//                   </p>

//                   {conv.unreadCount > 0 && (
//                     <span className="inline-flex mt-1 h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] text-white">
//                       {conv.unreadCount}
//                     </span>
//                   )}
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
import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { setActiveReceiverId } from "@/features/chat/chatSlice";
import {
  formatChatTime,
  getConversationAvatar,
  getConversationName,
  getConversationReceiverId,
  getLastMessageText,
} from "@/lib/chatHelpers";
import { useGetConversationsQuery } from "@/app/api/messages/chatApi";

export default function MessageListSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const { data, isLoading, isError } = useGetConversationsQuery();

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Sort and Deduplicate conversations by other user's ID
  const conversations = useMemo(() => {
    const rawList = data?.data || [];
    
    const sorted = [...rawList].sort((a, b) => {
      const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
      const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
      return dateB - dateA;
    });

    const seen = new Set<string>();
    const uniqueList: typeof rawList = [];

    for (const conv of sorted) {
      const rId = getConversationReceiverId(conv, currentUserId);
      if (rId && !seen.has(rId)) {
        seen.add(rId);
        uniqueList.push(conv);
      }
    }

    return uniqueList;
  }, [data?.data, currentUserId]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      const name = getConversationName(conv, currentUserId).toLowerCase();
      const lastMessage = getLastMessageText(conv).toLowerCase();
      const searchValue = search.toLowerCase();

      const searchMatch =
        name.includes(searchValue) || lastMessage.includes(searchValue);

      if (!searchMatch) return false;

      if (activeFilter === "Unread") {
        return Number(conv.unread_count || 0) > 0;
      }

      return true;
    });
  }, [activeFilter, conversations, currentUserId, search]);

  const totalUnread = useMemo(() => {
    return conversations.reduce((sum, conv) => sum + Number(conv.unread_count || 0), 0);
  }, [conversations]);

  return (
    <div className="h-full flex flex-col font-[inter] bg-slate-50/50 rounded-2xl">
      {/* Sidebar Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#4F46E5]/10 rounded-lg text-[#4F46E5]">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Messages</h3>
          </div>
          {totalUnread > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-[#4F46E5] text-white rounded-full shadow-sm animate-bounce">
              {totalUnread} new
            </span>
          )}
        </div>

        {/* Search Field */}
        <div className="relative mb-4 group">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4F46E5] transition-colors duration-200"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 bg-white text-sm outline-none shadow-sm focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all duration-300 placeholder-slate-400 text-slate-700"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 mb-2 bg-slate-100 p-1 rounded-xl">
          {["All", "Unread"].map((tab) => {
            const isTabActive = activeFilter === tab;
            const count = tab === "Unread" ? totalUnread : conversations.length;
            
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  isTabActive
                    ? "bg-white text-[#4F46E5] shadow-sm font-semibold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
              >
                {tab}
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                  isTabActive ? "bg-[#4F46E5]/10 text-[#4F46E5]" : "bg-slate-200 text-slate-600"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversations Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 space-y-3">
            <div className="w-8 h-8 border-3 border-[#4F46E5]/20 border-t-[#4F46E5] rounded-full animate-spin" />
            <p className="text-xs font-medium text-slate-400">Loading conversations...</p>
          </div>
        ) : isError ? (
          <div className="py-12 text-center px-4">
            <p className="text-xs font-medium text-red-500 bg-red-50 py-2 rounded-xl">Failed to load conversations.</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="py-16 text-center px-4 flex flex-col items-center justify-center space-y-2">
            <p className="text-sm font-medium text-slate-400">No chats found</p>
            <p className="text-xs text-slate-400/80">Start a chat from a profile page</p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const receiverId = getConversationReceiverId(conv, currentUserId);
            const isActive = String(activeReceiverId) === String(receiverId);
            const unreadCount = Number(conv.unread_count || 0);

            return (
              <div
                key={`${receiverId}-${conv.id || ""}`}
                onClick={() => {
                  if (!receiverId) return;

                  dispatch(setActiveReceiverId(receiverId));
                  router.push(`/messages/${receiverId}`);
                }}
                className={`group flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-b border-slate-100/50 last:border-b-0 relative ${
                  isActive 
                    ? "bg-white shadow-sm border-l-4 border-l-[#4F46E5] pl-2" 
                    : "hover:bg-white hover:shadow-xs"
                }`}
              >
                {/* Avatar with Status indicator */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={getConversationAvatar(conv, currentUserId)}
                    alt={getConversationName(conv, currentUserId)}
                    width={44}
                    height={44}
                    className="rounded-full object-cover w-[44px] h-[44px] ring-2 ring-slate-100 group-hover:scale-105 transition-transform duration-200"
                    unoptimized
                  />

                  {/* Pulsing online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                </div>

                {/* Info & Text Preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className={`text-sm truncate ${isActive ? "font-bold text-[#4F46E5]" : "font-semibold text-slate-800"} group-hover:text-[#4F46E5] transition-colors`}>
                      {getConversationName(conv, currentUserId)}
                    </p>

                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                      {formatChatTime(conv.updated_at || conv.created_at)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs truncate flex-1 ${unreadCount > 0 ? "font-semibold text-slate-800" : "text-slate-400"}`}>
                      {getLastMessageText(conv)}
                    </p>

                    {unreadCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4F46E5] px-1.5 text-[9px] font-bold text-white shadow-xs">
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
