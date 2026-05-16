// // import { AuthRole } from "@/types/auth";

// // export const authCookieNames = {
// //   token: "jr_auth_token",
// //   refreshToken: "jr_refresh_token",
// //   role: "jr_auth_role",
// // } as const;

// // export const authRoutes = {
// //   home: "/",
// //   login: "/login",
// //   forgotPassword: "/forgot-password",
// //   resetPassword: "/reset-password",
// //   signUp: "/sign-up",
// //   clientDashboard: "/client-dashboard",
// //   providerDashboard: "/provider-dashboard",
// //   adminDashboard: "/admin-dashboard",
// // } as const;

// // export const normalizeAuthRole = (role?: string | null): AuthRole => {
// //   if (role === "user" || role === "provider" || role === "admin") {
// //     return role;
// //   }

// //   return null;
// // };

// // export const getDefaultRouteForRole = (role?: string | null) => {
// //   const normalizedRole = normalizeAuthRole(role);

// //   if (normalizedRole === "user") {
// //     return authRoutes.clientDashboard;
// //   }

// //   if (normalizedRole === "provider") {
// //     return authRoutes.providerDashboard;
// //   }

// //   if (normalizedRole === "admin") {
// //     return authRoutes.adminDashboard;
// //   }

// //   return authRoutes.login;
// // };

// // export const isAllowedRedirectForRole = (
// //   role: AuthRole,
// //   pathname?: string | null,
// // ) => {
// //   if (!pathname || !pathname.startsWith("/")) {
// //     return false;
// //   }

// //   if (role === "user") {
// //     return pathname.startsWith(authRoutes.clientDashboard);
// //   }

// //   if (role === "provider") {
// //     return pathname.startsWith(authRoutes.providerDashboard);
// //   }

// //   if (role === "admin") {
// //     return pathname.startsWith(authRoutes.adminDashboard);
// //   }

// //   return false;
// // };

// // export const resolvePostLoginPath = (
// //   role: AuthRole,
// //   requestedPath?: string | null,
// // ) => {
// //   if (isAllowedRedirectForRole(role, requestedPath)) {
// //     return requestedPath!;
// //   }

// //   return getDefaultRouteForRole(role);
// // };

// import { AuthRole } from "@/types/auth";

// export const authCookieNames = {
//   token: "jr_auth_token",
//   refreshToken: "jr_refresh_token",
//   role: "jr_auth_role",
// } as const;

// export const authRoutes = {
//   home: "/",
//   login: "/login",
//   forgotPassword: "/forgot-password",
//   resetPassword: "/reset-password",
//   signUp: "/sign-up",

//   // keep these same as your actual route folders
//   clientDashboard: "/client-dashboard",
//   providerDashboard: "/provider-dashboard",
//   adminDashboard: "/admin-dashboard",
// } as const;

// export const normalizeAuthRole = (role?: string | null): AuthRole => {
//   if (!role) return null;

//   const normalizedRole = role.toLowerCase();

//   if (
//     normalizedRole === "user" ||
//     normalizedRole === "provider" ||
//     normalizedRole === "admin"
//   ) {
//     return normalizedRole as AuthRole;
//   }

//   return null;
// };

// export const getDefaultRouteForRole = (role?: string | null): string => {
//   const normalizedRole = normalizeAuthRole(role);

//   if (normalizedRole === "user") {
//     return authRoutes.clientDashboard;
//   }

//   if (normalizedRole === "provider") {
//     return authRoutes.providerDashboard;
//   }

//   if (normalizedRole === "admin") {
//     return authRoutes.adminDashboard;
//   }

//   return authRoutes.login;
// };

// export const isAllowedRedirectForRole = (
//   role: AuthRole,
//   pathname?: string | null,
// ): boolean => {
//   if (!role || !pathname || !pathname.startsWith("/")) {
//     return false;
//   }

//   const normalizedRole = normalizeAuthRole(role);

//   if (normalizedRole === "user") {
//     return pathname.startsWith(authRoutes.clientDashboard);
//   }

//   if (normalizedRole === "provider") {
//     return pathname.startsWith(authRoutes.providerDashboard);
//   }

//   if (normalizedRole === "admin") {
//     return pathname.startsWith(authRoutes.adminDashboard);
//   }

//   return false;
// };

// export const resolvePostLoginPath = (
//   role: AuthRole,
//   requestedPath?: string | null,
// ): string => {
//   if (isAllowedRedirectForRole(role, requestedPath)) {
//     return requestedPath!;
//   }

//   return getDefaultRouteForRole(role);
// };

import { AuthRole } from "@/types/auth";

export const authCookieNames = {
  token: "jr_auth_token",
  refreshToken: "jr_refresh_token",
  role: "jr_auth_role",
} as const;

export const authRoutes = {
  home: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  signUp: "/sign-up",

  clientDashboard: "/client-dashboard",
  providerDashboard: "/provider-dashboard",
  adminDashboard: "/admin/dashboard",
} as const;

export const normalizeAuthRole = (role?: string | null): AuthRole => {
  if (!role) return null;

  const normalizedRole = role.toLowerCase();

  if (
    normalizedRole === "user" ||
    normalizedRole === "provider" ||
    normalizedRole === "admin"
  ) {
    return normalizedRole as AuthRole;
  }

  return null;
};

export const getDefaultRouteForRole = (role?: string | null): string => {
  const normalizedRole = normalizeAuthRole(role);

  if (normalizedRole === "user") {
    return authRoutes.clientDashboard;
  }

  if (normalizedRole === "provider") {
    return authRoutes.providerDashboard;
  }

  if (normalizedRole === "admin") {
    return authRoutes.adminDashboard;
  }

  return authRoutes.login;
};

export const isAllowedRedirectForRole = (
  role: AuthRole,
  pathname?: string | null,
): boolean => {
  if (!role || !pathname || !pathname.startsWith("/")) {
    return false;
  }

  const normalizedRole = normalizeAuthRole(role);

  if (normalizedRole === "user") {
    return pathname.startsWith(authRoutes.clientDashboard);
  }

  if (normalizedRole === "provider") {
    return pathname.startsWith(authRoutes.providerDashboard);
  }

  if (normalizedRole === "admin") {
    return pathname.startsWith(authRoutes.adminDashboard);
  }

  return false;
};

export const resolvePostLoginPath = (
  role: AuthRole,
  requestedPath?: string | null,
): string => {
  if (isAllowedRedirectForRole(role, requestedPath)) {
    return requestedPath!;
  }

  return getDefaultRouteForRole(role);
};