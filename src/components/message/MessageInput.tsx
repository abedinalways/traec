// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import { useChat } from "@/app/(client)/context/ChatContext";
// // import { Plus, Smile, Mic } from "lucide-react";
// // import PlusIcon from "../icons/PlusIcon";
// // import PhotoIcon from "../icons/PhotoIcon";
// // import MicIcon from "../icons/MicIcon";

// // export default function MessageInput() {
// //   const { sendMessage } = useChat();
// //   const [input, setInput] = useState("");
// //   const textareaRef = useRef<HTMLTextAreaElement>(null);

// //   // Auto grow textarea
// //   useEffect(() => {
// //     const textarea = textareaRef.current;
// //     if (!textarea) return;

// //     textarea.style.height = "auto";
// //     textarea.style.height = textarea.scrollHeight + "px";
// //   }, [input]);

// //   const handleSend = () => {
// //     if (!input.trim()) return;
// //     sendMessage(input);
// //     setInput("");
// //   };

// //   return (
// //     <div className="px-6 py-4 border-t bg-white flex items-center justify-evenly gap-2">
// //       <div className="flex items-center gap-1">
// //         <span className="cursor-pointer">
// //           <PlusIcon />
// //         </span>
// //         <span className="cursor-pointer">
// //           <PhotoIcon />
// //         </span>
// //       </div>
// //       <div className="w-full flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
// //         <textarea
// //           ref={textareaRef}
// //           value={input}
// //           rows={1}
// //           placeholder="Type message..."
// //           className="flex-1 bg-transparent resize-none outline-none text-sm max-h-[120px] overflow-y-auto"
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => {
// //             if (e.key === "Enter" && !e.shiftKey) {
// //               e.preventDefault();
// //               handleSend();
// //             }
// //           }}
// //         />

// //         <Smile size={20} className="text-gray-500 cursor-pointer" />
// //       </div>
// //       <div>
// //         <MicIcon className="cursor-pointer"/>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useChat } from "@/app/(client)/context/ChatContext";
// import { Smile } from "lucide-react";
// import PlusIcon from "../icons/PlusIcon";
// import PhotoIcon from "../icons/PhotoIcon";
// import MicIcon from "../icons/MicIcon";

// export default function MessageInput() {
//   const { sendMessage, activeConversation, isSending } = useChat();
//   const [input, setInput] = useState("");
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     const textarea = textareaRef.current;
//     if (!textarea) return;

//     textarea.style.height = "auto";
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   }, [input]);

//   const handleSend = async () => {
//     if (!input.trim() || !activeConversation || isSending) return;

//     const message = input;
//     setInput("");

//     await sendMessage(message);
//   };

//   return (
//     <div className="px-6 py-4 border-t bg-white flex items-center justify-evenly gap-2">
//       <div className="flex items-center gap-1">
//         <span className="cursor-pointer">
//           <PlusIcon />
//         </span>
//         <span className="cursor-pointer">
//           <PhotoIcon />
//         </span>
//       </div>
//       <div className="w-full flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
//         <textarea
//           ref={textareaRef}
//           value={input}
//           rows={1}
//           disabled={!activeConversation || isSending}
//           placeholder={
//             activeConversation ? "Type message..." : "Select a conversation..."
//           }
//           className="flex-1 bg-transparent resize-none outline-none text-sm max-h-[120px] overflow-y-auto disabled:cursor-not-allowed"
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//         />

//         <Smile size={20} className="text-gray-500 cursor-pointer" />
//       </div>
//       <div>
//         <MicIcon className="cursor-pointer" />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Smile } from "lucide-react";

import type { RootState } from "@/app/store";
import PlusIcon from "../icons/PlusIcon";
import PhotoIcon from "../icons/PhotoIcon";
import MicIcon from "../icons/MicIcon";
import { useSendMessageMutation } from "@/app/api/messages/chatApi";

export default function MessageInput() {
  const activeReceiverId = useSelector(
    (state: RootState) => state.chat.activeReceiverId,
  );

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto grow textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || !activeReceiverId || isLoading) return;

    const messageText = input.trim();

    setInput("");

    try {
      await sendMessage({
        receiverId: activeReceiverId,
        message: messageText,
      }).unwrap();
    } catch (error) {
      console.error("Message send failed:", error);
      setInput(messageText);
    }
  };

  return (
    <div className="px-6 py-4 border-t bg-white flex items-center justify-evenly gap-2">
      <div className="flex items-center gap-1">
        <span className="cursor-pointer">
          <PlusIcon />
        </span>
        <span className="cursor-pointer">
          <PhotoIcon />
        </span>
      </div>
      <div className="w-full flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
        <textarea
          ref={textareaRef}
          value={input}
          rows={1}
          placeholder={
            activeReceiverId ? "Type message..." : "Select a conversation..."
          }
          disabled={!activeReceiverId || isLoading}
          className="flex-1 bg-transparent resize-none outline-none text-sm max-h-[120px] overflow-y-auto disabled:cursor-not-allowed"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <Smile size={20} className="text-gray-500 cursor-pointer" />
      </div>
      <div>
        <MicIcon className="cursor-pointer" />
      </div>
    </div>
  );
}