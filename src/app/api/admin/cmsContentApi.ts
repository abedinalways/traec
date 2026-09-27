import { baseApi } from "../baseApi";

export type HomeContent = {
  heading?: string | null;
  sub_heading?: string | null;
  input_placeholder?: string | null;
  button_text?: string | null;
  image_1?: string | null;
  image_2?: string | null;
  image_3?: string | null;
  updated_at?: string | null;
};

export type HomeOtherData = {
  total_user?: number | null;
  total_provider?: number | null;
  avg_rating?: number | null;
};

export type HomeContentResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?:
    | HomeContent
    | HomeContent[]
    | {
        content?: HomeContent;
        other_data?: HomeOtherData;
        data?: HomeContent;
      };
  content?: HomeContent;
  other_data?: HomeOtherData;
};

export type UpdateHomeContentPayload = {
  heading: string;
  sub_heading: string;
  input_placeholder: string;
  button_text: string;
  image_1?: File | null;
  image_2?: File | null;
  image_3?: File | null;
};

const buildHomeContentFormData = (payload: UpdateHomeContentPayload) => {
  const formData = new FormData();

  formData.append("heading", payload.heading);
  formData.append("sub_heading", payload.sub_heading);
  formData.append("input_placeholder", payload.input_placeholder);
  formData.append("button_text", payload.button_text);

  if (payload.image_1) {
    formData.append("image_1", payload.image_1);
  }

  if (payload.image_2) {
    formData.append("image_2", payload.image_2);
  }

  if (payload.image_3) {
    formData.append("image_3", payload.image_3);
  }

  return formData;
};

const cmsContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeContent: builder.query<HomeContentResponse, void>({
      query: () => "/admin/content/home_index",
      providesTags: ["User"],
    }),

    updateHomeContent: builder.mutation<
      HomeContentResponse,
      UpdateHomeContentPayload
    >({
      query: (payload) => {
        const formData = buildHomeContentFormData(payload);
        return {
          url: "/admin/content/home_update",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetHomeContentQuery, useUpdateHomeContentMutation } =
  cmsContentApi;

export default cmsContentApi;
