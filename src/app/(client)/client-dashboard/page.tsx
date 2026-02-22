"use client";

import Editprofile from "../dashboardcomponets/editprofile/Editprofile";
import Overview from "../../(client)/dashboardcomponets/overview/Overview";
import Image from "next/image";

export default function ClientDashboardPage() {
  return (
    <main className="w-full min-h-screen  font-[inter]">

      <div className="w-full h-full relative">
        <Image
          src="/images/Rectangle 26.png"
          alt="Profile cover"
          width={1600} height={283}
          className="w-full md:h-full h-[283px] object-cover"
        />

        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      
      <div
        className="
          w-full max-w-7xl mx-auto 
          px-2 md:px-0
          mt-10 lg:-mt-24 relative z-10
        "
      >
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4  gap-6 justify-between items-start">

          {/* LEFT — PROFILE CARD */}
          <div
            className="
              lg:col-span-1 
              w-full
              flex justify-center lg:justify-start
            "
          >
            <div
              className="
                w-full lg:w-[336px]
                
              "
            >
              <Editprofile />
            </div>
          </div>

          {/* RIGHT — OVERVIEW */}
          <div
            className="
              lg:col-span-3
              w-full
              min-h-screen 
            "
          >
            <Overview />
          </div>

        </div>
      </div>

    </main>
  );
}
