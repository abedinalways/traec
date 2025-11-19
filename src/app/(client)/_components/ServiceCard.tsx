/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa"; // React Icons for star rating

// Define the TypeScript type for a service object
export type Service = {
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
      <Image
        src='https://i.ibb.co/1fzVrD6K/Rectangle-19.png'
        alt='Example Image'
        width={500}
        height={500}
        className='object-cover'
      />
      <div className='py-5'>
        <h3 className='text-xl font-semibold text-gray-800'>{service.title}</h3>
        <p className='text-sm text-gray-500 mt-2'>{service.category}</p>
        <div className='flex items-center justify-between mt-4'>
          <p>{service.location}</p>
          <div className='flex items-center text-yellow-500'>
            <FaStar className='text-yellow-500' />
            <span className='ml-2 font-bold '>{service.rating}</span>
            <span className='ml-2 text-sm text-gray-600'>
              ({service.reviews})
            </span>
          </div>
        </div>
      </div>
      <Link href={`/providers/`}>
        <button className='bg-[#DFE1E7] w-full p-3 rounded-md'>
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default ServiceCard;
