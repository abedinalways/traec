"use client";
import { ReactNode } from "react";
import ReusableTable from "./ReusableTableForAll";
interface IRecentGame {
  id: number;
  gameName: string;
  room: string;
  outcome: "victory" | "defeat";
  entryFee: number;
  profit: number;
  currency: string;
  date: string;
  time: string;
}

const OutcomeBadge = ({ outcome }: { outcome: IRecentGame["outcome"] }) => {
  const styles =
    outcome === "victory"
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";

  return (
    <span
      className={`inline-flex rounded-full px-4 py-1 text-xs font-medium ${styles}`}
    >
      {outcome === "victory" ? "VICTORY" : "DEFEAT"}
    </span>
  );
};

const tableData: IRecentGame[] = [
  {
    id: 1,
    gameName: "Neo Tokyo Deathmatch",
    room: "HighStakes_01",
    outcome: "victory",
    entryFee: 10,
    profit: 0.05,
    currency: "TRX",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 2,
    gameName: "Space Station FFA",
    room: "Casual_22",
    outcome: "victory",
    entryFee: 10,
    profit: 0,
    currency: "TRX",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 3,
    gameName: "Desert Storm CTF",
    room: "Casual_20",
    outcome: "defeat",
    entryFee: 10,
    profit: 0.05,
    currency: "TRX",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 4,
    gameName: "Tokyo Deathmatch",
    room: "HighStakes_01",
    outcome: "victory",
    entryFee: 10,
    profit: 0.05,
    currency: "TRX",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 5,
    gameName: "Cyber Alley 2v2",
    room: "HighStakes_01",
    outcome: "defeat",
    entryFee: 10,
    profit: -0.01,
    currency: "TRX",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
];

const RecentPlayedGamesTable = () => {
  const tableHeader = [
    "No",
    "Game Info",
    "Outcome",
    "Entry Fee (USDT)",
    "Profit / Loss",
    "Timestamp",
  ];
  const rowRenderers: ((item: IRecentGame, index: number) => ReactNode)[] = [
    // No
    (_, index) => (
      <span className="text-sm text-[#94a3b8]">
        {String(index + 1).padStart(2, "0")}
      </span>
    ),

    // Game info
    (item) => (
      <div className="min-w-0">
        <div className="text-sm font-medium text-white truncate">
          {item.gameName}
        </div>
        <div className="text-xs text-[#94a3b8]">Room: {item.room}</div>
      </div>
    ),

    // Outcome
    (item) => <OutcomeBadge outcome={item.outcome} />,

    // Entry Fee
    (item) => (
      <span className="flex items-center gap-1 text-sm text-[#eab308]">
        💰 {item.entryFee.toFixed(2)}
      </span>
    ),

    // Profit / Loss
    (item) => {
      const isProfit = item.profit > 0;
      return (
        <span
          className={`text-sm font-medium ${
            isProfit ? "text-green-400" : "text-red-400"
          }`}
        >
          {isProfit ? "+" : ""}
          {item.profit.toFixed(2)} {item.currency}
        </span>
      );
    },

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
          Recent Games You Played
        </h3>

        <button className="text-[#5b5cff] text-sm hover:opacity-80">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        {/* <ReusableTable<IRecentGame>
          tableHeader={tableHeader}
          items={tableData}
          rowRenderers={rowRenderers}
          getRowKey={(row) => row.id}
          minTableWidthPx={900}
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

export default RecentPlayedGamesTable;
