import { baseApi } from "../baseApi";

export interface NotificationItem {
  id: string | number;
  sender_id: string | number;
  message: string;
  type?: string;
  created_at?: string | null;
  updated_at?: string | null;
  read_at?: string | null;
  sender?: {
    id: string | number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    avatar?: string | null;
    avatar_url?: string | null;
  } | null;
}

export interface ChatUnreadItem {
  sender_id: string | number;
  unread_count: number;
}

export interface UnreadCountResponse {
  status: string;
  total_unread_count: number;
}

export interface ChatUnreadCountResponse {
  status: string;
  data: ChatUnreadItem[];
}

export interface MarkReadResponse {
  status: string;
  message: string;
  read_messages_count: number;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => "/admin/notification/unread-count",
      providesTags: ["Notifications"],
    }),

    getChatUnreadCount: builder.query<ChatUnreadCountResponse, void>({
      query: () => "/admin/notification/chat-unread-count",
      providesTags: ["Notifications"],
    }),

    markNotificationRead: builder.mutation<
      MarkReadResponse,
      { sender_id: number }
    >({
      query: ({ sender_id }) => ({
        url: "/admin/notification/read",
        method: "POST",
        body: { sender_id: Number(sender_id) },
      }),
      invalidatesTags: ["Notifications", "Chat"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUnreadCountQuery,
  useGetChatUnreadCountQuery,
  useMarkNotificationReadMutation,
} = notificationApi;
