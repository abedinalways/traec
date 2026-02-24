import { ReactNode } from "react";
import ReusableTable from "./ReusableTable";
import { DollarSign, Users, } from "lucide-react";
import { ShooterIcon, RacingIcon, WaitingIcon, ActiveIcon } from "@/src/icons";

interface GamesRoomRow {
    id: number;
    roomName: string;
    roomId: string;
    gameType: "SHOOTER" | "RACING";
    entryFee: string;
    playersCurrent: number;
    playersTotal: number;
    status: "Active" | "Waiting" | "FULL";
    createdDate: string;
    createdTime: string;
}

const tableHeader = ["No", "ROOM NAME", "ROOM ID", "GAME TYPE", "ENTRY FEE", "PLAYERS", "STATUS", "CREATED"];

const rowRenderers: ((item: GamesRoomRow, index: number) => ReactNode)[] = [
    // No
    (_, index) => (
        <span className="text-gray-500 text-sm">
            {String(index + 1).padStart(2, "0")}
        </span>
    ),
    // Room Name
    (item) => (
        <span className="text-white text-sm font-medium">{item.roomName}</span>
    ),
    // Room ID
    (item) => (
        <span className="text-gray-400 text-sm">#{item.roomId}</span>
    ),
    // Game Type
    (item) => (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white uppercase"
            style={
                item.gameType === "SHOOTER"
                    ? {
                        background:
                            "linear-gradient(47deg, rgba(89, 82, 255, 0.6) 0%, rgba(31, 68, 249, 0.2) 100%)",
                    }
                    : {
                        background:
                            "linear-gradient(47deg, rgba(230, 122, 0, 0.8) 0%, rgba(196, 62, 0, 0.5) 100%)",
                    }
            }
        >
            {item.gameType === "SHOOTER" ? (
                <ShooterIcon className="w-3 h-3" />
            ) : (
                <RacingIcon className="w-3 h-3" />
            )}
            {item.gameType}
        </span>
    ),
    // Entry Fee
    (item) => (
        <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">
                {item.entryFee} USD
            </span>
        </div>
    ),
    // Players
    (item) => (
        <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">
                {item.playersCurrent}/{item.playersTotal}
            </span>
        </div>
    ),
    // Status
    (item) => {
        if (item.status === "Waiting") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white bg-yellow-500/20 border border-yellow-500/30">
                    <WaitingIcon/> 
                    Waiting
                </span>
            );
        }
        if (item.status === "Active") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white bg-green-500/20 border border-green-500/30">
                    <ActiveIcon/>
                    Active
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white bg-blue-600/20 border border-blue-600/30">
                FULL
            </span>
        );
    },
    // Created
    (item) => (
        <div className="text-sm text-gray-400">
            <div>{item.createdDate}</div>
            <div className="text-xs">{item.createdTime}</div>
        </div>
    ),
];

const tableData: GamesRoomRow[] = [
    {
        id: 1,
        roomName: "Deathmatch Zone",
        roomId: "004125",
        gameType: "SHOOTER",
        entryFee: "12.50",
        playersCurrent: 8,
        playersTotal: 12,
        status: "Waiting",
        createdDate: "Dec 12, 2025",
        createdTime: "12:30 PM",
    },
    {
        id: 2,
        roomName: "Speed Demons Arena",
        roomId: "004126",
        gameType: "RACING",
        entryFee: "25.00",
        playersCurrent: 10,
        playersTotal: 10,
        status: "FULL",
        createdDate: "Dec 11, 2025",
        createdTime: "10:15 AM",
    },
    {
        id: 3,
        roomName: "Battle Royale",
        roomId: "004127",
        gameType: "SHOOTER",
        entryFee: "15.75",
        playersCurrent: 5,
        playersTotal: 8,
        status: "Active",
        createdDate: "Dec 10, 2025",
        createdTime: "03:45 PM",
    },
    {
        id: 4,
        roomName: "Racing Championship",
        roomId: "004128",
        gameType: "RACING",
        entryFee: "30.00",
        playersCurrent: 6,
        playersTotal: 8,
        status: "Active",
        createdDate: "Dec 9, 2025",
        createdTime: "09:20 AM",
    },
    {
        id: 5,
        roomName: "Sniper Elite",
        roomId: "004129",
        gameType: "SHOOTER",
        entryFee: "20.00",
        playersCurrent: 3,
        playersTotal: 6,
        status: "Waiting",
        createdDate: "Dec 8, 2025",
        createdTime: "11:00 AM",
    },
    {
        id: 6,
        roomName: "Sniper Elite",
        roomId: "004129",
        gameType: "SHOOTER",
        entryFee: "20.00",
        playersCurrent: 3,
        playersTotal: 6,
        status: "Waiting",
        createdDate: "Dec 8, 2025",
        createdTime: "11:00 AM",
    },
    {
        id: 7,
        roomName: "Sniper Elite",
        roomId: "004129",
        gameType: "SHOOTER",
        entryFee: "20.00",
        playersCurrent: 3,
        playersTotal: 6,
        status: "Waiting",
        createdDate: "Dec 8, 2025",
        createdTime: "11:00 AM",
    },
];

const GamesRoomTable = () => {
    return (
        <ReusableTable<GamesRoomRow>
            tableHeader={tableHeader}
            items={tableData}
            rowRenderers={rowRenderers}
            getRowKey={(row) => row.id}
            minTableWidthPx={1200}
            headerCellClassName="px-5 py-3 font-medium text-gray-400 text-start text-xs uppercase tracking-wide"
            bodyCellClassName="px-5 py-4 text-start"
        />
    );
};

export default GamesRoomTable;