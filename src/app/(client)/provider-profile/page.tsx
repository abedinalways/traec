"use client";
import { Card } from "@/components/ui/card";
import {
  ChevronRight,
  Pencil,
  Settings,
  CreditCard,
  Clock,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { ActionDialog } from "@/components/reusable/ActionDialog";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import ProfileCard from "@/components/reusable/ProfileCard";
import Image from "next/image";
import RedDeleteIcon from "@/components/icons/RedDeleteIcon";
import ProviderProfileCard from "@/components/reusable/ProviderProfileCard";

const menu = [
  {
    icon: "/images/profile/edit.png",
    title: "Edit Profile",
    href: "/provider-profile/edit-profile",
    desc: "Update your personal information",
  },
  {
    icon: "/images/profile/settings.png",
    title: "Account Settings",
    href: "/provider-profile/account-setting",

    desc: "Privacy, security, and preferences",
  },
  {
    icon: "/images/profile/credit.png",
    title: "Payment Method",
    href: "/provider-profile/payment-methods",
    desc: "Manage your billing information",
  },
  {
    icon: "/images/profile/clock.png",
    title: "Order History",
    href: "/provider-profile/orders-history",
    desc: "See your past events and bookings",
  },
  {
    icon: "/images/profile/notification.png",
    title: "Notification Preferences",
    href: "/provider-profile/notifications",
    desc: "Control how you receive updates",
  },
  {
    icon: "/images/profile/help.png",
    title: "Help & Support",
    href: "/provider-profile/help-support",

    desc: "Get help or customer service",
  },
];
export default function AccountDashboard() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  return (
    <div className="w-full flex justify-center py-10 px-4 font-[inter]">
      <div className="w-full max-w-[780px] space-y-8">
        {/* Profile Header */}
        <ProviderProfileCard
          name="Darlene Robertson"
          avatar="/images/provider-profile-img.svg"
          location="Los Angeles, CA"
          joined="Joined Jan 2021"
          email="maria@email.com"
          verified={true}
        />

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menu.map((item, idx) => (
            <Card
              key={idx}
              className="flex items-center justify-between p-4.5 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              <Link href={item.href!} className="flex items-center gap-4">
                
                 <div className="p-3 icon-bg text-orange-400 rounded-[8px] ">
                                     <Image
                                       src={item.icon}
                                       alt={item.title}
                                       width={24}
                                       height={24}
                                     />
                                   </div>
                
                <div>
                  <h3 className="font-semibold text-[18px]">{item.title}</h3>
                  <p className="text-[16px] text-[#4A4C56]  pt-0.5">
                    {item.desc}
                  </p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Card className="p-4 rounded-xl border border-gray-200 shadow-sm flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[linear-gradient(90deg,#FFF0E4_0%,#FFE3E1_100%)] text-orange-400 rounded-xl">
              <RedDeleteIcon />
            </div>
            <div>
              <h3 className="font-semibold">Logout</h3>
              <p className="text-sm text-gray-500">Sign out of your account</p>
            </div>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="px-4 py-2 cursor-pointer bg-black text-[16px] font-medium text-white rounded-lg hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </Card>
      </div>
      <ActionDialog
        open={isLogoutModalOpen}
        setOpen={setIsLogoutModalOpen}
        icon={<RedDeleteIcon />}
        title="Log Out"
        description="Are you sure you want to log out?"
        confirmLabel="Yes. Log Out"
        onConfirm={() => {
          console.log("yes, log out");
        }}
      />
    </div>
  );
}
