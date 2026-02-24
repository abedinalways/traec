"use client";

import { ReactNode, useState } from "react";
import ReusableTable from "./ReusableTable";
import { Users } from "lucide-react";
import { ActionButton } from "../common/ActionButton";
import { GameTypeBadge } from "../common/GameTypeBadge";
import { StatusBadge } from "../common/StatusBadge";
import { useModal } from "@/src/hooks/useModal";
import GameDetailsModal from "../user/live/GameDetailsModall";

export type RoomStatus = "Waiting" | "In-Game" | "Active" | "FULL";
export type GameType = "SHOOTER" | "RACING";

interface ICompetitiveRoomRow {
    id: number;
    roomName: string;
    roomId: string;
    gameType: GameType;
    entryFee: number;
    currency: string;
    playersCurrent: number;
    playersTotal: number;
    status: RoomStatus;
    joined: boolean;

}


const tableHeader = ["No", "ROOM NAME", "ROOM ID", "GAME TYPE", "ENTRY FEE", "PLAYERS", "STATUS", "ACTION"];


const tableData: ICompetitiveRoomRow[] = [
    { id: 1, roomName: "Deathmatch Zone", roomId: "004125", gameType: "RACING", entryFee: 12.5, currency: "USD", playersCurrent: 8, playersTotal: 12, status: "Waiting", joined: false },
    { id: 2, roomName: "Speed Demons Arena", roomId: "004124", gameType: "SHOOTER", entryFee: 10.5, currency: "USD", playersCurrent: 6, playersTotal: 12, status: "In-Game", joined: true },
    { id: 3, roomName: "Racing Arena", roomId: "004123", gameType: "SHOOTER", entryFee: 5.0, currency: "USD", playersCurrent: 10, playersTotal: 12, status: "Waiting", joined: false },
    { id: 4, roomName: "Sniper Elite", roomId: "004122", gameType: "RACING", entryFee: 10.0, currency: "USD", playersCurrent: 8, playersTotal: 10, status: "Active", joined: false },
    { id: 5, roomName: "Elite Shootout", roomId: "004123", gameType: "SHOOTER", entryFee: 10.2, currency: "USD", playersCurrent: 9, playersTotal: 10, status: "FULL", joined: true },
    { id: 6, roomName: "Elite Speed", roomId: "004123", gameType: "RACING", entryFee: 10.2, currency: "USD", playersCurrent: 10, playersTotal: 10, status: "FULL", joined: true },
];

export default function CompitiveRoomTable() {
    const { isOpen: isGameDetilsModalOpen, openModal: openGameDetailsModal, closeModal: closeGameDetailsModal } = useModal();
    const [selectedRoomId, setSelectedRoomId] = useState<number>(0);

    const gameDetailsHandler = (roomId: number) => {
        setSelectedRoomId(roomId);
        openGameDetailsModal();
    };
    const rowRenderers: ((item: ICompetitiveRoomRow, index: number) => ReactNode)[] = [
        (_, index) => <span className="text-sm text-[#94a3b8]">{String(index + 1).padStart(2, "0")}</span>,

        (item) => <span className="text-sm font-medium text-white">{item.roomName}</span>,

        (item) => <span className="text-sm text-[#94a3b8]">GA-{item.roomId}</span>,

        (item) => <GameTypeBadge type={item.gameType} />,

        (item) => (
            <span className="text-sm font-medium text-yellow-300">
                💰 {item.entryFee.toFixed(2)} {item.currency}
            </span>
        ),

        (item) => (
            <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-[#6EA8FF]" />
                <span className="text-sm text-[#6EA8FF]">{item.playersCurrent}/{item.playersTotal}</span>
            </div>
        ),

        (item) => <StatusBadge status={item.status} />,

        (item) => <ActionButton
            onJoinRoom={() => gameDetailsHandler(item.id)}
            joined={item.joined}
            status={item.status}
        />,
    ];

    return (
        <>
            <div className="w-full overflow-x-auto">
                <ReusableTable<ICompetitiveRoomRow>
                    tableHeader={tableHeader}
                    items={tableData}
                    rowRenderers={rowRenderers}
                    getRowKey={(row) => row.id}
                    minTableWidthPx={980}
                    headerCellClassName="bg-[#0b151d] px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#94a3b8] border-b border-[#26344b] text-start"
                    bodyCellClassName="px-5 py-4 border-b border-[#26344b] text-start"
                />
            </div>

            <GameDetailsModal
                isOpen={isGameDetilsModalOpen}
                onClose={closeGameDetailsModal}
                roomId={selectedRoomId}
            
            />

        </>
    );
}


