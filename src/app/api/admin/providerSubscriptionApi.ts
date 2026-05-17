import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export type SubscriptionHistory = {
  subscription_id?: number | null;
  stripe_subscription_id?: string | null;
  stripe_status?: string | null;
  provider_id?: number | null;
  provider_name?: string | null;
  provider_email?: string | null;
  plan?: string | null;
  quantity?: number | null;
  starts_at?: string | null;
  ends_at?: string | null;
  trial_ends_at?: string | null;
};

export type ProviderSubscription = {
  id: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;

  plan?: string | null;
  plan_package?: string | null;
  subscription_status?: string | null;
  stripe_id?: string | null;

  starts_at?: string | null;
  ends_at?: string | null;
  trial_ends_at?: string | null;

  on_grace_period?: boolean | null;
  is_paused?: boolean | null;
  is_canceled?: boolean | null;

  subscription_history?: SubscriptionHistory[];
};

export type PaginationLink = {
  url?: string | null;
  label?: string;
  page?: number | null;
  active?: boolean;
};

export type PaginationMeta = {
  current_page?: number;
  from?: number | null;
  last_page?: number;
  links?: PaginationLink[];
  path?: string;
  per_page?: number;
  to?: number | null;
  total?: number;
};

export type PaginationLinks = {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
};

export type AllProviderSubscriptionsResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: ProviderSubscription[] | { data?: ProviderSubscription[] };
  subscriptions?: ProviderSubscription[];
  meta?: PaginationMeta;
  links?: PaginationLinks;
};

export type ProviderSubscriptionViewResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: ProviderSubscription;
  subscription?: ProviderSubscription;
};

export type GetAllProviderSubscriptionsParams = {
  page?: number;
  per_page?: number;
};

export type CancelSubscriptionPayload = {
  id: number | string;
  cancel_type: "after_this_month" | "right_away";
};

export type CancelSubscriptionResponse = {
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

const providerSubscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProviderSubscriptions: builder.query<
      AllProviderSubscriptionsResponse,
      GetAllProviderSubscriptionsParams | void
    >({
      queryFn: async (params) => {
        try {
          const page = params?.page || 1;
          const perPage = params?.per_page || 5;

          const response = await fetch(
            `/api/admin/provider-subscriptions?page=${page}&per_page=${perPage}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              credentials: "include",
              cache: "no-store",
            },
          );

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as AllProviderSubscriptionsResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      providesTags: ["User"],
    }),

    getProviderSubscriptionView: builder.query<
      ProviderSubscriptionViewResponse,
      number | string
    >({
      queryFn: async (id) => {
        try {
          const response = await fetch(
            `/api/admin/provider-subscriptions/${id}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              credentials: "include",
              cache: "no-store",
            },
          );

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as ProviderSubscriptionViewResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      providesTags: ["User"],
    }),

    cancelProviderSubscription: builder.mutation<
      CancelSubscriptionResponse,
      CancelSubscriptionPayload
    >({
      queryFn: async ({ id, cancel_type }) => {
        try {
          const response = await fetch(
            `/api/admin/provider-subscriptions/${id}/cancel`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ cancel_type }),
            },
          );

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as CancelSubscriptionResponse,
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
  useGetAllProviderSubscriptionsQuery,
  useGetProviderSubscriptionViewQuery,
  useCancelProviderSubscriptionMutation,
} = providerSubscriptionApi;

export default providerSubscriptionApi;
