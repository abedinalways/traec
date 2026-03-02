"use client";

import Image from "next/image";

import ProfileIcon from "@/components/icons/ProfileIcon";
import RightGreenIcon from "@/components/icons/RightGreenIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import StarIcon from "@/components/icons/StarIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import Link from "next/link";

export default function Editprofile() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border p-6 mx-auto">
      {/* -------- TOP SECTION (MATCHES PROVIDED DESIGN) -------- */}
      <div className="flex items-start justify-between w-full">
        {/* Profile Image */}
        <div className="relative w-16 h-16">
          <Image
            src="/images/Ellipse 71.png"
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* Edit Button */}
        <Link href="/provider-profile">
          <button
            className="
          flex items-center cursor-pointer gap-1 text-sm px-4 py-1 
          border border-gray-200 rounded-[99px] hover:bg-gray-100 transition
        "
          >
            <ProfileIcon />
            Edit Profile
          </button>
        </Link>
      </div>

      {/* Name + Verified */}
      <div className="mt-3">
        <h2 className="text-[24px] font-semibold text-gray-900 flex items-center justify-between gap-4">
          Sarah Miller
          <span className="flex items-center gap-1 bg-[#eefaf0] text-[#2DAB57] text-xs px-2 py-1 rounded-full">
            <RightGreenIcon />
            Verified
          </span>
        </h2>

        {/* Location + Rating */}
        <div className="flex items-center gap-4 mt-2 text-gray-600 text-sm">
          <span className="flex items-center gap-1 text-[14px]">
            <LocationIcon />
            Austin, TX
          </span>

          <span className="flex items-center gap-1 text-[14px]">
            <StarIcon />
            <span className="font-medium">4.9</span>
            <span className="text-gray-500">(156 reviews)</span>
          </span>
        </div>

        {/* Member Since */}
        <p className="flex items-center gap-1 text-sm text-gray-600 mt-1 text-[14px]">
          <CalendarIcon />
          Member since 2023
        </p>
      </div>

      <hr className="my-4" />

      <div className="text-[16px] text-gray-700">
        <h3 className="font-semibold mb-2">About me</h3>
        <p className="leading-relaxed">
          Devoted mom who loves organizing memorable birthday parties and family
          celebrations. I always research thoroughly to find the best vendors
          for every special occasion!
        </p>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="font-semibold text-gray-800 mb-2 text-[16px]">
          My stats
        </h3>

        <div className="flex justify-between text-[16px] py-1">
          <span>Completed Orders</span>
          <span className="font-medium">8</span>
        </div>

        <div className="flex justify-between text-[16px] py-1">
          <span>Reviews Given</span>
          <span className="font-medium">12</span>
        </div>

        <div className="flex justify-between text-[16px] py-1">
          <span>Average Rating</span>
          <span className="font-medium">4.9/5</span>
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="font-semibold text-gray-800 mb-2 text-[16px]">
          Languages
        </h3>

        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[16px]">
            English
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[16px]">
            Spanish
          </span>
        </div>
      </div>

      <hr className="my-4" />

      {/* Response Time */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2 text-[16px]">
          Response Time
        </h3>

        <span
          className="flex items-center gap-2 px-4 py-1.5 
    rounded-full border border-gray-300 text-[16px] text-gray-700 w-fit"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
          Within 1 hour
        </span>
      </div>
    </div>
  );
}
