"use client";

import Image from "next/image";
import ReusableTableForAll from "./ReusableTableForAll";
import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { SearchIcon } from "lucide-react";

interface ReportUser {
  id: number;
  name: string;
  email: string;
  image: string;
  role: "Buyer" | "Seller";
  reportType: string;
  lastReport: string;
  reports: number;
  status: "Warned" | "Blocked";
}

// ✅ Dummy Data
const reportsData: ReportUser[] = [
  {
    id: 1,
    name: "Bessie Cooper",
    email: "mono@gmail.com",
    image: "/images/table/img01.png",
    role: "Buyer",
    reportType: "Spam Listings",
    lastReport: "05/12/2024",
    reports: 2,
    status: "Warned",
  },
  {
    id: 2,
    name: "Wade Warren",
    email: "mono@gmail.com",
    image: "/images/table/img02.png",
    role: "Seller",
    reportType: "Spam Listings",
    lastReport: "05/12/2024",
    reports: 2,
    status: "Warned",
  },
  {
    id: 3,
    name: "Savannah",
    email: "mono@gmail.com",
    image: "/images/table/img03.png",
    role: "Buyer",
    reportType: "Spam Listings",
    lastReport: "05/12/2024",
    reports: 2,
    status: "Warned",
  },
  {
    id: 4,
    name: "Dianne Russell",
    email: "mono@gmail.com",
    image: "/images/table/img01.png",
    role: "Buyer",
    reportType: "Spam Listings",
    lastReport: "05/12/2024",
    reports: 2,
    status: "Warned",
  },
  {
    id: 5,
    name: "Kristin Watson",
    email: "mono@gmail.com",
    image: "/images/table/img02.png",
    role: "Buyer",
    reportType: "Spam Listings",
    lastReport: "05/12/2024",
    reports: 2,
    status: "Warned",
  },
];

// ✅ Columns
const columns = [
  {
    header: "Name / Email",
    render: (user: ReportUser) => (
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
    header: "Role",
    render: (user: ReportUser) => {
      const roleClass =
        user.role === "Buyer"
          ? "bg-blue-100 text-blue-600"
          : "bg-green-100 text-green-600";

      return (
        <span className={`px-3 py-1 text-xs rounded-md ${roleClass}`}>
          {user.role}
        </span>
      );
    },
  },

  {
    header: "Type",
    render: (user: ReportUser) => (
      <span className="text-sm text-gray-500">{user.reportType}</span>
    ),
  },

  {
    header: "Last Report",
    render: (user: ReportUser) => (
      <span className="text-sm text-gray-500">{user.lastReport}</span>
    ),
  },

  {
    header: "Reports",
    render: (user: ReportUser) => (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs text-red-500">
          !
        </span>
        {user.reports}
      </div>
    ),
  },

  {
    header: "Status",
    render: (user: ReportUser) => (
      <span className="rounded-md bg-blue-100 px-3 py-1 text-xs text-blue-600">
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

export default function ReportManagementTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row xl:items-start">
        <div>
          <h2 className="text-lg font-semibold text-[#1D2433]">
            Report Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage users reported by system or admins
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
            <option>All Status</option>
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
          data={reportsData}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
