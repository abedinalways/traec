"use client";
import { ReactNode } from "react";
import ReusableTable from "./ReusableTableForAll";
import { Eye, Check, X } from "lucide-react";

interface ILiveGameRoom {
  id: number;
  roomName: string;
  roomId: string;
  gameType: string;
  entryFee: string;
  players: string;
  status: "waiting" | "in-game";
}
const StatusBadge = ({ status }: { status: "waiting" | "in-game" }) => {
  const styles =
    status === "in-game"
      ? "bg-green-500/20 text-green-400"
      : "bg-yellow-400/20 text-yellow-300";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles}`}
    >
      {status === "in-game" ? "In-Game" : "Waiting"}
    </span>
  );
};

const tableHeader = [
  "No",
  "Room name",
  "Room ID",
  "Game type ",
  "Entry fee",
  "Players",
  "Status",
];

const rowRenderers: ((item: ILiveGameRoom, index: number) => ReactNode)[] = [
  // No
  (_, index) => (
    <span className="text-sm text-[#94a3b8]">
      {String(index + 1).padStart(2, "0")}
    </span>
  ),

  // Room name
  (item) => (
    <span className="text-sm font-medium text-white">{item.roomName}</span>
  ),

  // Room ID
  (item) => <span className="text-sm text-[#cbd5e1]">{item.roomId}</span>,

  // Game type
  (item) => <span className="text-sm text-[#cbd5e1]">{item.gameType}</span>,

  // Entry fee
  (item) => <span className="text-sm text-[#cbd5e1]">{item.entryFee}</span>,

  // Players
  (item) => <span className="text-sm text-[#cbd5e1]">{item.players}</span>,

  // Status
  (item) => <StatusBadge status={item.status} />,
];

const tableData: ILiveGameRoom[] = [
  {
    id: 1,
    roomName: "Cyber Arena",
    roomId: "#402DJKIUH",
    gameType: "Shooter",
    entryFee: "$10.00",
    players: "8/10",
    status: "waiting",
  },
  {
    id: 2,
    roomName: "Titanfall Delta",
    roomId: "#11024KH487",
    gameType: "Racing",
    entryFee: "$10.00",
    players: "9/10",
    status: "in-game",
  },
  {
    id: 3,
    roomName: "Sniper Elite 1v1",
    roomId: "#11024hasja8",
    gameType: "Racing",
    entryFee: "$10.00",
    players: "11/15",
    status: "waiting",
  },
];

const LiveGamesRoomTable = () => {
  return (
    <div
      className="
        w-full
        rounded-[12px]
        border border-[#26344b]
        bg-[#111b23]
        pt-1 pb-2
      "
    >
      {/* Top bar (Pending Withdrawals + View All) */}
      <div className="flex items-center justify-between gap-3 px-[16px] pt-[8px] pb-3 sm:px-5">
        <h3 className="text-[#cbd5e1] text-base sm:text-lg font-medium">
          Live Game Rooms
        </h3>

        <button
          type="button"
          className="text-[#5b5cff] text-sm font-medium hover:opacity-80 transition"
        >
          View All
        </button>
      </div>

      {/* Table (responsive: horizontal scroll) */}
      <div className="w-full overflow-x-auto">
        <ReusableTable<ILiveGameRoom>
          tableHeader={tableHeader}
          items={tableData}
          rowRenderers={rowRenderers}
          getRowKey={(row) => row.id}
          // responsive: only forces scroll when needed (no fixed width)
          minTableWidthPx={860}
          headerCellClassName="
                bg-[#0b151d]
                px-5 py-3
                font-medium
                text-[#94a3b8]
                text-start
                text-xs
                uppercase
                tracking-wide
                border-b border-[#26344b]
            "
          bodyCellClassName="
                px-5 py-4
                text-start
                border-b border-[#26344b]
            "
        />
      </div>
    </div>
  );
};

export default LiveGamesRoomTable;
