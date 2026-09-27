"use client";
import { ReactNode } from "react";
import ReusableTable from "./ReusableTableForAll";
const tableData: IWalletActivity[] = [
  {
    id: 1,
    type: "Prize",
    amount: 125,
    currency: "USDT",
    status: "completed",
    txId: "0x7f3a...9c2d",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: -200,
    currency: "USDT",
    status: "pending",
    txId: "0x9a1b...4e5f",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 3,
    type: "Deposit",
    amount: -500,
    currency: "USDT",
    status: "rejected",
    txId: "0x3c7e...8a9b",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 4,
    type: "Game Fee",
    amount: -20,
    currency: "USDT",
    status: "completed",
    txId: "0x8e4b...2d3c",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
];
interface IWalletActivity {
  id: number;
  type: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "rejected";
  txId: string;
  date: string;
  time: string;
}

const StatusBadge = ({ status }: { status: IWalletActivity["status"] }) => {
  const styles = {
    completed: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-400/20 text-yellow-300",
    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RecentWalletActivityTable = () => {
  const tableHeader = [
    "No",
    "Type",
    "Amount",
    "Status",
    "Transaction ID",
    "Timestamp",
  ];
  const rowRenderers: ((item: IWalletActivity, index: number) => ReactNode)[] =
    [
      // No
      (_, index) => (
        <span className="text-sm text-[#94a3b8]">
          {String(index + 1).padStart(2, "0")}
        </span>
      ),

      // Type
      (item) => (
        <span className="text-sm text-white font-medium">{item.type}</span>
      ),

      // Amount
      (item) => {
        const isPositive = item.amount > 0;
        return (
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {item.amount.toFixed(2)} {item.currency}
          </span>
        );
      },

      // Status
      (item) => <StatusBadge status={item.status} />,

      // Transaction ID (pill)
      (item) => (
        <span className="inline-flex rounded-md bg-[#1b2733] px-3 py-1 text-xs text-[#94a3b8]">
          {item.txId}
        </span>
      ),

      // Timestamp
      (item) => (
        <div className="text-sm text-[#cbd5e1]">
          <div>{item.date}</div>
          <div className="text-xs text-[#94a3b8]">{item.time}</div>
        </div>
      ),
    ];

  return (
    <div className="w-full rounded-xl border border-[#26344b] bg-[#111b23] pt-1 pb-2">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-5">
        <h3 className="text-[#cbd5e1] text-base font-medium">
          Recent wallet Activity
        </h3>

        <button className="text-[#5b5cff] text-sm hover:opacity-80">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        {/* <ReusableTable<IWalletActivity>
          tableHeader={tableHeader}
          items={tableData}
          rowRenderers={rowRenderers}
          getRowKey={(row) => row.id}
          minTableWidthPx={860}
          headerCellClassName="
                        bg-[#0b151d]
                        px-5 py-3
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-[#94a3b8]
                        border-b border-[#26344b]
                    "
          bodyCellClassName="
                        px-5 py-4
                        border-b border-[#26344b]
                        text-start
                    "
        /> */}
      </div>
    </div>
  );
};

export default RecentWalletActivityTable;
