import { baseApi } from "../baseApi";

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

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    storeReview: builder.mutation<StoreReviewResponse, StoreReviewPayload>({
      query: (body) => ({
        url: "/admin/review/store",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    replyToReview: builder.mutation<
      ReplyToReviewResponse,
      { id: string | number; reply: string }
    >({
      query: ({ id, reply }) => ({
        url: `/admin/review/reply/${id}`,
        method: "PATCH",
        body: { reply },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: true,
});

export const { useStoreReviewMutation, useReplyToReviewMutation } = reviewApi;
export default reviewApi;
