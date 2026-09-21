import { baseApi } from "../baseApi";

/* =========================
   TYPES
   ========================= */
export interface CreateOrderPayload {
  service_id: number;
  service_pricing_id: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  event_name: string;
  guest_count: number;
  event_duration: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  start_time: string;
  end_time: string;
  question_one: string;
  question_two: string;
  question_three: string;
  question_four: string;
  question_five: string;
  question_six: string;
  include_order_ids: number[];
  agree_terms: boolean;
  payment_method: string;
  payment_method_id: string;
}

export interface CreateOrderResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  order_id?: number;
  payment_status?: string;
  data?: {
    order_id: number;
    order_number: string;
    payment_intent?: string;
    requires_verification?: boolean;
  };
}

/* =========================
   API ENDPOINTS
   ========================= */
const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderPayload>({
      query: (body) => ({
        url: "/admin/order/create-order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateOrderMutation } = bookingApi;
export default bookingApi;
