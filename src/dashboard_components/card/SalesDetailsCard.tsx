"use client";

import { Select } from "@/components/ui/select";
import DropdownIcon from "@/icons/DropdownIcon";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* =========================
   DATA
========================= */

const yearlyData = [
  { label: "Jan", date: "Jan 2025", last: 0.2, this: 0.1 },
  { label: "Feb", date: "Feb 2025", last: 0.6, this: 0.8 },
  { label: "Mar", date: "Mar 2025", last: 0.7, this: 1.0 },
  { label: "Apr", date: "Apr 2025", last: 0.8, this: 1.3 },
  { label: "May", date: "May 2025", last: 1.3, this: 2.0 },
  { label: "Jun", date: "Jun 2025", last: 1.0, this: 1.8 },
  { label: "Jul", date: "Jul 2025", last: 1.4, this: 2.5 },
  { label: "Aug", date: "Aug 2025", last: 1.2, this: 2.9 },
  { label: "Sep", date: "Sep 2025", last: 1.3, this: 3.0 },
  { label: "Oct", date: "Oct 2025", last: 1.7, this: 3.0 },
  { label: "Nov", date: "Nov 2025", last: 1.8, this: 4.0 },
  { label: "Dec", date: "Dec 2025", last: 1.9, this: 3.9 },
];

const monthlyData = [
  { label: "Week 1", date: "Jul 07, 2025", last: 0.4, this: 0.6 },
  { label: "Week 2", date: "Jul 14, 2025", last: 0.8, this: 1.2 },
  { label: "Week 3", date: "Jul 21, 2025", last: 1.1, this: 1.6 },
  { label: "Week 4", date: "Jul 28, 2025", last: 1.5, this: 2.1 },
];

/* =========================
   FORMATTER
========================= */

const formatValue = (value: number) => {
  if (value >= 1) return `${value.toFixed(2)}M`;
  return `${(value * 1000).toFixed(2)}K`;
};

/* =========================
   CUSTOM TOOLTIP
========================= */

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[1]?.payload || payload[0]?.payload;
  const current = payload[1]?.value ?? payload[0]?.value;
  const previous = payload[0]?.value ?? 0;

  const isPositive = current >= previous;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span>Sales</span>

        <span
          className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${
            isPositive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {formatValue(current)} {isPositive ? "↗" : "↘"}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-1">{data.date}</p>
    </div>
  );
};

/* =========================
   COMPONENT
========================= */

export default function SalesDetailsCard() {
  const [view, setView] = useState<"yearly" | "monthly">("yearly");

  const chartData = view === "yearly" ? yearlyData : monthlyData;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Sales Details</h3>

        <div className="flex items-center gap-6">
          {/* Legend */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-gray-600">Last Year</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-600">This Year</span>
            </div>
          </div>

          {/* Dropdown */}
          <div className="relative inline-block">
            <select
              value={view}
              onChange={(e) => setView(e.target.value as "yearly" | "monthly")}
              className="
      appearance-none
      bg-white
      border border-gray-200
      hover:border-gray-300
      focus:border-gray-400
      focus:ring-2 focus:ring-gray-200
      text-sm text-gray-700
      rounded-lg
      px-4 pr-10 py-2
      transition-all
      cursor-pointer
      outline-none
    "
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
            </select>

            {/* Custom Icon */}
            <DropdownIcon
              className="
      absolute right-3 top-1/2 -translate-y-1
      
      pointer-events-none
    "
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />

            <XAxis
              dataKey="label"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#9CA3AF", strokeDasharray: "4 4" }}
            />

            <Line
              type="monotone"
              dataKey="last"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="this"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
