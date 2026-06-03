import { NextRequest } from "next/server";

import {
  buildMessageApiUrl,
  forwardBackendResponse,
  getAuthHeaders,
  getAuthToken,
  unauthorizedResponse,
} from "../_utils";

export async function POST(request: NextRequest) {
  const token = getAuthToken(request);

  if (!token) {
    return unauthorizedResponse();
  }

  const formData = await request.formData();

  const backendResponse = await fetch(buildMessageApiUrl("/admin/message/send"), {
    method: "POST",
    headers: getAuthHeaders(token),
    body: formData,
    cache: "no-store",
  });

  return forwardBackendResponse(backendResponse);
}
