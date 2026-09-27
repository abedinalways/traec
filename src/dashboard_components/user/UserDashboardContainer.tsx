
"use client"
import { useState } from "react";
import GameDistributionCard from "../card/GameDistributionCard";
import StatsCard from "../card/StatsCard";
import TopWinnersCard from "../card/TopWinnersCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import LiveGamesRoomTable from "../tables/LiveGamesRoomTable";
import RecentPlayedGamesTable from "../tables/RecentPlayedGamesTable";
import RecentWalletActivityTable from "../tables/RecentWalletActivityTable";
import LiveRoomPreviewCard from "./LiveRoomPreviewCard";
import RecentPlayedGames from "./RecentPlayedGames";
import RecentWalletActivityEmpty from "./RecentWalletActivityEmpty";
import LiveRoomDataCard from "../card/LiveRoomDataCard";

import { useRouter } from "next/navigation";

const UserDashboardContainer = () => {
    const router = useRouter()
    const [browse, setBrowse] = useState(false);
    const [isTransaction, setisTransaction] = useState(false)
    const [isLivePreview, setLivePreview] = useState(false)

    return (
        <div className="w-full min-w-0 max-w-[1920px] mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-3 lg:px-4">
            <div className="min-w-0">
                <PageBreadcrumb
                    pageTitle="Welcome to GAME ARENA, Jannatul!"
                    pageDescription="Ready to start your first game? Here is what's happening in the gaming world today."
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatsCard title="Total matches played" value="0" change="" />
                <StatsCard title="Total won" value="0" change="" />
                <StatsCard title="Total winnings " value="$0.00" change="" />
                <StatsCard title="Win rate" value="0.0%" change="" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] 2xl:grid-cols-[1fr_380px] gap-4 lg:gap-6 min-w-0">
                <div className="min-w-0 flex flex-col gap-4">
                    <div className="min-w-0 overflow-x-auto">
                        <LiveGamesRoomTable />
                    </div>
                    <div>
                        {!isTransaction ? (
                            <RecentWalletActivityEmpty onTransaction={() => setisTransaction(true)} />
                        ) : (
                            <div>
                                <RecentWalletActivityTable />
                            </div>
                        )}
                    </div>
                    <div>
                        {
                            !browse ? (
                                <RecentPlayedGames onBrowse={() => setBrowse(true)} />
                            ) : (
                                <div>
                                    <RecentPlayedGamesTable />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="w-full min-w-0 lg:min-w-[320px] xl:min-w-[360px] 2xl:min-w-[380px]">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {isLivePreview ? <LiveRoomDataCard
                            roomName="Cyber Arena"
                            roomId="#402DJKIUH"
                            gameType="Shooter"
                            entryFee="$10.00"
                            players="8/10"
                            onViewMore={() => router.push(`/user/dashboard/live`)}
                        /> : <LiveRoomPreviewCard onLivePreview={() => setLivePreview(true)} />}

                        <TopWinnersCard />
                        <GameDistributionCard />
                        {/* <CurrentStreakCard
                            history={["loss", "loss", "win", "win", "win", "win", "win", "loss", "win", "loss", "win", "win", "win", "loss", "loss", "loss", "loss"]}
                        /> */}

                    </div>

                </div>

            </div>
        </div>
    )

}
export default UserDashboardContainer;