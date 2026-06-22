"use client";

import { parseCookies } from "nookies";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const cookies = parseCookies();
  const role = cookies["jr_auth_role"] || null;

  const getRedirectLink = () => {
    if (role === "user") return "/client-dashboard";
    if (role === "admin") return "/admin/dashboard";
    if (role === "provider") return "/provider-dashboard";
    return "/";
  };

  const getBackText = () => {
    if (!role) return "Home";
    if (role === "user") return "Client Dashboard";
    if (role === "admin") return "Admin Dashboard";
    if (role === "provider") return "Provider Dashboard";
    return "Home";
  };

  const getSuggestionText = () => {
    if (!role) return "Home page";
    if (role === "user") return "Client Dashboard";
    if (role === "admin") return "Admin Dashboard";
    if (role === "provider") return "Provider Dashboard";
    return "Home page";
  };

  return (
    <div>
      <div className="containers flex flex-col md:flex-row justify-center items-center h-screen gap-10 pt-8">
        {/* Left Content */}
        <div className="space-y-4 max-w-lg order-1 md:order-0">
          <h3 className="text-black font-medium text-[48px] leading-[120%] font-poppins">
            Oops...
          </h3>

          <p className="text-black font-normal text-[24px] leading-[150%] font-poppins">
            Page Not Found
          </p>

          <p className="text-[#4B4B4B] font-normal text-[18px] leading-[150%] font-poppins">
            This page doesn't exist or was removed! <br /> We suggest you go
            back to the {getSuggestionText()}.
          </p>
          <Link href={getRedirectLink()}>
            <button className="text-white font-normal text-[16px] leading-[150%] font-poppins bg-[#FF4D4F] px-4 py-2.5 rounded-lg mt-[54px] flex items-center gap-1.5 cursor-pointer">
              <ArrowLeftIcon />
              Back to {getBackText()}
            </button>
          </Link>
        </div>

        {/* Image */}
        <div>
          <Image
            src="/images/errorPage.png"
            alt="error"
            width={431}
            height={500}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
