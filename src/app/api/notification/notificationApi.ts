import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
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

type LocalRequestError = {
  status: number | "FETCH_ERROR";
  data?: unknown;
  error?: string;
};

const parseLocalResponse = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const isLocalRequestError = (error: unknown): error is LocalRequestError =>
  typeof error === "object" &&
  error !== null &&
  "status" in error &&
  (typeof (error as LocalRequestError).status === "number" ||
    (error as LocalRequestError).status === "FETCH_ERROR");

const toBaseQueryError = (error: unknown): FetchBaseQueryError => {
  if (isLocalRequestError(error)) {
    if (error.status === "FETCH_ERROR")
      return { status: "FETCH_ERROR", error: error.error || "Request failed." };
    return { status: error.status, data: error.data };
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
  const response = await fetch(path, {
    ...options,
    credentials: "include",
    cache: "no-store",
  });
  const data = await parseLocalResponse(response);
  if (!response.ok)
    throw { status: response.status, data } satisfies LocalRequestError;
  return data as T;
};

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnreadCount: builder.query<UnreadCountResponse, void>({
      queryFn: async () => {
        try {
          const response = await localApiFetch<UnreadCountResponse>("/api/admin/notification/unread-count");
          return { data: response };
        } catch (error) {
          return { error: toBaseQueryError(error) };
        }
      },
      providesTags: ["Notifications"],
    }),

    getChatUnreadCount: builder.query<ChatUnreadCountResponse, void>({
      queryFn: async () => {
        try {
          const response = await localApiFetch<ChatUnreadCountResponse>("/api/admin/notification/chat-unread-count");
          return { data: response };
        } catch (error) {
          return { error: toBaseQueryError(error) };
        }
      },
      providesTags: ["Notifications"],
    }),

    markNotificationRead: builder.mutation<MarkReadResponse, { sender_id: number }>({
      queryFn: async ({ sender_id }) => {
        try {
          const response = await localApiFetch<MarkReadResponse>("/api/admin/notification/read", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sender_id: Number(sender_id) }),
          });
          return { data: response };
        } catch (error) {
          return { error: toBaseQueryError(error) };
        }
      },
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