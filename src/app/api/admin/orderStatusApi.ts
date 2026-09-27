import { baseApi } from "../baseApi";

export interface UpdateOrderStatusPayload {
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface UpdateOrderStatusResponse {
  success?: boolean;
  message?: string;
}

const orderStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation<
      UpdateOrderStatusResponse,
      { id: string | number; status: UpdateOrderStatusPayload["status"] }
    >({
      query: ({ id, status }) => ({
        url: `/admin/order/update-status/${id}`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: true,
});

export const { useUpdateOrderStatusMutation } = orderStatusApi;
export default orderStatusApi;
