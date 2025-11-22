import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openSignup: () => void;
}
interface ForgotPasswordData {
  email: string;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  openSignup,
}: Props) {
  const { register, handleSubmit } = useForm<ForgotPasswordData>();

  const onSubmit = (data: ForgotPasswordData) => {
    console.log("Form Submitted:", data);
    onClose();
    openSignup();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* RIGHT FORM */}
        <div className="flex items-center justify-center bg-white lg:-ml-16 rounded-l-4xl rounded-r-2xl">
          <div className="w-full max-w-md p-8 md:p-10 rounded-3xl">
            {/* Logo */}
            <div className="w-full flex justify-center mb-6">
              <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            </div>

            {/* Title */}
            <h2 className="text-center text-[22px] font-semibold mb-7">
              Forgot Password
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer"
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
