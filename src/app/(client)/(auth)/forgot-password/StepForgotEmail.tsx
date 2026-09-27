"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotEmailSchema, type ForgotEmailForm } from "./schemas";
import Logo from "./Logo";

export default function StepForgotEmail({
  onNext,
  defaultEmail,
}: {
  onNext: (email: string) => void;
  defaultEmail?: string;
}) {
  const { register, handleSubmit } = useForm<ForgotEmailForm>({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: { email: defaultEmail ?? "" },
    mode: "onSubmit",
  });

  return (
    <div className="w-full max-w-[420px] rounded-xl border border-gray-200 bg-white px-8 py-8">
      <Logo />

      <h2 className="text-center text-[24px] font-semibold">Forgot Password</h2>

      <form
        onSubmit={handleSubmit((data) => onNext(data.email))}
        className="mt-5 space-y-2"
      >
        <label className="block text-[14px] font-medium text-gray-700">
          Email Address
        </label>

        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email address"
          className="w-full border border-gray-200 h-10 rounded-md px-4 focus:outline-none text-[12px]"
        />

        <button
          type="submit"
          className="mt-4 w-full h-10 rounded-md text-white font-medium bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer text-[16px]"
        >
          Send
        </button>
      </form>
    </div>
  );
}
