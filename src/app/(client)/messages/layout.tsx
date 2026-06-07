// "use client";

// import MessageListSection from "@/components/message/MessageListSection";
// import React from "react";
// import { useGetMeQuery } from "@/app/api/auth/authapi";
// import { PusherListener } from "@/hooks/usePusherChat";

// export default function ChatLayout({ children }: React.PropsWithChildren) {
//   useGetMeQuery();

//   return (
//     <>
//       <PusherListener />
//       <section className="grid md:h-[calc(100dvh-190px)] grid-cols-12 md:gap-4 font-[inter] my-4 custom-container">
//         {/* Sidebar on the Left */}
//         <aside className="md:col-span-4 col-span-12 h-full md:h-[calc(100dvh-190px)]">
//           <div className="rounded-2xl bg-white border border-slate-100/80 shadow-sm p-4 h-full flex flex-col overflow-hidden">
//             <MessageListSection />
//           </div>
//         </aside>

//         {/* Active Conversation on the Right */}
//         <div className="h-full md:h-[calc(100dvh-190px)] md:col-span-8 col-span-12 bg-white border border-slate-100/80 p-2 md:grid md:grid-rows-[auto_1fr_auto] rounded-2xl shadow-sm overflow-hidden">
//           {children}
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import MessageListSection from "@/components/message/MessageListSection";
import React from "react";
import { useGetMeQuery } from "@/app/api/auth/authapi";
import { PusherListener } from "@/hooks/usePusherChat";

export default function ChatLayout({ children }: React.PropsWithChildren) {
  useGetMeQuery();

  return (
    <>
      <PusherListener />
      <section className="grid md:h-[calc(100dvh-190px)] grid-cols-12 md:gap-4 font-[inter] my-4 custom-container">
        {/* Sidebar */}
        <aside className="md:col-span-4 col-span-12 h-full md:h-[calc(100dvh-190px)]">
          <div className="rounded-2xl bg-white border border-slate-100/80 shadow-sm p-4 h-full flex flex-col overflow-hidden">
            <MessageListSection />
          </div>
        </aside>

        {/* Chat window */}
        <div className="h-full md:h-[calc(100dvh-190px)] md:col-span-8 col-span-12 bg-[#E5DDD5] border border-slate-100/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          {children}
        </div>
      </section>
    </>
  );
}