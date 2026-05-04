// import { AuthTokenPayload, LoginResponse, RefreshTokenResponse } from "@/types/auth";
// import { normalizeAuthRole } from "./config";
// import { AppDispatch } from "@/redux/store";
// import { setCredentials } from "./authSlice";

// const extractTokenPayload = (
//   payload?: LoginResponse | RefreshTokenResponse | null,
// ): AuthTokenPayload | null => {
//   if (!payload) {
//     return null;
//   }

//   return payload.authorization ?? payload.data ?? null;
// };

// export const extractAuthTokens = (
//   payload?: LoginResponse | RefreshTokenResponse | null,
// ) => {
//   const tokenPayload = extractTokenPayload(payload);

//   return {
//     accessToken: tokenPayload?.access_token ?? null,
//     refreshToken: tokenPayload?.refresh_token ?? null,
//   };
// };

// export const extractLoginAuthData = (payload: LoginResponse) => {
//   const { accessToken, refreshToken } = extractAuthTokens(payload);
//   const role = normalizeAuthRole(payload.type ?? null);

//   return { accessToken, refreshToken, role };
// };

// export const handleAuthSuccess = (
//   payload: LoginResponse,
//   dispatch: AppDispatch,
// ) => {
//   const { accessToken, refreshToken, role } = extractLoginAuthData(payload);

//   dispatch(
//     setCredentials({
//       token: accessToken,
//       refreshToken,
//       role,
//     }),
//   );
// };

import { AppDispatch } from "@/redux/store";
import { setCredentials } from "./authSlice";
import { authCookieNames, normalizeAuthRole } from "@/lib/auth/config";
import { LoginResponse, RefreshTokenResponse } from "@/types/auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const setCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
};

export const extractAuthTokens = (
  response: LoginResponse | RefreshTokenResponse,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = response as any;

  const accessToken =
    data.token ||
    data.access_token ||
    data.authorization?.access_token ||
    data.data?.access_token;

  const refreshToken =
    data.refresh_token ||
    data.authorization?.refresh_token ||
    data.data?.refresh_token ||
    null;

  return {
    accessToken,
    refreshToken,
  };
};

export const handleAuthSuccess = (
  response: LoginResponse,
  dispatch: AppDispatch,
) => {
  const { accessToken, refreshToken } = extractAuthTokens(response);

  const role = normalizeAuthRole(response.user?.type);

  if (!accessToken) {
    throw new Error("Login response did not include token.");
  }

  if (!role) {
    throw new Error("Login response did not include valid role.");
  }

  dispatch(
    setCredentials({
      token: accessToken,
      refreshToken,
      role,
    }),
  );

  setCookie(authCookieNames.token, accessToken);
  setCookie(authCookieNames.role, role);

  if (refreshToken) {
    setCookie(authCookieNames.refreshToken, refreshToken);
  }

  return { role };
};