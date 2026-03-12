'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';


import Header from '@/components/message/Header';
import MessageSection from '@/components/message/MessageSection';
import MessageInput from '@/components/message/MessageInput';

export default function ChatPage() {
  const params = useParams();
  // const dispatch = useDispatch();

  // const conversationId = params.id as string;

  // useEffect(() => {
  //   if (conversationId) {
  //     dispatch(setActiveConversation(conversationId));
  //   }
  // }, [conversationId, dispatch]);

  return (
    <div className="md:h-[calc(100dvh-360px)] rounded-2xl py-4 font-[inter]">
      <Header />
      <MessageSection />
      <MessageInput />
    </div>
  );
}
