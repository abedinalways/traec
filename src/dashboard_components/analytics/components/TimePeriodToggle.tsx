/**
 * Time Period Toggle Component
 * Single Responsibility: Handle time period selection
 */

import { TimePeriod } from "../types/revenue.types";

interface ITimePeriodToggleProps {
    selectedPeriod: TimePeriod;
    onPeriodChange: (period: TimePeriod) => void;
}

const TimePeriodToggle = ({ selectedPeriod, onPeriodChange }: ITimePeriodToggleProps) => {
    const periods: TimePeriod[] = ["Monthly", "Yearly"];

    return (
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#2E3340]">
            {periods.map((period) => (
                <button
                    key={period}
                    onClick={() => onPeriodChange(period)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedPeriod === period
                            ? "text-white bg-gray-700/50"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                >
                    {period}
                </button>
            ))}
        </div>
    );
};

export default TimePeriodToggle;
