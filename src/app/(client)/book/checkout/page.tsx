"use client";

import React, { useState } from "react";
import ServiceBreadcrumb from "../[serviceSlug]/_components/ServiceBreadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import TrackIcon from "@/components/icons/TrackIcon";
import PeopleIcon from "@/components/icons/PeopleIcon";
import Location from "@/components/icons/Location";
import CalendarIcons from "@/components/icons/CalendarIcons";
import ClockIcons from "@/components/icons/ClockIcons";
import Image from "next/image";

interface CardFormData {
  cardNumber: string;
  nameOnCard: string;
  expiry: string;
  cvv: number;
}

export default function CheckoutPage() {
  const { register, handleSubmit } = useForm<CardFormData>();
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const onSubmit = (data: CardFormData) => {
    console.log(data);
    setBookingConfirmed(true);
  };

  return (
    <div className="my-10 font-[inter]">
      {!bookingConfirmed ? (
        <div className="custom-container mx-auto">
          <ServiceBreadcrumb step={2} />

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Checkout</h2>
            <p className="text-sm text-gray-500">
              Your payment information is secure and encrypted
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT SIDE */}
            <div className="lg:w-[68%] space-y-4">
              {/* Payment Method */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold mb-4">Payment Method</h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payment" defaultChecked />
                    <span className="text-sm">Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payment" />
                    <span className="text-sm">Stripe</span>
                  </label>
                </div>
              </div>

              {/* Card Information */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold mb-4">Card Information</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600">
                        Card Number
                      </label>
                      <input
                        className="w-full mt-1 border rounded-lg px-4 py-3"
                        placeholder="1241 2145 2145 3258"
                        {...register("cardNumber")}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-600">
                        Name on Card
                      </label>
                      <input
                        className="w-full mt-1 border rounded-lg px-4 py-3"
                        placeholder="Millan"
                        {...register("nameOnCard")}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600">
                        Expiry Date
                      </label>
                      <input
                        className="w-full mt-1 border rounded-lg px-4 py-3"
                        placeholder="02/25"
                        {...register("expiry")}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-600">CVV</label>
                      <input
                        className="w-full mt-1 border rounded-lg px-4 py-3"
                        placeholder="240"
                        {...register("cvv")}
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Additional Options */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold mb-3">Additional Options</h3>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox />
                    Save card for future bookings.
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox />
                    Send me rebooking reminders for annual events.
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <div className="lg:w-[32%]">
              <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                <h3 className="font-semibold">Order Summary</h3>

                <div className="bg-[#FAF5EF] p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 grid place-content-center rounded-md bg-gradient-to-r from-[#FFAC47] to-[#FF2A24]">
                      <TrackIcon />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        DJ Santa’s Party Productions
                      </p>
                      <p className="text-xs text-gray-500">Party Pro Rentals</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <CalendarIcons /> Wednesday, Sep 24, 2025
                  </p>
                  <p className="flex items-center gap-2">
                    <ClockIcons /> 14:42 - 16:40
                  </p>
                  <p className="flex items-center gap-2">
                    <Location /> Los Angeles, CA
                  </p>
                  <p className="flex items-center gap-2">
                    <PeopleIcon /> John Doe
                  </p>
                </div>

                <div className="border-t pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span>$128</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Add-ons (Early Setup):</span>
                    <span>$50</span>
                  </div>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>$178</span>
                </div>

                <button
                  onClick={() => setBookingConfirmed(true)}
                  className="w-full bg-black text-white py-3 rounded-lg mt-2 cursor-pointer"
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div>
            <Image
              src="/images/profile/img111.png"
              alt="Booking Confirmed"
              width={94}
              height={94}
              className="mx-auto mb-6"
            />
          </div>
          <h2 className="text-green-600 text-2xl font-bold">
            Booking Confirmed!
          </h2>
            <p className="text-[16px]">Your party rental has been successfully booked!</p>
            <span className="inline-block mt-2 rounded-full border border-green-400 p-2 text-[14px]">Order ID #AB48A98G</span>
          <button className="mt-6 bg-black cursor-pointer text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto">
            Download Receipt <MdOutlineFileDownload />
          </button>

          <Link href="/order-details">
            <button className="mt-4 border px-6 py-3 cursor-pointer rounded-lg flex items-center gap-2 mx-auto">
              Go to order page <IoIosArrowForward />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
