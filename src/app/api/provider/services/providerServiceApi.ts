import { baseApi } from "../../baseApi";

export type ServicePricing = {
  type?: string | null;
  service_type?: string | null;
  duration?: string | null;
  price?: string | number | null;
  description?: string | null;
  features?: string[] | null;
};

export type ServiceFaq = {
  id?: number;
  question: string;
  answer: string;
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
  faqs?: ServiceFaq[] | null;
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

/* ─────────────── service details (single) ─────────────── */

export type ProviderServiceDetails = {
  id: number;
  title?: string | null;
  location?: string | null;
  image_url?: string | null;
  provider_name?: string | null;
  description?: string | null;
  images?: string[] | null;
  category?: string | null;
  pricings?: ServicePricing[] | null;
  faqs?: ServiceFaq[] | null;
  created_at?: string | null;
};

export type ProviderServiceDetailsResponse = {
  success?: boolean;
  message?: string;
  data?: ProviderServiceDetails;
};

export type CreateServicePricingPayload = {
  service_type: "basic" | "standard" | "premium";
  price: string;
  duration: string;
  description: string;
  features: string[];
};

export type CreateServiceFaqPayload = {
  question: string;
  answer: string;
};

export type CreateProviderServicePayload = {
  title: string;
  category_id: string;
  location: string;
  description: string;
  images: File[];
  pricing: CreateServicePricingPayload[];
  faqs: CreateServiceFaqPayload[];
};

export type UpdateProviderServicePayload = {
  id: number;
  title: string;
  category_id: string;
  location: string;
  description: string;
  images: File[];
  pricing: CreateServicePricingPayload[];
  faqs: CreateServiceFaqPayload[];
};

export type CreateProviderServiceResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: ProviderService;
};

export type UpdateProviderServiceResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: ProviderService;
};

/* ─────────────────────── helpers ─────────────────────── */

const buildServiceFormData = (
  payload: CreateProviderServicePayload | UpdateProviderServicePayload,
) => {
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

  payload.faqs
    .filter((faq) => faq.question.trim() && faq.answer.trim())
    .forEach((faq, faqIndex) => {
      formData.append(`faqs[${faqIndex}][question]`, faq.question.trim());
      formData.append(`faqs[${faqIndex}][answer]`, faq.answer.trim());
    });

  return formData;
};

/* ─────────────────────── api ─────────────────────── */

const providerServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviderServices: builder.query<ProviderServicesResponse, void>({
      query: () => "/provider/services",
    }),

    getProviderServiceDetails: builder.query<
      ProviderServiceDetailsResponse,
      number | string
    >({
      query: (id) => `/provider/services/${id}`,
    }),

    createProviderService: builder.mutation<
      CreateProviderServiceResponse,
      CreateProviderServicePayload
    >({
      query: (payload) => {
        const formData = buildServiceFormData(payload);
        return {
          url: "/provider/services/store",
          method: "POST",
          body: formData,
        };
      },
    }),

    updateProviderService: builder.mutation<
      UpdateProviderServiceResponse,
      UpdateProviderServicePayload
    >({
      query: (payload) => {
        const formData = buildServiceFormData(payload);
        formData.append("_method", "PUT");
        return {
          url: `/provider/services/${payload.id}`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetProviderServicesQuery,
  useGetProviderServiceDetailsQuery,
  useCreateProviderServiceMutation,
  useUpdateProviderServiceMutation,
} = providerServiceApi;

export default providerServiceApi;
