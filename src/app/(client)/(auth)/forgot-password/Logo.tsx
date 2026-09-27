"use client";

import Image from "next/image";


export default function Logo() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute top-0 right-0">
        
      </div>

      <div className="mb-4 flex justify-center">
        <Image src="/images/logo.png" width={42} height={42} alt="logo" />
      </div>
    </div>
  );
}
