import { FileClock, FileMusic } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function PremiumServices() {
  return (
    <div className="p-6">
      {/* Title + Price */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">DJ Party</h2>
        </div>

        <div className="text-right">
          <span className="text-2xl font-bold">$750</span>
          <span className="text-gray-500">/Per Hours</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-3 leading-relaxed">
        Professional DJ performance with lighting, music, and interactive
        entertainment to make your event unforgettable.
      </p>

      {/* Icons Row */}
      <div className="flex items-center gap-6 mt-5 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <FileClock className="text-lg" />
          Flexible Booking
        </div>

        <div className="flex items-center gap-2">
          <FileMusic className="text-lg" />
          Unlimited Song Requests
        </div>
      </div>

      {/* Features */}
      <div className="mt-6 space-y-3 text-gray-700">
        {[
          "Professional DJ Performance",
          "Dance Floor Lighting",
          "Basic Sound System",
          "Unlimited Song Requests",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <AiOutlineCheckCircle className="text-green-600 text-xl" />
            {item}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <Link href={`/book/3`}>
        <button className="w-full mt-8 bg-linear-to-r from-orange-400 to-red-500 text-white font-medium py-3 rounded-lg cursor-pointer">
          Book Now
        </button>
      </Link>

      <button className="w-full mt-3 border py-3 rounded-lg text-gray-700 font-medium">
        Send Message
      </button>
    </div>
  );
}
