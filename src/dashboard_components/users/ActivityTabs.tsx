// "use client";

// import { useState } from "react";
// import clsx from "clsx";
// import { TabType } from "../usermanagement/UserManagementLayout";
// import { Transactions } from "./Transactions";
// import { Matches } from "./Matches";

// export default function ActivityTabs() {
//     const [activeTab, setActiveTab] = useState<TabType>("transactions");

//     return (
//         <div className="space-y-4">
//             {/* Tabs */}
//             <div className="flex border-b border-white/10 text-sm">
//                 <button
//                     onClick={() => setActiveTab("transactions")}
//                     className={clsx(
//                         "flex-1 py-2 transition",
//                         activeTab === "transactions"
//                             ? "text-gray-500 dark:text-white border-b-2 border-brand-500"
//                             : "text-gray-400  dark:hover:text-white"
//                     )}
//                 >
//                     Transactions
//                 </button>

//                 <button
//                     onClick={() => setActiveTab("matches")}
//                     className={clsx(
//                         "flex-1 py-2 transition",
//                         activeTab === "matches"
//                             ? " text-gray-600 dark:text-white border-b-2 border-brand-500"
//                             : "text-gray-400 dark:hover:text-white"
//                     )}
//                 >
//                     Matches
//                 </button>
//             </div>

//             {/* Content */}
//             {activeTab === "transactions" ? (
//                 <Transactions />
//             ) : (
//                 <Matches />
//             )}
//         </div>
//     );
// }
