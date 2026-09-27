import { baseApi } from "../baseApi";
import type {
  StripeUpsertPayload,
  StripeUpsertResponse,
  StripeShowResponse,
} from "@/types/provider-stripe";

const providerStripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upsertProviderStripe: builder.mutation<
      StripeUpsertResponse,
      StripeUpsertPayload
    >({
      query: (body) => ({
        url: "/admin/p-stripe/upsert",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Providers"],
    }),

    getProviderStripe: builder.query<StripeShowResponse, void>({
      query: () => ({
        url: "/admin/p-stripe/show",
        method: "GET",
      }),
      providesTags: ["Providers"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUpsertProviderStripeMutation,
  useGetProviderStripeQuery,
} = providerStripeApi;

export default providerStripeApi;