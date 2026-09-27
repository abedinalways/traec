"use client";

import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

import LeftIcon from "@/components/icons/LeftIcon";
import { Accordion02, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion02";


export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface HelpSupportProps {
  backUrl: string; // redirect url for back button
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export default function HelpSupport({
  backUrl,
  title = "Help & Support",
  subtitle = "Find answers or get in touch with our support team",
  faqs,
}: HelpSupportProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 font-[inter]">
      {/* Back Button */}
      <Link
        href={"/client-profile"}
        className="flex items-center max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border  text-gray-black-400 mb-4 text-[16px]"
      >
        <LeftIcon />
        Back To Account
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1 text-[16px]">{subtitle}</p>
      </div>

      {/* FAQ Accordion */}
      <Accordion02 type="single" collapsible className="space-y-3 pb-5">
        {faqs.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border rounded-xl bg-white px-4 py-3"
          >
            <AccordionTrigger className="text-left text-[#070707] cursor-pointer font-medium text-[16px] hover:no-underline">
              {item.question}
            </AccordionTrigger>

            <AccordionContent className="text-[16px] text-[#4A4C56] mt-2">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion02>
    </div>
  );
}
