/**
 * Time Range Toggle Component
 * Single Responsibility: Handle time range selection (24H, 7D, 30D)
 */

import { TimeRange } from "../types/engagement.types";

interface ITimeRangeToggleProps {
    selectedRange: TimeRange;
    onRangeChange: (range: TimeRange) => void;
}

const TimeRangeToggle = ({ selectedRange, onRangeChange }: ITimeRangeToggleProps) => {
    const ranges: TimeRange[] = ["24H", "7D", "30D"];

    return (
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#2E3340]">
            {ranges.map((range) => (
                <button
                    key={range}
                    onClick={() => onRangeChange(range)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedRange === range
                            ? "text-white bg-gray-700/50"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                >
                    {range}
                </button>
            ))}
        </div>
    );
};

export default TimeRangeToggle;
