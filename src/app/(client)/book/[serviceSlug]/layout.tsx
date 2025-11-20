import { FC, ReactNode } from "react";
import ServiceBreadcrumb from "./_components/ServiceBreadcrumb";
import BookingSidebar from "./_components/BookingSidebar";

interface BookingLayoutProps<T> {
  children: ReactNode;
  params: T;
}
const BookingLayout: FC<BookingLayoutProps<{ serviceSlug: string }>> = ({
  children,
  params,
}) => {
  const serviceName =
    params?.serviceSlug
      ?.split("-")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ") || "";

  return (
    <div className="custom-container py-5.5">
      {/* Breadcrumb */}
      <ServiceBreadcrumb />

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-inter text-2xl font-medium mb-4">
          Book Your Service
        </h1>

        <p className="font-inter font-normal text-base leading-6 tracking-[0.01em] text-[#dfe1e7]">
          {serviceName}
        </p>
      </div>

      <div className="flex gap-6 mt-6">
        {/* Left Progress Bar */}
        <BookingSidebar />

        {/* Right: Step content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default BookingLayout;
