import { NextRequest, NextResponse } from "next/server";

import {
  buildMessageApiUrl,
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
    // Pusher sends authentication requests as application/x-www-form-urlencoded body
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
    });

    // Log response status for debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`Pusher auth response status: ${backendResponse.status}`);
    }

    const data = await backendResponse.json().catch(() => null);

    if (process.env.NODE_ENV === "development" && data) {
      console.log("Pusher auth response data:", data);
    }

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error("Pusher broadcast auth proxy error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error during channel authorization." },
      { status: 500 },
    );
  }
}
