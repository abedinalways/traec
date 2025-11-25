/** @format */
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
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import Link from "next/link";
import { useState } from "react";
import LogoutModal from "../_components/modal/LogoutModal";

export default function AccountDashboard() {
  const [isOpenLogoutModal, setIsOpenLogoutModale] = useState(false);
  const menu = [
    {
      icon: Pencil,
      title: "Edit Profile",
      desc: "Update your personal information",
      path: "/profile/edit-profile",
    },
    {
      icon: Settings,
      title: "Account Settings",
      desc: "Privacy, security, and preferences",
      path: "/profile/account-setting",
    },
    {
      icon: CreditCard,
      title: "Payment Method",
      desc: "Manage your billing information",
      path: "/profile/payment-method",
    },
    {
      icon: Clock,
      title: "Order History",
      desc: "See your past events and bookings",
      path: "/profile/order-history",
    },
    {
      icon: Bell,
      title: "Notification Preferences",
      desc: "Control how you receive updates",
      path: "/profile/notification-preferences",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      desc: "Get help or customer service",
      path: "/profile/help-support",
    },
  ];

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Profile Header */}
        <Card className="p-4 md:p-6  shadow-none flex flex-row items-center gap-6">
          <Image
            src="/images/featured06.png"
            alt="Profile"
            height={30}
            width={30}
            className="w-30 h-30 rounded-full object-cover"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">Cameron Diana</h2>
              <span className="flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-[#EEFAF0] text-[#2DAB57]">
                <IoIosCheckmarkCircle
                  className=" rounded-full border-none"
                  size={14}
                />{" "}
                Verified
              </span>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <MdOutlineAddLocationAlt /> Los Angeles, CA
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <FaRegCalendarAlt /> Member since 2022
              </p>
            </div>
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <CgMail />
              maria@email.com
            </p>
          </div>
        </Card>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menu.map((item, idx) => (
            <Link key={idx} href={item.path}>
              <Card className="flex items-center justify-between p-4 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 text-orange-500 rounded-xl">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <Card className="p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                <LogOut size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Logout</h3>
                <p className="text-sm text-gray-500">
                  Sign out of your account
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpenLogoutModale(true)}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </Card>
      </div>
      {isOpenLogoutModal && (
        <LogoutModal
          isOpen={isOpenLogoutModal}
          onClose={() => setIsOpenLogoutModale(false)}
        />
      )}
    </div>
  );
}
