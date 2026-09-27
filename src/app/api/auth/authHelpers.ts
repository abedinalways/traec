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

import { normalizeAuthRole } from "@/lib/auth/config";
import { LoginResponse } from "@/types/auth";
import { AppDispatch } from "../../store";
import { clearAuthUser, setAuthUser } from "./authSlice";

export const handleAuthSuccess = (
  response: LoginResponse,
  dispatch: AppDispatch,
) => {
  const role = normalizeAuthRole(response.user?.type);

  if (!response.user) {
    throw new Error("Login response did not include user.");
  }

  if (!role) {
    throw new Error("Login response did not include valid role.");
  }

  dispatch(setAuthUser(response.user));

  return { role };
};

export const handleAuthLogout = (dispatch: AppDispatch) => {
  dispatch(clearAuthUser());
};