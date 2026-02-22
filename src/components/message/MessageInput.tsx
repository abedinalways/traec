"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/app/(client)/context/ChatContext";
import { Plus, Smile, Mic } from "lucide-react";
import PlusIcon from "../icons/PlusIcon";
import PhotoIcon from "../icons/PhotoIcon";
import MicIcon from "../icons/MicIcon";

export default function MessageInput() {
  const { sendMessage } = useChat();
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto grow textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="px-6 py-4 border-t bg-white flex items-center justify-evenly gap-2">
      <div className="flex items-center gap-1">
        <span className="cursor-pointer">
          <PlusIcon />
        </span>
        <span className="cursor-pointer">
          <PhotoIcon />
        </span>
      </div>
      <div className="w-full flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
        <textarea
          ref={textareaRef}
          value={input}
          rows={1}
          placeholder="Type message..."
          className="flex-1 bg-transparent resize-none outline-none text-sm max-h-[120px] overflow-y-auto"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <Smile size={20} className="text-gray-500 cursor-pointer" />
      </div>
      <div>
        <MicIcon className="cursor-pointer"/>
      </div>
    </div>
  );
}
