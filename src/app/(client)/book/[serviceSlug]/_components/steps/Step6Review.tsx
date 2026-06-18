"use client";

import { useState } from "react";
import LeftArrow from "@/components/icons/LeftArrow";
import TrackIcon from "@/components/icons/TrackIcon";
import { Button } from "@/components/ui/button";
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
      eventName: string;
      guestsCount: number;
      eventDuration: number;
      eventDescription: string;
    };
    step3: {
      eventStartDate: string;
      eventEndDate: string;
      eventStartTime: string;
      eventEndTime: string;
    };
    step4: {
      partyTheme: string;
      musicPreference: string;
      mustPlaySongs: string;
      partyGames: string;
      entranceStyle: string;
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

const ADDONS_LABELS = [
  { id: 1, title: "Generator Rental", price: 75 },
  { id: 2, title: "Post-Event Cleaning", price: 75 },
  { id: 3, title: "Early Setup", price: 75 },
  { id: 4, title: "Party Attendant", price: 75 },
];

export default function Step6Review({
  allData,
  serviceSlug,
  plan,
  onPrevious,
}: Step6Props) {
  const { step1, step2, step3, step4, step5 } = allData;
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="space-y-8">
      <h1 className="font-inter text-lg font-medium leading-6">
        Review Your Booking
      </h1>
      {/* === TOP HEADER LIKE SCREENSHOT === */}
      <div className="border border-orange-200 rounded-lg p-5 flex items-center gap-3 bg-[#FA99160E]">
        <div className="w-10 h-10 rounded-md grid place-content-center bg-linear-to-r from-[#FFAC47] to-[#FF2A24] font-bold">
          <TrackIcon />
        </div>
        <div>
          <p className="font-inter font-medium text-[16px] text-black">
            DJ Santa's Party Productions
          </p>
          <p className="font-inter text-[16px] text-[#777980]">
            Party Pro Rentals
          </p>
        </div>
      </div>

      {/* === EVENT DETAILS CARD === */}
      <div className="border border-[#dfe1e7] rounded-lg p-5 space-y-1">
        <h2 className="font-inter font-medium text-lg text-black mb-3">
          Event Details
        </h2>

        <p className="text-[#4a4c56] text-base leading-6 tracking-[0.01em]">
          <span>Event Type:</span> {step2.eventType}
        </p>
        <p className="text-[#4a4c56]">
          <span>Event Name:</span> {step2.eventName}
        </p>
        <p className="text-[#4a4c56]">
          <span>Duration:</span> {step2.eventDuration} Hr
        </p>
        <p className="text-[#4a4c56]">
          <span>Guests:</span> {step2.guestsCount}
        </p>

        <div className="flex flex-col">
          <p className="text-[#4a4c56]">Description:</p>
          <p className="text-[#4a4c56] whitespace-pre-line">
            {step2.eventDescription}
          </p>
        </div>
      </div>

      {/* === DATE & TIME CARD === */}
      <div className="border border-[#dfe1e7] rounded-lg p-5 space-y-1">
        <h2 className="font-inter font-medium text-lg text-black mb-3">
          Date and Time
        </h2>

        <p className="text-[#4a4c56] text-base leading-6 tracking-[0.01em]">
          <span>Date:</span> {step3.eventStartDate} &ndash; {step3.eventEndDate}
        </p>
        <p className="text-[#4a4c56]">
          <span>Time:</span> {step3.eventStartTime} &ndash; {step3.eventEndTime}
        </p>
      </div>

      {/* === LOCATION CARD === */}
      <div className="border border-[#dfe1e7] rounded-lg p-5 space-y-1">
        <h2 className="font-inter font-medium text-lg text-black mb-3">
          Location & Contact
        </h2>

        <p className="text-[#4a4c56] text-base leading-6 tracking-[0.01em]">
          <span>Full Name:</span> {step1.firstName} {step1.lastName}
        </p>
        <p className="text-[#4a4c56]">
          <span>Email Address:</span> {step1.email}
        </p>
        <p className="text-[#4a4c56] text-base leading-6 tracking-[0.01em]">
          <span>Phone Number:</span> {step1.phoneNumber}
        </p>
        <p className="text-[#4a4c56] text-base leading-6 tracking-[0.01em]">
          <span>Location:</span> {step1.streetAddress}, {step1.city},
          {step1.state}, {step1.zipCode}
        </p>
      </div>

      {/* === QUESTIONNAIRE CARD === */}
      <div className="border border-[#dfe1e7] rounded-lg p-5">
        <h2 className="font-inter font-medium text-lg text-black mb-3">
          Questionnaire
        </h2>

        <div className="flex flex-col gap-4">
          <div className="text-[#4a4c56] text-base leading-6 tracking-[0.01em] flex gap-1">
            <p className="font-medium">1.</p>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-gray-800">
                What is your Party Theme?
              </span>
              <span>Theme: {step4.partyTheme}</span>
            </div>
          </div>

          <div className="text-[#4a4c56] text-base leading-6 tracking-[0.01em] flex gap-1">
            <p className="font-medium">2.</p>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                What kind of music you Preference?
              </span>
              <span>
                Preferred Genres: {step4.musicPreference}
              </span>
            </div>
          </div>

          <div className="text-[#4a4c56] text-base leading-6 tracking-[0.01em] flex gap-1">
            <p className="font-medium">3.</p>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                What are your Must-Play Songs?
              </span>
              <span>Must-Play Songs: {step4.mustPlaySongs}</span>
            </div>
          </div>

          <div className="text-[#4a4c56] text-base leading-6 tracking-[0.01em] flex gap-1">
            <p className="font-medium">4.</p>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                Do you want Dance Party Games included?
              </span>
              <span>{step4.partyGames}</span>
            </div>
          </div>

          <div className="text-[#4a4c56] text-base leading-6 tracking-[0.01em] flex gap-1">
            <p className="font-medium">5.</p>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                How would you like the birthday child's entrance to be?
              </span>
              <span>{step4.entranceStyle}</span>
            </div>
          </div>

          <div className="text-[#4a4c56] text-base leading-6 tracking-[0.01em] flex gap-1">
            <p className="font-medium">6.</p>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                Additional Notes
              </span>
              <span>{step4.additionalNotes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* === BOOKING SUMMARY === */}
      <div className="border border-[#dfe1e7] rounded-lg p-5 space-y-4">
        <h2 className="font-inter font-medium text-lg text-black">
          Booking Summary:
        </h2>

        <div className="flex justify-between text-[#4a4c56]">
          <span>Plan:</span>
          <span>${step5.totalPrice - step5.addons.length * 75}</span>
        </div>

        <div className="flex justify-between text-[#4a4c56]">
          <span>Add-ons:</span>
          <span>${step5.addons.length * 75}</span>
        </div>

        <div className="flex justify-between font-semibold text-xl text-black pt-2 border-t">
          <span>Total Amount:</span>
          <span>${step5.totalPrice}</span>
        </div>

        {/* Terms Checkboxes */}
        <div className="space-y-2 pt-4">
          <label className="flex gap-2 text-[#4a4c56] text-sm items-start">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5"
            />{" "}
            I agree to the Terms of Service and Privacy Policy
          </label>

          <label className="flex gap-2 text-[#4a4c56] text-sm items-start">
            <input type="checkbox" className="mt-0.5" /> I understand the
            cancellation policy.
          </label>
        </div>
      </div>

      {/* === BUTTONS === */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onPrevious}
          className="capitalize font-inter text-base text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] p-6"
        >
          <LeftArrow />
          previous
        </Button>

        <Link
          href={
            agreeTerms ? `/book/checkout?plan=${plan}` : "#"
          }
          onClick={(e) => {
            if (!agreeTerms) {
              e.preventDefault();
              alert("Please agree to the Terms of Service and Privacy Policy first.");
            }
          }}
          className={`capitalize font-inter text-base text-white py-3 px-6 rounded-[12px] ${
            agreeTerms ? "bg-black" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Proceed to Payment
        </Link>
      </div>
    </div>
  );
}