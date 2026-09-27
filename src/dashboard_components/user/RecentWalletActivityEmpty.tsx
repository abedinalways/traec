"use client";

import React from "react";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import ConnectWalletButton from "../common/ConnectWalletButton";

type Props = {
    className?: string;
    onTransaction: () => void;
};

export default function RecentWalletActivityEmpty({ className, onTransaction }: Props) {
    return (
        <section
            className={cn(
                // outer section (figma: border #383A3F, bg #202020, radius 0.75rem)
                "w-full rounded-xl border border-[#383A3F] bg-[#202020]",
                "p-4 flex flex-col gap-4",
                className
            )}
        >
            {/* Title */}
            <h3 className="text-base font-medium text-white/80">
                Recent wallet Activity
            </h3>

            {/* Inner empty state */}
            <div
                className="
            w-full
            flex flex-1
            flex-col
            items-center
            justify-center
            gap-4
            rounded-xl
            border border-[#232323]
            bg-[#232323]
            px-3 py-10
            sm:px-4 sm:py-14
            text-center
            "
            >
                {/* Icon */}
                <div className="flex items-center justify-center rounded-xl bg-white/5 p-4">
                    <Wallet className="h-8 w-8 text-white/40" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1 max-w-md">
                    <p className="text-lg font-semibold text-white/80">
                        No Transactions Yet
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">
                        You need to link your TRX Wallet to deposit funds and start earning
                        winnings from matches.
                    </p>
                </div>

                {/* CTA */}
                <ConnectWalletButton
                    onConnect={ onTransaction }
                />
            </div>
        </section>
    );
}
