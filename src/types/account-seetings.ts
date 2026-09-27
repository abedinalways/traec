export type Step = 1 | 2 | 3 | 4 | 5;

export type ProviderPlan = {
  id: number;
  name: string;
  title: string;
  price: string;
  currency: string;
  package: string;
  features: string[];
};

export type ProviderCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  status?: number;
};

export type ProviderConfigResponse = {
  success: boolean;
  message: string;
  data: {
    stripe_public_key: string;
    plans: ProviderPlan[];
  };
};

export type CategoriesResponse = {
  status: boolean;
  data: ProviderCategory[];
};

export type RegisterProviderPayload = {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  password: string;
  password_confirmation: string;
  category_id: number[];
  plan_id: number;
  payment_method: string;
  otp?: string;
};

export type RegisterProviderResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: {
    email?: string;
    requires_verification?: boolean;
  };
};
