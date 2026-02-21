"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";


import { setPasswordSchema, type SetPasswordForm } from "./schemas";
import Logo from "./Logo";

export default function StepSetNewPassword({
  onNext,
  onBack,
}: {
  onNext: (password: string) => void;
  onBack: () => void;
}) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit } = useForm<SetPasswordForm>({
    resolver: zodResolver(setPasswordSchema),
    mode: "onSubmit",
  });

  return (
    <div className="w-full max-w-[420px] rounded-xl border border-gray-200 bg-white px-8 py-8">
      <Logo/>

      <h2 className="text-center text-[24px] font-semibold">
        Set New Password
      </h2>

      <form
        onSubmit={handleSubmit((d) => onNext(d.password))}
        className="mt-5 space-y-3"
      >
        <div className="space-y-2">
          <label className="block text-[14px] font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password")}
              placeholder="Enter new password"
              className="w-full border border-gray-200 h-10 rounded-md px-4 pr-10 focus:outline-none text-[14px]"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPass ? (
                <AiOutlineEyeInvisible size={18} />
              ) : (
                <AiOutlineEye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[16px] font-medium text-gray-700">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className="w-full border border-gray-200 h-10 rounded-md px-4 pr-10 focus:outline-none text-[12px]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? (
                <AiOutlineEyeInvisible size={18} />
              ) : (
                <AiOutlineEye size={18} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-10 rounded-md text-white font-medium bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer text-[16px]"
        >
          Update Password
        </button>

        <button
          type="button"
          onClick={onBack}
          className="mt-2 w-full text-center text-[16px] text-gray-500"
        >
          Back
        </button>
      </form>
    </div>
  );
}
