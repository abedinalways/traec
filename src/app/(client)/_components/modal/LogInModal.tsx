"use client";

import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openSignup: () => void;
}
interface LogInFormData {
  email: string;
  password: string;
}

export default function LogInModal({ isOpen, onClose, openSignup }: Props) {
  const { register, handleSubmit } = useForm<LogInFormData>();
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data: LogInFormData) => {
    console.log("Form Submitted:", data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src="/images/siginup.png"
              width={700}
              height={700}
              alt="provider"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center bg-white lg:-ml-16 rounded-l-4xl rounded-r-2xl">
          <div className="w-full max-w-md p-8 md:p-10 rounded-3xl">
            {/* Logo */}
            <div className="w-full flex justify-center mb-6">
              <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            </div>

            {/* Title */}
            <h2 className="text-center text-[22px] font-semibold mb-7">
              Login to your Account
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password")}
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
              <div className="flex justify-end items-center">
                <p className="cursor-pointer">Forgot password?</p>
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer"
              >
                Log In
              </button>
            </form>

            <div className="flex items-center my-6 gap-4">
              <span className="flex-grow h-px bg-gray-200"></span>
              <span className="text-gray-400 text-sm">Or Join With</span>
              <span className="flex-grow h-px bg-gray-200"></span>
            </div>

            <button className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center bg-white cursor-pointer">
              <FcGoogle />
            </button>

            <p className="text-center text-gray-500 mt-6 text-sm">
              Already have not an account?{" "}
              <button
                onClick={openSignup}
                className="text-[#FF2A24] font-medium cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
