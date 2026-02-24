"use client";

import { useState, useMemo } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import TimePeriodToggle from "./components/TimePeriodToggle";
import TransactionsChart from "./components/TransactionsChart";
import { TransactionsDataService } from "./services/transactionsDataService";
import { TimePeriod } from "./types/revenue.types";

/**
 * Transactions Container Component
 * Single Responsibility: Manages transactions chart display
 * Dependency Inversion Principle: Depends on abstractions (services, types)
 */
const TransactionsContainer = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Yearly");

    // Memoize transactions data
    const transactionsChartData = useMemo(
        () => TransactionsDataService.getDataByPeriod(selectedPeriod),
        [selectedPeriod]
    );

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div>
                <PageBreadcrumb
                    pageTitle="Transactions"
                    pageDescription="Real-time transactions based on sources"
                />
            </div>

            {/* Transactions Section */}
            <div className="rounded-2xl border border-white/10 dark:bg-[#111B23] p-6 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)]">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Transactions</h2>
                        <p className="text-sm text-gray-400">Real-time transactions based on sources</p>
                    </div>
                    <TimePeriodToggle
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={setSelectedPeriod}
                    />
                </div>

                {/* Transactions Chart */}
                <div className="w-full">
                    <TransactionsChart
                        data={transactionsChartData}
                        period={selectedPeriod}
                        config={{
                            shooterColor: "#5952FF",
                            racingColor: "#E67A00",
                            gridColor: "rgba(255, 255, 255, 0.05)",
                            textColor: "#9CA3AF",
                            activeDotColor: "#FFFFFF",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TransactionsContainer;
