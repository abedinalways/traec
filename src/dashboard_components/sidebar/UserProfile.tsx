"use client";
import React from "react";
import { Logout, VerifyIcon } from "../../icons/index";

import ProfileAvatar from "../users/ProfileAvatar";

interface UserProfileProps {
  name: string;
  id: string;
  onLogout?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  id,
  onLogout,
}) => {
  return (
    <div className="px-3 pb-4 border-t border-gray-200 border-dashed dark:border-[#2C2F3F]">
      <div className="mt-4 p-3 rounded-lg bg-white dark:bg-[#2C2F3F] border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none">
        <div className="flex items-center gap-3 ">
          <ProfileAvatar imageSrc="/sidebar/profile_img.jpg" isOnline={true} />

          <div className="flex-1 min-w-0 relative">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {name}
              </p>
              <p className="text-xs text-gray-600 dark:text-[#98A2B3]">
                ID #{id}
              </p>
            </div>
            <VerifyIcon className="absolute top-0 right-10 w-5 h-5" />
          </div>
          <button
            onClick={onLogout}
            className="text-gray-600 dark:text-[#98A2B3] hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Logout"
          >
            <Logout className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
