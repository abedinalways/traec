"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Settings } from "lucide-react"; // Or your custom icon

import LogoutIcon from "@/components/icons/LogoutIcon";

interface UserProfileProps {
  onLogout?: () => void;
  name: string;
  id: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({name, id }) => {
  const pathname = usePathname();
  const router = useRouter();
  const onLogout = () => {
    localStorage.removeItem("role");
    router.push("/");
  };
  // Check if the current URL matches the settings route
  const isActive = pathname === "/admin/dashboard/settings-security";

  return (
    <div className="px-4 pb-6 space-y-3 mt-auto">
      {/* Settings & Security Link */}
      <Link href="/admin/dashboard/settings-security" className="block w-full ">
        <button
          className={`flex items-center gap-3 w-full p-4 rounded-[10px] transition-all  ${
            isActive
              ? "bg-[#030914] text-white shadow-md"
              : " text-[#1D2433]  cursor-pointer"
          }`}
        >
          <Settings
            size={20}
            className={isActive ? "text-white" : "text-gray-500"}
          />
          <span className="md:text-[14px] font-medium">
            Settings & Security
          </span>
        </button>
      </Link>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 w-full p-2 rounded-full cursor-pointer bg-white border border-gray-100 text-[#1D2433] hover:bg-gray-50 transition-all shadow-sm"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-black  rounded-full aspect-square object-cover cursor-pointer">
          <LogoutIcon className="bg-black rounded-full w-8 h-8 aspect-square object-cover" />
        </div>
        <span className="text-[14px] font-medium">Logout</span>
      </button>
    </div>
  );
};
