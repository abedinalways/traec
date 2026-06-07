// // "use client";

// // import { useState, useRef, useEffect, useCallback } from "react";
// // import {
// //   Image as ImageIcon,
// //   Paperclip,
// //   Send,
// //   X,
// //   FileText,
// //   Film,
// //   Music,
// //   File,
// //   Check,
// // } from "lucide-react";

// // import { useAppSelector } from "@/app/store";
// // import { useSendMessageMutation } from "@/app/api/messages/chatApi";
// // import type { ChatAttachment } from "@/app/api/messages/chatApi";

// // /* ── helpers ─────────────────────────────────────────────── */

// // const formatFileSize = (size?: number): string => {
// //   if (!size || size <= 0) return "";
// //   if (size < 1024) return `${size} B`;
// //   if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
// //   return `${(size / (1024 * 1024)).toFixed(1)} MB`;
// // };

// // const getFileIcon = (type: string, name: string) => {
// //   const t = type.toLowerCase();
// //   const n = name.toLowerCase();
// //   if (t.startsWith("video/") || /\.(mp4|mov|avi|webm|mkv)$/.test(n))
// //     return <Film size={16} className="text-purple-500" />;
// //   if (t.startsWith("audio/") || /\.(mp3|wav|ogg|flac|aac)$/.test(n))
// //     return <Music size={16} className="text-pink-500" />;
// //   if (t === "application/pdf" || n.endsWith(".pdf"))
// //     return <FileText size={16} className="text-red-500" />;
// //   return <File size={16} className="text-slate-400" />;
// // };

// // const isImage = (file: File) => file.type.startsWith("image/");

// // /* ── component ────────────────────────────────────────────── */

// // interface PendingFile {
// //   file: File;
// //   id: string;
// //   preview?: string;          // blob URL for images
// // }

// // export default function MessageInput() {
// //   const activeReceiverId = useAppSelector((s) => s.chat.activeReceiverId);
// //   const [sendMessage, { isLoading }] = useSendMessageMutation();

// //   const [text, setText] = useState("");
// //   const [pending, setPending] = useState<PendingFile[]>([]);
// //   const [dragOver, setDragOver] = useState(false);

// //   const textareaRef = useRef<HTMLTextAreaElement>(null);
// //   const imgInputRef = useRef<HTMLInputElement>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   /* auto-resize textarea */
// //   useEffect(() => {
// //     const el = textareaRef.current;
// //     if (!el) return;
// //     el.style.height = "auto";
// //     el.style.height = `${el.scrollHeight}px`;
// //   }, [text]);

// //   /* revoke blob URLs */
// //   useEffect(() => {
// //     return () => {
// //       pending.forEach((p) => p.preview && URL.revokeObjectURL(p.preview));
// //     };
// //   }, []);

// //   /* file → PendingFile */
// //   const wrap = useCallback((f: File): PendingFile => ({
// //     file: f,
// //     id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
// //     preview: isImage(f) ? URL.createObjectURL(f) : undefined,
// //   }), []);

// //   const addFiles = useCallback(
// //     (list: FileList | File[]) => setPending((p) => [...p, ...Array.from(list).map(wrap)]),
// //     [wrap],
// //   );

// //   const remove = useCallback((id: string) => {
// //     setPending((p) => {
// //       const hit = (x: PendingFile) => x.id === id;
// //       const found = p.find(hit);
// //       if (found?.preview) URL.revokeObjectURL(found.preview);
// //       return p.filter((x) => !hit(x));
// //     });
// //   }, []);

// //   /* send */
// //   const canSend = activeReceiverId && !isLoading && (text.trim() || pending.length > 0);

// //   const handleSend = async () => {
// //     if (!canSend) return;
// //     const msg = text.trim();
// //     const files = pending.map((p) => p.file);
// //     setText("");
// //     setPending([]);
// //     try {
// //       await sendMessage({ receiverId: activeReceiverId, message: msg, attachments: files }).unwrap();
// //     } catch {
// //       setText(msg);
// //       setPending(files.map(wrap));
// //     }
// //   };

// //   /* drag & drop */
// //   const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
// //   const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); };
// //   const onDrop = (e: React.DragEvent) => {
// //     e.preventDefault(); setDragOver(false);
// //     if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
// //   };

// //   /* derived */
// //   const imgs = pending.filter((p) => isImage(p.file));
// //   const docs = pending.filter((p) => !isImage(p.file));

// //   /* ── render ─────────────────────────────────────────────── */
// //   return (
// //     <div
// //       className="relative border-t border-slate-100 bg-white"
// //       onDragOver={onDragOver}
// //       onDragLeave={onDragLeave}
// //       onDrop={onDrop}
// //     >
// //       {/* drag overlay */}
// //       {dragOver && (
// //         <div className="absolute inset-0 z-30 flex items-center justify-center rounded-t-2xl border-2 border-dashed border-indigo-400 bg-indigo-50/80 backdrop-blur-sm">
// //           <div className="text-center pointer-events-none">
// //             <Send size={36} className="mx-auto mb-2 text-indigo-500 animate-bounce" />
// //             <p className="text-sm font-bold text-indigo-600">Drop files here</p>
// //           </div>
// //         </div>
// //       )}

// //       <div className="px-3 pt-3 pb-3 sm:px-4">
// //         {/* ── image previews ── */}
// //         {imgs.length > 0 && (
// //           <div className="mb-2 flex flex-wrap gap-2">
// //             {imgs.map((p) => (
// //               <div key={p.id} className="relative group">
// //                 <img
// //                   src={p.preview}
// //                   alt={p.file.name}
// //                   className="h-16 w-16 rounded-lg object-cover border border-slate-200 shadow-sm"
// //                 />
// //                 <button
// //                   onClick={() => remove(p.id)}
// //                   className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
// //                 >
// //                   <X size={10} strokeWidth={3} />
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* ── file previews ── */}
// //         {docs.length > 0 && (
// //           <div className="mb-2 flex flex-col gap-1">
// //             {docs.map((p) => (
// //               <div
// //                 key={p.id}
// //                 className="flex items-center gap-2.5 rounded-lg bg-slate-50 border border-slate-200/70 px-2.5 py-1.5 group"
// //               >
// //                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white border border-slate-100">
// //                   {getFileIcon(p.file.type, p.file.name)}
// //                 </div>
// //                 <div className="flex-1 min-w-0">
// //                   <p className="text-[11px] font-semibold text-slate-700 truncate leading-tight">
// //                     {p.file.name}
// //                   </p>
// //                   <p className="text-[10px] text-slate-400 leading-tight">
// //                     {formatFileSize(p.file.size)}
// //                   </p>
// //                 </div>
// //                 <button
// //                   onClick={() => remove(p.id)}
// //                   className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition cursor-pointer"
// //                 >
// //                   <X size={11} strokeWidth={3} />
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* ── input row ── */}
// //         <div className="flex items-end gap-1.5">
// //           {/* hidden inputs */}
// //           <input ref={imgInputRef} type="file" accept="image/*" multiple className="hidden"
// //             onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }} />
// //           <input ref={fileInputRef} type="file" multiple className="hidden"
// //             onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }} />

// //           {/* attach buttons */}
// //           <div className="flex flex-col gap-0.5 pb-0.5">
// //             <button
// //               type="button"
// //               disabled={!activeReceiverId}
// //               onClick={() => imgInputRef.current?.click()}
// //               className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
// //               title="Upload image"
// //             >
// //               <ImageIcon size={18} />
// //             </button>
// //             <button
// //               type="button"
// //               disabled={!activeReceiverId}
// //               onClick={() => fileInputRef.current?.click()}
// //               className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
// //               title="Attach file"
// //             >
// //               <Paperclip size={18} />
// //             </button>
// //           </div>

// //           {/* textarea */}
// //           <div className="flex-1 flex items-end rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-1.5 focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
// //             <textarea
// //               ref={textareaRef}
// //               value={text}
// //               rows={1}
// //               placeholder={activeReceiverId ? "Write a message…" : "Select a chat…"}
// //               disabled={!activeReceiverId || isLoading}
// //               className="max-h-[100px] flex-1 resize-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed leading-relaxed"
// //               onChange={(e) => setText(e.target.value)}
// //               onKeyDown={(e) => {
// //                 if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
// //               }}
// //             />
// //           </div>

// //           {/* send */}
// //           <button
// //             type="button"
// //             onClick={handleSend}
// //             disabled={!canSend}
// //             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
// //           >
// //             {isLoading ? (
// //               <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //             ) : (
// //               <Send size={16} className="ml-[1px]" />
// //             )}
// //           </button>
// //         </div>

// //         {/* attachment count badge */}
// //         {pending.length > 0 && (
// //           <div className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-indigo-500">
// //             <Check size={10} />
// //             {pending.length} file{pending.length > 1 ? "s" : ""} ready to send
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";
// import {
//   Image as ImageIcon,
//   Paperclip,
//   Send,
//   X,
//   FileText,
//   Film,
//   Music,
//   File,
//   Check,
// } from "lucide-react";

// import { useAppSelector } from "@/app/store";
// import { useSendMessageMutation } from "@/app/api/messages/chatApi";

// /* ── helpers ─────────────────────────────────────────────── */
// const formatFileSize = (size?: number): string => {
//   if (!size || size <= 0) return "";
//   if (size < 1024) return `${size} B`;
//   if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
//   return `${(size / (1024 * 1024)).toFixed(1)} MB`;
// };

// const getFileIcon = (type: string, name: string) => {
//   const t = type.toLowerCase();
//   const n = name.toLowerCase();
//   if (t.startsWith("video/") || /\.(mp4|mov|avi|webm|mkv)$/.test(n))
//     return <Film size={15} className="text-purple-500" />;
//   if (t.startsWith("audio/") || /\.(mp3|wav|ogg|flac|aac)$/.test(n))
//     return <Music size={15} className="text-pink-500" />;
//   if (t === "application/pdf" || n.endsWith(".pdf"))
//     return <FileText size={15} className="text-red-500" />;
//   return <File size={15} className="text-slate-400" />;
// };

// const isImage = (file: File) => file.type.startsWith("image/");

// interface PendingFile {
//   file: File;
//   id: string;
//   preview?: string;
// }

// /* ── component ────────────────────────────────────────────── */
// export default function MessageInput() {
//   const activeReceiverId = useAppSelector((s) => s.chat.activeReceiverId);
//   const [sendMessage, { isLoading }] = useSendMessageMutation();

//   const [text, setText] = useState("");
//   const [pending, setPending] = useState<PendingFile[]>([]);
//   const [dragOver, setDragOver] = useState(false);

//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const imgInputRef = useRef<HTMLInputElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const el = textareaRef.current;
//     if (!el) return;
//     el.style.height = "auto";
//     el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
//   }, [text]);

//   useEffect(
//     () => () => {
//       pending.forEach((p) => p.preview && URL.revokeObjectURL(p.preview));
//     },
//     [],
//   );

//   const wrap = useCallback(
//     (f: File): PendingFile => ({
//       file: f,
//       id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
//       preview: isImage(f) ? URL.createObjectURL(f) : undefined,
//     }),
//     [],
//   );

//   const addFiles = useCallback(
//     (list: FileList | File[]) =>
//       setPending((p) => [...p, ...Array.from(list).map(wrap)]),
//     [wrap],
//   );

//   const remove = useCallback((id: string) => {
//     setPending((p) => {
//       const found = p.find((x) => x.id === id);
//       if (found?.preview) URL.revokeObjectURL(found.preview);
//       return p.filter((x) => x.id !== id);
//     });
//   }, []);

//   const canSend =
//     activeReceiverId && !isLoading && (text.trim() || pending.length > 0);

//   const handleSend = async () => {
//     if (!canSend) return;
//     const msg = text.trim();
//     const files = pending.map((p) => p.file);
//     setText("");
//     setPending([]);
//     try {
//       await sendMessage({
//         receiverId: activeReceiverId,
//         message: msg,
//         attachments: files,
//       }).unwrap();
//     } catch {
//       setText(msg);
//       setPending(files.map(wrap));
//     }
//   };

//   const onDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setDragOver(true);
//   };
//   const onDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setDragOver(false);
//   };
//   const onDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setDragOver(false);
//     if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
//   };

//   const imgs = pending.filter((p) => isImage(p.file));
//   const docs = pending.filter((p) => !isImage(p.file));

//   return (
//     <div
//       className="relative border-t border-slate-100 bg-white px-3 py-2"
//       onDragOver={onDragOver}
//       onDragLeave={onDragLeave}
//       onDrop={onDrop}
//     >
//       {/* drag overlay */}
//       {dragOver && (
//         <div className="absolute inset-0 z-30 flex items-center justify-center border-2 border-dashed border-indigo-400 bg-indigo-50/80 backdrop-blur-sm">
//           <div className="pointer-events-none text-center">
//             <Paperclip
//               size={30}
//               className="mx-auto mb-1.5 animate-bounce text-indigo-500"
//             />
//             <p className="text-sm font-semibold text-indigo-600">
//               Drop files here
//             </p>
//           </div>
//         </div>
//       )}

//       {/* hidden inputs */}
//       <input
//         ref={imgInputRef}
//         type="file"
//         accept="image/*"
//         multiple
//         className="hidden"
//         onChange={(e) => {
//           if (e.target.files) addFiles(e.target.files);
//           e.target.value = "";
//         }}
//       />
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         className="hidden"
//         onChange={(e) => {
//           if (e.target.files) addFiles(e.target.files);
//           e.target.value = "";
//         }}
//       />

//       {/* image previews — OUTSIDE the input row, above it */}
//       {imgs.length > 0 && (
//         <div className="mb-2 flex flex-wrap gap-2 px-1">
//           {imgs.map((p) => (
//             <div key={p.id} className="group relative h-12 w-12 shrink-0">
//               <img
//                 src={p.preview}
//                 alt={p.file.name}
//                 className="h-full w-full rounded-lg border border-slate-200 object-cover shadow-sm"
//               />
//               <button
//                 onClick={() => remove(p.id)}
//                 className="absolute -right-1 -top-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
//               >
//                 <X size={8} strokeWidth={3} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* doc previews — OUTSIDE the input row, above it */}
//       {docs.length > 0 && (
//         <div className="mb-2 flex flex-col gap-1 px-1">
//           {docs.map((p) => (
//             <div
//               key={p.id}
//               className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5"
//             >
//               <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-100 bg-white">
//                 {getFileIcon(p.file.type, p.file.name)}
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="truncate text-[11px] font-semibold leading-tight text-slate-700">
//                   {p.file.name}
//                 </p>
//                 <p className="text-[10px] leading-tight text-slate-400">
//                   {formatFileSize(p.file.size)}
//                 </p>
//               </div>
//               <button
//                 onClick={() => remove(p.id)}
//                 className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
//               >
//                 <X size={10} strokeWidth={3} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── input row — always visible, always at bottom ── */}
//       <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/70 px-2 py-1.5 transition-all focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
//         {/* image upload button */}
//         <button
//           type="button"
//           disabled={!activeReceiverId}
//           onClick={() => imgInputRef.current?.click()}
//           title="Upload image"
//           className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-30"
//         >
//           <ImageIcon size={17} />
//         </button>

//         {/* file attach button */}
//         <button
//           type="button"
//           disabled={!activeReceiverId}
//           onClick={() => fileInputRef.current?.click()}
//           title="Attach file"
//           className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-30"
//         >
//           <Paperclip size={17} />
//         </button>

//         {/* divider */}
//         <div className="h-4 w-px shrink-0 bg-slate-200" />

//         {/* textarea */}
//         <textarea
//           ref={textareaRef}
//           value={text}
//           rows={1}
//           placeholder={activeReceiverId ? "Write a message…" : "Select a chat…"}
//           disabled={!activeReceiverId || isLoading}
//           className="max-h-[100px] flex-1 resize-none bg-transparent py-0.5 text-sm leading-relaxed text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//         />

//         {/* file count badge (inline) */}
//         {pending.length > 0 && (
//           <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-500">
//             <Check size={9} />
//             {pending.length}
//           </div>
//         )}

//         {/* send button */}
//         <button
//           type="button"
//           onClick={handleSend}
//           disabled={!canSend}
//           className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition-all duration-150 hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
//         >
//           {isLoading ? (
//             <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//           ) : (
//             <Send size={14} className="ml-px" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Image as ImageIcon,
  Paperclip,
  Send,
  X,
  FileText,
  Film,
  Music,
  File,
  Check,
} from "lucide-react";

import { useAppSelector } from "@/app/store";
import { useSendMessageMutation } from "@/app/api/messages/chatApi";

const formatFileSize = (size?: number): string => {
  if (!size || size <= 0) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileIcon = (type: string, name: string) => {
  const t = type.toLowerCase();
  const n = name.toLowerCase();
  if (t.startsWith("video/") || /\.(mp4|mov|avi|webm|mkv)$/.test(n))
    return <Film size={15} className="text-purple-500" />;
  if (t.startsWith("audio/") || /\.(mp3|wav|ogg|flac|aac)$/.test(n))
    return <Music size={15} className="text-pink-500" />;
  if (t === "application/pdf" || n.endsWith(".pdf"))
    return <FileText size={15} className="text-red-500" />;
  return <File size={15} className="text-slate-400" />;
};

const isImage = (file: File) => file.type.startsWith("image/");

interface PendingFile {
  file: File;
  id: string;
  preview?: string;
}

export default function MessageInput() {
  const activeReceiverId = useAppSelector((s) => s.chat.activeReceiverId);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const [text, setText] = useState("");
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
  }, [text]);

  useEffect(
    () => () => {
      pending.forEach((p) => p.preview && URL.revokeObjectURL(p.preview));
    },
    [],
  );

  const wrap = useCallback(
    (f: File): PendingFile => ({
      file: f,
      id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      preview: isImage(f) ? URL.createObjectURL(f) : undefined,
    }),
    [],
  );

  const addFiles = useCallback(
    (list: FileList | File[]) =>
      setPending((p) => [...p, ...Array.from(list).map(wrap)]),
    [wrap],
  );

  const remove = useCallback((id: string) => {
    setPending((p) => {
      const found = p.find((x) => x.id === id);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      return p.filter((x) => x.id !== id);
    });
  }, []);

  const canSend =
    activeReceiverId && !isLoading && (text.trim() || pending.length > 0);

  const handleSend = async () => {
    if (!canSend) return;
    const msg = text.trim();
    const files = pending.map((p) => p.file);
    setText("");
    setPending([]);
    try {
      await sendMessage({
        receiverId: activeReceiverId,
        message: msg,
        attachments: files,
      }).unwrap();
    } catch {
      setText(msg);
      setPending(files.map(wrap));
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const imgs = pending.filter((p) => isImage(p.file));
  const docs = pending.filter((p) => !isImage(p.file));

  return (
    <div
      className="bg-white px-3 py-2  border-gray-200 shrink-0"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {dragOver && (
        <div className="absolute inset-0 z-30 flex items-center justify-center border-2 border-dashed border-indigo-400 bg-indigo-50/80 backdrop-blur-sm outline-2">
          <div className="pointer-events-none text-center">
            <Paperclip
              size={30}
              className="mx-auto mb-1.5 animate-bounce text-indigo-500"
            />
            <p className="text-sm font-semibold text-indigo-600">
              Drop files here
            </p>
          </div>
        </div>
      )}

      <input
        ref={imgInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {imgs.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2 px-1">
          {imgs.map((p) => (
            <div key={p.id} className="group relative h-12 w-12 shrink-0">
              <img
                src={p.preview}
                alt={p.file.name}
                className="h-full w-full rounded-lg border border-gray-200 object-cover shadow-sm"
              />
              <button
                onClick={() => remove(p.id)}
                className="absolute -right-1 -top-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
              >
                <X size={8} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

      {docs.length > 0 && (
        <div className="mb-2 flex flex-col gap-1 px-1">
          {docs.map((p) => (
            <div
              key={p.id}
              className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-100 bg-gray-50">
                {getFileIcon(p.file.type, p.file.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold leading-tight text-gray-700">
                  {p.file.name}
                </p>
                <p className="text-[10px] leading-tight text-gray-400">
                  {formatFileSize(p.file.size)}
                </p>
              </div>
              <button
                onClick={() => remove(p.id)}
                className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1.5 rounded-3xl bg-white px-3 py-2 shadow-sm">
        <button
          type="button"
          disabled={!activeReceiverId}
          onClick={() => imgInputRef.current?.click()}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ImageIcon size={18} />
        </button>
        <button
          type="button"
          disabled={!activeReceiverId}
          onClick={() => fileInputRef.current?.click()}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Paperclip size={18} />
        </button>

        <textarea
          ref={textareaRef}
          value={text}
          rows={1}
          placeholder={activeReceiverId ? "Message" : "Select a chat…"}
          disabled={!activeReceiverId || isLoading}
          className="max-h-[100px] min-h-[20px] flex-1 resize-none bg-transparent px-1 py-0.5 text-sm leading-relaxed text-gray-700 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {pending.length > 0 && (
          <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-500">
            <Check size={9} />
            {pending.length}
          </div>
        )}

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#00A884] text-white shadow-sm transition-all duration-150 hover:bg-[#008F6B] active:scale-95 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Send size={15} />
          )}
        </button>
      </div>
    </div>
  );
}