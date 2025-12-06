"use client";
import { useState, useMemo } from "react";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FiltersSidebar from "./FilterSidebar";

// Service data structure
const servicesData = [
  {
    id: 1,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John1",
    title: "I will provide DJ services to make your events unforgettable.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 16,
    image: "/images/browser/img01.png",
    category: "Entertainment",
  },
  {
    id: 2,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John2",
    title: "I will provide professional catering services for your events.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 16,
    image: "/images/browser/img02.png",
    category: "Catering",
  },
  {
    id: 3,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John3",
    title:
      "I will provide decorators to design and style your events beautifully.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 16,
    image: "/images/browser/img03.png",
    category: "Decorators",
  },
  {
    id: 4,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John4",
    title: "I will provide rentals for all your event needs.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 16,
    image: "/images/browser/img03.png",
    category: "Rentals",
  },
  {
    id: 5,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John5",
    title:
      "I will provide professional catering services for your local and private photo.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 16,
    image: "/images/browser/img03.png",
    category: "Photography",
  },
  {
    id: 6,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John6",
    title:
      "I will provide entertainment services to engage and delight your guests.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 30,
    image: "/images/browser/img05.png",
    category: "Entertainment",
  },
  {
    id: 7,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John7",
    title:
      "I will provide entertainment services to engage and delight your guests.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 16,
    image: "/images/browser/img06.png",
    category: "Entertainment",
  },
  {
    id: 8,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John8",
    title:
      "I will provide professional catering services for your local and private photo.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 24,
    image: "/images/browser/img07.png",
    category: "Catering",
  },
  {
    id: 9,
    providerName: "Jhon Doe",
    providerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John9",
    title:
      "I will provide entertainment services to engage and delight your guests.",
    rating: 4.9,
    reviewCount: 2541,
    location: "New York NY",
    price: 40,
    image: "/images/browser/img08.png",
    category: "Entertainment",
  },
];
export default function ServiceListing() {
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(service.category);
      const matchesPrice =
        service.price >= priceRange[0] && service.price <= priceRange[1];
      const matchesLocation =
        !locationFilter ||
        service.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchesCategory && matchesPrice && matchesLocation;
    });
  }, [selectedCategories, priceRange, locationFilter]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}

          <FiltersSidebar />

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {paginatedServices.length} of {filteredServices.length}{" "}
                services
              </p>
              <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {paginatedServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <div className="relative w-full h-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <Image
                        src="/images/browser/img07.png"
                        alt="provider1"
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {service.providerName}
                      </span>
                      <div className="ml-auto flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-semibold">
                          {service.rating}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({service.reviewCount})
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 py-5 line-clamp-2">
                      {service.title}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {service.location}
                    </div>
                    <div className="flex items-center mt-1 justify-between">
                      <div className="text-sm">
                        <span className="text-red-600 font-semibold">
                          ${service.price}
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
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
