
'use client';
import { SidebarProvider } from "@/app/context/SidebarContext";
import AdminDashboardShell from "@/sharedComponents/layouts/AdminDashboardShell";
import React from "react";
import { Toaster } from "sonner";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="font-[inter]">
      <SidebarProvider>
        <AdminDashboardShell>
          <Toaster position="top-right" richColors />
          {children}
        </AdminDashboardShell>
      </SidebarProvider>
    </div>
  );
}
