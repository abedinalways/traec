"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPusherClient } from "@/lib/pusherClient";
import type { RootState } from "@/app/store";
import { chatApi } from "@/app/api/messages/chatApi";

export default function usePusherChat() {
  const dispatch = useDispatch();
  const activeReceiverId = useSelector(
    (state: RootState) => state.chat.activeReceiverId,
  );

  useEffect(() => {
    const pusher = getPusherClient();

    const channel = pusher.subscribe("conversation");

    channel.bind("message.sent", () => {
      dispatch(chatApi.util.invalidateTags(["Chat"]));

      if (activeReceiverId) {
        dispatch(
          chatApi.util.invalidateTags([
            { type: "Chat", id: String(activeReceiverId) },
          ]),
        );
      }
    });

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Pusher subscribed: conversation");
    });

    channel.bind("pusher:subscription_error", (error: unknown) => {
      console.error("Pusher subscription error:", error);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("conversation");
    };
  }, [dispatch, activeReceiverId]);
}