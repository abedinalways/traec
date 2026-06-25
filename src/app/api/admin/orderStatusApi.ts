import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export interface UpdateOrderStatusPayload {
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface UpdateOrderStatusResponse {
  success?: boolean;
  message?: string;
}

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

const orderStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation<
      UpdateOrderStatusResponse,
      { id: string | number; status: UpdateOrderStatusPayload["status"] }
    >({
      queryFn: async ({ id, status }) => {
        try {
          const response = await fetch(`/api/admin/order/update-status/${id}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ status }),
          });

          const data = await parseJson(response);
          if (!response.ok)
            return { error: createFetchError(response.status, data) };

          return { data: data as UpdateOrderStatusResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: true,
});

export const { useUpdateOrderStatusMutation } = orderStatusApi;
export default orderStatusApi;