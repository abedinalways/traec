"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DropdownIcon from "@/icons/DropdownIcon";

const monthlyPlans = [
  { name: "Basic", value: 420, color: "#D1D5DB", textColor: "#6B7280" },
  { name: "Standard", value: 200, color: "#7DD3FC", textColor: "#0E7490" },
  { name: "Premium", value: 450, color: "#FDBA74", textColor: "#B45309" },
];

const yearlyPlans = [
  { name: "Basic", value: 380, color: "#D1D5DB", textColor: "#6B7280" },
  { name: "Standard", value: 260, color: "#7DD3FC", textColor: "#0E7490" },
  { name: "Premium", value: 480, color: "#FDBA74", textColor: "#B45309" },
];

export default function SubscriptionDetailsCard() {
  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  const plans = view === "monthly" ? monthlyPlans : yearlyPlans;
  const max = 500;
  const yAxisTicks = [500, 400, 300, 200, 100, 0];

  return (
    <div className="rounded-2xl border border-gray-100 p-6 w-full h-full shadow-sm font-[inter] flex flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-[18px] font-semibold text-black">
          Subscription Details
        </h3>

        <div className="relative group">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as "monthly" | "yearly")}
            className="appearance-none bg-white border border-gray-200 rounded-[8px] px-4 py-2 text-sm text-gray-700 shadow-sm outline-none cursor-pointer pr-10 transition-all hover:border-gray-300"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <DropdownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Chart Content Area */}
      <div className="relative flex flex-1 items-stretch justify-evenly gap-2 min-h-[200px] ">
        {/* Y Axis Labels */}
        <div className="flex flex-col justify-evenly text-sm font-medium text-gray-400 pr-4  text-right min-w-[45px] ">
          {yAxisTicks.map((tick) => (
            <span key={tick}>{tick}$</span>
          ))}
        </div>

        {/* Chart Visualizer */}
        <div className="relative flex-1 flex items-end justify-start gap-10  px-2 pb-8 border-l border-b border-gray-50">
          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
            {yAxisTicks.map((tick) => (
              <div key={tick} className="w-full border-t border-gray-50 h-0" />
            ))}
          </div>

          {/* Bars */}
          {plans.map((plan) => {
            const height = (plan.value / max) * 100;

            return (
              <div
                key={plan.name}
                className="relative flex flex-col items-center justify-end h-full w-[15%] group "
              >
                {/* Floating Value Badge - Exactly as pictured */}
                <div
                  className="absolute z-20 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm border-2 border-white transition-all duration-300"
                  style={{
                    bottom: `calc(${height}% - 14px)`,
                    backgroundColor: plan.color,
                    color: plan.textColor,
                  }}
                >
                  {plan.value}$
                </div>

                {/* Striped Bar Body */}
                <div
                  className="w-full rounded-t-2xl transition-all duration-700 ease-out overflow-hidden border-x border-t border-gray-50"
                  style={{
                    height: `${height}%`,
                    background: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 6px,
                      ${plan.color}50 6px,
                      ${plan.color}50 12px
                    )`,
                  }}
                />
              </div>
            );
          })}

          {/* Legend - Inline on the right side as per screenshot */}
          <div className="absolute right-[-10px] bottom-16 flex flex-col gap-4 bg-white/90 p-3 rounded-lg">
            {plans.map((plan) => (
              <div key={plan.name} className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: plan.color }}
                />
                <span className="text-sm font-medium text-gray-500">
                  {plan.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
