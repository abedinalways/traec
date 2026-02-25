"use client";

import BoxIcon from "@/components/icons/BoxIcon";
import DashboardTable from "./DashboardTable";
import { TableCell, TableRow } from "@/components/ui/table";

import LoadingIcon from "@/icons/LoadingIcon";

import StarIcon from "@/components/icons/StarIcon";
import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import Image from "next/image";
import VerifyIcon from "@/icons/VerifyIcon";
import ListingIcon from "@/components/icons/ListingIcon";
import ListRightIcon from "@/icons/ListRightIcon";
import { SettingsIcon } from "@/icons";
import SettingIcon from "@/icons/SettingsIcon";


/* Custom Icons (your icons) */
// <-- your custom icon file

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  role: "Customer" | "Seller";
  activeOrders: number;
  rating: number;
  totalSpent: string;
  status: "Active" | "Inactive";
}

const users: User[] = [
  {
    id: 1,
    name: "Frank Flores",
    image: "/images/table/img01.png",
    email: "fra****@***.com",
    role: "Customer",
    activeOrders: 2,
    rating: 4.9,
    totalSpent: "$2,456.00",
    status: "Active",
  },
  {
    id: 2,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img02.png",
    role: "Seller",
    activeOrders: 2,
    rating: 4.9,
    totalSpent: "$2,456.00",
    status: "Active",
  },
  {
    id: 3,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img03.png",
    role: "Seller",
    activeOrders: 2,
    rating: 4.9,
    totalSpent: "$2,456.00",
    status: "Active",
  },
 
];

const columns = [
  { header: "Name / Email" },
  { header: "Role" },
  { header: "Order Details" },
  { header: "Active Status" },
  { header: "Total Spent" },
  { header: "Status" },
  { header: "Actions", className: "text-right pr-6" },
];

export default function UserSummaryTable() {
  return (
    <div className="bg-[#F9FAFB] rounded-3xl border border-gray-200 my-2">
      <div className="flex items-center justify-between mb-2 p-4">
        <h3 className="text-[18px] font-semibold text-gray-800">
          User Summary
        </h3>

        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-600 outline-none">
          <option>Monthly</option>
        </select>
      </div>

      <DashboardTable
        columns={columns}
        data={users}
        renderRow={(user) => (
          <TableRow
            key={user.id}
            className="hover:bg-gray-50 transition-colors "
          >
            {/* Name */}
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="rounded-full  border border-gray-200">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                  />
                </span>
                <div>
                  <div className="flex items-center gap-1 font-medium text-gray-800 text-[14px]">
                    {user.name}
                    <VerifyIcon />
                  </div>
                  <p className="text-[14px] text-gray-500">{user.email}</p>
                </div>
              </div>
            </TableCell>

            {/* Role */}
            <TableCell>
              <span
                className={`px-[10px] py-[6px] text-xs rounded-[6px] font-medium ${
                  user.role === "Customer"
                    ? "bg-[#e9faf7] text-[#1a9882]"
                    : "bg-[#e6f8ff] text-[#08f]"
                }`}
              >
                {user.role}
              </span>
            </TableCell>

            {/* Order Details */}
            <TableCell>
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex flex-col items-center gap-1 text-sm">
                  <span className="border border-[#dcebff] p-2 rounded-full">
                    <BoxIcon />
                  </span>{" "}
                  45
                </div>
                <div className="flex flex-col items-center gap-1 text-sm">
                  <span className="border border-[#dcebff] p-2 rounded-full">
                    <ListRightIcon />{" "}
                  </span>
                  6
                </div>
                <div className="flex flex-col items-center gap-1 text-sm">
                  <span className="border border-[#dcebff] p-2 rounded-full">
                    <LoadingIcon />
                  </span>
                  5
                </div>
              </div>
            </TableCell>

            {/* Active Status */}
            <TableCell>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-[16px]  text-gray-600">
                  <span className="rounded-full p-2 border border-red-200">
                    <SettingIcon />{" "}
                  </span>{" "}
                  {user.activeOrders}
                </div>
                <div className="flex items-center gap-1 text-[16px] text-gray-600">
                  <span className="rounded-full p-2 border border-orange-200">
                    <StarIcon />
                  </span>{" "}
                  {user.rating}
                </div>
              </div>
            </TableCell>

            {/* Total Spent */}
            <TableCell className="text-gray-400 font-normal text-[16px] ">
              {user.totalSpent}
            </TableCell>

            {/* Status */}
            <TableCell>
              <span className="px-[10px] py-[6px] text-[16px] bg-blue-100 text-[#4895ff] rounded-[6px]">
                {user.status}
              </span>
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right pr-6">
              <div className="flex justify-end gap-2">
                <button className="p-2 rounded-[8px] bg-gray-100 hover:bg-gray-200">
                  <EyeIcon />
                </button>
                <button className="p-2 rounded-[8px] bg-gray-100 hover:bg-gray-200">
                  <EditIcon />
                </button>
                <button className="p-2 rounded-[8px] bg-red-100 hover:bg-red-200">
                  <DeleteIcon />
                </button>
              </div>
            </TableCell>
          </TableRow>
        )}
      />
    </div>
  );
}
