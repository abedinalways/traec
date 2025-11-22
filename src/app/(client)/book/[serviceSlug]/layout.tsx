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
    <div className="custom-container py-5.5">
      {/* Breadcrumb */}
      <ServiceBreadcrumb step={step} />

      {/* Header */}
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="font-inter text-2xl font-medium">Book Your Service</h1>

        <p className="font-inter text-base text-[#dfe1e7]">{serviceName}</p>
      </div>

      <div className="flex gap-6 mt-6">
        {/* Left Progress Bar */}
        <BookingSidebar step={step} />

        {/* Right: Step content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default BookingLayout;
