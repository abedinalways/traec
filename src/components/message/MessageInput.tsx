

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Image as ImageIcon,
  Paperclip,
  Send,
  X,
  FileText,
  Film,
  Music,
  File,
  Check,
} from "lucide-react";

import { useAppSelector } from "@/app/store";
import { useSendMessageMutation } from "@/app/api/messages/chatApi";

const formatFileSize = (size?: number): string => {
  if (!size || size <= 0) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileIcon = (type: string, name: string) => {
  const t = type.toLowerCase();
  const n = name.toLowerCase();
  if (t.startsWith("video/") || /\.(mp4|mov|avi|webm|mkv)$/.test(n))
    return <Film size={15} className="text-purple-500" />;
  if (t.startsWith("audio/") || /\.(mp3|wav|ogg|flac|aac)$/.test(n))
    return <Music size={15} className="text-pink-500" />;
  if (t === "application/pdf" || n.endsWith(".pdf"))
    return <FileText size={15} className="text-red-500" />;
  return <File size={15} className="text-slate-400" />;
};

const isImage = (file: File) => file.type.startsWith("image/");

interface PendingFile {
  file: File;
  id: string;
  preview?: string;
}

export default function MessageInput() {
  const activeReceiverId = useAppSelector((s) => s.chat.activeReceiverId);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const [text, setText] = useState("");
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
  }, [text]);

  useEffect(
    () => () => {
      pending.forEach((p) => p.preview && URL.revokeObjectURL(p.preview));
    },
    [],
  );

  const wrap = useCallback(
    (f: File): PendingFile => ({
      file: f,
      id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      preview: isImage(f) ? URL.createObjectURL(f) : undefined,
    }),
    [],
  );

  const addFiles = useCallback(
    (list: FileList | File[]) =>
      setPending((p) => [...p, ...Array.from(list).map(wrap)]),
    [wrap],
  );

  const remove = useCallback((id: string) => {
    setPending((p) => {
      const found = p.find((x) => x.id === id);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      return p.filter((x) => x.id !== id);
    });
  }, []);

  const canSend =
    activeReceiverId && !isLoading && (text.trim() || pending.length > 0);

  const handleSend = async () => {
    if (!canSend) return;
    const msg = text.trim();
    const files = pending.map((p) => p.file);
    setText("");
    setPending([]);
    try {
      await sendMessage({
        receiverId: activeReceiverId,
        message: msg,
        attachments: files,
      }).unwrap();
    } catch {
      setText(msg);
      setPending(files.map(wrap));
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const imgs = pending.filter((p) => isImage(p.file));
  const docs = pending.filter((p) => !isImage(p.file));

  return (
    <div
      className=" px-3 py-2  shrink-0"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {dragOver && (
        <div className="absolute inset-0 z-30 flex items-center justify-center border-2 border-dashed border-indigo-400 bg-indigo-50/80 backdrop-blur-sm outline-2">
          <div className="pointer-events-none text-center">
            <Paperclip
              size={30}
              className="mx-auto mb-1.5 animate-bounce text-indigo-500"
            />
            <p className="text-sm font-semibold text-indigo-600">
              Drop files here
            </p>
          </div>
        </div>
      )}

      <input
        ref={imgInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {imgs.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2 px-1">
          {imgs.map((p) => (
            <div key={p.id} className="group relative h-12 w-12 shrink-0">
              <img
                src={p.preview}
                alt={p.file.name}
                className="h-full w-full rounded-lg border border-gray-200 object-cover shadow-sm"
              />
              <button
                onClick={() => remove(p.id)}
                className="absolute -right-1 -top-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
              >
                <X size={8} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

      {docs.length > 0 && (
        <div className="mb-2 flex flex-col gap-1 px-1">
          {docs.map((p) => (
            <div
              key={p.id}
              className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-100 bg-gray-50">
                {getFileIcon(p.file.type, p.file.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold leading-tight text-gray-700">
                  {p.file.name}
                </p>
                <p className="text-[10px] leading-tight text-gray-400">
                  {formatFileSize(p.file.size)}
                </p>
              </div>
              <button
                onClick={() => remove(p.id)}
                className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!activeReceiverId}
          onClick={() => fileInputRef.current?.click()}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#54656F] transition hover:bg-gray-200/50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Paperclip size={20} />
        </button>

        <div className="flex-1 flex items-center rounded-xl bg-white px-4 py-2 shadow-sm min-h-[40px]">
          <textarea
            ref={textareaRef}
            value={text}
            rows={1}
            placeholder={activeReceiverId ? "Type a message" : ""}
            disabled={!activeReceiverId || isLoading}
            className="max-h-[100px] min-h-[20px] flex-1 resize-none bg-transparent py-0.5 text-[15px] leading-relaxed text-[#111B21] outline-none placeholder:text-[#667781] disabled:cursor-not-allowed"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          {pending.length > 0 && (
            <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-[#D9FDD3] px-2 py-0.5 text-[10px] font-medium text-[#111B21] ml-2">
              <Check size={10} />
              {pending.length}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#54656F] transition-all duration-150 hover:bg-gray-200/50 active:scale-95 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#00A884]/30 border-t-[#00A884]" />
          ) : (
            <Send size={20} className={canSend ? "text-[#00A884]" : "text-[#54656F]"} />
          )}
        </button>
      </div>
    </div>
  );
}