
import Image from "next/image";


interface ProfileAvatarProps {
    imageSrc: string;
    isOnline?: boolean;
}

export default function ProfileAvatar({
    imageSrc,
    isOnline = true,
}: ProfileAvatarProps) {
    return (
        <div className="relative w-10 h-10">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-[#98A2B3] flex items-center justify-center overflow-hidden">
                <Image
                    src={imageSrc}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                />

            </div>

            {isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#50E3C2] border-2 border-white dark:border-[#2C2F3F]" />
            )}
        </div>
    );
}
