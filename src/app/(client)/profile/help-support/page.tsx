"use client";

import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function HelpSupport() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href="/profile"
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border text-gray-600 hover:text-black mb-6"
      >
        <MdKeyboardArrowLeft size={22} />
        Back To Account
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Help & Support</h1>
        <p className="text-gray-500 mt-1">
          Find answers or get in touch with our support team
        </p>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="space-y-3 pb-5">
        <AccordionItem
          value="item-1"
          className="border rounded-xl bg-white px-4 py-3"
        >
          <AccordionTrigger className="text-left text-[#070707] font-medium text-[16px] hover:no-underline">
            How do I create an account?
          </AccordionTrigger>

          <AccordionContent className="text-[16px] text-[#4A4C56] mt-2">
            Click &apos;Sign Up&apos; in the top right corner and follow the
            registration process. You&apos;ll need to verify your email address
            to complete setup.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="border rounded-xl bg-white px-4 py-3"
        >
          <AccordionTrigger className="text-left text-[#070707] font-medium text-[16px] hover:no-underline">
            What types of services are available?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] text-[#4A4C56] mt-2">
            We offer a variety of services including venue bookings, event
            rentals, entertainment, and more.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="border rounded-xl bg-white px-4 py-3"
        >
          <AccordionTrigger className="text-left text-[#070707] font-medium text-[16px] hover:no-underline">
            How do I book a service?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] text-[#4A4C56] mt-2">
            Browse available services, select your preferred option, and follow
            the booking process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className="border rounded-xl bg-white px-4 py-3"
        >
          <AccordionTrigger className="text-left text-[#070707] font-medium text-[16px] hover:no-underline">
            When am I charged for bookings?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] text-[#4A4C56] mt-2">
            You are charged immediately upon confirming your booking.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="border rounded-xl bg-white px-4 py-3"
        >
          <AccordionTrigger className="text-left text-[#070707] font-medium text-[16px] hover:no-underline">
            What payment methods are accepted?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] text-[#4A4C56] mt-2">
            We accept major credit cards, debit cards, and supported digital
            wallets.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-6"
          className="rounded-xl bg-white px-4 py-3 border"
        >
          <AccordionTrigger className="text-left text-[#070707] font-medium text-[16px] hover:no-underline">
            How do I delete my account?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] text-[#4A4C56]">
            You can request account deletion through your profile settings or by
            contacting support.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
