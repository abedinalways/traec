 

import { Copy } from "lucide-react";


export default function DepositContent({ walletAddress }: { walletAddress: string }) {
    return (
        <div className="space-y-6">

            {/* Asset */}
            <div>
                <p className="text-xs text-gray-400 mb-2">Asset</p>
                <div className="bg-[#13222f] flex items-center gap-2 rounded-md p-3">
                    
                    <div>
                        <p className="text-white text-sm font-medium">TRON (TRX)</p>
                        <p className="text-xs text-gray-400">TRC-20 Network</p>
                </div>
                </div>
            </div>

            {/* QR Section */}
            <div
                className="flex flex-col items-center gap-10 self-stretch
                    pt-[3.75rem] px-6 pb-8
                    border border-dashed border-[#545454]
                    rounded-lg bg-[#0B151D]"
                >
                <div className="w-full max-w-[200px]">
                   
                </div>

                <p className="text-xs text-gray-400 text-center">
                    Scan QR code or copy address to deposit TRX
                </p>

                {/* Address Box */}
                <div className="w-full bg-[#13222f] rounded-md px-3 py-2 flex items-center gap-3">
                    <span className="text-xs text-gray-300 truncate min-w-0 flex-1">
                        {walletAddress}
                    </span>
                    <button className="shrink-0">
                        <Copy className="w-4 h-4 text-[#5952FF] cursor-pointer" />
                    </button>
                </div>

            </div>

            {/* Warning */}
            <div className="bg-yellow-900/20 border border-yellow-500/40 text-yellow-400 text-xs p-3 rounded-md">
                ⚠ Send only TRX to this deposit address. Sending any other coin or
                token may result in permanent loss.
            </div>
        </div>
    );
}
