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

  // CRITICAL: Always use the local Next.js proxy for Pusher auth.
  // The local proxy at /api/broadcasting/auth forwards httpOnly cookies to the backend.
  // Using an external URL directly would bypass cookies (cross-origin requests don't send httpOnly cookies).
  const authEndpoint = "/api/broadcasting/auth";

  console.log("Creating Pusher client with", {
    key,
    cluster,
    authEndpoint,
  });

  Pusher.logToConsole = process.env.NODE_ENV === "development";

  pusherClient = new Pusher(key, {
    cluster,
    forceTLS: true,
    authEndpoint,
    // CRITICAL: withCredentials must be true so the browser sends httpOnly cookies
    // with the Pusher auth XHR request to our local /api/broadcasting/auth proxy.
    auth: {
      headers: {
        Accept: "application/json",
      },
    },
    authTransport: "ajax",
    disableStats: false,
    enabledTransports: ["ws", "wss"],
  });

  // Ensure XHR sends cookies for auth requests
  // Pusher.js respects this for same-origin auth endpoints
  (pusherClient as any).config.auth = {
    ...(pusherClient as any).config.auth,
    headers: { Accept: "application/json" },
  };

  pusherClient.connection.bind(
    "state_change",
    (states: { current: string; previous: string }) => {
      console.log(
        `Pusher connection state changed: ${states.previous} → ${states.current}`,
      );
    },
  );

  pusherClient.connection.bind("error", (err: Error) => {
    console.error("Pusher connection error:", err);
  });

  pusherClient.connection.bind("connected", () => {
    console.log("Pusher connected successfully");
  });

  pusherClient.connection.bind("disconnected", () => {
    console.log("Pusher disconnected");
  });

  return pusherClient;
};

export const resetPusherClient = () => {
  if (pusherClient) {
    pusherClient.disconnect();
    pusherClient = null;
  }
};