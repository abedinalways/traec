"use client";

import Image from "next/image";
import { EnterIcon, JoinGameIcon } from "@/src/icons";
import PlayersEntryInfo from "../../card/PlayersEntryInfo";

type RankedDuelArenaCardProps = {
    image: string;
    status: "In-Game" | "Waiting" | "In Progress";
    gameType: string;
    arena: string;
    title: string;
    roomId: string;
    entryFee: string;
    isjoined: boolean;
    onJoin: () => void;
};

export default function RankedDuelArenaCard({
    image,
    status,
    gameType,
    arena,
    title,
    roomId,
    entryFee,
    isjoined,
    onJoin,
}: RankedDuelArenaCardProps) {
    return (
        <section className="flex w-full flex-col items-center gap-4 rounded-xl border border-[#26344B] bg-[#111B23] pb-7">

            {/* Image Section */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-[linear-gradient(203deg,rgba(0,0,0,0)_28.45%,rgba(0,0,0,0.5)_85.23%)]" />

                {/* Status badge */}
                {status && (
                    <span
                        className={`absolute top-4 right-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${status === "In-Game"
                                ? "bg-[rgba(24,181,14,0.20)] text-[#18B50E]"
                            : status === "Waiting"
                                    ? "bg-[#FDC7001A] text-[#F9C80E]"
                                    : "bg-white/10 text-white"
                            }`}
                    >
                        {status}
                    </span>
                )}

            </div>

            {/* Content */}
            <div className="flex w-full flex-col gap-4 px-4">

                {/* Game type + Arena */}
                <div className="flex items-center gap-2">
                    <span className={`rounded-full border ${gameType === "RACING" ? " border-[#F6731899] bg-[#F6731833] text-[#F67318]" : "border-[#5952FF99] bg-[#5952FF33] text-[#5952FF]"}  px-3 py-1 text-xs font-medium `}>
                        {gameType}
                    </span>
                    <span className="text-sm text-white/70">{arena}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white">
                    {title}
                </h3>

                {/* Room ID */}
                <div className="flex items-center gap-2 text-sm text-white/60">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    Room ID: {roomId}
                </div>

                {isjoined ? <PlayersEntryInfo /> : <div className="flex items-center justify-between rounded-lg bg-[#1A2330] px-4 py-3 text-sm">
                    <span className="text-white/70">Entry Fee</span>
                    <span className="font-semibold text-white">{entryFee}</span>
                </div>}
                {isjoined ? <button
                    onClick={onJoin}
                    className="flex w-full items-center justify-center gap-2 rounded-md text-[#5B5CFF] px-4 py-3 text-[1rem] font-semibold  transition"
                >
                    <EnterIcon />
                    Enter Room
                </button> : <button
                    onClick={onJoin}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[#5B5CFF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#4a4bff] transition"
                >
                    <JoinGameIcon />
                    Join Game
                </button>}

            </div>
        </section>
    );
}
