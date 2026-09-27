import { baseApi } from "../baseApi";

/* =========================
   TYPES
========================= */
export interface PromotionItem {
  id: number;
  name: string;
  discount: number | string;
  type: string;
  start_date: string;
  end_date: string;
  status: number | string;
}

export interface PromotionListResponse {
  success: boolean;
  message: string;
  data: PromotionItem[];
}

export interface SinglePromotionResponse {
  success: boolean;
  data: PromotionItem;
}

export interface PromotionPayload {
  name: string;
  discount: number;
  type: string;
  start_date: string;
  end_date: string;
  status: number;
}

/* =========================
   API ENDPOINTS
========================= */
export const promotionManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query<PromotionListResponse, void>({
      query: () => "/admin/promotions/index",
      providesTags: ["User"],
    }),

    getPromotionDetails: builder.query<SinglePromotionResponse, number>({
      query: (id) => `/admin/promotions/edit/${id}`,
    }),

    createPromotion: builder.mutation<
      SinglePromotionResponse,
      PromotionPayload
    >({
      query: (payload) => ({
        url: "/admin/promotions/store",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    updatePromotion: builder.mutation<
      SinglePromotionResponse,
      { id: number; payload: PromotionPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/admin/promotions/update/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    deletePromotion: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/admin/plan/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPromotionsQuery,
  useLazyGetPromotionDetailsQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionManagementApi;
