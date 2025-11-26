"use client";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ServiceSection({ services = [] }: any) {
  return (
    <div className="pt-4 w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-gray-800 text-lg">
          Services ({services.length})
        </h2>
        <Link href="/addservice">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-medium">
          + Add Service
        </button>
        </Link>
      </div>

      {/* GRID LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((service: any, i: number) => (
          <div
            key={i}
            className="border rounded-xl p-4 bg-white shadow-sm w-full flex justify-between items-start gap-3"
          >
            {/* LEFT SIDE */}
            <div className="flex gap-3">
              <Image
                src={service.img}
                alt={service.title}
                width={service.imgWidth || 48}
                height={service.imgHeight || 48}
                className="rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {service.title}
                </p>

                <p className="text-xs text-gray-500 mt-1">{service.desc}</p>

                {/* RATING */}
                <p className="flex items-center gap-1 text-xs text-yellow-600 mt-2">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  {service.rating}
                  <span className="text-gray-500">({service.reviews})</span>
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-3 mt-3">
                  <button className="border px-3 py-1 rounded-md text-xs text-gray-700 hover:bg-gray-50">
                    Edit
                  </button>

                  <button className="border px-3 py-1 rounded-md text-xs text-gray-700 hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* PRICE */}
            <p className="text-sm font-semibold text-red-500">
              {service.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
