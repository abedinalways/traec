import Image from "next/image";

type Winner = {
    id: number;
    name: string;
    amount: string;
    icon: string; 
    rank: 1 | 2 | 3;
};

const winners: Winner[] = [
    { id: 1, name: "DragonSlayer", amount: "2,450 USDT", icon: "/images/dragon.png", rank: 1 },
    { id: 2, name: "SpeedKing", amount: "1,890 USDT", icon: "/images/fire.png", rank: 2 },
    { id: 3, name: "NightHawk", amount: "1,560 USDT", icon: "/images/nightHawk.png", rank: 3 },
];

const rankStyles: Record<1 | 2 | 3, string> = {
    1: "bg-[#6b5a22] text-[#f7c325]",
    2: "bg-[#2f3946] text-[#cbd5e1]",
    3: "bg-[#4a2a17] text-[#f59e0b]",
};

export default function TopWinnersCard() {
    return (
        <div
            className="
        w-full
        rounded-[16px]
        border border-[rgba(54,65,83,0.5)]
        bg-[#111b23]
        px-4 pt-5 pb-6
        shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]
        "
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <Image src="/images/win.png" alt="Trophy" width={24} height={24} />
               
                <h3 className="text-white text-xl sm:text-2xl font-medium">
                    Top Winners Today
                </h3>
            </div>

            {/* List */}
            <div className="mt-5 space-y-4">
                {winners.map((w) => (
                    <div
                        key={w.id}
                        className="
                        flex items-center justify-between gap-3
                        rounded-[16px]
                        bg-[#1b2733]
                        px-5 py-4
                        "
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            <Image src={w.icon} alt={w.name} width={24} height={24} />
                            

                            <div className="min-w-0">
                                <p className="text-white text-lg sm:text-xl font-medium truncate">
                                    {w.name}
                                </p>
                                <p className="text-[#00e676] text-base sm:text-lg font-medium">
                                    {w.amount}
                                </p>
                            </div>
                        </div>

                        <div
                            className={`
                shrink-0
                h-12 w-12
                rounded-full
                grid place-items-center
                text-xl font-semibold
                ${rankStyles[w.rank]}
              `}
                        >
                            #{w.rank}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
