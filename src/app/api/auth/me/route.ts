import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";

const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

const buildApiUrl = (path: string) => {
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(authCookieNames.token)?.value;

    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
          user: null,
        },
        { status: 401 },
      );
    }

    const backendResponse = await fetch(buildApiUrl("/me"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        access_token: token,
      },
      cache: "no-store",
    });

    const data = await backendResponse.json().catch(() => null);

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          authenticated: false,
          user: null,
          message: data?.message || "Unable to fetch current user.",
        },
        { status: backendResponse.status },
      );
    }

    const user = data?.user || data?.data?.user || data?.data || data;

    return NextResponse.json(
      {
        authenticated: true,
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Me route error:", error);

    return NextResponse.json(
      {
        authenticated: false,
        user: null,
        message: "Unable to load current user.",
      },
      { status: 500 },
    );
  }
}
