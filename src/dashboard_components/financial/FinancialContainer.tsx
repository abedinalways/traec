"use client";

import { useState } from "react";
import StatsCard from "../card/StatsCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import SearchInput from "../ui/input/searchInput/SearchInput";
import SelectField, { SelectOption } from "../ui/input/searchInput/SelectField";
import { RefreshIcon } from "@/src/icons";
import { Button } from "../ui/button";
import FinancialTable from "../tables/FinancialTable";

const FinancialContainer = () => {
    const statusOptions: SelectOption[] = [
        { value: "all", label: "All Status" },
        { value: "completed", label: "Completed" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
    ];

    const timeOptions: SelectOption[] = [
        { value: "24h", label: "Last 24h" },
        { value: "7d", label: "Last 7 days" },
        { value: "30d", label: "Last 30 days" },
        { value: "all", label: "All time" },
    ];

    const entryFeeOptions: SelectOption[] = [
        { value: "any", label: "Any Entry Fee" },
        { value: "0-50", label: "$0 - $50" },
        { value: "50-100", label: "$50 - $100" },
        { value: "100+", label: "$100+" },
    ];

    const [statusFilter, setStatusFilter] = useState("");
    const [timeFilter, setTimeFilter] = useState("");
    const [entryFeeFilter, setEntryFeeFilter] = useState("");

    return <div className="w-full space-y-4">
        <div>
            <PageBreadcrumb pageTitle="Financial Overview" pageDescription="Manage all the financial details all in one place." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatsCard title="Total Earnings" value="4.2M TRX" change="+7%" />
            <StatsCard title="Prizes Distributed" value="2.1M TRX" change="+5%" />
            <StatsCard title="Accepted Withdrawals" value="1.5M TRX" change="+5%" />
            <StatsCard title="Declined Withdrawals" value="312K TRX" change="-2%" />
        </div>
        {/* Game Category Tabs */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-full space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <SearchInput
                        placeholder="Search by user..."
                        containerClassName="w-full sm:max-w-xs md:max-w-sm lg:max-w-md"
                    />

                    <div className="flex gap-2">
                        <SelectField
                            options={statusOptions}
                            placeholder="All Status"
                            value={statusFilter}
                            onChange={setStatusFilter}
                        />
                        <SelectField
                            options={timeOptions}
                            placeholder="Last 24h"
                            value={timeFilter}
                            onChange={setTimeFilter}
                        />
                        <SelectField
                            options={entryFeeOptions}
                            placeholder="Any Entry Fee"
                            value={entryFeeFilter}
                            onChange={setEntryFeeFilter}
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl h-11 px-3 py-2 bg-[#1A1D2D] border border-gray-600/30 hover:bg-[#1A1D2D]/80 hover:border-gray-500/40 transition-colors"
                        >
                            <RefreshIcon className="text-gray-400" />
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <FinancialTable />
            </div>

        </div>
    </div>;
};

export default FinancialContainer;