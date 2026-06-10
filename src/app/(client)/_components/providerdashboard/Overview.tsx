"use client";

import { useState } from "react";
import Image from "next/image";
import MyOrder from "../../../(client)/dashboardcomponets/myorder/myorder";

// import ReviewPage from "../review/review"

import {
  CalendarDays,
  Clock,
  MessageCircle,
  Star,
  ChevronRight,
  Dot,
} from "lucide-react";
import BoxIcon from "@/components/icons/BoxIcon";

import MessagesIcon from "@/components/icons/MessagesIcon";

import MessageSection from "@/components/message/MessageSection";
import MessageInput from "@/components/message/MessageInput";
import MessageListSection from "@/components/message/MessageListSection";
import Header from "@/components/message/Header";
import { PusherListener } from "@/hooks/usePusherChat";
import ReviewPage from "../../dashboardcomponets/review/review";
import ServiceSection from "./service";

export default function Overview() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "My Orders", "Services", "Messages", "Reviews"];

  return (
    <div className="w-full  bg-white p-5 rounded ">
      <div className=" bg-white border-b   px-4 sm:px-6 md:px-8 py-3 flex flex-wrap gap-4 md:gap-8 items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium transition-all ${activeTab === tab
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-gray-700 cursor-pointer"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="py-6 w-full">
          {/* ======= TOP 4 STATS ======= */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatBox
              icon={<CalendarDays className="text-red-500" size={20} />}
              value="02"
              label="Upcoming Events"
              bg="bg-red-100"
            />
            <StatBox
              icon={<BoxIcon />}
              value="11"
              label="Past Orders"
              bg="bg-blue-100"
            />
            <StatBox
              icon={<MessagesIcon />}
              value="06"
              label="Unread Messages"
              bg="bg-green-100"
            />
            <StatBox
              icon={<Star className="text-yellow-500" size={20} />}
              value="4.9"
              label="Avg Rating Score"
              bg="bg-yellow-100"
            />
          </div>

          {/* ======= MAIN GRID ======= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT — Recent Orders */}
            <div className="lg:col-span-6 rounded-3xl border shadow-sm bg-[#ECEFF3] p-4 w-full min-h-[380px] md:min-h-[550px] lg:h-[490px] ">
              <SectionTitle title="Recent Orders" />

              <div className="space-y-3">
                <OrderItem
                  title="Emma’s 7th Birthday"
                  vendor="Princess Castle Bounce House by Part Pro Rentals"
                  date="Dec 20, 2024"
                  status="Progress"
                  statusColor="blue"
                />
                <OrderItem
                  title="Emma’s 7th Birthday"
                  vendor="Princess Castle Bounce House by Part Pro Rentals"
                  date="Dec 20, 2024"
                  status="Pending"
                  statusColor="yellow"
                />
                <OrderItem
                  title="Emma’s 7th Birthday"
                  vendor="Princess Castle Bounce House by Part Pro Rentals"
                  date="Dec 20, 2024"
                  status="Cancel"
                  statusColor="red"
                />
                <OrderItem
                  title="Emma’s 7th Birthday"
                  vendor="Princess Castle Bounce House by Part Pro Rentals"
                  date="Dec 20, 2024"
                  status="Complete"
                  statusColor="green"
                />
              </div>
            </div>

            {/* RIGHT — Activity + Messages */}
            <div className="lg:col-span-6 space-y-6 w-full">
              {/* Recent Activity */}
              <div className="rounded-2xl border shadow-sm bg-[#ECEFF3] p-4">
                <SectionTitle title="Recent Activity" />
                <ActivityItem
                  text="Received 5-star review"
                  time="2 days ago"
                  dotColor="green"
                />
                <ActivityItem
                  text="Completed order #1247"
                  time="2 days ago"
                  dotColor="yellow"
                />
                <ActivityItem
                  text="Earned Party Pro"
                  time="2 days ago"
                  dotColor="purple"
                />
              </div>

              {/* Recent Messages */}
              <div className="rounded-2xl border shadow-sm bg-[#ECEFF3] p-4">
                <SectionTitle title="Recent Message" />

                <MessageItem
                  image="/images/Avater11.png"
                  name="Jacob Jones"
                  text="Princess Castle Bounce House by Part Pro Rentals, then I will be continue to"
                />
                <MessageItem
                  image="/images/Rectangle 20.png"
                  name="Floyd Miles"
                  text="Princess Castle Bounce House by Part Pro Rentals, then I will be continue to"
                />
                <MessageItem
                  image="/images/Rectangle 21.png"
                  name="Annette Black"
                  text="Princess Castle Bounce House by Part Pro Rentals, then I will be continue to"
                />
                <MessageItem
                  image="/images/Rectangle 22.png"
                  name="Darrell Steward"
                  text="Princess Castle Bounce House by Part Pro Rentals, then I will be continue to"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================  
              MY ORDERS TAB CONTENT  
      ============================ */}
      {activeTab === "My Orders" && (
        <div className="pt-4 w-full">
          <MyOrder />
        </div>
      )}

      {/* ============================  
              SERVICES TAB CONTENT  
============================ */}
      {activeTab === "Services" && (
        <div className="pt-4 w-full ">
          <ServiceSection />
        </div>
      )}

      {/* ============================  
               MESSAGES TAB  
      ============================ */}
      {activeTab === "Messages" && (
        <section className="grid md:h-[calc(100dvh-190px)] grid-cols-12 md:gap-4">
          <PusherListener />
          {/* Sidebar */}
          <aside className="md:col-span-4 col-span-12 mt-4 md:mt-0 shadow-lg p-2 rounded-2xl">
            <div className="rounded-2xl bg-white md:p-6 p-4 md:max-h-[calc(100dvh-140px)] overflow-y-auto">
              <MessageListSection />
            </div>
          </aside>

          {/* Chat Area */}
          <div className="md:h-[calc(100dvh-100px)]  md:col-span-8 col-span-12 bg-white md:p-6 p-2 md:grid md:grid-rows-[130px_1fr_86px] rounded-2xl shadow-lg overflow-y-auto">
            <Header />

            <div className="flex overflow-hidden">
              <MessageSection />
            </div>

            <MessageInput />
          </div>
        </section>
      )}
      {/* ============================  
                REVIEWS TAB  
      ============================ */}
      {activeTab === "Reviews" && (
        // <div className="pt-4 w-full min-h-[80vh]">
        <ReviewPage />
        // </div>
      )}
    </div>
  );
}

/* ======================================================
   HELPER COMPONENTS
====================================================== */

function StatBox({ icon, value, label, bg }: any) {
  return (
    <div className="rounded-2xl border p-4 flex items-center gap-3 bg-white shadow-sm w-full">
      <div
        className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}
      >
        {icon}
      </div>

      <div>
        <p className="text-lg font-semibold">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function SectionTitle({ title }: any) {
  return (
    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
      <span className="w-1 h-4 bg-yellow-400 rounded-full" />
      {title}
    </h3>
  );
}

function OrderItem({ title, vendor, date, status, statusColor }: any) {
  const badgeColor = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm w-full">
      <div>
        <p className="font-medium text-[16px] text-gray-900">{title}</p>
        <p className="text-[12px] max-w-sm text-gray-500">{vendor}</p>

        <p className="mt-2 flex items-center gap-1 text-[14px] text-gray-500">
          <CalendarDays size={14} /> {date}
        </p>
      </div>

      <div className="text-right flex flex-col justify-between gap-2 md:gap-6 ">
        <span
          className={`px-3 py-1 rounded-full text-xs ${badgeColor[String(statusColor) as keyof typeof badgeColor]}`}
        >
          {status}
        </span>

        <p className="text-[12px] text-gray-500 mt-2 cursor-pointer hover:underline">
          View Details
        </p>
      </div>
    </div>
  );
}

function ActivityItem({ text, time, dotColor }: any) {
  const dotClass = {
    green: "text-green-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
  };

  return (
    <div className="flex justify-between items-center py-2 w-full">
      <p className="flex items-center gap-2 text-sm text-gray-700">
        <Dot
          size={20}
          className={dotClass[String(dotColor) as keyof typeof dotClass]}
        />
        {text}
      </p>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}

function MessageItem({ image, name, text }: any) {
  return (
    <div className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50 rounded-xl px-2 w-full">
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <div>
          <p className="font-medium text-sm text-gray-900">{name}</p>
          <p className="text-xs text-gray-500 leading-tight">{text}</p>
        </div>
      </div>

      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}
