"use client";

import { Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    className?: string;
    onBrowse: () => void;
};

export default function RecentPlayedGames({ className , onBrowse}: Props) {
    const router = useRouter();

    return (
        <section
            className={cn(
                // outer section (figma: border #383A3F, bg #202020)
                "w-full rounded-xl border border-[#383A3F] bg-[#202020]",
                "p-4 flex flex-col gap-4",
                className
            )}
        >
            {/* Title */}
            <h3 className="text-base font-medium text-white/80">
                Recent Games You Played
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
                    <Gamepad2 className="h-8 w-8 text-white/40" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1 max-w-md">
                    <p className="text-lg font-semibold text-white/80">
                        No Records Yet
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">
                        Play games to view your played matches.
                    </p>
                </div>

                {/* CTA */}
                <Button
                    onClick={onBrowse}
                    className="h-10 px-6 text-sm font-medium"
                >
                    Browse Games
                </Button>
            </div>
        </section>
    );
}
