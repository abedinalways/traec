"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BecomeProviderBanner() {
  return (
    <div className="relative w-full h-[50vh] font-[inter]">
      {/* Background Image */}
      <Image
        src="/images/BecomeProviderBanner.png"
        alt="banner"
        fill
        className="object-cover"
      />

      {/* Content Section */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl lg:text-[48px] font-bold text-white font-[glory] leading-[120%]">
          Become a{" "}
          <span className="bg-linear-to-r from-[#FFAC47] to-[#FF2A24]  bg-clip-text text-transparent italic px-2">
            Provider
          </span>
        </h2>

        <p className="text-white text-[16px] font-normal leading-[160%] mt-4 max-w-lg">
          Simple steps to book trusted event professionals from DJs and caterers
          to decorators and venues all in one place.
        </p>

        <Link href={"/account-setup"}>
          <button className="mt-6 bg-linear-to-r from-[#FFAC47] to-[#FF2A24] md:px-0 md:py-0 px-6 py-3 rounded-md font-semibold cursor-pointer text-white md:w-[184px] md:h-[54px]">
            Become a Provider
          </button>
        </Link>
      </div>
    </div>
  );
}
