"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react"; // Or your custom icon
import { Logout } from "../../icons/index";

interface UserProfileProps {
  onLogout?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const pathname = usePathname();

  // Check if the current URL matches the settings route
  const isActive = pathname === "/admin/dashboard/settings-security";

  return (
    <div className="px-4 pb-6 space-y-3 mt-auto">
      {/* Settings & Security Link */}
      <Link href="/admin/dashboard/settings-security" className="block w-full">
        <button
          className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all shadow-sm ${
            isActive
              ? "bg-[#030914] text-white shadow-md"
              : "bg-white border border-gray-100 text-[#1D2433] hover:bg-gray-50"
          }`}
        >
          <Settings
            size={20}
            className={isActive ? "text-white" : "text-gray-500"}
          />
          <span className="text-[15px] font-medium">Settings & Security</span>
        </button>
      </Link>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 w-full p-4 rounded-full bg-white border border-gray-100 text-[#1D2433] hover:bg-gray-50 transition-all shadow-sm"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
          <Logout className="w-4 h-4 text-[#1D2433]" />
        </div>
        <span className="text-[15px] font-medium">Logout</span>
      </button>
    </div>
  );
};
