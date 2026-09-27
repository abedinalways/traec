"use client";

import Image from "next/image";
import { X, User2, CheckCircle2 } from "lucide-react";
import { Modal } from "../../ui/modal";
import { cn } from "@/lib/utils";

interface PendingWithdrawalViewModalProps {
    isOpen: boolean;
    onClose: () => void;

    // ✅ dynamic props (parent theke diben)
    status?: "Pending Review" | "Approved" | "Rejected";
    userName?: string;
    userId?: string;
    isActive?: boolean;
    avatarSrc?: string;

    amount?: number;
    currency?: string;
    walletAddress?: string;
    submittedAt?: string;

    onReject?: () => void;
    onApprove?: () => void;
}

const StatusPill = ({ status = "Pending Review" }: { status?: PendingWithdrawalViewModalProps["status"] }) => {
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
            <p className="text-xs text-white/40">{label}</p>
            <div className="text-sm text-white/80 break-all">{value}</div>
        </div>
    );
};

export default function PendingWithdrawalViewModal({
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

    onReject,
    onApprove,
}: PendingWithdrawalViewModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-lg rounded-xl border border-[#26344B] bg-[#111B23] overflow-hidden">
            {/* Header (figma: padding 1.25rem 1.5rem, border-bottom) */}
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-[#26344B]">
                <div className="flex items-center gap-3 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white truncate">Withdrawal Request</h3>
                    <StatusPill status={status} />
                </div>
            </div>

            {/* Body (figma: padding 1.5rem 2rem 2.5rem 2rem; gap 2.5rem) */}
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
                    <InfoRow label="Amount:" value={<span className="text-white/85">{amount} {currency}</span>} />
                    <InfoRow label="Wallet:" value={<span className="text-white/60">{walletAddress}</span>} />
                    <InfoRow label="Request submitted:" value={<span className="text-white/60">{submittedAt}</span>} />
                </div>

                {/* Footer buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Reject (figma) */}
                    <button
                        type="button"
                        onClick={onReject}
                        className="w-full sm:w-[218px] inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#EE162A] bg-[linear-gradient(180deg,rgba(194,56,56,0.12)_0%,rgba(163,63,63,0)_100%),#202023] px-6 py-3 text-sm font-semibold text-[#EE162A] shadow-[0_1px_2px_rgba(82,88,102,0.06)] hover:brightness-110 transition"
                    >
                        Reject Request
                    </button>

                    {/* Approve (figma: flex 1) */}
                    <button
                        type="button"
                        onClick={onApprove}
                        className="w-full inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#5952FF] px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_0_0_1.8px_rgba(255,255,255,0.25)] hover:brightness-110 transition"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve Withdrawal
                    </button>
                </div>
            </div>
        </Modal>
    );
}
