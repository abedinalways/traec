"use client";

import { useState } from "react";
import DepositContent from "./DepositContent";
import WithdrawContent from "./WithdrawContent";

export default function WalletTabs() {
    const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

    const walletAddress = "0x71C7656EC7ab8efB7401B5fd6...";

    return (
        <div className="w-full bg-[#0e1a24] rounded-lg border border-[#1f2a37] p-4">


            <div
                className="flex justify-center items-start gap-2 self-stretch pt-4 pb-6"
            >
                <button
                    onClick={() => setActiveTab("deposit")}
                    className={`flex flex-1 justify-center items-center 
                        pt-1 pb-2 px-2.5 text-sm transition
            ${activeTab === "deposit"
                            ? "border-b-[1.5px] border-[#5952FF] text-white"
                            : "text-gray-400"
                        }`}
                >
                    Deposit
                </button>
                <button
                    onClick={() => setActiveTab("withdraw")}
                    className={`flex flex-1 justify-center items-center 
                        pt-1 pb-2 px-2.5 text-sm transition
            ${activeTab === "withdraw"
                            ? "border-b-[1.5px] border-[#5952FF] text-white"
                            : "text-gray-400"
                        }`}
                >
                    Withdraw
                </button>
            </div>
            {activeTab === "deposit" ? (
                <DepositContent walletAddress={walletAddress} />
            ) : (
                <WithdrawContent />
            )}
        </div>
    );
}
