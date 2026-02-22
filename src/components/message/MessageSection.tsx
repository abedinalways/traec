"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useChat } from "@/app/(client)/context/ChatContext";

export default function MessageSection() {
  const { activeConversation } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages.length]);

  if (!activeConversation) return null;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
      {activeConversation.messages.map((msg) => (
        <div key={msg.id} className="mb-4 flex">
          {msg.sender === "doctor" ? (
            <div className="flex gap-3 max-w-[70%]">
              <Image
                src={activeConversation.avatar}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full h-fit"
              />
              <div className="bg-gray-200 px-4 py-3 rounded-2xl text-sm">
                {msg.text}
              </div>
            </div>
          ) : (
            <div className="ml-auto max-w-[70%]">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-3 rounded-2xl text-sm">
                {msg.text}
              </div>
            </div>
          )}
        </div>
      ))}

      <div ref={endRef} />
    </div>
  );
}
