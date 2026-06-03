// import MessageListSection from '@/components/message/MessageListSection';
// import React from 'react';
// import { ChatProvider } from '../context/ChatContext';

// export default function ChatLayout({ children }: React.PropsWithChildren) {
//   return (
//     <ChatProvider>
//       <section className="grid md:h-[calc(100dvh-190px)] grid-cols-12 md:gap-4 font-[manrope] my-4 custom-container font-[inter] ">
//         <div className="h-full md:h-[calc(100dvh-190px)] md:col-span-8 col-span-12 bg-white  p-2 md:grid md:grid-rows-[130px_1fr_86px] rounded-2xl shadow-lg">
//           {children}
//         </div>

//         <aside className="md:col-span-4 col-span-12 mt-4 md:mt-0">
//           <div className="rounded-2xl bg-white md:p-6 p-4 md:max-h-[calc(100dvh-140px)] overflow-y-auto">
//             <MessageListSection />
//           </div>
//         </aside>
//       </section>
//     </ChatProvider>
//   );
// }

"use client";

import MessageListSection from "@/components/message/MessageListSection";
import React from "react";
import { useGetMeQuery } from "@/app/api/auth/authapi";
import usePusherChat from "@/hooks/usePusherChat";

export default function ChatLayout({ children }: React.PropsWithChildren) {
  useGetMeQuery();
  usePusherChat();

  return (
    <section className="grid md:h-[calc(100dvh-190px)] grid-cols-12 md:gap-4 font-[inter] my-4 custom-container">
      {/* Sidebar on the Left */}
      <aside className="md:col-span-4 col-span-12 h-full md:h-[calc(100dvh-190px)]">
        <div className="rounded-2xl bg-white border border-slate-100/80 shadow-sm p-4 h-full flex flex-col overflow-hidden">
          <MessageListSection />
        </div>
      </aside>

      {/* Active Conversation on the Right */}
      <div className="h-full md:h-[calc(100dvh-190px)] md:col-span-8 col-span-12 bg-white border border-slate-100/80 p-2 md:grid md:grid-rows-[auto_1fr_auto] rounded-2xl shadow-sm overflow-hidden">
        {children}
      </div>
    </section>
  );
}
