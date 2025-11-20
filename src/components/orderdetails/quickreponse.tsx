"use client";

import { useState } from "react";
import Image from "next/image";
import { Paperclip, Smile, SendHorizontal } from "lucide-react";

interface QuickResponseProps {
  onSend?: (message: string) => void;
}

export default function QuickResponse({ onSend }: QuickResponseProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim().length === 0) return;
    onSend?.(message);
    setMessage("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto border rounded-xl p-5 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Image
            src="/images/avataro.png"
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="font-medium text-gray-700 text-sm sm:text-base">
            Use a quick response
          </span>
        </div>

        <div className="text-[10px] sm:text-xs text-gray-500 flex flex-wrap gap-1 sm:gap-2">
          <span>1:34 PM local time</span>
          <span className="mx-1 sm:mx-2">|</span>
          <span>Last seen 1 minute ago</span>
        </div>
      </div>

      {/* Text Area */}
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2500}
          placeholder="Type your message here....."
          className="
            w-full h-32 resize-none rounded-xl border 
            border-gray-200 p-4 text-sm focus:outline-none 
            focus:ring-1 focus:ring-gray-300
          "
        />

        {/* Character Counter */}
        <div className="absolute bottom-3 right-4 text-gray-400 text-xs">
          {message.length} / 2500
        </div>
      </div>

      {/* Footer Icons + Send */}
      <div className="flex justify-between items-center mt-3 flex-wrap gap-3">
        <div className="flex items-center gap-4 text-gray-500">
          <Paperclip className="h-5 w-5 cursor-pointer" />
          <Smile className="h-5 w-5 cursor-pointer" />
        </div>

        <button
          onClick={handleSend}
          className="
            flex items-center gap-2 bg-black text-white 
            px-5 py-2 rounded-full hover:bg-gray-800 transition
            text-sm
          "
        >
          Send
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
