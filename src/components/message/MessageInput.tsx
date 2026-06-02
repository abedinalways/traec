"use client";

import { useState, useRef, useEffect } from "react";
import { Image as ImageIcon, Paperclip, Send, Smile, X } from "lucide-react";

import { useAppSelector } from "@/app/store";
import { useSendMessageMutation } from "@/app/api/messages/chatApi";

export default function MessageInput() {
  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [input]);

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || !activeReceiverId || isLoading) {
      return;
    }

    const messageText = input.trim();
    const selectedAttachments = attachments;

    setInput("");
    setAttachments([]);

    try {
      await sendMessage({
        receiverId: activeReceiverId,
        message: messageText,
        attachments: selectedAttachments,
      }).unwrap();
    } catch (error) {
      console.error("Message send failed:", error);
      setInput(messageText);
      setAttachments(selectedAttachments);
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="border-t border-slate-100 bg-white px-4 py-4 sm:px-6 relative z-10">
      {attachments.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-2 animate-fade-in">
          {attachments.map((file, idx) => (
            <span
              key={`${file.name}-${file.size}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100/80 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200/50"
            >
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button
                type="button"
                onClick={() => removeAttachment(idx)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex items-end gap-2.5">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            setAttachments(Array.from(event.target.files || []));
            event.target.value = "";
          }}
        />

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            disabled={!activeReceiverId || isLoading}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
          >
            <ImageIcon size={20} />
          </button>

          <button
            type="button"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-40 sm:flex cursor-pointer"
            disabled={!activeReceiverId || isLoading}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </button>
        </div>

        <div className="flex min-h-[44px] flex-1 items-end gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 focus-within:border-[#4F46E5] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#4F46E5]/5 transition-all duration-200">
          <textarea
            ref={textareaRef}
            value={input}
            rows={1}
            placeholder={
              activeReceiverId ? "Type a message securely..." : "Select a conversation..."
            }
            disabled={!activeReceiverId || isLoading}
            className="max-h-[120px] flex-1 resize-none bg-transparent py-0.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed leading-relaxed scrollbar-none"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <button
            type="button"
            className="mb-0.5 shrink-0 text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={
            !activeReceiverId ||
            isLoading ||
            (!input.trim() && attachments.length === 0)
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#4F46E5] text-white shadow-sm shadow-[#4F46E5]/20 transition-all duration-200 hover:bg-[#4338CA] hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none cursor-pointer"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
