"use client";

import Image from "next/image";
import ReusableTableForAll from "./ReusableTableForAll";
import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { SearchIcon } from "lucide-react";


interface SubscriptionUser {
  id: number;
  name: string;
  email: string;
  image: string;
  plan: "Basic" | "Standard" | "Premium";
  billing: string;
  amount: string;
  joined: string;
  status: "Active" | "Inactive";
}

const subscriptions: SubscriptionUser[] = [
  {
    id: 1,
    name: "Wade Warren",
    email: "mno**@gmail.com",
    image: "/images/table/img01.png",
    plan: "Basic",
    billing: "Per Hours",
    amount: "$32",
    joined: "05/12/2024",
    status: "Active",
  },
  {
    id: 2,
    name: "Albert Flores",
    email: "blu**@gmail.com",
    image: "/images/table/img02.png",
    plan: "Standard",
    billing: "Per Hours",
    amount: "$71",
    joined: "05/12/2024",
    status: "Active",
  },
  {
    id: 3,
    name: "Cameron William",
    email: "gha**@gmail.com",
    image: "/images/table/img03.png",
    plan: "Premium",
    billing: "Per Hours",
    amount: "$77",
    joined: "05/12/2024",
    status: "Active",
  },
  {
    id: 4,
    name: "Eleanor Pena",
    email: "hans**@gmail.com",
    image: "/images/table/img01.png",
    plan: "Basic",
    billing: "Per Hours",
    amount: "$85",
    joined: "05/12/2024",
    status: "Active",
  },
  {
    id: 5,
    name: "Darrell Steward",
    email: "mic**@gmail.com",
    image: "/images/table/img02.png",
    plan: "Basic",
    billing: "Per Hours",
    amount: "$49",
    joined: "05/12/2024",
    status: "Active",
  },
];

const columns = [
  {
    header: "Name / Email",
    render: (user: SubscriptionUser) => (
      <div className="flex items-center gap-3">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <div className="text-[14px] font-medium text-[#1D2433]">
            {user.name}
          </div>
          <p className="text-[12px] text-gray-500">{user.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Plan",
    render: (user: SubscriptionUser) => {
      const planClass =
        user.plan === "Basic"
          ? "bg-[#E8F7F3] text-[#17A38B]"
          : user.plan === "Standard"
            ? "bg-[#EEF2FF] text-[#6366F1]"
            : "bg-[#FEF3C7] text-[#D97706]";

      return (
        <span
          className={`rounded-md px-3 py-1 text-xs font-medium ${planClass}`}
        >
          {user.plan}
        </span>
      );
    },
  },
  {
    header: "Billing",
    render: (user: SubscriptionUser) => (
      <span className="text-sm text-gray-500">{user.billing}</span>
    ),
  },
  {
    header: "Amount",
    render: (user: SubscriptionUser) => (
      <span className="text-sm text-gray-500">{user.amount}</span>
    ),
  },
  {
    header: "Joined",
    render: (user: SubscriptionUser) => (
      <span className="text-sm text-gray-500">{user.joined}</span>
    ),
  },
  {
    header: "Status",
    render: (user: SubscriptionUser) => (
      <span className="rounded-md bg-blue-100 px-3 py-1 text-xs text-[#4895ff]">
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

export default function SubscriptionManagementTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row xl:items-start">
        <div>
          <h2 className="text-lg font-semibold text-[#1D2433]">
            Subscription Management
          </h2>
          <p className="text-sm text-gray-500">Control marketing campaigns</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <select className="rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2 text-sm text-gray-500 outline-none">
            <option>All Status</option>
          </select>

          <select className="rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2 text-sm text-gray-500 outline-none">
            <option>Monthly</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-b-2xl border border-gray-200">
        <ReusableTableForAll
          columns={columns}
          data={subscriptions}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
