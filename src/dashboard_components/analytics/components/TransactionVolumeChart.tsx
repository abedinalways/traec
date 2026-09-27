
"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Line,
    LineChart,
} from "recharts";
import { IEngagementChartProps } from "../types/engagement.types";
import { TransactionVolumeDataService } from "../services/transactionVolumeDataService";

interface TooltipPayload {
    name: string;
    value: number;
    color: string;
    dataKey?: string;
    payload?: any;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: readonly TooltipPayload[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const dataPoint = payload[0]?.payload;
    if (!dataPoint) return null;

    return (
        <div className="bg-gray-800 dark:bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-1">
                <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: "#5952FF" }}
                />
                <span className="text-sm font-medium text-white">
                    Shooter {TransactionVolumeDataService.formatTRX(dataPoint.shooter)}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: "#E67A00" }}
                />
                <span className="text-sm font-medium text-white">
                    Racing {TransactionVolumeDataService.formatTRX(dataPoint.racing)}
                </span>
            </div>
        </div>
    );
};

const TransactionVolumeChart = ({ data, config }: IEngagementChartProps) => {
    const chartConfig = {
        shooterColor: config?.shooterColor ?? "#5952FF",
        racingColor: config?.racingColor ?? "#E67A00",
        gridColor: config?.gridColor ?? "rgba(255, 255, 255, 0.05)",
        textColor: config?.textColor ?? "#9CA3AF",
    };

    // Transform data to include total (shooter + racing)
    const transformedData = data.map((item) => ({
        ...item,
        total: (item.shooter ?? 0) + (item.racing ?? 0),
    }));

    return (
        <div className="w-full min-w-0 h-[320px] sm:h-[360px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={transformedData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
                >
                    <defs>
                        <linearGradient id="txVolumeTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartConfig.shooterColor} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={chartConfig.shooterColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={chartConfig.gridColor}
                        vertical={false}
                    />
                    <XAxis
                        dataKey="time"
                        tick={{ fill: chartConfig.textColor, fontSize: 11 }}
                        axisLine={{ stroke: chartConfig.gridColor }}
                        tickLine={{ stroke: chartConfig.gridColor }}
                    />
                    <YAxis
                        tick={{ fill: chartConfig.textColor, fontSize: 11 }}
                        axisLine={{ stroke: chartConfig.gridColor }}
                        tickLine={{ stroke: chartConfig.gridColor }}
                        width="auto"
                        tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: "#1A1D2D", strokeWidth: 1, strokeOpacity: 0.5, strokeDasharray: "5 5" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke={chartConfig.shooterColor}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#txVolumeTotal)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionVolumeChart;
