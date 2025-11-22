"use client";
import React, { useState } from "react";
import Image from "next/image";
import SignUpModal from "../modal/SignUpModal";
import LogInModal from "../modal/LogInModal";
import ForgotPasswordModal from "../modal/ForgotPasswordModal";

export default function BecomeProviderBanner() {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const openSignupModal = () => {
    setOpenSignup(true);
    setOpenLogin(false);
  };

  const openLoginModal = () => {
    setOpenLogin(true);
    setOpenSignup(false);
  };
  const openForgotPasswordModal = () => {
    setOpenForgotPassword(true);
    setOpenLogin(false);
  };
  return (
    <div className="relative w-full h-[50vh]">
      {/* Background Image */}
      <Image
        src="/images/BecomeProviderBanner.png"
        alt="banner"
        fill
        className="object-cover"
      />

      {/* Content Section */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl lg:text-6xl font-bold text-white">
          Become a{" "}
          <span className="bg-linear-to-r from-[#FFAC47] to-[#FF2A24]  bg-clip-text text-transparent italic">
            Provider
          </span>
        </h2>

        <p className="text-white mt-4 max-w-lg">
          Simple steps to book trusted event professionals from DJs and caterers
          to decorators and venues all in one place.
        </p>

        <button
          onClick={openSignupModal}
          className="mt-6 bg-linear-to-r from-[#FFAC47] to-[#FF2A24] px-6 py-3 rounded-md font-semibold"
        >
          Become a Provider
        </button>
      </div>
      {/* Modals */}
      <SignUpModal
        isOpen={openSignup}
        onClose={() => setOpenSignup(false)}
        openLogin={openLoginModal}
      />

      <LogInModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        openSignup={openSignupModal}
      />

      <ForgotPasswordModal
        isOpen={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
        openSignup={openSignupModal}
      />
    </div>
  );
}
