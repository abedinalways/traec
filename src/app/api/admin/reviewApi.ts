import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";
import { env } from "@/lib/env";

export interface StoreReviewPayload {
  order_id: number;
  review: string;
  rating: number;
}

export interface ReplyToReviewPayload {
  reply: string;
}

export interface StoreReviewResponse {
  success?: boolean;
  message?: string;
}

export interface ReplyToReviewResponse {
  success?: boolean;
  message?: string;
}

const parseJson = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const createFetchError = (
  status: number | "FETCH_ERROR",
  dataOrMessage: unknown,
): FetchBaseQueryError => {
  if (status === "FETCH_ERROR") {
    return {
      status: "FETCH_ERROR",
      error:
        dataOrMessage instanceof Error
          ? dataOrMessage.message
          : String(dataOrMessage || "Request failed"),
    };
  }
  return { status, data: dataOrMessage };
};

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    storeReview: builder.mutation<StoreReviewResponse, StoreReviewPayload>({
      queryFn: async (body) => {
        try {
          const token = typeof document !== "undefined"
            ? decodeURIComponent(
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("jr_auth_token="))
                  ?.split("=")[1] || ""
              )
            : undefined;

          const response = await fetch(`${env.apiBaseUrl}/admin/review/store`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}`, access_token: token } : {}),
            },
            credentials: "include",
            body: JSON.stringify(body),
          });

          const data = await parseJson(response);
          if (!response.ok)
            return { error: createFetchError(response.status, data) };

          return { data: data as StoreReviewResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      invalidatesTags: ["Orders"],
    }),

    replyToReview: builder.mutation<
      ReplyToReviewResponse,
      { id: string | number; reply: string }
    >({
      queryFn: async ({ id, reply }) => {
        try {
          const token = typeof document !== "undefined"
            ? decodeURIComponent(
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("jr_auth_token="))
                  ?.split("=")[1] || ""
              )
            : undefined;

          const response = await fetch(`${env.apiBaseUrl}/admin/review/reply/${id}`, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}`, access_token: token } : {}),
            },
            credentials: "include",
            body: JSON.stringify({ reply }),
          });

          const data = await parseJson(response);
          if (!response.ok)
            return { error: createFetchError(response.status, data) };

          return { data: data as ReplyToReviewResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: true,
});

export const { useStoreReviewMutation, useReplyToReviewMutation } = reviewApi;
export default reviewApi;