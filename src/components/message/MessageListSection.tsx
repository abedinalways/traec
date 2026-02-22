"use client";

import Image from "next/image";
import { useChat } from "@/app/(client)/context/ChatContext";

export default function MessageListSection() {
  const { conversations, selectConversation, activeConversation } = useChat();

  return (
    <>
      <h3 className="font-semibold mb-4">Conversations</h3>

      <div className="space-y-2">
        {conversations.map((conv) => {
          const last = conv.messages.at(-1);

          return (
            <div
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                activeConversation?.id === conv.id
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <Image
                src={conv.avatar}
                alt={conv.name}
                width={40}
                height={40}
                className="rounded-full"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{conv.name}</p>
                <p className="text-xs text-gray-500 truncate">{last?.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
