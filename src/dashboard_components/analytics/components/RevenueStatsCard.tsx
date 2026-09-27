/**
 * Revenue Stats Card Component
 * Single Responsibility: Display revenue statistics
 */

import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface IRevenueStatsCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    change: string;
}

const RevenueStatsCard = ({ icon, label, value, change }: IRevenueStatsCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center border-r border-gray-700/50 last:border-r-0  py-4">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <p className="text-xs uppercase text-gray-400 mb-2 tracking-wide">{label}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center">
                <p className="text-2xl font-semibold text-white mb-1">{value}</p>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{change}</span>
                </div>
            </div>
        </div>
    );
};

export default RevenueStatsCard;
