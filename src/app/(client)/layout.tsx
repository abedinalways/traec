/** @format */

import Footer from "@/components/reusable/Footer";
import Navbar from "@/components/reusable/Navbar";
import React from "react";
import AuthModalRenderer from "./_components/modal/AuthModal/AuthModalRenderer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <AuthModalRenderer />
      <Footer className="mt-auto" />
    </div>
  );
}
