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

export interface SendMessagePayload {
  receiverId: string | number;
  message: string;
  attachments?: File[];
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<ApiResponse<Conversation[]>, void>({
      query: () => ({
        url: "/admin/message/sms-list",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    getMessages: builder.query<ApiResponse<Message[]>, GetMessagesPayload>({
      query: ({ receiverId }) => ({
        url: "/admin/message/index",
        method: "GET",
        params: {
          receiver_id: receiverId,
        },
      }),

      serializeQueryArgs: ({ queryArgs }) => String(queryArgs.receiverId),

      providesTags: (result, error, arg) => [
        { type: "Chat", id: String(arg.receiverId) },
      ],
    }),

    sendMessage: builder.mutation<ApiResponse<Message>, SendMessagePayload>({
      query: ({ receiverId, message, attachments }) => {
        const formData = new FormData();

        formData.append("receiver_id", String(receiverId));

        if (message.trim()) {
          formData.append("message", message.trim());
        }

        attachments?.forEach((file) => {
          formData.append("attachments[]", file);
        });

        return {
          url: "/admin/message/send",
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: (result, error, arg) => [
        "Chat",
        { type: "Chat", id: String(arg.receiverId) },
      ],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
