"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export interface TimelineStep {
  label: string;
  time: string;
  status: "done" | "pending";
}

export interface RightCardProps {
  eventImage: string;
  eventTitle: string;
  vendorName: string;
  vendorHref?: string;
  orderStatus: string;

  orderNumber: string;
  completedDate: string;
  amountPaid: string;

  timeline: TimelineStep[];

  isEventOngoing: boolean;
  clientCompletion: "pending" | "done";
  providerCompletion: "pending" | "done";

  onComplete?: () => void;
}

export default function RightCard({
  eventImage,
  eventTitle,
  vendorName,
  vendorHref = "#",
  orderStatus,
  orderNumber,
  completedDate,
  amountPaid,
  timeline,
  isEventOngoing,
  clientCompletion,
  providerCompletion,
  onComplete,
}: RightCardProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full space-y-6">

      {/* ORDER DETAILS CARD */}
      <div className="border rounded-xl p-5 bg-white shadow-sm">
        {/* Top row */}
        <h2 className="font-semibold text-lg text-gray-900 mb-4">
          Order Details
        </h2>

        <div className="flex items-start gap-4">
          <Image
            src={eventImage}
            alt={eventTitle}
            width={70}
            height={70}
            className="rounded-lg object-cover"
          />

          <div>
            <p className="font-medium text-gray-900">{eventTitle}</p>

            <a
              href={vendorHref}
              className="text-sm text-blue-600 hover:underline"
            >
              {vendorName}
            </a>

            <div className="mt-2 inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
              {orderStatus}
            </div>
          </div>
        </div>

        {/* ORDER INFO */}
        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Order number</span>
            <span className="font-medium">{orderNumber}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700">
            <span>Completed Date</span>
            <span className="font-medium">{completedDate}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700">
            <span>Amount paid</span>
            <span className="font-semibold">{amountPaid}</span>
          </div>
        </div>

        {/* TRACK ORDER */}
        <div className="mt-6">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex justify-between items-center text-gray-900 font-medium text-sm"
          >
            Track Order
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {open && (
            <div className="mt-4 space-y-4">
              {timeline.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  {/* STATUS DOT + LINE */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        step.status === "done"
                          ? "bg-green-500 border-green-500"
                          : "border-gray-400"
                      }`}
                    />

                    {index !== timeline.length - 1 && (
                      <div className="w-[2px] h-6 bg-gray-300" />
                    )}
                  </div>

                  {/* TEXT */}
                  <div className="flex justify-between w-full">
                    <p className="text-sm text-gray-700">{step.label}</p>
                    <p className="text-xs text-gray-500">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EVENT IN PROGRESS */}
      <div className="border rounded-xl p-6 bg-white shadow-sm text-center">
        <h2 className="font-semibold text-gray-900 text-lg mb-2">
          Event in Progress
        </h2>

        {/* Progress Icon */}
        <div className="flex justify-center my-3">
          <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>

        <h3 className="font-medium text-gray-900 text-sm">Event Ongoing</h3>

        <p className="text-sm text-gray-600 mt-1">
          Your event is currently in progress. Enjoy!
        </p>

        {/* COMPLETION */}
        <div className="mt-5 space-y-2 text-left">
          <div className="flex justify-between text-sm">
            <span>Client Completion</span>
            <span className="text-gray-500">{clientCompletion}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Provider Completion</span>
            <span className="text-gray-500">{providerCompletion}</span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={onComplete}
          className="mt-5 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Mark as Completed
        </button>
      </div>
    </div>
  );
}
