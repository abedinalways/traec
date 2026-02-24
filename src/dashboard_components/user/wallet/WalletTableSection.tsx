
"use client"
import { RefreshIcon } from "@/src/icons";
import { Button } from "../../ui/button";
import SelectField, { SelectOption } from "../../ui/input/searchInput/SelectField";
import { useState } from "react";
import CompitiveRoomTable from "../../tables/CompitiveRoomTable";
import WalletHistoryTable from "../../tables/WalletHistoryTable";

export default function WalletTableSection() {
    const [selected, selectedValue] = useState("");
    const [selectedGame, setSelectedGame] = useState("");
    const selectOptions: SelectOption[] = [
        { value: "10", label: "UP TO 10" },
        { value: "10-20", label: "10-20" },
        { value: "20-30", label: "20-30" },
    ];
    const selectTypeOption = [
        { value: "", label: "All GAMES" },
        { value: "Shooter", label: "SHOOTER" },
        { value: "raching", label: "RACHING" }
    ]

    return (
        <section className="w-full rounded-xl border border-[#26344B] bg-gradient-to-b from-[#111B23] to-[#0B111B] p-4 sm:p-6 space-y-4">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-white text-base font-semibold">
                        Wallet History
                    </h3>
                    <p className="text-sm text-gray-400">
                        View all your transaction details
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <SelectField
                        options={selectTypeOption}
                        placeholder="All Assets"
                        value={selectedGame}
                        onChange={setSelectedGame}
                        wrapperClassName="min-w-[140px]"
                    />

                    <SelectField
                        options={selectOptions}
                        placeholder="All Types"
                        value={selected}
                        onChange={selectedValue}
                        wrapperClassName="min-w-[160px]"
                    />

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 rounded-xl bg-[#1A1D2D] border border-gray-600/30 hover:bg-[#1A1D2D]/80 hover:border-gray-500/40 transition"
                    >
                        <RefreshIcon className="h-4 w-4 text-gray-400" />
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-[#26344B] bg-[#0B111B]">
                <WalletHistoryTable/>
            </div>

        </section>

    )
}