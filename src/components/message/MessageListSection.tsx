"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useChat } from "@/app/(client)/context/ChatContext";

export default function MessageListSection() {
  const { conversations, selectConversation, activeConversation } = useChat();
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="h-full flex flex-col font-[inter]">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4">Conversations</h3>

      {/* Search + Filter */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full pl-10 pr-10 py-2 rounded-full border bg-gray-50 text-sm outline-none"
        />
        <SlidersHorizontal
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "Unread", "Starred", "Spam (1)"].map((tab) => (
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

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto pr-2">
        {conversations.map((conv) => {
          const lastMessage = conv.messages.at(-1);

          return (
            <div
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition border-b last:border-b-0 ${
                activeConversation?.id === conv.id
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={conv.avatar}
                  alt={conv.name}
                  width={42}
                  height={42}
                  className="rounded-full object-cover"
                />
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold truncate">{conv.name}</p>
                  <span className="text-xs text-gray-400">9:45 AM</span>
                </div>

                <p className="text-xs text-gray-500 truncate">
                  {lastMessage?.text || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
