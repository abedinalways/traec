import { NextRequest } from "next/server";

import {
  buildMessageApiUrl,
  forwardBackendResponse,
  getAuthHeaders,
  getAuthToken,
  unauthorizedResponse,
} from "../../../messages/_utils";

export async function POST(request: NextRequest) {
  const token = getAuthToken(request);

  if (!token) {
    return unauthorizedResponse();
  }

  const body = await request.json().catch(() => ({}));

  const backendResponse = await fetch(
    buildMessageApiUrl("/admin/notification/read"),
    {
      method: "POST",
      headers: {
        ...getAuthHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  return forwardBackendResponse(backendResponse);
}