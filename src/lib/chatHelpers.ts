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

const getOtherConversationUser = (
  conversation: Conversation,
  currentUserId?: string | number | null,
  activeReceiverId?: string | number | null,
) => {
  const resolvedCurrentUserId = currentUserId
    ? String(currentUserId)
    : getCurrentUserId();
  const resolvedReceiverId = activeReceiverId ? String(activeReceiverId) : null;

  const users = [conversation.receiver, conversation.sender, conversation.user];

  // 1. Try to match by activeReceiverId — this is the most reliable way
  if (resolvedReceiverId) {
    const matchingUser = users.find(
      (user) => user?.id && String(user.id) === resolvedReceiverId,
    );
    if (matchingUser) return matchingUser;
  }

  // 2. Try to find the user that is NOT the current user
  if (resolvedCurrentUserId) {
    const otherUser = users.find(
      (user) => user?.id && String(user.id) !== resolvedCurrentUserId,
    );
    if (otherUser) return otherUser;
  }

  // 3. Fallback
  return conversation.sender || conversation.receiver || conversation.user;
};

export const getConversationReceiverId = (
  conversation: Conversation,
  currentUserId?: string | number | null,
) => {
  const resolvedCurrentUserId = currentUserId
    ? String(currentUserId)
    : getCurrentUserId();

  const senderId = conversation.sender_id
    ? String(conversation.sender_id)
    : null;

  const receiverId = conversation.receiver_id
    ? String(conversation.receiver_id)
    : null;

  if (resolvedCurrentUserId && senderId && senderId !== resolvedCurrentUserId) {
    return senderId;
  }

  if (resolvedCurrentUserId && receiverId && receiverId !== resolvedCurrentUserId) {
    return receiverId;
  }

  const otherUser = getOtherConversationUser(
    conversation,
    resolvedCurrentUserId,
  );

  if (otherUser?.id) return String(otherUser.id);

  if (receiverId) return receiverId;
  if (senderId) return senderId;

  return conversation.id ? String(conversation.id) : "";
};

export const getConversationName = (
  conversation?: Conversation | null,
  currentUserId?: string | number | null,
  activeReceiverId?: string | number | null,
) => {
  if (!conversation) return "Unknown User";

  const user = getOtherConversationUser(
    conversation,
    currentUserId,
    activeReceiverId,
  );

  return (
    [user?.name, user?.last_name].filter(Boolean).join(" ") ||
    [conversation.name, conversation.last_name].filter(Boolean).join(" ") ||
    user?.email ||
    conversation.email ||
    "Unknown User"
  );
};

export const getConversationAvatar = (
  conversation?: Conversation | null,
  currentUserId?: string | number | null,
  activeReceiverId?: string | number | null,
) => {
  if (!conversation) return FALLBACK_AVATAR;

  const user = getOtherConversationUser(
    conversation,
    currentUserId,
    activeReceiverId,
  );

  return getImageUrl(
    user?.image ||
      user?.avatar ||
      user?.avatar_url ||
      conversation.image ||
      conversation.avatar ||
      conversation.avatar_url ||
      null,
  );
};

export const getLastMessageText = (conversation: Conversation) => {
  if (typeof conversation.last_message === "string") {
    return conversation.last_message;
  }

  if (conversation.last_message && typeof conversation.last_message === "object") {
    if (conversation.last_message.message) {
      return conversation.last_message.message;
    }
  }

  return conversation.message || "No messages yet";
};

export const isOwnMessage = (
  message: Message,
  currentUserId?: string | number | null,
  activeReceiverId?: string | number | null,
) => {
  const resolvedCurrentUserId = currentUserId
    ? String(currentUserId)
    : getCurrentUserId();

  const msgSenderId =
    message.sender_id ||
    (message as any).senderId ||
    message.sender?.id ||
    (message as any).userId ||
    (message as any).user_id;

  if (resolvedCurrentUserId && msgSenderId) {
    return String(msgSenderId) === resolvedCurrentUserId;
  }

  const msgReceiverId =
    message.receiver_id || (message as any).receiverId || message.receiver?.id;

  if (activeReceiverId && msgReceiverId) {
    return String(msgReceiverId) === String(activeReceiverId);
  }

  return false;
};

export const formatChatTime = (value?: string | null) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
