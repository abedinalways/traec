"use client";

import type { ReactNode } from "react";

export type ActivityBulletColor = "red" | "purple" | "green" | "yellow";

export interface RecentActivityItem {
    bulletColor: ActivityBulletColor;
    title: string;
    description: ReactNode;
    timeAgo: string;
}

const bulletColorMap: Record<ActivityBulletColor, string> = {
    red: "bg-red-500",
    purple: "bg-[#5952FF]",
    green: "bg-green-500",
    yellow: "bg-amber-500",
};

const defaultActivities: RecentActivityItem[] = [
    {
        bulletColor: "red",
        title: "New User Registration",
        description: (
            <>
                User <span className="text-[#5952FF]">@NeonNinja</span> joined the platform.
            </>
        ),
        timeAgo: "2 mins ago",
    },
    {
        bulletColor: "purple",
        title: "Cryptoknight Game",
        description: (
            <>
                <span className="text-[#5952FF]">@rja</span> entered the Room{" "}
                <span className="text-[#5952FF]">#FPS-099</span>.
            </>
        ),
        timeAgo: "12 mins ago",
    },
    {
        bulletColor: "green",
        title: "Entry Fee",
        description: (
            <>
                Successfully received <span className="text-green-400">1.2 USDT</span> from{" "}
                <span className="text-[#5952FF]">@TraderJoe</span>
            </>
        ),
        timeAgo: "45 mins ago",
    },
    {
        bulletColor: "yellow",
        title: "Withdrawal Requested",
        description: (
            <>
                New request from <span className="text-[#5952FF]">@rja</span> for{" "}
                <span className="text-amber-400">500 USDT</span> pending approval.
            </>
        ),
        timeAgo: "3 hours ago",
    },
];

interface RecentActivityProps {
    activities?: RecentActivityItem[];
}

export default function RecentActivity({ activities = defaultActivities }: RecentActivityProps) {
    return (
        <div className="w-full min-w-0 rounded-2xl border border-white/10 dark:bg-[#111B23] p-4 sm:p-5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)]">
            <h3 className="text-base sm:text-lg font-bold text-gray-500 dark:text-[#C1C2C5] mb-4 sm:mb-5">
                Recent Activity
            </h3>
            <ul className="space-y-4 sm:space-y-5">
                {activities.map((item, index) => (
                    <li key={index} className="flex gap-3 sm:gap-4 min-w-0">
                        <span
                            className={`shrink-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mt-1.5 ${bulletColorMap[item.bulletColor]}`}
                            aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-sm sm:text-base font-semibold text-white truncate">
                                {item.title}
                            </p>
                            <p className="mt-0.5 text-xs sm:text-sm text-gray-400 leading-snug wrap-break-word">
                                {item.description}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">{item.timeAgo}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
