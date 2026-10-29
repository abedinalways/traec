import { baseApi } from "../baseApi";

/* =========================
   TYPES
========================= */

export type ClientUser = {
  id: number;
  image_url: string | null;
  name: string;
  email: string;
  orders: number;
  total_spent: string;
  joined: string;
  status: "Active" | "Inactive";
};

export type ClientManagementMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export type ClientManagementResponse = {
  success: boolean;
  data: ClientUser[];
  meta: ClientManagementMeta;
};

export type ClientManagementParams = {
  search?: string;
  status?: string;
  period?: string;
  page?: number;
  per_page?: number;
};

/* =========================
   API
========================= */

export const clientManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientManagement: builder.query<
      ClientManagementResponse,
      ClientManagementParams | void
    >({
      query: (params) => ({
        url: "/admin/client/index",
        params: {
          search: params?.search ?? "",
          status: params?.status ?? "",
          period: params?.period ?? "",
          page: params?.page ?? 1,
          per_page: params?.per_page ?? 10,
        },
      }),
      providesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetClientManagementQuery } = clientManagementApi;
