import { ActiveIcon, WaitingIcon } from "@/src/icons";
import { RoomStatus } from "../tables/CompitiveRoomTable";

export const StatusBadge = ({ status }: { status: RoomStatus }) => {
    if (status === "Waiting") {
        return <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-yellow-500/15 text-yellow-300 border border-yellow-500/25"><WaitingIcon />Waiting</span>;
    }
    if (status === "In-Game") {
        return <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/25">In-Game</span>;
    }
    if (status === "Active") {
        return <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/25"><ActiveIcon />Active</span>;
    }
    return <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-600/15 text-blue-300 border border-blue-600/25">FULL</span>;
};