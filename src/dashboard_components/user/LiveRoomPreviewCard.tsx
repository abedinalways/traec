"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Video } from "lucide-react";

type LiveRoomPreviewCardProps = {
    title?: string;
    subtitle?: string;
    className?: string;
    innerClassName?: string;
    // future: when you have preview content, pass children
    children?: React.ReactNode;
    onLivePreview: () => void;
};

export default function LiveRoomPreviewCard({
    title = "Live Room preview",
    subtitle = "Live room details will be shown here as you enter a live room.",
    className = "",
    innerClassName = "",
    children,
    onLivePreview,
}: LiveRoomPreviewCardProps) {
    return (
        <section
            className={cn(
                // outer (figma: padding 1rem, gap 1rem, border #383A3F, bg #202020, radius 0.75rem)
                "w-full rounded-xl border border-[#383A3F] bg-[#202020] p-4",
                "flex flex-col gap-4",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <h3 className="text-lg font-semibold text-white/80">{title}</h3>
            </div>

            {/* Inner preview area */}
            <div
                className={cn(
                    // inner (figma: padding 2.5rem 0.5rem, gap 1rem, border #232323, bg #232323, radius 0.75rem)
                    "w-full rounded-xl border border-[#232323] bg-[#232323]",
                    "flex flex-col items-center justify-center gap-4",
                    // responsive padding (no fixed height)
                    "px-3 py-10 sm:px-4 sm:py-12",
                    innerClassName
                )}
            >
                {children ? (
                    children
                ) : (
                    <>
                        <div className="flex items-center justify-center rounded-xl bg-white/5 p-4 cursor-pointer">
                            <Video onClick={onLivePreview} className="h-10 w-10 text-white/40" />
                        </div>

                        <p className="max-w-[26ch] text-center text-base font-medium text-white/60 leading-snug">
                            Live room details will be shown here as you enter a live room.
                        </p>
                    </>
                )}
            </div>
        </section>
    );
}
