import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openPasswordSetSuccessfully: () => void;
}
interface ForgotPasswordData {
  password: string;
  confirmPassword: string;
}

export default function SetNewPasswordModal({
  isOpen,
  onClose,
  openPasswordSetSuccessfully,
}: Props) {
  const { register, handleSubmit } = useForm<ForgotPasswordData>();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = (data: ForgotPasswordData) => {
    console.log("Form Submitted:", data);
    openPasswordSetSuccessfully();
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
              Set New Password
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  {...register("confirmPassword")}
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
