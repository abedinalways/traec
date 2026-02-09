import React from 'react';
import BusinessCard from '../reusable/BusinessCard';
import Image from 'next/image';

const JoinAsProvider = () => {
  return (
    <div className="md:flex custom-container px-4 md:px-0 ">
      <div className="md:w-[617px] md:h-[407px] mx-auto ">
        <BusinessCard />
      </div>
      <div className="md:w-[680px] md:h-[421px]">
        <Image
          src="/images/provider.png"
          width={1000}
          height={1000}
          alt="provider"
          
        />
      </div>
    </div>
  );
};

export default JoinAsProvider;