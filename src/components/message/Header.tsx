"use client";
import Image from "next/image";
import { useChat } from "@/app/(client)/context/ChatContext";

export default function Header() {
  const { activeConversation } = useChat();
  if (!activeConversation) return null;

  return (
    <div className="flex items-center gap-3 px-5 py-1 bg-gray-100 border-b ">
      <Image
        src={activeConversation.avatar}
        alt={activeConversation.name}
        width={42}
        height={42}
        className="rounded-full"
      />
      <div>
        <p className="font-semibold">{activeConversation.name}</p>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
}
