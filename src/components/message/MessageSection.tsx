
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
  User,
} from "lucide-react";

import { useAppSelector } from "@/app/store";
import {
  getConversationAvatar,
  getConversationName,
  isOwnMessage,
  getAttachmentUrl,
  isImageAttachment,
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

// File type icon helper
const getFileIcon = (attachment: ChatAttachment) => {
  const type = (attachment.file_type || "").toLowerCase();
  if (type.startsWith("video/"))
    return <Film size={18} className="text-purple-500" />;
  if (type.startsWith("audio/"))
    return <Music size={18} className="text-pink-500" />;
  if (type === "application/pdf")
    return <FileText size={18} className="text-red-500" />;
  return <File size={18} className="text-slate-400" />;
};

// Image lightbox
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
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
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

function AttachmentImage({
  att,
  url,
  isSingle,
}: {
  att: ChatAttachment;
  url: string;
  isSingle: boolean;
}) {
  const [retries, setRetries] = useState(0);
  const [src, setSrc] = useState(url);

  return (
    <img
      src={src}
      alt={att.file_name || "Image"}
      className={`object-cover w-full ${isSingle ? "max-h-48" : "h-24"} rounded-lg`}
      loading="lazy"
      onError={(e) => {
        if (retries < 5) {
          setTimeout(() => {
            setRetries((r) => r + 1);
            setSrc(`${url}?retry=${retries + 1}`);
          }, 1000); // Retry every 1s, up to 5 times
        } else {
          const currentSrc = e.currentTarget.src;
          if (currentSrc.includes("/storage/")) {
            setSrc(url.replace("/storage/", "/"));
          } else if (!currentSrc.includes("/images/placeholder-image.png")) {
            setSrc("/images/placeholder-image.png");
          }
        }
      }}
    />
  );
}

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
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage}
          alt="Attachment"
          onClose={() => setLightboxImage(null)}
        />
      )}

      {imageAttachments.length > 0 && (
        <div
          className={`mt-1 grid gap-1 ${imageAttachments.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
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
                <AttachmentImage att={att} url={url} isSingle={imageAttachments.length === 1} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Eye
                    size={18}
                    className="text-white opacity-0 group-hover:opacity-80 transition-opacity drop-shadow-lg"
                  />
                </div>
                {isLast && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <span className="text-white text-lg font-bold">
                      +{imageAttachments.length - 4}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
                className="flex items-center gap-2 rounded-lg bg-white/90 border border-gray-100 px-3 py-2 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
                  {getFileIcon(att)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate group-hover:text-indigo-600 transition-colors">
                    {att.file_name || "File"}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {formatFileSize(att.file_size)}
                    {att.file_type &&
                      ` · ${att.file_type.split("/")[1]?.toUpperCase() || att.file_type}`}
                  </p>
                </div>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition">
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
      <div className="flex flex-col w-full flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-md border border-gray-100">
            <MessageCircle size={26} />
          </div>
          <h4 className="text-base font-bold text-gray-700">
            Your Event Inbox
          </h4>
          <p className="mt-1.5 text-xs text-gray-500">
            Choose a conversation from the left sidebar to start messaging.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4 bg-[#EFEAE2] bg-opacity-90 scrollbar-thin scrollbar-thumb-gray-300"
      style={{ backgroundImage: "url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')", backgroundBlendMode: "overlay" }}
    >
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`flex gap-3 items-end ${item % 2 === 0 ? "flex-row-reverse" : ""}`}
            >
              <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse flex-shrink-0" />
              <div
                className={`h-10 w-40 rounded-2xl bg-gray-300 animate-pulse ${item % 2 === 0 ? "rounded-br-sm" : "rounded-bl-sm"}`}
              />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-xs text-red-600 text-center">
          Failed to load messages. Please reload.
        </div>
      ) : messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-center">
          <div>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-md border border-gray-100">
              <Sparkles
                size={22}
                className="animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <h4 className="text-sm font-bold text-gray-700">Say Hello!</h4>
            <p className="mt-1 text-xs text-gray-400">
              No messages yet. Start the conversation.
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
                  <div className="flex max-w-[85%] gap-2 sm:max-w-[75%] items-end">
                    {(() => {
                      const finalAvatar = incomingAvatarSrc || activeAvatar;
                      if (
                        finalAvatar?.includes("provider-profile-img.svg") ||
                        finalAvatar?.includes("placeholder-image.png")
                      ) {
                        return (
                          <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center ring-1 ring-white shadow-sm flex-shrink-0">
                            <User className="text-gray-400" size={16} />
                          </div>
                        );
                      }
                      return (
                        <Image
                          src={finalAvatar}
                          alt={msgSender?.name || activeName}
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full object-cover ring-1 ring-white shadow-sm"
                          unoptimized
                        />
                      );
                    })()}
                    <div className="relative flex-1 min-w-0">
                      <div className="rounded-xl rounded-tl-none bg-white shadow-sm px-3 py-1.5 relative">
                        <svg viewBox="0 0 8 13" width="8" height="13" className="absolute -left-2 top-0 text-white">
                          <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                          <path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                        </svg>
                        {msg.message && (
                          <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        )}
                        {hasAttachments && (
                          <div className="mt-1.5">
                            <MessageAttachments
                              attachments={msg.attachments!}
                            />
                          </div>
                        )}
                        <div className="flex justify-end mt-1">
                          <span className="text-[10px] text-gray-400">
                            <ChatTime
                              timestamp={msg.updated_at || msg.created_at}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex max-w-[85%] sm:max-w-[75%] justify-end">
                    <div className="relative">
                      <div className="rounded-xl rounded-tr-none bg-[#D9FDD3] shadow-sm px-3 py-1.5 relative">
                        <svg viewBox="0 0 8 13" width="8" height="13" className="absolute -right-2 top-0 text-[#D9FDD3]">
                          <path opacity=".13" fill="#0000000" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                          <path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" transform="matrix(-1 0 0 1 8 0)" />
                        </svg>
                        {msg.message && (
                          <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        )}
                        {hasAttachments && (
                          <div className="mt-1.5">
                            <MessageAttachments
                              attachments={msg.attachments!}
                            />
                          </div>
                        )}
                        <div className="flex justify-end items-center gap-1 mt-0.5">
                          <span className="text-[10px] text-[#667781]">
                            <ChatTime
                              timestamp={msg.updated_at || msg.created_at}
                            />
                          </span>
                          <svg viewBox="0 0 16 15" width="16" height="15" className="text-[#53bdeb] ml-0.5">
                            <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                          </svg>
                        </div>
                      </div>
                    </div>
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