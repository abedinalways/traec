"use client";

import { Plus, Minus } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

const items = [
  {
    title: "Do I need an account to use the platform?",
    content:
      "Yes. To book a service or list your business, you need to create a free account. Buyers and service providers have separate profiles to keep things simple.",
  },
  {
    title: "How do payments work?",
    content:
      "Payments are securely processed through trusted payment partners.",
  },
  {
    title: "Can I cancel or reschedule my booking?",
    content:
      "You may cancel or reschedule before the provider confirms the booking.",
  },
  {
    title: "Is this platform available worldwide?",
    content:
      "The platform is available in most regions depending on local support.",
  },
  {
    title: "Is this platform available worldwide?",
    content:
      "The platform is available in most regions depending on local support.",
  },
  {
    title: "Is this platform available worldwide?",
    content:
      "The platform is available in most regions depending on local support.",
  },
];

const Accordion04 = () => {
  return (
    <section className="w-full flex flex-col items-center font-[inter]">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full space-y-4"
      >
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className={`rounded-xl bg-white 
              border transition-all
              ${
                index === 0
                  ? "data-[state=open]:border-gray-200 border-gray-200"
                  : "border-gray-200 data-[state=open]:border-gray-300"
              }
            `}
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger
                className="group flex w-full items-center justify-between rounded-xl px-5 py-4 
    text-left text-base font-bold transition-all focus-visible:outline-none 
    data-[state=open]:text-[#070707] cursor-pointer "
              >
                {item.title}

                <span className="flex items-center">
                  <Plus className="size-5 text-gray-500 group-data-[state=open]:hidden" />
                  <Minus className="size-5 text-gray-500 hidden group-data-[state=open]:block" />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionContent className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Accordion04;
