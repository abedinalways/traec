export interface StripeCredentials {
  stripe_mode: "test" | "live";
  stripe_secret_key: string;
  stripe_public_key: string;
}

export interface StripeUpsertPayload extends StripeCredentials {}

export interface StripeData extends StripeCredentials {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface StripeUpsertResponse {
  message: string;
  data: StripeData;
}

export interface StripeShowResponse {
  message: string;
  data: StripeData;
}