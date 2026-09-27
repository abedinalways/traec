"use client";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getPusherClient } from "@/lib/pusherClient";
import { useAppDispatch } from "@/app/store";
import type { RootState } from "@/app/store";
import { notificationApi } from "@/app/api/notification/notificationApi";
import { chatApi } from "@/app/api/messages/chatApi";
import type { Channel } from "pusher-js";

export function PusherNotificationListener() {
  const dispatch = useAppDispatch();
  const currentUserId = useSelector((s: RootState) => s.auth.user?.id);

  const userIdRef = useRef(currentUserId);
  const dispatchRef = useRef(dispatch);

  useEffect(() => {
    userIdRef.current = currentUserId;
  }, [currentUserId]);
  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  const handleNotification = useCallback((_payload: unknown) => {
    const d = dispatchRef.current;

    d(notificationApi.util.invalidateTags(["Notifications"]));
    d(chatApi.util.invalidateTags(["Chat"]));
  }, []);

  useEffect(() => {
    if (!currentUserId || typeof window === "undefined") return;

    const pusher = getPusherClient();
    if (!pusher) return;
    const subscribed: Array<{ name: string; ref: Channel }> = [];

    const userChName = `notification.${currentUserId}`;
    try {
      const userCh = pusher.subscribe(userChName);
      userCh.bind("notification.created", handleNotification);
      subscribed.push({ name: userChName, ref: userCh });
    } catch {
      /* ignore */
    }

    return () => {
      for (const { name, ref: ch } of subscribed) {
        try {
          ch.unbind("notification.created", handleNotification);
          pusher.unsubscribe(name);
        } catch {
          /* */
        }
      }
    };
  }, [currentUserId, handleNotification]);

  return null;
}
