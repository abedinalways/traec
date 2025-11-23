"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Step6Review from "./_components/steps/Step6Review";
import Step5Addons from "./_components/steps/Step5Addons";
import Step4Questionnaire from "./_components/steps/Step4Questionnaire";
import Step3DateTime from "./_components/steps/Step3DateTime";
import Step2EventDetails from "./_components/steps/Step2EventDetails";
import Step1Location from "./_components/steps/Step1Location";

import { BookingData } from "@/types/global";
import { useBooking } from "../context/BookingContext";

interface BookingPageProps {
  step: number;
  setStep: (n: number) => void;
  serviceSlug: string;
}

export default function BookingPage({ serviceSlug }: BookingPageProps) {
  const { step, setStep } = useBooking();

  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "basic";

  const [bookingData, setBookingData] = useState<BookingData>({
    step1: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    step2: {
      eventType: "",
      eventName: "",
      guestsCount: 0,
      eventDuration: 0,
      eventDescription: "",
    },
    step3: {
      eventStartDate: "",
      eventEndDate: "",
      eventStartTime: "",
      eventEndTime: "",
    },
    step4: {
      partyTheme: "",
      musicPreference: "",
      mustPlaySongs: "",
      partyGames: "",
      entranceStyle: "",
      additionalNotes: "",
    },
    step5: {
      addons: [],
      totalPrice: 0,
    },
    step6: {},
  });

  useEffect(() => {
    console.log("Booking Data Updated:", bookingData);
  }, [bookingData]);

  const handleNext = <K extends keyof BookingData>(
    stepKey: K,
    data: Partial<BookingData[K]>
  ) => {
    setBookingData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        ...data,
      },
    }));

    if (step < 6) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Location
            data={bookingData.step1}
            onNext={(data) => handleNext("step1", data)}
          />
        );
      case 2:
        return (
          <Step2EventDetails
            data={bookingData.step2}
            onNext={(data) => handleNext("step2", data)}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <Step3DateTime
            data={bookingData.step3}
            onNext={(data) => handleNext("step3", data)}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <Step4Questionnaire
            data={bookingData.step4}
            onNext={(data) => handleNext("step4", data)}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <Step5Addons
            data={bookingData.step5}
            onNext={(data) => handleNext("step5", data)}
            onPrevious={handlePrevious}
          />
        );
      case 6:
        return (
          <Step6Review
            allData={bookingData}
            serviceSlug={serviceSlug}
            plan={plan}
            onPrevious={handlePrevious}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="border border-[#dfe1e7] rounded-xl p-5 space-y-6">
      {/* Dynamic Step Title */}
      <div className="flex flex-col gap-2 border-b border-b-[#dfe1e7] pb-4">
        <h1 className="capitalize font-inter font-medium text-2xl leading-5 tracking-[0.01em] text-black">
          Step {step} :{step === 1 && " Location & Contact"}
          {step === 2 && " Event Details"}
          {step === 3 && " Date & Time"}
          {step === 4 && " Questionnaire"}
          {step === 5 && " Add-ons"}
          {step === 6 && " Review"}
        </h1>

        <p className="font-inter font-normal text-base leading-6 tracking-[0.01em] text-[#777980]">
          {step === 1 && "Where is your event?"}
          {step === 2 && "Tell us about your event"}
          {step === 3 && "When is your event?"}
          {step === 4 && "Help us understand your preferences"}
          {step === 5 && "Enhance your booking with add-ons"}
          {step === 6 && "Confirm all your details"}
        </p>
      </div>

      {/* Step Component */}
      {renderStep()}
    </div>
  );
}
