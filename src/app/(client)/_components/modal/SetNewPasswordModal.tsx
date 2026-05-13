"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/app/api/auth/authapi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  openPasswordSetSuccessfully: () => void;
}

interface ForgotPasswordData {
  password: string;
  confirmPassword: string;
}

const getErrorMessage = (err: unknown) => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (err as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return "Password reset failed. Please try again.";
};

export default function SetNewPasswordModal({
  isOpen,
  onClose,
  email,
  openPasswordSetSuccessfully,
}: Props) {
  const { register, handleSubmit, reset } = useForm<ForgotPasswordData>();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: ForgotPasswordData) => {
    if (!email) {
      toast.error("Email is missing. Please try forgot password again.");
      return;
    }

    if (!data.password || !data.confirmPassword) {
      toast.error("Please enter and confirm your new password.");
      return;
    }

    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password do not match.");
      return;
    }

    const loadingToast = toast.loading("Setting new password...");

    try {
      const res = await resetPassword({
        email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      }).unwrap();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "Password set successfully.");

      reset();
      onClose();
      openPasswordSetSuccessfully();
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("RESET PASSWORD ERROR:", err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:min-w-lg mx-auto">
        {/* RIGHT FORM */}
        <div className="flex items-center justify-center bg-white rounded-2xl">
          <div className="w-full  p-8 rounded-3xl">
            {/* Logo */}
            <div className="w-full flex justify-center mb-6">
              <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            </div>

            {/* Title */}
            <h2 className="text-center text-[22px] font-semibold mb-7">
              Set New Password
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              {/* Password */}
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className="w-full border border-gray-200 h-12 rounded-xl px-4 pr-12 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPass ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  {...register("confirmPassword", { required: true })}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-200 h-12 rounded-xl px-4 pr-12 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPass ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 my-5 rounded-xl text-white font-medium bg-linear-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
