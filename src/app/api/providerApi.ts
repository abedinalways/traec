import { baseApi } from "./baseApi";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ProviderCategory {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
  status?: number | boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ProviderServicePricing {
  type?: string | null;
  duration?: string | null;
  price?: string | number | null;
  description?: string | null;
  features?: string[] | null;
}

export interface ProviderService {
  id: number | string;
  title?: string | null;
  user_id?: number | string | null;
  category_id?: number | string | null;
  location?: string | null;
  description?: string | null;
  image?: string[] | string | null;
  images?: string[] | null;
  feature_service?: boolean | number | null;
  status?: boolean | number | null;
  category?: string | null;
  pricings?: ProviderServicePricing[] | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Provider {
  id: number;
  name?: string | null;
  last_name?: string | null;
  email?: string | null;
  email_verified_at?: string | null;
  image?: string | null;
  type?: number | string | null;
  phone?: string | null;
  role?: string | null;
  status?: boolean | number | null;
  provider_status?: boolean | number | null;
  is_verified?: boolean | number | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
  bio?: string | null;
  languages?: string[] | null;
  category_id?: number[] | null;
  plan_id?: number | string | null;
  created_at?: string | null;
  updated_at?: string | null;
  stripe_id?: string | null;
  pm_type?: string | null;
  pm_last_four?: string | null;
  trial_ends_at?: string | null;
  categories?: ProviderCategory[];
}

export interface PaginatedProviders {
  current_page: number;
  data: Provider[];
  first_page_url?: string | null;
  from?: number | null;
  last_page: number;
  last_page_url?: string | null;
  next_page_url?: string | null;
  path?: string | null;
  per_page: number;
  prev_page_url?: string | null;
  to?: number | null;
  total: number;
}

export interface ProviderDetailsData {
  provider: Provider;
  categories: ProviderCategory[];
  services: ProviderService[];
}

export interface GetProvidersParams {
  page?: number;
}

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviders: builder.query<
      ApiResponse<PaginatedProviders>,
      GetProvidersParams | void
    >({
      query: (params) => ({
        url: "/providers",
        method: "GET",
        params: {
          page: params?.page || 1,
        },
      }),
      providesTags: ["Providers"],
    }),

    getProviderDetails: builder.query<
      ApiResponse<ProviderDetailsData>,
      string | number
    >({
      query: (id) => ({
        url: `/providers/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Providers", id }],
    }),
  }),

  overrideExisting: true,
});

export const { useGetProvidersQuery, useGetProviderDetailsQuery } = providerApi;
