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

/* =========================
   API ENDPOINT
========================= */
export const publicCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCategories: builder.query<PublicCategoryResponse, void>({
      query: () => "/categories",
    }),
  }),
  overrideExisting: true,
});

export const { useGetPublicCategoriesQuery } = publicCategoryApi;
export default publicCategoryApi;
