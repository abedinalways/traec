import { baseApi } from "../baseApi";

export type PrivacyPolicyContent = {
  id?: number | string;
  title?: string | null;
  description?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type PrivacyPolicyResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: PrivacyPolicyContent | { data?: PrivacyPolicyContent };
  privacy?: PrivacyPolicyContent;
};

export type UpdatePrivacyPolicyPayload = {
  title: string;
  description: string;
};

const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query<PrivacyPolicyResponse, void>({
      query: () => "/admin/content/privacy_index",
      providesTags: ["User"],
    }),

    updatePrivacyPolicy: builder.mutation<
      PrivacyPolicyResponse,
      UpdatePrivacyPolicyPayload
    >({
      query: (payload) => ({
        url: "/admin/content/privacy_update",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  privacyPolicyApi;

export default privacyPolicyApi;
