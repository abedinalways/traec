import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
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
  success: boolean;
  message: string;
  data?: {
    order_id: number;
    order_number: string;
    payment_intent?: string;
    requires_verification?: boolean;
  };
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
const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderPayload>({
      queryFn: async (body) => {
        try {
          const response = await fetch("/api/admin/order/create-order", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
          });

          const data = await parseJson(response);
          if (!response.ok)
            return { error: createFetchError(response.status, data) };

          return { data: data as CreateOrderResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateOrderMutation } = bookingApi;
export default bookingApi;