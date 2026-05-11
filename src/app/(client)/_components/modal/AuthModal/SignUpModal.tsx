"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { X } from "lucide-react";
import { toast } from "sonner"; // or your toast lib
import Modal from "../Modal";
import { useRegisterUserMutation } from "@/app/api/auth/authapi";




interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  openLogin: () => void;
}

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp?: string;
}

export default function SignUpModal({
  isOpen,
  onClose,
  openLogin,
}: SignUpModalProps) {
  const { register, handleSubmit, getValues, reset } =
    useForm<SignUpFormData>();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();


  const getErrorMessage = (err: unknown) => {
    if (typeof err === "object" && err !== null && "data" in err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (err as { data?: any }).data;

      if (typeof data?.message === "string") {
        return data.message;
      }

      if (data?.errors && typeof data.errors === "object") {
        const firstError = Object.values(data.errors)?.[0];

        if (Array.isArray(firstError) && typeof firstError[0] === "string") {
          return firstError[0];
        }
      }
    }

    return "Something went wrong. Please try again.";
  };

  const onSubmit = async (data: SignUpFormData) => {
    if (!otpStep && data.password !== data.confirmPassword) {
      toast.error("Password and confirm password do not match.");
      return;
    }

    const payload = {
      name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      ...(otpStep && { otp: data.otp }),
    };

    const loadingToast = toast.loading(
      otpStep ? "Verifying OTP..." : "Creating your account...",
    );

    try {
      const res = await registerUser(payload).unwrap();

      toast.dismiss(loadingToast);

      if (res?.data?.requires_verification && !otpStep) {
        setPendingEmail(res.data.email);
        setOtpStep(true);
        toast.success(res?.message || "OTP sent to your email!");
        return;
      }

      toast.success(res?.message || "Registration successful! Please log in.");

      reset();
      setOtpStep(false);
      setPendingEmail("");
      onClose();
      openLogin();
    } catch (err: unknown) {
      toast.dismiss(loadingToast);
      console.log("REGISTER ERROR:", err);

      toast.error(getErrorMessage(err));
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 font-[inter]">
        <button
          onClick={onClose}
          className="absolute right-4 cursor-pointer top-4 z-20 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* LEFT IMAGE */}
        <div className="flex items-center justify-center">
          <Image
            src="/images/siginup.png"
            width={700}
            height={700}
            alt="provider"
            className="w-full h-full object-cover rounded-3xl hidden lg:block"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center bg-white lg:-ml-16 rounded-2xl lg:rounded-l-4xl lg:rounded-r-2xl">
          <div className="w-full p-8 md:p-10 rounded-3xl">
            <div className="w-full flex justify-center mb-6">
              <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            </div>

            <h2 className="text-center text-[22px] font-semibold mb-7">
              {otpStep ? "Verify Your Email" : "Create an Account"}
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit, () => {
                toast.error("Please fill in all required fields.");
              })}
              className="space-y-2"
            >
              {!otpStep ? (
                <>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register("firstName", { required: true })}
                        placeholder="Enter your first name"
                        className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register("lastName", { required: true })}
                        placeholder="Enter your last name"
                        className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
                      />
                    </div>
                  </div>

                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
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
                  </div>
                </>
              ) : (
                // OTP Step
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 text-center">
                    We sent a code to{" "}
                    <span className="font-semibold text-gray-700">
                      {pendingEmail}
                    </span>
                  </p>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    {...register("otp", { required: true })}
                    placeholder="Enter OTP"
                    className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none tracking-widest text-center text-lg"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-4 rounded-xl text-white font-medium bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer disabled:opacity-60"
              >
                {isLoading
                  ? "Please wait..."
                  : otpStep
                    ? "Verify OTP"
                    : "Sign up"}
              </button>
            </form>

            {!otpStep && (
              <>
                <div className="flex items-center my-6 gap-4">
                  <span className="grow h-px bg-gray-200"></span>
                  <span className="text-gray-400 text-sm">Or Join With</span>
                  <span className="grow h-px bg-gray-200"></span>
                </div>

                <button className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center gap-3 bg-white cursor-pointer">
                  <FcGoogle />
                  Continue with Google
                </button>
              </>
            )}

            <p className="text-center text-gray-500 mt-6 text-sm">
              Already have an account?{" "}
              <button
                onClick={openLogin}
                className="text-[#FF2A24] font-medium cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
