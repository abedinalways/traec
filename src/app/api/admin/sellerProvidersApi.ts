import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";


/* =========================
   TYPES
========================= */

export type SellerProvider = {
    id: number;
    image_url: string | null;
    name: string;
    email: string;
    products: number;
    total_sales: string;
    joined: string;
    status: "Active" | "Inactive";
};

export type SellerProviderMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
};

export type SellerProviderResponse = {
    success: boolean;
    data: SellerProvider[];
    meta: SellerProviderMeta;
};

export type SellerProviderParams = {
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

export const sellerProvidersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSellerProviders: builder.query<
            SellerProviderResponse,
            SellerProviderParams | void
        >({
            queryFn: async (params) => {
                try {
                    const search = params?.search ?? "";
                    const status = params?.status ?? "";
                    const period = params?.period ?? "";
                    const page = params?.page ?? 1;
                    const per_page = params?.per_page ?? 10;

                    const response = await fetch(
                        `/api/admin/client/seller-index?search=${search}&status=${status}&period=${period}&page=${page}&per_page=${per_page}`,
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

                    return { data: data as SellerProviderResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },

            providesTags: ["Providers"],
        }),
    }),

    overrideExisting: true,
});

export const { useGetSellerProvidersQuery } = sellerProvidersApi;