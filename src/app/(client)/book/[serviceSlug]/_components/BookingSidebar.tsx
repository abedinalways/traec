"use client";

import { CircleCheckBig } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Location & Contact",
    desc: "Where is your event?",
  },
  {
    id: 2,
    title: "Event Details",
    desc: "Tell us about your event",
  },
  {
    id: 3,
    title: "Date & Time",
    desc: "When the event is?",
  },
  {
    id: 4,
    title: "Questionnaire",
    desc: "What do you prefer?",
  },
  {
    id: 5,
    title: "Add-ons",
    desc: "Enhance your booking",
  },
  {
    id: 6,
    title: "Review",
    desc: "Confirm your booking",
  },
];

const BookingSidebar = ({ step: currentStep }: { step: number }) => {
  return (
    <div className="space-y-5 border border-[#dfe1e7] rounded-xl p-5 pr-14 h-fit">
      <h1 className="capitalize font-inter font-medium text-base leading-6 tracking-[0.01em] text-black">
        Booking Progress
      </h1>

      <div className="flex flex-col gap-5">
        {steps.map((item) => {
          const isCompleted = item.id < currentStep;
          const isActive = item.id === currentStep;
          const isUpcoming = item.id > currentStep;

          const titleColor = isUpcoming ? "text-[#777980]" : "text-black";

          const descColor = isUpcoming ? "text-[#9ca0aa]" : "text-[#777980]";

          return (
            <div key={item.id} className="flex items-center gap-3">
              {/* Circle state */}
              {isCompleted && (
                <div className="s_gra_bg size-9 rounded-full flex items-center justify-center">
                  <CircleCheckBig className="text-white w-4 h-4" />
                </div>
              )}

              {isActive && (
                <div className="s_gra_bg size-9 rounded-full p-[2px]">
                  <div className="bg-white rounded-full flex items-center justify-center size-full">
                    <span className="font-inter font-medium text-sm leading-6 s_gra_text tracking-[0.01em]">
                      {item.id}
                    </span>
                  </div>
                </div>
              )}

              {isUpcoming && (
                <div className="size-9 rounded-full bg-[#f5f6f8] flex items-center justify-center">
                  <span className="font-inter font-medium text-sm leading-6 text-[#4a4c56] tracking-[0.01em]">
                    {item.id}
                  </span>
                </div>
              )}

              {/* Text */}
              <div>
                <h2
                  className={`capitalize font-inter font-medium text-base leading-6 tracking-[0.01em] ${titleColor}`}
                >
                  {item.title}
                </h2>
                <p
                  className={`font-inter font-normal text-base leading-6 tracking-[0.01em] ${descColor}`}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingSidebar;
