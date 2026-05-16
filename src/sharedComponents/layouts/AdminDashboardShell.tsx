"use client";

import { useSidebar } from "@/app/context/SidebarContext";
import { useGetMeQuery } from "@/app/api/auth/authapi";
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

  const { data, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const user = data?.authenticated ? data.user : null;
  const role = user?.type || "admin";

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded
      ? "lg:ml-[272px]"
      : "lg:ml-[82px]";

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
          <AppHeader role={role} />
        </div>

        {/* Page Content */}
        <div className="dashboard-bg ">{children}</div>
      </div>
    </div>
  );
}
