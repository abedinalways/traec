"use client";

import { ReactNode } from "react";
import ReusableTable from "./ReusableTableForAll";

export type TransactionType = "Prize" | "Withdraw" | "Entry Fee" | "Deposit";
export type TransactionStatus = "Completed" | "Pending" | "Rejected";
import { ArrowDown, ArrowUp, Trophy } from "lucide-react";

interface IWalletHistory {
  id: number;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  transactionId: string;
  timestamp: string;
}

const tableHeader = [
  "No",
  "TYPE",
  "AMOUNT",
  "STATUS",
  "TRANSACTION ID",
  "TIMESTAMP",
];

const TypeCell = ({ type }: { type: TransactionType }) => {
  const isPositive = type === "Prize" || type === "Deposit";

  const icon =
    type === "Prize" ? (
      <Trophy className="w-4 h-4 text-yellow-400" />
    ) : isPositive ? (
      <ArrowDown className="w-4 h-4 text-green-400" />
    ) : (
      <ArrowUp className="w-4 h-4 text-red-400" />
    );

  const bg =
    type === "Prize"
      ? "bg-yellow-900/30"
      : isPositive
        ? "bg-green-900/30"
        : "bg-red-900/30";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${bg}`}
      >
        {icon}
      </div>
      <span className="text-sm text-white">{type}</span>
    </div>
  );
};

const tableData: IWalletHistory[] = [
  {
    id: 1,
    type: "Prize",
    amount: 125,
    status: "Completed",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 2,
    type: "Withdraw",
    amount: -200,
    status: "Pending",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 3,
    type: "Entry Fee",
    amount: -20,
    status: "Completed",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 4,
    type: "Prize",
    amount: 500,
    status: "Completed",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 5,
    type: "Deposit",
    amount: 500,
    status: "Pending",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 6,
    type: "Withdraw",
    amount: -200,
    status: "Rejected",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 7,
    type: "Entry Fee",
    amount: -20,
    status: "Completed",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 8,
    type: "Prize",
    amount: 500,
    status: "Completed",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 9,
    type: "Deposit",
    amount: 500,
    status: "Pending",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 10,
    type: "Withdraw",
    amount: -200,
    status: "Rejected",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
];

export default function WalletHistoryTable() {
  const rowRenderers: ((item: IWalletHistory, index: number) => ReactNode)[] = [
    (_, index) => (
      <span className="text-sm text-[#94a3b8]">
        {String(index + 1).padStart(2, "0")}
      </span>
    ),

    (item) => <TypeCell type={item.type} />,

    (item) => (
      <span
        className={`text-sm font-semibold ${
          item.amount >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {item.amount >= 0 ? "+" : ""}
        {item.amount.toFixed(2)}
      </span>
    ),

    (item) => <StatusBadge status={item.status} />,

    (item) => (
      <span className="text-xs bg-[#1e293b] px-3 py-1 rounded-md text-[#94a3b8]">
        {item.transactionId}
      </span>
    ),

    (item) => (
      <div className="flex flex-col">
        <span className="text-sm text-white">Dec 12, 2025</span>
        <span className="text-xs text-[#64748b]">12:30 PM</span>
      </div>
    ),
  ];

  return (
    <>
      <div className="w-full overflow-x-auto">
        <ReusableTable<IWalletHistory>
          tableHeader={tableHeader}
          items={tableData}
          rowRenderers={rowRenderers}
          getRowKey={(row) => row.id}
          minTableWidthPx={1000}
          headerCellClassName="bg-[#0b151d] px-6 py-4 text-xs font-medium uppercase tracking-wide text-[#94a3b8] border-b border-[#26344b] text-start"
          bodyCellClassName="px-6 py-4 border-b border-[#1f2a37] text-start hover:bg-[#0f1c26] transition"
        />
      </div>
    </>
  );
}

const StatusBadge = ({ status }: { status: TransactionStatus }) => {
  const styles = {
    Completed: "bg-green-900/40 text-green-400",
    Pending: "bg-yellow-900/40 text-yellow-400",
    Rejected: "bg-red-900/40 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};
