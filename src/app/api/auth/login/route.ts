import { NextRequest, NextResponse } from "next/server";
import { authCookieNames, normalizeAuthRole } from "@/lib/auth/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

const buildApiUrl = (path: string) => {
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL in .env.local",
    );
  }

  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

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

    console.log("LOGIN API URL:", loginUrl);
    console.log("LOGIN BODY:", body);

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

    console.log("BACKEND LOGIN STATUS:", backendResponse.status);
    console.log("BACKEND LOGIN RESPONSE:", data);

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
          backendResponse: data,
        },
        { status: 502 },
      );
    }

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid user role: ${data.user?.type}`,
          backendResponse: data,
        },
        { status: 502 },
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: data.message || "Login successful",
        user: data.user,
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
