"use client";

import ReusableTableForAll from "./ReusableTableForAll";
import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { SearchIcon } from "lucide-react";


interface PromotionItem {
  id: number;
  name: string;
  discount: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive";
}

const promotions: PromotionItem[] = [
  {
    id: 1,
    name: "SUMMER 26",
    discount: "25%",
    type: "Flash Sale",
    startDate: "05/12/2024",
    endDate: "05/12/2024",
    status: "Active",
  },
  {
    id: 2,
    name: "SUMMER 26",
    discount: "25%",
    type: "Flash Sale",
    startDate: "05/12/2024",
    endDate: "05/12/2024",
    status: "Active",
  },
  {
    id: 3,
    name: "SUMMER 26",
    discount: "25%",
    type: "Flash Sale",
    startDate: "05/12/2024",
    endDate: "05/12/2024",
    status: "Active",
  },
  {
    id: 4,
    name: "SUMMER 26",
    discount: "25%",
    type: "Flash Sale",
    startDate: "05/12/2024",
    endDate: "05/12/2024",
    status: "Active",
  },
  {
    id: 5,
    name: "SUMMER 26",
    discount: "25%",
    type: "Flash Sale",
    startDate: "05/12/2024",
    endDate: "05/12/2024",
    status: "Active",
  },
];

const columns = [
  {
    header: "Name",
    render: (item: PromotionItem) => (
      <span className="text-[14px] font-medium text-[#1D2433]">
        {item.name}
      </span>
    ),
  },
  {
    header: "Discount",
    render: (item: PromotionItem) => (
      <span className="rounded-md bg-[#E8F7F3] px-3 py-1 text-xs font-medium text-[#17A38B]">
        {item.discount}
      </span>
    ),
  },
  {
    header: "Type",
    render: (item: PromotionItem) => (
      <span className="text-sm text-gray-500">{item.type}</span>
    ),
  },
  {
    header: "Start Date",
    render: (item: PromotionItem) => (
      <span className="text-sm text-gray-500">{item.startDate}</span>
    ),
  },
  {
    header: "End Date",
    render: (item: PromotionItem) => (
      <span className="text-sm text-gray-500">{item.endDate}</span>
    ),
  },
  {
    header: "Status",
    render: (item: PromotionItem) => (
      <span className="rounded-md bg-blue-100 px-3 py-1 text-xs text-[#4895ff]">
        {item.status}
      </span>
    ),
  },
  {
    header: "Actions",
    className: "text-right pr-6",
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

export default function PromotionManagementTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row xl:items-start">
        <div>
          <h2 className="text-lg font-semibold text-[#1D2433]">
            Promotion Management
          </h2>
          <p className="text-sm text-gray-500">Control marketing campaigns</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2">
            <SearchIcon className="h-4 w-4 text-gray-400" />
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

          <button className="rounded-lg bg-[#0B0F19] px-4 py-2 text-sm font-medium cursor-pointer text-white">
            + Create Promotion
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-b-2xl border border-gray-200">
        <ReusableTableForAll
          columns={columns}
          data={promotions}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
