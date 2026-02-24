"use client";

import Image from "next/image";
import { Modal } from "../../ui/modal";
import { Users, X } from "lucide-react";
import { BallIcon } from "@/src/icons";

interface GameDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    roomId: number;
}

export default function GameDetailsModal({
    isOpen,
    onClose,
    roomId,
}: GameDetailsModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="w-full max-w-[584px] rounded-xl border border-[#26344B] bg-[#111B23]"
        >
            <div>
                <div className="relative w-full overflow-hidden rounded-xl">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
                        <Image src="/images/carimage.png" alt="Neon City Battle" fill priority className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/90" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 px-4 py-3 md:px-8 md:py-4">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-[#5952FF99] bg-[#5952FF] px-3 py-1 text-xs font-medium text-white">SHOOTER</span>
                                <span className="text-sm text-white/70">Cyber Arena</span>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                                <div className="min-w-0">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight break-words">Neon City Battle</h2>
                                    <div className="mt-1 flex items-center gap-2 text-sm text-white/60"><BallIcon /> <span className="truncate">Room ID: #8832a</span></div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                                    <div className="flex flex-col items-start sm:items-center gap-1 px-3 py-2 rounded-lg bg-[rgba(54,65,83,0.3)]">
                                        <span className="text-[#A5A5AB] text-xs">Entry fee</span>
                                        <div className="flex items-center gap-2 text-sm"><span>💰</span><span className="font-semibold text-[#FDC700]">12.50 USD</span></div>
                                    </div>

                                    <div className="flex flex-col items-start sm:items-center gap-1 px-3 py-2 rounded-lg bg-[rgba(54,65,83,0.3)]">
                                        <span className="text-[#A5A5AB] text-xs">Players</span>
                                        <div className="flex items-center gap-2 text-sm"><Users size={14} /><span className="font-semibold text-[#4A75CD]">8/10</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-6  p-4 sm:p-6 lg:p-10">
                    <div className="flex w-full flex-col gap-3 rounded-lg border border-[#26344B] bg-[#0B111B] p-4">
                        <div className="flex items-center border-b border-[#26344B] pb-2 justify-between text-sm">
                            <span className="text-white/70">Wallet Balance</span>
                            <span className="font-bold text-[1.25rem] text-[#05DF72]">20.55 USDT</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-white/70">Cost to Join</span>
                            <span className="font-bold text-[1.25rem] text-[#FDC700]">12.50 USD</span>
                        </div>
                        <span className="w-fit rounded-md bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                            Sufficient balance to join this room
                        </span>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row">
                        <button
                            onClick={onClose}
                            className="w-full rounded-md border border-white/20 px-4 py-2 text-sm text-white/70 hover:bg-white/5"
                        >
                            Cancel
                        </button>

                        <button
                            className="w-full rounded-md bg-[#5B5CFF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a4bff]"
                        >
                            Pay Entry Fee
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
