import { baseApi } from "../baseApi";
import type {
  ProviderConfigResponse,
  CategoriesResponse,
  RegisterProviderPayload,
  RegisterProviderResponse,
} from "@/types/account-seetings";

const providerRegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviderConfig: builder.query<ProviderConfigResponse, void>({
      query: () => ({
        url: "/register_provider/config",
        method: "GET",
      }),
    }),

    getServiceCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),

    registerProvider: builder.mutation<
      RegisterProviderResponse,
      RegisterProviderPayload
    >({
      query: (body) => ({
        url: "/register_provider",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProviderConfigQuery,
  useGetServiceCategoriesQuery,
  useRegisterProviderMutation,
} = providerRegistrationApi;

export default providerRegistrationApi;
