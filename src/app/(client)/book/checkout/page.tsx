"use client";
import React, { useState } from "react";
import ServiceBreadcrumb from "../[serviceSlug]/_components/ServiceBreadcrumb";
import { FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  MdOutlineCalendarMonth,
  MdOutlineFileDownload,
  MdOutlineLocationOff,
} from "react-icons/md";
import { IoIosArrowForward, IoMdTime } from "react-icons/io";
import { CiUser } from "react-icons/ci";

interface CardFormData {
  cardNumber: string;
  nameOnCard: string;
  expiry: string;
  cvv: number;
}
interface AddNewCardModalProps {
  onSubmitSuccess?: (data: CardFormData) => void;
}
export default function CheckoutPage({
  onSubmitSuccess,
}: AddNewCardModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormData>();

  const [bookigConfirmed, setBookigConfirmed] = useState(false);

  const onSubmit = (data: CardFormData) => {
    onSubmitSuccess?.(data);
  };
  return (
    <div className="my-10">
      {!bookigConfirmed ? (
        <div className="custom-container mx-auto">
          <ServiceBreadcrumb step={2} />
          {/* Header */}
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="font-inter text-2xl font-medium">Checkout</h3>
            <p>Your payment information is secure and encrypted</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 ">
            <div className="w-full lg:w-[70%]">
              {/* Payment Method  */}
              <div className="border rounded-xl p-5">
                <h3 className="mb-3 text-lg font-bold">Payment Method</h3>
                <div className="space-y-3">
                  {/* Credit/Debit Card */}
                  <label className="flex items-center space-x-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      className="h-4 w-4 rounded-full border-gray-400 text-black focus:ring-black"
                    />
                    <span className="text-gray-800 text-sm">
                      Credit/Debit Card
                    </span>
                  </label>

                  {/* Stripe */}
                  <label className="flex items-center space-x-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      className="h-4 w-4 rounded-full border-gray-400 text-black focus:ring-black"
                    />
                    <span className="text-gray-800 text-sm">Stripe</span>
                  </label>
                </div>
              </div>
              {/* Card Information  */}
              <div className="border rounded-xl p-5 mt-3">
                <div className="">
                  <div className="bg-white rounded-2xl w-full ">
                    {/* Form */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <h3 className="font-bold text-lg">Card Information</h3>

                      {/* Card Number + Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-700">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1241 2145 2145 3258"
                            className="mt-1 w-full rounded-md border px-4 py-3"
                            {...register("cardNumber", { required: true })}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-600 text-xs">
                              Card number is required
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-sm text-gray-700">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            placeholder="Millan"
                            className="mt-1 w-full rounded-md border px-4 py-3"
                            {...register("nameOnCard", { required: true })}
                          />
                          {errors.nameOnCard && (
                            <p className="text-red-600 text-xs">
                              Name is required
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Expiry + CVV */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-700">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="02/25"
                            className="mt-1 w-full rounded-md border px-4 py-3"
                            {...register("expiry", { required: true })}
                          />
                          {errors.expiry && (
                            <p className="text-red-600 text-xs">
                              Expiry date required
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-sm text-gray-700">CVV</label>
                          <input
                            type="number"
                            placeholder="240"
                            className="mt-1 w-full rounded-md border px-4 py-3"
                            {...register("cvv", { required: true })}
                          />
                          {errors.cvv && (
                            <p className="text-red-600 text-xs">
                              CVV is required
                            </p>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Additional Options  */}
              <div className="border rounded-xl p-5 mt-3">
                <h3 className="mb-3 text-lg font-bold">Additional Options</h3>
                {/* Credit/Debit Card */}
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    name="payment"
                    className="h-4 w-4 rounded border-gray-400 text-black focus:ring-black"
                  />
                  <span className="text-gray-800 text-sm">
                    Save card for future bookings.
                  </span>
                </label>
                <label className="flex items-center space-x-3  cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    name="payment"
                    className="h-4 w-4 rounded border-gray-400 text-black focus:ring-black"
                  />
                  <span className="text-gray-800 text-sm">
                    Send me rebooking reminders for annual events.
                  </span>
                </label>
              </div>
            </div>
            <div className="w-full lg:w-[30%]">
              <div className="border rounded-xl p-5">
                <h3 className="mb-3 text-lg font-bold">Order Summary</h3>
                <div className="bg-[#FA991614] rounded-md p-5">
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center">
                      <Image
                        src="/images/browser/img07.png"
                        alt="provider1"
                        width={24}
                        height={24}
                        className="w-12 h-12 rounded-md mr-2"
                      />
                    </div>
                    <div>
                      <h3>DJ Sarah&#39;s Party Productions</h3>
                      <p>by Party Pro Rentals</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 border-b-2 border-gray-300 pb-3">
                  <p className="flex gap-2 items-center">
                    <MdOutlineCalendarMonth /> flex gap-3 items-center
                  </p>
                  <p className="flex gap-2 items-center">
                    <IoMdTime /> 14:42 - 16 :40
                  </p>
                  <p className="flex gap-2 items-center">
                    <MdOutlineLocationOff /> Los Angeles, CA
                  </p>
                  <p className="flex gap-2 items-center">
                    <CiUser /> Jhon Doe
                  </p>
                </div>
                <div className="mt-3 border-b-2 border-gray-300 pb-3">
                  <div className="flex justify-between">
                    <p>Plan:</p>
                    <p className="font-bold">$128</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Add-ons (Early Setup):</p>
                    <p className="font-bold">$50</p>
                  </div>
                </div>
                <div className="w-full mt-3">
                  <div className="flex justify-between mb-3">
                    <p>Total Amount</p>
                    <p className="font-bold">$178</p>
                  </div>
                  <button
                    onClick={() => setBookigConfirmed(true)}
                    className="bg-[#070707] w-full rounded-md py-3 text-white cursor-pointer "
                  >
                    Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto">
            <div className="flex flex-col gap-5 items-center">
              <div className="flex items-center">
                <Image
                  src="/images/PersonalInformationSuccessfullyModal.png"
                  alt="provider1"
                  width={24}
                  height={24}
                  className="w-20 h-20 rounded-md mr-2"
                />
              </div>
              <div className="flex flex-col items-center  gap-3">
                <h3 className="text-[#00A63E] text-xl font-bold">
                  Booking Confirmed!
                </h3>
                <p>Your party rental has been successfully booked!</p>
                <button className="border border-[#00A63E] rounded-2xl">
                  OrderID #004758012429105
                </button>
              </div>
              <div className="w-8/12 mx-auto mt-3 flex flex-col items-center gap-5">
                <button className="bg-[#070707] w-full rounded-md py-3 text-white cursor-pointer flex items-center justify-center gap-3 ">
                  Download Receipt <MdOutlineFileDownload />
                </button>
                <button className="w-full border rounded-md py-3 cursor-pointer flex items-center justify-center gap-3 ">
                  Go to order page <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
