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
  order_id?: number | string | null;
  service_image?: string[] | null;
  event_name?: string | null;
  order_by?: string | null;
  price?: string | null;
  due_in?: string | null;
  status?: string | null;
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

const adminOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrders: builder.query<AdminOrderListResponse, void>({
      query: () => "/admin/order/index",
      providesTags: ["User"],
    }),

    getAdminOrderDetails: builder.query<AdminOrderDetailsResponse, string>({
      query: (id) => `/admin/order/show/${id}`,
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
