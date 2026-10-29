import { baseApi } from "../baseApi";

export type FAQItem = {
  id?: number | string;
  question?: string | null;
  answer?: string | null;
  status?: number | boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type FAQListResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: FAQItem[] | { data?: FAQItem[] };
  faqs?: FAQItem[];
};

export type FAQSavePayload = {
  id?: number | string | null;
  question: string;
  answer: string;
};

export type FAQSaveResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: FAQItem;
  faq?: FAQItem;
};

export type FAQDeleteResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
};

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<FAQListResponse, void>({
      query: () => "/admin/content/faq_index",
      providesTags: ["User"],
    }),

    saveFaq: builder.mutation<FAQSaveResponse, FAQSavePayload>({
      query: (payload) => ({
        url: "/admin/content/faq_store",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    deleteFaq: builder.mutation<FAQDeleteResponse, number | string>({
      query: (id) => ({
        url: `/admin/content/faq_delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetFaqsQuery, useSaveFaqMutation, useDeleteFaqMutation } =
  faqApi;

export default faqApi;
