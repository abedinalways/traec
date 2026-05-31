export type RawChatUser = {
  id?: string | number;
  name?: string | null;
  last_name?: string | null;
  email?: string | null;
  image?: string | null;
  avatar?: string | null;
  phone?: string | null;
  type?: string | null;
};

export type RawMessage = {
  id?: string | number;
  sender_id?: string | number;
  receiver_id?: string | number;
  conversation_id?: string | number;
  chat_id?: string | number;
  message?: string | null;
  text?: string | null;
  body?: string | null;
  type?: string | null;
  attachments?: unknown[];
  created_at?: string | null;
  updated_at?: string | null;
  is_me?: boolean;
  is_own?: boolean;
  sender?: RawChatUser | null;
  receiver?: RawChatUser | null;
};

export type RawConversation = {
  id?: string | number;
  sender_id?: string | number;
  receiver_id?: string | number;
  conversation_id?: string | number;
  chat_id?: string | number;

  name?: string | null;
  last_name?: string | null;
  title?: string | null;
  email?: string | null;
  avatar?: string | null;
  image?: string | null;

  user?: RawChatUser | null;
  sender?: RawChatUser | null;
  receiver?: RawChatUser | null;
  provider?: RawChatUser | null;
  client?: RawChatUser | null;

  last_message?: RawMessage | string | null;
  message?: string | null;

  unread_count?: number | null;
  is_starred?: boolean | null;
  is_spam?: boolean | null;
  online?: boolean | null;

  messages?: RawMessage[];

  created_at?: string | null;
  updated_at?: string | null;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId?: string | null;
  receiverId?: string | null;
  text: string;
  type?: string | null;
  createdAt?: string | null;
  isOwn: boolean;
  isPending?: boolean;
  raw?: RawMessage;
};

export type ChatConversation = {
  id: string;
  name: string;
  avatar: string;
  email?: string | null;
  online: boolean;
  unreadCount: number;
  isStarred: boolean;
  isSpam: boolean;
  lastMessageText: string;
  lastMessageAt?: string | null;
  messages: ChatMessage[];
  raw?: RawConversation;
};
