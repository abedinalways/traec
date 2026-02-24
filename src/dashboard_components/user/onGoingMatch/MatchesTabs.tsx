"use client";

import { useState } from "react";

const tabs = [
    { id: "all", label: "All Matches (3)" },
    { id: "progress", label: "In Progress" },
    { id: "waiting", label: "Waiting For Players" },
];

export default function MatchesTabs() {
    const [active, setActive] = useState("all");

    return (
        <div className="flex flex-wrap items-center gap-4">
            {tabs.map((tab) => {
                const isActive = active === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                                ? "bg-[#202639] text-white"
                                : "bg-[#202639]/60 text-white/60 hover:text-white hover:bg-[#202639]"
                            }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
