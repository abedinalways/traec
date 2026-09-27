import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";
import { buildApiUrl } from "@/lib/apiUrl";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(authCookieNames.token)?.value;

  if (token) {
    await fetch(buildApiUrl("/logout"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        access_token: token,
      },
      cache: "no-store",
    }).catch(() => null);
  }

  const response = NextResponse.json(
    {
      success: true,
      message: "Logged out successfully",
    },
    { status: 200 },
  );

  response.cookies.delete(authCookieNames.token);
  response.cookies.delete(authCookieNames.refreshToken);
  response.cookies.delete(authCookieNames.role);

  return response;
}
