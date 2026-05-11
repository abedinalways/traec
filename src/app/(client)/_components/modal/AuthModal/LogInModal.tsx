

"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal";
import { X } from "lucide-react";
import { toast } from "sonner";

import {
  getDefaultRouteForRole,
  normalizeAuthRole,
  resolvePostLoginPath,
} from "@/lib/auth/config";
import { useLoginUserMutation } from "@/app/api/auth/authapi";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  openSignup: () => void;
  openForgotPassword: () => void;
}

interface LogInFormData {
  email: string;
  password: string;
}

export default function LogInModal({
  isOpen,
  onClose,
  openSignup,
  openForgotPassword,
}: Props) {
  const { register, handleSubmit, reset } = useForm<LogInFormData>();
  const [showPass, setShowPass] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [login, { isLoading }] = useLoginUserMutation();

  const getErrorMessage = (err: unknown) => {
    if (typeof err === "object" && err !== null && "data" in err) {
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

    return "Invalid email or password.";
  };

  const onSubmit = async (data: LogInFormData) => {
    const loadingToast = toast.loading("Logging in...");

    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      toast.dismiss(loadingToast);

      const role = normalizeAuthRole(res.user?.type);

      if (!role) {
        toast.error("Login successful, but user role is invalid.");
        return;
      }

      toast.success(res?.message || "Login successful");

      reset();
      onClose();

      const requestedPath = searchParams.get("redirect");

      const finalPath = requestedPath
        ? resolvePostLoginPath(role, requestedPath)
        : getDefaultRouteForRole(role);

      router.replace(finalPath);
      router.refresh();
    } catch (err: unknown) {
      toast.dismiss(loadingToast);
      console.log("LOGIN ERROR:", err);

      toast.error(getErrorMessage(err));
    }
  };

  const handleForgotPassword = () => {
    reset();
    onClose();
    openForgotPassword();
  };

  const handleOpenSignup = () => {
    reset();
    onClose();
    openSignup();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 z-50 font-[inter]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4  cursor-pointer top-4 z-2000 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex items-center justify-center mr-10">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src="/images/siginup.png"
              width={700}
              height={700}
              alt="provider"
              className="w-full h-full object-cover hidden lg:block"
            />
          </div>
        </div>

        <div className="flex items-center justify-center z-50 bg-white lg:-ml-16 rounded-2xl lg:rounded-l-4xl lg:rounded-r-2xl">
          <div className="w-full p-8 md:p-10 rounded-3xl">
            <div className="w-full flex justify-center mb-6">
              <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            </div>

            <h2 className="text-center text-[22px] font-semibold mb-7">
              Login to your Account
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit, () => {
                toast.error("Please enter your email and password.");
              })}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                autoComplete="email"
                className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password", { required: true })}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full border border-gray-200 h-12 rounded-xl px-4 pr-12 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
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

              <div className="flex justify-end items-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[14px] cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="flex items-center my-6 gap-4">
              <span className="flex-grow h-px bg-gray-200"></span>
              <span className="text-gray-400 text-sm">Or Join With</span>
              <span className="flex-grow h-px bg-gray-200"></span>
            </div>

            <button
              type="button"
              className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center gap-3 bg-white cursor-pointer"
            >
              <FcGoogle />
              Continue with Google
            </button>

            <p className="text-center text-gray-500 mt-6 text-sm">
              Don&apos;t have an account yet?{" "}
              <button
                type="button"
                onClick={handleOpenSignup}
                className="text-[#FF2A24] font-medium cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}