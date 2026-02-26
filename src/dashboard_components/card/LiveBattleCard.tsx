// "use client";

// import { BallIcon, EyeIconSvg } from "@/src/icons";
// import { Eye } from "lucide-react";
// import Image from "next/image";

// type LiveBattleCardProps = {
//     image: string;
//     category: string;
//     category2: string;
//     title: string;
//     host: string;
//     viewers: string;
// };

// export default function LiveBattleCard({
//     image,
//     category,
//     category2,
//     title,
//     host,
//     viewers,
// }: LiveBattleCardProps) {
//     return (
//         <section className="relative w-full overflow-hidden rounded-xl border border-[#26344B] bg-[#111B23]">
//             {/* Background image */}
//             <div className="absolute inset-0">
//                 <Image
//                     src={image}
//                     alt={title}
//                     fill
//                     priority
//                     className="object-center w-full h-full rounded-xl"
//                 />
//             </div>

//             {/* Content */}
//             <div className="relative z-10 flex h-full flex-col justify-between p-6">
//                 {/* Top bar */}
//                 <div className="flex flex-col w-full">
//                     <div className="flex justify-between items-center gap-2">
//                         <span className="flex items-center gap-1 rounded bg-[#EE162A] px-2 py-1 text-[1.125rem] font-semibold text-white">
//                             <span className="h-2 w-2 rounded-full bg-white" />
//                             Live
//                         </span>

//                         <span className="flex items-center gap-1 rounded bg-black border border-gray-600 px-2 py-1 text-[1rem] text-[#C1C2C5]">
//                             <EyeIconSvg/>  
//                             {viewers}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Bottom content */}
//                 <div className="mt-16 flex flex-col gap-3">
//                     <div className="flex gap-2 ">
//                         <span className={`inline-flex w-fit rounded-full  ${category === "SHOOTER" ? "border border-[#5952FF99] bg-[#5952FF33] text-[#5952FF]" : " border border-[#F6731899] bg-[#F6731833] text-[#F67318]"  } px-3 py-1 text-xs font-medium `}>
//                             {category}
//                         </span>
//                         <span className="text-[0.875rem] text-[#E9E9EA]">
//                             {category2}
//                         </span>
//                     </div>
//                     <h3 className="text-xl font-bold leading-snug text-white">
//                         {title}
//                     </h3>
//                     <p className="text-[0.875rem] flex items-center text-[#E9E9EA]">
//                         <BallIcon /> <span className="ml-2">{host} </span> 
//                     </p>
//                 </div>
//             </div>
//         </section>
//     );
// }
