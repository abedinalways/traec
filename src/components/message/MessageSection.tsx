"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageCircle,
  Sparkles,
  FileText,
  Film,
  Music,
  File,
  Download,
  Eye,
  X,
} from "lucide-react";

import { useAppSelector } from "@/app/store";
import {
  getConversationAvatar,
  getConversationName,
  isOwnMessage,
  getAttachmentUrl,
  isImageAttachment,
  isPdfAttachment,
  formatFileSize,
} from "@/lib/chatHelpers";
import {
  Message,
  MessageIndexData,
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "@/app/api/messages/chatApi";
import type { ChatUser, ChatAttachment } from "@/app/api/messages/chatApi";
import ChatTime from "./chatTime";

const getMessagesFromPayload = (payload?: MessageIndexData): Message[] => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  return payload.messages || [];
};

// File type icon
const getFileIcon = (attachment: ChatAttachment) => {
  const type = (attachment.file_type || "").toLowerCase();
  if (type.startsWith("video/")) return <Film size={18} className="text-purple-500" />;
  if (type.startsWith("audio/")) return <Music size={18} className="text-pink-500" />;
  if (type === "application/pdf") return <FileText size={18} className="text-red-500" />;
  return <File size={18} className="text-slate-400" />;
};

// Image lightbox modal
function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
        onClick={onClose}
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// Attachment renderer for a single message
function MessageAttachments({
  attachments,
}: {
  attachments: ChatAttachment[];
}) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const imageAttachments = attachments.filter(isImageAttachment);
  const fileAttachments = attachments.filter((a) => !isImageAttachment(a));

  return (
    <>
      {/* Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage}
          alt="Attachment"
          onClose={() => setLightboxImage(null)}
        />
      )}

      {/* Image grid */}
      {imageAttachments.length > 0 && (
        <div
          className={`mt-1.5 grid gap-1 ${
            imageAttachments.length === 1
              ? "grid-cols-1"
              : imageAttachments.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
          }`}
        >
          {imageAttachments.slice(0, 4).map((att, idx) => {
            const url = getAttachmentUrl(att.file_path);
            const isLast = idx === 3 && imageAttachments.length > 4;
            return (
              <div
                key={att.id || idx}
                className="relative group cursor-pointer rounded-lg overflow-hidden"
                onClick={() => setLightboxImage(url)}
              >
                <img
                  src={url}
                  alt={att.file_name || "Image"}
                  className={`object-cover w-full ${
                    imageAttachments.length === 1
                      ? "max-h-64 rounded-lg"
                      : "h-28 rounded-lg"
                  }`}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Eye
                    size={18}
                    className="text-white opacity-0 group-hover:opacity-80 transition-opacity drop-shadow-lg"
                  />
                </div>
                {/* +N overlay for last image */}
                {isLast && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <span className="text-white text-lg font-bold drop-shadow-lg">
                      +{imageAttachments.length - 4}
                    </span>
                  </div>
                )}
                {/* File name tooltip on hover */}
                {att.file_name && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white truncate">{att.file_name}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* File attachments */}
      {fileAttachments.length > 0 && (
        <div className="mt-1.5 flex flex-col gap-1.5">
          {fileAttachments.map((att, idx) => {
            const url = getAttachmentUrl(att.file_path);
            return (
              <a
                key={att.id || idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg bg-white/80 border border-slate-100 px-3 py-2 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100">
                  {getFileIcon(att)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate group-hover:text-[#4F46E5] transition-colors">
                    {att.file_name || "File"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {formatFileSize(att.file_size)}
                    {att.file_type && ` · ${att.file_type.split("/")[1]?.toUpperCase() || att.file_type}`}
                  </p>
                </div>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 group-hover:bg-indigo-50 group-hover:text-[#4F46E5] transition">
                  <Download size={14} />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function MessageSection() {
  const activeReceiverId = useAppSelector(
    (state) => state.chat.activeReceiverId,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conversationsData } = useGetConversationsQuery();
  const conversations = conversationsData || [];

  const activeConversation = conversations.find((conv) => {
    const senderId = conv.sender_id ? String(conv.sender_id) : null;
    const receiverId = conv.receiver_id ? String(conv.receiver_id) : null;
    return (
      senderId === String(activeReceiverId) ||
      receiverId === String(activeReceiverId)
    );
  });

  const {
    data: messagesData,
    isLoading,
    isError,
  } = useGetMessagesQuery(
    { receiverId: activeReceiverId ? String(activeReceiverId) : "" },
    { skip: !activeReceiverId || activeReceiverId === "" },
  );

  const messages = getMessagesFromPayload(messagesData?.data);

  // Build user map from messages for name/avatar resolution
  const userMap = useMemo(() => {
    const map = new Map<string, ChatUser>();
    for (const msg of messages) {
      if (msg.sender?.id) map.set(String(msg.sender.id), msg.sender);
      if (msg.receiver?.id) map.set(String(msg.receiver.id), msg.receiver);
    }
    return map;
  }, [messages]);

  const activeName = getConversationName(activeConversation, currentUserId);

  const otherUserFromMap = activeReceiverId
    ? userMap.get(String(activeReceiverId))
    : null;
  const otherAvatarUrl =
    otherUserFromMap?.image ||
    otherUserFromMap?.avatar ||
    otherUserFromMap?.avatar_url;
  const activeAvatar = otherAvatarUrl
    ? otherAvatarUrl.startsWith("http") || otherAvatarUrl.startsWith("/")
      ? otherAvatarUrl
      : `/api/image?path=${encodeURIComponent(otherAvatarUrl)}`
    : getConversationAvatar(activeConversation, currentUserId);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  if (!activeReceiverId) {
    return (
      <div className="bg-slate-50 px-6 py-6 h-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4F46E5]/5 rounded-full blur-3xl" />
        <div className="text-center relative z-10 max-w-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#4F46E5] shadow-md border border-slate-100 animate-pulse">
            <MessageCircle size={26} />
          </div>
          <h4 className="text-base font-bold text-slate-800 tracking-tight">
            Your Event Inbox
          </h4>
          <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
            Choose a provider or client conversation from the left sidebar to
            start messaging in real-time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="overflow-y-auto bg-slate-50 px-4 py-4 sm:px-6 h-full scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
    >
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`flex gap-3 items-end ${
                item % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="h-9 w-9 rounded-full bg-slate-200 animate-pulse flex-shrink-0" />
              <div
                className={`h-12 w-48 rounded-2xl bg-slate-200 animate-pulse ${
                  item % 2 === 0 ? "rounded-br-sm" : "rounded-bl-sm"
                }`}
              />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 text-xs text-red-600 flex items-center justify-center font-medium shadow-xs">
          Failed to load messages. Please reload the page.
        </div>
      ) : messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#4F46E5]/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#4F46E5] shadow-md border border-slate-100">
              <Sparkles
                size={22}
                className="animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <h4 className="text-sm font-bold text-slate-800 tracking-tight">
              Say Hello!
            </h4>
            <p className="mt-1 text-xs text-slate-400 max-w-xs leading-relaxed">
              No previous messages found. Type your first message or share a file
              to start the conversation.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            const isOwn = isOwnMessage(msg, currentUserId);
            const hasAttachments =
              msg.attachments && msg.attachments.length > 0;

            const msgSender = msg.sender;
            const incomingAvatarSrc =
              !isOwn && msgSender?.image
                ? msgSender.image.startsWith("http") ||
                  msgSender.image.startsWith("/")
                  ? msgSender.image
                  : `/api/image?path=${encodeURIComponent(msgSender.image)}`
                : !isOwn && msgSender?.avatar
                  ? msgSender.avatar.startsWith("http") ||
                    msgSender.avatar.startsWith("/")
                    ? msgSender.avatar
                    : `/api/image?path=${encodeURIComponent(msgSender.avatar)}`
                  : activeAvatar;

            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                {!isOwn ? (
                  <div className="flex max-w-[82%] gap-2.5 sm:max-w-[70%] items-start">
                    <Image
                      src={incomingAvatarSrc || activeAvatar}
                      alt={msgSender?.name || activeName}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-xs flex-shrink-0 mt-0.5"
                      unoptimized
                    />
                    <div className="flex-1 min-w-0">
                      {/* Sender name */}
                      <p className="mb-1 text-[10px] font-semibold text-slate-500 px-1">
                        {msgSender?.name || "Unknown"}
                      </p>
                      <div className="rounded-2xl rounded-tl-md bg-white border border-slate-100 shadow-sm overflow-hidden">
                        {/* Text content */}
                        {msg.message && (
                          <div className="px-3.5 py-2.5">
                            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">
                              {msg.message}
                            </p>
                          </div>
                        )}
                        {/* Attachments */}
                        {hasAttachments && (
                          <div
                            className={
                              msg.message ? "px-2 pb-2" : "p-2"
                            }
                          >
                            <MessageAttachments
                              attachments={msg.attachments!}
                            />
                          </div>
                        )}
                      </div>
                      <p className="mt-1 px-1 text-[10px] font-medium text-slate-400">
                        <ChatTime
                          timestamp={msg.updated_at || msg.created_at}
                        />
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[82%] sm:max-w-[70%] flex flex-col items-end">
                    <div className="rounded-2xl rounded-tr-md bg-[#4F46E5] shadow-sm shadow-[#4F46E5]/10 overflow-hidden">
                      {/* Text content */}
                      {msg.message && (
                        <div className="px-3.5 py-2.5">
                          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white">
                            {msg.message}
                          </p>
                        </div>
                      )}
                      {/* Attachments */}
                      {hasAttachments && (
                        <div
                          className={msg.message ? "px-2 pb-2" : "p-2"}
                        >
                          <MessageAttachments
                            attachments={msg.attachments!}
                          />
                        </div>
                      )}
                    </div>
                    <p className="mt-1 px-1 text-[10px] font-medium text-slate-400 text-right">
                      <ChatTime
                        timestamp={msg.updated_at || msg.created_at}
                      />
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
