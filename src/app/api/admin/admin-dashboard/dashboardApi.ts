
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../../baseApi";


/* =========================
   OVERVIEW
========================= */

export type DashboardOverview = {
  total_users: number;
  total_revenue: string;
  active_orders: number;
};

export type DashboardSalesDetails = {
  filter: string;
  labels: string[];
  last: number[];
  this: number[];
};

export type DashboardOverviewResponse = {
  success: boolean;
  message: string;
  overview: DashboardOverview;
  sales_details: DashboardSalesDetails;
};

/* =========================
   USER SUMMARY
========================= */

export type UserSummaryStats = {
  total_orders: number;
  processing: number;
  active_orders: number;
  delivered: number;
};

export type CustomerInfo = {
  id: number;
  image: string | null;
  name: string;
  email: string;
  total_order: number;
  complete_order: number;
  pending_order: number;
  total_spent: string;
};

export type UserSummaryItem = {
  customer_info: CustomerInfo;
};

export type UserSummaryMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export type UserSummaryResponse = {
  success: boolean;
  summary: UserSummaryStats;
  data: UserSummaryItem[];
  meta: UserSummaryMeta;
};

export type UserSummaryParams = {
  search?: string;
  period?: string;
  page?: number;
  per_page?: number;
};

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

  return {
    status,
    data: dataOrMessage,
  };
};

/* =========================
   API
========================= */

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* -------------------------
       Dashboard Overview
    ------------------------- */

    getDashboardOverview: builder.query<
      DashboardOverviewResponse,
      "yearly" | "monthly" | void
    >({
      queryFn: async (filter = "yearly") => {
        try {
          const response = await fetch(
            `/api/admin/admin-dashboard/index?filter=${filter}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              credentials: "include",
              cache: "no-store",
            },
          );

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as DashboardOverviewResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },

      providesTags: ["User"],
    }),

    /* -------------------------
       User Summary
    ------------------------- */

    getUserSummary: builder.query<
      UserSummaryResponse,
      UserSummaryParams | void
    >({
      queryFn: async (params) => {
        try {
          const search = params?.search || "";
          const period = params?.period || "";
          const page = params?.page || 1;
          const per_page = params?.per_page || 10;

          const response = await fetch(
            `/api/admin/admin-order/index?search=${search}&period=${period}&page=${page}&per_page=${per_page}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              credentials: "include",
              cache: "no-store",
            },
          );

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as UserSummaryResponse,
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
  useGetDashboardOverviewQuery,
  useGetUserSummaryQuery,
} = dashboardApi;
