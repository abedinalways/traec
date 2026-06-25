import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export interface StripePublicKeyResponse {
  public_key: string;
}

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

const parseJson = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const stripePublicKeyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviderStripePublicKey: builder.query<
      StripePublicKeyResponse,
      string | number
    >({
      queryFn: async (serviceId) => {
        try {
          const response = await fetch(`/api/stripe/p-k/${serviceId}`, {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
          });

          const data = await parseJson(response);
          if (!response.ok)
            return { error: createFetchError(response.status, data) };

          return { data: data as StripePublicKeyResponse };
        } catch (error) {
          return { error: createFetchError("FETCH_ERROR", error) };
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetProviderStripePublicKeyQuery } = stripePublicKeyApi;
export default stripePublicKeyApi;