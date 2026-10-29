import { NextRequest, NextResponse } from "next/server";
import {
  authCookieNames,
  authRoutes,
  getDefaultRouteForRole,
  normalizeAuthRole,
} from "./lib/auth/config";
import { env } from "./lib/env";

const buildLoginRedirect = (request: NextRequest) => {
  const loginUrl = new URL(authRoutes.login, request.url);
  const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (redirectTo !== authRoutes.home) {
    loginUrl.searchParams.set("redirect", redirectTo);
  }

  return loginUrl;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (env.designMode) {
    return NextResponse.next();
  }

  const token = request.cookies.get(authCookieNames.token)?.value;
  const role = normalizeAuthRole(
    request.cookies.get(authCookieNames.role)?.value,
  );

  const isAuthenticated = Boolean(token && role);
  const defaultAuthenticatedRoute = getDefaultRouteForRole(role);

  const isAuthPage =
    pathname === authRoutes.login ||
    pathname === authRoutes.forgotPassword ||
    pathname === authRoutes.signUp;

  const isClientRoute =
    pathname.startsWith("/client-dashboard") ||
    pathname.startsWith("/client-profile") ||
    pathname.startsWith("/client-account");

  const isProviderRoute =
    pathname.startsWith("/provider-dashboard") ||
    pathname.startsWith("/provider-profile") ||
    pathname.startsWith("/provider-account");

  const isAdminRoute = pathname.startsWith("/admin");

  // Home page stays public
  if (pathname === authRoutes.home) {
    return NextResponse.next();
  }

  // Auth pages (login, signup) - redirect authenticated users to their dashboard
  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  // Client protected routes
  if (isClientRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(buildLoginRedirect(request));
    }

    if (role !== "user") {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  // Provider protected routes
  if (isProviderRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(buildLoginRedirect(request));
    }

    if (role !== "provider") {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  // Admin protected routes
  if (isAdminRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(buildLoginRedirect(request));
    }

    if (role !== "admin") {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/client-dashboard/:path*",
    "/client-profile/:path*",
    "/client-account/:path*",
    "/provider-dashboard/:path*",
    "/provider-profile/:path*",
    "/provider-account/:path*",
    "/admin/:path*",
  ],
};
