export default function ShooterCard() {
    return (
        <div
            className="
        relative
        w-full
        rounded-[12px]
        border border-[rgba(31,68,249,0.5)]
        p-4 sm:p-6
        bg-[linear-gradient(47deg,rgba(31,68,249,0.3)_0%,rgba(31,68,249,0)_100%)]
        text-white
    "
        >
            {/* Top Row */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-[#1F44F9] font-medium">
                    {/* icon (simple target style) */}
                    <span className="grid place-items-center w-5 h-5 rounded-full border border-[#1F44F9]">
                        <span className="w-2 h-2 rounded-full bg-[#1F44F9]" />
                    </span>

                    <span className="tracking-wide text-sm sm:text-base">SHOOTER</span>
                </div>

                <div className="shrink-0 flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs sm:text-sm font-medium">
                    <span className="text-base leading-none">↗</span>
                    <span>+7%</span>
                </div>
            </div>

            {/* Value + Label */}
            <div className="mt-4 sm:mt-5">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    8,405
                </h2>
                <p className="mt-1 text-sm sm:text-base text-white/70">
                    Peak Concurrent Users
                </p>
            </div>
        </div>
    );
}
