/**
 * Transactions Chart Component
 * Single Responsibility: Render transactions line chart visualization
 * Open/Closed Principle: Extensible through props and config
 */

"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { TimePeriod } from "../types/revenue.types";

interface ITransactionDataPoint {
    month: string;
    shooter: number;
    racing: number;
}

interface ITransactionChartConfig {
    shooterColor: string;
    racingColor: string;
    gridColor: string;
    textColor: string;
    activeDotColor: string;
}

interface ITransactionChartProps {
    data: ITransactionDataPoint[];
    period: TimePeriod;
    config?: Partial<ITransactionChartConfig>;
    onDataPointHover?: (data: ITransactionDataPoint | null) => void;
}

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

// CustomTooltip component moved outside to avoid creating during render
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        // Find shooter and racing entries
        const shooterEntry = payload.find((entry) => entry.name === "shooter" || entry.dataKey === "shooter");
        const racingEntry = payload.find((entry) => entry.name === "racing" || entry.dataKey === "racing");
        
        return (
            <div className="bg-gray-800 dark:bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-700">
                {shooterEntry && (
                    <div className="mb-2 last:mb-0">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: shooterEntry.color }}
                            />
                            <span className="text-sm font-medium text-gray-300">Shooter</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-5">
                            <ArrowUpRight className="w-3 h-3 text-green-400" />
                            <span className="text-sm font-medium text-white">
                                ${typeof shooterEntry.value === 'number' ? shooterEntry.value.toFixed(2) : shooterEntry.value}
                            </span>
                            <span className="text-xs text-green-400">+10%</span>
                        </div>
                    </div>
                )}
                {racingEntry && (
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: racingEntry.color }}
                            />
                            <span className="text-sm font-medium text-gray-300">Racing</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-5">
                            <ArrowUpRight className="w-3 h-3 text-green-400" />
                            <span className="text-sm font-medium text-white">
                                ${typeof racingEntry.value === 'number' ? racingEntry.value.toFixed(2) : racingEntry.value}
                            </span>
                            <span className="text-xs text-green-400">+10%</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

const TransactionsChart = ({ data, config, onDataPointHover }: ITransactionChartProps) => {
    const chartConfig = {
        shooterColor: config?.shooterColor || "#5952FF",
        racingColor: config?.racingColor || "#E67A00",
        gridColor: config?.gridColor || "rgba(255, 255, 255, 0.05)",
        textColor: config?.textColor || "#9CA3AF",
        activeDotColor: config?.activeDotColor || "#FFFFFF",
        ...config,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (state: any) => {
        if (state && typeof state.activeTooltipIndex === 'number' && onDataPointHover && data[state.activeTooltipIndex]) {
            onDataPointHover(data[state.activeTooltipIndex]);
        }
    };

    const handleMouseLeave = () => {
        onDataPointHover?.(null);
    };

    return (
        <div className="w-full h-[400px] sm:h-[450px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={chartConfig.gridColor}
                        vertical={false}
                    />
                    <XAxis
                        dataKey="month"
                        tick={{ fill: chartConfig.textColor, fontSize: 12 }}
                        axisLine={{ stroke: chartConfig.gridColor }}
                        tickLine={{ stroke: chartConfig.gridColor }}
                    />
                    <YAxis
                        tick={{ fill: chartConfig.textColor, fontSize: 12 }}
                        axisLine={{ stroke: chartConfig.gridColor }}
                        tickLine={{ stroke: chartConfig.gridColor }}
                        width="auto"
                        tickFormatter={(value) => {
                            if (value >= 1000) {
                                return `$${(value / 1000).toFixed(1)}k`;
                            }
                            return `$${value}`;
                        }}
                    />
                    <Tooltip
                        content={CustomTooltip}
                        cursor={{ stroke: "#1A1D2D", strokeWidth: 1, strokeOpacity: 0.5 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="shooter"
                        stroke={chartConfig.shooterColor}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                            r: 6,
                            fill: chartConfig.shooterColor,
                            stroke: chartConfig.activeDotColor,
                            strokeWidth: 2,
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="racing"
                        stroke={chartConfig.racingColor}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                            r: 6,
                            fill: chartConfig.racingColor,
                            stroke: chartConfig.activeDotColor,
                            strokeWidth: 2,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionsChart;
