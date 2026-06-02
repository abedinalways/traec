// /** @format */
// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import { CiLocationOn } from "react-icons/ci";
// import { FaStar } from "react-icons/fa";
// import { BsTrainFrontFill } from "react-icons/bs";
// import AboutProvider from "@/app/(client)/_components/providers/AboutProvider";
// import Projects from "@/app/(client)/_components/providers/Projects";
// import Reviews from "@/app/(client)/_components/providers/Reviews";
// import Services from "@/app/(client)/_components/providers/Services";
// import MessageIcon from "@/components/icons/MessageIcon";
// import RightGreenIcon from "@/components/icons/RightGreenIcon";
// import Link from "next/link";

// // JSON Data
// const overViewData = {
//   reviews: [
//     {
//       id: 20,
//       title: "Party Anniversary",
//       image: "https://i.ibb.co.com/ycw3xZCF/Rectangle-19-3.png",
//       location: "Los Angeles, CA",
//       date: "2022",
//       rating: 3,
//       reviews: 45,
//       category: "Anniversary",
//       likes: 13,
//       name: "Kathryn Murphy",
//       serviceName: "Kids Birthday Party DJ Package",
//       description:
//         "Professional DJ with 8+ years of experience specializing in children's parties, weddings, and corporate events.  I bring high-energy entertainment with age-appropriate music and interactive games that keep the party going",
//     },
//   ],
// };

// export default function ProvidersDetailsPage() {
//   const [activeTab, setActiveTab] = useState<
//     "Services" | "Reviews" | "Projects" | "About"
//   >("Services");
//   return (
//     <div>
//       {/* Background Image Section */}
//       <div className="w-full h-[50vh] relative z-0">
//         <Image
//           src="/images/banner01.png"
//           alt="banner"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Content Over Image */}
//       <div className="custom-container mx-auto flex flex-col lg:flex-row gap-5 mt-negative-32 relative z-20 font-[inter]">
//         {/* Left Section (Reviews) */}
//         <div className="w-full lg:w-[70%] ">
//           <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//             {overViewData.reviews.map((review, index) => (
//               <div key={index} className="p-4 space-y-3">
//                 <div className="flex gap-3 items-start">
//                   <Image
//                     src="https://i.ibb.co.com/bMnhwC9c/Ellipse-71.png"
//                     alt="Reviewer"
//                     width={52}
//                     height={52}
//                     className="object-contain rounded-full border-2 border-[#DFE1E7]"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-lg flex  items-center gap-6">
//                       {review.name}{" "}
//                       <span className="flex items-center bg-[#EEFAF0] rounded-md px-4 py-1">
//                         <span className="flex gap-2 items-center text-green-400 font-light">
//                           <RightGreenIcon /> Verified
//                         </span>
//                       </span>
//                     </h3>

//                     <div className="flex gap-3 py-4">
//                       <div className="flex items-center text-yellow-500">
//                         <FaStar className="text-yellow-500" />
//                         <span className="ml-2 text-black font-bold ">
//                           {review.rating}
//                         </span>
//                         <span className="ml-2 text-sm text-gray-600">
//                           ({review.reviews} reviews)
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-500 flex gap-1 items-center">
//                         <CiLocationOn />
//                         {review.location}
//                       </p>
//                       <p className="text-sm text-gray-500 flex gap-1 items-center">
//                         <BsTrainFrontFill />
//                         Member since {review.date}
//                       </p>
//                     </div>
//                     <p className="text-gray-700">{review.description}</p>
//                     <div className="flex gap-3 mt-5">
//                       <Link href="/messages/1">
//                         <button className="bg-[#070707] text-white py-2 px-8 rounded-md cursor-pointer">
//                           <span className="flex items-center gap-2">
//                             <MessageIcon /> Send Message
//                           </span>
//                         </button>
//                       </Link>
//                       {/* <button className="py-2 px-8 rounded-md border border-amber-100 cursor-pointer">
//                         View Services
//                       </button> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm my-5">
//             <div className="px-4 sm:px-6 ">
//               {/* Tabs */}
//               <div className="flex overflow-x-auto no-scrollbar gap-8 sm:gap-10 text-base sm:text-lg font-medium pb-2">
//                 <button
//                   onClick={() => setActiveTab("Services")}
//                   className={`whitespace-nowrap pb-2 ${
//                     activeTab === "Services"
//                       ? "text-blue-600 border-b-2 border-blue-600"
//                       : "text-gray-500 hover:text-black cursor-pointer"
//                   }`}
//                 >
//                   Services
//                 </button>

//                 <button
//                   onClick={() => setActiveTab("Reviews")}
//                   className={`whitespace-nowrap pb-2 ${
//                     activeTab === "Reviews"
//                       ? "text-blue-600 border-b-2 border-blue-600"
//                       : "text-gray-500 hover:text-black cursor-pointer"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("Projects")}
//                   className={`whitespace-nowrap pb-2 ${
//                     activeTab === "Projects"
//                       ? "text-blue-600 border-b-2 border-blue-600"
//                       : "text-gray-500 hover:text-black cursor-pointer"
//                   }`}
//                 >
//                   Projects
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("About")}
//                   className={`whitespace-nowrap pb-2 ${
//                     activeTab === "About"
//                       ? "text-blue-600 border-b-2 border-blue-600"
//                       : "text-gray-500 hover:text-black cursor-pointer"
//                   }`}
//                 >
//                   About
//                 </button>
//               </div>

//               <div className="w-full h-px -mt-2 bg-gray-300" />
//             </div>

//             {/* ================= Services CONTENT ================= */}
//             {activeTab === "Services" && <Services />}

//             {/* ================= REVIEWS CONTENT ================= */}
//             {activeTab === "Reviews" && <Reviews />}

//             {/* ================= Projects CONTENT ================= */}
//             {activeTab === "Projects" && <Projects />}

//             {/* ================= About CONTENT ================= */}
//             {activeTab === "About" && <AboutProvider />}
//           </div>
//         </div>

//         {/* Right Section (Stats) */}
//         <div className="w-full lg:w-[30%] space-y-5 relative z-20">
//           <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//             <h2 className="mb-4 text-sm font-semibold text-gray-700">
//               Provider Stats
//             </h2>
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Completed Orders</span>
//                 <span className="font-medium">324</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Repeat Clients</span>
//                 <span className="font-medium">89%</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Completion Rate</span>
//                 <span className="font-medium">98%</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Response Time</span>
//                 <span className="font-medium">1 hour</span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//             <h2 className="mb-4 text-sm font-semibold text-gray-700">
//               Provider Stats
//             </h2>
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Completed Orders</span>
//                 <span className="font-medium">324</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Repeat Clients</span>
//                 <span className="font-medium">89%</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Completion Rate</span>
//                 <span className="font-medium">98%</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Response Time</span>
//                 <span className="font-medium">1 hour</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


/** @format */
"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { BsTrainFrontFill } from "react-icons/bs";
import { toast } from "sonner";

import AboutProvider from "@/app/(client)/_components/providers/AboutProvider";
import Reviews from "@/app/(client)/_components/providers/Reviews";
import MessageIcon from "@/components/icons/MessageIcon";
import RightGreenIcon from "@/components/icons/RightGreenIcon";

import {
  ProviderCategory,
  ProviderService,
  useGetProviderDetailsQuery,
} from "@/app/api/providerApi";

import {
  getProviderImageUrl,
  getProviderLocation,
  getProviderName,
} from "@/lib/providerHelpers";
import { useStartConversationMutation } from "@/app/api/messages/chatApi";
import { useGetMeQuery } from "@/app/api/auth/authapi";
import { getErrorMessage } from "@/lib/getErrorMessage";

const FALLBACK_SERVICE_IMAGE = "/images/browser/img12.png";

const getMemberSinceYear = (date?: string | null) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return String(parsedDate.getFullYear());
};

const getServiceCategoryName = (
  service: ProviderService,
  categories: ProviderCategory[],
) => {
  if (service.category) return service.category;

  const matchedCategory = categories.find(
    (category) => Number(category.id) === Number(service.category_id),
  );

  return matchedCategory?.name || "No category";
};

const getServiceImage = (service: ProviderService) => {
  const imageValue = service.image;

  if (Array.isArray(imageValue) && imageValue.length > 0) {
    return getProviderImageUrl(imageValue[0], FALLBACK_SERVICE_IMAGE);
  }

  if (typeof imageValue === "string" && imageValue) {
    return getProviderImageUrl(imageValue, FALLBACK_SERVICE_IMAGE);
  }

  if (Array.isArray(service.images) && service.images.length > 0) {
    return getProviderImageUrl(service.images[0], FALLBACK_SERVICE_IMAGE);
  }

  return FALLBACK_SERVICE_IMAGE;
};

const getServicePrice = (service: ProviderService) => {
  const price = service.pricings?.[0]?.price;

  if (!price) return "Price not available";

  return `$${price}`;
};

export default function ProvidersDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [activeTab, setActiveTab] = useState<
    "Services" | "Reviews" | "Projects" | "About"
  >("Services");

  const { data, isLoading, isError } = useGetProviderDetailsQuery(String(id), {
    skip: !id,
  });
  const { data: meData, isLoading: isCheckingAuth } = useGetMeQuery();

  const provider = data?.data?.provider;
  const categories = useMemo(
    () => data?.data?.categories || [],
    [data?.data?.categories],
  );
  const services = useMemo(
    () => data?.data?.services || [],
    [data?.data?.services],
  );
  const [startConversation, { isLoading: isStartingConversation }] =
    useStartConversationMutation();
  const providerName = provider ? getProviderName(provider) : "Provider";
  const providerLocation = provider
    ? getProviderLocation(provider)
    : "Location not available";

  const providerDescription =
    provider?.bio ||
    "Professional service provider ready to help you plan and manage your event with care and quality.";

  const memberSince = getMemberSinceYear(provider?.created_at);

  const providerImage = getProviderImageUrl(provider?.image);

  const categoryNames = useMemo(() => {
    if (!categories.length) return "No category";

    return categories.map((category) => category.name).join(", ");
  }, [categories]);

  const handleSendMessage = async () => {
    const receiverId = provider?.user_id ?? provider?.id;

    if (!provider || !receiverId || isStartingConversation) return;

    if (!isCheckingAuth && !meData?.authenticated) {
      const redirectUrl = `/provider-profile/details/${provider.id}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    const loadingToast = toast.loading("Opening conversation...");

    try {
      await startConversation({
        receiverId,
      }).unwrap();

      toast.dismiss(loadingToast);
      router.push(`/messages/${receiverId}`);
    } catch (error) {
      toast.dismiss(loadingToast);

      const status = (error as { status?: number }).status;

      if (status === 401) {
        const redirectUrl = `/provider-profile/details/${provider.id}`;
        router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
        return;
      }

      console.error("Conversation start failed:", error);
      toast.error(getErrorMessage(error, "Failed to open conversation."));
    }
  };

  if (isLoading) {
    return (
      <div className="custom-container mx-auto font-[inter] py-10">
        <p className="text-center text-gray-600">Loading provider details...</p>
      </div>
    );
  }

  if (isError || !provider) {
    return (
      <div className="custom-container mx-auto font-[inter] py-10">
        <p className="text-center text-red-500">
          Failed to load provider details.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Background Image Section */}
      <div className="w-full h-[50vh] relative z-0">
        <Image
          src="/images/banner01.png"
          alt="banner"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Content Over Image */}
      <div className="custom-container mx-auto flex flex-col lg:flex-row gap-5 mt-negative-32 relative z-20 font-[inter]">
        {/* Left Section */}
        <div className="w-full lg:w-[70%] ">
          <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="p-4 space-y-3">
              <div className="flex gap-3 items-start">
                <Image
                  src={providerImage}
                  alt={providerName}
                  width={52}
                  height={52}
                  className="object-cover rounded-full border-2 border-[#DFE1E7] w-[52px] h-[52px]"
                  unoptimized
                />

                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-6 flex-wrap">
                    {providerName}

                    {provider.is_verified ? (
                      <span className="flex items-center bg-[#EEFAF0] rounded-md px-4 py-1">
                        <span className="flex gap-2 items-center text-green-400 font-light">
                          <RightGreenIcon /> Verified
                        </span>
                      </span>
                    ) : null}
                  </h3>

                  <div className="flex gap-3 py-4 flex-wrap">
                    <div className="flex items-center text-yellow-500">
                      <FaStar className="text-yellow-500" />
                      <span className="ml-2 text-black font-bold">0</span>
                      <span className="ml-2 text-sm text-gray-600">
                        (0 reviews)
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 flex gap-1 items-center">
                      <CiLocationOn />
                      {providerLocation}
                    </p>

                    <p className="text-sm text-gray-500 flex gap-1 items-center">
                      <BsTrainFrontFill />
                      Member since {memberSince}
                    </p>
                  </div>

                  <p className="text-gray-700">{providerDescription}</p>

                  <div className="flex gap-3 mt-5">
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={isStartingConversation}
                      className="bg-[#070707] text-white py-2 px-8 rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-2">
                        <MessageIcon />
                        {isStartingConversation ? "Opening..." : "Send Message"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm my-5">
            <div className="px-4 sm:px-6 ">
              {/* Tabs */}
              <div className="flex overflow-x-auto no-scrollbar gap-8 sm:gap-10 text-base sm:text-lg font-medium pb-2">
                <button
                  onClick={() => setActiveTab("Services")}
                  className={`whitespace-nowrap pb-2 ${
                    activeTab === "Services"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-black cursor-pointer"
                  }`}
                >
                  Services
                </button>

                <button
                  onClick={() => setActiveTab("Reviews")}
                  className={`whitespace-nowrap pb-2 ${
                    activeTab === "Reviews"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-black cursor-pointer"
                  }`}
                >
                  Reviews
                </button>

                <button
                  onClick={() => setActiveTab("Projects")}
                  className={`whitespace-nowrap pb-2 ${
                    activeTab === "Projects"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-black cursor-pointer"
                  }`}
                >
                  Projects
                </button>

                <button
                  onClick={() => setActiveTab("About")}
                  className={`whitespace-nowrap pb-2 ${
                    activeTab === "About"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-black cursor-pointer"
                  }`}
                >
                  About
                </button>
              </div>

              <div className="w-full h-px -mt-2 bg-gray-300" />
            </div>

            {/* ================= Services CONTENT ================= */}
            {activeTab === "Services" && (
              <ProviderServicesContent
                services={services}
                categories={categories}
              />
            )}

            {/* ================= REVIEWS CONTENT ================= */}
            {activeTab === "Reviews" && <Reviews />}

            {/* ================= Projects CONTENT ================= */}
            {activeTab === "Projects" && (
              <ProviderProjectsContent categories={categories} />
            )}

            {/* ================= About CONTENT ================= */}
            {activeTab === "About" && (
              <div className="px-4 sm:px-6 py-5">
                <AboutProvider />
              </div>
            )}
          </div>
        </div>

        {/* Right Section (Stats) */}
        <div className="w-full lg:w-[30%] space-y-5 relative z-20">
          <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">
              Provider Stats
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Completed Orders</span>
                <span className="font-medium">0</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Repeat Clients</span>
                <span className="font-medium">0%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-medium">0%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium">N/A</span>
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">
              Provider Info
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-right break-all">
                  {provider.email || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium text-right">
                  {provider.phone || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Categories</span>
                <span className="font-medium text-right">{categoryNames}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Status</span>
                <span className="font-medium">
                  {provider.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProviderServicesContent({
  services,
  categories,
}: {
  services: ProviderService[];
  categories: ProviderCategory[];
}) {
  return (
    <div className="px-4 sm:px-6 py-5">
      <p className="text-sm font-medium mb-5">All Services</p>

      {services.length === 0 ? (
        <p className="text-sm text-gray-500">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="relative w-full h-[210px]">
                <Image
                  src={getServiceImage(service)}
                  alt={service.title || "Service image"}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex items-center justify-between mt-4 gap-3">
                <p className="text-sm text-gray-500 flex gap-1 items-center">
                  <CiLocationOn />
                  {service.location || "Location not available"}
                </p>

                <div className="flex items-center text-yellow-500">
                  <FaStar className="text-yellow-500" />
                  <span className="ml-2 text-black font-bold">0</span>
                  <span className="ml-2 text-sm text-gray-600">(0)</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                {getServiceCategoryName(service, categories)}
              </p>

              <p className="text-gray-700 mt-3 line-clamp-2">
                {service.description || "No description available."}
              </p>

              <div className="flex items-center justify-between mt-5">
                <p className="text-sm font-semibold text-red-500">
                  {getServicePrice(service)}
                </p>

                <button
                  type="button"
                  className="bg-[#DFE1E7] py-2 px-4 rounded-md cursor-pointer text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProviderProjectsContent({
  categories,
}: {
  categories: ProviderCategory[];
}) {
  return (
    <div className="px-4 sm:px-6 py-5">
      <p className="text-sm font-medium mb-5">Provider Categories</p>

      {categories.length === 0 ? (
        <p className="text-sm text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="relative w-full h-[180px] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={getProviderImageUrl(category.image, FALLBACK_SERVICE_IMAGE)}
                  alt={category.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <h3 className="text-base font-semibold text-gray-800 mt-4">
                {category.name}
              </h3>

              <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                {category.description || "No description available."}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                Status: {category.status ? "Active" : "Inactive"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
