import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export type PrivacyPolicyContent = {
  id?: number | string;
  title?: string | null;
  description?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type PrivacyPolicyResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: PrivacyPolicyContent | { data?: PrivacyPolicyContent };
  privacy?: PrivacyPolicyContent;
};

export type UpdatePrivacyPolicyPayload = {
  title: string;
  description: string;
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

const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query<PrivacyPolicyResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/admin/content/privacy_index", {
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
            data: data as PrivacyPolicyResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      providesTags: ["User"],
    }),

    updatePrivacyPolicy: builder.mutation<
      PrivacyPolicyResponse,
      UpdatePrivacyPolicyPayload
    >({
      queryFn: async (payload) => {
        try {
          const response = await fetch("/admin/content/privacy_update", {
            method: "POST",
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
            data: data as PrivacyPolicyResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  privacyPolicyApi;

export default privacyPolicyApi;
