"use client";


import { useSidebar } from "@/app/context/SidebarContext";
import AppHeader from "@/dashboard_layout/AppHeader";
import AppSidebar from "@/dashboard_layout/AppSidebar";
import Backdrop from "@/dashboard_layout/Backdrop";

import React from "react";

export default function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded
      ? "lg:ml-[312px]"
      : "lg:ml-[122px]";

  return (
    <div className="min-h-screen xl:flex overflow-x-hidden  dark:bg-[#0B151D]">
      {/* Sidebar and Backdrop */}
      <AppSidebar role="admin" />
      <Backdrop />
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin} overflow-x-hidden  dark:bg-[#0B151D]`}
      >
        {/* Header */}
        <div className="">

        <AppHeader />
        </div>
        {/* Page Content */}
        <div className="">{children}</div>
      </div>
    </div>
  );
}
