import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

/* =========================
   TYPES
========================= */
export interface PricingItem {
  type: string;
  duration: string;
  price: string | number;
  description: string | null;
  features: string[] | null;
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
  }),
  overrideExisting: true,
});

export const { useGetServicesListQuery } = serviceManagementApi;
export default serviceManagementApi;
