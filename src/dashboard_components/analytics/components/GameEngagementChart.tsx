/**
 * Game Engagement Chart Component
 * Single Responsibility: Render area chart for game engagement visualization
 * Open/Closed Principle: Extensible through props and config
 */

"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import { IEngagementChartProps } from "../types/engagement.types";

interface TooltipPayload {
    name: string;
    value: number;
    color: string;
    dataKey?: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: readonly TooltipPayload[];
    label?: string | number;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const shooterEntry = payload.find((entry) => entry.name === "shooter" || entry.dataKey === "shooter");
    const racingEntry = payload.find((entry) => entry.name === "racing" || entry.dataKey === "racing");

    return (
        <div className="bg-gray-800 dark:bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-700">
            {shooterEntry && (
                <div className="flex items-center gap-2 mb-1">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: shooterEntry.color }}
                    />
                    <span className="text-sm font-medium text-white">
                        Shooter {shooterEntry.value}
                    </span>
                </div>
            )}
            {racingEntry && (
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: racingEntry.color }}
                    />
                    <span className="text-sm font-medium text-white">
                        Racing {racingEntry.value}
                    </span>
                </div>
            )}
        </div>
    );
};

const GameEngagementChart = ({ data, config }: IEngagementChartProps) => {
    const chartConfig = {
        shooterColor: config?.shooterColor || "#5952FF",
        racingColor: config?.racingColor || "#E67A00",
        gridColor: config?.gridColor || "rgba(255, 255, 255, 0.05)",
        textColor: config?.textColor || "#9CA3AF",
    };

    return (
        <div className="w-full h-[400px] sm:h-[450px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
                >
                    <defs>
                        <linearGradient id="colorShooter" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartConfig.shooterColor} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={chartConfig.shooterColor} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorRacing" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartConfig.racingColor} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={chartConfig.racingColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={chartConfig.gridColor}
                        vertical={false}
                    />
                    <XAxis
                        dataKey="time"
                        tick={{ fill: chartConfig.textColor, fontSize: 12 }}
                        axisLine={{ stroke: chartConfig.gridColor }}
                        tickLine={{ stroke: chartConfig.gridColor }}
                    />
                    <YAxis
                        tick={{ fill: chartConfig.textColor, fontSize: 12 }}
                        axisLine={{ stroke: chartConfig.gridColor }}
                        tickLine={{ stroke: chartConfig.gridColor }}
                        width="auto"
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: "#1A1D2D", strokeWidth: 1, strokeOpacity: 0.5, strokeDasharray: "5 5" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="shooter"
                        stroke={chartConfig.shooterColor}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorShooter)"
                    />
                    <Area
                        type="monotone"
                        dataKey="racing"
                        stroke={chartConfig.racingColor}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRacing)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GameEngagementChart;
