import React from 'react';
import LocationCards from '../reusable/LocationCards';
import Image from 'next/image';

const Locations = () => {
  return (
    <div className=" bg-[#FFFBF7] py-16">
      <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-900 leading-tight font-[glory]">
        Locations We{' '}
        <span className="text-gradient italic font-serif">Serve</span>
      </h2>
      <p className="text-gray-600 text-center text-sm md:text-md max-w-2xl mx-auto">
        Find top event professionals in major cities across the United States.
      </p>
      <div className="custom-container flex flex-col gap-4 px-4 md:px-0">
        <LocationCards />
        <div className="w-full h-full">
          <Image
            src="/images/map.png"
            width={1500}
            height={1000}
            alt="map"
          />
        </div>
      </div>
    </div>
  );
};

export default Locations;