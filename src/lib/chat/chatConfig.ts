export const chatConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",

  endpoints: {
    conversations: "/admin/message/send-index",
    sendMessage: "/admin/message/send",
    messages: (receiverId: string | number) =>
      `/admin/message/get?receiver_id=${receiverId}`,
  },

  pusher: {
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "",
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || "",
    channelName: "conversation",
    eventName: "message.sent",
  },
};
