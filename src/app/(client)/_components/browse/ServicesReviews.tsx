import Image from "next/image";
import { ChevronUp, ChevronDown, MapPinCheckInside } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import { ServiceReview } from "@/app/api/services/serviceManagementApi";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  return `${Math.floor(months / 12)} year${Math.floor(months / 12) === 1 ? "" : "s"} ago`;
}

export default function ServicesReviews({
  reviews,
  providerName,
  providerImage,
}: {
  reviews?: ServiceReview[];
  providerName?: string;
  providerImage?: string;
}) {
  const list = reviews ?? [];

  return (
    <div>
      {list.length === 0 ? (
        <div className="w-full bg-white rounded-xl border p-6 md:p-8 my-5">
          <p className="text-gray-500">No reviews yet.</p>
        </div>
      ) : (
        list.map((review) => (
          <div
            key={review.id}
            className="w-full bg-white rounded-xl border p-6 md:p-8 my-5"
          >
            <div className="flex items-center gap-2 mb-3 border-b border-[#DFE1E7] pb-3">
              <Image
                src={providerImage || "/images/browser/img07.png"}
                alt="provider"
                width={32}
                height={32}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <span className="text-sm font-medium text-[#1D1F2C]">
                  {review.reviewer_name}
                </span>
                <div className="flex items-center gap-2 text-[#777980]">
                  <span className="text-sm">{timeAgo(review.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="mb-3 border-b border-[#DFE1E7] pb-3">
              <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#4A4C56]">{review.review}</p>
                </div>
              </div>
            </div>

            {review.has_replied && review.reply && (
              <div className="w-full flex flex-col items-center">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem
                    value={`review-${review.id}`}
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
                            src={providerImage || "/images/browser/img07.png"}
                            alt="provider"
                            width={32}
                            height={32}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-sm font-medium text-[#1D1F2C]">
                            Provider's Response
                          </span>
                        </div>

                        <span className="flex items-center">
                          <ChevronDown className="size-5 text-gray-500 group-data-[state=open]:hidden" />
                          <ChevronUp className="size-5 text-gray-500 hidden group-data-[state=open]:block" />
                        </span>
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>

                    <AccordionContent className="px-5 pt-1 text-sm text-gray-600 leading-relaxed">
                      <p className="text-[#4A4C56]">{review.reply}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
