'use client';

import { Plus, Minus } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion';

const items = [
  {
    title: 'Do I need an account to use the platform?',
    content:
      'Yes. To book a service or list your business, you must create a free account.',
  },
  {
    title: 'How do payments work?',
    content:
      'Payments are securely processed through trusted payment partners.',
  },
  {
    title: 'Can I cancel or reschedule my booking?',
    content:
      'You may cancel or reschedule before the provider confirms the booking.',
  },
  {
    title: 'Is this platform available worldwide?',
    content:
      'The platform is available in most regions depending on local support.',
  },
];

const Accordion04 = () => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="md:w-[875px] space-y-3 mx-auto py-10"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className="rounded-xl border border-red-100 data-[state=open]:bg-red-50/50 transition-all bg-white"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className="flex w-full items-center justify-between px-4 py-4 text-left text-base font-medium rounded-xl
                transition-all focus-visible:outline-none focus-visible:ring-2
                data-[state=open]:text-red-600"
            >
              {item.title}

              {/* ✔ ICON: changes using data-state */}
              <span className="flex items-center justify-center">
                <Plus className="size-5 text-gray-500 data-[state=open]:hidden transition-all" />
                <Minus className="size-5 text-red-500 hidden data-[state=open]:block transition-all" />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionContent className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Accordion04;
