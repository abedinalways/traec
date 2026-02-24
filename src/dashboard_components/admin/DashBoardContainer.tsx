"use client";

import { useState, useMemo } from "react";
import StatsCard from "../card/StatsCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import GameEngagementChart from "../analytics/components/GameEngagementChart";
import TransactionVolumeChart from "../analytics/components/TransactionVolumeChart";
import TimeRangeToggle from "../analytics/components/TimeRangeToggle";
import { GameEngagementDataService } from "../analytics/services/gameEngagementDataService";
import { TransactionVolumeDataService } from "../analytics/services/transactionVolumeDataService";
import { TimeRange } from "../analytics/types/engagement.types";
import ShooterCard from "../card/ShooterCard";
import RacingCard from "../card/RacingCard";
import TopWinnersCard from "../card/TopWinnersCard";
import GameDistributionCard from "../card/GameDistributionCard";
import RecentActivity from "../card/RecentActivity";
import PendingWithdrawalTable from "../tables/PendingWithdrawalTable";

const DashBoardContainer = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>("24H");
    const [txVolumeTimeRange, setTxVolumeTimeRange] = useState<TimeRange>("24H");

    const engagementData = useMemo(
        () => GameEngagementDataService.getDataByRange(timeRange),
        [timeRange]
    );
    const transactionVolumeData = useMemo(
        () => TransactionVolumeDataService.getDataByRange(txVolumeTimeRange),
        [txVolumeTimeRange]
    );

    return (
      <div className="w-full min-w-0 max-w-[1920px] bg-gray-50 mx-auto space-y-2 sm:space-y-6  sm:px-4 md:px-3 lg:px-4">
        <div className="min-w-0">
          <PageBreadcrumb
            pageTitle="Overview"
            pageDescription="Oversee and control user accounts"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatsCard title="Total Players" value="12,405" change="+7%" />
          <StatsCard title="Active Games" value="14" change="+5%" />
          <StatsCard title="Platform Balance" value="12.4M TRX" change="-2%" />
          <StatsCard title="Pending Withdrawals" value="12" change="+5%" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] 2xl:grid-cols-[1fr_380px] gap-4 lg:gap-6 min-w-0">
          <div className="min-w-0 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 dark:bg-[#111B23] p-4 sm:p-5 md:p-6 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)] min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 truncate">
                    Game Engagement: Shooter vs Racing
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Players insights
                  </p>
                </div>
                <TimeRangeToggle
                  selectedRange={timeRange}
                  onRangeChange={setTimeRange}
                />
              </div>

              <div className="flex items-center gap-4 sm:gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: "#5952FF" }}
                  />
                  <span className="text-xs sm:text-sm text-gray-300">
                    Shooter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: "#E67A00" }}
                  />
                  <span className="text-xs sm:text-sm text-gray-300">
                    Racing
                  </span>
                </div>
              </div>
              <div className="w-full min-w-0 overflow-hidden">
                <GameEngagementChart
                  data={engagementData}
                  timeRange={timeRange}
                  config={{
                    shooterColor: "#5952FF",
                    racingColor: "#E67A00",
                    gridColor: "rgba(255, 255, 255, 0.05)",
                    textColor: "#9CA3AF",
                  }}
                />
              </div>
            </div>
            <div className="min-w-0 overflow-x-auto">
              <PendingWithdrawalTable />
            </div>

            <div className="rounded-2xl border border-white/10 dark:bg-[#111B23] p-4 sm:p-5 md:p-6 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.4)] min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 truncate">
                    Transaction Volume
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Real-time engagement metrics
                  </p>
                </div>
                <TimeRangeToggle
                  selectedRange={txVolumeTimeRange}
                  onRangeChange={setTxVolumeTimeRange}
                />
              </div>
              <div className="flex items-center gap-4 sm:gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: "#5952FF" }}
                  />
                  <span className="text-xs sm:text-sm text-gray-300">
                    Shooter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: "#E67A00" }}
                  />
                  <span className="text-xs sm:text-sm text-gray-300">
                    Racing
                  </span>
                </div>
              </div>
              <div className="w-full min-w-0 overflow-hidden">
                <TransactionVolumeChart
                  data={transactionVolumeData}
                  timeRange={txVolumeTimeRange}
                  config={{
                    shooterColor: "#5952FF",
                    racingColor: "#E67A00",
                    gridColor: "rgba(255, 255, 255, 0.05)",
                    textColor: "#9CA3AF",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full min-w-0 lg:min-w-[320px] xl:min-w-[360px] 2xl:min-w-[380px]">
            <div className="flex flex-col gap-3 sm:gap-4">
              <ShooterCard />
              <RacingCard />
              <RecentActivity />
              <TopWinnersCard />
              <GameDistributionCard />
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashBoardContainer;