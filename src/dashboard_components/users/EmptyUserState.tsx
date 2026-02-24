import { EmptyUserStateIcon } from "@/src/icons";

export default function EmptyUserState() {
    return (
        <div className="flex h-full flex-col rounded-2xl bg-gray-200 dark:bg-[#202020]">
            {/* Header */}
            <div className=" px-4 py-3">
                <h3 className="text-[1.25rem] font-medium text-gray-600 dark:text-[#C1C2C5]">
                    User Details
                </h3>
            </div>

            <div className="p-6  ">
                {/* Content */}
                <div className="flex flex-1 h-[70vh] rounded-lg flex-col bg-gray-400 dark:bg-[#232323] items-center justify-center text-center ">
                    {/* Icon */}
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full ">
                        <EmptyUserStateIcon className=" text-gray-400" />
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-medium dark:text-white text-gray-600">
                        Select a User
                    </h4>

                    {/* Subtitle */}
                    <p className="mt-1 max-w-xs text-sm text-gray-400 leading-relaxed">
                        To view details of a user, please select one.
                    </p>
                </div>
            </div>
        </div>
    );
}
