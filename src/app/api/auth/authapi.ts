

import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

import { LoginParams, LoginResponse, MeResponse } from "@/types/auth";
import { clearAuthUser, setAuthUser } from "./authSlice";

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

  return {
    status,
    data: dataOrMessage,
  };
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginParams>({
      queryFn: async (credentials) => {
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as LoginResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },

      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data?.user) {
            dispatch(setAuthUser(data.user));
          }
        } catch {
          // handled in component
        }
      },

      invalidatesTags: ["User"],
    }),

    getMe: builder.query<MeResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/api/auth/me", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            cache: "no-store",
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as MeResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },

      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data?.authenticated && data.user) {
            dispatch(setAuthUser(data.user));
          } else {
            dispatch(clearAuthUser());
          }
        } catch {
          dispatch(clearAuthUser());
        }
      },

      providesTags: ["User"],
    }),

    registerUser: builder.mutation<
      {
        success?: boolean;
        message?: string;
        data?: { email: string; requires_verification: boolean };
      },
      {
        name: string;
        last_name: string;
        email: string;
        password: string;
        password_confirmation: string;
        otp?: string;
      }
    >({
      query: (data) => ({
        url: "/user-register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation<{ success?: boolean; message?: string }, void>(
      {
        queryFn: async () => {
          try {
            const response = await fetch("/api/auth/logout", {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              credentials: "include",
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
              return {
                error: {
                  status: response.status,
                  data,
                },
              };
            }

            return {
              data,
            };
          } catch (error) {
            return {
              error: {
                status: "FETCH_ERROR",
                error:
                  error instanceof Error
                    ? error.message
                    : "Logout request failed",
              },
            };
          }
        },

        invalidatesTags: ["User"],
      },
    ),

    forgotPassword: builder.mutation<
      { success?: boolean; message?: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation<
      { success?: boolean; message?: string },
      { old_password: string; new_password: string }
    >({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    resendVerificationEmail: builder.mutation<
      { success?: boolean; message?: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/resend-verification-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    resetPassword: builder.mutation<
      { success?: boolean; message?: string },
      { email: string; token: string; password: string }
    >({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useLoginUserMutation,
  useGetMeQuery,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResendVerificationEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;

export default authApi;