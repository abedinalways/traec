

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import CustomerReviewsSummary from "@/app/(client)/_components/browse/CustomerReviewsSummary";
import ServicesReviews from "@/app/(client)/_components/browse/ServicesReviews";
import Accordion04 from "@/components/ui/accordion04";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
import { useGetServiceDetailsQuery } from "@/app/api/services/serviceManagementApi";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const { data: apiResponse, isLoading, isError } = useGetServiceDetailsQuery(id as string);
  
  const service = apiResponse?.data;
  
  const [mainImage, setMainImage] = useState("/images/browser/img07.png");
  const [activeTab, setActiveTab] = useState<string>("basic");

  
  useEffect(() => {
    if (service?.images && service.images.length > 0) {
      setMainImage(service.images[0]);
    } else if (service?.image_url) {
      setMainImage(service.image_url);
    }
  }, [service]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading Service Details...</p>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Failed to load service details or service not found.</p>
      </div>
    );
  }

  
  const activePricing = service.pricings?.find(
    (p) => p.type.toLowerCase() === activeTab.toLowerCase()
  ) || service.pricings?.[0];

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className="my-10 md:px-4 p-2 font-[inter]">
      <div className="custom-container mx-auto">
        <Link href="/browse">
          <button className="border border-gray-300 p-2 flex items-center gap-3 mt-5 rounded-md mb-5 cursor-pointer">
            <IoIosArrowBack /> Back to Browse
          </button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[70%]">
            <div>
              <h3 className="text-3xl md:text-[40px] leading-[120%] font-bold my-2 font-[glory]">
                {service.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={service.image_url || "/images/default_provider.png"}
                  alt="provider"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full mr-2"
                  unoptimized
                />
                <span className="text-sm font-semibold text-gray-900">
                  {service.provider_name}
                </span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-semibold">4.5</span>
                  <span className="text-xs text-gray-500 ml-1">(234)</span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl">
              {/* Main Image */}
              <div className="relative w-full h-[40vh]">
                <Image
                  src={mainImage}
                  alt={service.title}
                  fill
                  className="object-cover rounded-t-md"
                  unoptimized
                />
              </div>

              {/* Thumbnails */}
              {service.images && service.images.length > 0 && (
                <div className="flex gap-4 p-3 overflow-x-auto">
                  {service.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative w-20 h-20 overflow-hidden cursor-pointer rounded-md border-2 ${
                        mainImage === img ? "border-blue-500" : "border-transparent"
                      }`}
                      onClick={() => handleThumbnailClick(img)}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* About Section */}
            <div className="space-y-6 rounded-xl border border-gray-200 bg-white mt-5 p-4">
              <h2 className="text-3xl font-semibold mb-6">About</h2>
              <p className="text-lg text-gray-700 mb-4 whitespace-pre-line">
                {service.description || "No description provided for this service."}
              </p>

              
              {service.faqs && service.faqs.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-2">
                    {service.faqs.map((faq) => (
                      <div key={faq.id} className="border-b pb-3">
                        <p className="font-medium text-gray-900">Q: {faq.question}</p>
                        <p className="text-gray-600 mt-1">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6 rounded-xl border border-gray-200 bg-white mt-5 p-4">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <IoIosInformationCircleOutline />
                Event Setup Preference
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Please let us know if you have any special preferences for setup style, sound levels, or lighting effects. For example: quieter background music during dinner, spotlight for the entrance, or bubble machine for kids’ parties.
              </p>
            </div>

            <div className="space-y-6 rounded-xl border border-gray-200 bg-white mt-5 p-4">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <IoIosInformationCircleOutline />
                Respect Venue & Sound Rules
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Please inform us of any venue restrictions such as sound curfews, power limits, or noise regulations. We will adjust our equipment and performance style accordingly to ensure compliance and avoid interruptions.
              </p>
            </div>

            <Accordion04 />
            <CustomerReviewsSummary />
            <ServicesReviews />
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="w-full lg:w-[30%]">
            <div className="w-full rounded-xl border border-gray-200 bg-white">
              {/* Tabs dynamically mapped from types available in API */}
              <div className="grid grid-cols-3">
                {["basic", "standard", "premium"].map((tab) => {
                  const hasPlan = service.pricings?.some((p) => p.type.toLowerCase() === tab);
                  return (
                    <button
                      key={tab}
                      disabled={!hasPlan}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-sm font-medium capitalize disabled:opacity-30 disabled:cursor-not-allowed ${
                        activeTab === tab
                          ? "border-b-2 border-black text-black"
                          : "text-gray-500 hover:text-black cursor-pointer"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Package Card */}
              {activePricing ? (
                <PackageCard
                  title={activePricing.type}
                  price={Number(activePricing.price)}
                  description={activePricing.description || "No plan description provided."}
                  features={activePricing.features ? (Array.isArray(activePricing.features) ? activePricing.features : []) : []}
                  serviceId={service.id}
                />
              ) : (
                <div className="p-6 text-center text-gray-500">No pricing plans available.</div>
              )}
            </div>

            {/* Provider Info Card */}
            <div className="w-full rounded-xl border border-gray-200 bg-white p-5 mt-5">
              <h3 className="text-xl font-bold mb-4">About the Provider</h3>
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={service.image_url || "/images/default_provider.png"}
                  alt="provider"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover"
                  unoptimized
                />
                <div>
                  <p className="font-medium">{service.provider_name}</p>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    4.9 (500)
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600">Usually responds within 1 hour</p>

              <Link href={`/provider-profile/details/${service.id}`}>
                <button className="w-full mt-4 border py-3 rounded-lg text-gray-700 font-medium cursor-pointer">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageCard({
  title,
  price,
  description,
  features,
  serviceId,
}: {
  title: string;
  price: number;
  description: string;
  features: string[];
  serviceId: number;
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold capitalize">{title} Plan</h3>
        <div className="text-right">
          <p className="text-xl font-bold">${price}</p>
          <p className="text-xs text-gray-500">Per Hour</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 break-words">{description}</p>

      {Array.isArray(features) && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <AiOutlineCheckCircle className="text-green-600 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Link href={`/book/${serviceId}?plan=${title}`}>
        <button className="w-full btn-gradient cursor-pointer text-white py-3 rounded-lg font-medium mb-3 transition">
          Book Now
        </button>
      </Link>

      <button className="w-full border py-3 rounded-lg text-gray-700 font-medium cursor-pointer">
        Send Message
      </button>
    </div>
  );
}