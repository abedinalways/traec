import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";

const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

const buildApiUrl = (path: string) => {
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL",
    );
  }

  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(authCookieNames.token)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const search = request.nextUrl.searchParams.get("search") || "";
    const period = request.nextUrl.searchParams.get("period") || "";
    const page = request.nextUrl.searchParams.get("page") || "1";
    const per_page = request.nextUrl.searchParams.get("per_page") || "10";

    const backendResponse = await fetch(
      buildApiUrl(
        `/admin/admin-order/index?search=${encodeURIComponent(
          search,
        )}&period=${encodeURIComponent(
          period,
        )}&page=${page}&per_page=${per_page}`,
      ),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          access_token: token,
        },
        cache: "no-store",
      },
    );

    const data = await backendResponse.json().catch(() => null);

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || {
          success: false,
          message: "Failed to load user summary",
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("USER SUMMARY API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while loading user summary",
      },
      { status: 500 },
    );
  }
}
