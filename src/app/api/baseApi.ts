

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { env } from "@/lib/env";
import { buildDesignModeResponse } from "./designMode";

const baseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    headers.set("Content-Type", "application/json");

    if (typeof document !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jr_auth_token="))
        ?.split("=")[1];

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("access_token", token);
      }
    }

    return headers;
  },
});

const baseQueryWithDesignMode: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (env.designMode) {
    return {
      data: buildDesignModeResponse(args),
    };
  }

  return baseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: baseQueryWithDesignMode,

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