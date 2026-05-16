"use client";

import { useState } from "react";
import SidebarBtn from "@/components/reusable/SidebarBtn";
import GeneralSettingsSection from "@/dashboard_components/admin/settings-security/GeneralSettingsSection";
import SecuritySection from "@/dashboard_components/admin/settings-security/SecuritySection";

type TabType = "general" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("general");

  return (
    <div className="flex min-h-screen bg-gray-50 font-[inter] grid-cols-6">
      {/* ================= SIDEBAR ================= */}
      <div className="col-span-2 border-r bg-white p-8 w-[350px]">
        <h2 className="text-[20px] font-semibold text-[#1D2433]">
          Settings & Security
        </h2>
        <p className="mt-1 text-[14px] text-gray-500">
          Platform configuration & protection
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <SidebarBtn
            active={activeTab === "general"}
            onClick={() => setActiveTab("general")}
            label="General Settings"
          />

          {/* <SidebarBtn
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
            label="Security"
          /> */}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 p-6 bg-[#eceff3]">
        {activeTab === "general" && <GeneralSettingsSection />}
        {/* {activeTab === "security" && <SecuritySection />} */}
      </div>
    </div>
  );
}
