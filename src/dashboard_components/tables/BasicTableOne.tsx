// "use client";

// import { ReactNode } from "react";
// import ReusableTable from "./ReusableTableForAll";
// import Badge from "../ui/badge/Badge";
// import { useRouter } from "next/navigation";

// interface UserRow {
//   id: number;
//   username: string;
//   uid: string;
//   winRate: string;
//   status: "Active" | "Suspended" | "Disabled";
//   spent: string;
//   withdraw: string;
// }

// const tableData: UserRow[] = [
//   {
//     id: 1,
//     username: "Cryptoknight",
//     uid: "88932",
//     winRate: "67.8%",
//     status: "Active",
//     spent: "450.00",
//     withdraw: "850.00",
//   },
//   {
//     id: 2,
//     username: "PlayerOne",
//     uid: "88932",
//     winRate: "72.12%",
//     status: "Active",
//     spent: "50.00",
//     withdraw: "650.00",
//   },
//   {
//     id: 3,
//     username: "Player001",
//     uid: "88932",
//     winRate: "32.98%",
//     status: "Active",
//     spent: "0.00",
//     withdraw: "0.00",
//   },
//   {
//     id: 4,
//     username: "MetaGamer",
//     uid: "88932",
//     winRate: "32.98%",
//     status: "Active",
//     spent: "120.00",
//     withdraw: "1120.00",
//   },
//   {
//     id: 5,
//     username: "ProGamer",
//     uid: "88932",
//     winRate: "45.34%",
//     status: "Suspended",
//     spent: "450.00",
//     withdraw: "750.00",
//   },
//   {
//     id: 6,
//     username: "NinjaGamer",
//     uid: "88932",
//     winRate: "12.4%",
//     status: "Disabled",
//     spent: "50.00",
//     withdraw: "20.00",
//   },
//   {
//     id: 7,
//     username: "Player001",
//     uid: "88932",
//     winRate: "32.98%",
//     status: "Active",
//     spent: "0.00",
//     withdraw: "0.00",
//   },
//   {
//     id: 8,
//     username: "MetaGamer",
//     uid: "88932",
//     winRate: "32.98%",
//     status: "Active",
//     spent: "120.00",
//     withdraw: "1120.00",
//   },
//   {
//     id: 9,
//     username: "ProGamer",
//     uid: "88932",
//     winRate: "45.34%",
//     status: "Suspended",
//     spent: "450.00",
//     withdraw: "750.00",
//   },
//   {
//     id: 10,
//     username: "NinjaGamer",
//     uid: "88932",
//     winRate: "12.4%",
//     status: "Disabled",
//     spent: "50.00",
//     withdraw: "20.00",
//   },
// ];

// export default function BasicTableOne() {
//   const router = useRouter();
//   const tableHeader = ["No", "User", "Win Rate", "Status", "Spent", "Withdraw"];

//   const rowRenderers: ((item: UserRow, index: number) => ReactNode)[] = [
//     // No
//     (_, index) => (
//       <span className="text-gray-500">
//         {String(index + 1).padStart(2, "0")}
//       </span>
//     ),

//     // User
//     (item) => (
//       <div>
//         <p className="font-medium text-white">{item.username}</p>
//         <p className="text-xs text-gray-500">ID: {item.uid}</p>
//       </div>
//     ),

//     // Win Rate
//     (item) => <span>{item.winRate}</span>,

//     (item) => (
//       <Badge
//         size="sm"
//         color={
//           item.status === "Active"
//             ? "success"
//             : item.status === "Suspended"
//               ? "error"
//               : "light"
//         }
//       >
//         {item.status}
//       </Badge>
//     ),

//     // Spent
//     (item) => <span>${item.spent}</span>,

//     // Withdraw
//     (item) => <span>${item.withdraw}</span>,
//   ];

//   return (
//     <ReusableTable<UserRow>
//       tableHeader={tableHeader}
//       items={tableData}
//       rowRenderers={rowRenderers}
//       getRowKey={(row) => row.id}
//       onRowClick={(row) => {
//         router.push(`?userId=${row.id}`);
//       }}
//       minTableWidthPx={1000}
//     />
//   );
// }
