"use client";

import Image from "next/image";

import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import BoxIcon from "@/components/icons/BoxIcon";
import StarIcon from "@/components/icons/StarIcon";

import ReusableTableForAll from "./ReusableTableForAll";

interface SellerProvider {
  id: number;
  name: string;
  email: string;
  image: string;
  products: number;
  totalSales: string;
  rating: string;
  commission: string;
  status: "Active" | "Inactive";
}

const sellers: SellerProvider[] = [
  {
    id: 1,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img01.png",
    products: 456,
    totalSales: "$2,456.00",
    rating: "4.8(1234)",
    commission: "$4,472.80",
    status: "Active",
  },
  {
    id: 2,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img02.png",
    products: 456,
    totalSales: "$2,456.00",
    rating: "4.8(1234)",
    commission: "$3,361.70",
    status: "Active",
  },
  {
    id: 3,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img03.png",
    products: 456,
    totalSales: "$2,456.00",
    rating: "4.8(1234)",
    commission: "$7,283.90",
    status: "Active",
  },
  {
    id: 4,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img01.png",
    products: 456,
    totalSales: "$2,456.00",
    rating: "4.8(1234)",
    commission: "$1,172.80",
    status: "Active",
  },
  {
    id: 5,
    name: "Frank Flores",
    email: "fra****@***.com",
    image: "/images/table/img02.png",
    products: 456,
    totalSales: "$2,456.00",
    rating: "4.8(1234)",
    commission: "$3,361.70",
    status: "Active",
  },
];

const columns = [
  {
    header: "Seller",
    render: (seller: SellerProvider) => (
      <div className="flex items-center gap-3">
        <Image
          src={seller.image}
          alt={seller.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center gap-1 text-[14px] font-medium text-gray-800">
            {seller.name}
            <span className="text-green-500 text-xs">●</span>
          </div>
          <p className="text-[13px] text-gray-500">{seller.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Products",
    render: (seller: SellerProvider) => (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="p-2 rounded-full border border-[#dcebff]">
          <BoxIcon />
        </span>
        {seller.products}
      </div>
    ),
  },
  {
    header: "Total Sales",
    render: (seller: SellerProvider) => (
      <span className="text-gray-500 text-sm">{seller.totalSales}</span>
    ),
  },
  {
    header: "Rating",
    render: (seller: SellerProvider) => (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <StarIcon />
        <span>{seller.rating}</span>
      </div>
    ),
  },
  {
    header: "Commission",
    render: (seller: SellerProvider) => (
      <span className="text-gray-500 text-sm">{seller.commission}</span>
    ),
  },
  {
    header: "Status",
    render: (seller: SellerProvider) => (
      <span className="px-3 py-1 text-xs bg-blue-100 text-[#4895ff] rounded-md">
        {seller.status}
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

export default function SellerProvidersTable() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Seller/Providers
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

      <div className="border border-gray-200 rounded-b-2xl overflow-hidden">
        <ReusableTableForAll
          columns={columns}
          data={sellers}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
