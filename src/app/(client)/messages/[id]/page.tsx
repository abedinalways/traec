// 'use client';

// import { useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { useDispatch } from 'react-redux';

// import Header from '@/components/message/Header';
// import MessageSection from '@/components/message/MessageSection';
// import MessageInput from '@/components/message/MessageInput';

// export default function ChatPage() {
//   const params = useParams();
//   // const dispatch = useDispatch();

//   // const conversationId = params.id as string;

//   // useEffect(() => {
//   //   if (conversationId) {
//   //     dispatch(setActiveConversation(conversationId));
//   //   }
//   // }, [conversationId, dispatch]);

//   return (
//     <div className="md:h-[calc(100dvh-360px)] rounded-2xl py-4 font-[inter]">
//       <Header />
//       <MessageSection />
//       <MessageInput />
//     </div>
//   );
// }

// "use client";

// import { useEffect } from "react";
// import { useParams } from "next/navigation";

// import Header from "@/components/message/Header";
// import MessageSection from "@/components/message/MessageSection";
// import MessageInput from "@/components/message/MessageInput";
// import { useChat } from "@/app/(client)/context/ChatContext";

// export default function ChatPage() {
//   const params = useParams();
//   const { selectConversation, activeConversationId } = useChat();

//   const receiverId = Array.isArray(params?.id) ? params.id[0] : params?.id;

//   useEffect(() => {
//     if (receiverId) {
//       selectConversation(String(receiverId));
//     }
//   }, [receiverId, selectConversation]);

//   useEffect(() => {
//     if (!receiverId && activeConversationId) {
//       selectConversation(activeConversationId);
//     }
//   }, [receiverId, activeConversationId, selectConversation]);

//   return (
//     <div className="md:h-[calc(100dvh-360px)] rounded-2xl py-4 font-[inter]">
//       <Header />
//       <MessageSection />
//       <MessageInput />
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import Header from "@/components/message/Header";
import MessageSection from "@/components/message/MessageSection";
import MessageInput from "@/components/message/MessageInput";
import { useAppDispatch } from "@/app/store";
import { setActiveReceiverId } from "@/features/chat/chatSlice";

export default function ChatPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const receiverId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  useEffect(() => {
    if (receiverId) {
      dispatch(setActiveReceiverId(String(receiverId)));
    }

    return () => {
      dispatch(setActiveReceiverId(null));
    };
  }, [receiverId, dispatch]);

  return (
    <div className="md:h-[calc(100dvh-360px)] rounded-2xl py-4 font-[inter]">
      <Header />
      <MessageSection />
      <MessageInput />
    </div>
  );
}