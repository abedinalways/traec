import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../api/baseApi";

export type ServicePricing = {
  type?: string | null;
  service_type?: string | null;
  duration?: string | null;
  price?: string | number | null;
  description?: string | null;
  features?: string[] | null;
};

export type ProviderService = {
  id: number;
  title?: string | null;
  location?: string | null;
  description?: string | null;
  images?: string[] | null;
  image?: string | null;
  category?: string | null;
  category_id?: number | string | null;
  pricings?: ServicePricing[] | null;
  pricing?: ServicePricing[] | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type ProviderServicesResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?:
    | {
        services?: ProviderService[];
      }
    | ProviderService[];
  services?: ProviderService[];
};

export type CreateServicePricingPayload = {
  service_type: "basic" | "standard" | "premium";
  price: string;
  duration: string;
  description: string;
  features: string[];
};

export type CreateProviderServicePayload = {
  title: string;
  category_id: string;
  location: string;
  description: string;
  images: File[];
  pricing: CreateServicePricingPayload[];
};

export type CreateProviderServiceResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: ProviderService;
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

const buildCreateServiceFormData = (payload: CreateProviderServicePayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("category_id", payload.category_id);
  formData.append("location", payload.location);
  formData.append("description", payload.description);

  payload.images.forEach((image) => {
    formData.append("images[]", image);
  });

  payload.pricing.forEach((tier, tierIndex) => {
    formData.append(`pricings[${tierIndex}][service_type]`, tier.service_type);
    formData.append(`pricings[${tierIndex}][price]`, tier.price);
    formData.append(`pricings[${tierIndex}][duration]`, tier.duration);
    formData.append(`pricings[${tierIndex}][description]`, tier.description);

    tier.features
      .filter((feature) => feature.trim())
      .forEach((feature, featureIndex) => {
        formData.append(
          `pricings[${tierIndex}][features][${featureIndex}]`,
          feature,
        );
      });
  });

  return formData;
};

const providerServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviderServices: builder.query<ProviderServicesResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/provider/services", {
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
            data: data as ProviderServicesResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
      },
    }),

    createProviderService: builder.mutation<
      CreateProviderServiceResponse,
      CreateProviderServicePayload
    >({
      queryFn: async (payload) => {
        try {
          const formData = buildCreateServiceFormData(payload);

          const response = await fetch("/provider/services/store", {
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
            data: data as CreateProviderServiceResponse,
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

export const { useGetProviderServicesQuery, useCreateProviderServiceMutation } =
  providerServiceApi;

export default providerServiceApi;
