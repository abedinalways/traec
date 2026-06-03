import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { baseApi } from "../baseApi";

export interface ApiResponse<T> {
  success?: boolean;
  status?: boolean | string;
  message?: string;
  data: T;
}

export interface ChatUser {
  id: string | number;
  name?: string | null;
  last_name?: string | null;
  email?: string | null;
  image?: string | null;
  avatar?: string | null;
  avatar_url?: string | null;
  type?: string | number | null;
  phone?: string | null;
}

export interface ChatAttachment {
  id?: string | number;
  file_url?: string;
  url?: string;
  type?: string;
  name?: string;
  size?: number;
}

export interface Message {
  id: string | number;
  sender_id?: string | number;
  receiver_id?: string | number;
  conversation_id?: string | number | null;
  message?: string | null;
  type?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  sender?: ChatUser | null;
  receiver?: ChatUser | null;
  attachments?: ChatAttachment[];
}

export interface Conversation {
  id?: string | number;
  conversation_id?: string | number;
  sender_id?: string | number;
  receiver_id?: string | number;

  name?: string | null;
  last_name?: string | null;
  email?: string | null;
  image?: string | null;
  avatar?: string | null;
  avatar_url?: string | null;

  sender?: ChatUser | null;
  receiver?: ChatUser | null;
  user?: ChatUser | null;

  message?: string | null;
  last_message?: string | Message | null;

  unread_count?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface GetMessagesPayload {
  receiverId: string | number;
}

export interface StartConversationPayload {
  receiverId: string | number;
}

export interface SendMessagePayload {
  receiverId: string | number;
  message: string;
  attachments?: File[];
}

export type MessageIndexData =
  | Message[]
  | {
      messages?: Message[];
      conversation?: Conversation;
      receiver?: ChatUser;
    };

export const getMessagesFromIndexData = (
  payload?: MessageIndexData | null,
): Message[] => {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload;

  return payload.messages || [];
};

export const dedupeMessages = (messages: Message[]) => {
  const seen = new Set<string>();

  return messages.filter((message) => {
    const key = String(message.id);

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

type LocalRequestError = {
  status: number | "FETCH_ERROR";
  data?: unknown;
  error?: string;
};

const parseLocalResponse = async (response: Response) => {
  const text = await response.text();

  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const isLocalRequestError = (error: unknown): error is LocalRequestError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (typeof (error as LocalRequestError).status === "number" ||
      (error as LocalRequestError).status === "FETCH_ERROR")
  );
};

const toBaseQueryError = (error: unknown): FetchBaseQueryError => {
  if (isLocalRequestError(error)) {
    if (error.status === "FETCH_ERROR") {
      return {
        status: "FETCH_ERROR",
        error: error.error || "Request failed.",
      };
    }

    return {
      status: error.status,
      data: error.data,
    };
  }

  return {
    status: "FETCH_ERROR",
    error: error instanceof Error ? error.message : "Request failed.",
  };
};

const localApiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const response = await fetch(path, {
      ...options,
      credentials: "include",
      cache: "no-store",
    });

    const data = await parseLocalResponse(response);

    if (!response.ok) {
      throw {
        status: response.status,
        data,
      } satisfies LocalRequestError;
    }

    return data as T;
  } catch (error) {
    if (isLocalRequestError(error)) {
      throw error;
    }

    throw {
      status: "FETCH_ERROR",
      error: error instanceof Error ? error.message : "Request failed.",
    } satisfies LocalRequestError;
  }
};

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<ApiResponse<Conversation[]>, void>({
      queryFn: async () => {
        try {
          return {
            data: await localApiFetch<ApiResponse<Conversation[]>>(
              "/api/messages/conversations",
            ),
          };
        } catch (error) {
          return {
            error: toBaseQueryError(error),
          };
        }
      },
      providesTags: ["Chat"],
    }),

    startConversation: builder.mutation<
      ApiResponse<MessageIndexData>,
      StartConversationPayload
    >({
      queryFn: async ({ receiverId }) => {
        try {
          return {
            data: await localApiFetch<ApiResponse<MessageIndexData>>(
              "/api/messages/start",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ receiverId }),
              },
            ),
          };
        } catch (error) {
          return {
            error: toBaseQueryError(error),
          };
        }
      },

      invalidatesTags: (result, error, arg) => [
        "Chat",
        { type: "Chat", id: String(arg.receiverId) },
      ],
    }),

    getMessages: builder.query<
      ApiResponse<MessageIndexData>,
      GetMessagesPayload
    >({
      queryFn: async ({ receiverId }) => {
        try {
          return {
            data: await localApiFetch<ApiResponse<MessageIndexData>>(
              `/api/messages/${encodeURIComponent(String(receiverId))}`,
            ),
          };
        } catch (error) {
          return {
            error: toBaseQueryError(error),
          };
        }
      },

      serializeQueryArgs: ({ queryArgs }) => String(queryArgs.receiverId),

      providesTags: (result, error, arg) => [
        { type: "Chat", id: String(arg.receiverId) },
      ],
    }),

    sendMessage: builder.mutation<ApiResponse<Message>, SendMessagePayload>({
      queryFn: async ({ receiverId, message, attachments }) => {
        const formData = new FormData();

        formData.append("receiver_id", String(receiverId));

        if (message.trim()) {
          formData.append("message", message.trim());
        }

        attachments?.forEach((file) => {
          formData.append("attachments[]", file);
        });

        try {
          return {
            data: await localApiFetch<ApiResponse<Message>>(
              "/api/messages/send",
              {
                method: "POST",
                body: formData,
              },
            ),
          };
        } catch (error) {
          return {
            error: toBaseQueryError(error),
          };
        }
      },

      // Use onQueryStarted for optimistic update instead of invalidatesTags
      // This avoids race conditions where invalidation refetch returns stale data
      onQueryStarted: async ({ receiverId, message }, { dispatch, queryFulfilled }) => {
        try {
          const { data: response } = await queryFulfilled;
          const sentMessage = response?.data;

          if (sentMessage) {
            // Update messages cache for the conversation
            dispatch(
              chatApi.util.updateQueryData(
                "getMessages",
                { receiverId: String(receiverId) },
                (draft) => {
                  const existingMessages = getMessagesFromIndexData(draft.data);

                  if (existingMessages.some((m) => String(m.id) === String(sentMessage.id))) {
                    return;
                  }

                  const nextMessages = dedupeMessages([...existingMessages, sentMessage]);

                  if (Array.isArray(draft.data)) {
                    draft.data = nextMessages;
                  } else if (draft.data) {
                    draft.data.messages = nextMessages;
                  }
                },
              ),
            );

            // Update conversation list with latest message
            dispatch(
              chatApi.util.updateQueryData("getConversations", undefined, (draft) => {
                const conversations = draft.data || [];
                const matched = conversations.find(
                  (c) => String(c.receiver_id) === String(receiverId) || String(c.sender_id) === String(receiverId),
                );
                if (matched) {
                  matched.last_message = sentMessage;
                  matched.message = sentMessage.message;
                  matched.updated_at = sentMessage.created_at || new Date().toISOString();
                }
              }),
            );
          }

          // Delayed refetch for eventual consistency
          setTimeout(() => {
            dispatch(chatApi.util.invalidateTags([
              "Chat",
              { type: "Chat", id: String(receiverId) },
            ]));
          }, 3000);
        } catch {
          // If send failed, invalidate to refetch clean state
          dispatch(chatApi.util.invalidateTags([
            "Chat",
            { type: "Chat", id: String(receiverId) },
          ]));
        }
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetConversationsQuery,
  useStartConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
