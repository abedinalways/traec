"use client";

import Image from "next/image";
import ReusableTableForAll from "./ReusableTableForAll";
import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { SearchIcon } from "lucide-react";

interface SupportUser {
  id: number;
  name: string;
  email: string;
  image: string;
  ticketId: string;
  type: "Buyer" | "Seller";
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Resolved" | "Closed";
}

// ✅ Dummy Data
const supportData: SupportUser[] = [
  {
    id: 1,
    name: "Cody Fisher",
    email: "mono@gmail.com",
    image: "/images/table/img01.png",
    ticketId: "TKT-007",
    type: "Buyer",
    category: "Payment Issue",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Jerome Bell",
    email: "mono@gmail.com",
    image: "/images/table/img02.png",
    ticketId: "TXN-5643",
    type: "Seller",
    category: "Account Access",
    priority: "High",
    status: "Resolved",
  },
  {
    id: 3,
    name: "Devon Lane",
    email: "mono@gmail.com",
    image: "/images/table/img03.png",
    ticketId: "TXN-5643",
    type: "Seller",
    category: "Order Dispute",
    priority: "Medium",
    status: "Closed",
  },
  {
    id: 4,
    name: "Robert Fox",
    email: "mono@gmail.com",
    image: "/images/table/img01.png",
    ticketId: "TXN-5643",
    type: "Buyer",
    category: "Account Access",
    priority: "Low",
    status: "In Progress",
  },
  {
    id: 5,
    name: "Kristin Watson",
    email: "mono@gmail.com",
    image: "/images/table/img02.png",
    ticketId: "TXN-5643",
    type: "Seller",
    category: "Refund Request",
    priority: "Medium",
    status: "In Progress",
  },
];

const columns = [
  {
    header: "User",
    render: (user: SupportUser) => (
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
    header: "Ticket ID",
    render: (user: SupportUser) => (
      <span className="text-sm text-gray-500">{user.ticketId}</span>
    ),
  },

  {
    header: "Type",
    render: (user: SupportUser) => {
      const typeClass =
        user.type === "Buyer"
          ? "bg-blue-100 text-blue-600"
          : "bg-green-100 text-green-600";

      return (
        <span className={`px-3 py-1 text-xs rounded-md ${typeClass}`}>
          {user.type}
        </span>
      );
    },
  },

  {
    header: "Category",
    render: (user: SupportUser) => (
      <span className="text-sm text-gray-500">{user.category}</span>
    ),
  },

  {
    header: "Priority",
    render: (user: SupportUser) => {
      const priorityClass =
        user.priority === "High"
          ? "text-red-500"
          : user.priority === "Medium"
            ? "text-yellow-500"
            : "text-green-500";

      return (
        <span className="text-sm font-medium">
          <span className={priorityClass}>{user.priority}</span>
        </span>
      );
    },
  },

  {
    header: "Status",
    render: (user: SupportUser) => {
      const statusClass =
        user.status === "Resolved"
          ? "bg-green-100 text-green-600"
          : user.status === "Closed"
            ? "bg-gray-200 text-gray-600"
            : "bg-blue-100 text-blue-600";

      return (
        <span className={`px-3 py-1 text-xs rounded-md ${statusClass}`}>
          {user.status}
        </span>
      );
    },
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

export default function HelpSupportTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row xl:items-start">
        <div>
          <h2 className="text-lg font-semibold text-[#1D2433]">
            Help & Support
          </h2>
          <p className="text-sm text-gray-500">
            Manage customer and seller support requests
          </p>
        </div>

        {/* Filters */}
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
            <option>User Type</option>
          </select>

          <select className="rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2 text-sm text-gray-500 outline-none">
            <option>Monthly</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-b-2xl border border-gray-200">
        <ReusableTableForAll
          columns={columns}
          data={supportData}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}