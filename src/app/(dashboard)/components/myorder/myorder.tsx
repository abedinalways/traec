"use client";

import Image from "next/image";
import Link from "next/link";     
import { ChevronDown } from "lucide-react";

export default function MyOrders() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 bg-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-1 h-4 bg-black rounded-full" />
          Active Orders (4)
        </h2>

        <button className="border px-3 py-2 rounded-lg text-sm flex items-center gap-1">
          Active orders
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {[1, 2, 3, 4].map((i) => (
          <OrderCard key={i} />
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   ORDER CARD 
----------------------------------------------------- */

function OrderCard() {
  return (
    <div className="w-full bg-white border rounded-2xl p-5 shadow-sm">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/Rectangle 19.png"
            alt="event"
            width={70}
            height={70}
            className="rounded-lg object-cover"
          />

          <div>
            <p className="font-semibold text-sm">
              Sofia’s 7th Birthday Princess Party
            </p>
            <p className="text-xs text-gray-500">by Part Pro Rentals</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10">

          {/* PRICE */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Price</p>
            <p className="font-semibold">$545</p>
          </div>

          {/* DUE IN */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Due In</p>
            <p className="font-semibold">1h, 33m</p>
          </div>

          {/* STATUS */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Status</p>
            <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
              Progress
            </span>
          </div>

          {/* VIEW DETAILS → Now a LINK */}
          <Link
            href="/order-details"
            className="text-[#4A4C56] text-sm underline whitespace-nowrap"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
}
