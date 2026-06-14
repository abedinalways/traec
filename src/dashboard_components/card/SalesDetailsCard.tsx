"use client";

import DropdownIcon from "@/icons/DropdownIcon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SalesDetailsProps = {
  filter: "yearly" | "monthly";
  onFilterChange: (value: "yearly" | "monthly") => void;
  salesData?: {
    labels: string[];
    last: number[];
    this: number[];
  };
};

const formatValue = (value: number) => {
  if (value >= 1) return `${value.toFixed(2)}M`;
  return `${(value * 1000).toFixed(2)}K`;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[1]?.payload || payload[0]?.payload;
  const current = payload[1]?.value ?? payload[0]?.value;
  const previous = payload[0]?.value ?? 0;

  const isPositive = current >= previous;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span>Sales</span>

        <span
          className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${isPositive
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

export default function SalesDetailsCard({ salesData,
  filter,
  onFilterChange, }: SalesDetailsProps) {
  const chartData =
    salesData?.labels?.map((label, index) => ({
      label,
      date: label,
      last: salesData.last?.[index] ?? 0,
      this: salesData.this?.[index] ?? 0,
    })) || [];

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

          <div className="relative inline-block">
            <select
              value={filter}
              onChange={(e) =>
                onFilterChange(e.target.value as "yearly" | "monthly")
              }
              className="
      appearance-none
      bg-white
      border border-gray-200
      text-sm text-gray-700
      rounded-lg
      px-4 pr-10 py-2
      outline-none
      cursor-pointer
    "
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
            </select>

            <DropdownIcon
              className="
      absolute right-3 top-1/2
      -translate-y-1/2
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
              cursor={{
                stroke: "#9CA3AF",
                strokeDasharray: "4 4",
              }}
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
