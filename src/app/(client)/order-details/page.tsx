"use client";

import MainOrder from "@/components/orderdetails/mainorder";
import QuickResponse from "@/components/orderdetails/quickreponse";
import RightCard from "@/components/orderdetails/rightcard";

export default function OrderdetailsPage() {
  return (
    <main className="custom-container min-h-screen bg-white px-4 sm:px-6 md:px-10 lg:px-16 py-8 overflow-x-hidden">

      {/* HEADER BREADCRUMB */}
      <p className="text-sm text-gray-500 mb-6">
        My orders <span className="text-gray-400">›</span> Order Details
      </p>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE – MAIN ORDER DETAILS */}
        <div className="lg:col-span-2 space-y-8">
          <MainOrder />
        </div>

        {/* RIGHT SIDE – STATUS CARD */}
        <div className="lg:col-span-1 pt-11">
          <RightCard
            eventImage="/images/event1.png"
            eventTitle="Sofia’s 7th Birthday Princess Party"
            vendorName="Part Pro Rentals"
            orderStatus="Progress"
            orderNumber="#AB48A98G"
            completedDate="December 20"
            amountPaid="$545"
            timeline={[
              { label: "Order placed", time: "Dec 15, 04:30 PM", status: "done" },
              { label: "In Progress", time: "Dec 15, 05:50 PM", status: "done" },
              { label: "Complete order", time: "Dec 15, 05:50 PM", status: "pending" },
            ]}
          />
        </div>

      </div>

      {/* QUICK RESPONSE (Perfectly aligned with MainOrder width) */}
      <div className="custom-container  mt-10 lg:col-span-2 max-w-3xl max-w-full">
        <div className="max-w-3xl w-full"> 
          {/*  same width as the MainOrder column */}
          <QuickResponse
            onSend={(message) => {
              console.log("Sent message:", message);
            }}
          />
        </div>
      </div>

    </main>
  );
}
