/** @format */
"use client";

import React, { useState } from "react";
import ServiceCard, { Service } from "../_components/ServiceCard";
import services from "../../../../data/services.json";
import BrowseBanner from "@/components/browse/BrowseBanner";

const ProvidersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Extract unique categories
  const categories = Array.from(
    new Set(services.map((service: Service) => service.category))
  );

  // Filter by BOTH search and category
  const filteredServices = services.filter((service: Service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category ? service.category === category : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <BrowseBanner />
      <div className='custom-container mx-auto font-[inter]'>
        <div className='flex justify-between items-center p-4 flex-wrap gap-5'>
          <p className='text-base'>
            Showing {filteredServices.length} of {services.length} services
          </p>

          <div className='flex items-center gap-4'>
            {/* Search Input */}
            <input
              type='text'
              placeholder='Search by title'
              className='p-2 text-base border border-gray-300 rounded-md w-full'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Category Filter */}
            <select
              className='p-2 text-base border border-gray-300 rounded-md'
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value=''>All Category</option>

              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Service List */}
        {filteredServices.length === 0 ? (
          <div className='text-center p-4 text-lg font-medium text-gray-600'>
            No Services Found
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4'>
            {filteredServices.map((service: Service, index: number) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProvidersPage;
