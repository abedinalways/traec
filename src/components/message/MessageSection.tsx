"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useChat } from "@/app/(client)/context/ChatContext";

export default function MessageSection() {
  const { activeConversation } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!activeConversation || !scrollRef.current) return;

    if (isFirstRender.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      isFirstRender.current = false;
      return;
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [activeConversation?.messages.length]);

  // Safe render guard (after hooks)
  if (!activeConversation) return null;

  return (
    <div
      ref={scrollRef}
      className="overflow-y-auto bg-gray-50 px-6 py-6 h-full"
    >
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
    </div>
  );
}
