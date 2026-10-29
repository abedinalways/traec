import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";
import { buildApiUrl } from "@/lib/apiUrl";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(authCookieNames.token)?.value;

    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
          user: null,
          token: null,
        },
        { status: 401 },
      );
    }

    const meUrl = buildApiUrl("/me");

    const backendResponse = await fetch(meUrl, {
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
      const response = NextResponse.json(
        {
          authenticated: false,
          user: null,
          token: null,
          message: data?.message || "Unable to fetch current user.",
        },
        { status: backendResponse.status },
      );

      // Clear stale cookies on auth failure
      response.cookies.delete(authCookieNames.token);
      response.cookies.delete(authCookieNames.role);
      return response;
    }

    const user = data?.user || data?.data?.user || data?.data || data;

    return NextResponse.json(
      {
        authenticated: true,
        user,
        token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Me route error:", error);

    return NextResponse.json(
      {
        authenticated: false,
        user: null,
        token: null,
        message: "Unable to load current user.",
      },
      { status: 500 },
    );
  }
}
