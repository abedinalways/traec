"use client";

import Image from "next/image";
import ReusableTableForAll from "./ReusableTableForAll";

import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import BoxIcon from "@/components/icons/BoxIcon";
import ListRightIcon from "@/icons/ListRightIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import SettingIcon from "@/icons/SettingsIcon";
import StarIcon from "@/components/icons/StarIcon";

interface OrderUser {
  id: number;
  name: string;
  email: string;
  image: string;
  role: "Customer" | "Seller";
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  activeOrders: number;
  rating: number;
  totalSpent: string;
  status: "Accepted" | "Rejected";
}

const orders: OrderUser[] = [
  {
    id: 1,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img01.png",
    role: "Customer",
    totalOrders: 45,
    completedOrders: 6,
    pendingOrders: 5,
    activeOrders: 2,
    rating: 4.9,
    totalSpent: "$2,456.00",
    status: "Accepted",
  },
  {
    id: 2,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img02.png",
    role: "Seller",
    totalOrders: 45,
    completedOrders: 6,
    pendingOrders: 5,
    activeOrders: 2,
    rating: 4.9,
    totalSpent: "$2,456.00",
    status: "Rejected",
  },
  {
    id: 3,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img03.png",
    role: "Customer",
    totalOrders: 45,
    completedOrders: 6,
    pendingOrders: 5,
    activeOrders: 2,
    rating: 4.9,
    totalSpent: "$2,456.00",
    status: "Accepted",
  },
  {
    id: 4,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img01.png",
    role: "Customer",
    totalOrders: 45,
    completedOrders: 6,
    pendingOrders: 5,
    activeOrders: 2,
    rating: 4.9,
    totalSpent: "$2,456.00",
    status: "Accepted",
  },
];

const columns = [
  {
    header: "Name / Email",
    render: (user: OrderUser) => (
      <div className="flex items-center gap-3">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center gap-1 text-[14px] font-medium text-gray-800">
            {user.name}
            <span className="text-xs text-green-500">●</span>
          </div>
          <p className="text-[13px] text-gray-500">{user.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Role",
    render: (user: OrderUser) => (
      <span
        className={`rounded-md px-3 py-1 text-xs font-medium ${
          user.role === "Customer"
            ? "bg-[#E8F7F3] text-[#17A38B]"
            : "bg-[#E8F3FF] text-[#3B82F6]"
        }`}
      >
        {user.role}
      </span>
    ),
  },
  {
    header: "Oder Details",
    render: (user: OrderUser) => (
      <div className="flex gap-4 text-sm text-gray-600">
        <div className="flex flex-col items-center gap-1 text-sm">
          <span className="rounded-full border border-[#dcebff] p-2">
            <BoxIcon />
          </span>
          {user.totalOrders}
        </div>
        <div className="flex flex-col items-center gap-1 text-sm">
          <span className="rounded-full border border-[#d7f5dd] p-2">
            <ListRightIcon />
          </span>
          {user.completedOrders}
        </div>
        <div className="flex flex-col items-center gap-1 text-sm">
          <span className="rounded-full border border-[#eadfff] p-2">
            <LoadingIcon />
          </span>
          {user.pendingOrders}
        </div>
      </div>
    ),
  },
  {
    header: "Active Status",
    render: (user: OrderUser) => (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-[16px] text-gray-600">
          <span className="rounded-full border border-red-200 p-2">
            <SettingIcon />
          </span>
          {user.activeOrders}
        </div>
        <div className="flex items-center gap-1 text-[16px] text-gray-600">
          <span className="rounded-full border border-orange-200 p-2">
            <StarIcon />
          </span>
          {user.rating}
        </div>
      </div>
    ),
  },
  {
    header: "Total Spent",
    render: (user: OrderUser) => (
      <span className="text-sm text-gray-500">{user.totalSpent}</span>
    ),
  },
  {
    header: "Status",
    render: (user: OrderUser) => (
      <span
        className={`rounded-[6px] px-3 py-3 text-xs ${
          user.status === "Accepted"
            ? "bg-blue-100 text-[#4895ff]"
            : "bg-red-100 text-[#FF5A5F]"
        }`}
      >
        {user.status}
      </span>
    ),
  },
  {
    header: "Actions",
    className: "pr-6 text-right",
    render: () => (
      <div className="flex justify-end gap-2">
        <button className="rounded-md bg-gray-100 p-2 hover:bg-gray-200">
          <EyeIcon />
        </button>
        <button className="rounded-md bg-gray-100 p-2 hover:bg-gray-200">
          <EditIcon />
        </button>
        <button className="rounded-md bg-red-100 p-2 hover:bg-red-200">
          <DeleteIcon />
        </button>
      </div>
    ),
  },
];

export default function OrderManagementTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <ReusableTableForAll
        columns={columns}
        data={orders}
        rowKey={(row) => row.id}
      />
    </div>
  );
}
