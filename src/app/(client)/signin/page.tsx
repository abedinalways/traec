"use client";
import React, { useState } from "react";
import SignUpModal from "../_components/modal/SignUpModal";
import LogInModal from "../_components/modal/LogInModal";
import ForgotPasswordModal from "../_components/modal/ForgotPasswordModal";
import OTPModal from "../_components/modal/OTPModal";
import SetNewPasswordModal from "../_components/modal/SetNewPasswordModal";
import PasswordSetSuccessfullyModal from "../_components/modal/PasswordSetSuccessfullyModal";

export default function SiginPage() {
  const [openLogin, setOpenLogin] = useState(true);
  const [openSignup, setOpenSignup] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [openSetNewPassword, setOpenSetNewPassword] = useState(false);
  const [openPasswordSetSuccessfully, setOpenPasswordSetSuccessfully] =
    useState(false);

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
  const openOTPModal = () => {
    setOpenOTP(true);
    setOpenForgotPassword(false);
  };
  const openSetNewPasswordModal = () => {
    setOpenSetNewPassword(true);
    setOpenOTP(false);
  };

  const openPasswordSetSuccessfullydModal = () => {
    setOpenPasswordSetSuccessfully(true);
    setOpenOTP(false);
  };
  return (
    <div>
      {" "}
      {/* Modals */}
      <LogInModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        openSignup={openSignupModal}
        openForgotPassword={openForgotPasswordModal}
      />
      <SignUpModal
        isOpen={openSignup}
        onClose={() => setOpenSignup(false)}
        openLogin={openLoginModal}
      />
      <ForgotPasswordModal
        isOpen={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
        openOTP={openOTPModal}
      />
      <OTPModal
        isOpen={openOTP}
        onClose={() => setOpenOTP(false)}
        openSetNewPassword={openSetNewPasswordModal}
      />
      <SetNewPasswordModal
        isOpen={openSetNewPassword}
        onClose={() => setOpenSetNewPassword(false)}
        openPasswordSetSuccessfully={openPasswordSetSuccessfullydModal}
      />
      <PasswordSetSuccessfullyModal
        isOpen={openPasswordSetSuccessfully}
        onClose={() => setOpenPasswordSetSuccessfully(false)}
      />
    </div>
  );
}
