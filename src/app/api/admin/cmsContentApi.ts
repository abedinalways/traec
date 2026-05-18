import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
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
      queryFn: async () => {
        try {
          const response = await fetch("/admin/content/home_index", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            cache: "no-store",
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as HomeContentResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
      providesTags: ["User"],
    }),

    updateHomeContent: builder.mutation<
      HomeContentResponse,
      UpdateHomeContentPayload
    >({
      queryFn: async (payload) => {
        try {
          const formData = buildHomeContentFormData(payload);

          const response = await fetch("/admin/content/home_update", {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            body: formData,
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as HomeContentResponse,
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

export const { useGetHomeContentQuery, useUpdateHomeContentMutation } =
  cmsContentApi;

export default cmsContentApi;
