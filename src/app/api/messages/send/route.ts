import { NextRequest, NextResponse } from "next/server";

import {
  buildMessageApiUrl,
  getAuthHeaders,
  getAuthToken,
  unauthorizedResponse,
} from "../_utils";

// Server-side Pusher instance (created once, reused)
let pusherInstance: any = null;

function getPusherInstance() {
  if (pusherInstance) return pusherInstance;

  const Pusher = require("pusher");
  pusherInstance = new Pusher({
    appId: process.env.PUSHER_APP_ID || "",
    key: process.env.PUSHER_APP_KEY || process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "",
    secret: process.env.PUSHER_APP_SECRET || "",
    cluster: process.env.PUSHER_APP_CLUSTER || process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || "mt1",
    useTLS: true,
  });

  return pusherInstance;
}

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

  const data = await backendResponse.json();

  // After successful message send, broadcast via Pusher so receiver gets it in real-time
  if (data?.status === "success" && data?.data) {
    try {
      const message = data.data;
      const pusher = getPusherInstance();

      const channel = `conversation.${message.conversation_id}`;

      // Build event data including attachments
      const eventData: any = {
        id: message.id,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        conversation_id: message.conversation_id,
        message: message.message,
        type: message.type || "text",
        created_at: message.created_at,
        updated_at: message.updated_at,
        sender: message.sender || null,
        receiver: message.receiver || null,
      };

      // Include attachments if present
      if (message.attachments && message.attachments.length > 0) {
        eventData.attachments = message.attachments.map((att: any) => ({
          id: att.id,
          message_id: att.message_id,
          file_path: att.file_path,
          file_name: att.file_name,
          file_type: att.file_type,
          file_size: att.file_size,
          created_at: att.created_at,
          updated_at: att.updated_at,
        }));
      }

      await pusher.trigger(channel, "message.sent", eventData);
      console.log(`[Pusher] ✅ Triggered event on channel: ${channel}, message: ${message.id}, attachments: ${eventData.attachments?.length || 0}`);
    } catch (e) {
      console.error("[Pusher] Failed to trigger event:", e);
    }
  }

  return NextResponse.json(data, {
    status: backendResponse.status,
  });
}
