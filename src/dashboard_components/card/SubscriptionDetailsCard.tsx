"use client";

import DropdownIcon from "@/icons/DropdownIcon";

type SubscriptionPlan = {
  name: string;
  value: number;
  color: string;
  textColor: string;
};

type SubscriptionDetailsProps = {
  plans?: SubscriptionPlan[];
  filter?: "monthly" | "yearly";
  onFilterChange?: (value: "monthly" | "yearly") => void;
};

export default function SubscriptionDetailsCard({
  plans = [],
  filter = "monthly",
  onFilterChange,
}: SubscriptionDetailsProps) {
  const max =
    plans.length > 0
      ? Math.ceil(Math.max(...plans.map((p) => p.value)) / 100) * 100
      : 500;

  const yAxisTicks = Array.from({ length: 6 }, (_, i) => max - (max / 5) * i);

  return (
    <div className="rounded-2xl border border-gray-100 p-6 w-full h-full shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-[18px] font-semibold text-black">
          Subscription Details
        </h3>

        <div className="relative">
          <select
            value={filter}
            onChange={(e) =>
              onFilterChange?.(e.target.value as "monthly" | "yearly")
            }
            className="appearance-none bg-white border border-gray-200 rounded-[8px] px-4 py-2 text-sm text-gray-700 shadow-sm outline-none cursor-pointer pr-10"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <DropdownIcon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex flex-1 items-stretch justify-evenly gap-2 min-h-[220px]">
        {/* Y Axis */}
        <div className="flex flex-col justify-evenly text-sm font-medium text-gray-400 pr-4 text-right min-w-[45px]">
          {yAxisTicks.map((tick) => (
            <span key={tick}>{Math.round(tick)}$</span>
          ))}
        </div>

        {/* Bars Area */}
        <div className="relative flex-1 flex items-end justify-around px-2 pb-8 border-l border-b border-gray-50">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
            {yAxisTicks.map((tick) => (
              <div key={tick} className="w-full border-t border-gray-50 h-0" />
            ))}
          </div>

          {plans.map((plan) => {
            const height = (plan.value / max) * 100;

            return (
              <div
                key={plan.name}
                className="relative flex flex-col items-center justify-end h-full w-[18%]"
              >
                {/* Value */}
                <div
                  className="absolute z-20 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm border-2 border-white"
                  style={{
                    bottom: `calc(${height}% - 14px)`,
                    backgroundColor: plan.color,
                    color: plan.textColor,
                  }}
                >
                  {plan.value}$
                </div>

                {/* Bar */}
                <div
                  className="w-full rounded-t-2xl overflow-hidden border-x border-t border-gray-50 transition-all duration-700"
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

          {/* Legend */}
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
