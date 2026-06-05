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

  
  const authEndpoint = "/api/broadcasting/auth";

  console.log("Creating Pusher client with", {
    key,
    cluster,
    authEndpoint,
  });

  Pusher.logToConsole = true;

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