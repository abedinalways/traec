"use client";

import { useState } from "react";
import StatsCard from "../card/StatsCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import SearchInput from "../ui/input/searchInput/SearchInput";
import SelectField, { SelectOption } from "../ui/input/searchInput/SelectField";
import { AllGamesIcon, RacingIcon, RefreshIcon, ShooterIcon } from "@/src/icons";
import { Button } from "../ui/button";
import GamesRoomTable from "../tables/GamesRoomTable";

const GameRoomsContainer = () => {
    const selectOptions: SelectOption[] = [
        { value: "active", label: "Active" },
        { value: "suspended", label: "Suspended" },
        { value: "disabled", label: "Disabled" },
    ];

    const [selected, selectedValue] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "shooter" | "racing">("all");
    return <div className="w-full space-y-4">
        <div>
            <PageBreadcrumb pageTitle="Game Rooms" pageDescription="Monitor active sessions, manage server loads, and control room states." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatsCard title="Total Active Rooms" value="405" change="+7%" />
            <StatsCard title="Players Online" value="1914" change="+5%" />
            <StatsCard title="Total Shooter Game Rooms" value="372" change="+5%" />
            <StatsCard title="Total Racing Game Rooms" value="312" change="-2%" />
        </div>
        {/* Game Category Tabs */}
        <div className="w-full">
            <div className="flex items-center gap-1 p-1 rounded-md bg-[#2E3340] w-full">
                {/* ALL GAMES Tab */}
                <button
                    onClick={() => setActiveTab("all")}
                    className={`flex items-center gap-2 px-5 py-3 rounded-md font-medium text-sm uppercase tracking-wide transition-all duration-200 flex-1 justify-center min-w-0 ${activeTab === "all"
                            ? "text-white shadow-sm"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                    style={
                        activeTab === "all"
                            ? {
                                background:
                                    "linear-gradient(47deg, rgba(135, 145, 165, 0.8) 0%, rgba(106, 114, 130, 0.5) 100%)",
                            }
                            : { background: "rgba(26, 29, 45, 0.5)" }
                    }
                >
                    <AllGamesIcon  />
                    <span className="whitespace-nowrap">ALL GAMES</span>
                </button>

                {/* SHOOTER Tab */}
                <button
                    onClick={() => setActiveTab("shooter")}
                    className={`flex items-center gap-2 px-5 py-3 rounded-md font-medium text-sm uppercase tracking-wide transition-all duration-200 flex-1 justify-center min-w-0 ${activeTab === "shooter"
                            ? "text-white shadow-sm"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                    style={
                        activeTab === "shooter"
                            ? {
                                background:
                                    "linear-gradient(47deg, rgba(89, 82, 255, 0.6) 0%, rgba(31, 68, 249, 0.2) 100%)",
                            }
                            : { background: "rgba(26, 29, 45, 0.5)" }
                    }
                >
                    
                    <ShooterIcon  />
                    <span className="whitespace-nowrap">SHOOTER</span>
                </button>

                {/* RACING Tab */}
                <button
                    onClick={() => setActiveTab("racing")}
                    className={`flex items-center gap-2 px-5 py-3 rounded-md font-medium text-sm uppercase tracking-wide transition-all duration-200 flex-1 justify-center min-w-0 ${activeTab === "racing"
                            ? "text-white shadow-sm"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                    style={
                        activeTab === "racing"
                            ? {
                                background:
                                    "linear-gradient(47deg, rgba(230, 122, 0, 0.8) 0%, rgba(196, 62, 0, 0.5) 100%)",
                            }
                            : { background: "rgba(26, 29, 45, 0.5)" }
                    }
                >
                    {/* <Car className="w-4 h-4 shrink-0" />
                     */}
                    <RacingIcon />
                    <span className="whitespace-nowrap">RACING</span>
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-full space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <SearchInput
                        placeholder="Search by rooms..."
                        containerClassName="w-full sm:max-w-xs md:max-w-sm lg:max-w-md"
                    />

                    <div className="flex gap-2">
                        <SelectField
                            options={selectOptions}
                            placeholder="All Status"
                            value={selected}
                            onChange={selectedValue}
                        />
                        <SelectField
                            options={selectOptions}
                            placeholder="Any Entry Fee"
                            value={selected}
                            onChange={selectedValue}
                        />
                        <Button 
                            variant="outline" 
                            size="icon"
                            className="rounded-xl h-11 px-3 py-2 bg-[#1A1D2D] border border-gray-600/30 hover:bg-[#1A1D2D]/80 hover:border-gray-500/40 transition-colors"
                        >
                            <RefreshIcon className=" text-gray-400" />
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <GamesRoomTable />
            </div>

        </div>
    </div>;
};

export default GameRoomsContainer;