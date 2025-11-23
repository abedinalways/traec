"use client";

import Editprofile from "../components/editprofile/Editprofile";
import Overview from "../components/overview/Overview";

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

        {/* Optional Dark Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* ===== MAIN CONTENT WRAPPER (Profile Left + Overview Right) ===== */}
      <div className="
        w-full max-w-7xl mx-auto 
        px-4 sm:px-6 md:px-10 lg:px-12
        -mt-24 relative z-10
      ">

        {/* GRID LAYOUT (PROFILE LEFT + OVERVIEW RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN — Profile Card */}
          <div className="lg:col-span-1">
            <Editprofile />
          </div>

          {/* RIGHT COLUMN — Overview */}
          <div className="lg:col-span-2">
            <Overview />
          </div>

        </div>

      </div>

    </main>
  );
}
