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
   API
========================= */

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<
      DashboardOverviewResponse,
      "yearly" | "monthly" | void
    >({
      query: (filter = "yearly") => ({
        url: "/admin/admin-dashboard/index",
        params: { filter },
      }),
      providesTags: ["User"],
    }),

    getUserSummary: builder.query<
      UserSummaryResponse,
      UserSummaryParams | void
    >({
      query: (params) => ({
        url: "/admin/admin-order/index",
        params: {
          search: params?.search || "",
          period: params?.period || "",
          page: params?.page || 1,
          per_page: params?.per_page || 10,
        },
      }),
      providesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetDashboardOverviewQuery, useGetUserSummaryQuery } =
  dashboardApi;
