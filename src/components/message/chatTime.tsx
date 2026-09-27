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

    let normalized = timestamp.trim();

    // Backend sends "2026-06-02 03:29:12" (space separator, no timezone)
    // or "2026-05-31T03:48:29.000000Z" (ISO with Z)
    if (normalized.includes(" ") && !normalized.includes("T")) {
      normalized = normalized.replace(" ", "T");
    }

    // If no timezone info, assume UTC
    if (!normalized.endsWith("Z") && !normalized.includes("+") && !normalized.match(/-\d{2}:\d{2}$/)) {
      normalized = normalized + "Z";
    }

    const date = new Date(normalized);

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
