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
      query: () => "/admin/category/index",
      providesTags: ["User"],
    }),

    storeServiceCategory: builder.mutation<
      CategoryMutationResponse,
      CategoryFormPayload
    >({
      query: (payload) => {
        const formData = buildCategoryFormData(payload);
        return {
          url: "/admin/category/store",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),

    updateServiceCategory: builder.mutation<
      CategoryMutationResponse,
      UpdateCategoryPayload
    >({
      query: ({ id, ...payload }) => {
        const formData = buildCategoryFormData(payload);
        return {
          url: `/admin/category/update/${id}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteServiceCategory: builder.mutation<
      DeleteCategoryResponse,
      number | string
    >({
      query: (id) => ({
        url: `/admin/category/delete/${id}`,
        method: "DELETE",
      }),
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
