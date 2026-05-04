export type AuthRole = "user" | "provider" | "admin" | null;

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  name: string;
  last_name?: string;
  email: string;
  type: AuthRole | string;
}

export interface LoginResponse {
  user: LoginUser;
  message: string;
  token: string;
  success?: boolean;
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
