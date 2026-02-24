import clsx from "clsx";
import ProfileAvatar from "./ProfileAvatar";

export  function Matches() {
    const data = [
        { title: "Arena Battle", status: "ONGOING",},
        { title: "Deathmatch", status: "ONGOING" },
        { title: "Arena Shooter", status: "WIN", },
        { title: "Deathmatch", status: "LOSS" },
        { title: "Deathmatch", status: "ONGOING" },
    ];

    const statusStyle: Record<string, string> = {
        WIN: "bg-green-500/20 text-green-400",
        LOSS: "bg-red-500/20 text-red-400",
        ONGOING: "bg-indigo-500/20 text-indigo-400",
    };

    return (
        <div className=" md:p-4 p-2">
            <p className="text-xs uppercase text-gray-400">Recent Matches</p>
            <div className="max-h-[348px] space-y-3 p-2  overflow-y-scroll custom-scrollbar">

            {data.map((item, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg  bg-gray-200 dark:bg-[#18222A] p-3"
                >
                    <div className="flex space-x-3">
                        <div>
                            <ProfileAvatar
                                imageSrc="/sidebar/profile_img.jpg"
                                isOnline={false}
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-700 dark:text-white">{item.title}</p>
                            <p className="text-xs text-gray-400">Room ID: #847995</p>
                        </div>
                    </div>

                    <span
                        className={clsx(
                            "rounded-full px-2 py-0.5 text-xs",
                            statusStyle[item.status]
                        )}
                    >
                        {item.status}
                    </span>
                </div>
            ))}
            </div>
        </div>
    );
}
