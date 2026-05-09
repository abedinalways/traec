export type AuthRole = "user" | "provider" | "admin" | null;

export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  last_name?: string | null;
  email: string;
  type: AuthRole | string;
  image?: string | null;
  phone?: string | null;
  status?: string | null;
  provider_status?: boolean | null;
}

export interface BackendLoginResponse {
  user: AuthUser;
  message: string;
  token: string;
  success?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}

export interface MeResponse {
  authenticated: boolean;
  user: AuthUser | null;
  message?: string;
}

export interface AuthTokenPayload {
  type?: string;
  access_token?: string;
  refresh_token?: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;
  authorization?: AuthTokenPayload;
  data?: AuthTokenPayload;
  token?: string;
  refresh_token?: string;
  type?: AuthRole | string;
}
