import { NextRequest, NextResponse } from "next/server";

import {
  getAuthHeaders,
  getAuthToken,
  unauthorizedResponse,
} from "../../messages/_utils";

export async function POST(request: NextRequest) {
  const token = getAuthToken(request);

  if (!token) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Pusher auth: No token provided");
    }
    return unauthorizedResponse();
  }

  try {
    const bodyText = await request.text();

    if (process.env.NODE_ENV === "development") {
      console.log("Pusher auth request:", bodyText);
    }

    // const authUrl = buildMessageApiUrl("/broadcasting/auth");
    const authUrl = `${process.env.SOCKET_API_URL || "https://traec.apphero.agency"}/broadcasting/auth`;
    const backendResponse = await fetch(authUrl, {
      method: "POST",
      headers: {
        ...getAuthHeaders(token),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyText,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    // Log response status for debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`Pusher auth response status: ${backendResponse.status}`);
    }

    let data;
    try {
      data = await backendResponse.json();
    } catch {
      data = { success: false, message: "Invalid response from auth server" };
    }

    if (process.env.NODE_ENV === "development" && data) {
      console.log("Pusher auth response data:", data);
    }

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error) {
    const errorId = crypto.randomUUID();
    console.error(`Pusher broadcast auth proxy error [${errorId}]:`, error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during channel authorization.",
        errorId,
      },
      { status: 500 },
    );
  }
}
