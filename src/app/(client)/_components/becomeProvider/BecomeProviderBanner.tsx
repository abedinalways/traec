"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BecomeProviderBanner() {
  return (
    <div className="relative w-full h-[50vh]">
      {/* Background Image */}
      <Image
        src="/images/BecomeProviderBanner.png"
        alt="banner"
        fill
        className="object-cover"
      />

      {/* Content Section */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl lg:text-6xl font-bold text-white">
          Become a{" "}
          <span className="bg-linear-to-r from-[#FFAC47] to-[#FF2A24]  bg-clip-text text-transparent italic">
            Provider
          </span>
        </h2>

        <p className="text-white mt-4 max-w-lg">
          Simple steps to book trusted event professionals from DJs and caterers
          to decorators and venues all in one place.
        </p>

        <Link href={"/become-provider/personal-information"}>
          <button className="mt-6 bg-linear-to-r from-[#FFAC47] to-[#FF2A24] px-6 py-3 rounded-md font-semibold cursor-pointer">
            Become a Provider
          </button>
        </Link>
      </div>
    </div>
  );
}
