"use client";

import React, { useState } from "react";
import ServiceBreadcrumb from "../[serviceSlug]/_components/ServiceBreadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import TrackIcon from "@/components/icons/TrackIcon";
import PeopleIcon from "@/components/icons/PeopleIcon";
import Location from "@/components/icons/Location";
import CalendarIcons from "@/components/icons/CalendarIcons";
import ClockIcons from "@/components/icons/ClockIcons";

interface CardFormData {
  cardNumber: string;
  nameOnCard: string;
  expiry: string;
  cvv: number;
}

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormData>();

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const onSubmit = (data: CardFormData) => {
    console.log("Payment Data:", data);
    setBookingConfirmed(true);
  };

  return (
    <div className="my-10 font-[inter]">
      {!bookingConfirmed ? (
        <div className="custom-container mx-auto">
          <ServiceBreadcrumb step={2} />

          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-2xl font-medium">Checkout</h3>
            <p className="text-[16px]">
              Your payment information is secure and encrypted
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-[70%]">
              {/* Payment Method */}
              <div className="border rounded-xl p-5">
                <h3 className="mb-3 text-lg font-bold">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payment" />
                    <span className="text-sm">Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payment" />
                    <span className="text-sm">Stripe</span>
                  </label>
                </div>
              </div>

              {/* Card Info */}
              <div className="border rounded-xl p-5 mt-3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className="font-bold text-lg">Card Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      placeholder="Card Number"
                      className="border px-4 py-3 rounded-[12px]"
                      {...register("cardNumber", { required: true })}
                    />
                    <input
                      placeholder="Name on Card"
                      className="border px-4 py-3 rounded-[12px]"
                      {...register("nameOnCard", { required: true })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      placeholder="Expiry"
                      className="border px-4 py-3 rounded-[12px]"
                      {...register("expiry", { required: true })}
                    />
                    <input
                      placeholder="CVV"
                      className="border px-4 py-3 rounded-[12px]"
                      {...register("cvv", { required: true })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-black text-white w-full py-3 rounded-md"
                  >
                    Pay Now
                  </button>
                </form>
              </div>

              {/* Additional Options */}
              <div className="border rounded-xl p-5 mt-3">
                <h3 className="mb-3 text-lg font-bold">Additional Options</h3>

                <label className="flex items-center gap-2">
                  <Checkbox />
                  Save card for future bookings
                </label>

                <label className="flex items-center gap-2">
                  <Checkbox />
                  Send me rebooking reminders
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[30%]">
              <div className="border rounded-xl p-5">
                <h3 className="mb-3 font-semibold">Order Summary</h3>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 grid place-content-center bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] rounded-md">
                    <TrackIcon />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      DJ Santa’s Party Productions
                    </p>
                    <p className="text-xs text-gray-500">Party Pro Rentals</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm border-b pb-3">
                  <p className="flex gap-2 items-center">
                    <CalendarIcons /> Aug 24, 2025
                  </p>
                  <p className="flex gap-2 items-center">
                    <ClockIcons /> 14:42 - 16:40
                  </p>
                  <p className="flex gap-2 items-center">
                    <Location /> Los Angeles, CA
                  </p>
                  <p className="flex gap-2 items-center">
                    <PeopleIcon /> John Doe
                  </p>
                </div>

                <div className="flex justify-between mt-3 font-bold">
                  <p>Total</p>
                  <p>$178</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-green-600 text-2xl font-bold">
            Booking Confirmed!
          </h2>
          <button className="mt-5 bg-black text-white px-6 py-3 rounded-md flex items-center gap-2 mx-auto">
            Download Receipt <MdOutlineFileDownload />
          </button>

          <Link href="/order-details">
            <button className="mt-3 border px-6 py-3 rounded-md flex items-center gap-2 mx-auto">
              Go to order page <IoIosArrowForward />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
