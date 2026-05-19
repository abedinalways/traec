import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export type FAQItem = {
  id?: number | string;
  question?: string | null;
  answer?: string | null;
  status?: number | boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type FAQListResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: FAQItem[] | { data?: FAQItem[] };
  faqs?: FAQItem[];
};

export type FAQSavePayload = {
  id?: number | string | null;
  question: string;
  answer: string;
};

export type FAQSaveResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: FAQItem;
  faq?: FAQItem;
};

export type FAQDeleteResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
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

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<FAQListResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/admin/content/faq_index", {
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
            data: data as FAQListResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      providesTags: ["User"],
    }),

    saveFaq: builder.mutation<FAQSaveResponse, FAQSavePayload>({
      queryFn: async (payload) => {
        try {
          const response = await fetch("/admin/content/faq_store", {
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
            data: data as FAQSaveResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    deleteFaq: builder.mutation<FAQDeleteResponse, number | string>({
      queryFn: async (id) => {
        try {
          const response = await fetch(`/admin/content/faq_delete/${id}`, {
            method: "DELETE",
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
            data: data as FAQDeleteResponse,
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

export const { useGetFaqsQuery, useSaveFaqMutation, useDeleteFaqMutation } =
  faqApi;

export default faqApi;
