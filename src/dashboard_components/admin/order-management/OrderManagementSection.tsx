"use client";

import OrderManagementStats from "@/dashboard_components/card/OrderManagementStatCard";
import OrderManagementTable from "@/dashboard_components/tables/OrderManagementTable";
import { SearchIcon } from "lucide-react";



export default function OrderManagementSection() {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="mb-4 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div>
          <h2 className="text-[24px] font-semibold text-[#1D2433]">
            Order Management
          </h2>
          <p className="mt-1 text-[14px] text-gray-500">
            Track and manage all platform orders
          </p>
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
        </div>
      </div>

      <div className="mb-4">
        <OrderManagementStats/>
      </div>

      <OrderManagementTable/>
    </div>
  );
}
