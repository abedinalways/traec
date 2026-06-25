import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
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
   HELPERS
========================= */
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

/* =========================
   API ENDPOINTS
========================= */
export const serviceManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServicesList: builder.query<
      ServiceListResponse,
      ServiceQueryParams | void
    >({
      queryFn: async (params) => {
        try {
          const search = params?.search ?? "";
          const category = params?.category ?? "";
          const page = params?.page ?? 1;
          const per_page = params?.per_page ?? 9;

          
          const response = await fetch(
            `/api/services?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${page}&per_page=${per_page}`,
            {
              method: "GET",
              headers: { Accept: "application/json" },
              credentials: "include",
              cache: "no-store",
            },
          );

          const data = await parseJson(response);
          if (!response.ok)
            return { error: createFetchError(response.status, data) };

          return { data: data as ServiceListResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      providesTags: ["Providers"],
    }),

    getServiceDetails: builder.query<ServiceDetailsResponse, string | number>({
      queryFn: async (id) => {
        try {
          const response = await fetch(`/api/services/${id}`, {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
            cache: "no-store",
          });

          const data = await parseJson(response);
          if (!response.ok)
            return { error: createFetchError(response.status, data) };

          return { data: data as ServiceDetailsResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      providesTags: (result, error, id) => [{ type: "Providers", id }],
    }),
  
  }),
  overrideExisting: true,
});

export const { useGetServicesListQuery, useGetServiceDetailsQuery } = serviceManagementApi;
export default serviceManagementApi;
