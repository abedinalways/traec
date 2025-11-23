import Navbar from "@/components/reusable/Navbar";
import Footer from "@/components/reusable/Footer";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
