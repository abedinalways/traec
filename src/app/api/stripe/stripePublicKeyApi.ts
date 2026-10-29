import { baseApi } from "../baseApi";

export interface StripePublicKeyResponse {
  public_key: string;
}

const stripePublicKeyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviderStripePublicKey: builder.query<
      StripePublicKeyResponse,
      string | number
    >({
      query: (serviceId) => `/stripe/p-k/${serviceId}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetProviderStripePublicKeyQuery } = stripePublicKeyApi;
export default stripePublicKeyApi;
