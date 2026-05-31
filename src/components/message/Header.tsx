// // "use client";
// // import Image from "next/image";
// // import { useChat } from "@/app/(client)/context/ChatContext";

// // export default function Header() {
// //   const { activeConversation } = useChat();
// //   if (!activeConversation) return null;

// //   return (
// //     <div className="flex items-center gap-3 px-5 py-1 bg-gray-100 border-b ">
// //       <Image
// //         src={activeConversation.avatar}
// //         alt={activeConversation.name}
// //         width={42}
// //         height={42}
// //         className="rounded-full"
// //       />
// //       <div>
// //         <p className="font-semibold">{activeConversation.name}</p>
// //         <p className="text-xs text-gray-500">Online</p>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import Image from "next/image";
// import { useChat } from "@/app/(client)/context/ChatContext";

// export default function Header() {
//   const { activeConversation, isLoadingMessages } = useChat();

//   if (!activeConversation) {
//     return (
//       <div className="flex items-center gap-3 px-5 py-1 bg-gray-100 border-b ">
//         <div>
//           <p className="font-semibold">Select a conversation</p>
//           <p className="text-xs text-gray-500">
//             Choose a conversation to start messaging
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center gap-3 px-5 py-1 bg-gray-100 border-b ">
//       <Image
//         src={activeConversation.avatar}
//         alt={activeConversation.name}
//         width={42}
//         height={42}
//         className="rounded-full"
//       />
//       <div>
//         <p className="font-semibold">{activeConversation.name}</p>
//         <p className="text-xs text-gray-500">
//           {isLoadingMessages
//             ? "Loading..."
//             : activeConversation.online
//               ? "Online"
//               : "Offline"}
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

import type { RootState } from "@/app/store";
import {
  getConversationAvatar,
  getConversationName,
  getConversationReceiverId,
} from "@/lib/chatHelpers";
import { useGetConversationsQuery } from "@/app/api/messages/chatApi";

export default function Header() {
  const activeReceiverId = useSelector(
    (state: RootState) => state.chat.activeReceiverId,
  );

  const { data } = useGetConversationsQuery();

  const conversations = data?.data || [];

  const activeConversation = conversations.find(
    (conv) => getConversationReceiverId(conv) === activeReceiverId,
  );

  if (!activeConversation) {
    return (
      <div className="flex items-center gap-3 px-5 py-1 bg-gray-100 border-b ">
        <div>
          <p className="font-semibold">Select a conversation</p>
          <p className="text-xs text-gray-500">
            Choose a conversation to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-5 py-1 bg-gray-100 border-b ">
      <Image
        src={getConversationAvatar(activeConversation)}
        alt={getConversationName(activeConversation)}
        width={42}
        height={42}
        className="rounded-full"
      />
      <div>
        <p className="font-semibold">
          {getConversationName(activeConversation)}
        </p>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
}