import { NextRequest } from "next/server";

import {
  buildMessageApiUrl,
  forwardBackendResponse,
  getAuthHeaders,
  getAuthToken,
  unauthorizedResponse,
} from "../_utils";

type RouteContext = {
  params: Promise<{
    receiverId: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const token = getAuthToken(request);

  if (!token) {
    return unauthorizedResponse();
  }

  const { receiverId } = await context.params;
  const url = new URL(buildMessageApiUrl("/admin/message/index"));
  url.searchParams.set("receiver_id", receiverId);

  const backendResponse = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(token),
    cache: "no-store",
  });

  return forwardBackendResponse(backendResponse);
}
