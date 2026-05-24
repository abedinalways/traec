"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { getImageUrl } from "@/lib/getImageUrl";
import { ProviderService, useGetProviderServicesQuery } from "@/app/provider/providerServiceApi";


type ServiceSectionProps = {
  services?: ProviderService[];
};

const getServices = (response?: unknown): ProviderService[] => {
  const res = response as {
    data?:
      | {
          services?: ProviderService[];
        }
      | ProviderService[];
    services?: ProviderService[];
  };

  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.services)) return res.data.services;
  if (Array.isArray(res?.services)) return res.services;

  return [];
};

const getServiceImage = (service: ProviderService) => {
  if (Array.isArray(service.images) && service.images.length > 0) {
    return service.images[0];
  }

  return service.image || null;
};

const getServicePrice = (service: ProviderService) => {
  const pricing = service.pricings || service.pricing || [];
  const firstPrice = pricing?.[0]?.price;

  if (firstPrice === null || firstPrice === undefined || firstPrice === "") {
    return "—";
  }

  return `$${firstPrice}`;
};

export default function ServiceSection({
  services: propServices = [],
}: ServiceSectionProps) {
  const { data, isLoading, isError } = useGetProviderServicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const apiServices = getServices(data);
  const services = apiServices.length > 0 ? apiServices : propServices;

  return (
    <div className="pt-4 w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-gray-800 text-lg">
          Services ({services.length})
        </h2>

        <Link href="/addservice">
          <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-medium">
            + Add Service
          </button>
        </Link>
      </div>

      {isLoading && (
        <div className="border rounded-xl p-5 bg-white text-sm text-gray-500">
          Loading services...
        </div>
      )}

      {isError && !isLoading && (
        <div className="border rounded-xl p-5 bg-white text-sm text-red-500">
          Failed to load services.
        </div>
      )}

      {!isLoading && !isError && services.length === 0 && (
        <div className="border rounded-xl p-5 bg-white text-sm text-gray-500">
          No services found.
        </div>
      )}

      {/* GRID LIST */}
      {!isLoading && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="border rounded-xl p-4 bg-white shadow-sm w-full flex justify-between items-start gap-3"
            >
              {/* LEFT SIDE */}
              <div className="flex gap-3">
                <div className="flex gap-3">
                  <img
                    src={getImageUrl(
                      getServiceImage(service),
                      "/images/img01.png",
                      service.updated_at || service.id,
                    )}
                    alt={service.title || "Service"}
                    className="rounded-full object-cover w-12 h-12"
                    onError={(event) => {
                      event.currentTarget.src = "/images/img01.png";
                    }}
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {service.title || "Untitled Service"}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {service.description || "No description available"}
                  </p>

                  {/* RATING */}
                  <p className="flex items-center gap-1 text-xs text-yellow-600 mt-2">
                    <Star
                      size={14}
                      className="fill-yellow-500 text-yellow-500"
                    />
                    4.9
                    <span className="text-gray-500">(0)</span>
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      className="border px-3 py-1 rounded-md text-xs text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="border px-3 py-1 rounded-md text-xs text-gray-700 hover:bg-gray-50"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <p className="text-sm font-semibold text-red-500">
                {getServicePrice(service)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
