/**
 * Game Preference Chart Component
 * Single Responsibility: Render donut chart for game preference distribution
 * Open/Closed Principle: Extensible through props and config
 */

"use client";

import { Pie, PieChart, Cell, Label, ResponsiveContainer, Tooltip } from "recharts";

interface GamePreferenceData {
    name: string;
    value: number;
    fill: string;
}

interface GamePreferenceChartProps {
    shooterValue?: number;
    racingValue?: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        fill: string;
    }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const entry = payload[0];
    const isShooter = entry.name === "shooter";
    const textColor = isShooter ? "#5952FF" : "#E67A00";
    const label = isShooter ? "Shooter" : "Racing";

    return (
        <div
            className="bg-gray-800 dark:bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-700"
            style={{ color: textColor }}
        >
            <div className="flex items-center gap-2">
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                />
                <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="mt-1 text-sm font-semibold">{entry.value}%</div>
        </div>
    );
};

const GamePreferenceChart = ({
    shooterValue = 67,
    racingValue = 33,
}: GamePreferenceChartProps) => {
    const shooterColor = "#5952FF";
    const racingColor = "#E67A00";

    const chartData: GamePreferenceData[] = [
        {
            name: "shooter",
            value: shooterValue,
            fill: shooterColor,
        },
        {
            name: "racing",
            value: racingValue,
            fill: racingColor,
        },
    ];

    // Calculate total for percentage display
    const total = shooterValue + racingValue;
    const shooterPercentage = Math.round((shooterValue / total) * 100);

    return (
        <div className="flex flex-col h-full p-6">
            <div className="pb-4">
                <h2 className="text-2xl font-bold text-white mb-1">Game Preference</h2>
                <p className="text-sm text-gray-400">
                    Active player distribution by game type
                </p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center pb-0">
                <div className="w-full max-w-[320px] aspect-square mx-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                                cursor={false}
                                content={<CustomTooltip />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="60%"
                                outerRadius="80%"
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                                <Label
                                    value={`${shooterPercentage}%`}
                                    position="center"
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: "bold",
                                        fill: "#FFFFFF",
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend */}
                <div className="w-full mt-6 space-y-3">
                    {/* Shooter Legend Item */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#2E3340] border border-gray-700/50">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-8 rounded-full"
                                style={{ backgroundColor: shooterColor }}
                            />
                            <span className="text-sm font-medium text-white uppercase">
                                SHOOTER
                            </span>
                        </div>
                        <div
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                                backgroundColor: "rgba(89, 82, 255, 0.2)",
                                color: "#9CA3FF",
                            }}
                        >
                            {shooterPercentage}%
                        </div>
                    </div>

                    {/* Racing Legend Item */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#2E3340] border border-gray-700/50">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-8 rounded-full"
                                style={{ backgroundColor: racingColor }}
                            />
                            <span className="text-sm font-medium text-white uppercase">
                                RACING
                            </span>
                        </div>
                        <div
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                                backgroundColor: "rgba(230, 122, 0, 0.2)",
                                color: "#FFB366",
                            }}
                        >
                            {100 - shooterPercentage}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePreferenceChart;
