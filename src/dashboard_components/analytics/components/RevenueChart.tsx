

"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { IRevenueChartProps, IRevenueDataPoint } from "../types/revenue.types";

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
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {label}
                </p>
                <div className="space-y-2">
                    {payload.map((entry, index: number) => {
                        const value = typeof entry.value === 'number' ? entry.value.toFixed(2) : String(entry.value);
                        return (
                            <div key={index} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {entry.name === "shooter" ? "Shooter" : "Racing"}: ${value}
                                </span>
                                <ArrowUpRight className="w-3 h-3 text-green-400" />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    return null;
};

// Custom segmented bar shape (sound bar style)
const createSegmentedBar = (props: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
    [key: string]: unknown;
}) => {
    const { x = 0, y = 0, width = 0, height = 0, fill = "#000" } = props;
    const segmentCount = Math.max(3, Math.floor(height / 8)); // Number of segments
    const segmentHeight = height / segmentCount;
    const gap = 2; // Gap between segments
    const actualSegmentHeight = segmentHeight - gap;

    return (
        <g>
            {Array.from({ length: segmentCount }).map((_, index) => {
                const segmentY = y + (segmentHeight * index);
                const segmentWidth = width * (0.7 + (index / segmentCount) * 0.3); // Varying widths
                const segmentX = x + (width - segmentWidth) / 2; // Center align
                
                return (
                    <rect
                        key={index}
                        x={segmentX}
                        y={segmentY}
                        width={segmentWidth}
                        height={actualSegmentHeight}
                        fill={fill}
                        rx={4}
                        ry={4}
                    />
                );
            })}
        </g>
    );
};

const RevenueChart = ({ data, config, onDataPointHover }: IRevenueChartProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const chartConfig = {
        shooterColor: config?.shooterColor || "#5952FF",
        racingColor: config?.racingColor || "#E67A00",
        gridColor: config?.gridColor || "rgba(255, 255, 255, 0.05)",
        textColor: config?.textColor || "#9CA3AF",
        ...config,
    };

    const handleMouseEnter = (data: IRevenueDataPoint, index: number) => {
        setHoveredIndex(index);
        onDataPointHover?.(data);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        onDataPointHover?.(null);
    };

    return (
        <div className="w-full h-[400px] sm:h-[450px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
                    barCategoryGap="20%"
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
                        tickFormatter={(value) => {
                            if (value >= 1000) {
                                return `$${(value / 1000).toFixed(1)}k`;
                            }
                            return `$${value}`;
                        }}
                    />
                    <Tooltip content={CustomTooltip} cursor={{ fill: "black", fillOpacity: 0.5 }} />
                    
                    <Bar
                        dataKey="shooter"
                        fill={chartConfig.shooterColor}
                        // @ts-expect-error - Recharts shape prop type is strict but accepts function
                        shape={createSegmentedBar}
                    >
                        {data.map((_, index) => {
                            const isHovered = hoveredIndex === index;
                            return (
                                <Cell
                                    key={`shooter-cell-${index}`}
                                    fill={
                                        isHovered
                                            ? chartConfig.shooterColor
                                            : chartConfig.shooterColor + "CC"
                                    }
                                    onMouseEnter={() => handleMouseEnter(data[index], index)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ cursor: "pointer" }}
                                />
                            );
                        })}
                    </Bar>
                    <Bar
                        dataKey="racing"
                        fill={chartConfig.racingColor}
                        // @ts-expect-error - Recharts shape prop type is strict but accepts function
                        shape={createSegmentedBar}
                    >
                        {data.map((_, index) => {
                            const isHovered = hoveredIndex === index;
                            return (
                                <Cell
                                    key={`racing-cell-${index}`}
                                    fill={
                                        isHovered
                                            ? chartConfig.racingColor
                                            : chartConfig.racingColor + "CC"
                                    }
                                    onMouseEnter={() => handleMouseEnter(data[index], index)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ cursor: "pointer" }}
                                />
                            );
                        })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
