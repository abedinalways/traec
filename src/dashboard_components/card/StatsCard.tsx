"use client";

import { ArrowUpRight } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    subtitle?: string;
}

export default function StatsCard({
    title,
    value,
    change = "+0%",
    subtitle = "From last month",
}: StatsCardProps) {
    return (
        <div
            className="
        relative rounded-2xl border border-white/10 
        dark:bg-[#111B23] bg-white 
        p-4 sm:p-5
        dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)]
        "
        >
            {/* Top section */}
            <div className="rounded-xl bg-gray-200 dark:bg-[#18222A] p-4 sm:p-5">
                <p className="text-sm text-gray-800 dark:text-gray-400">{title}</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-600 dark:text-white">
                    {value}
                </h2>
            </div>

            {/* Bottom section */}
            <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 text-green-400 font-medium">
                    <ArrowUpRight size={16} />
                    {change}
                </span>
                <span className="text-gray-400">{subtitle}</span>
            </div>
        </div>
    );
}
