// import { NextRequest, NextResponse } from "next/server";

// import { authCookieNames, authRoutes, getDefaultRouteForRole, normalizeAuthRole } from "./lib/auth/config";
// import { env } from "./lib/env";

// const buildLoginRedirect = (request: NextRequest) => {
//   const loginUrl = new URL(authRoutes.login, request.url);
//   const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;

//   if (redirectTo !== authRoutes.home) {
//     loginUrl.searchParams.set("redirect", redirectTo);
//   }

//   return loginUrl;
// };

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (env.designMode) {
//     return NextResponse.next();
//   }

//   const token = request.cookies.get(authCookieNames.token)?.value;
//   const role = normalizeAuthRole(
//     request.cookies.get(authCookieNames.role)?.value,
//   );

//   const isAuthenticated = Boolean(token && role);
//   const defaultAuthenticatedRoute = getDefaultRouteForRole(role);

//   const isAuthPage =
//     pathname === authRoutes.login ||
//     pathname === authRoutes.forgotPassword ||
//     pathname === authRoutes.signUp;

//   const isClientRoute = pathname.startsWith(authRoutes.clientDashboard);
//   const isProviderRoute = pathname.startsWith(authRoutes.providerDashboard);
//   const isAdminRoute = pathname.startsWith(authRoutes.adminDashboard);

//   if (pathname === authRoutes.home) {
//     if (!isAuthenticated) {
//       return NextResponse.redirect(new URL(authRoutes.login, request.url));
//     }

//     return NextResponse.redirect(
//       new URL(defaultAuthenticatedRoute, request.url),
//     );
//   }

//   if (pathname === authRoutes.signUp) {
//     return NextResponse.redirect(new URL(authRoutes.login, request.url));
//   }

//   if (isAuthPage) {
//     if (isAuthenticated) {
//       return NextResponse.redirect(
//         new URL(defaultAuthenticatedRoute, request.url),
//       );
//     }

//     return NextResponse.next();
//   }

//   if (isClientRoute) {
//     if (!isAuthenticated) {
//       return NextResponse.redirect(buildLoginRedirect(request));
//     }

//     if (role !== "user") {
//       return NextResponse.redirect(
//         new URL(defaultAuthenticatedRoute, request.url),
//       );
//     }

//     return NextResponse.next();
//   }

//   if (isProviderRoute) {
//     if (!isAuthenticated) {
//       return NextResponse.redirect(buildLoginRedirect(request));
//     }

//     if (role !== "provider") {
//       return NextResponse.redirect(
//         new URL(defaultAuthenticatedRoute, request.url),
//       );
//     }

//     return NextResponse.next();
//   }

//   if (isAdminRoute) {
//     if (!isAuthenticated) {
//       return NextResponse.redirect(buildLoginRedirect(request));
//     }

//     if (role !== "admin") {
//       return NextResponse.redirect(
//         new URL(defaultAuthenticatedRoute, request.url),
//       );
//     }

//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [

//     "/login",
//     "/sign-up",
//     "/forgot-password",
//     "/client-dashboard/:path*",
//     "/provider-dashboard/:path*",
//     "/admin-dashboard/:path*",
//   ],
// };

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

  const isClientRoute = pathname.startsWith(authRoutes.clientDashboard);
  const isProviderRoute = pathname.startsWith(authRoutes.providerDashboard);
  const isAdminRoute = pathname.startsWith(authRoutes.adminDashboard);

  // Home page should stay public.
  if (pathname === authRoutes.home) {
    return NextResponse.next();
  }

  // Login / Sign-up / Forgot-password pages
  // If already logged in, redirect to proper dashboard.
  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  // Client dashboard protected route
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

  // Provider dashboard protected route
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

  // Admin dashboard protected route
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
    "/provider-dashboard/:path*",
    "/admin/dashboard/:path*",
  ],
};