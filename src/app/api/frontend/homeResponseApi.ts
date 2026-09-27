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

const homeResponseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLandingHomeResponse: builder.query<LandingHomeResponse, void>({
      query: () => "/home_response",
    }),
  }),
  overrideExisting: true,
});

export const { useGetLandingHomeResponseQuery } = homeResponseApi;

export default homeResponseApi;
