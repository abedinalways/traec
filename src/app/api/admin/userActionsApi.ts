import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";


/* =========================
   TYPES
========================= */

export type UserDetailsResponse = {
    success: boolean;
    data: {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        image: string | null;
        address: string;
        status: "Active" | "Inactive";
        is_verified: boolean;
        joined: string;
        stats: {
            total_orders: number;
            total_spent: string;
        };
    };
};

export type DeleteUserResponse = {
    success: boolean;
    message: string;
    data: {
        id: number;
        deleted_at: string;
    };
};

export type ChangeStatusResponse = {
    success: boolean;
    message: string;
    data: {
        id: number;
        status: boolean;
    };
};

export type ChangeStatusPayload = {
    id: number;
    status: 0 | 1;
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

export const userActionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* -------------------------
           Delete User
        ------------------------- */
        deleteUser: builder.mutation<DeleteUserResponse, number>({
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

                    return { data: data as DeleteUserResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },

            invalidatesTags: ["User", "Providers"],
        }),

        /* -------------------------
           Change Status
        ------------------------- */
        changeUserStatus: builder.mutation<ChangeStatusResponse, ChangeStatusPayload>({
            queryFn: async ({ id, status }) => {
                try {
                    const response = await fetch(
                        `/api/admin/client/change-status/${id}`,
                        {
                            method: "PATCH",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({ status }),
                        },
                    );

                    const data = await parseJson(response);

                    if (!response.ok) {
                        return { error: createFetchError(response.status, data) };
                    }

                    return { data: data as ChangeStatusResponse };
                } catch (error) {
                    return { error: createFetchError("FETCH_ERROR", error) };
                }
            },

            invalidatesTags: ["User", "Providers"],
        }),
        // view-details
        getUserDetails: builder.query<UserDetailsResponse, number>({
            queryFn: async (id) => {
                try {
                    const response = await fetch(`/api/admin/client/show-details/${id}`, {
                        method: "GET",
                        headers: { Accept: "application/json" },
                        credentials: "include",
                    });
                    const data = await response.json();
                    if (!response.ok) return { error: { status: response.status, data } };
                    return { data: data as UserDetailsResponse };
                } catch (error) {
                    return { error: { status: "FETCH_ERROR", error: String(error) } };
                }
            },
            providesTags: (result, error, id) => [{ type: "User", id }, { type: "Providers", id }],
        }),
    }),

    overrideExisting: true,
});

export const { useDeleteUserMutation, useChangeUserStatusMutation, useGetUserDetailsQuery, useLazyGetUserDetailsQuery } =
    userActionsApi;