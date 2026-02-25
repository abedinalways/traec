"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  subtitle?: string;
  icon?: ReactNode;
}

export default function StatsCard({
  title,
  value,
  change = "+0%",
  subtitle = "from last month",
  icon,
}: StatsCardProps) {
  const isNegative = change.startsWith("-");

  return (
    <div
      className="
      relative rounded-2xl border border-gray-200 
      dark:bg-[#111B23] bg-white 
      p-4 sm:p-5
      dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)]
      "
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[16px] text-[#777980]">{title}</p>
          <h2 className="mt-2 text-2xl sm:text-[32px] font-semibold text-gray-800 ">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div className="text-gray-400 dark:text-gray-500">{icon}</div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 flex items-center gap-2 text-[16px]">
        <span
          className={`flex items-center gap-1 font-medium ${
            isNegative ? "text-red-500" : "text-[#22caad]"
          }`}
        >
          {change}
        </span>
        <span
          className={`flex items-center gap-1 font-medium ${
            isNegative ? "text-red-500" : "text-[#22caad]"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}
