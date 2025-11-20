import { Card } from "@/components/ui/card";
import {
  ChevronRight,
  CheckCircle,
  Pencil,
  Settings,
  CreditCard,
  Clock,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import { MdOutlineMailOutline } from "react-icons/md";
import Link from "next/link";
import ProfileView from "@/components/reusable/ProfileView";

export default function AccountDashboard() {
  const menu = [
    {
      icon: Pencil,
      title: "Edit Profile",
      href: "/profile/edit-profile",
      desc: "Update your personal information",
    },
    {
      icon: Settings,
      title: "Account Settings",
      href: "/profile/account-setting",

      desc: "Privacy, security, and preferences",
    },
    {
      icon: CreditCard,
      title: "Payment Method",
      href: "/profile/payment-methods",
      desc: "Manage your billing information",
    },
    {
      icon: Clock,
      title: "Order History",
      href: "/profile/order-history",
      desc: "See your past events and bookings",
    },
    {
      icon: Bell,
      title: "Notification Preferences",
      href: "/profile/notification",
      desc: "Control how you receive updates",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      href: "/profile/help-support",

      desc: "Get help or customer service",
    },
  ];

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="w-full max-w-[780px] space-y-8">
        {/* Profile Header */}
        <ProfileView />

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menu.map((item, idx) => (
            <Card
              key={idx}
              className="flex items-center justify-between p-4.5 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              <Link href={item.href!} className="flex items-center gap-4">
                <div className="p-3 bg-[linear-gradient(90deg,#FFF0E4_0%,#FFE3E1_100%)] text-orange-400 rounded-xl">
                  <item.icon size={20} />
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
              <LogOut size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Logout</h3>
              <p className="text-sm text-gray-500">Sign out of your account</p>
            </div>
          </div>
          <button className="px-4 py-2 cursor-pointer bg-black text-[16px] font-medium text-white rounded-lg hover:bg-gray-800 transition">
            Logout
          </button>
        </Card>
      </div>
    </div>
  );
}
