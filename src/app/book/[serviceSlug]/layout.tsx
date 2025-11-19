import React, { FC, ReactNode } from "react";
import ServiceBreadcrumb from "./_components/Breadcrumb";
import BookingSidebar from "./_components/BookingSidebar";

interface BookingLayoutProps {
  children: ReactNode;
}
const BookingLayout: FC<BookingLayoutProps> = ({ children }) => {
  return (
    <div className="custom-container bg-blue-500 py-5.5">
      {/* Breadcrumb */}
      <ServiceBreadcrumb />

      {/* Header */}
      <h1 className="font-inter text-2xl font-medium mb-4">
        Book Your Service
      </h1>

      <div className="flex gap-8">
        {/* Left Progress Bar */}

        <BookingSidebar />

        {/* Right: Step content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default BookingLayout;
