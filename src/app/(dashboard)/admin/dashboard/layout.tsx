
'use client';
import { SidebarProvider } from "@/app/context/SidebarContext";
import AdminDashboardShell from "@/sharedComponents/layouts/AdminDashboardShell";
import React from "react";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <SidebarProvider>
        <AdminDashboardShell>
          {children}
        </AdminDashboardShell>
      </SidebarProvider>
    </div>
  );
}
