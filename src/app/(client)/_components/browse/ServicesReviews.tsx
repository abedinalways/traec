import Image from "next/image";
import { ChevronUp, ChevronDown, MapPinCheckInside } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ServicesReviews() {
  return (
    <div>
      <div className="w-full bg-white rounded-xl border p-6 md:p-8 my-5">
        <div className="flex items-center gap-2 mb-3 border-b border-[#DFE1E7] pb-3">
          <Image
            src="/images/browser/img07.png"
            alt="provider1"
            width={32}
            height={32}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <span className="text-sm font-medium text-[#1D1F2C]">
              Marvin McKinney
            </span>
            <div
              className="
                flex items-center gap-2 text-[#777980]"
            >
              <MapPinCheckInside size={17} />
              <span className="text-sm">Los Angeles, CA</span>
            </div>
          </div>
        </div>

        <div className=" mb-3 border-b border-[#DFE1E7] pb-3">
          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-2">
            {" "}
            <div>
              <div className="flex items-center gap-3">
                {" "}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < 6 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[#777980]">2 months ago</p>
              </div>
              <p className="text-[#4A4C56]">
                Absolutely perfect for my daughter&#39;s 6th birthday! The
                castle was beautiful and the kids loved it. Professional setup
                and pickup. Great communication from Party Pro Rentals. The
                bounce house was clean and exactly as pictured. Highly
                recommend!
              </p>
            </div>
            <Image
              src="/images/browser/img07.png"
              alt="provider1"
              width={200}
              height={200}
              className="w-58 h-32 rounded-md mr-2"
            />
          </div>
        </div>
        {/* Accordion */}
        <div className="w-full flex flex-col items-center ">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full space-y-4"
          >
            <AccordionItem
              value="item-1"
              className="border-none data-[state=open]:border-none"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger
                  className="group flex w-full items-center justify-between rounded-xl px-5 py-4 
          text-left text-base font-bold transition-all focus-visible:outline-none 
          data-[state=open]:text-[#070707] cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Image
                      src="/images/browser/img07.png"
                      alt="provider1"
                      width={32}
                      height={32}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <div>
                      <span className="text-sm font-medium text-[#1D1F2C]">
                        Provider&#39;s Response
                      </span>
                    </div>
                  </div>

                  <span className="flex items-center">
                    <ChevronDown className="size-5 text-gray-500 group-data-[state=open]:hidden" />
                    <ChevronUp className="size-5 text-gray-500 hidden group-data-[state=open]:block" />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>

              <AccordionContent className="px-5 pt-1 text-sm text-gray-600 leading-relaxed">
                <p className="text-[#4A4C56]">
                  Wow, thank you for such an incredible review! I&#39;m thrilled
                  to hear the Performance exceeded your expectations and
                  perfectly captured your brand vibe. Thank You.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="w-full bg-white rounded-xl border p-6 md:p-8 my-5">
        <div className="flex items-center gap-2 mb-3 border-b border-[#DFE1E7] pb-3">
          <Image
            src="/images/browser/img07.png"
            alt="provider1"
            width={32}
            height={32}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <span className="text-sm font-medium text-[#1D1F2C]">
              Marvin McKinney
            </span>
            <div
              className="
                flex items-center gap-2 text-[#777980]"
            >
              <MapPinCheckInside size={17} />{" "}
              <span className="text-sm">Los Angeles, CA</span>
            </div>
          </div>
        </div>

        <div className=" mb-3 border-b border-[#DFE1E7] pb-3">
          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-2">
            {" "}
            <div>
              <div className="flex items-center gap-3">
                {" "}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < 6 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[#777980]">2 months ago</p>
              </div>
              <p className="text-[#4A4C56]">
                Absolutely perfect for my daughter&#39;s 6th birthday! The
                castle was beautiful and the kids loved it. Professional setup
                and pickup. Great communication from Party Pro Rentals. The
                bounce house was clean and exactly as pictured. Highly
                recommend!
              </p>
            </div>
            <Image
              src="/images/browser/img07.png"
              alt="provider1"
              width={200}
              height={200}
              className="w-58 h-32 rounded-md mr-2"
            />
          </div>
        </div>
        {/* Accordion */}
        <div className="w-full flex flex-col items-center ">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="border-none data-[state=open]:border-none"
            >
              <AccordionPrimitive.Trigger
                className="group flex w-full items-center justify-between rounded-xl px-5 py-4 
        text-left text-base font-bold transition-all focus-visible:outline-none 
        data-[state=open]:text-[#070707] cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src="/images/browser/img07.png"
                    alt="provider1"
                    width={32}
                    height={32}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-sm font-medium text-[#1D1F2C]">
                    Provider&apos;s Response
                  </span>
                </div>

                <span className="flex items-center">
                  <ChevronDown className="size-5 text-gray-500 group-data-[state=open]:hidden" />
                  <ChevronUp className="size-5 text-gray-500 hidden group-data-[state=open]:block" />
                </span>
              </AccordionPrimitive.Trigger>

              <AccordionContent className="px-5 pt-1 text-sm text-gray-600 leading-relaxed">
                <p className="text-[#4A4C56]">
                  Wow, thank you for such an incredible review! I&apos;m
                  thrilled to hear the Performance exceeded your expectations
                  and perfectly captured your brand vibe. Thank You.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="p-2 border border-[#DFE1E7] rounded-md cursor-pointer">
          View More Reviews
        </button>
      </div>
    </div>
  );
}
