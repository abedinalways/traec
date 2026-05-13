"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import { toast } from "sonner";
import {
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
} from "@/app/api/auth/authapi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  openSetNewPassword: () => void;
}

interface OTPData {
  otp: string[];
}

const getErrorMessage = (err: unknown) => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (err as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return "OTP verification failed. Please try again.";
};

export default function OTPModal({
  isOpen,
  onClose,
  email,
  openSetNewPassword,
}: Props) {
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OTPData>({
    defaultValues: {
      otp: ["", "", "", ""],
    },
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otp = watch("otp") || [];

  const [verifyOtp, { isLoading }] = useVerifyForgotPasswordOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useForgotPasswordMutation();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const digit = value.slice(0, 1);
    const newOtp = [...otp];

    newOtp[index] = digit;
    setValue("otp", newOtp, { shouldValidate: true });

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pastedData) return;

    const pastedArray = pastedData.split("");
    const newOtp = ["", "", "", ""];

    pastedArray.forEach((char, index) => {
      if (index < 4) {
        newOtp[index] = char;
      }
    });

    setValue("otp", newOtp, { shouldValidate: true });

    const nextIndex = pastedArray.length >= 4 ? 3 : pastedArray.length;
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = async (data: OTPData) => {
    if (!email) {
      toast.error("Email is missing. Please try forgot password again.");
      return;
    }

    const otpCode = (data.otp || []).join("");

    if (otpCode.length !== 4) {
      toast.error("Please enter the 4-digit OTP.");
      return;
    }

    const loadingToast = toast.loading("Verifying OTP...");

    try {
      const res = await verifyOtp({
        email,
        otp: otpCode,
      }).unwrap();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "OTP verified successfully.");

      reset();
      onClose();
      openSetNewPassword();
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("VERIFY OTP ERROR:", err);
      toast.error(getErrorMessage(err));
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is missing. Please try forgot password again.");
      return;
    }

    const loadingToast = toast.loading("Resending OTP...");

    try {
      const res = await resendOtp({ email }).unwrap();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "OTP resent successfully.");
      reset({
        otp: ["", "", "", ""],
      });
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("RESEND OTP ERROR:", err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:min-w-lg mx-auto">
        {/* RIGHT FORM */}
        <div className="flex items-center justify-center bg-white  rounded-2xl">
          <div className="w-full max-w-md p-8 md:p-10 rounded-3xl">
            {/* Logo */}
            <div className="w-full flex justify-center mb-6">
              <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            </div>

            {/* Title */}
            <h2 className="text-center text-[22px] font-semibold mb-7">
              Enter OTP Code
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex justify-between gap-1 overflow-auto">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg font-semibold border rounded-md border-gray-300 focus:border-green-500 focus:ring-green-200 outline-none transition-colors"
                  />
                ))}
              </div>

              {/* Error Message */}
              {errors.otp && (
                <p className="text-red-500 text-sm text-center">
                  {errors.otp.message || "Please enter a valid OTP"}
                </p>
              )}

              {/* Resend */}
              <div className="flex flex-col gap-5 justify-center items-center mt-8">
                <div className="flex gap-3 justify-center items-center">
                  <span>Didn’t receive the code?</span>
                  <div className=" text-[#27AE60]">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="cursor-pointer disabled:opacity-60"
                    >
                      {isResending ? "Resending..." : "Resend"}
                    </button>
                  </div>
                </div>
                <p>You can resend code in 30s</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 my-5 rounded-xl text-white font-medium bg-linear-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Verifying..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
