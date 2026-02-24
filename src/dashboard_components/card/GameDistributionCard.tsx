type DistData = {
    racingPct: number;   // 0-100
    shooterPct: number;  // 0-100
    racingValue: string; // e.g. "23.9K USDT"
    shooterValue: string; // e.g. "12.8K USDT"
};

export default function GameDistributionCard({
    data = {
        racingPct: 58,
        shooterPct: 42,
        racingValue: "23.9K USDT",
        shooterValue: "12.8K USDT",
    },
}: {
    data?: DistData;
}) {
    const { racingPct, shooterPct, racingValue, shooterValue } = data;

    return (
        <div
            className="
            w-full
            rounded-[16px]
            border border-[rgba(54,65,83,0.5)]
            bg-[#111b23]
            px-5 pt-6 pb-5
            shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]
        "
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <span className="text-xl leading-none">📈</span>
                <h3 className="text-white text-xl sm:text-2xl font-medium">
                    Game Distribution
                </h3>
            </div>

            {/* Racing */}
            <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-white/70 text-lg">Racing</p>
                    <p className="text-[#5b5cff] text-lg font-medium">{racingPct}%</p>
                </div>

                {/* Track */}
                <div className="mt-3 w-full rounded-full bg-[rgba(54,65,83,0.3)] p-[0px]">
                    {/* Fill (no fixed width, uses %) */}
                    <div
                        className="h-3 rounded-full bg-[#5b5cff]"
                        style={{ width: `${Math.max(0, Math.min(100, racingPct))}%` }}
                    />
                </div>
            </div>

            {/* Shooter */}
            <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-white/70 text-lg">Shooter</p>
                    <p className="text-[#18b50e] text-lg font-medium">{shooterPct}%</p>
                </div>

                {/* Track */}
                <div className="mt-3 w-full rounded-full bg-[rgba(54,65,83,0.3)]">
                    <div
                        className="h-3 rounded-full bg-[#18b50e]"
                        style={{ width: `${Math.max(0, Math.min(100, shooterPct))}%` }}
                    />
                </div>
            </div>

            {/* Bottom cards */}
            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-[16px] bg-[#1b2733] px-4 py-4 text-center">
                    <p className="text-white/50 text-base sm:text-lg">Racing</p>
                    <p className="mt-2 text-[#5b5cff] text-lg sm:text-2xl font-medium">
                        {racingValue}
                    </p>
                </div>

                <div className="rounded-[16px] bg-[#1b2733] px-4 py-4 text-center">
                    <p className="text-white/50 text-base sm:text-lg">Shooter</p>
                    <p className="mt-2 text-[#18b50e] text-lg sm:text-2xl font-medium">
                        {shooterValue}
                    </p>
                </div>
            </div>
        </div>
    );
}
