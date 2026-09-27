// import { RoomStatus } from "../tables/CompitiveRoomTable";

// export const ActionButton = ({
//     joined,
//     status,
//     onJoinRoom,
// }: {
//     joined: boolean;
//     status: RoomStatus;
//     onJoinRoom: () => void;
// }) => {


//     return (
//         <button
//             type="button"
//             disabled={joined}
//             onClick={() => {
//                 onJoinRoom();
//             }}
//             className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-semibold border transition ${joined || status === "FULL"
//                     ? "bg-white/5 text-white/30 border-white/10 cursor-not-allowed"
//                     : "bg-transparent text-[#5B5CFF] border-[#5B5CFF]/60 hover:bg-[#5B5CFF]/10"
//                 }`}
//         >
//             {joined ? "Joined" : "Join Room"}
//         </button>

//     );
// };
