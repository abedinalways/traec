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
      // ignore invalid JSON
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

export const getConversationReceiverId = (conversation: Conversation) => {
  const currentUserId = getCurrentUserId();

  const senderId = conversation.sender_id
    ? String(conversation.sender_id)
    : null;

  const receiverId = conversation.receiver_id
    ? String(conversation.receiver_id)
    : null;

  if (currentUserId && senderId && senderId !== currentUserId) {
    return senderId;
  }

  if (currentUserId && receiverId && receiverId !== currentUserId) {
    return receiverId;
  }

  if (conversation.receiver?.id) return String(conversation.receiver.id);
  if (conversation.sender?.id) return String(conversation.sender.id);
  if (conversation.user?.id) return String(conversation.user.id);

  if (receiverId) return receiverId;
  if (senderId) return senderId;

  return conversation.id ? String(conversation.id) : "";
};

export const getConversationName = (conversation?: Conversation | null) => {
  if (!conversation) return "Unknown User";

  const user =
    conversation.receiver || conversation.sender || conversation.user;

  return (
    [user?.name, user?.last_name].filter(Boolean).join(" ") ||
    [conversation.name, conversation.last_name].filter(Boolean).join(" ") ||
    user?.email ||
    conversation.email ||
    "Unknown User"
  );
};

export const getConversationAvatar = (conversation?: Conversation | null) => {
  if (!conversation) return FALLBACK_AVATAR;

  const user =
    conversation.receiver || conversation.sender || conversation.user;

  return getImageUrl(
    conversation.avatar_url ||
      conversation.avatar ||
      conversation.image ||
      user?.avatar_url ||
      user?.avatar ||
      user?.image ||
      null,
  );
};

export const getLastMessageText = (conversation: Conversation) => {
  if (typeof conversation.last_message === "string") {
    return conversation.last_message;
  }

  if (conversation.last_message?.message) {
    return conversation.last_message.message;
  }

  return conversation.message || "No messages yet";
};

export const isOwnMessage = (message: Message) => {
  const currentUserId = getCurrentUserId();

  if (!currentUserId || !message.sender_id) return false;

  return String(message.sender_id) === currentUserId;
};

export const formatChatTime = (value?: string | null) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};
