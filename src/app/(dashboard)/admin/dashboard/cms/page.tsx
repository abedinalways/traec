"use client";

import { useState } from "react";

import SidebarBtn from "@/components/reusable/SidebarBtn";
import HomepageSection from "@/components/cms/HomepageSection";
import FAQSection from "@/components/cms/FAQSection";
import PrivacySection from "@/components/cms/PrivacySection";

import ServiceCategorySection from "@/components/cms/ServiceSection";

type TabType = "homepage" | "faq" | "privacy" | "service";

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState<TabType>("homepage");

  return (
    <div className="flex min-h-screen bg-gray-50 font-[inter] grid-cols-6">
      {/* ================= SIDEBAR ================= */}
      <div className=" col-span-2 border-r bg-white p-8 ">
        <h2 className="text-[20px] font-semibold text-[#1D2433]">
          Content Management System
        </h2>
        <p className="mt-1 text-[14px] text-gray-500 ">
          Manage all public-facing content and platform information
        </p>

        <div className="mt-6 flex flex-col gap-2 col-span-4">
          <SidebarBtn
            active={activeTab === "homepage"}
            onClick={() => setActiveTab("homepage")}
            label="Manage Homepage Sliders & Banners"
          />

          <SidebarBtn
            active={activeTab === "faq"}
            onClick={() => setActiveTab("faq")}
            label="Add/edit FAQ & Help Center"
          />

          <SidebarBtn
            active={activeTab === "privacy"}
            onClick={() => setActiveTab("privacy")}
            label="Privacy Policy Editor"
          />

          <SidebarBtn
            active={activeTab === "service"}
            onClick={() => setActiveTab("service")}
            label="Manage Service Category"
          />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 p-6 bg-[#eceff3]">
        {activeTab === "homepage" && <HomepageSection />}
        {activeTab === "faq" && <FAQSection />}
        {activeTab === "privacy" && <PrivacySection />}
        {activeTab === "service" && <ServiceCategorySection />}
      </div>
    </div>
  );
}
