"use client";
import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Modal from "../Modal";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  openSetNewPassword: () => void;
}
interface OTPData {
  otp: string[];
}

export default function OTPModal({
  isOpen,
  onClose,
  openSetNewPassword,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OTPData>();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otp = watch("otp") || [];

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setValue("otp", newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const pastedArray = pastedData.split("");

    if (pastedArray.every((char) => /^\d+$/.test(char))) {
      const newOtp = [...otp];
      pastedArray.forEach((char, index) => {
        if (index < 4) {
          newOtp[index] = char;
        }
      });
      setValue("otp", newOtp);

      // Focus the next empty input or the last one
      const nextEmptyIndex = pastedArray.length < 4 ? pastedArray.length : 3;
      inputRefs.current[nextEmptyIndex]?.focus();
    }
  };

  const onSubmit = (data: OTPData) => {
    console.log("Form Submitted:", data);
    onClose();
    openSetNewPassword();
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
                    {...register(`otp.${index}`, {
                      required: "OTP is required",
                      pattern: {
                        value: /^[0-9]$/,
                        message: "Must be a single digit",
                      },
                    })}
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
                {" "}
                <div className="flex gap-3 justify-center items-center">
                  <Link href="#">Didn’t receive the code?</Link>
                  <div className=" text-[#27AE60]">
                    <Link href="#">Resend</Link>
                  </div>
                </div>
                <p>You can resend code in 30s</p>{" "}
              </div>
              <button
                type="submit"
                className="w-full h-12 my-5 rounded-xl text-white font-medium bg-linear-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
