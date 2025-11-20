"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Step6Props {
  allData: {
    step1: {
      streetAddress: string;
      city: string;
      state: string;
      zipCode: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    step2: {
      eventType: string;
      guestsCount: string;
      indoorsOutdoors: string;
      eventNotes: string;
    };
    step3: {
      eventDate: string;
      startTime: string;
      endTime: string;
    };
    step4: {
      preferences: string[];
      additionalNotes: string;
    };
    step5: {
      addons: number[];
      totalPrice: number;
    };
  };
  serviceSlug: string;
  plan: string;
  onPrevious: () => void;
}

// Fake static data (same as Step 5)
const AVAILABLE_ADDONS = [
  { id: 1, title: "Extra Lighting Setup", price: 25 },
  { id: 2, title: "Premium Decoration", price: 40 },
  { id: 3, title: "DJ & Sound System", price: 70 },
  { id: 4, title: "Food Stall Add-on", price: 50 },
  { id: 5, title: "Live Photography", price: 90 },
];

const Step6Review = ({
  allData,
  serviceSlug,
  plan,
  onPrevious,
}: Step6Props) => {
  const { step1, step2, step3, step4, step5 } = allData;

  return (
    <div className="space-y-8">
      {/* STEP 1 */}
      <div className="border border-[#dfe1e7] rounded-lg p-5">
        <h2 className="font-inter font-medium text-lg text-black mb-4">
          Location & Contact
        </h2>
        <div className="space-y-1 text-[#4a4c56]">
          <p>
            {step1.firstName} {step1.lastName}
          </p>
          <p>{step1.email}</p>
          <p>{step1.phoneNumber}</p>
          <p>
            {step1.streetAddress}, {step1.city}, {step1.state} - {step1.zipCode}
          </p>
        </div>
      </div>

      {/* STEP 2 */}
      <div className="border border-[#dfe1e7] rounded-lg p-5">
        <h2 className="font-inter font-medium text-lg text-black mb-4">
          Event Details
        </h2>
        <div className="space-y-1 text-[#4a4c56]">
          <p>
            <b>Type:</b> {step2.eventType}
          </p>
          <p>
            <b>Guests:</b> {step2.guestsCount}
          </p>
          <p>
            <b>Setup:</b> {step2.indoorsOutdoors}
          </p>
          <p>
            <b>Notes:</b> {step2.eventNotes || "N/A"}
          </p>
        </div>
      </div>

      {/* STEP 3 */}
      <div className="border border-[#dfe1e7] rounded-lg p-5">
        <h2 className="font-inter font-medium text-lg text-black mb-4">
          Date & Time
        </h2>
        <div className="space-y-1 text-[#4a4c56]">
          <p>
            <b>Date:</b> {step3.eventDate}
          </p>
          <p>
            <b>Start:</b> {step3.startTime}
          </p>
          <p>
            <b>End:</b> {step3.endTime}
          </p>
        </div>
      </div>

      {/* STEP 4 */}
      <div className="border border-[#dfe1e7] rounded-lg p-5">
        <h2 className="font-inter font-medium text-lg text-black mb-4">
          Preferences
        </h2>
        <div className="space-y-1 text-[#4a4c56]">
          <p>
            <b>Selected:</b>{" "}
            {step4.preferences.length > 0
              ? step4.preferences.join(", ")
              : "None"}
          </p>
          <p>
            <b>Notes:</b> {step4.additionalNotes || "N/A"}
          </p>
        </div>
      </div>

      {/* STEP 5 */}
      <div className="border border-[#dfe1e7] rounded-lg p-5">
        <h2 className="font-inter font-medium text-lg text-black mb-4">
          Add-ons
        </h2>

        {step5.addons.length > 0 ? (
          <div className="space-y-1 text-[#4a4c56]">
            {step5.addons.map((id) => {
              const addon = AVAILABLE_ADDONS.find((a) => a.id === id);
              return (
                <p key={id}>
                  {addon?.title} — ${addon?.price}
                </p>
              );
            })}
          </div>
        ) : (
          <p className="text-[#4a4c56]">No add-ons selected</p>
        )}

        {/* Total */}
        <div className="mt-4 font-inter font-semibold text-xl text-black">
          Total: ${step5.totalPrice}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onPrevious}
          className="capitalize font-inter text-base text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] py-3 px-6"
        >
          <ChevronLeft />
          previous
        </Button>

        <Link
          href={`/book/${serviceSlug}/checkout?plan=${plan}`}
          className="capitalize font-inter text-base text-white py-3 px-6 bg-black rounded-md"
        >
          proceed to checkout
        </Link>
      </div>
    </div>
  );
};

export default Step6Review;
