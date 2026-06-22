import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export type ServiceCategoryItem = {
  id: number | string;
  name?: string | null;
  description?: string | null;
  image?: string | null;
  status?: number | boolean | string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type CategoryListResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: ServiceCategoryItem[] | { data?: ServiceCategoryItem[] };
  categories?: ServiceCategoryItem[];
};

export type CategoryMutationResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  category?: ServiceCategoryItem;
  data?: ServiceCategoryItem;
};

export type CategoryFormPayload = {
  name: string;
  description: string;
  status: string | number;
  image?: File | null;
};

export type UpdateCategoryPayload = CategoryFormPayload & {
  id: number | string;
};

export type DeleteCategoryResponse = {
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

const buildCategoryFormData = (payload: CategoryFormPayload) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("status", String(payload.status));

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
};

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceCategories: builder.query<CategoryListResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/api/admin/category/index", {
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
            data: data as CategoryListResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      providesTags: ["User"],
    }),

    storeServiceCategory: builder.mutation<
      CategoryMutationResponse,
      CategoryFormPayload
    >({
      queryFn: async (payload) => {
        try {
          const formData = buildCategoryFormData(payload);

          const response = await fetch("/api/admin/category/store", {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            body: formData,
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as CategoryMutationResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    updateServiceCategory: builder.mutation<
      CategoryMutationResponse,
      UpdateCategoryPayload
    >({
      queryFn: async ({ id, ...payload }) => {
        try {
          const formData = buildCategoryFormData(payload);

          const response = await fetch(`/api/admin/category/update/${id}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            body: formData,
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as CategoryMutationResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    deleteServiceCategory: builder.mutation<
      DeleteCategoryResponse,
      number | string
    >({
      queryFn: async (id) => {
        try {
          const response = await fetch(`/api/admin/category/delete/${id}`, {
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
            data: data as DeleteCategoryResponse,
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

export const {
  useGetServiceCategoriesQuery,
  useStoreServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} = categoryApi;

export default categoryApi;
