import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "@/app/api/baseApi";
import type { AuthUser, MeResponse } from "@/types/auth";
import { clearAuthUser, setAuthUser } from "../auth/authSlice";


export type ProfileUpdatePayload = {
  name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  bio?: string;
  languages?: string[];
  password?: string;
  password_confirmation?: string;
};

export type ProfileUpdateResponse = {
  message?: string;
  user?: AuthUser;
  success?: boolean;
};

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

const profileUpdateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<MeResponse, void>({
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

    updateProfile: builder.mutation<
      ProfileUpdateResponse,
      ProfileUpdatePayload
    >({
      queryFn: async (payload) => {
        try {
          const response = await fetch("/api/profile/update", {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as ProfileUpdateResponse,
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
          // UI component will show error toast
        }
      },

      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetProfileQuery, useUpdateProfileMutation } =
  profileUpdateApi;

export default profileUpdateApi;
