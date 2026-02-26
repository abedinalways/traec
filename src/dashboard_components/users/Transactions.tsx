// import { DepositeIcon, WithdrawIcon } from "@/src/icons";
// import clsx from "clsx";

// export function Transactions() {
//     const data = [
//         { type: "Withdraw", date: "Dec 12, 2025", amount: "- 1.05 TRX", color: "red" },
//         { type: "Deposit", date: "Dec 11, 2025", amount: "+ 20.05 TRX", color: "green" },
//         { type: "Withdraw", date: "Dec 08, 2025", amount: "- 10.01 TRX", color: "red" },
//         { type: "Deposit", date: "Dec 11, 2025", amount: "+ 20.05 TRX", color: "green" },
//         { type: "Withdraw", date: "Dec 08, 2025", amount: "- 10.01 TRX", color: "red" },
//         { type: "Withdraw", date: "Dec 12, 2025", amount: "- 1.05 TRX", color: "red" },
//         { type: "Deposit", date: "Dec 11, 2025", amount: "+ 20.05 TRX", color: "green" },
//     ];

//     return (
//         <div className="md:p-4 p-2">
//             <p className="text-xs uppercase text-gray-400">Recent Transactions</p>

//             <div className="max-h-[348px] space-y-3  p-2 overflow-y-scroll custom-scrollbar">
//             {data.map((item, idx) => (
//                 <div
//                     key={idx}
//                     className="flex items-center justify-between rounded-lg bg-gray-200 dark:bg-[#18222A] p-3 "
//                 >
//                     <div className="flex space-x-2">
//                         <div>
//                             {
//                                 item.type === "Withdraw" ? <WithdrawIcon /> :  <DepositeIcon/>
//                             }
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-600 dark:text-white">{item.type}</p>
//                             <p className="text-xs text-gray-400">{item.date}</p>
//                         </div>
//                     </div>
//                     <span
//                         className={clsx(
//                             "text-sm",
//                             item.color === "green" ? "text-green-400" : "text-red-400"
//                         )}
//                     >
//                         {item.amount}
//                     </span>
//                 </div>
//             ))}
//             </div>
//         </div>
//     );
// }
