type StatCardProps = {
    label: string;
    value: string;
};

function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="w-full min-w-0 rounded-xl bg-[rgba(54,65,83,0.30)] px-4 py-3">
            <p className="text-xs text-white/60">{label}</p>
            <p className="mt-1 truncate text-sm font-semibold text-white">{value}</p>
        </div>
    );
}

export default function PlayersEntryInfo() {
    return (
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4">
            <StatCard label="Players" value="7/9 Joined" />
            <StatCard label="Entry Fee" value="5 USDT" />
        </div>
    );
}
