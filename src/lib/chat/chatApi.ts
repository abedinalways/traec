import { chatConfig } from "./chatConfig";
import {
  ChatConversation,
  ChatMessage,
  RawChatUser,
  RawConversation,
  RawMessage,
} from "./chatType";

const fallbackAvatar = "/images/provider-profile-img.svg";

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
};

export const getClientToken = () => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("auth_token") ||
    localStorage.getItem("jr_auth_token") ||
    localStorage.getItem("access_token") ||
    getCookie("token") ||
    getCookie("auth_token") ||
    getCookie("jr_auth_token") ||
    getCookie("access_token")
  );
};

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
    } catch {
      // ignore invalid JSON
    }
  }

  return null;
};

const buildApiUrl = (path: string) => {
  const baseUrl = chatConfig.apiBaseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  if (!baseUrl) return `/${cleanPath}`;

  return `${baseUrl}/${cleanPath}`;
};

const parseResponse = async (response: Response) => {
  const text = await response.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = getClientToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers.access_token = token;
  }

  const response = await fetch(buildApiUrl(path), {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw data || new Error("Request failed.");
  }

  return data as T;
};

export const getChatImageUrl = (
  image?: string | null,
  fallback = fallbackAvatar,
) => {
  if (!image) return fallback;

  if (image.startsWith("blob:") || image.startsWith("data:")) return image;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/")) return image;

  return `/api/image?path=${encodeURIComponent(image)}`;
};

const getDisplayName = (user?: RawChatUser | null) => {
  if (!user) return "";

  return (
    [user.name, user.last_name].filter(Boolean).join(" ") ||
    user.email ||
    "Unknown User"
  );
};

const getOtherUserFromConversation = (
  conversation: RawConversation,
): RawChatUser | null => {
  return (
    conversation.receiver ||
    conversation.sender ||
    conversation.provider ||
    conversation.client ||
    conversation.user ||
    null
  );
};

const resolveMessageConversationId = (
  message: RawMessage,
  fallbackConversationId?: string | number,
) => {
  const currentUserId = getCurrentUserId();

  const senderId = message.sender_id ? String(message.sender_id) : "";
  const receiverId = message.receiver_id ? String(message.receiver_id) : "";

  if (currentUserId && senderId && senderId === currentUserId && receiverId) {
    return receiverId;
  }

  if (currentUserId && receiverId && receiverId === currentUserId && senderId) {
    return senderId;
  }

  if (fallbackConversationId) return String(fallbackConversationId);

  if (receiverId) return receiverId;
  if (senderId) return senderId;
  if (message.conversation_id) return String(message.conversation_id);
  if (message.chat_id) return String(message.chat_id);

  return "";
};

export const normalizeMessage = (
  message: RawMessage,
  fallbackConversationId?: string | number,
): ChatMessage => {
  const currentUserId = getCurrentUserId();

  const senderId = message.sender_id ? String(message.sender_id) : null;
  const receiverId = message.receiver_id ? String(message.receiver_id) : null;

  const isOwn =
    Boolean(message.is_me) ||
    Boolean(message.is_own) ||
    Boolean(currentUserId && senderId && currentUserId === senderId);

  return {
    id: String(message.id || `temp-${Date.now()}-${Math.random()}`),
    conversationId: resolveMessageConversationId(
      message,
      fallbackConversationId,
    ),
    senderId,
    receiverId,
    text: message.message || message.text || message.body || "",
    type: message.type || "text",
    createdAt: message.created_at || null,
    isOwn,
    raw: message,
  };
};

export const normalizeConversation = (
  conversation: RawConversation,
): ChatConversation => {
  const currentUserId = getCurrentUserId();
  const otherUser = getOtherUserFromConversation(conversation);

  let id =
    otherUser?.id ||
    conversation.receiver_id ||
    conversation.sender_id ||
    conversation.conversation_id ||
    conversation.chat_id ||
    conversation.id ||
    "";

  if (
    currentUserId &&
    conversation.sender_id &&
    String(conversation.sender_id) !== currentUserId
  ) {
    id = conversation.sender_id;
  }

  if (
    currentUserId &&
    conversation.receiver_id &&
    String(conversation.receiver_id) !== currentUserId
  ) {
    id = conversation.receiver_id;
  }

  const name =
    conversation.name ||
    conversation.title ||
    getDisplayName(otherUser) ||
    [conversation.name, conversation.last_name].filter(Boolean).join(" ") ||
    conversation.email ||
    "Unknown User";

  const avatar =
    conversation.avatar ||
    conversation.image ||
    otherUser?.avatar ||
    otherUser?.image ||
    null;

  const rawMessages = Array.isArray(conversation.messages)
    ? conversation.messages
    : [];

  const messages = rawMessages.map((message) =>
    normalizeMessage(message, String(id)),
  );

  const rawLastMessage = conversation.last_message;

  const lastMessageText =
    typeof rawLastMessage === "string"
      ? rawLastMessage
      : rawLastMessage?.message ||
        rawLastMessage?.text ||
        rawLastMessage?.body ||
        conversation.message ||
        messages.at(-1)?.text ||
        "No messages yet";

  const lastMessageAt =
    typeof rawLastMessage === "object" && rawLastMessage
      ? rawLastMessage.created_at || null
      : conversation.updated_at || conversation.created_at || null;

  return {
    id: String(id),
    name,
    email: conversation.email || otherUser?.email || null,
    avatar: getChatImageUrl(avatar),
    online: Boolean(conversation.online),
    unreadCount: Number(conversation.unread_count || 0),
    isStarred: Boolean(conversation.is_starred),
    isSpam: Boolean(conversation.is_spam),
    lastMessageText,
    lastMessageAt,
    messages,
    raw: conversation,
  };
};

const extractConversationList = (response: any): RawConversation[] => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.conversations)) return response.conversations;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.data?.conversations)) {
    return response.data.conversations;
  }

  return [];
};

const extractMessageList = (response: any): RawMessage[] => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.messages)) return response.messages;
  if (Array.isArray(response?.data?.messages)) return response.data.messages;
  if (Array.isArray(response?.data?.data)) return response.data.data;

  return [];
};

export const chatApi = {
  getConversations: async () => {
    const response = await apiFetch<any>(chatConfig.endpoints.conversations, {
      method: "GET",
    });

    return extractConversationList(response).map(normalizeConversation);
  },

  getMessages: async (receiverId: string | number) => {
    const response = await apiFetch<any>(
      chatConfig.endpoints.messages(receiverId),
      {
        method: "GET",
      },
    );

    return extractMessageList(response).map((message) =>
      normalizeMessage(message, receiverId),
    );
  },

  sendMessage: async ({
    receiverId,
    message,
  }: {
    receiverId: string | number;
    message: string;
  }) => {
    const formData = new FormData();

    formData.append("receiver_id", String(receiverId));
    formData.append("message", message);

    const response = await apiFetch<any>(chatConfig.endpoints.sendMessage, {
      method: "POST",
      body: formData,
    });

    const rawMessage =
      response?.data || response?.message_data || response?.message || response;

    return normalizeMessage(rawMessage, receiverId);
  },
};
