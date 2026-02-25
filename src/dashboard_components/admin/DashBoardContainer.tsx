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
            value="2.3M"
            change="+12.5%"
            icon={<PeopleIcon />}
          />
          <StatsCard
            title="Total Revenue"
            value="$24,560"
            change="+9%"
            icon={<ReveneuIcon />}
          />
          <StatsCard
            title="Active Orders"
            value="200"
            change="+8.2%"
            icon={<BoxIcon />}
          />
          <StatsCard
            title="Reviews or Reports"
            value="80"
            change="-12.5%"
            icon={<ReportIcon />}
          />
        </div>
        {/* stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesDetailsCard/>
          </div>
          <div>
            <SubscriptionDetailsCard />
          </div>
        </div>
        {/* table */}
        <UserSummaryTable/>
      </div>
    );
};

export default DashBoardContainer;