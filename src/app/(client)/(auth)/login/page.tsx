"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import FlyIcon from "@/components/icons/FlyIcon";
import { ShieldCheck } from "lucide-react";
import { demoLogin } from "@/lib/auth/auth";

interface AdminLoginFormData {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const { register, handleSubmit, reset } = useForm<AdminLoginFormData>();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  
   
  //demo login
 const onSubmit = (data: AdminLoginFormData) => {
   setIsLoading(true);

   const res = demoLogin(data.email, data.password);

   setTimeout(() => {
     setIsLoading(false);

     if (!res.success) {
       alert("Invalid email or password");
       return;
     }

     localStorage.setItem("role", res.role);

     router.push(res.redirect);
   }, 600);
 };
  


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[inter] p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE: Branding/Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gray-900 p-12 text-white relative">
          <div className="absolute top-10 left-10">
            <FlyIcon />
          </div>

          <div className="relative w-full h-64 mb-8">
            <Image
              src="/images/siginup.png" // You can replace this with a more 'admin-focused' image
              fill
              alt="Admin Portal"
              className="object-contain opacity-80"
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Admin Control Center</h1>
            <p className="text-gray-400 max-w-sm">
              Secure access for system administrators to manage platform
              operations and user data.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="w-full flex justify-center mb-4">
            <div className="p-3 bg-red-50 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-[#FF2A24]" />
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
            Administrator Login
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Please enter your credentials to access the dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <input
                type="email"
                required
                {...register("email")}
                placeholder="admin@company.com"
                className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:ring-2 focus:ring-[#FFAC47] focus:outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 h-12 rounded-xl px-4 pr-12 focus:ring-2 focus:ring-[#FFAC47] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-sm text-gray-500 hover:text-[#FF2A24] transition-colors"
              >
                Reset Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-white font-semibold bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] hover:opacity-90 transition-opacity shadow-lg shadow-red-200 flex items-center justify-center"
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-gray-400 hover:underline"
            >
              ← Back to Main Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
