import { baseApi } from "../baseApi";

/* =========================
   TYPES
========================= */

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface ServiceDetailsResponse {
  success: boolean;
  message: string;
  data: ServiceItem & {
    faqs?: FaqItem[];
  };
}
export interface PricingItem {
  id: number;
  type: string;
  duration: string;
  price: string | number;
  description: string | null;
  features: string[] | null;
}

export interface ServiceReview {
  id: number;
  reviewer_name: string;
  rating: number;
  review: string;
  reply: string | null;
  has_replied: boolean;
  created_at: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  location: string;
  provider_name: string;
  image_url: string;
  description: string;
  images: string[];
  category: string;
  pricings: PricingItem[];
  created_at: string;
  stripe_public_key?: string;
  reviews?: ServiceReview[];
}

export interface ServiceMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ServiceListResponse {
  success: boolean;
  message: string;
  data: ServiceItem[];
  meta: ServiceMeta;
}

export interface ServiceQueryParams {
  search?: string;
  category?: string;
  page?: number;
  per_page?: number;
}

/* =========================
   API ENDPOINTS
========================= */
export const serviceManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServicesList: builder.query<
      ServiceListResponse,
      ServiceQueryParams | void
    >({
      query: (params) => ({
        url: "/services",
        params: {
          search: params?.search ?? "",
          category: params?.category ?? "",
          page: params?.page ?? 1,
          per_page: params?.per_page ?? 9,
        },
      }),
      providesTags: ["Providers"],
    }),

    getServiceDetails: builder.query<ServiceDetailsResponse, string | number>({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: "Providers", id }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetServicesListQuery, useGetServiceDetailsQuery } =
  serviceManagementApi;
export default serviceManagementApi;
