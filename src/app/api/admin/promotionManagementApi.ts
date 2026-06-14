import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

/* =========================
   TYPES
========================= */
export interface PromotionItem {
    id: number;
    name: string;
    discount: number | string;
    type: string;
    start_date: string;
    end_date: string;
    status: number | string;
}

export interface PromotionListResponse {
    success: boolean;
    message: string;
    data: PromotionItem[];
}

export interface SinglePromotionResponse {
    success: boolean;
    data: PromotionItem;
}

export interface PromotionPayload {
    name: string;
    discount: number;
    type: string;
    start_date: string;
    end_date: string;
    status: number;
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

const createFetchError = (status: number | "FETCH_ERROR", dataOrMessage: unknown): FetchBaseQueryError => {
    if (status === "FETCH_ERROR") {
        return {
            status: "FETCH_ERROR",
            error: dataOrMessage instanceof Error ? dataOrMessage.message : String(dataOrMessage || "Request failed"),
        };
    }
    return { status, data: dataOrMessage };
};

/* =========================
   API ENDPOINTS
========================= */
export const promotionManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPromotions: builder.query<PromotionListResponse, void>({
            queryFn: async () => {
                try {
                    const response = await fetch("/api/admin/promotions/index", {
                        method: "GET",
                        headers: { Accept: "application/json" },
                        credentials: "include",
                        cache: "no-store",
                    });
                    const data = await parseJson(response);
                    if (!response.ok) return { error: createFetchError(response.status, data) };
                    return { data: data as PromotionListResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },
            providesTags: ["Notifications" as any],
        }),

        getPromotionDetails: builder.query<SinglePromotionResponse, number>({
            queryFn: async (id) => {
                try {
                    const response = await fetch(`/api/admin/promotions/edit/${id}`, {
                        method: "GET",
                        headers: { Accept: "application/json" },
                        credentials: "include",
                    });
                    const data = await parseJson(response);
                    if (!response.ok) return { error: createFetchError(response.status, data) };
                    return { data: data as SinglePromotionResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },
        }),

        createPromotion: builder.mutation<SinglePromotionResponse, PromotionPayload>({
            queryFn: async (payload) => {
                try {
                    const response = await fetch("/api/admin/promotions/store", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                        credentials: "include",
                    });
                    const data = await parseJson(response);
                    if (!response.ok) return { error: createFetchError(response.status, data) };
                    return { data: data as SinglePromotionResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },
            invalidatesTags: ["Notifications" as any],
        }),

        updatePromotion: builder.mutation<SinglePromotionResponse, { id: number; payload: PromotionPayload }>({
            queryFn: async ({ id, payload }) => {
                try {
                    const response = await fetch(`/api/admin/promotions/update/${id}`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                        credentials: "include",
                    });
                    const data = await parseJson(response);
                    if (!response.ok) return { error: createFetchError(response.status, data) };
                    return { data: data as SinglePromotionResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },
            invalidatesTags: ["Notifications" as any],
        }),

        deletePromotion: builder.mutation<{ success: boolean; message: string }, number>({
            queryFn: async (id) => {
                try {
                    const response = await fetch(`/api/admin/plan/delete/${id}`, {
                        method: "DELETE", // ইনসোমিনিয়া ডিলিট রুট ট্র্যাকিং অনুযায়ী
                        headers: { Accept: "application/json" },
                        credentials: "include",
                    });
                    const data = await parseJson(response);
                    if (!response.ok) return { error: createFetchError(response.status, data) };
                    return { data: data as any };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },
            invalidatesTags: ["Notifications" as any],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetPromotionsQuery,
    useLazyGetPromotionDetailsQuery,
    useCreatePromotionMutation,
    useUpdatePromotionMutation,
    useDeletePromotionMutation,
} = promotionManagementApi;