import { NextRequest } from "next/server";

import {
  buildMessageApiUrl,
  forwardBackendResponse,
  getAuthHeaders,
  getAuthToken,
  unauthorizedResponse,
} from "../_utils";

export async function GET(request: NextRequest) {
  const token = getAuthToken(request);

  if (!token) {
    return unauthorizedResponse();
  }

  const backendResponse = await fetch(buildMessageApiUrl("/admin/message/sms-list"), {
    method: "GET",
    headers: getAuthHeaders(token),
    cache: "no-store",
  });

  return forwardBackendResponse(backendResponse);
}
