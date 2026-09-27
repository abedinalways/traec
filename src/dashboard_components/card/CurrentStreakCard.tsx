// "use client";

// import { Flame } from "lucide-react";
// import { cn } from "@/lib/utils";
// // import { getMaxWinStreak } from "@/src/lib/helper/getMaxWinStreak";

// type MatchResult = "win" | "loss";

// type CurrentStreakCardProps = {
//     history: MatchResult[];
// };

// export default function CurrentStreakCard({ history }: CurrentStreakCardProps) {
//     const winCount = getMaxWinStreak(history);
//     return (
//         <section
//             className="
//                 w-full
//                 rounded-2xl
//                 border border-[#26344B]
//                 bg-[#111B23]
//                 px-4 py-5
//                 flex flex-col
//                 gap-4
//             "
//         >
//             {/* Header */}
//             <div className="flex items-center gap-2 text-white">
//                 <Flame className="h-5 w-5 text-orange-400" />
//                 <h3 className="text-sm font-medium">Current Streak</h3>
//             </div>

//             {/* Win text */}
//             <div className="flex flex-col gap-1">
//                 <span className="text-3xl font-semibold text-[#5B5BFF]">
//                     {winCount} Wins
//                 </span>
//                 <p className="text-sm text-white/50">
//                     Keep the momentum going!
//                 </p>
//             </div>

//             {/* Vertical Bars */}
//             <div className="flex items-end gap-1.5">
//                 {history.map((result, index) => (
//                     <span
//                         key={index}
//                         className={cn(
//                             "w-1.5 rounded-sm",
//                             result === "win"
//                                 ? "bg-[#5B5BFF]"
//                                 : "bg-white/30"
//                         )}
//                         style={{
//                             height: "24px", // ✅ SAME HEIGHT FOR ALL
//                         }}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// }
