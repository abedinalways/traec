"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BecomeProviderBanner() {
  return (
    <div className="relative w-full h-[60vh] font-[inter]">
      {/* Background Image */}
      <Image
        src="/images/BecomeProviderBanner.png"
        alt="banner"
        fill
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content Section */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 py-8 md:py-2">
        <h2 className="text-4xl lg:text-[48px] font-bold text-white font-[glory] leading-[120%]">
          Become a{" "}
          <span className="text-gradient font-[brittney]">Provider</span>
        </h2>

        <p className="text-white text-sm md:text-[16px] font-normal leading-[170%] max-w-3xl mt-4">
          Turn your event services into more bookings with Evoke. Join a growing
          marketplace where customers come specifically to find trusted event
          professionals. Showcase your services, highlight your experience,
          share photos of your work, and receive booking requests directly
          through the platform. Whether you’re a DJ, caterer, decorator,
          photographer, or venue owner, Evoke helps you reach more clients and
          grow your business.
        </p>

        <Link href={"/account-setup"}>
          <button className="mt-6 bg-linear-to-r from-[#FFAC47] to-[#FF2A24] px-2 py-2 rounded-md font-semibold cursor-pointer text-white md:w-[184px] md:h-[54px]">
            Become a Provider
          </button>
        </Link>
      </div>
    </div>
  );
}
