"use client";



export default function TournamentBannerCard() {
    return (
        <section className="relative w-full h-full rounded-xl border border-[#26344B] bg-[linear-gradient(94deg,#2B2B74_6.01%,#10182D_97.78%)] overflow-hidden">

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-3 px-4 py-5 sm:px-6 sm:py-6 max-w-2xl">

                <h4 className="text-[#5952FF] text-sm font-medium leading-[140%] tracking-[0.00438rem]">
                    TOURNAMENT
                </h4>

                <h2 className="text-white text-xl sm:text-2xl font-bold leading-[130%] tracking-[0.0075rem]">
                    Winter Championship
                </h2>

                <p className="text-[#BDBDBD] text-sm font-medium leading-[140%] tracking-[0.00438rem]">
                    Register now for the biggest prize pool of the season. Starts in 2 days.
                </p>

                <div className="pt-4">
                    <button className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#5952FF] hover:bg-white/90 transition">
                        Discover Teams
                    </button>
                </div>
            </div>

            {/* Background Icon */}
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2  ">
               
            </div>
        </section>
    );
}
