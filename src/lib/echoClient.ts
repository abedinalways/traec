"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo?: Echo<any>;
  }
}

let echoClient: Echo<any> | null = null;
let lastToken: string | null = null;

const getLocalToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const keys = ["token", "access_token", "jr_auth_token"];
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) return value;
  }

  const objectKeys = ["auth", "user", "auth_user", "jr_auth_user"];
  for (const key of objectKeys) {
    const value = localStorage.getItem(key);
    if (!value) continue;
    try {
      const parsed = JSON.parse(value);
      return (
        parsed?.token || parsed?.accessToken || parsed?.access_token || null
      );
    } catch {}
  }
  return null;
};

export const getEchoClient = (token?: string | null) => {
  if (typeof window === "undefined") return null;

  const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY!;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!;

  const finalToken = token || getLocalToken();

  if (echoClient && finalToken === lastToken) return echoClient;

  resetEchoClient();
  lastToken = finalToken;

  window.Pusher = Pusher;

  echoClient = new Echo({
    broadcaster: "pusher",
    key,
    cluster,
    forceTLS: true,
    authEndpoint: `${process.env.NEXT_PUBLIC_SOCKET_API_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Accept: "application/json",
        ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {}),
      },
    },
    enabledTransports: ["ws", "wss"],
  });

  window.Echo = echoClient;

  // Debug logs
  echoClient.connector.pusher.connection.bind("state_change", (states: any) => {
    console.log("[Echo/Pusher] state:", states.previous, "→", states.current);
  });
  echoClient.connector.pusher.connection.bind("error", (err: any) => {
    console.error("[Echo/Pusher] connection error:", err);
  });

  return echoClient;
};

export const resetEchoClient = () => {
  if (echoClient) {
    try {
      echoClient.disconnect();
    } catch {}
  }
  echoClient = null;
  lastToken = null;
  if (typeof window !== "undefined") delete window.Echo;
};

export const getEchoSocketId = (): string | null => {
  try {
    return window.Echo?.socketId?.() || null;
  } catch {
    return null;
  }
};
