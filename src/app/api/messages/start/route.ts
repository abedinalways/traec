import { NextRequest } from "next/server";

import {
  buildMessageApiUrl,
  forwardBackendResponse,
  getAuthHeaders,
  getAuthToken,
  unauthorizedResponse,
} from "../_utils";

type StartConversationRequest = {
  receiverId?: string | number;
  receiver_id?: string | number;
};

export async function POST(request: NextRequest) {
  const token = getAuthToken(request);

  if (!token) {
    return unauthorizedResponse();
  }

  const body = (await request.json().catch(() => null)) as
    | StartConversationRequest
    | null;
  const receiverId = body?.receiverId ?? body?.receiver_id;

  if (!receiverId) {
    return Response.json(
      {
        success: false,
        message: "Receiver id is required.",
      },
      { status: 400 },
    );
  }

  const url = new URL(buildMessageApiUrl("/admin/message/index"));
  url.searchParams.set("receiver_id", String(receiverId));

  const backendResponse = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(token),
    cache: "no-store",
  });

  return forwardBackendResponse(backendResponse);
}
