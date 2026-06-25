import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export type RawOrderReview = {
  id: number;
  rating: number;
  review: string;
  reply: string | null;
  has_replied: boolean;
  reviewed_at: string;
} | null;

export type RawOrder = {
  // ── INDEX (list) API — flat fields ──
  order_id?: number | string | null;
  service_image?: string[] | null;
  event_name?: string | null;
  order_by?: string | null;
  price?: string | null;
  due_in?: string | null;
  status?: string | null;

  // ── SHOW (detail) API — nested fields ──
  id?: number | string | null;

  order_started?: {
    order_by?: string | null;
    event_name?: string | null;
  } | null;

  "location & contact"?: {
    full_name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  } | null;

  event_details?: {
    event_type?: string | null;
    event_name?: string | null;
    duration?: string | null;
    guests?: number | string | null;
    description?: string | null;
  } | null;

  questionnaire?: Record<string, string> | null;

  order_details?: {
    service_image?: string[] | null;
    event_name?: string | null;
    order_by?: string | null;
    status?: string | null;
    order_number?: string | null;
    end_date?: string | null;
    amount_paid?: string | null;
    can_review?: boolean | null;
    review_id?: number | null;
    review?: {
      id: number;
      rating: number;
      review: string;
      reply: string | null;
      has_replied: boolean;
      reviewed_at: string;
    } | null;
  } | null;
};

export type AdminOrderListResponse = {
  success?: boolean;
  message?: string;
  data?: RawOrder[];
};

export type AdminOrderDetailsResponse = {
  success?: boolean;
  message?: string;
  data?: RawOrder;
  order?: RawOrder;
};

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

const adminOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrders: builder.query<AdminOrderListResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/api/admin/order/index", {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
            cache: "no-store",
          });
          const data = await parseJson(response);
          if (!response.ok) {
            return { error: createFetchError(response.status, data) };
          }
          return { data: data as AdminOrderListResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      providesTags: ["User"],
    }),

    getAdminOrderDetails: builder.query<AdminOrderDetailsResponse, string>({
      queryFn: async (id) => {
        try {
          const response = await fetch(`/api/admin/order/show/${id}`, {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
            cache: "no-store",
          });
          const data = await parseJson(response);
          if (!response.ok) {
            return { error: createFetchError(response.status, data) };
          }
          return { data: data as AdminOrderDetailsResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      providesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAdminOrdersQuery,
  useLazyGetAdminOrdersQuery,
  useGetAdminOrderDetailsQuery,
} = adminOrderApi;

export default adminOrderApi;
