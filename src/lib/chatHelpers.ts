import {
  Conversation,
  Message,
  ChatAttachment,
} from "@/app/api/messages/chatApi";

const FALLBACK_AVATAR = "/images/provider-profile-img.svg";
const PLACEHOLDER_IMAGE = "/images/placeholder-image.png";

export const getCurrentUserId = () => {
  if (typeof window === "undefined") return null;
  const possibleKeys = ["user", "auth_user", "jr_auth_user"];
  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);
    if (!value) continue;
    try {
      const parsed = JSON.parse(value);
      if (parsed?.id) return String(parsed.id);
      if (parsed?.user?.id) return String(parsed.user.id);
      if (parsed?.data?.id) return String(parsed.data.id);
    } catch {
      // ignore
    }
  }
  return null;
};

export const getImageUrl = (image?: string | null) => {
  if (!image) return FALLBACK_AVATAR;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) return image;
  return `/api/image?path=${encodeURIComponent(image)}`;
};

type ChatUser = {
  id?: string | number;
  name?: string | null;
  last_name?: string | null;
  email?: string | null;
  image?: string | null;
  avatar?: string | null;
  avatar_url?: string | null;
};

const getOtherUserFromConversation = (
  conversation: Conversation,
  currentUserId?: string | number | null,
): ChatUser | null => {
  const myId = currentUserId ? String(currentUserId) : getCurrentUserId();
  const senderId = conversation.sender_id
    ? String(conversation.sender_id)
    : null;
  const receiverId = conversation.receiver_id
    ? String(conversation.receiver_id)
    : null;

  const sender = conversation.sender;
  const receiver = conversation.receiver;
  const user = conversation.user;

  if (senderId && myId && senderId !== myId && sender) return sender;
  if (receiverId && myId && receiverId !== myId && receiver) return receiver;
  if (senderId && myId && senderId === myId && receiver) return receiver;
  if (user?.id && myId && String(user.id) !== myId) return user;
  return sender || receiver || user || null;
};

export const getConversationReceiverId = (
  conversation: Conversation,
  currentUserId?: string | number | null,
): string => {
  const myId = currentUserId ? String(currentUserId) : getCurrentUserId();
  const senderId = conversation.sender_id
    ? String(conversation.sender_id)
    : null;
  const receiverId = conversation.receiver_id
    ? String(conversation.receiver_id)
    : null;

  if (senderId && myId && senderId !== myId) return senderId;
  if (receiverId && myId && receiverId !== myId) return receiverId;
  if (receiverId) return receiverId;
  if (senderId) return senderId;
  return conversation.id ? String(conversation.id) : "";
};

export const getConversationName = (
  conversation?: Conversation | null,
  currentUserId?: string | number | null,
): string => {
  if (!conversation) return "Unknown User";
  const otherUser = getOtherUserFromConversation(conversation, currentUserId);
  if (otherUser?.name) {
    return (
      [otherUser.name, otherUser.last_name].filter(Boolean).join(" ") ||
      otherUser.name
    );
  }
  if (conversation.name) {
    return (
      [conversation.name, conversation.last_name].filter(Boolean).join(" ") ||
      conversation.name
    );
  }
  return "Unknown User";
};

export const getConversationAvatar = (
  conversation?: Conversation | null,
  currentUserId?: string | number | null,
): string => {
  if (!conversation) return FALLBACK_AVATAR;
  const otherUser = getOtherUserFromConversation(conversation, currentUserId);
  const img = otherUser?.image || otherUser?.avatar || otherUser?.avatar_url;
  if (img) return getImageUrl(img);
  const convImg =
    conversation.image || conversation.avatar || conversation.avatar_url;
  return getImageUrl(convImg);
};

export const isOwnMessage = (
  message: Message,
  currentUserId?: string | number | null,
  _activeReceiverId?: string | number | null,
): boolean => {
  const myId = currentUserId ? String(currentUserId) : getCurrentUserId();
  const msgSenderId =
    message.sender_id ||
    (message as any).senderId ||
    message.sender?.id ||
    (message as any).userId ||
    (message as any).user_id;
  if (myId && msgSenderId) {
    return String(msgSenderId) === myId;
  }
  return false;
};

export const formatChatTime = (value?: string | null) => {
  if (!value) return "";
  let normalized = value.trim();
  if (!normalized) return "";
  if (normalized.includes(" ") && !normalized.includes("T")) {
    normalized = normalized.replace(" ", "T");
  }
  if (
    !normalized.endsWith("Z") &&
    !normalized.includes("+") &&
    !normalized.match(/-\d{2}:\d{2}$/)
  ) {
    normalized = normalized + "Z";
  }
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getAttachmentUrl = (filePath?: string | null): string => {
  if (!filePath) return "/images/placeholder-image.png";
  if (filePath.startsWith("http://") || filePath.startsWith("https://"))
    return filePath;
  if (filePath.startsWith("/")) return filePath;
  const baseUrl = "https://traec.apphero.agency";
  const cleanPath = filePath.replace(/^\/+/, "");
  return `${baseUrl}/storage/${cleanPath}`;
};
export const isImageAttachment = (attachment: ChatAttachment): boolean => {
  const type = (attachment.file_type || "").toLowerCase();
  const name = (attachment.file_name || "").toLowerCase();
  if (type.startsWith("image/")) return true;
  if (/\.(jpg|jpeg|png|gif|bmp|webp|svg|ico|tiff?)$/i.test(name)) return true;
  return false;
};

export const isPdfAttachment = (attachment: ChatAttachment): boolean => {
  const type = (attachment.file_type || "").toLowerCase();
  const name = (attachment.file_name || "").toLowerCase();
  if (type === "application/pdf") return true;
  if (name.endsWith(".pdf")) return true;
  return false;
};

export const formatFileSize = (size?: string | number | null): string => {
  if (!size) return "Unknown size";
  const bytes = typeof size === "string" ? parseInt(size, 10) : size;
  if (isNaN(bytes) || bytes <= 0) return "Unknown size";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getMessagePreview = (msg?: Message | null): string => {
  if (!msg) return "";
  if (msg.attachments && msg.attachments.length > 0) {
    const first = msg.attachments[0];
    if (isImageAttachment(first)) {
      const count = msg.attachments.filter(isImageAttachment).length;
      return count === 1 ? "📷 Photo" : `📷 ${count} Photos`;
    }
    if (isPdfAttachment(first)) return `📄 ${first.file_name || "Document"}`;
    const count = msg.attachments.length;
    return count === 1
      ? `📎 ${first.file_name || "File"}`
      : `📎 ${count} Files`;
  }
  return msg.message || "";
};

export const getLastMessageText = (conversation: Conversation): string => {
  if (
    conversation.last_message &&
    typeof conversation.last_message === "object"
  ) {
    if (
      conversation.last_message.attachments &&
      conversation.last_message.attachments.length > 0
    ) {
      const first = conversation.last_message.attachments[0];
      if (isImageAttachment(first)) {
        return "📷 Image";
      }
      return "📎 Attachment";
    }
    if (conversation.last_message.message)
      return conversation.last_message.message;
  }

  const convRecord = conversation as Record<string, unknown>;
  const convAttachments = convRecord.attachments as
    | ChatAttachment[]
    | undefined;
  if (convAttachments && convAttachments.length > 0) {
    const first = convAttachments[0];
    if (isImageAttachment(first)) {
      return "📷 Image";
    }
    return "📎 Attachment";
  }

  if (conversation.message) return conversation.message;
  if (typeof conversation.last_message === "string")
    return conversation.last_message;

  return "No messages yet";
};
