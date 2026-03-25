// Sidebar configuration for different user roles
"use client";
import React from "react";
import {
  UserIcon,
  
  MyMatchIcon,
  Live,
  SettingsIcon,
  ActiveOnGoinMatch,
  TimeIcon,
  UsersIcon,
  GameRoomsIcon,
  FinancialIcon,
  AnalyticsIcon,
} from "../icons/index";
import { Download, Wallet } from "lucide-react";
import DashboardIcon from "@/icons/DashboardIcon";
import OrderManagementIcon from "@/icons/OrderManagementIcon";

export type UserRole = "admin" | "user";

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; icon: React.ReactNode }[];
  submenuStyle?: "default" | "tree";
};

export type QuickLink = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: string;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
  href?: string;
  action?: "edit-profile" | "wallet-modal" | "download-app";
};

export type SidebarConfig = {
  subtitle: string;
  navItems: NavItem[];
  quickLinks: QuickLink[];

};

// Admin sidebar configuration
export const adminSidebarConfig: SidebarConfig = {
  subtitle: "Admin Console",
  navItems: [
    {
      icon: <DashboardIcon />,
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <UsersIcon />,
      name: "User Management",
      submenuStyle: "tree",
      subItems: [
        {
          name: "Client Management",
          path: "/admin/dashboard/user-management/client-management",
          icon: <UserIcon className="w-4 h-4" />,
        },
        {
          name: "Seller/Providers",
          path: "/admin/dashboard/user-management/seller-providers",
          icon: <UserIcon className="w-4 h-4" />,
        },
        {
          name: "New Account Approval",
          path: "/admin/dashboard/user-management/new-account-approval",
          icon: <UserIcon className="w-4 h-4" />,
        },
      ],
    },

    {
      icon: <OrderManagementIcon/>,
      name: "Order Management",
      path: "/admin/dashboard/game-rooms",
    },
    {
      icon: <FinancialIcon />,
      name: "Financials",
      path: "/admin/dashboard/financial",
    },

    {
      icon: <AnalyticsIcon />,
      name: "Analytics",
      path: "/admin/dashboard/analytics",
    },
    {
      icon: <SettingsIcon />,
      name: "Settings",
      path: "/admin/dashboard/settings",
    },
  ],
  quickLinks: [],
};

// User sidebar configuration
export const userSidebarConfig: SidebarConfig = {
  subtitle: "Review Management",
  navItems: [
    {
      icon: <DashboardIcon />,
      name: "Dashboard",
      path: "/user/dashboard",
    },
    {
      icon: <Live />,
      name: "Live",
      path: "/user/dashboard/live",
    },
    {
      icon: <MyMatchIcon />,
      name: "My Matches",
      subItems: [
        {
          name: "Active Matches",
          path: "/user/dashboard/matches/active",
          icon: <ActiveOnGoinMatch />,
        },
        {
          name: "History",
          path: "/user/dashboard/matches/history",
          icon: <TimeIcon />,
        },
      ],
    },
    {
      icon: <Wallet className="size-5" />,
      name: "Wallet",
      path: "/user/dashboard/wallet",
    },
    {
      icon: <SettingsIcon />,
      name: "Security",
      path: "/user/dashboard/settings",
    },
  ],
  quickLinks: [
    {
      title: "Edit Profile",
      path: "/user/dashboard/all-settings/profile",
      description: "Update your personal information",
      icon: <UserIcon className="w-5 h-5" />,
      iconBgColor: "bg-[#0C1B60]",
      iconColor: "text-white",
      action: "edit-profile",
    },
    {
      title: "View Wallet Address",
      description: "Check your deposit address",
      icon: <Wallet className="size-5" />,
      iconBgColor: "gradient-green",
      iconColor: "text-white",
      action: "wallet-modal",
    },
    {
      title: "Download Game App",
      description: "Get the latest version",
      icon: <Download className="w-5 h-5" />,
      iconBgColor: "gradient-pink",
      iconColor: "text-white",
      action: "download-app",
    },
  ],
};

// Helper function to get sidebar config based on role
export const getSidebarConfig = (role: UserRole = "admin"): SidebarConfig => {
  return role === "admin" ? adminSidebarConfig : userSidebarConfig;
};
