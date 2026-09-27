import { NextRequest, NextResponse } from "next/server";
import { authCookieNames, normalizeAuthRole } from "@/lib/auth/config";
import { buildApiUrl } from "@/lib/apiUrl";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type BackendLoginResponse = {
  user?: {
    id: number;
    name: string;
    last_name?: string | null;
    email: string;
    type?: string | null;
    image?: string | null;
  };
  message?: string;
  token?: string;
  success?: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const loginUrl = buildApiUrl("/login");

    if (!loginUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL in .env.local",
        },
        { status: 500 },
      );
    }

    const backendResponse = await fetch(loginUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = (await backendResponse
      .json()
      .catch(() => null)) as BackendLoginResponse | null;

    if (!backendResponse.ok || !data) {
      return NextResponse.json(
        data || {
          success: false,
          message: "Login failed from backend.",
        },
        { status: backendResponse.status || 500 },
      );
    }

    const token = data.token;
    const role = normalizeAuthRole(data.user?.type);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Login response did not include token.",
        },
        { status: 502 },
      );
    }

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid user role: ${data.user?.type}`,
        },
        { status: 502 },
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: data.message || "Login successful",
        user: data.user,
        token: data.token,
      },
      { status: 200 },
    );

    response.cookies.set(authCookieNames.token, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    response.cookies.set(authCookieNames.role, role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong during login.",
      },
      { status: 500 },
    );
  }
}
