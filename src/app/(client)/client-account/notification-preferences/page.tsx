"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

const stats = [
  { label: "Active", title: "Booking confirmations" },
  { label: "Deactive", title: "Booking reminders" },
  { label: "Deactive", title: "Payment confirmations" },
  { label: "Active", title: "Message replies" },
];

export default function NotificationPreferencesPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={"/profile"}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} className="pt-1" />
        Back To Account
      </Link>

      {/* Page Title */}
      <div className="my-5">
        <h1 className="text-2xl font-semibold text-gray-900">
          Notification Preferences
        </h1>
        <p className="text-gray-500">
          Customize how and when you receive notifications
        </p>
      </div>

      {/* Notification Switches */}
      {stats.map((s, index) => (
        <Card key={index} className="p-3 shadow-none mt-5">
          <div className="flex items-center justify-between gap-2">
            <p>{s.title}</p>

            <Switch
              id={`switch-${index}`}
              defaultChecked={s.label === "Active"}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
