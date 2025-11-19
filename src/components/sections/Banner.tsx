import React from 'react';
import { Search, Star, CheckCircle2} from 'lucide-react';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';



const Banner= () => {
  return (
    <div className="bg-linear-to-br from-orange-100 via-white to-white py-10">
      <div className="custom-container mx-auto px-4 md:px-0 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 ">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Elevate Your Event with Premium{' '}
                <span className="text-gradient italic font-serif">Evoke</span>
              </h1>

              <p className="text-gray-600 text-sm md:text-md leading-relaxed max-w-xl">
                Discover everything you need to plan the perfect event from DJs,
                caterers, and decorators to venues, rentals, and entertainment.
                Connect with trusted providers and bring your celebration vision
                to life effortlessly.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl bg-gradient  py-4 rounded-xl px-4 border-none">
              <div className="relative flex-1 bg-white rounded-xl shadow-sm">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-30" />
                <Input
                  placeholder="What type of Service do you need?"
                  className="relative pl-12 pr-6 py-6 text-base border-0 focus:ring-0 focus:outline-none bg-transparent z-20 rounded-xl placeholder:text-gray-400"
                />
              </div>
      <Button className="btn-gradient text-white px-8 py-6 text-base font-semibold  rounded-xl z-20">
                Find Event Services
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 lg:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span className="text-xs md:text-sm text-gray-700">
                  <span className="font-semibold">10,000+</span> Happy Customers
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs md:text-sm text-gray-700">
                  <span className="font-semibold">4.8/5</span> Average Rating
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-xs md:text-sm text-gray-700">
                  <span className="font-semibold">500+</span> Verified Providers
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* --- Top Left Image with Profile Badge --- */}
              <div className="relative">
                <Image
                  src="/images/img01.png"
                  alt="Wedding outdoor"
                  width={500}
                  height={400}
                  className="rounded-2xl object-cover w-[271px] h-[287px]"
                />

                {/* Floating Profile Badge */}
                <div className="absolute top-3 left-[-65] bg-white px-4 py-3 rounded-xl shadow-md flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold ">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Sarah M.</p>
                    <p className="text-xs text-gray-500 -mt-1">
                      Wedding Planner
                    </p>
                  </div>
                </div>
                {/* spring*/}
                <div className="relative">
                  <Image
                    src="/images/Group01.png"
                    alt="Garden event"
                    width={1000}
                    height={500}
                    className="rounded-2xl object-cover w-[75px] h-[65px] absolute top-[-58] right-73"
                  />
                </div>
                {/* star*/}
                <div className="relative">
                  <Image
                    src="/images/Group.png"
                    alt="Garden event"
                    width={1000}
                    height={500}
                    className="rounded-2xl object-cover w-[41px] h-[39px] absolute bottom-56 right-[-80]"
                  />
                </div>
              </div>

              {/* --- Top Right Event Image --- */}
              <div className="realtive">
                <Image
                  src="/images/img02.png"
                  alt="Indoor event"
                  width={500}
                  height={400}
                  className="rounded-2xl object-cover w-[233px] h-[264px] absolute top-20 right-22"
                />
              </div>

              {/* --- Bottom Large Image With Rating Badge --- */}
              <div className="col-span-2 relative">
                <Image
                  src="/images/img03.png"
                  alt="Garden event"
                  width={1000}
                  height={500}
                  className="rounded-2xl object-cover w-[350px] h-[208px]"
                />

                {/* Floating Rating Badge */}
                <div className="absolute top-14 right-14 bg-[#fff1df] border border-orange-200 px-4 py-4 rounded-xl shadow-md flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-xs text-gray-500">(234 reviews)</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/Group02.png"
                alt="Garden event"
                width={1000}
                height={500}
                className="rounded-2xl object-cover w-[37px] h-[63px] absolute top-[-62] right-55"
              />
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Banner ;
