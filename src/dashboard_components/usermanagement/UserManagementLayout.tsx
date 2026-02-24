"use client";


import PageBreadcrumb from "@/src/components/common/PageBreadCrumb";
import StatsCard from "@/src/components/card/StatsCard";
import UserDetailsTable from "@/src/components/tables/BasicTableOne";
import SelectField, {
    SelectOption,
} from "@/src/components/ui/input/searchInput/SelectField";
import SearchInput from "../ui/input/searchInput/SearchInput";
import UserDetails from "../users/UserDetails";
import EmptyUserState from "../users/EmptyUserState";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export type TabType = "transactions" | "matches";



interface UserManagementLayoutProps {
    selectOptions: SelectOption[];
    selectedValue: string;
    onSelectChange: (value: string) => void;
}

export default function UserManagementLayout({
    selectOptions,
    selectedValue,
    onSelectChange,
}: UserManagementLayoutProps) {
    const [sorted, setSorted] = useState("");
    const options = [
        { value: "default", label: "DEFAULT" },
        { value: "oldest", label: "OLDEDEST" },
        { value: "newest", label: "NEWEST" },
    ];
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    return (
        <div className="w-full space-y-6">
            <div>
                <PageBreadcrumb pageTitle="User Management" pageDescription="Manage players, view game history, and handle players." />
            </div>

            {/* ================= STATS CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatsCard title="Total Users" value="12,405" change="+7%" />
                <StatsCard title="Active Now" value="914" change="+5%" />
                <StatsCard title="Suspended" value="12" change="-2%" />
                <StatsCard title="New Users" value="2" change="+5%" />
            </div>

            {/* ================= TABLE + SIDE PANEL ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* -------- LEFT: TABLE -------- */}
                <div className="xl:col-span-8 space-y-4">
                    {/* Toolbar */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <SearchInput
                            placeholder="Search user..."
                            containerClassName="w-full sm:max-w-xs"
                        />

                        <div className="flex gap-2">
                            <SelectField
                                options={selectOptions}
                                placeholder="By Status"
                                value={selectedValue}
                                onChange={onSelectChange}
                            />
                            <SelectField
                                options={options}
                                placeholder="Newest Users"
                                value={sorted}
                                onChange={setSorted}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <UserDetailsTable />
                </div>

                {/* -------- RIGHT: USER DETAILS -------- */}
                <div className="xl:col-span-4">
                    {userId ? <UserDetails /> : <EmptyUserState/>}
                </div>
            </div>
        </div>
    );
}
