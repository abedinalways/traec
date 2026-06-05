import { Conversation, Message } from "@/app/api/messages/chatApi";

const FALLBACK_AVATAR = "/images/provider-profile-img.svg";

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

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/")) {
    return image;
  }

  return `/api/image?path=${encodeURIComponent(image)}`;
};

// Get the "other" user from a conversation.
// Conversation list only has `sender` object (the person who sent the last message).
// We need to figure out who the OTHER person is.
const getOtherUserFromConversation = (
  conversation: Conversation,
  currentUserId?: string | number | null,
): ChatUser | null => {
  const myId = currentUserId ? String(currentUserId) : getCurrentUserId();
  const senderId = conversation.sender_id ? String(conversation.sender_id) : null;
  const receiverId = conversation.receiver_id ? String(conversation.receiver_id) : null;

  const sender = conversation.sender;
  const receiver = conversation.receiver;
  const user = conversation.user;

  // If sender is NOT the current user, then sender IS the other user
  if (senderId && myId && senderId !== myId && sender) {
    return sender;
  }

  // If receiver is NOT the current user, then receiver IS the other user
  if (receiverId && myId && receiverId !== myId && receiver) {
    return receiver;
  }

  // If sender IS the current user, then receiver is the other user
  if (senderId && myId && senderId === myId && receiver) {
    return receiver;
  }

  // Fallback: try user field
  if (user?.id && myId && String(user.id) !== myId) {
    return user;
  }

  // If only sender exists and is current user, sender might be the only user object available
  // In this case we can't determine the other user from conversation list alone
  return sender || receiver || user || null;
};

// ChatUser type alias for internal use
type ChatUser = {
  id?: string | number;
  name?: string | null;
  last_name?: string | null;
  email?: string | null;
  image?: string | null;
  avatar?: string | null;
  avatar_url?: string | null;
};

export const getConversationReceiverId = (
  conversation: Conversation,
  currentUserId?: string | number | null,
): string => {
  const myId = currentUserId ? String(currentUserId) : getCurrentUserId();
  const senderId = conversation.sender_id ? String(conversation.sender_id) : null;
  const receiverId = conversation.receiver_id ? String(conversation.receiver_id) : null;

  // If sender is someone else, they're the "receiver" from our perspective
  if (senderId && myId && senderId !== myId) {
    return senderId;
  }

  // If receiver is someone else
  if (receiverId && myId && receiverId !== myId) {
    return receiverId;
  }

  // Fallback
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

  // Use the other user's name if found
  if (otherUser?.name) {
    return [otherUser.name, otherUser.last_name].filter(Boolean).join(" ") || otherUser.name;
  }

  // Fallback to conversation-level fields
  if (conversation.name) {
    return [conversation.name, conversation.last_name].filter(Boolean).join(" ") || conversation.name;
  }

  return "Unknown User";
};

export const getConversationAvatar = (
  conversation?: Conversation | null,
  currentUserId?: string | number | null,
): string => {
  if (!conversation) return FALLBACK_AVATAR;

  const otherUser = getOtherUserFromConversation(conversation, currentUserId);

  // Use the other user's image
  const img = otherUser?.image || otherUser?.avatar || otherUser?.avatar_url;
  if (img) return getImageUrl(img);

  // Fallback to conversation-level
  const convImg = conversation.image || conversation.avatar || conversation.avatar_url;
  return getImageUrl(convImg);
};

export const getLastMessageText = (conversation: Conversation): string => {
  // Backend sends `message` as a plain string on conversation objects
  if (conversation.message) return conversation.message;

  // Also handle `last_message` if present
  if (typeof conversation.last_message === "string") return conversation.last_message;
  if (conversation.last_message && typeof conversation.last_message === "object") {
    if (conversation.last_message.message) return conversation.last_message.message;
  }

  return "No messages yet";
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

  // Backend sends "2026-06-02 03:29:12" (space separator, no timezone)
  // and "2026-05-31T03:48:29.000000Z" (ISO with Z)
  // Normalize both to valid ISO
  let normalized = value.trim();

  if (!normalized) return "";

  // If it has a space instead of T, replace with T
  if (normalized.includes(" ") && !normalized.includes("T")) {
    normalized = normalized.replace(" ", "T");
  }

  // If no timezone info, assume UTC (add Z)
  if (!normalized.endsWith("Z") && !normalized.includes("+") && !normalized.match(/-\d{2}:\d{2}$/)) {
    normalized = normalized + "Z";
  }

  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) return "";

  // Convert to local time and format
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
