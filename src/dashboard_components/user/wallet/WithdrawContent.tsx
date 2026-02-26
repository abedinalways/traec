"use client";

import { useState } from "react";
import { CoinIcon } from "../../../icons";
import { AlertCircle } from "lucide-react";

export default function WithdrawContent() {
    const availableBalance = 12.5;

    const [amount, setAmount] = useState<string>("");
    const [recipient, setRecipient] = useState<string>("");

    const numericAmount = Number(amount);
    const isInsufficient =
        amount !== "" && numericAmount > availableBalance;

    return (
        <div className="space-y-6">

            {/* Asset */}
            <div>
                <p className="text-xs text-gray-400 mb-2">Asset</p>
                <div className="bg-[#13222f] flex items-center gap-2 rounded-md p-3">
                    <CoinIcon />
                    <div>
                        <p className="text-white text-sm font-medium">TRON (TRX)</p>
                        <p className="text-xs text-gray-400">TRC-20 Network</p>
                    </div>
                </div>
            </div>

            {/* Amount */}
            <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Amount</span>
                    <span>Available: {availableBalance.toFixed(2)} TRX</span>
                </div>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className={`w-full bg-[#13222f] rounded-md p-3 text-white text-sm outline-none border
            ${isInsufficient
                            ? "border-red-500"
                            : "border-transparent focus:border-[#5952FF]"
                        }`}
                />

                {/* Error Message */}
                {isInsufficient && (
                    <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                            Insufficient balance. You only have{" "}
                            {availableBalance.toFixed(2)} TRX available.
                        </span>
                    </div>
                )}
            </div>

            {/* Recipient */}
            <div>
                <p className="text-xs text-gray-400 mb-2">
                    Recipient TRX Account
                </p>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Paste TRC-20 wallet address"
                    className="w-full bg-[#13222f] rounded-md p-3 text-white text-sm outline-none focus:border-[#5952FF] border border-transparent"
                />
                <p className="text-yellow-400 text-xs mt-2">
                    ⚠ Ensure the address supports TRC-20 transactions.
                </p>
            </div>

            {/* Button */}
            <button
                disabled={isInsufficient || !amount || !recipient}
                className={`w-full py-3 rounded-md text-sm font-medium transition
            ${isInsufficient || !amount || !recipient
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#5952FF] to-[#7b74ff] text-white hover:opacity-90"
                    }`}
            >
                Request Withdrawal →
            </button>
        </div>
    );
}
