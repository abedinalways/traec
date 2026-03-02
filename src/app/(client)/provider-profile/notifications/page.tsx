"use client";

import { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import LeftIcon from "@/components/icons/LeftIcon";

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState({
    bookingConfirmations: true,
    bookingReminders: true,
    paymentConfirmations: false,
    messageReplies: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 font-[inter]">
      {/* Back Button */}
      <Link
        href={"/provider-profile"}
        className="flex items-center max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border  text-gray-black-400 mb-4 text-[16px]"
      >
        <LeftIcon />
        Back To Account
      </Link>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Notification Preferences
        </h1>
        <p className="text-gray-500 mt-1">
          Customize how and when you receive notifications
        </p>
      </div>

      {/* Notification Items */}
      <div className="space-y-3">
        {/* Booking Confirmations */}
        <div className="w-full border rounded-xl px-4 py-4 flex items-center justify-between bg-white">
          <p className="text-gray-900">Booking confirmations</p>
          <Switch
            checked={prefs.bookingConfirmations}
            onCheckedChange={() => toggle("bookingConfirmations")}
            className="scale-125"
          />
        </div>

        {/* Booking Reminders */}
        <div className="w-full border rounded-xl px-4 py-4 flex items-center justify-between bg-white">
          <p className="text-gray-900">Booking reminders</p>
          <Switch
            checked={prefs.bookingReminders}
            onCheckedChange={() => toggle("bookingReminders")}
            className="scale-125"
          />
        </div>

        {/* Payment Confirmations */}
        <div className="w-full border rounded-xl px-4 py-4 flex items-center justify-between bg-white">
          <p className="text-gray-900">Payment confirmations</p>
          <Switch
            checked={prefs.paymentConfirmations}
            onCheckedChange={() => toggle("paymentConfirmations")}
            className="scale-125"
          />
        </div>

        {/* Message Replies */}
        <div className="w-full border rounded-xl px-4 py-4 flex items-center justify-between bg-white">
          <p className="text-gray-900">Message replies</p>
          <Switch
            checked={prefs.messageReplies}
            onCheckedChange={() => toggle("messageReplies")}
            className="scale-125"
          />
        </div>
      </div>
    </div>
  );
}
