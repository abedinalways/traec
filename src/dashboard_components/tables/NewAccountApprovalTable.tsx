"use client";

import Image from "next/image";

import EyeIcon from "@/icons/EyeIcon";





import MailIcon from "@/icons/MailIcon";
import ReusableTableForAll from "./ReusableTableForAll";
import PhoneIcon from "@/icons/PhoneIcon";
import LocationIcon from "@/icons/LocationIcon";
import CheckIcon from "@/icons/CheckIcon";
import CloseIcon from "@/icons/CloseIcon";

interface ApprovalUser {
  id: number;
  name: string;
  subName: string;
  image: string;
  location: string;
  email: string;
  phone: string;
  address: string;
  status: "Pending" | "Approved" | "Rejected";
}

const approvalUsers: ApprovalUser[] = [
  {
    id: 1,
    name: "Frank Flores",
    subName: "David Miller",
    image: "/images/table/img01.png",
    location: "05/12/2024",
    email: "info@evoke.com",
    phone: "+7xxxxxxx",
    address: "123 Education...",
    status: "Pending",
  },
  {
    id: 2,
    name: "Frank Flores",
    subName: "David Miller",
    image: "/images/table/img02.png",
    location: "05/12/2024",
    email: "info@evoke.com",
    phone: "+7xxxxxxx",
    address: "123 Education...",
    status: "Pending",
  },
  {
    id: 3,
    name: "Frank Flores",
    subName: "David Miller",
    image: "/images/table/img03.png",
    location: "05/12/2024",
    email: "info@evoke.com",
    phone: "+7xxxxxxx",
    address: "123 Education...",
    status: "Pending",
  },
  {
    id: 4,
    name: "Frank Flores",
    subName: "David Miller",
    image: "/images/table/img01.png",
    location: "05/12/2024",
    email: "info@evoke.com",
    phone: "+7xxxxxxx",
    address: "123 Education...",
    status: "Pending",
  },
  {
    id: 5,
    name: "Frank Flores",
    subName: "David Miller",
    image: "/images/table/img02.png",
    location: "05/12/2024",
    email: "info@evoke.com",
    phone: "+7xxxxxxx",
    address: "123 Education...",
    status: "Pending",
  },
];

const columns = [
  {
    header: "Name / Email",
    render: (user: ApprovalUser) => (
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
          <p className="text-[12px] text-gray-500">{user.subName}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Location",
    render: (user: ApprovalUser) => (
      <span className="text-sm text-gray-500">{user.location}</span>
    ),
  },
  {
    header: "Email",
    render: (user: ApprovalUser) => (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <MailIcon />
        <span>{user.email}</span>
      </div>
    ),
  },
  {
    header: "Phone",
    render: (user: ApprovalUser) => (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <PhoneIcon />
        <span>{user.phone}</span>
      </div>
    ),
  },
  {
    header: "L",
    render: (user: ApprovalUser) => (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <LocationIcon />
        <span>{user.address}</span>
      </div>
    ),
  },
  {
    header: "Status",
    render: (user: ApprovalUser) => (
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
        <button className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200">
          <EyeIcon />
        </button>
        <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#DCFCE7] hover:bg-[#c7f6d7]">
          <CheckIcon/>
        </button>
        <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FEE2E2] hover:bg-[#fecaca]">
          <CloseIcon />
        </button>
      </div>
    ),
  },
];

export default function NewAccountApprovalTable() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            New Account Approval
          </h2>
          <p className="text-sm text-gray-500">
            Verify and approve new service providers
          </p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-b-2xl overflow-hidden">
        <ReusableTableForAll
          columns={columns}
          data={approvalUsers}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
