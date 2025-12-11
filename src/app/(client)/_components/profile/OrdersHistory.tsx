"use client";

import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiTask } from "react-icons/bi";

export interface OrderItem {
  id: number;
  title: string;
  vendor: string;
  date: string;
  price: number;
  status: "Complete" | "Pending" | "Progress" | string;
  thumbnail: string;
}

export interface OrderStats {
  pastOrders: number;
  completed: number;
  pending: number;
  totalSpend: number;
}

interface OrderHistoryProps {
  backUrl: string;
  title?: string;
  subtitle?: string;

  stats: OrderStats;
  orders: OrderItem[];
}

export default function OrderHistory({
  backUrl,
  title = "Order History",
  subtitle = "View your past events and bookings",
  stats,
  orders,
}: OrderHistoryProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={backUrl}
        className="flex items-center w-fit gap-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition mb-6"
      >
        <MdKeyboardArrowLeft size={20} />
        Back To Account
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
          <FiBox size={50} className="p-2 border rounded-full text-gray-500" />
          <div>
            <p className="text-3xl font-semibold">{stats.pastOrders}</p>
            <p className="text-[#4A4C56] font-medium mt-1">Past Orders</p>
          </div>
        </div>

        <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
          <BiTask size={50} className="p-2 border rounded-full text-gray-500" />
          <div>
            <p className="text-3xl font-semibold">{stats.completed}</p>
            <p className="text-[#4A4C56] font-medium mt-1">Completed</p>
          </div>
        </div>

        <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
          <AiOutlineLoading3Quarters
            size={50}
            className="p-2 border rounded-full text-gray-500"
          />
          <div>
            <p className="text-3xl font-semibold">{stats.pending}</p>
            <p className="text-[#4A4C56] font-medium mt-1">Pending</p>
          </div>
        </div>

        <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
          <FaHandHoldingDollar
            size={50}
            className="p-2 border rounded-full text-gray-500"
          />
          <div>
            <p className="text-3xl font-semibold">${stats.totalSpend}</p>
            <p className="text-gray-500 text-sm mt-1">Total Spend</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-4 flex flex-col gap-4 hover:bg-gray-50 transition lg:flex-row lg:items-center"
          >
            {/* Left Section (Thumbnail + Basic Info) */}
            <div className="flex items-center gap-4 lg:flex-1">
              <Image
                src={order.thumbnail}
                width={80}
                height={100}
                alt="Order Thumbnail"
                className="rounded-lg h-20 w-16 object-cover shrink-0"
              />

              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{order.title}</h3>
                <p className="text-[#4A4C56] font-medium">
                  by{" "}
                  <span className="text-black underline">{order.vendor}</span>
                </p>
              </div>
            </div>

            {/* Right Section (Meta Data) */}
            <div className="flex flex-wrap gap-4 w-full lg:w-auto lg:flex-nowrap lg:gap-8">
              <div className="flex-1 min-w-[130px] sm:min-w-[140px]">
                <p className="text-[#777980] text-sm">Date</p>
                <p className="text-gray-700 font-medium">{order.date}</p>
              </div>

              <div className="flex-1 min-w-[130px] sm:min-w-[140px]">
                <p className="text-[#777980] text-sm">Price</p>
                <p className="text-gray-700 font-medium">${order.price}</p>
              </div>

              <div className="flex-1 min-w-[130px] sm:min-w-[140px]">
                <p className="text-[#777980] mb-1 text-sm">Status</p>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.status === "Complete"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
