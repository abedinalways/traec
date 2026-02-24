"use client"
import { RefreshIcon1 } from "@/src/icons";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import { Button } from "../../ui/button";
import RankedDuelArenaCard from "./RankedDuelArenaCard";
import MatchesTabs from "./MatchesTabs";

const OnGoingmatchContainer = () => {
    const rooms = [
        {
            id: 1,
            image: "/images/game-7.jpg",
            status: "In-Game" as const,
            gameType: "SHOOTER",
            arena: "Cyber Arena",
            title: "Ranked Duel Arena",
            roomId: "#8832a",
            entryFee: "5 USDT",
            isJoind: false
        },
        {
            id: 2,
            image: "/images/game_1.jpg",
            status: "Waiting" as const,
            gameType: "RACING",
            arena: "Titan Delta",
            title: "Speed Run Cha tenge: Sector 7",
            roomId: "#8832b",
            entryFee: "10 USDT",
            isJoind: false
        },
        {
            id: 3,
            image: "/images/game_2.jpg",
            status: "In-Game" as const,
            gameType: "SHOOTER",
            arena: "Cyber Arena",
            title: "Neon City Deathmatch",
            roomId: "#8832c",
            entryFee: "12.5 USDT",
            isJoind: true
        },
        {
            id: 4,
            image: "/images/game_3.jpg",
            status: "Waiting" as const,
            gameType: "RACING",
            arena: "Desert Arena",
            title: "Desert Drift Pro",
            roomId: "#8832d",
            entryFee: "8 USDT",
            isJoind: false
        },
        {
            id: 5,
            image: "/images/game_4.jpg",
            status: "In-Game" as const,
            gameType: "SHOOTER",
            arena: "Cyber Core",
            title: "Elite Duel Match",
            roomId: "#8832e",
            entryFee: "15 USDT",
            isJoind: false
        },
    ];

    
    return (
        <div className="space-y-6 w-full">
            <div className="flex justify-between items-center">
                <PageBreadcrumb
                    pageTitle="Ongoing Matches"
                    pageDescription="3 Active sessions"
                    breadcrumbs={[
                        { label: "Dashboard", href: "/user/dashboard" },
                        { label: "Active Matches" },
                    ]}
                />
                <Button onClick={()=>console.log('clicked')} variant="ghost">
                    <RefreshIcon1/> Refresh
                </Button>
            </div>
            <div className="w-full">
                <div className="pb-4">
                    <MatchesTabs/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[4fr_4fr_4fr] gap-4">
                    {rooms.map((room) => (
                        <RankedDuelArenaCard
                            key={room.id}
                            image={room.image}
                            status={room.status}
                            gameType={room.gameType}
                            arena={room.arena}
                            title={room.title}
                            roomId={room.roomId}
                            entryFee={room.entryFee}
                            isjoined={room.isJoind}
                            onJoin={() => {
                                console.log("Join clicked:", room.id);
                            }}
                        />
                    ))}
                </div>

        

            </div>
            
        </div>
    )
}
export default OnGoingmatchContainer;