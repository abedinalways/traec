import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

/* =========================
   TYPES
========================= */
export interface PublicCategoryItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface PublicCategoryResponse {
  status: boolean; 
  data: PublicCategoryItem[];
}

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
   API ENDPOINT
========================= */
export const publicCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCategories: builder.query<PublicCategoryResponse, void>({
      queryFn: async () => {
        try {
         
          const response = await fetch("/api/categories", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            cache: "no-store",
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return { error: createFetchError(response.status, data) };
          }

          return { data: data as PublicCategoryResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
      providesTags: ["User"], 
    }),
  }),
  overrideExisting: true,
});

export const { useGetPublicCategoriesQuery } = publicCategoryApi;
export default publicCategoryApi;
