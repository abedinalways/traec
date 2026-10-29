import { baseApi } from "../baseApi";

/* =========================
   TYPES
========================= */

export type SellerProvider = {
  id: number;
  image_url: string | null;
  name: string;
  email: string;
  products: number;
  total_sales: string;
  joined: string;
  status: "Active" | "Inactive";
};

export type SellerProviderMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export type SellerProviderResponse = {
  success: boolean;
  data: SellerProvider[];
  meta: SellerProviderMeta;
};

export type SellerProviderParams = {
  search?: string;
  status?: string;
  period?: string;
  page?: number;
  per_page?: number;
};

/* =========================
   API
========================= */

export const sellerProvidersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerProviders: builder.query<
      SellerProviderResponse,
      SellerProviderParams | void
    >({
      query: (params) => ({
        url: "/admin/client/seller-index",
        params: {
          search: params?.search ?? "",
          status: params?.status ?? "",
          period: params?.period ?? "",
          page: params?.page ?? 1,
          per_page: params?.per_page ?? 10,
        },
      }),
      providesTags: ["Providers"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetSellerProvidersQuery } = sellerProvidersApi;
