"use client";

import { FC, ReactNode, use } from "react";
import ServiceBreadcrumb from "./_components/ServiceBreadcrumb";
import BookingSidebar from "./_components/BookingSidebar";
import BookingProvider, { useBooking } from "../context/BookingContext";

interface BookingLayoutProps<T> {
  children: ReactNode;
  params: Promise<T>;
}

const BookingLayout: FC<BookingLayoutProps<{ serviceSlug: string }>> = ({
  children,
  params,
}) => {
  const resolvedParams = use(params);
  const { serviceSlug } = resolvedParams;

  return (
    <BookingProvider>
      <Wrapper serviceSlug={serviceSlug}>{children}</Wrapper>
    </BookingProvider>
  );
};

function Wrapper({
  children,
  serviceSlug,
}: {
  children: ReactNode;
  serviceSlug: string;
}) {
  const { step } = useBooking();

  const serviceName =
    serviceSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "";

  return (
    <div className="my-10 px-2 md:px-4">
      <div className="custom-container mx-auto">
        <ServiceBreadcrumb step={step} />
        {/* Header */}
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="font-inter text-2xl font-medium">Book Your Service</h3>

          <p className="font-inter text-base text-[#4a4c56] leading-[160%]">
            Princess Castle Bounce House by Party Pro Rentals
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 ">
          <div className="w-full lg:w-[30%]">
            <BookingSidebar step={step} />
          </div>
          <main className="w-full lg:w-[70%]">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default BookingLayout;
