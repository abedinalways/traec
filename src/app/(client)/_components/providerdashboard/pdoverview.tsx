"use client";

import { useState } from "react";
import Image from "next/image";
import MyOrder from "../../../(dashboard)/components/myorder/myorder";
import MessagePage from "../../../(dashboard)/components/messege/message";
import ReviewPage from "../../../(dashboard)/components/review/review";
import Service from "../../_components/providerdashboard/service";
import { serviceData } from "./serviceitem";

import {
  CalendarDays,
  Clock,
  MessageCircle,
  Star,
  ChevronRight,
  Dot,
} from "lucide-react";

export default function Overview() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "My Orders", "Services", "Messages", "Reviews"];

  return (
    <div className="w-full bg-white p-5 rounded">

      {/* ============================  
                NAVIGATION TABS 
      ============================ */}
      <div className="rounded-2xl bg-white border shadow-sm px-4 sm:px-6 md:px-8 py-3 flex flex-wrap gap-4 md:gap-8 items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ============================  
                 OVERVIEW TAB CONTENT
      ============================ */}
      {activeTab === "Overview" && (
        <div className="py-8 w-full">

          {/* ======= TOP 4 ICON STATS ======= */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatBox
              icon={<CalendarDays className="text-red-500" size={22} />}
              value="02"
              label="Active Services"
              bg="bg-red-100"
            />
            <StatBox
              icon={<Clock className="text-blue-500" size={22} />}
              value="11"
              label="Past Orders"
              bg="bg-blue-100"
            />
            <StatBox
              icon={<MessageCircle className="text-green-500" size={22} />}
              value="06"
              label="Unread Messages"
              bg="bg-green-100"
            />
            <StatBox
              icon={<Star className="text-yellow-500" size={22} />}
              value="4.9"
              label="Avg Rating Score"
              bg="bg-yellow-100"
            />
          </div>

          {/* ======= MAIN GRID ======= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT — TOP SERVICES (UPDATED) */}
            <div className="lg:col-span-6 rounded-3xl border shadow-sm bg-[#ECEFF3] p-6 w-full min-h-[380px] md:min-h-[620px] lg:h-[490px]">
              <SectionTitle title="Top Services" />

              <div className="space-y-3">

                <ServiceItem
                  image="/images/Rectangle 19.png"
                  title="DJ Sarah’s Party Productions"
                  desc="I will provide DJ services to make your events unforgettable."
                  price="$560"
                  rating="4.9"
                  reviews="234"
                />

                <ServiceItem
                  image="/images/Rectangle 20.png"
                  title="Premium Catering Service"
                  desc="I will provide professional catering services for your event."
                  price="$440"
                  rating="4.5"
                  reviews="211"
                />

                <ServiceItem
                  image="/images/Rectangle 21.png"
                  title="Kathrine’s Entertainment Package"
                  desc="I will provide entertainment services to engage your guests."
                  price="$380"
                  rating="4.4"
                  reviews="220"
                />

                <ServiceItem
                  image="/images/Rectangle 22.png"
                  title="Customized Theme Party Organizer"
                  desc="I will provide decorators to design and style your events beautifully."
                  price="$660"
                  rating="4.4"
                  reviews="140"
                />

                {/* <ServiceItem
                  image="/images/Rectangle 19.png"
                  title="Elegant Wedding Event"
                  desc="I will provide decorators to design and style your events beautifully."
                  price="$760"
                  rating="4.4"
                  reviews="140"
                /> */}

              </div>
            </div>

            {/* RIGHT — Activity + Messages (UNCHANGED) */}
            <div className="lg:col-span-6 space-y-6 w-full">

              {/* Recent Message */}
              <div className="rounded-2xl border shadow-sm bg-[#ECEFF3] p-4">
                <SectionTitle title="Recent Message" />

                <MessageItem image="/images/Rectangle 19.png" name="Jacob Jones" text="Princess Castle Bounce House by Part Pro Rentals, then i will be continue to" />
                <MessageItem image="/images/Rectangle 20.png" name="Floyd Miles" text="Princess Castle Bounce House by Part Pro Rentals, then i will be continue to" />
                <MessageItem image="/images/Rectangle 21.png" name="Annette Black" text="Princess Castle Bounce House by Part Pro Rentals, then i will be continue to" />
                <MessageItem image="/images/Rectangle 22.png" name="Darrell Steward" text="Princess Castle Bounce House by Part Pro Rentals, then i will be continue to" />
              </div>

              {/* Recent Activity */}
              <div className="rounded-2xl border shadow-sm bg-[#ECEFF3] p-4">
                <SectionTitle title="Recent Activity" />
                <ActivityItem text="Received 5-star review" time="2 days ago" dotColor="green" />
                <ActivityItem text="Completed order #1247" time="2 days ago" dotColor="yellow" />
                <ActivityItem text="Earned Party Pro" time="2 days ago" dotColor="purple" />
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ============================  
              MY ORDERS TAB 
      ============================ */}
      {activeTab === "My Orders" && (
        <div className="pt-4 w-full">
          <MyOrder />
        </div>
      )}

      {/* ============================  
              SERVICES TAB (UNCHANGED)  
      ============================ */}
      {/* {activeTab === "Services" && (
        <div className="pt-4 w-full">
          <div className="text-gray-600 text-sm">
            <Service />
          </div>
        </div>
      )} */}

{activeTab === "Services" && (
  <Service services={serviceData} />
)}


      {/* ============================  
               MESSAGES TAB  
      ============================ */}
      {activeTab === "Messages" && (
        <div className="pt-4 w-full h-[80vh] md:h-[calc(100vh-150px)] overflow-hidden rounded-xl">
          <MessagePage />
        </div>
      )}

      {/* ============================  
                REVIEWS TAB  
      ============================ */}
      {activeTab === "Reviews" && (
        <ReviewPage />
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
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
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

function ServiceItem({ image, title, desc, price, rating, reviews }: any) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm w-full">
      <div className="flex items-center gap-3">
        <Image src={image} alt={title} width={45} height={45} className="rounded-full object-cover" />

        <div>
          <p className="font-medium text-sm text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 leading-tight">{desc}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-red-500">{price}</p>

        <p className="flex items-center justify-end gap-1 text-xs text-yellow-600 mt-2">
          <Star size={14} className="fill-yellow-500 text-yellow-500" />
          {rating}
          <span className="text-gray-500">({reviews})</span>
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
        <Dot size={20} className={dotClass[String(dotColor) as keyof typeof dotClass]} />
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
        <Image src={image} alt={name} width={40} height={40} className="rounded-full object-cover" />
        <div>
          <p className="font-medium text-sm text-gray-900">{name}</p>
          <p className="text-xs text-gray-500 leading-tight">{text}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}
