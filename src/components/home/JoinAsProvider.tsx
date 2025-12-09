import React from "react";
import BusinessCard from "../reusable/BusinessCard";
import Image from "next/image";

const JoinAsProvider = () => {
  return (
    <div className="md:flex custom-container md:px-4 p-2 justify-center gap-0!">
      <div className="flex-1 border-green-800">
        <BusinessCard />
      </div>
      <div className="flex-1">
        <Image
          src="/images/provider.png"
          width={1000}
          className="h-[393px]"
          height={1000}
          alt="provider"
        />
      </div>
    </div>
  );
};

export default JoinAsProvider;
