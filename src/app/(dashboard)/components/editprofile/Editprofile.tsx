"use client";

import Image from "next/image";
import {
  Pencil,
  MapPin,
  Star,
  Calendar,
  CheckCircle2,
} from "lucide-react";

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
        <button className="
          flex items-center gap-1 text-sm px-4 py-1 
          border rounded-full hover:bg-gray-100 transition
        ">
          <Pencil size={14} />
          Edit Profile
        </button>
      </div>

      {/* Name + Verified */}
      <div className="mt-3">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-35 justify-start">
          Sarah Miller
          <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            <CheckCircle2 size={12} />
            Verified
          </span>
        </h2>

        {/* Location + Rating */}
        <div className="flex items-center gap-4 mt-2 text-gray-600 text-sm">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            Austin, TX
          </span>

          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            <span className="font-medium">4.9</span>
            <span className="text-gray-500">(156 reviews)</span>
          </span>
        </div>

        {/* Member Since */}
        <p className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <Calendar size={14} />
          Member since 2023
        </p>
      </div>
      {/* -------- END TOP SECTION -------- */}


      {/* ---------- Existing Code Below (No Change) ---------- */}

      <hr className="my-4" />

      <div className="text-sm text-gray-700">
        <h3 className="font-semibold mb-2">About me</h3>
        <p className="leading-relaxed">
          Devoted mom who loves organizing memorable birthday parties and
          family celebrations. I always research thoroughly to find the best
          vendors for every special occasion!
        </p>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="font-semibold text-gray-800 mb-2 text-sm">My stats</h3>

        <div className="flex justify-between text-sm py-1">
          <span>Completed Orders</span>
          <span className="font-medium">8</span>
        </div>

        <div className="flex justify-between text-sm py-1">
          <span>Reviews Given</span>
          <span className="font-medium">12</span>
        </div>

        <div className="flex justify-between text-sm py-1">
          <span>Average Rating</span>
          <span className="font-medium">4.9/5</span>
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="font-semibold text-gray-800 mb-2 text-sm">Languages</h3>

        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">English</span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Spanish</span>
        </div>
      </div>

      <hr className="my-4" />

      {/* Response Time */}
<div>
  <h3 className="font-semibold text-gray-800 mb-2 text-sm">Response Time</h3>

  <span className="flex items-center gap-2 px-4 py-1.5 
    rounded-full border border-gray-300 text-sm text-gray-700 w-fit">
    <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
    Within 1 hour
  </span>
</div>


    </div>
  );
}
