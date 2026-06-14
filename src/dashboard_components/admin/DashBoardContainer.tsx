"use client";

import { useState, useMemo } from "react";
import StatsCard from "../card/StatsCard";
import PageBreadcrumb from "../common/PageBreadCrumb";

import { GameEngagementDataService } from "../analytics/services/gameEngagementDataService";
import { TransactionVolumeDataService } from "../analytics/services/transactionVolumeDataService";
import { TimeRange } from "../analytics/types/engagement.types";

import PeopleIcon from "@/icons/PeopleIcon";
import ReveneuIcon from "@/icons/RevenueIcon";
import BoxIcon from "@/icons/BoxIocn";
import ReportIcon from "@/icons/ReportIcon";
import SalesDetailsCard from "../card/SalesDetailsCard";
import SubscriptionDetailsCard from "../card/SubscriptionDetailsCard";
import UserSummaryTable from "../tables/UserSummaryTable";
import { useGetDashboardOverviewQuery } from "@/app/api/admin/admin-dashboard/dashboardApi";

const DashBoardContainer = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("24H");
  const [txVolumeTimeRange, setTxVolumeTimeRange] = useState<TimeRange>("24H");
  const [filter, setFilter] = useState<"yearly" | "monthly">("yearly");
  const { data, isLoading } = useGetDashboardOverviewQuery(filter);
  const engagementData = useMemo(
    () => GameEngagementDataService.getDataByRange(timeRange),
    [timeRange]
  );
  const transactionVolumeData = useMemo(
    () => TransactionVolumeDataService.getDataByRange(txVolumeTimeRange),
    [txVolumeTimeRange]
  );

  return (
    <div className="w-full min-w-0 max-w-[1920px]  mx-auto space-y-2 sm:space-y-6  sm:px-4 md:px-3 lg:px-4">
      <div className="min-w-0">
        <PageBreadcrumb
          pageTitle="Overview"
          pageDescription="Oversee and control user accounts"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          title="Total Users"
          value={data?.overview?.total_users ?? 0}
          icon={<PeopleIcon />}
        />

        <StatsCard
          title="Total Revenue"
          value={data?.overview?.total_revenue ?? "$0"}
          icon={<ReveneuIcon />}
        />

        <StatsCard
          title="Active Orders"
          value={data?.overview?.active_orders ?? 0}
          icon={<BoxIcon />}
        />

        <StatsCard
          title="Reviews or Reports"
          value={0}
          icon={<ReportIcon />}
        />
      </div>
      {/* stats */}
      <div className="">
        <div className="lg:col-span-2">
          <SalesDetailsCard
            filter={filter}
            onFilterChange={setFilter}
            salesData={data?.sales_details}
          />
        </div>

      </div>
      {/* table */}
      <UserSummaryTable />
    </div>
  );
};

export default DashBoardContainer;