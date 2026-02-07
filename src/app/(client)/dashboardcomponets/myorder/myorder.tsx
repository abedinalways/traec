"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/* ======================================================
   DYNAMIC ORDER DATA (same file)
====================================================== */

const ordersData = [
  {
    id: 1,
    image: "/images/Rectangle 19.png",
    title: "Sofia’s 7th Birthday Princess Party",
    provider: "by Part Pro Rentals",
    price: "$545",
    dueIn: "1h, 33m",
    status: "Progress",
    link: "/order-details",
  },
  {
    id: 2,
    image: "/images/Rectangle 20.png",
    title: "Jacob’s Anniversary Dinner Setup",
    provider: "by Premium Caterers",
    price: "$440",
    dueIn: "3h, 10m",
    status: "Pending",
    link: "/order-details",
  },
  {
    id: 3,
    image: "/images/Rectangle 21.png",
    title: "Annette’s Wedding Event Lighting",
    provider: "by Party Light Pro",
    price: "$760",
    dueIn: "5h, 25m",
    status: "Completed",
    link: "/order-details",
  },
  {
    id: 4,
    image: "/images/Rectangle 22.png",
    title: "Darrell’s Corporate Event Hosting",
    provider: "by Event Masters",
    price: "$660",
    dueIn: "1d, 2h",
    status: "Progress",
    link: "/order-details",
  },
];

/* ======================================================
   MAIN COMPONENT
====================================================== */

export default function MyOrders() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 bg-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-1 h-4 bg-black rounded-full" />
          Active Orders ({ordersData.length})
        </h2>

        <button className="border px-3 py-2 rounded-lg text-sm flex items-center gap-1">
          Active orders
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Orders List (DYNAMIC) */}
      <div className="space-y-5">
        {ordersData.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   ORDER CARD (dynamic props)
----------------------------------------------------- */

function OrderCard({ order }: any) {
  return (
    <div className="w-full bg-white border rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <Image
            src={order.image}
            alt="event"
            width={70}
            height={70}
            className="rounded-lg object-cover"
          />

          <div>
            <p className="font-semibold text-sm">{order.title}</p>
            <p className="text-xs text-gray-500">{order.provider}</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10">

          {/* PRICE */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Price</p>
            <p className="font-semibold">{order.price}</p>
          </div>

          {/* DUE IN */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Due In</p>
            <p className="font-semibold">{order.dueIn}</p>
          </div>

          {/* STATUS */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Status</p>
            <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
              {order.status}
            </span>
          </div>

          {/* VIEW DETAILS → LINK */}
          <Link
            href={order.link}
            className="text-[#4A4C56] text-sm underline whitespace-nowrap"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
}
