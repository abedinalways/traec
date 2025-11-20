/** @format */

import React from "react";
import { CiStopwatch } from "react-icons/ci";
import { MdLanguage } from "react-icons/md";

export default function AboutProvider() {
  return (
    <>
      {" "}
      <div className='px-4 sm:px-6'>
        <h3 className='border-l-2 border-gray-400 pl-3 my-5'>About Provider</h3>

        <div className='space-y-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm my-4'>
          <div>
            <p className='font-bold border-b border-gray-400 py-3'>
              About DJ Sarahs Party Productions
            </p>
            <div className='border-b border-gray-400 py-3'>
              <p className='font-bold'>Professional Background</p>
              <p className='text-gray-700'>
                With over 8 years of experience in the entertainment industry, I
                specialize in creating unforgettable experiences for all types
                of events. From intimate birthday parties to large corporate
                gatherings, I bring the perfect blend of professionalism and fun
                to every occasion.
              </p>
            </div>
            <div className='border-b border-gray-400 py-3'>
              <p className='font-bold'>Services & Specialties</p>
              <ul className='list-disc list-outside ml-6'>
                <li>
                  Childrens birthday parties and themed events and team building
                </li>
                <li>Wedding ceremonies and receptions • Corporate events</li>
                <li>Holiday parties and seasonal celebrations</li>
                <li>School dances and graduation parties</li>
              </ul>
            </div>
            <div className='border-b border-gray-400 py-3'>
              <p className='font-bold'>Equipment & Setup</p>
              <p>
                Professional-grade sound system with wireless microphones, LED
                lighting packages, fog machines, and backup equipment to ensure
                your event runs smoothly.
              </p>
            </div>
            <div className='flex justify-between mt-2'>
              <div className='flex flex-col gap-2'>
                <p className='font-bold'>Languages</p>
                <div className='flex gap-1'>
                  <button className='border border-gray-300 rounded-2xl p-1 flex items-center gap-1'>
                    <MdLanguage />
                    English
                  </button>
                  <button className='border border-gray-300 rounded-2xl p-1 flex items-center gap-1'>
                    Spanish
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-bold'>Response Time</p>
                <button className='border border-gray-300 rounded-2xl p-1 flex items-center gap-1'>
                  <CiStopwatch />
                  Within 1 hour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
