// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';

// export type Sender = 'me' | 'doctor';

// export type CustomAttachment = {
//   id: string;
//   name: string;
//   attachmentsType?: 'test-result' | 'file' | 'unknown';
//   testId?: string;
// };
// export function createCustomAttachment(
//   id: string,
//   name: string,
//   attachmentsType?: 'test-result' | 'file' | 'unknown',
//   testId?: string
// ): CustomAttachment {
//   return {
//     id,
//     attachmentsType,
//     name,
//     testId,
//   };
// }

// export function isCustomAttachment(obj: unknown): obj is CustomAttachment {
//   return (
//     typeof obj === 'object' &&
//     obj !== null &&
//     typeof (obj as Record<string, unknown>).id === 'string' &&
//     ((obj as Record<string, unknown>).attachmentsType === undefined ||
//       ['test-result', 'file', 'unknown'].includes(
//         (obj as Record<string, unknown>).attachmentsType as string
//       )) &&
//     ((obj as Record<string, unknown>).testId === undefined ||
//       typeof (obj as Record<string, unknown>).testId === 'string')
//   );
// }
// export type Message = {
//   id: string;
//   sender: 'me' | 'doctor';
//   text?: string;
//   attachments?: File[] | CustomAttachment[];
//   createdAt: number;
// };

// export type Conversation = {
//   id: string;
//   name: string;
//   avatar: string;
//   messages: Message[];
// };

// type ChatContextType = {
//   conversations: Conversation[];
//   activeConversation: Conversation | null;
//   selectConversation: (id: string) => void;
//   sendMessage: (text: string, attachments?: File[]) => void;
//   isTyping: boolean;
//   setTyping: (v: boolean) => void;
//   socket: Socket | null;
// };

// const ChatContext = createContext<ChatContextType | null>(null);

// export const useChat = () => {
//   const ctx = useContext(ChatContext);
//   if (!ctx) throw new Error('useChat must be used inside ChatProvider');
//   return ctx;
// };

// export function ChatProvider({ children }: { children: React.ReactNode }) {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   // Initialize Socket Connection
//   useEffect(() => {

//     const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

//     console.log('Initializing socket connection to:', socketUrl);

//     const socketInstance = io(socketUrl, {
//       withCredentials: true,
//       transports: ['websocket'], // Prefer WebSocket transport
//       autoConnect: true,
//     });

//     socketInstance.on('connect', () => {
//       console.log('Socket connected:', socketInstance.id);
//     });

//     socketInstance.on('connect_error', (err) => {
//       console.error('Socket connection error:', err);
//     });

//     socketInstance.on('disconnect', () => {
//       console.log('Socket disconnected');
//     });

//     // Setup global listeners here if needed
//     // socketInstance.on('receive_message', handleReceiveMessage);

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   const [conversations, setConversations] = useState<Conversation[]>([
//     {
//       id: '1',
//       name: 'Rikta B Ino',
//       avatar: '/images/browser/Avater.png',
//       messages: [
//         {
//           id: 'm1',
//           sender: 'doctor',
//           text: 'Hi! Did you see the latest research on TMJ disorders?',
//           // eslint-disable-next-line react-hooks/purity
//           createdAt: Date.now(),
//         },
//         {
//           id: 'm2',
//           sender: 'me',
//           text: 'Yes! The findings were fascinating. I can send you the full paper if you would like.',
//           // eslint-disable-next-line react-hooks/purity
//           createdAt: Date.now(),
//         },

//         {
//           id: 'm3',
//           sender: 'doctor',
//           text: 'Just wrapped up this Trauma block —60% correct. Curious how you would do.',
//           attachments: [
//             createCustomAttachment(
//               'foo',
//               'habijabi',
//               'test-result',
//               'test-id-1324'
//             ),
//           ],
//           // eslint-disable-next-line react-hooks/purity
//           createdAt: Date.now(),
//         },
//       ],
//     },
//     {
//       id: '2',
//       name: 'Sheikh A Dinar',
//       avatar: '/images/Avatar02.png',
//       messages: [
//         {
//           id: 'm1',
//           sender: 'doctor',
//           text: 'Hi! Did you see the latest research on TMJ disorders?',
//           // eslint-disable-next-line react-hooks/purity
//           createdAt: Date.now(),
//         },
//         {
//           id: 'm2',
//           sender: 'me',
//           text: 'Yes! The findings were fascinating. I can send you the full paper if you would like.',
//           // eslint-disable-next-line react-hooks/purity
//           createdAt: Date.now(),
//         },
//         {
//           id: 'm1',
//           sender: 'doctor',
//           text: 'Hi! hav you any idea about it?',
//           // eslint-disable-next-line react-hooks/purity
//           createdAt: Date.now(),
//         },

//       ],
//     },
//   ]);

//   const [activeId, setActiveId] = useState('1');
//   const [isTyping, setIsTyping] = useState(false);

//   const activeConversation = conversations.find(c => c.id === activeId) ?? null;

//   const selectConversation = (id: string) => setActiveId(id);

//   const sendMessage = (text: string, attachments: File[] = []) => {
//     if (!text.trim() && attachments.length === 0) return;

//     const newMessage: Message = {
//       id: crypto.randomUUID(),
//       sender: 'me',
//       text: text || undefined,
//       attachments: attachments.length ? attachments : undefined,
//       createdAt: Date.now(),
//     };

//     // Optimistic Update
//     setConversations(prev =>
//       prev.map(conv =>
//         conv.id === activeId
//           ? {
//               ...conv,
//               messages: [
//                 ...conv.messages,
//                 newMessage,
//               ],
//             }
//           : conv
//       )
//     );

//     // Emit to Socket
//     if (socket) {
//       socket.emit('send_message', {
//         conversationId: activeId,
//         message: newMessage
//       });
//     }

//     setIsTyping(false);
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         conversations,
//         activeConversation,
//         selectConversation,
//         sendMessage,
//         isTyping,
//         setTyping: setIsTyping,
//         socket,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// }

"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getPusherClient } from "@/lib/pusherClient";
import { chatConfig } from "@/lib/chat/chatConfig";
import {
  ChatConversation,
  ChatMessage,
  RawMessage,
} from "@/lib/chat/chatType";
import { chatApi, getChatImageUrl, normalizeMessage } from "@/lib/chat/chatApi";

type ChatContextValue = {
  conversations: ChatConversation[];
  activeConversation: ChatConversation | null;
  activeConversationId: string | null;
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSending: boolean;
  error: string | null;
  selectConversation: (conversationId: string | number) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  reloadConversations: () => Promise<void>;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const getErrorMessage = (error: unknown) => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message?: string }).message);
  }

  return "Something went wrong.";
};

const dedupeMessages = (messages: ChatMessage[]) => {
  const map = new Map<string, ChatMessage>();

  messages.forEach((message) => {
    map.set(String(message.id), message);
  });

  return Array.from(map.values());
};

const extractRealtimeMessage = (payload: unknown): RawMessage => {
  const data = payload as {
    data?: RawMessage;
    message?: RawMessage | string;
  };

  if (data?.data && typeof data.data === "object") {
    return data.data;
  }

  if (data?.message && typeof data.message === "object") {
    return data.message;
  }

  return payload as RawMessage;
};

const createConversationFromMessage = (
  message: ChatMessage,
): ChatConversation => {
  const sender = message.raw?.sender || null;
  const receiver = message.raw?.receiver || null;
  const person = message.isOwn ? receiver : sender;

  const name =
    [person?.name, person?.last_name].filter(Boolean).join(" ") ||
    person?.email ||
    "Unknown User";

  return {
    id: message.conversationId,
    name,
    email: person?.email || null,
    avatar: getChatImageUrl(person?.image || person?.avatar || null),
    online: false,
    unreadCount: message.isOwn ? 0 : 1,
    isStarred: false,
    isSpam: false,
    lastMessageText: message.text,
    lastMessageAt: message.createdAt || new Date().toISOString(),
    messages: [message],
  };
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  const activeConversationIdRef = useRef<string | null>(null);

  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  const activeConversation = useMemo(() => {
    if (!activeConversationId) return null;

    return (
      conversations.find(
        (conversation) => conversation.id === activeConversationId,
      ) || null
    );
  }, [activeConversationId, conversations]);

  const reloadConversations = useCallback(async () => {
    try {
      setIsLoadingConversations(true);
      setError(null);

      const list = await chatApi.getConversations();

      setConversations((prev) => {
        const nextList = list.map((incoming) => {
          const existing = prev.find((item) => item.id === incoming.id);

          return {
            ...incoming,
            messages:
              existing?.messages && existing.messages.length > 0
                ? existing.messages
                : incoming.messages,
          };
        });

        return nextList;
      });

      setActiveConversationId((prevActiveId) => {
        if (prevActiveId) return prevActiveId;

        return list[0]?.id || null;
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoadingConversations(false);
    }
  }, []);

  const selectConversation = useCallback(
    async (conversationId: string | number) => {
      const id = String(conversationId);

      setActiveConversationId(id);

      const existingConversation = conversations.find(
        (conversation) => conversation.id === id,
      );

      if (existingConversation?.messages?.length) {
        setConversations((prev) =>
          prev.map((conversation) =>
            conversation.id === id
              ? {
                  ...conversation,
                  unreadCount: 0,
                }
              : conversation,
          ),
        );
        return;
      }

      try {
        setIsLoadingMessages(true);
        setError(null);

        const messages = await chatApi.getMessages(id);

        setConversations((prev) =>
          prev.map((conversation) =>
            conversation.id === id
              ? {
                  ...conversation,
                  unreadCount: 0,
                  messages,
                  lastMessageText:
                    messages.at(-1)?.text || conversation.lastMessageText,
                  lastMessageAt:
                    messages.at(-1)?.createdAt || conversation.lastMessageAt,
                }
              : conversation,
          ),
        );
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [conversations],
  );

  const appendMessage = useCallback((message: ChatMessage) => {
    if (!message.conversationId) return;

    setConversations((prev) => {
      const activeId = activeConversationIdRef.current;
      const conversationExists = prev.some(
        (conversation) => conversation.id === message.conversationId,
      );

      if (!conversationExists) {
        return [createConversationFromMessage(message), ...prev];
      }

      return prev.map((conversation) => {
        if (conversation.id !== message.conversationId) return conversation;

        const nextMessages = dedupeMessages([
          ...conversation.messages,
          message,
        ]);

        return {
          ...conversation,
          messages: nextMessages,
          lastMessageText: message.text,
          lastMessageAt: message.createdAt || new Date().toISOString(),
          unreadCount:
            activeId === conversation.id ? 0 : conversation.unreadCount + 1,
        };
      });
    });
  }, []);

  const sendMessage = useCallback(
    async (message: string) => {
      const text = message.trim();

      if (!text || !activeConversationId || isSending) return;

      const tempMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        conversationId: activeConversationId,
        senderId: null,
        receiverId: activeConversationId,
        text,
        type: "text",
        createdAt: new Date().toISOString(),
        isOwn: true,
        isPending: true,
      };

      appendMessage(tempMessage);

      try {
        setIsSending(true);
        setError(null);

        const savedMessage = await chatApi.sendMessage({
          receiverId: activeConversationId,
          message: text,
        });

        setConversations((prev) =>
          prev.map((conversation) => {
            if (conversation.id !== activeConversationId) {
              return conversation;
            }

            const messages = conversation.messages.map((item) =>
              item.id === tempMessage.id ? savedMessage : item,
            );

            return {
              ...conversation,
              messages: dedupeMessages(messages),
              lastMessageText: savedMessage.text,
              lastMessageAt: savedMessage.createdAt || new Date().toISOString(),
            };
          }),
        );
      } catch (err) {
        setError(getErrorMessage(err));

        setConversations((prev) =>
          prev.map((conversation) =>
            conversation.id === activeConversationId
              ? {
                  ...conversation,
                  messages: conversation.messages.filter(
                    (item) => item.id !== tempMessage.id,
                  ),
                }
              : conversation,
          ),
        );
      } finally {
        setIsSending(false);
      }
    },
    [activeConversationId, appendMessage, isSending],
  );

  useEffect(() => {
    reloadConversations();
  }, [reloadConversations]);

  useEffect(() => {
    let channel: any = null;

    try {
      const pusher = getPusherClient();
      const channelName = chatConfig.pusher.channelName;

      channel = pusher.subscribe(channelName);

      const handleRealtimeMessage = (payload: unknown) => {
        const rawMessage = extractRealtimeMessage(payload);

        const normalizedMessage = normalizeMessage(
          rawMessage,
          activeConversationIdRef.current || undefined,
        );

        appendMessage(normalizedMessage);
      };

      channel.bind(chatConfig.pusher.eventName, handleRealtimeMessage);

      channel.bind("pusher:subscription_succeeded", () => {
        console.log("Pusher subscribed:", channelName);
      });

      channel.bind(
        "pusher:subscription_error",
        (subscriptionError: unknown) => {
          console.error("Pusher subscription error:", subscriptionError);
        },
      );

      return () => {
        if (!channel) return;

        channel.unbind(chatConfig.pusher.eventName, handleRealtimeMessage);
        pusher.unsubscribe(channelName);
      };
    } catch (err) {
      console.error("Pusher setup error:", err);
      setError(getErrorMessage(err));
    }
  }, [appendMessage]);

  const value: ChatContextValue = {
    conversations,
    activeConversation,
    activeConversationId,
    isLoadingConversations,
    isLoadingMessages,
    isSending,
    error,
    selectConversation,
    sendMessage,
    reloadConversations,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider.");
  }

  return context;
};