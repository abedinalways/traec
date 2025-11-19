/** @format */

import Navbar from "@/components/reusable/Navbar";
import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow'>{children}</div>
      {/* <Footer /> */}
    </div>
  );
}
