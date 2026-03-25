"use client";

import Image from "next/image";
import ReusableTableForAll from "./ReusableTableForAll";
import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { SearchIcon } from "lucide-react";


interface PaymentUser {
  id: number;
  name: string;
  email: string;
  image: string;
  transactionId: string;
  amount: string;
  method: string;
  joined: string;
  status: "Success" | "Pending" | "Failed";
}

const payments: PaymentUser[] = [
  {
    id: 1,
    name: "Cody Fisher",
    email: "mno**@gmail.com",
    image: "/images/table/img01.png",
    transactionId: "TXN-5643",
    amount: "$32",
    method: "Stripe",
    joined: "05/12/2024",
    status: "Success",
  },
  {
    id: 2,
    name: "Jerome Bell",
    email: "mora**@gmail.com",
    image: "/images/table/img02.png",
    transactionId: "TXN-5643",
    amount: "$32",
    method: "Stripe",
    joined: "05/12/2024",
    status: "Success",
  },
  {
    id: 3,
    name: "Devon Lane",
    email: "mone**@gmail.com",
    image: "/images/table/img03.png",
    transactionId: "TXN-5643",
    amount: "$32",
    method: "Stripe",
    joined: "05/12/2024",
    status: "Success",
  },
  {
    id: 4,
    name: "Robert Fox",
    email: "mosir**@gmail.com",
    image: "/images/table/img01.png",
    transactionId: "TXN-5643",
    amount: "$32",
    method: "Stripe",
    joined: "05/12/2024",
    status: "Success",
  },
  {
    id: 5,
    name: "Kristin Watson",
    email: "monsi**@gmail.com",
    image: "/images/table/img02.png",
    transactionId: "TXN-5643",
    amount: "$32",
    method: "Stripe",
    joined: "05/12/2024",
    status: "Success",
  },
];

const columns = [
  {
    header: "Name / Email",
    render: (user: PaymentUser) => (
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
    header: "Transaction ID",
    render: (user: PaymentUser) => (
      <span className="text-sm text-gray-500">{user.transactionId}</span>
    ),
  },
  {
    header: "Amount",
    render: (user: PaymentUser) => (
      <span className="text-sm text-gray-500">{user.amount}</span>
    ),
  },
  {
    header: "Method",
    render: (user: PaymentUser) => (
      <span className="text-sm text-gray-500">{user.method}</span>
    ),
  },
  {
    header: "Joined",
    render: (user: PaymentUser) => (
      <span className="text-sm text-gray-500">{user.joined}</span>
    ),
  },
  {
    header: "Status",
    render: (user: PaymentUser) => {
      const statusClass =
        user.status === "Success"
          ? "bg-blue-100 text-[#4895ff]"
          : user.status === "Pending"
            ? "bg-yellow-100 text-[#D97706]"
            : "bg-red-100 text-[#FF5A5F]";

      return (
        <span className={`rounded-md px-3 py-1 text-xs ${statusClass}`}>
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

export default function PaymentManagementTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row xl:items-start">
        <div>
          <h2 className="text-lg font-semibold text-[#1D2433]">
            Payment Management
          </h2>
          <p className="text-sm text-gray-500">Control marketing campaigns</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2">
            <SearchIcon/>
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
          data={payments}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
