import { baseApi } from "../baseApi";

/* =========================
   TYPES
========================= */

export interface OrderCustomerInfo {
  id: number;
  image_url: string | null;
  name: string;
  email: string;
  total_order: number;
  complete_order: number;
  pending_order: number;
  total_spent: string;
}

export interface OrderIndexResponse {
  success: boolean;
  summary: {
    total_orders: number;
    processing: number;
    active_orders: number;
    delivered: number;
  };
  data: {
    customer_info: OrderCustomerInfo;
  }[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface OrderDetailsResponse {
  success: boolean;
  data: {
    customer: {
      id: number;
      name: string;
      email: string;
      phone: string | null;
      image: string | null;
      address: string;
      status: "Active" | "Inactive";
      is_verified: boolean;
      joined: string;
    };
    orders: {
      total_orders: number;
      completed_orders: number;
      pending_orders: number;
    };
    payments: {
      total_spent: string;
    };
  };
}

export type OrderManagementParams = {
  search?: string;
  status?: string;
  period?: string;
  page?: number;
  per_page?: number;
};

/* =========================
   API
========================= */

export const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersIndex: builder.query<
      OrderIndexResponse,
      OrderManagementParams | void
    >({
      query: (params) => ({
        url: "/admin/admin-order/index",
        params: {
          search: params?.search ?? "",
          status: params?.status ?? "",
          period: params?.period ?? "",
          page: params?.page ?? 1,
          per_page: params?.per_page ?? 10,
        },
      }),
      providesTags: ["Orders" as const],
    }),

    getOrderDetails: builder.query<OrderDetailsResponse, number>({
      query: (id) => `/admin/admin-order/show-details/${id}`,
    }),

    deleteOrderUser: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/admin/client/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders" as const],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetOrdersIndexQuery,
  useLazyGetOrderDetailsQuery,
  useDeleteOrderUserMutation,
} = orderManagementApi;
