"use client";

import { useState, useMemo } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import RevenueStatsCard from "./components/RevenueStatsCard";
import TimePeriodToggle from "./components/TimePeriodToggle";
import RevenueChart from "./components/RevenueChart";
import TransactionsChart from "./components/TransactionsChart";
import GamePreferenceChart from "./components/GamePreferenceChart";
import { RevenueDataService } from "./services/revenueDataService";
import { TransactionsDataService } from "./services/transactionsDataService";
import { TimePeriod } from "./types/revenue.types";
// import { ShooterIcon, RacingIcon } from "@/src/icons";
import { Wallet } from "lucide-react";
import StatsCard from "../card/StatsCard";
import { RacingIcon, ShooterIcon } from "@/icons";

const AnalyticsContainer = () => {
    const [revenuePeriod, setRevenuePeriod] = useState<TimePeriod>("Monthly");
    const [transactionsPeriod, setTransactionsPeriod] = useState<TimePeriod>("Monthly");

    const revenueChartData = useMemo(
        () => RevenueDataService.getDataByPeriod(revenuePeriod),
        [revenuePeriod]
    );

    const revenueStats = useMemo(() => RevenueDataService.getRevenueStats(), []);

    const transactionsChartData = useMemo(
        () => TransactionsDataService.getDataByPeriod(transactionsPeriod),
        [transactionsPeriod]
    );

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div>
                <PageBreadcrumb
                    pageTitle="Analytics Overview"
                    pageDescription="Deep dive into platform performance, player engagement, and financial metrics."
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatsCard title="Total Active Players" value="12,405" change="+7%" />
                <StatsCard title="Total Room Created (SHOOTER)" value="914" change="+5%" />
                <StatsCard title="Total Room Created (RACING)" value="12" change="-2%" />
                <StatsCard title="Total Revenue" value="2.1M TRX" change="+5%" />
            </div>
            {/* Revenue Section */}
            <div className="rounded-2xl border border-white/10 dark:bg-[#111b23] p-6 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)]">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Revenue</h2>
                        <p className="text-sm text-gray-400">Based on sources</p>
                    </div>
                    <TimePeriodToggle
                        selectedPeriod={revenuePeriod}
                        onPeriodChange={setRevenuePeriod}
                    />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 rounded-xl  p-4 sm:p-6">
                    <RevenueStatsCard
                        icon={<ShooterIcon/>}
                        label="SHOOTER"
                        value={RevenueDataService.formatCurrency(revenueStats.shooter.value)}
                        change={`${revenueStats.shooter.change} ↑`}
                    />
                    <RevenueStatsCard
                        icon={<RacingIcon/>}
                        label="RACING"
                        value={RevenueDataService.formatCurrency(revenueStats.racing.value)}
                        change={`${revenueStats.racing.change} ↑`}
                    />
                    <RevenueStatsCard
                        icon={<Wallet className="w-6 h-6 text-green-400" />}
                        label="NET REVENUE"
                        value={RevenueDataService.formatCurrency(revenueStats.netRevenue.value)}
                        change={`${revenueStats.netRevenue.change} ↑`}
                    />
                </div>

                {/* Revenue Chart */}
                <div className="w-full">
                    <RevenueChart
                        data={revenueChartData}
                        config={{
                            shooterColor: "#5952FF",
                            racingColor: "#E67A00",
                            gridColor: "rgba(255, 255, 255, 0.05)",
                            textColor: "#9CA3AF",
                        }}
                    />
                </div>
            </div>

            {/* Transactions and Game Preference Section - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                {/* Transactions Section */}
                <div className="rounded-2xl border border-white/10 dark:bg-[#111B23] p-6 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)]">
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Transactions</h2>
                            <p className="text-sm text-gray-400">Real-time transactions based on sources</p>
                        </div>
                        <TimePeriodToggle
                            selectedPeriod={transactionsPeriod}
                            onPeriodChange={setTransactionsPeriod}
                        />
                    </div>

                    {/* Transactions Chart */}
                    <div className="w-full">
                        <TransactionsChart
                            data={transactionsChartData}
                            period={transactionsPeriod}
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

                {/* Game Preference Section */}
                <div className="rounded-2xl border border-white/10 dark:bg-[#111B23] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)]">
                    <GamePreferenceChart shooterValue={67} racingValue={33} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsContainer;