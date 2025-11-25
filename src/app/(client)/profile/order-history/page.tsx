import { Card } from "@/components/ui/card";
import Link from "next/link";
import { LuBox } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { RiFilter2Fill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";

import { MdKeyboardArrowLeft } from "react-icons/md";
import Image from "next/image";

interface OrderItem {
  id: number;
  title: string;
  vendor: string;
  date: string;
  price: number;
  status: "Complete" | "Progress" | "Pending";
  image: string;
}

const stats = [
  {
    label: "Past Orders",
    value: "11",
    icon: <LuBox size={32} />,
  },
  { label: "Completed", value: "02", icon: <TfiWrite size={32} /> },
  { label: "Pending", value: "06", icon: <RiFilter2Fill size={32} /> },
  { label: "Total Send", value: "$560", icon: <GiTakeMyMoney size={32} /> },
];

const orders: OrderItem[] = [
  {
    id: 1,
    title: "Sofia's 7th Birthday Pri...",
    vendor: "Part Pro Rentals",
    date: "1/15/2024",
    price: 545,
    status: "Complete",
    image: "/images/browser/img07.png",
  },
  {
    id: 2,
    title: "Sofia's 7th Birthday Pri...",
    vendor: "Part Pro Rentals",
    date: "1/15/2024",
    price: 545,
    status: "Complete",
    image: "/images/browser/img07.png",
  },
  {
    id: 3,
    title: "Sofia's 7th Birthday Pri...",
    vendor: "Part Pro Rentals",
    date: "1/15/2024",
    price: 545,
    status: "Complete",
    image: "/images/browser/img07.png",
  },
  {
    id: 4,
    title: "Sofia's 7th Birthday Pri...",
    vendor: "Part Pro Rentals",
    date: "1/15/2024",
    price: 545,
    status: "Progress",
    image: "/images/browser/img07.png",
  },
];

export default function OrderHistoryPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={"/profile"}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border  text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} className="pt-1" />
        Back To Account
      </Link>

      <div className="my-5">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
        <p className="text-gray-500">View your past events and bookings</p>
      </div>
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <Card key={i} className="p-2  shadow-none">
            <div className="flex items-center gap-2">
              {s?.icon}
              <div>
                <p className="font-bold">{s?.value}</p>
                <p>{s?.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border shadow-sm p-4 flex flex-row items-center justify-between md:items-start gap-4"
          >
            <div className="flex flex-col md:flex-row items-center gap-5">
              {/* Image */}
              <Image
                src={order.image}
                alt="Order"
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />

              {/* Details */}
              <div className="">
                <h3 className="text-[15px] font-medium">{order.title}</h3>
                <p className="text-sm text-gray-500">
                  by <span className="underline">{order.vendor}</span>
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p className="mb-2">Date</p>
              <p className="font-medium">{order.date}</p>
            </div>
            <div className="text-sm text-gray-700">
              <p className="mb-2">Price</p>
              <p className="font-medium">${order.price}</p>
            </div>
            <div className="text-sm text-gray-700">
              <p className="mb-2">Status</p>
              <span
                className={`px-3 py-1  rounded-full text-xs font-medium ${
                  order.status === "Complete"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Progress"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
