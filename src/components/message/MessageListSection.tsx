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
import { Search, SlidersHorizontal } from "lucide-react";
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

  const { data, isLoading, isError } = useGetConversationsQuery();

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const conversations = data?.data || [];

  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      const name = getConversationName(conv).toLowerCase();
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
  }, [activeFilter, conversations, search]);

  return (
    <div className="h-full flex flex-col font-[inter]">
      <h3 className="text-lg font-semibold mb-4">Conversations</h3>

      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2 rounded-full border bg-gray-50 text-sm outline-none"
        />

        <SlidersHorizontal
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        />
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "Unread", "Starred", "Spam (0)"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              activeFilter === tab
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading conversations...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Failed to load conversations.</p>
        ) : filteredConversations.length === 0 ? (
          <p className="text-sm text-gray-500">No conversations found.</p>
        ) : (
          filteredConversations.map((conv) => {
            const receiverId = getConversationReceiverId(conv);
            const isActive = activeReceiverId === receiverId;

            return (
              <div
                key={`${receiverId}-${conv.id || ""}`}
                onClick={() => {
                  if (!receiverId) return;

                  dispatch(setActiveReceiverId(receiverId));
                  router.push(`/messages/${receiverId}`);
                }}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition border-b last:border-b-0 ${
                  isActive ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Image
                    src={getConversationAvatar(conv)}
                    alt={getConversationName(conv)}
                    width={42}
                    height={42}
                    className="rounded-full object-cover w-[42px] h-[42px]"
                  />

                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold truncate">
                      {getConversationName(conv)}
                    </p>

                    <span className="text-xs text-gray-400">
                      {formatChatTime(conv.updated_at || conv.created_at)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 truncate">
                    {getLastMessageText(conv)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}