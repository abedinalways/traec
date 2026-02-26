"use client";

import CustomerReviewsSummary from "@/app/(client)/_components/browse/CustomerReviewsSummary";
import ServicesReviews from "@/app/(client)/_components/browse/ServicesReviews";
import RightGreenIcon from "@/components/icons/RightGreenIcon";
import Accordion04 from "@/components/ui/accordion04";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";

export default function ServiceDetailsPage() {
  const [mainImage, setMainImage] = useState("/images/browser/img07.png");
  const [activeTab, setActiveTab] = useState<"Basic" | "Standard" | "Premium">(
    "Basic",
  );

  const packageData = {
    Basic: {
      price: 250,
      description:
        "Professional DJ performance with lighting and interactive entertainment for small events.",
      features: [
        "Reliable Booking",
        "Professional DJ Performance",
        "Basic Floor Lighting",
        "Limited Song Requests",
      ],
    },

    Standard: {
      price: 650,
      description:
        "Extended DJ performance with enhanced lighting, premium sound, and customized playlists.",
      features: [
        "Reliable Booking",
        "Professional DJ Performance",
        "Dance Floor Lighting + FX",
        "Premium Sound System",
        "Personalized Playlist",
        "Emcee Support",
      ],
    },

    Premium: {
      price: 850,
      description:
        "Full-scale DJ entertainment package including premium lighting, hosting, and event management.",
      features: [
        "Reliable Booking",
        "Exclusive DJ Performance",
        "Full Stage + Lighting Setup",
        "Surround Sound System",
        "Professional MC Hosting",
        "Themed Lighting & Effects",
        "Party Host & Crowd Engagement",
      ],
    },
  };

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className="my-10 md:px-4 p-2 font-[inter]">
      <div className="custom-container mx-auto">
        <Link href="/browse">
          <button className="border border-gray-300 p-2 flex items-center gap-3 mt-5 rounded-md mb-5">
            <IoIosArrowBack /> Back to Browse
          </button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[70%]">
            <div>
              <h3 className="text-3xl md:text-[40px] leading-[120%] font-bold my-2 font-[glory]">
                DJ Sarahs Party Productions
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src="/images/browser/img07.png"
                  alt="provider1"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm font-semibold text-gray-900">
                  {/* {service.providerName} */} John Doe
                </span>
                <div
                  className="
                flex items-center"
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-semibold">
                    {/* {service.rating} */} 4.5
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    {/* ({service.reviewCount}) */} (234)
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-xl">
              {/* Main Image */}
              <div className="relative w-full h-[40vh]">
                <Image
                  src={mainImage}
                  alt="Vinyl Banner"
                  fill
                  className="object-cover rounded-t-md"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 p-3">
                {[3, 2, 7, 5].map((i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 overflow-hidden cursor-pointer rounded-md"
                    onClick={() =>
                      handleThumbnailClick(`/images/browser/img0${i}.png`)
                    }
                  >
                    <Image
                      src={`/images/browser/img0${i}.png`}
                      alt={`Thumbnail ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-xl border border-gray-200 bg-white mt-5 p-4">
              <h2 className="text-3xl font-semibold  mb-6">About</h2>
              <p className="text-lg text-gray-700 mb-4">
                Looking for{" "}
                <b>
                  professional DJ entertainment, live music, or party hosting
                </b>{" "}
                for your birthday, wedding, school dance, or corporate event? 🎶
                Or do you want a high-energy DJ who can create an unforgettable
                experience for your guests?
              </p>
              <p className="text-lg text-gray-700 mb-4">
                If yes, this is the <b>BEST place for you!</b> With years of
                experience in <b>live DJ performance and event entertainment</b>
                , I will provide custom party DJ services with professional
                sound, lighting, and interactive hosting to keep your event
                lively, fun, and truly memorable. From kids birthdays to elegant
                weddings, I bring the perfect balance of{" "}
                <b>music, energy, and crowd</b> tailored to your celebration.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Services I Offer:</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <AiOutlineCheckCircle className="text-green-600 text-xl" />
                  <p className="text-lg text-gray-700">
                    Professional, High-Energy, Dynamic Live DJ Performance
                  </p>
                </li>
                <li className="flex items-center space-x-2">
                  <AiOutlineCheckCircle className="text-green-600 text-xl" />
                  <p className="text-lg text-gray-700">
                    Engaging Crowd Interaction & Games - Musical chairs and
                    playful elements.
                  </p>
                </li>
                <li className="flex items-center space-x-2">
                  <AiOutlineCheckCircle className="text-green-600 text-xl" />
                  <p className="text-lg text-gray-700">
                    Karaoke Nights & Sing-Along Sessions - Fun, interactive
                    entertainment for guests.
                  </p>
                </li>
                <li className="flex items-center space-x-2">
                  <AiOutlineCheckCircle className="text-green-600 text-xl" />
                  <p className="text-lg text-gray-700">
                    Custom Playlists Tailored to Your Event - From kid’s
                    birthdays to elegant weddings.
                  </p>
                </li>
                <li className="flex items-center space-x-2">
                  <AiOutlineCheckCircle className="text-green-600 text-xl" />
                  <p className="text-lg text-gray-700">
                    24/7 Fast Communication & Planning Support
                  </p>
                </li>
              </ul>

              <p className="text-sm text-gray-500 mt-6">
                <b>Note:</b> I do not provide venue, catering, or event
                photography services. Please ensure your location is prepared
                for sound setup and lighting.
              </p>

              <div className="mt-6">
                <p className="text-sm text-gray-800">
                  🎉 Interested in making your event unforgettable?{" "}
                  <b>Let’s chat!</b>
                </p>
              </div>
            </div>
            <div className="space-y-6 rounded-xl border border-gray-200 bg-white mt-5 p-4">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <IoIosInformationCircleOutline />
                Event Setup Preference
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Please let us know if you have any special preferences for setup
                style, sound levels, or lighting effects. For example: quieter
                background music during dinner, spotlight for the entrance, or
                bubble machine for kids’ parties.
              </p>
            </div>
            <div className="space-y-6 rounded-xl border border-gray-200 bg-white mt-5 p-4">
              <h2 className="text-xl font-semibold  mb-6 flex items-center gap-2">
                <IoIosInformationCircleOutline />
                Respect Venue & Sound Rules
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Please inform us of any venue restrictions such as sound
                curfews, power limits, or noise regulations. We will adjust our
                equipment and performance style accordingly to ensure compliance
                and avoid interruptions.
              </p>
            </div>

            <Accordion04 />
            <CustomerReviewsSummary />
            <ServicesReviews />
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="w-full lg:w-[30%]">
            <div className="w-full rounded-xl border border-gray-200 bg-white">
              {/* Tabs */}
              <div className="grid grid-cols-3">
                {(["Basic", "Standard", "Premium"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-black text-black "
                        : "text-gray-500 hover:text-black cursor-pointer"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Package Card */}
              <PackageCard
                title={activeTab}
                price={packageData[activeTab].price}
                description={packageData[activeTab].description}
                features={packageData[activeTab].features}
              />
            </div>

            {/* Provider Info Card */}
            <div className="w-full rounded-xl border border-gray-200 bg-white p-5 mt-5">
              <h3 className="text-xl font-bold mb-4">About the Provider</h3>
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src="/images/browser/img07.png"
                  alt="provider"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    4.9 (500)
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Usually responds within 1 hour
              </p>

              <Link href={"/provider-profile/details/1"}>
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
}: {
  title: string;
  price: number;
  description: string;
  features: string[];
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{title} Plan</h3>
        <div className="text-right">
          <p className="text-xl font-bold">${price}</p>
          <p className="text-xs text-gray-500">Per Hour</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <AiOutlineCheckCircle className="text-green-600" />
            {feature}
          </li>
        ))}
      </ul>

      <Link href="/book/1">
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
