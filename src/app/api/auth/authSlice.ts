// // "use client";

// // import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// // import Cookies from "js-cookie";

// // import { authCookieNames, normalizeAuthRole } from "./config";
// // import { AuthRole } from "@/types/auth";
// // import { RootState } from "@/redux/store";

// // interface AuthState {
// //   token: string | null;
// //   refreshToken: string | null;
// //   role: AuthRole;
// // }

// // interface SetCredentialsPayload {
// //   token?: string | null;
// //   refreshToken?: string | null;
// //   role?: AuthRole;
// // }

// // const getCookieValue = (cookieName: string) => {
// //   if (typeof window === "undefined") {
// //     return null;
// //   }

// //   return Cookies.get(cookieName) ?? null;
// // };

// // const initialState: AuthState = {
// //   token: getCookieValue(authCookieNames.token),
// //   refreshToken: getCookieValue(authCookieNames.refreshToken),
// //   role: normalizeAuthRole(getCookieValue(authCookieNames.role)),
// // };

// // const cookieOptions = {
// //   secure: process.env.NODE_ENV === "production",
// //   sameSite: "lax" as const,
// //   path: "/",
// // };

// // const clearAuthCookies = () => {
// //   Cookies.remove(authCookieNames.token, { path: "/" });
// //   Cookies.remove(authCookieNames.refreshToken, { path: "/" });
// //   Cookies.remove(authCookieNames.role, { path: "/" });
// // };

// // const persistAuthCookies = ({
// //   token,
// //   refreshToken,
// //   role,
// // }: SetCredentialsPayload) => {
// //   clearAuthCookies();

// //   if (!token || !role) {
// //     return;
// //   }

// //   Cookies.set(authCookieNames.token, token, cookieOptions);

// //   if (refreshToken) {
// //     Cookies.set(authCookieNames.refreshToken, refreshToken, cookieOptions);
// //   }

// //   Cookies.set(authCookieNames.role, role, cookieOptions);
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
// //       const {
// //         token = null,
// //         refreshToken = null,
// //         role = null,
// //       } = action.payload;

// //       state.token = token;
// //       state.refreshToken = refreshToken;
// //       state.role = role;

// //       persistAuthCookies({ token, refreshToken, role });
// //     },
// //     logOut: (state) => {
// //       state.token = null;
// //       state.refreshToken = null;
// //       state.role = null;

// //       clearAuthCookies();
// //     },
// //   },
// // });

// // export const { setCredentials, logOut } = authSlice.actions;

// // export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
// // export const selectCurrentRole = (state: { auth: AuthState }) => state.auth.role;
// // export const selectIsAuthenticated = (state: { auth: AuthState }) =>
// //   Boolean(state.auth.token && state.auth.role);

// // export default authSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AuthRole, AuthUser } from "@/types/auth";
// import { normalizeAuthRole } from "@/lib/auth/config";

// interface AuthState {
//   user: AuthUser | null;
//   role: AuthRole;
//   isAuthenticated: boolean;
//   token: null;
//   refreshToken: null;
// }

// const initialState: AuthState = {
//   user: null,
//   role: null,
//   isAuthenticated: false,
//   token: null,
//   refreshToken: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuthUser: (state, action: PayloadAction<AuthUser>) => {
//       const role = normalizeAuthRole(action.payload.type);

//       state.user = action.payload;
//       state.role = role;
//       state.isAuthenticated = Boolean(role);
//       state.token = null;
//       state.refreshToken = null;
//     },

//     clearAuthUser: (state) => {
//       state.user = null;
//       state.role = null;
//       state.isAuthenticated = false;
//       state.token = null;
//       state.refreshToken = null;
//     },

//     logOut: (state) => {
//       state.user = null;
//       state.role = null;
//       state.isAuthenticated = false;
//       state.token = null;
//       state.refreshToken = null;
//     },
//   },
// });

// export const { setAuthUser, clearAuthUser, logOut } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthRole, AuthUser } from "@/types/auth";
import { normalizeAuthRole } from "@/lib/auth/config";
import type { RootState } from "../../store";

interface AuthState {
  user: AuthUser | null;
  role: AuthRole;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
  isAuthenticated: false,
  token: null,
  refreshToken: null,
};

export type SetAuthUserPayload =
  | AuthUser
  | { user: AuthUser; token?: string | null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<SetAuthUserPayload>) => {
      const payload = action.payload;
      const user =
        "user" in payload && payload.user
          ? payload.user
          : (payload as AuthUser);
      const token = "token" in payload ? payload.token : null;

      const role = normalizeAuthRole(user?.type);

      state.user = user;
      state.role = role;
      state.isAuthenticated = Boolean(role);
      if (token) {
        state.token = token;
      }
    },

    clearAuthUser: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
    },

    logOut: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setAuthUser, clearAuthUser, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRole = (state: RootState) => state.auth.role;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
