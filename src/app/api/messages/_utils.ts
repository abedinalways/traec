import { NextRequest, NextResponse } from "next/server";

import { authCookieNames } from "@/lib/auth/config";

const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://traec.apphero.agency/api";

export const buildMessageApiUrl = (path: string) => {
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export const getAuthToken = (request: NextRequest) => {
  // Try cookie first (primary method)
  const cookieToken = request.cookies.get(authCookieNames.token)?.value;
  
  // Fallback to Authorization header
  const authHeader = request.headers.get("authorization");
  const headerToken = authHeader?.replace("Bearer ", "").replace("Token ", "") || null;
  
  return cookieToken || headerToken || null;
};

// export const getAuthHeaders = (token: string) => ({
//   Accept: "application/json",
//   Authorization: `Bearer ${token}`,
//   access_token: token,
// });
export const getAuthHeaders = (token: string) => ({
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

export const unauthorizedResponse = () => {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized. Please login again.",
    },
    { status: 401 },
  );
};

export const parseBackendResponse = async (response: Response) => {
  const text = await response.text();

  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

export const forwardBackendResponse = async (response: Response) => {
  const data = await parseBackendResponse(response);

  return NextResponse.json(data, {
    status: response.status,
  });
};
