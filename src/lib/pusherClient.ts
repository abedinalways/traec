"use client";

import Pusher from "pusher-js";

let pusherClient: Pusher | null = null;

export const getPusherClient = () => {
  if (pusherClient) return pusherClient;

  const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

  if (!key) {
    throw new Error("NEXT_PUBLIC_PUSHER_APP_KEY is missing.");
  }

  if (!cluster) {
    throw new Error("NEXT_PUBLIC_PUSHER_APP_CLUSTER is missing.");
  }

  Pusher.logToConsole = process.env.NODE_ENV === "development";

  pusherClient = new Pusher(key, {
    cluster,
    forceTLS: true,
  });

  return pusherClient;
};
