"use client";

import { ReactNode } from "react";
import ReusableTable from "./ReusableTableForAll";

export type MatchOutcome = "VICTORY" | "DEFEAT";

interface IMatchHistory {
  id: number;
  gameName: string;
  roomName: string;
  outcome: MatchOutcome;
  entryFee: number;
  currency: string;
  transactionId: string;
  profitLoss: number;
  timestamp: string;
}

const tableHeader = [
  "No",
  "GAME INFO",
  "OUTCOME",
  "ENTRY FEE",
  "TRANSACTION ID",
  "PROFIT / LOSS",
  "TIMESTAMP",
];

const tableData: IMatchHistory[] = [
  {
    id: 1,
    gameName: "Neo Tokyo Deathmatch",
    roomName: "Room: HighStakes_01",
    outcome: "VICTORY",
    entryFee: 12.5,
    currency: "USD",
    transactionId: "0x7f5a7f5as6749c2d",
    profitLoss: 0.05,
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 2,
    gameName: "Desert Storm CTF",
    roomName: "Room: Casual_20",
    outcome: "DEFEAT",
    entryFee: 12.5,
    currency: "USD",
    transactionId: "0x3c7e2324fg538a9b",
    profitLoss: -0.05,
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 3,
    gameName: "Neo Tokyo Deathmatch",
    roomName: "Room: HighStakes_01",
    outcome: "VICTORY",
    entryFee: 12.5,
    currency: "USD",
    transactionId: "0x7f5a7f5as6749c2d",
    profitLoss: 0.05,
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 4,
    gameName: "Desert Storm CTF",
    roomName: "Room: Casual_20",
    outcome: "DEFEAT",
    entryFee: 12.5,
    currency: "USD",
    transactionId: "0x3c7e2324fg538a9b",
    profitLoss: -0.05,
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 5,
    gameName: "Neo Tokyo Deathmatch",
    roomName: "Room: HighStakes_01",
    outcome: "VICTORY",
    entryFee: 12.5,
    currency: "USD",
    transactionId: "0x7f5a7f5as6749c2d",
    profitLoss: 0.05,
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
  {
    id: 6,
    gameName: "Desert Storm CTF",
    roomName: "Room: Casual_20",
    outcome: "DEFEAT",
    entryFee: 12.5,
    currency: "USD",
    transactionId: "0x3c7e2324fg538a9b",
    profitLoss: -0.05,
    timestamp: "Dec 12, 2025 • 12:30 PM",
  },
];

export default function MatchHistoryTable() {
  const rowRenderers: ((item: IMatchHistory, index: number) => ReactNode)[] = [
    (_, index) => (
      <span className="text-sm text-[#94a3b8]">
        {String(index + 1).padStart(2, "0")}
      </span>
    ),

    (item) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">{item.gameName}</span>
        <span className="text-xs text-[#64748b]">{item.roomName}</span>
      </div>
    ),

    (item) => <OutcomeBadge outcome={item.outcome} />,

    (item) => (
      <span className="text-sm font-medium text-yellow-400">
        💰 {item.entryFee.toFixed(2)} {item.currency}
      </span>
    ),

    (item) => (
      <span className="text-xs bg-[#1e293b] px-3 py-1 rounded-md text-[#94a3b8]">
        {item.transactionId}
      </span>
    ),

    (item) => (
      <span
        className={`text-sm font-semibold ${
          item.profitLoss >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {item.profitLoss >= 0 ? "+" : ""}
        {item.profitLoss} TRX
      </span>
    ),

    (item) => <span className="text-xs text-[#94a3b8]">{item.timestamp}</span>,
  ];

  return (
    <>
      <div className="w-full overflow-x-auto">
        {/* <ReusableTable<IMatchHistory>
          tableHeader={tableHeader}
          items={tableData}
          rowRenderers={rowRenderers}
          getRowKey={(row) => row.id}
          minTableWidthPx={1100}
          headerCellClassName="bg-[#0b151d] px-6 py-4 text-xs font-medium uppercase tracking-wide text-[#94a3b8] border-b border-[#26344b] text-start"
          bodyCellClassName="px-6 py-4 border-b border-[#1f2a37] text-start hover:bg-[#0f1c26] transition"
        /> */}
      </div>
    </>
  );
}

const OutcomeBadge = ({ outcome }: { outcome: MatchOutcome }) => {
  const isVictory = outcome === "VICTORY";

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        isVictory
          ? "bg-green-900/40 text-green-400"
          : "bg-red-900/40 text-red-400"
      }`}
    >
      {outcome}
    </span>
  );
};
