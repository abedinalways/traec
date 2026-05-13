// "use client";
// import React from "react";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import Modal from "../Modal";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   openOTP: () => void;
// }
// interface ForgotPasswordData {
//   email: string;
// }

// export default function ForgotPasswordModal({
//   isOpen,
//   onClose,
//   openOTP,
// }: Props) {
//   const { register, handleSubmit } = useForm<ForgotPasswordData>();

//   const onSubmit = (data: ForgotPasswordData) => {
//     console.log("Form Submitted:", data);
//     openOTP();
//     onClose();
//   };
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="grid grid-cols-1 md:min-w-lg mx-auto">
//         {/* RIGHT FORM */}
//         <div className="flex items-center justify-center bg-white rounded-2xl">
//           <div className="w-full  p-8 rounded-3xl">
//             {/* Logo */}
//             <div className="w-full flex justify-center mb-6">
//               <Image src="/images/logo.png" width={50} height={50} alt="logo" />
//             </div>

//             {/* Title */}
//             <h2 className="text-center text-[22px] font-semibold mb-7">
//               Forgot Password
//             </h2>

//             {/* Form */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 {...register("email", { required: true })}
//                 placeholder="Email"
//                 className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
//               />
//               <button
//                 type="submit"
//                 className="w-full h-12 my-5 rounded-xl text-white font-medium bg-linear-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }

"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Modal from "../Modal";
import { useForgotPasswordMutation } from "@/app/api/auth/authapi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openOTP: () => void;
  setForgotPasswordEmail: (email: string) => void;
}

interface ForgotPasswordData {
  email: string;
}

const getErrorMessage = (err: unknown) => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (err as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return "Failed to send OTP. Please try again.";
};

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  openOTP,
  setForgotPasswordEmail,
}: Props) {
  const { register, handleSubmit, reset } = useForm<ForgotPasswordData>();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data: ForgotPasswordData) => {
    const email = data.email.trim();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const loadingToast = toast.loading("Sending OTP...");

    try {
      const res = await forgotPassword({ email }).unwrap();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "OTP sent to your email successfully.");

      setForgotPasswordEmail(email);
      reset();
      onClose();
      openOTP();
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("FORGOT PASSWORD ERROR:", err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:min-w-lg mx-auto">
        <div className="flex items-center justify-center bg-white rounded-2xl">
          <div className="w-full p-8 rounded-3xl">
            <div className="w-full flex justify-center mb-6">
              <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            </div>

            <h2 className="text-center text-[22px] font-semibold mb-3">
              Forgot Password
            </h2>

            <p className="text-center text-gray-500 text-sm mb-7">
              Enter your email address to receive an OTP code.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit, () => {
                toast.error("Please enter your email address.");
              })}
              className="space-y-2"
            >
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email Address"
                autoComplete="email"
                className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 my-5 rounded-xl text-white font-medium bg-linear-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}