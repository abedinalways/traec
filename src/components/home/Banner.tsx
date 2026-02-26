import React from "react";
import { Search, Star} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import RightIcon from "../icons/RightIcon";
import BlueRightIcon from "../icons/BlueRightIcon";
import StarIcon from "../icons/StarIcon";
import GreenRightIcon from "../icons/GreenRightIcon";

const Banner = () => {
  return (
    <div className="bg-linear-to-br  from-orange-50 via-white to-white py-10">
      <div className="custom-container mx-auto px-4 md:px-0 py-8 lg:py-16">
        <div className="grid xl:grid-cols-2 gap-10 lg:gap-16 items-center justify-between">
          {/* LEFT TEXT SECTION */}
          <div className="space-y-6 lg:space-y-8 ">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl  lg:text-[64px] font-bold text-gray-900 leading-tight font-[glory]">
                Elevate Your Event with Premium{" "}
                <span className="text-3xl sm:text-4xl  lg:text-[64px] font-[brittney] font-semibold text-[#F2652F]  ">
                  Evoke
                </span>
              </h1>
             

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl font-[inter]">
                Discover everything you need to plan the perfect event from DJs,
                caterers, and decorators to venues, rentals, and entertainment.
                Connect with trusted providers and bring your vision to life
                effortlessly.
              </p>
            </div>

            {/* SEARCH BAR */}
            <div className="flex flex-col sm:flex-row gap-3 w-full bg-gradient py-4 rounded-[32px] shape-squircle px-4 font-[inter]">
              <div className="relative flex-1 bg-white border border-gray-200 rounded-[32px] shadow-sm shape-squircle">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 " />
                <Input
                  placeholder="What type of Service do you need?"
                  className="pl-12 pr-6 py-7 text-base border-0 focus:ring-0 bg-transparent rounded-xl placeholder:text-gray-400 placeholder:font-[inter]"
                />
              </div>

              <button className="gradient-bg text-white  cursor-pointer px-8 py-4 text-base font-semibold rounded-[12px]">
                Find Event Services
              </button>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 pt-4 font-[inter]">
              <div className="flex items-center gap-2">
                <BlueRightIcon />
                <span className="text-xs sm:text-sm text-gray-700">
                  <span className="font-semibold">10,000+</span> Happy Customers
                </span>
              </div>

              <div className="flex items-center gap-2">
                <StarIcon />
                <span className="text-xs sm:text-sm text-gray-700">
                  <span className="font-semibold">4.8/5</span> Average Rating
                </span>
              </div>

              <div className="flex items-center gap-2">
                <GreenRightIcon />
                <span className="text-xs sm:text-sm text-gray-700">
                  <span className="font-semibold">500+</span> Verified Providers
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE GRID */}
          <div className="relative md:pl-15 ">
            {/* MOBILE STACKED LAYOUT */}
            <div className="flex flex-col gap-5 xl:hidden">
              {/* Main Image */}
              <div className="relative">
                <Image
                  src="/images/img01.png"
                  alt="Event"
                  width={900}
                  height={600}
                  className="rounded-2xl w-full h-[230px] object-cover"
                />

                {/* Badge */}
                <div className="p-px rounded-[14px] bg-yellow-300">
                  <div className="absolute top-3 left-3 bg-white px-3 py-2 rounded-[14px] shadow-md flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-xs">
                      <RightIcon />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Sarah M.</p>
                      <p className="text-[10px] text-gray-500">
                        Wedding Planner
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Image */}
              <Image
                src="/images/img02.png"
                alt="Event 2"
                width={900}
                height={600}
                className="rounded-2xl w-full h-[220px] object-cover"
              />

              {/* Bottom Image */}
              <div className="relative">
                <Image
                  src="/images/img03.png"
                  alt="Event 3"
                  width={900}
                  height={600}
                  className="rounded-2xl w-full h-[220px] object-cover"
                />

                {/* Rating badge */}
                <div className="absolute bottom-3 right-3 bg-yellow-100 border border-orange-200 px-3 py-2 rounded-[10px] shadow-md flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-xs">4.9</span>
                  <span className="text-[10px] text-gray-500">
                    (234 reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              {/* Your original grid completely untouched */}
              <div className="grid grid-cols-2 gap-6 relative">
                {/* Top Left */}
                <div className="relative left-12">
                  <Image
                    src="/images/img01.png"
                    alt="Event"
                    width={500}
                    height={400}
                    className="rounded-2xl object-cover w-[271px] h-[287px]"
                  />

                  <div className="absolute top-3 left-[-65px] bg-white px-4 py-3 rounded-xl shadow-md flex items-center gap-3 border border-orange-300">
                    <div className="bg-[#FCEDEB] rounded-full p-2">
                      <div className="  p-1">
                        <Image
                          src="/images/right.png"
                          width={15}
                          height={15}
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold font-[open_sans]">
                        Sarah M.
                      </p>
                      <p className="text-xs text-gray-500 -mt-1 font-[open_sans]">
                        Wedding Planner
                      </p>
                    </div>
                  </div>

                  <Image
                    src="/images/Group01.png"
                    alt="Decor"
                    width={1000}
                    height={500}
                    className="absolute w-[75px] h-[65px] top-40 -left-14 md:block hidden"
                  />

                  <Image
                    src="/images/Group.png"
                    alt="Star"
                    width={1000}
                    height={500}
                    className="absolute w-[41px] h-[39px] bottom-56  -right-40"
                  />
                </div>

                {/* Top Right */}
                <div className="relative">
                  <Image
                    src="/images/img02.png"
                    alt="Event 2"
                    width={500}
                    height={400}
                    className="rounded-2xl border border-red-500  object-cover w-[233px] h-[264px] absolute top-18 right-0"
                  />
                </div>

                {/* Bottom */}
                <div className="col-span-2 relative">
                  <div className="relative md:left-12">
                    <Image
                      src="/images/img03.png"
                      alt="Event 3"
                      width={1000}
                      height={500}
                      className="rounded-2xl object-cover w-[326px] h-[200px]"
                    />
                  </div>

                  <div className="absolute top-14 right-6 bg-[#fff1df]/20 border border-orange-200 px-4 py-4 rounded-xl shadow-md flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">4.9</span>
                    <span className="text-xs text-gray-500">(234 reviews)</span>
                  </div>
                </div>
              </div>

              <Image
                src="/images/Group02.png"
                alt="Decor"
                width={1000}
                height={500}
                className="absolute w-[37px] h-[55px] top-110 right-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
