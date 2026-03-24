"use client";

import Image from "next/image";

import VerifyIcon from "@/icons/VerifyIcon";
import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import BoxIcon from "@/components/icons/BoxIcon";

import ReusableTableForAll from "./ReusableTableForAll";

interface ClientUser {
  id: number;
  name: string;
  email: string;
  image: string;
  orders: number;
  totalSpent: string;
  joined: string;
  status: "Active" | "Inactive";
}

const users: ClientUser[] = [
  {
    id: 1,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img01.png",
    orders: 456,
    totalSpent: "$2,456.00",
    joined: "05/12/2024",
    status: "Active",
  },
  {
    id: 2,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img02.png",
    orders: 456,
    totalSpent: "$2,456.00",
    joined: "05/12/2024",
    status: "Active",
  },
  {
    id: 3,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img03.png",
    orders: 456,
    totalSpent: "$2,456.00",
    joined: "05/12/2024",
    status: "Active",
  },
];

const columns = [
  {
    header: "Name / Email",
    render: (user: ClientUser) => (
      <div className="flex items-center gap-3">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center gap-1 text-[14px] font-medium text-gray-800">
            {user.name}
            <span className="text-green-500 text-xs">●</span>
          </div>
          <p className="text-[13px] text-gray-500">{user.email}</p>
        </div>
      </div>
    ),
  },

  {
    header: "Oder Details",
    render: (user: ClientUser) => (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="p-2 rounded-full border border-[#dcebff]">
          <BoxIcon />
        </span>
        {user.orders}
      </div>
    ),
  },

  {
    header: "Total Spent",
    render: (user: ClientUser) => (
      <span className="text-gray-500 text-sm">{user.totalSpent}</span>
    ),
  },

  {
    header: "Joined",
    render: (user: ClientUser) => (
      <span className="text-gray-500 text-sm">{user.joined}</span>
    ),
  },

  {
    header: "Status",
    render: (user: ClientUser) => (
      <span className="px-3 py-1 text-xs bg-blue-100 text-[#4895ff] rounded-md">
        {user.status}
      </span>
    ),
  },

  {
    header: "Actions",
    className: "text-right pr-6",
    render: () => (
      <div className="flex justify-end gap-2">
        <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
          <EyeIcon />
        </button>
        <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
          <EditIcon />
        </button>
        <button className="p-2 rounded-md bg-red-100 hover:bg-red-200">
          <DeleteIcon />
        </button>
      </div>
    ),
  },
];

export default function ClientManagementTable() {
  return (
    <div className="bg-white rounded-2xl  overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Client Management
          </h2>
          <p className="text-sm text-gray-500">
            Oversee and control user accounts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search users..."
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none"
          />

          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg">
            <option>All Status</option>
          </select>

          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg">
            <option>Monthly</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200  rounded-b-2xl">
        <ReusableTableForAll
          columns={columns}
          data={users}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
