/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import MyOrder from "../../dashboardcomponets/myorder/myorder";
import MessagePage from "../../dashboardcomponets/messege/message";
import ReviewPage from "../../dashboardcomponets/review/review";
import Service from "./service";
import { useGetProfileQuery } from "@/app/api/profile/profileUpdateApi";
import { CheckCircle2, XCircle, Calendar, CreditCard, Package, RefreshCcw } from "lucide-react";

const serviceData = [
  {
    id: 1,
    title: "DJ Sarah’s Party Productions",
    desc: "I will provide DJ services to make your events unforgettable.",
    price: "$560",
    img: "/images/img01.png",
    rating: "4.9",
    reviews: "234",
  },
  {
    id: 2,
    title: "Premium Catering Service",
    desc: "I will provide professional catering services for your event.",
    price: "$440",
    img: "/images/Rectangle 20.png",
    rating: "4.5",
    reviews: "211",
  },

  {
    id: 3,
    title: "DJ Sarah’s Party Productions",
    desc: "I will provide DJ services to make your events unforgettable.",
    price: "$560",
    img: "/images/img01.png",
    rating: "4.9",
    reviews: "234",
  },

  {
    id: 4,
    title: "DJ Sarah’s Party Productions",
    desc: "I will provide DJ services to make your events unforgettable.",
    price: "$560",
    img: "/images/img01.png",
    rating: "4.9",
    reviews: "234",
  },

  //add more....
];

// messageitem.tsx
const messageData = [
  {
    image: "/images/Rectangle 19.png",
    name: "Jacob Jones",
    text: "Princess Castle Bounce House by Part Pro Rentals, then i will be continue to",
  },
  {
    image: "/images/Rectangle 20.png",
    name: "Floyd Miles",
    text: "Princess Castle Bounce House by Part Pro Rentals, then i will be continue to",
  },
  {
    image: "/images/Rectangle 21.png",
    name: "Annette Black",
    text: "Princess Castle Bounce House by Part Pro Rentals, then i will be continue to",
  },
  {
    image: "/images/Rectangle 22.png",
    name: "Darrell Steward",
    text: "Princess Castle Bounce House by Part Pro Rentals, then i will be continue to",
  },
];

// activityitem.tsx
export const activityData = [
  {
    text: "Received 5-star review",
    time: "2 days ago",
    dotColor: "green",
  },
  {
    text: "Completed order #1247",
    time: "2 days ago",
    dotColor: "yellow",
  },
  {
    text: "Earned Party Pro",
    time: "2 days ago",
    dotColor: "purple",
  },
];

import {
  CalendarDays,
  Clock,
  MessageCircle,
  Star,
  ChevronRight,
  Dot,
} from "lucide-react";
import { ChatProvider } from "../../context/ChatContext";
import MessageListSection from "@/components/message/MessageListSection";
import Header from "@/components/message/Header";
import MessageSection from "@/components/message/MessageSection";
import MessageInput from "@/components/message/MessageInput";

export default function Overview() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "My Orders", "Services", "Messages", "Reviews", "My Plan"];

  return (
    <div className="w-full bg-white p-5 rounded">
      {/* ============================  
                NAVIGATION TABS 
      ============================ */}
      <div className="rounded-2xl  bg-white border shadow-sm px-4 sm:px-6 md:px-8 py-3 flex flex-wrap gap-4 md:gap-8 items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? "text-black border-b-2 border-black "
                : "text-gray-500 hover:text-gray-700 cursor-pointer"
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
                {serviceData.slice(0, 4).map((service) => (
                  <ServiceItem
                    key={service.id}
                    image={service.img} //  img -> image prop
                    title={service.title}
                    desc={service.desc}
                    price={service.price}
                    rating={service.rating}
                    reviews={service.reviews}
                    //  pass date
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — Activity + Messages (UNCHANGED) */}
            <div className="lg:col-span-6 space-y-6 w-full">
              {/* Recent Message */}
              <div className="rounded-2xl border shadow-sm bg-[#ECEFF3] p-4">
                <SectionTitle title="Recent Message" />

                {messageData.slice(0, 4).map((msg, index) => (
                  <MessageItem
                    key={index}
                    image={msg.image}
                    name={msg.name}
                    text={msg.text}
                  />
                ))}
              </div>

              {/* Recent Activity */}
              <div className="rounded-2xl border shadow-sm bg-[#ECEFF3] p-4">
                <SectionTitle title="Recent Activity" />

                {activityData.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    text={activity.text}
                    time={activity.time}
                    dotColor={activity.dotColor}
                  />
                ))}
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
        <div className="pt-4 w-full">
          <Service />
        </div>
      )}

      {/* ============================  
                     MESSAGES TAB  
            ============================ */}
      {activeTab === "Messages" && (
        <ChatProvider>
          <section className="grid md:h-[calc(100dvh-190px)] grid-cols-12 md:gap-4">
            {/* Sidebar */}
            <aside className="md:col-span-4 col-span-12 mt-4 md:mt-0 shadow-lg p-2 rounded-2xl">
              <div className="rounded-2xl bg-white md:p-6 p-4 md:max-h-[calc(100dvh-140px)] overflow-hidden">
                <MessageListSection />
              </div>
            </aside>

            {/* Chat Area */}
            <div className="md:h-[calc(100dvh-100px)]  md:col-span-8 col-span-12 bg-white md:p-6 p-2 md:grid md:grid-rows-[130px_1fr_86px] rounded-2xl shadow-lg overflow-y-auto">
              <Header />

              <div className="flex-1 overflow-hidden">
                <MessageSection />
              </div>

              <MessageInput />
            </div>
          </section>
        </ChatProvider>
      )}

      {/* ============================  
                REVIEWS TAB  
      ============================ */}
      {activeTab === "Reviews" && <ReviewPage />}

      {activeTab === "My Plan" && <MyPlanTab />}
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

function ServiceItem({ image, title, desc, price, rating, reviews }: any) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm w-full">
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={title}
          width={45}
          height={45}
          className="rounded-full object-cover"
        />

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


function MyPlanTab() {
  const { data, isLoading, isError } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const user = data?.authenticated ? data.user : null;

  // Cast plan & subscription from unknown → typed inline
  const plan = user?.plan as {
    id: number;
    name: string;
    title: string;
    price: string;
    currency: string;
    package: string;
  } | null | undefined;

  const sub = user?.provider_subscription as {
    status: string;
    stripe_status: string;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: string | null;
  } | null | undefined;

  const formatDate = (iso?: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="pt-6 animate-pulse space-y-4 max-w-2xl">
        <div className="h-40 rounded-2xl bg-gray-200" />
        <div className="h-48 rounded-2xl bg-gray-200" />
      </div>
    );
  }

  // ── Error / no plan ───────────────────────────────────────────────────────
  if (isError || !user) {
    return (
      <div className="pt-6 text-sm text-red-500">
        Unable to load plan data.
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="pt-8 flex flex-col items-center gap-3 text-center text-gray-500">
        <Package size={40} className="text-gray-300" />
        <p className="font-medium">No active plan found.</p>
        <p className="text-xs text-gray-400">Subscribe to a plan to unlock provider features.</p>
      </div>
    );
  }

  const isActive = sub?.stripe_status === "active";
  const cancelAtEnd = sub?.cancel_at_period_end;

  return (
    <div className="pt-6 space-y-5 max-w-2xl">

      {/* ── Plan overview card ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border shadow-sm bg-white p-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Current Plan</p>
            <h2 className="text-xl font-bold text-gray-900">{plan.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{plan.name}</p>
          </div>

          {/* Status badge */}
          <span
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isActive
              ? <CheckCircle2 size={13} />
              : <XCircle size={13} />}
            {sub?.status ?? "Unknown"}
          </span>
        </div>

        <hr className="my-4" />

        {/* Price + billing cycle */}
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold text-gray-900">
            {plan.currency === "USD" ? "$" : plan.currency}
            {parseFloat(plan.price).toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 mb-1">
            / {plan.package}
          </span>
        </div>
      </div>

      {/* ── Subscription details card ──────────────────────────────────────── */}
      <div className="rounded-2xl border shadow-sm bg-white p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <CreditCard size={15} className="text-gray-400" />
          Subscription Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Billing cycle */}
          <DetailCard
            icon={<RefreshCcw size={15} className="text-blue-500" />}
            bg="bg-blue-50"
            label="Billing Cycle"
            value={plan.package.charAt(0).toUpperCase() + plan.package.slice(1)}
          />

          {/* Stripe status */}
          <DetailCard
            icon={<CheckCircle2 size={15} className="text-green-500" />}
            bg="bg-green-50"
            label="Stripe Status"
            value={sub?.stripe_status
              ? sub.stripe_status.charAt(0).toUpperCase() + sub.stripe_status.slice(1)
              : "—"}
          />

          {/* Period start */}
          <DetailCard
            icon={<CalendarDays size={15} className="text-purple-500" />}
            bg="bg-purple-50"
            label="Period Start"
            value={formatDate(sub?.current_period_start)}
          />

          {/* Period end */}
          <DetailCard
            icon={<CalendarDays size={15} className="text-orange-500" />}
            bg="bg-orange-50"
            label="Period End"
            value={formatDate(sub?.current_period_end)}
          />
        </div>

        {/* Cancel-at-period-end warning */}
        {cancelAtEnd && (
          <div className="flex items-start gap-2 mt-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-600">
              Your subscription is set to cancel at the end of the current billing period on{" "}
              <span className="font-semibold">{formatDate(sub?.current_period_end)}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Small reusable detail card ────────────────────────────────────────────────
function DetailCard({
  icon, bg, label, value,
}: {
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3">
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}