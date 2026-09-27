import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

import {
  buildMessageApiUrl,
  getAuthHeaders,
  getAuthToken,
  unauthorizedResponse,
} from "../_utils";

type Attachment = {
  id?: number | string;
  message_id?: number | string;
  file_path?: string;
  file_name?: string;
  file_type?: string;
  file_size?: number | string;
  created_at?: string;
  updated_at?: string;
};

type PusherEventData = {
  id: number | string;
  sender_id: number | string;
  receiver_id: number | string;
  conversation_id: number | string;
  message: string;
  type: string;
  created_at: string;
  updated_at: string;
  sender: unknown;
  receiver: unknown;
  attachments?: Attachment[];
};

let pusherInstance: Pusher | null = null;

function getPusherInstance(): Pusher {
  if (pusherInstance) return pusherInstance;

  pusherInstance = new Pusher({
    appId: process.env.PUSHER_APP_ID || "",
    key:
      process.env.PUSHER_APP_KEY ||
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY ||
      "",
    secret: process.env.PUSHER_APP_SECRET || "",
    cluster:
      process.env.PUSHER_APP_CLUSTER ||
      process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ||
      "mt1",
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

  const backendResponse = await fetch(
    buildMessageApiUrl("/admin/message/send"),
    {
      method: "POST",
      headers: getAuthHeaders(token),
      body: formData,
      cache: "no-store",
    },
  );

  const data = await backendResponse.json();

  // After successful message send, broadcast via Pusher so receiver gets it in real-time
  if (data?.status === "success" && data?.data) {
    try {
      const message = data.data;
      const pusher = getPusherInstance();

      // Build event data including attachments
      const eventData: PusherEventData = {
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
        eventData.attachments = message.attachments.map((att: Attachment) => ({
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

      // Broadcast to conversation channel, receiver channel, and sender channel
      const channels = Array.from(
        new Set([
          `conversation.${message.conversation_id}`,
          `conversation.${message.receiver_id}`,
          `conversation.${message.sender_id}`,
        ]),
      );

      await pusher.trigger(channels, "message.sent", eventData);
    } catch (e) {
      console.error("[Pusher] Failed to trigger event:", e);
    }
  }

  return NextResponse.json(data, {
    status: backendResponse.status,
  });
}
