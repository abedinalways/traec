"use client"
import { useState } from "react";
import SelectField, { SelectOption } from "../../ui/input/searchInput/SelectField";
import { Button } from "../../ui/button";

import SearchInput from "../../ui/input/searchInput/SearchInput";
import MatchHistoryTable from "../../tables/MatchHistoryTable";

export default function HistoryContainerTableSection() {
        const [selected, selectedValue] = useState("");
        const [selectedGame, setSelectedGame] = useState("");
        const selectTypeOption = [
            { value: "", label: "All GAMES" },
            { value: "Shooter", label: "SHOOTER" },
            {value:"raching", label:"RACHING"}
        ]
    const outComesOptions = [
        { value: "", label: "All OutComes" },
        { value: "VICTORY", label: "VICTORY" },
        { value: "DEFEAT", label: "DEFEAT" },
    ];
    const TimeOptions = [
        { value: "", label: "All" },
        { value: "last7days", label: "Last 7 Days" },
        { value: "last20days", label: "Last 20 Days" },
        { value: "last30days", label: "Last 30 Days" },
    
    ]
    return (
        <section className="w-full rounded-xl border border-[#26344B] bg-gradient-to-b from-[#111B23] to-[#0B111B] p-4 sm:p-6 space-y-4">

            {/* Header + Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <SearchInput
                        placeholder="Search by game..."
                        containerClassName="w-full sm:max-w-xs"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <SelectField
                        options={TimeOptions}
                        placeholder="Last 7 days"
                        value={selectedGame}
                        onChange={setSelectedGame}
                        wrapperClassName="min-w-[140px]"
                    />
                    <SelectField
                        options={selectTypeOption}
                        placeholder="All Games Type"
                        value={selectedGame}
                        onChange={setSelectedGame}
                        wrapperClassName="min-w-[140px]"
                    />
                    <SelectField
                        options={outComesOptions}
                        placeholder="All OutComes"
                        value={selected}
                        onChange={selectedValue}
                        wrapperClassName="min-w-[160px]"
                    />

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 rounded-xl bg-[#1A1D2D] border border-gray-600/30 hover:bg-[#1A1D2D]/80 hover:border-gray-500/40 transition"
                    >
                        
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-[#26344B] bg-[#0B111B]">
                
                <MatchHistoryTable/>
            </div>

        </section>
    )
}