import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export type LandingHomeContent = {
  image_1?: string | null;
  image_2?: string | null;
  image_3?: string | null;
  heading?: string | null;
  sub_heading?: string | null;
  input_placeholder?: string | null;
  button_text?: string | null;
  updated_at?: string | null;
};

export type LandingHomeOtherData = {
  total_user?: number | null;
  total_provider?: number | null;
  avg_rating?: number | null;
};

export type LandingHomeResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: {
    content?: LandingHomeContent;
    other_data?: LandingHomeOtherData;
  };
  content?: LandingHomeContent;
  other_data?: LandingHomeOtherData;
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

const homeResponseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLandingHomeResponse: builder.query<LandingHomeResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/home_response", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as LandingHomeResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetLandingHomeResponseQuery } = homeResponseApi;

export default homeResponseApi;
