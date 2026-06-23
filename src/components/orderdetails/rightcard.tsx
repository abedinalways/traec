"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
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
  rawStatus?: string;
  onComplete?: () => void;
  isUpdating?: boolean;
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
  rawStatus,
  onComplete,
  isUpdating,
}: RightCardProps) {
  const [open, setOpen] = useState(true);

  // Use the real API status to determine if completed
  const isCompleted = rawStatus === "completed";

  const fullTimeline = timeline.map((step) => {
    if (isCompleted) return { ...step, status: "done" as const };
    return step;
  });

  return (
    <div className="w-full space-y-6">
      <div className="border rounded-xl p-5 bg-white shadow-sm">
        <h2 className="font-semibold text-lg text-gray-900 mb-4">
          Order Details
        </h2>

        <div className="flex items-start gap-4">
          <Image
            src="/images/browser/img12.png"
            alt={eventTitle}
            width={70}
            height={70}
            className="rounded-lg object-cover"
          />

          <div>
            <p className="font-medium text-gray-900">{eventTitle}</p>

            <span className="flex items-center gap-1">
              <h4>by</h4>
              <a
                href={vendorHref}
                className="text-sm text-blue-600 hover:underline"
              >
                {vendorName}
              </a>
            </span>

            <div
              className={`mt-2 inline-block text-xs px-3 py-1 rounded-full ${
                isCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {isCompleted ? "Completed" : orderStatus}
            </div>
          </div>
        </div>

        {/* ORDER INFO */}
        <div className="mt-6 border-t pt-4 space-y-2 text-[16px]">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Order number</span>
            <span className="font-medium text-[#1D1F2C]">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Completed Date</span>
            <span className="font-medium text-[#1D1F2C]">{completedDate}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Amount paid</span>
            <span className="font-semibold text-[#1D1F2C]">{amountPaid}</span>
          </div>
        </div>

        {/* TRACK ORDER */}
        <div className="mt-6">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex justify-between items-center text-gray-900 font-medium text-sm cursor-pointer"
          >
            Track Order
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {open && (
            <div className="mt-5">
              {fullTimeline.map((step, index) => {
                const isLast = index === fullTimeline.length - 1;
                const isDone = step.status === "done";
                const nextIsDone =
                  !isLast && fullTimeline[index + 1].status === "done";

                return (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className="flex flex-col items-center"
                      style={{ width: 26, flexShrink: 0 }}
                    >
                      {isDone ? (
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            backgroundColor: "#22C55E",
                            border: "3px solid #22C55E",
                            outline: "3px solid rgba(34,197,94,0.22)",
                            outlineOffset: "1px",
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            border: "3px solid #9CA3AF",
                            outline: "3px solid rgba(156,163,175,0.18)",
                            outlineOffset: "1px",
                            flexShrink: 0,
                          }}
                        />
                      )}

                      {!isLast && (
                        <div
                          style={{
                            width: 2.5,
                            minHeight: 38,
                            flex: 1,
                            backgroundColor: nextIsDone ? "#22C55E" : "#D1D5DB",
                            borderRadius: 99,
                            marginTop: 2,
                          }}
                        />
                      )}
                    </div>

                    <div
                      className="flex justify-between w-full"
                      style={{ paddingBottom: isLast ? 0 : 38, marginTop: 3 }}
                    >
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: isDone ? 400 : 700,
                          color: isDone ? "#6B7280" : "#1D1F2C",
                          lineHeight: "20px",
                        }}
                      >
                        {step.label}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#9CA3AF",
                          whiteSpace: "nowrap",
                          marginLeft: 8,
                        }}
                      >
                        {step.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* COMPLETED SECTION: Download + Order Again + Review */}
        {isCompleted && (
          <>
            <button className="mt-6 w-full flex items-center justify-center gap-2 border cursor-pointer px-4 py-2 rounded-xl text-gray-700">
              <Download size={16} /> Download Receipt
            </button>
            <div className="mt-4 flex gap-3">
              <button className="border px-4 py-2 rounded-lg text-sm">
                Order Again
              </button>
              <button className="border px-4 py-2 rounded-lg text-sm">
                Share Review
              </button>
            </div>
          </>
        )}
      </div>

      {/* MARK AS COMPLETED BUTTON (for provider) */}
      {!isCompleted && onComplete && (
        <div className="border rounded-xl p-6 bg-white shadow-sm text-center">
          <h2 className="font-semibold text-gray-900 text-[16px] mb-2">
            Order Management
          </h2>

          <p className="text-sm text-gray-600 mt-1 mb-5">
            Mark this order as completed when the service is done.
          </p>

          <button
            onClick={onComplete}
            disabled={isUpdating}
            className="mt-5 w-full bg-black text-white cursor-pointer rounded-[12px] hover:opacity-90 transition py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Updating..." : "Mark as Completed"}
          </button>
        </div>
      )}
    </div>
  );
}