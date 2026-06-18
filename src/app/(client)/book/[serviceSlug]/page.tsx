"use client";

import { useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";

import Step6Review from "./_components/steps/Step6Review";
import Step5Addons from "./_components/steps/Step5Addons";
import Step4Questionnaire from "./_components/steps/Step4Questionnaire";
import Step3DateTime from "./_components/steps/Step3DateTime";
import Step2EventDetails from "./_components/steps/Step2EventDetails";
import Step1Location from "./_components/steps/Step1Location";

import { useBooking } from "../context/BookingContext";
import { useGetServiceDetailsQuery } from "@/app/api/services/serviceManagementApi";

export default function BookingPage() {
  const { step, setStep, bookingData, setBookingData, setServiceId, setPricingId } = useBooking();

  const params = useParams();
  const serviceSlug = params?.serviceSlug as string;

  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "basic";

  const { data: serviceData } = useGetServiceDetailsQuery(serviceSlug, { skip: !serviceSlug });
  const service = serviceData?.data;

  // Set serviceId and pricingId from the service details
  useEffect(() => {
    if (service?.id) {
      setServiceId(service.id);
    }
    if (service?.pricings?.length) {
      const pricing = service.pricings.find(
        (p) => p.type.toLowerCase() === plan.toLowerCase()
      ) || service.pricings[0];
      setPricingId(Number(pricing.id) || 0);
    }
  }, [service, plan, setServiceId, setPricingId]);

  useEffect(() => {
    console.log("Booking Data Updated:", bookingData);
  }, [bookingData]);

  const handleNext = <K extends keyof typeof bookingData>(
    stepKey: K,
    data: Partial<(typeof bookingData)[K]>,
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
    <div className="border border-[#dfe1e7] rounded-xl p-5 space-y-6 font-[inter]">
      <div className="flex flex-col gap-2 border-b border-b-[#dfe1e7] pb-4">
        <h1 className="capitalize font-inter font-medium text-2xl tracking-[0.01em] text-black">
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

      {renderStep()}
    </div>
  );
}
