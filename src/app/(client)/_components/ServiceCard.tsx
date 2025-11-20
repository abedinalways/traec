/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci"; // React Icons for star rating

// Define the TypeScript type for a service object
export type Service = {
  id: number;
  title: string;
  image: string;
  location: string;
  date: string;
  description: string;
  rating: number;
  reviews: number;
  category: string;
};

// ServiceCard Component
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden border p-5'>
      {/* Image Section */}
      <div className='w-full h-[250px] lg:h-[200px] relative'>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className='object-cover rounded-md'
        />
      </div>
      {/* Content Section */}
      <div className='py-5'>
        <h3 className='text-xl font-semibold text-gray-800'>{service.title}</h3>
        <p className='text-sm text-gray-500 mt-2'>{service.category}</p>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex gap-1 items-center'>
            <CiLocationOn />
            <p>{service.location}</p>
          </div>
          <div className='flex items-center text-yellow-500'>
            <FaStar className='text-yellow-500' />
            <span className='ml-2 text-black font-bold '>{service.rating}</span>
            <span className='ml-2 text-sm text-gray-600'>
              ({service.reviews})
            </span>
          </div>
        </div>
      </div>
      <Link href={`/providers/details/${service?.id}`}>
        <button className='bg-[#DFE1E7] w-full p-3 rounded-md cursor-pointer'>
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default ServiceCard;
