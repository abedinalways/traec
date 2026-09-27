"use client";

import Image from "next/image";
import { X, User2 } from "lucide-react";
import { Modal } from "../../ui/modal";
import { cn } from "@/lib/utils";

interface PendingWithdrawalDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;

    // ✅ dynamic data (parent theke diben)
    status?: "Pending Review" | "Rejected" | "Approved";
    userName?: string;
    userId?: string;
    isActive?: boolean;
    avatarSrc?: string;

    amount?: number;
    currency?: string;
    walletAddress?: string;
    submittedAt?: string;

    rejectAmount?: number;
    rejectCurrency?: string;

    onCancel?: () => void;
    onReject?: () => void;
}

const StatusPill = ({ status = "Pending Review" }: { status?: PendingWithdrawalDeleteModalProps["status"] }) => {
    const styles =
        status === "Approved"
            ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
            : status === "Rejected"
                ? "border-red-400/30 bg-red-500/10 text-red-300"
                : "border-[#F9C80E]/35 bg-[#FDC7001A] text-[#F9C80E]";

    return (
        <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium", styles)}>
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            {status}
        </span>
    );
};

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-[170px_1fr] sm:gap-3">
            <p className="text-xs text-white/35">{label}</p>
            <div className="text-sm text-white/75 break-all">{value}</div>
        </div>
    );
};

const RejectIcon = () => {
    return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <circle cx="22" cy="22" r="21" stroke="rgba(238,22,42,0.65)" strokeWidth="2" />
            <circle cx="22" cy="22" r="15" stroke="rgba(238,22,42,0.35)" strokeWidth="2" />
            <path
                d="M18.2 28.2c.7.5 1.9.9 3.8.9 3.4 0 5.8-1.4 5.8-3.9 0-2-1.3-3.1-4-3.7l-1.7-.4c-1.6-.4-2.2-.8-2.2-1.7 0-1 1-1.6 2.7-1.6 1.4 0 2.6.4 3.3.9"
                stroke="#EE162A"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle cx="29.7" cy="30.3" r="6" fill="rgba(238,22,42,0.12)" stroke="rgba(238,22,42,0.7)" />
            <path d="M27.6 28.2l4.2 4.2M31.8 28.2l-4.2 4.2" stroke="#EE162A" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

export default function PendingWithdrawalDeleteModal({
    isOpen,
    onClose,

    status = "Pending Review",
    userName = "Cryptoknight",
    userId = "#8832",
    isActive = true,
    avatarSrc = "/sidebar/profile_img.jpg",

    amount = 220,
    currency = "USDT",
    walletAddress = "0x7f3as654x5657fvgbgzxdjgfj3×9c2d",
    submittedAt = "Oct 24, 2023 at 14:30",

    rejectAmount = 500,
    rejectCurrency = "TRX",

    onCancel,
    onReject,
}: PendingWithdrawalDeleteModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-lg rounded-xl border border-[#26344B] bg-[#111B23] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-[#26344B]">
                <div className="flex items-center gap-3 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white truncate">Confirm Withdrawal</h3>
                    <StatusPill status={status} />
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-8 px-4 py-6 sm:px-8 sm:py-8">
                {/* User card */}
                <div className="w-full rounded-xl border border-[#26344B] bg-[#0B111B]/60 p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                            {avatarSrc ? (
                                <Image src={avatarSrc} alt={userName} fill className="object-cover" />
                            ) : (
                                <div className="h-full w-full grid place-items-center">
                                    <User2 className="h-5 w-5 text-white/40" />
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-white font-semibold truncate">{userName}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/50">
                                <span>ID: {userId}</span>
                                <span className="text-white/25">•</span>
                                <span className={cn("inline-flex items-center gap-1", isActive ? "text-emerald-400" : "text-white/40")}>
                                    <span className={cn("h-2 w-2 rounded-full", isActive ? "bg-emerald-400" : "bg-white/30")} />
                                    {isActive ? "Currently Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="w-full space-y-5">
                    <InfoRow label="Amount:" value={<span className="text-white/80">{amount} {currency}</span>} />
                    <InfoRow label="Wallet:" value={<span className="text-white/55">{walletAddress}</span>} />
                    <InfoRow label="Request submitted:" value={<span className="text-white/55">{submittedAt}</span>} />
                </div>

                {/* Confirm box (like screenshot) */}
                <div className="w-full rounded-xl border border-[#26344B] bg-[#0B111B]/50 p-5 sm:p-6 text-center">
                    <div className="mx-auto mb-3 grid h-12 w-12 place-items-center">
                        <RejectIcon />
                    </div>

                    <p className="text-sm text-white/70">
                        Approve withdrawal of{" "}
                        <span className="font-semibold text-emerald-300">
                            {rejectAmount} {rejectCurrency}
                        </span>{" "}
                        for user{" "}
                        <span className="font-semibold text-[#5B5CFF]">{userName}</span>?
                    </p>
                </div>

                {/* Footer buttons (Cancel + Reject Request like image) */}
                <div className="flex flex-col justify-end gap-3 sm:flex-row sm:items-center">
                    <button type="button" onClick={onCancel ?? onClose} className="w-full inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 hover:bg-white/10 transition">
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onReject}
                        className="w-full inline-flex  items-center justify-center rounded-lg border border-[#EE162A] bg-[linear-gradient(180deg,rgba(194,56,56,0.12)_0%,rgba(163,63,63,0)_100%),#202023] px-6 py-3 text-sm font-semibold text-[#EE162A] shadow-[0_1px_2px_rgba(82,88,102,0.06)] hover:bg-white/5 transition"
                    >
                        Reject Request
                    </button>
                </div>
            </div>
        </Modal>
    );
}
