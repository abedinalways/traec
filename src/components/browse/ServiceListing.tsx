
"use client";

import { useState, useMemo } from "react";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FiltersSidebar from "./FilterSidebar";
import { ServiceItem, useGetServicesListQuery } from "@/app/api/services/serviceManagementApi";


export default function ServiceListing() {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Featured");


  const { data: apiResponse, isLoading } = useGetServicesListQuery({
    search: searchFilter,
    category: selectedCategory,
    page: currentPage,
    per_page: 9,
  });

  const servicesList = apiResponse?.data || [];
  const meta = apiResponse?.meta;
  const totalPages = meta?.last_page || 1;

  
  const processedServices = useMemo(() => {
   const result = [...servicesList];

    
    if (sortBy === "Price: Low to High") {
      result.sort(
        (a, b) =>
          Number(a.pricings?.[0]?.price || 0) -
          Number(b.pricings?.[0]?.price || 0),
      );
    } else if (sortBy === "Price: High to Low") {
      result.sort(
        (a, b) =>
          Number(b.pricings?.[0]?.price || 0) -
          Number(a.pricings?.[0]?.price || 0),
      );
    }
    return result;
  }, [servicesList, sortBy]);

  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 md:px-0 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_9fr] gap-6">
          {/* Sidebar Filters Component */}
          <FiltersSidebar
            activeCategory={selectedCategory}
            onCategoryChange={handleCategorySelect}
            onSearchChange={(val) => {
              setSearchFilter(val);
              setCurrentPage(1);
            }}
          />

          {/* Main Content */}
          <main className="flex-1 font-[inter]">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {isLoading
                  ? "Loading services..."
                  : `Showing ${processedServices.length} of ${meta?.total || 0} services`}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>

            {/* Service Grid Container */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg h-80 animate-pulse border border-gray-200"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {processedServices.map((service: ServiceItem) => {
                  
                  const displayImage =
                    service.images?.[0] || "/images/browser/img01.png";
                  const basePrice = service.pricings?.[0]?.price || "0.00";

                  return (
                    <div
                      key={service.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={displayImage}
                          alt={service.title}
                          fill
                          sizes="(max-w-768px) 100vw, 33vw"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex flex-col  mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <Image
                                src={
                                  service.image_url ||
                                  "/images/default_provider.png"
                                }
                                alt="provider"
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded-full mr-2"
                                unoptimized
                              />
                              <span className="text-sm text-center font-medium text-gray-900">
                                {service.provider_name}
                              </span>
                            </div>

                            <div className="ml-auto flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-sm font-semibold">4.9</span>
                              <span className="text-xs text-gray-500 ml-1">
                                (12)
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <span className="text-sm font-medium text-gray-900 flex items-center">
                              <Image src='/images/profile/category.png' alt='category' width={12} height={12} className="inline-block mr-1" />
                              {service.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 pt-4 line-clamp-2">
                          {service.title}
                        </p>
                        <p className="text-sm text-gray-700 my-6 line-clamp-2 ">
                          {service.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {service.location}
                        </div>
                        <div className="flex items-center mt-1 justify-between">
                          <div className="text-sm">
                            <span className="text-red-600 font-semibold">
                              ${basePrice}
                            </span>
                            <span className="text-gray-500"> /Per Person</span>
                          </div>
                          <Link href={`/browse/details/${service.id}`}>
                            <button className="w-full px-4 py-2 text-sm text-black underline transition-colors cursor-pointer">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Component Context */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded cursor-pointer ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  &gt;
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}