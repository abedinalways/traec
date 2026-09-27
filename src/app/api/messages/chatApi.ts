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
  message_id?: string | number;
  file_path?: string;
  file_name?: string;
  file_type?: string;
  file_size?: string | number;
  created_at?: string | null;
  updated_at?: string | null;
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
  | { messages?: Message[]; conversation?: Conversation; receiver?: ChatUser };

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

const extractConversations = (response: unknown): Conversation[] => {
  if (!response) return [];
  if (Array.isArray(response)) return response as Conversation[];
  const r = response as Record<string, unknown>;
  if (Array.isArray(r.data)) return r.data as Conversation[];
  const rData = r.data as Record<string, unknown> | undefined;
  if (rData && Array.isArray(rData.data)) return rData.data as Conversation[];
  if (rData && Array.isArray(rData.conversations))
    return rData.conversations as Conversation[];
  return [];
};

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Conversations — direct backend call ───────────────────────────
    getConversations: builder.query<Conversation[], void>({
      query: () => "/admin/message/sms-list",
      transformResponse: (response: unknown): Conversation[] =>
        extractConversations(response),
      providesTags: ["Chat"],
    }),

    // ── Start conversation — backend uses GET with receiver_id param ──
    startConversation: builder.mutation<
      ApiResponse<MessageIndexData>,
      StartConversationPayload
    >({
      query: ({ receiverId }) =>
        `/admin/message/index?receiver_id=${encodeURIComponent(String(receiverId))}`,
      invalidatesTags: (result, error, arg) => [
        "Chat",
        { type: "Chat", id: String(arg.receiverId) },
      ],
    }),

    // ── Get messages — direct backend call ────────────────────────────
    getMessages: builder.query<
      ApiResponse<MessageIndexData>,
      GetMessagesPayload
    >({
      query: ({ receiverId }) =>
        `/admin/message/index?receiver_id=${encodeURIComponent(String(receiverId))}`,
      serializeQueryArgs: ({ queryArgs }) => String(queryArgs.receiverId),
      providesTags: (result, error, arg) => [
        { type: "Chat", id: String(arg.receiverId) },
      ],
    }),

    // ── Send message — KEEP as queryFn (Pusher server-side trigger) ───
    sendMessage: builder.mutation<ApiResponse<Message>, SendMessagePayload>({
      queryFn: async ({ receiverId, message, attachments }) => {
        const formData = new FormData();
        formData.append("receiver_id", String(receiverId));
        if (message.trim()) formData.append("message", message.trim());
        attachments?.forEach((file) => formData.append("files[]", file));

        try {
          const response = await fetch("/api/messages/send", {
            method: "POST",
            body: formData,
            credentials: "include",
          });
          const data = await response.json();
          if (!response.ok) {
            return {
              error: { status: response.status, data } as FetchBaseQueryError,
            };
          }
          return { data: data as ApiResponse<Message> };
        } catch (error) {
          return {
            error: {
              status: "FETCH_ERROR",
              error: error instanceof Error ? error.message : "Request failed.",
            } as FetchBaseQueryError,
          };
        }
      },
      onQueryStarted: async (
        { receiverId, message, attachments: _att },
        { dispatch, queryFulfilled },
      ) => {
        try {
          const { data: response } = await queryFulfilled;
          const sentMessage = response?.data;

          if (sentMessage) {
            dispatch(
              chatApi.util.updateQueryData(
                "getConversations",
                undefined,
                (draft) => {
                  if (!Array.isArray(draft)) return;

                  const matched = draft.find(
                    (c: Conversation) =>
                      String(c.receiver_id) === String(receiverId) ||
                      String(c.sender_id) === String(receiverId),
                  );

                  if (matched) {
                    matched.last_message = sentMessage;
                    matched.message = sentMessage.message;
                    matched.updated_at =
                      sentMessage.created_at || new Date().toISOString();
                  }
                },
              ),
            );

            // Always refresh after send so attachments appear correctly
            setTimeout(() => {
              dispatch(
                chatApi.util.invalidateTags([
                  { type: "Chat", id: String(receiverId) },
                ]),
              );
            }, 800);
          }
        } catch {
          dispatch(
            chatApi.util.invalidateTags([
              { type: "Chat", id: String(receiverId) },
            ]),
          );
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
