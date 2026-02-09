import React from "react";
import BusinessCard from "../reusable/BusinessCard";
import Image from "next/image";

const JoinAsProvider = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] custom-container  w-full h-full">
      <div className="w-full">
        <BusinessCard />
      </div>
      <div className="w-full">
        <Image
          src="/images/provider.png"
          width={703}
          height={421}
          className="h-full w-full object-cover"
         
          alt="provider"
        />
      </div>
    </div>
  );
};

export default JoinAsProvider;
