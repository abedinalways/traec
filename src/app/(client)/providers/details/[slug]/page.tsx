/** @format */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { BsTrainFrontFill } from "react-icons/bs";
import AboutProvider from "@/app/(client)/_components/providers/AboutProvider";
import Projects from "@/app/(client)/_components/providers/Projects";
import Reviews from "@/app/(client)/_components/providers/Reviews";
import Services from "@/app/(client)/_components/providers/Services";

// JSON Data
const overViewData = {
  reviews: [
    {
      id: 20,
      title: "Party Anniversary",
      image: "https://i.ibb.co.com/ycw3xZCF/Rectangle-19-3.png",
      location: "Los Angeles, CA",
      date: "2022",
      rating: 3,
      reviews: 45,
      category: "Anniversary",
      likes: 13,
      name: "Kathryn Murphy",
      serviceName: "Kids Birthday Party DJ Package",
      description:
        "Professional DJ with 8+ years of experience specializing in children's parties, weddings, and corporate events.  I bring high-energy entertainment with age-appropriate music and interactive games that keep the party going",
    },
  ],
};

export default function ProvidersDetailsPage() {
  const [activeTab, setActiveTab] = useState<
    "Services" | "Reviews" | "Projects" | "About"
  >("Services");
  return (
    <div>
      {/* Background Image Section */}
      <div className='w-full h-[50vh] relative z-0'>
        <Image
          src='https://i.ibb.co.com/5t97DJm/Rectangle-26.png'
          alt='banner'
          fill
          className='object-cover'
        />
      </div>

      {/* Content Over Image */}
      <div className='custom-container mx-auto flex flex-col lg:flex-row gap-5 mt-negative-32 relative z-20'>
        {/* Left Section (Reviews) */}
        <div className='w-full lg:w-[70%] '>
          <div className='space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
            {overViewData.reviews.map((review, index) => (
              <div key={index} className='p-4 space-y-3'>
                <div className='flex gap-3 items-start'>
                  <Image
                    src='https://i.ibb.co.com/bMnhwC9c/Ellipse-71.png'
                    alt='Reviewer'
                    width={52}
                    height={52}
                    className='object-contain'
                  />
                  <div>
                    <h3 className='font-semibold text-lg'>{review.name}</h3>
                    <div className='flex gap-3 py-4'>
                      <div className='flex items-center text-yellow-500'>
                        <FaStar className='text-yellow-500' />
                        <span className='ml-2 text-black font-bold '>
                          {review.rating}
                        </span>
                        <span className='ml-2 text-sm text-gray-600'>
                          ({review.reviews} reviews)
                        </span>
                      </div>
                      <p className='text-sm text-gray-500 flex gap-1 items-center'>
                        <CiLocationOn />
                        {review.location}
                      </p>
                      <p className='text-sm text-gray-500 flex gap-1 items-center'>
                        <BsTrainFrontFill />
                        Member since {review.date}
                      </p>
                    </div>
                    <p className='text-gray-700'>{review.description}</p>
                    <div className='flex gap-3 mt-5'>
                      <button className='bg-[#070707] text-white py-2 px-8 rounded-md'>
                        Send Message
                      </button>
                      <button className='py-2 px-8 rounded-md border border-amber-100'>
                        View Services
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm my-5'>
            <div className='px-4 sm:px-6 '>
              {/* Tabs */}
              <div className='flex overflow-x-auto no-scrollbar gap-8 sm:gap-10 text-base sm:text-lg font-medium pb-2'>
                <button
                  onClick={() => setActiveTab("Services")}
                  className={`whitespace-nowrap pb-2 ${
                    activeTab === "Services"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-black"
                  }`}>
                  Services
                </button>

                <button
                  onClick={() => setActiveTab("Reviews")}
                  className={`whitespace-nowrap pb-2 ${
                    activeTab === "Reviews"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-black"
                  }`}>
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab("Projects")}
                  className={`whitespace-nowrap pb-2 ${
                    activeTab === "Projects"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-black"
                  }`}>
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab("About")}
                  className={`whitespace-nowrap pb-2 ${
                    activeTab === "About"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-black"
                  }`}>
                  About
                </button>
              </div>

              <div className='w-full h-px -mt-2 bg-gray-300' />
            </div>

            {/* ================= Services CONTENT ================= */}
            {activeTab === "Services" && <Services />}

            {/* ================= REVIEWS CONTENT ================= */}
            {activeTab === "Reviews" && <Reviews />}

            {/* ================= Projects CONTENT ================= */}
            {activeTab === "Projects" && <Projects />}

            {/* ================= About CONTENT ================= */}
            {activeTab === "About" && <AboutProvider />}
          </div>
        </div>

        {/* Right Section (Stats) */}
        <div className='w-full lg:w-[30%] space-y-5 relative z-20'>
          <div className='w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
            <h2 className='mb-4 text-sm font-semibold text-gray-700'>
              Provider Stats
            </h2>
            <div className='space-y-3 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Completed Orders</span>
                <span className='font-medium'>324</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Repeat Clients</span>
                <span className='font-medium'>89%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Completion Rate</span>
                <span className='font-medium'>98%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Response Time</span>
                <span className='font-medium'>1 hour</span>
              </div>
            </div>
          </div>

          <div className='w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
            <h2 className='mb-4 text-sm font-semibold text-gray-700'>
              Provider Stats
            </h2>
            <div className='space-y-3 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Completed Orders</span>
                <span className='font-medium'>324</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Repeat Clients</span>
                <span className='font-medium'>89%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Completion Rate</span>
                <span className='font-medium'>98%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Response Time</span>
                <span className='font-medium'>1 hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
