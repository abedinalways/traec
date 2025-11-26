"use client";

import Editprofile from "../../(dashboard)/components/editprofile/Editprofile";
import Overview from "../../(dashboard)/components/overview/Overview";

export default function Page() {
  return (
    <main className="w-full min-h-screen bg-white">

      {/* ===== Top Cover Image / Header ===== */}
      <div className="w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[450px] relative">
        <img
          src="/images/Rectangle 26.png"
          alt="Profile cover"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div
        className="
          w-full max-w-7xl mx-auto 
          px-4 sm:px-6 md:px-10 lg:px-12
          -mt-24 relative z-10
        "
      >
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

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
                w-full 
                max-w-xs 
                lg:w-[360px] 
                lg:h-[904px]
              "
            >
              <Editprofile />
            </div>
          </div>

          {/* RIGHT — OVERVIEW */}
          <div
            className="
              lg:col-span-2
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
