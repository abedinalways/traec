"use client";

import { useEffect, useState } from "react";

interface ChatTimeProps {
  timestamp: string | null | undefined;
}

export default function ChatTime({ timestamp }: ChatTimeProps) {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    if (!timestamp) {
      setLocalTime("");
      return;
    }

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      setLocalTime("");
      return;
    }

    const formatted = date.toLocaleTimeString(navigator.language || "en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setLocalTime(formatted);
  }, [timestamp]);

  if (!localTime) {
    return <span className="opacity-0">--:--</span>;
  }

  return <span>{localTime}</span>;
}
