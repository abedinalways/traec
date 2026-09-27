"use client";
import Pusher from "pusher-js";

let pusherClient: Pusher | null = null;

export const getPusherClient = (): Pusher | null => {
  if (pusherClient) return pusherClient;

  const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

  if (!key || !cluster) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Pusher credentials (NEXT_PUBLIC_PUSHER_APP_KEY / NEXT_PUBLIC_PUSHER_APP_CLUSTER) missing.",
      );
    }
    return null;
  }

  const authEndpoint = "/api/broadcasting/auth";

  pusherClient = new Pusher(key, {
    cluster,
    forceTLS: true,
    authEndpoint,
    auth: {
      headers: {
        Accept: "application/json",
      },
    },
    authTransport: "ajax",
    disableStats: false,
    enabledTransports: ["ws", "wss"],
  });

  return pusherClient;
};

export const resetPusherClient = () => {
  if (pusherClient) {
    try {
      pusherClient.disconnect();
    } catch {
      /* ignore */
    }
    pusherClient = null;
  }
};
