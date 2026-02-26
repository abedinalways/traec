// import { FeaturedIcon } from "@/src/icons";
// import LiveBattleCard from "../../card/LiveBattleCard";
// import TournamentBannerCard from "../../card/TournamentBannerCard";
// import PageBreadcrumb from "../../common/PageBreadCrumb";
// import ActiveCompititiveRoomTableSection from "./ActiveCompititiveRoomTableSection";

// export default function LiveMainContainer ()
// {
//     return (
//         <div className="space-y-6 w-full">
//             <div>
//                 <PageBreadcrumb
//                     pageTitle="Live Matches & Streams"
//                     pageDescription="Watch top tier gameplay or find a room to join instantly."
//                     breadcrumbs={[
//                         { label: "Dashboard", href: "/user/dashboard" },
//                         { label: "Live" },
//                     ]}
//                 />
//             </div>
//             <div className="w-full">
//                 <div className="flex gap-3 items-center pb-3">
//                     <FeaturedIcon/>
//                     <h3 className="text-[1.25rem] text-[#C1C2C5]">Featured Streams</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-[4fr_4fr_4fr] gap-4">
//                     <div className="w-full">
//                         <LiveBattleCard
//                             image="/images/shooterImage.png"
//                             category="SHOOTER"
//                             title="Grand Finals: Neon City Battle"
//                             host="ProGamer_XYZ"
//                             viewers="9.1k"
//                             category2="Cyber Arena"
//                         />
//                     </div>
//                     <div className="w-full">
//                         <LiveBattleCard
//                             image="/images/carracing.png"
//                             category="RACING"
//                             title="Speed Run Cha tenge: Sector 7"
//                             host="DriftKing99"
//                             viewers="8.1k"
//                             category2="Titan Delta"
//                         />
//                     </div>
//                     <div className="w-full">
//                         <TournamentBannerCard/>
//                     </div>

//                 </div>
//             </div>
//             <div>
//                 <ActiveCompititiveRoomTableSection/>
//             </div>

//         </div>
//     )
// }

