import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { env } from "@/lib/env";
import { buildDesignModeResponse } from "./designMode";
import { clearAuthUser } from "./auth/authSlice";

import type { RootState } from "@/app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    headers.set("accept", "application/json");

    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("access_token", token);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (env.designMode) {
    return {
      data: buildDesignModeResponse(args),
    };
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Session expired or token invalid -> clear store & cookies
    api.dispatch(clearAuthUser());
    if (typeof window !== "undefined") {
      fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "User",
    "AdminCharity",
    "AdminNotice",
    "AdminUser",
    "FinancialAdminCharity",
    "AdminSubscriptionPlan",
    "DirectorNotice",
    "Chat",
    "Providers",
    "Notifications",
    "Orders",
  ],

  endpoints: () => ({}),
});
