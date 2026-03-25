import React from "react";
import {
  PencilIcon,
  SearchIcon,
  ChevronDownIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import ProviderCard from "./ProviderCard";
import EditIcon from "../icons/EditIcon";



function ServiceCategorySection() {
  const providers = Array(6).fill({
    name: "Cody Fisher",
    role: "DJ",
    location: "New York NY",
    rating: "4.9",
    reviews: "234",
    image: "/images/experts/experts01.png",
  });

  return (
    <div className=" p-8 min-h-screen font-[inter]">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[14px] font-bold text-[#333] mb-4">
            Manage Service Category
          </h3>
          <h2 className="text-[24px] font-extrabold text-[#1a2b4b] mb-1">
            Expert Service Providers
          </h2>
          <p className="text-[16px] text-gray-500">
            Connect with our top-rated professionals who consistently deliver
            exceptional results
          </p>
        </div>
        <button className="text-gray-500 hover:text-black mt-1 cursor-pointer">
          <EditIcon />
        </button>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <span className="text-gray-500 text-[14px]">
          Showing 1 of 30 services
        </span>

        <div className="flex gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              className="bg-[#edf2f7] border border-[#dfe1e7] rounded-lg py-2 pl-4 pr-10 text-[14px] focus:ring-1 focus:ring-blue-300 outline-none w-64"
              placeholder="Search"
            />
            <SearchIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-[#edf2f7] border border-[#dfe1e7] rounded-lg py-2 pl-4 pr-10 text-[14px] focus:ring-1 focus:ring-blue-300 outline-none cursor-pointer text-gray-600 min-w-[120px]">
              <option>Category</option>
            </select>
            <ChevronDownIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* Provider Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((item, idx) => (
          <ProviderCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

export default ServiceCategorySection;
