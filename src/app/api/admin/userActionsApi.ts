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
   API
========================= */

export const userActionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation<DeleteUserResponse, number>({
      query: (id) => ({
        url: `/admin/client/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Providers"],
    }),

    changeUserStatus: builder.mutation<
      ChangeStatusResponse,
      ChangeStatusPayload
    >({
      query: ({ id, status }) => ({
        url: `/admin/client/change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["User", "Providers"],
    }),

    getUserDetails: builder.query<UserDetailsResponse, number>({
      query: (id) => `/admin/client/show-details/${id}`,
      providesTags: (result, error, id) => [
        { type: "User", id },
        { type: "Providers", id },
      ],
    }),
  }),

  overrideExisting: true,
});

export const {
  useDeleteUserMutation,
  useChangeUserStatusMutation,
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
} = userActionsApi;
