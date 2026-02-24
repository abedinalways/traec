"use client";

import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface HistoryCardProps {
    title: string;
    value: string | number;
    change?: string;
    subtitle?: string;
    rightIcon?: ReactNode; 
}

export default function HistoryCard({
    title,
    value,
    change = "+0%",
    subtitle = "From last month",
    rightIcon,
}: HistoryCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-[#26344B] bg-[#111B23]">

            {rightIcon && (
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2  text-white">
                    {rightIcon}
                </div>
            )}
            <div className="bg-[#18222A] py-4">
                <div className="rounded-xl  p-4 sm:p-5">
                    <p className="text-sm text-white/60">{title}</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
                        {value}
                    </h2>
                </div>

            </div>

            <div className="mt-4 py-2 flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 font-medium text-green-400">
                    <ArrowUpRight size={16} />
                    {change}
                </span>
                <span className="text-white/50">{subtitle}</span>
            </div>
        </div>
    );
}
