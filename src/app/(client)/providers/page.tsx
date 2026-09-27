
/** @format */
"use client";

import React, { useMemo, useState } from "react";
import ServiceCard, { Service } from "../_components/ServiceCard";
import BrowseBanner from "@/components/browse/BrowseBanner";
import { useGetProvidersQuery } from "@/app/api/providerApi";
import {
  getProviderCategoryText,
  getProviderImageUrl,
  getProviderLocation,
  getProviderName,
  getProviderShortCategoryText,
} from "@/lib/providerHelpers";

const ProvidersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data, isLoading, isError } = useGetProvidersQuery({ page: 1 });

  const providers = data?.data?.data || [];
  const totalProviders = data?.data?.total || providers.length;

  const categories = useMemo(() => {
    const categoryMap = new Map<number, string>();

    providers.forEach((provider) => {
      provider.categories?.forEach((item) => {
        categoryMap.set(item.id, item.name);
      });
    });

    return Array.from(categoryMap.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  }, [providers]);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const providerName = getProviderName(provider).toLowerCase();
      const providerEmail = provider.email?.toLowerCase() || "";
      const providerLocation = getProviderLocation(provider).toLowerCase();
      const providerCategories = getProviderCategoryText(provider.categories).toLowerCase();

      const searchValue = search.toLowerCase();

      const matchesSearch =
        providerName.includes(searchValue) ||
        providerEmail.includes(searchValue) ||
        providerLocation.includes(searchValue) ||
        providerCategories.includes(searchValue);

      const matchesCategory = category
        ? provider.categories?.some((item) => String(item.id) === category)
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [category, providers, search]);

  const providerCards: Service[] = filteredProviders.map((provider) => ({
    id: provider.id,
    title: getProviderName(provider),
    image: getProviderImageUrl(provider.image),
    location: getProviderLocation(provider),
    date: provider.created_at || "",
    description: provider.bio || provider.address || "No bio available",
    rating: 0,
    reviews: 0,
    category: getProviderShortCategoryText(provider.categories),
  }));

  return (
    <>
      <BrowseBanner
        selectedCategory={category}
        onCategorySelect={(val) => setCategory(val)}
      />
      <div className="custom-container mx-auto font-[inter]">
        <div className="flex justify-between items-center p-4 flex-wrap gap-5">
          <p className="text-base">
            Showing {providerCards.length} of {totalProviders} providers
          </p>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name, email, location"
              className="p-2 text-base border border-gray-300 rounded-md w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Category Filter */}
            <select
              className="p-2 text-base border border-gray-300 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Provider List */}
        {isLoading ? (
          <div className="text-center p-4 text-lg font-medium text-gray-600">
            Loading providers...
          </div>
        ) : isError ? (
          <div className="text-center p-4 text-lg font-medium text-red-500">
            Failed to load providers.
          </div>
        ) : providerCards.length === 0 ? (
          <div className="text-center p-4 text-lg font-medium text-gray-600">
            No Providers Found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4">
            {providerCards.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProvidersPage;