import React from "react";
import Modal from "./Modal";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openOTP: () => void;
}
interface ForgotPasswordData {
  email: string;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  openOTP,
}: Props) {
  const { register, handleSubmit } = useForm<ForgotPasswordData>();

  const onSubmit = (data: ForgotPasswordData) => {
    console.log("Form Submitted:", data);
    openOTP();
    onClose();
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
              Forgot Password
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
              />
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
