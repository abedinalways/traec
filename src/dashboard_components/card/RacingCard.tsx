export default function RacingCard() {
    return (
        <div
            className="
        relative
        w-full
        rounded-[12px]
        border border-[#f97316]
        p-4 sm:p-6
        bg-[linear-gradient(46deg,rgba(249,115,22,0.3)_0%,rgba(249,115,22,0)_100%)]
        text-white
        "
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-[#f97316] font-medium">
                    {/* Car icon (inline SVG) */}
                    <svg
                        className="w-5 h-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M3 13l2-6a3 3 0 0 1 2.84-2h8.32A3 3 0 0 1 21 7l2 6"
                            stroke="#f97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5 13h14a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2Z"
                            stroke="#f97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7 17a2 2 0 1 0 0 .01M17 17a2 2 0 1 0 0 .01"
                            stroke="#f97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className="tracking-wide text-sm sm:text-base">RACING</span>
                </div>

                {/* Percent */}
                <div className="shrink-0 flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs sm:text-sm font-medium">
                    <span className="text-base leading-none">↗</span>
                    <span>+3%</span>
                </div>
            </div>

            {/* Value */}
            <div className="mt-4 sm:mt-5">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    2,405
                </h2>
                <p className="mt-1 text-sm sm:text-base text-white/70">
                    Peak Concurrent Users
                </p>
            </div>
        </div>
    );
}
