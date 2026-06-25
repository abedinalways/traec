"use client";

import { Plus, Minus } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

// Dynamic FAQ interface type declaration
interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

interface Accordion04Props {
  faqs?: FAQItem[];
}

const Accordion04 = ({ faqs = [] }: Accordion04Props) => {
  // Jodi kono FAQ na thake, tahole component render hobe na
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full flex flex-col items-center font-[inter] mt-5">
      <div className="w-full mb-4 align-element">
        <h3 className="text-2xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h3>
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue={`item-${faqs[0].id}`}
        className="w-full space-y-4"
      >
        {faqs.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={`item-${item.id}`}
            className={`rounded-xl bg-white border transition-all ${
              index === 0
                ? "data-[state=open]:border-gray-200 border-gray-200"
                : "border-gray-200 data-[state=open]:border-gray-300"
            }`}
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger
                className="group flex w-full items-center justify-between rounded-xl px-5 py-4 
                text-left text-base font-bold transition-all focus-visible:outline-none 
                data-[state=open]:text-[#070707] cursor-pointer"
              >
                {item.question}

                <span className="flex items-center">
                  <Plus className="size-5 text-gray-500 group-data-[state=open]:hidden" />
                  <Minus className="size-5 text-gray-500 hidden group-data-[state=open]:block" />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionContent className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Accordion04;
