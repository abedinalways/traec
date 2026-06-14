import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
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
   API
========================= */

export const orderManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getOrdersIndex: builder.query<OrderIndexResponse, OrderManagementParams | void>({
            queryFn: async (params) => {
                try {
                    const search = params?.search ?? "";
                    const status = params?.status ?? "";
                    const period = params?.period ?? "";
                    const page = params?.page ?? 1;
                    const per_page = params?.per_page ?? 10;

                    const response = await fetch(
                        `/api/admin/admin-order/index?search=${search}&status=${status}&period=${period}&page=${page}&per_page=${per_page}`,
                        {
                            method: "GET",
                            headers: { Accept: "application/json" },
                            credentials: "include",
                            cache: "no-store",
                        },
                    );

                    const data = await parseJson(response);

                    if (!response.ok) {
                        return { error: createFetchError(response.status, data) };
                    }

                    return { data: data as OrderIndexResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },
            providesTags: ["Orders" as any],
        }),


        getOrderDetails: builder.query<OrderDetailsResponse, number>({
            queryFn: async (id) => {
                try {
                    const response = await fetch(`/api/admin/admin-order/show-details/${id}`, {
                        method: "GET",
                        headers: { Accept: "application/json" },
                        credentials: "include",
                        cache: "no-store",
                    });

                    const data = await parseJson(response);

                    if (!response.ok) {
                        return { error: createFetchError(response.status, data) };
                    }

                    return { data: data as OrderDetailsResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },
        }),


        deleteOrderUser: builder.mutation<{ success: boolean; message: string }, number>({
            queryFn: async (id) => {
                try {
                    const response = await fetch(`/api/admin/client/delete-user/${id}`, {
                        method: "DELETE",
                        headers: { Accept: "application/json" },
                        credentials: "include",
                    });

                    const data = await parseJson(response);

                    if (!response.ok) {
                        return { error: createFetchError(response.status, data) };
                    }

                    return { data: data as any };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },
            invalidatesTags: ["Orders" as any],
        }),
    }),

    overrideExisting: true,
});

export const {
    useGetOrdersIndexQuery,
    useLazyGetOrderDetailsQuery,
    useDeleteOrderUserMutation,
} = orderManagementApi;