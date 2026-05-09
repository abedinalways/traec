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
  dispatcherDashboard: "/dispatcher/dashboard",
  adminDashboard: "/admin/dashboard",
  superAdminDashboard: "/super-admin/dashboard",
} as const;

export const normalizeAuthRole = (role?: string | null): AuthRole => {
  if (role === "provider" || role === "admin" || role === "user") {
    return role;
  }

  return null;
};

export const getDefaultRouteForRole = (role?: string | null) => {
  const normalizedRole = normalizeAuthRole(role);

  if (normalizedRole === "provider") {
    return authRoutes.dispatcherDashboard;
  }

  if (normalizedRole === "admin") {
    return authRoutes.adminDashboard;
  }

  if (normalizedRole === "user") {
    return authRoutes.superAdminDashboard;
  }

  return authRoutes.login;
};

export const isAllowedRedirectForRole = (
  role: AuthRole,
  pathname?: string | null,
) => {
  if (!pathname || !pathname.startsWith("/")) {
    return false;
  }

  if (role === "admin") {
    return pathname.startsWith("/admin/dashboard");
  }

  if (role === "user") {
    return pathname.startsWith("/user/dashboard");
  }

  if (role === "provider") {
    return pathname.startsWith("/provider/dashboard");
  }

  return false;
};

export const resolvePostLoginPath = (
  role: AuthRole,
  requestedPath?: string | null,
) => {
  if (isAllowedRedirectForRole(role, requestedPath)) {
    return requestedPath!;
  }

  return getDefaultRouteForRole(role);
};
