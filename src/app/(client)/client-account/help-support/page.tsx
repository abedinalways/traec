"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { MdKeyboardArrowLeft } from "react-icons/md";

export default function HelpSupportPage() {
  const items = [
    {
      title: "How do I create an account?",
      content: `Click 'Sign Up' in the top right corner and follow the registration process. You'll need to verify your email address to complete setup.`,
    },
    {
      title: "What types of services are available?",
      content:
        "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. To initiate a return, please contact our customer service team or use the return portal in your account dashboard.",
    },
    {
      title: "How do I book a service?",
      content:
        "Our customer support team is available 24/7. You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567. For faster service, please have your order number ready when contacting us.",
    },
    {
      title: "What types of services are available?",
      content:
        "Our customer support team is available 24/7. You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567. For faster service, please have your order number ready when contacting us.",
    },
    {
      title: "When am I charged for bookings?",
      content:
        "Our customer support team is available 24/7. You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567. For faster service, please have your order number ready when contacting us.",
    },
    {
      title: "How do I delete my account?",
      content:
        "Our customer support team is available 24/7. You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567. For faster service, please have your order number ready when contacting us.",
    },
  ];
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={"/profile"}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border  text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} className="pt-1" />
        Back To Account
      </Link>

      <div className="my-5">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900">Help & Support</h1>
        <p className="text-gray-500">
          Find answers or get in touch with our support team
        </p>
      </div>
      {items.map((item, index) => (
        <Card key={index} className="p-4 md:p-6  shadow-none mb-5">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value={`item-${index + 1}`} className=" ">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  data-slot="accordion-trigger"
                  className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0"
                >
                  {item.title}
                  <PlusIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </div>
  );
}
