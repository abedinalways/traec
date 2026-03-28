"use client";

import React from "react";
import ReusableTableForAll, { Column } from "./ReusableTableForAll";
import { Trophy, ArrowDown, ArrowUp } from "lucide-react";

interface FinancialRow {
  id: number;
  userName: string;
  userAvatar?: string;
  type: "Prize Payout" | "Deposit" | "Entry Fee" | "Withdraw";
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  transactionId: string;
  timestamp: string;
  time: string;
}

const tableData: FinancialRow[] = [
  {
    id: 1,
    userName: "Wade Warren",
    type: "Prize Payout",
    amount: 125.0,
    status: "Completed",
    transactionId: "0x7f3a...9c2d",
    timestamp: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 2,
    userName: "Brooklyn Simmons",
    type: "Deposit",
    amount: 500.0,
    status: "Completed",
    transactionId: "0x8a4b...1d3e",
    timestamp: "Dec 12, 2025",
    time: "11:45 AM",
  },
  {
    id: 3,
    userName: "Robert Fox",
    type: "Entry Fee",
    amount: -200.0,
    status: "Completed",
    transactionId: "0x9c5d...2f4a",
    timestamp: "Dec 12, 2025",
    time: "10:20 AM",
  },
  {
    id: 4,
    userName: "Jane Cooper",
    type: "Prize Payout",
    amount: 75.5,
    status: "Pending",
    transactionId: "0x3e6f...7a8b",
    timestamp: "Dec 11, 2025",
    time: "09:15 PM",
  },
  {
    id: 5,
    userName: "Cameron Williamson",
    type: "Withdraw",
    amount: -300.0,
    status: "Pending",
    transactionId: "0x2d5c...9e1f",
    timestamp: "Dec 11, 2025",
    time: "08:30 AM",
  },
];

const columns: Column<FinancialRow>[] = [
  {
    header: "No",
    render: (_: FinancialRow, index?: number) => (
      <span className="text-gray-500 text-sm">
        {String((index ?? 0) + 1).padStart(2, "0")}
      </span>
    ),
    className:
      "px-5 py-3 font-medium text-gray-400 text-start text-xs uppercase tracking-wide",
  },
  {
    header: "USER",
    render: (item: FinancialRow) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
          <span className="text-xs text-gray-400 font-medium">
            {item.userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-white text-sm font-medium">{item.userName}</span>
      </div>
    ),
    className: "px-5 py-3",
  },
  {
    header: "TYPE",
    render: (item: FinancialRow) => {
      const getTypeIcon = () => {
        switch (item.type) {
          case "Prize Payout":
            return <Trophy className="w-4 h-4 text-yellow-400" />;
          case "Deposit":
            return <ArrowDown className="w-4 h-4 text-green-400" />;
          case "Entry Fee":
          case "Withdraw":
            return <ArrowUp className="w-4 h-4 text-red-400" />;
          default:
            return null;
        }
      };

      return (
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <span className="text-gray-300 text-sm">{item.type}</span>
        </div>
      );
    },
  },
  {
    header: "AMOUNT",
    render: (item: FinancialRow) => {
      const isPositive = item.amount >= 0;
      const sign = isPositive ? "+" : "";
      return (
        <span
          className={`text-sm font-medium ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {sign}
          {item.amount.toFixed(2)}
        </span>
      );
    },
  },
  {
    header: "STATUS",
    render: (item: FinancialRow) => {
      const statusStyles = {
        Completed: "bg-green-500/20 border-green-500/30 text-white",
        Pending: "bg-yellow-500/20 border-yellow-500/30 text-white",
        Failed: "bg-red-500/20 border-red-500/30 text-white",
      };
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[item.status]}`}
        >
          {item.status}
        </span>
      );
    },
  },
  {
    header: "TRANSACTION ID",
    render: (item: FinancialRow) => (
      <span className="text-gray-400 text-sm font-mono">
        {item.transactionId}
      </span>
    ),
  },
  {
    header: "TIMESTAMP",
    render: (item: FinancialRow) => (
      <div className="text-sm text-gray-400">
        <div>{item.timestamp}</div>
        <div className="text-xs">{item.time}</div>
      </div>
    ),
  },
];

const FinancialTable = () => {
  return (
    <ReusableTableForAll<FinancialRow>
      columns={columns}
      data={tableData}
      rowKey={(row) => row.id}
    />
  );
};

export default FinancialTable;
