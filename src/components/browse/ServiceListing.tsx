'use client'
import React, { useState, useMemo } from 'react';
import { Star, MapPin, ChevronDown, ChevronUp, Search } from 'lucide-react';

// Service data structure
const servicesData = [
  {
    id: 1,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John1',
    title: 'I will provide DJ services to make your events unforgettable.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 16,
    image: '/images/browser/img01.png',
    category: 'Entertainment',
  },
  {
    id: 2,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John2',
    title: 'I will provide professional catering services for your events.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 16,
    image: '/images/browser/img02.png',
    category: 'Catering',
  },
  {
    id: 3,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John3',
    title:
      'I will provide decorators to design and style your events beautifully.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 16,
    image: '/images/browser/img03.png',
    category: 'Decorators',
  },
  {
    id: 4,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John4',
    title: 'I will provide rentals for all your event needs.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 16,
    image: '/images/browser/img03.png',
    category: 'Rentals',
  },
  {
    id: 5,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John5',
    title:
      'I will provide professional catering services for your local and private photo.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 16,
    image: '/images/browser/img04.png',
    category: 'Photography',
  },
  {
    id: 6,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John6',
    title:
      'I will provide entertainment services to engage and delight your guests.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 30,
    image: '/images/browser/img05.png',
    category: 'Entertainment',
  },
  {
    id: 7,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John7',
    title:
      'I will provide entertainment services to engage and delight your guests.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 16,
    image: '/images/browser/img06.png',
    category: 'Entertainment',
  },
  {
    id: 8,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John8',
    title:
      'I will provide professional catering services for your local and private photo.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 24,
    image: '/images/browser/img07.png',
    category: 'Catering',
  },
  {
    id: 9,
    providerName: 'Jhon Doe',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John9',
    title:
      'I will provide entertainment services to engage and delight your guests.',
    rating: 4.9,
    reviewCount: 2541,
    location: 'New York NY',
    price: 40,
    image: '/images/browser/img08.png',
    category: 'Entertainment',
  },
];

const categories = [
  {
    name: 'Catering',
    subcategories: [
      'Full-service catering',
      'Private chefs',
      'Food Trucks',
      'Dessert Tables',
    ],
  },
  { name: 'DJ Services', subcategories: [] },
  { name: 'Decorators', subcategories: [] },
  { name: 'Rentals', subcategories: [] },
  { name: 'Photography', subcategories: [] },
  { name: 'Entertainment', subcategories: [] },
];

export default function ServiceListing() {
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [searchRadius, setSearchRadius] = useState('Within 10 miles');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    'Catering'
  );
  const itemsPerPage = 9;

  const filteredServices = useMemo(() => {
    return servicesData.filter(service => {
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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 sticky top-8">
              {/* Location Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                  Location
                  <ChevronUp className="w-4 h-4" />
                </h3>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter city, state, or zip code"
                    value={locationFilter}
                    onChange={e => setLocationFilter(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-full">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    Service hub
                  </button>
                  <button className="flex-1 px-3 py-1.5 border border-gray-300 text-sm rounded-full">
                    Read this
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                  All Categories
                  <ChevronUp className="w-4 h-4" />
                </h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between py-1.5">
                        <label className="flex items-center cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => toggleCategory(category.name)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {category.name}
                          </span>
                        </label>
                        {category.subcategories.length > 0 && (
                          <button
                            onClick={() =>
                              setExpandedCategory(
                                expandedCategory === category.name
                                  ? null
                                  : category.name
                              )
                            }
                            className="p-1"
                          >
                            {expandedCategory === category.name ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        )}
                      </div>
                      {expandedCategory === category.name &&
                        category.subcategories.length > 0 && (
                          <div className="ml-6 space-y-1 mt-1">
                            {category.subcategories.map(sub => (
                              <label
                                key={sub}
                                className="flex items-center py-1 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                  {sub}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Radius */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                  Search Radius
                  <ChevronUp className="w-4 h-4" />
                </h3>
                <select
                  value={searchRadius}
                  onChange={e => setSearchRadius(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Within 10 miles</option>
                  <option>Within 25 miles</option>
                  <option>Within 50 miles</option>
                  <option>Within 100 miles</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                  Price Range
                  <ChevronUp className="w-4 h-4" />
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="600"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {paginatedServices.length} of {filteredServices.length}{' '}
                services
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {paginatedServices.map(service => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <img
                        src={service.providerImage}
                        alt={service.providerName}
                        className="w-8 h-8 rounded-full mr-2"
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
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {service.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {service.location}
                      </div>
                      <div className="text-sm">
                        <span className="text-red-600 font-semibold">
                          ${service.price}
                        </span>
                        <span className="text-gray-500"> /Per Person</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
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
                    setCurrentPage(prev => Math.min(totalPages, prev + 1))
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
