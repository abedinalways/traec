import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export type RawOrder = {
  id?: number | string;
  order_id?: number | string;
  order_number?: string | null;
  title?: string | null;
  event_title?: string | null;
  service_title?: string | null;
  image?: string | null;
  event_image?: string | null;
  status?: string | null;
  due_in?: string | null;
  due_date?: string | null;
  price?: number | string | null;
  amount?: number | string | null;
  amount_paid?: number | string | null;
  total?: number | string | null;
  created_at?: string | null;
  updated_at?: string | null;
  completed_at?: string | null;

  provider_name?: string | null;
  vendor_name?: string | null;
  provider?: {
    name?: string | null;
    last_name?: string | null;
    email?: string | null;
  } | null;

  service?: {
    title?: string | null;
    image?: string | null;
    images?: string[] | null;
    description?: string | null;
    provider?: {
      name?: string | null;
      last_name?: string | null;
    } | null;
  } | null;

  timeline?: {
    label?: string;
    time?: string;
    status?: string;
  }[];
};

export type AdminOrderListResponse = {
  success?: boolean;
  message?: string;
  data?: RawOrder[] | { data?: RawOrder[]; orders?: RawOrder[] };
  orders?: RawOrder[];
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

  return {
    status,
    data: dataOrMessage,
  };
};

const adminOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrders: builder.query<AdminOrderListResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/api/admin/order/index", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            cache: "no-store",
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as AdminOrderListResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      providesTags: ["User"],
    }),

    getAdminOrderDetails: builder.query<AdminOrderDetailsResponse, string>({
      queryFn: async (id) => {
        try {
          const response = await fetch(`/api/admin/order/show/${id}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            cache: "no-store",
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as AdminOrderDetailsResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
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
