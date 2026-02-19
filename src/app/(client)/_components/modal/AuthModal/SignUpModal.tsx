// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FcGoogle } from "react-icons/fc";
// import { useForm } from "react-hook-form";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import Modal from "../Modal";

// interface SignUpModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   openLogin: () => void;
// }
// interface SignUpFormData {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export default function SignUpModal({
//   isOpen,
//   onClose,
//   openLogin,
// }: SignUpModalProps) {
//   const { register, handleSubmit, reset } = useForm<SignUpFormData>();
//   const [showPass, setShowPass] = useState(false);
//   const [showConfirmPass, setShowConfirmPass] = useState(false);
//   const router = useRouter();

//   const onSubmit = (data: SignUpFormData) => {
//     console.log("Form Submitted:", data);
//     onClose();
//     reset();
//     // router.push("/");
//   };
//   return (
//     <>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           {/* LEFT IMAGE */}
//           <div className="flex items-center justify-center">
//             <div className="w-full h-full flex items-center justify-center">
//               <Image
//                 src="/images/siginup.png"
//                 width={700}
//                 height={700}
//                 alt="provider"
//                 className="w-full h-full object-cover rounded-3xl hidden lg:block"
//               />
//             </div>
//           </div>

//           {/* RIGHT FORM */}
//           <div className="flex items-center justify-center bg-white lg:-ml-16 rounded-2xl lg:rounded-l-4xl lg:rounded-r-2xl">
//             <div className="w-full p-8 md:p-10 rounded-3xl">
//               {/* Logo */}
//               <div className="w-full flex justify-center mb-6">
//                 <Image
//                   src="/images/logo.png"
//                   width={50}
//                   height={50}
//                   alt="logo"
//                 />
//               </div>

//               {/* Title */}
//               <h2 className="text-center text-[22px] font-semibold mb-7">
//                 Create an Account
//               </h2>

//               {/* Form */}
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   {...register("email")}
//                   placeholder="Enter your email address"
//                   className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
//                 />

//                 {/* Password */}
//                 <div className="pace-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPass ? "text" : "password"}
//                       {...register("password")}
//                       placeholder="Password"
//                       className="w-full border border-gray-200 h-12 rounded-xl px-4 pr-12 focus:outline-none"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPass(!showPass)}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//                     >
//                       {showPass ? (
//                         <AiOutlineEyeInvisible size={20} />
//                       ) : (
//                         <AiOutlineEye size={20} />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Confirm Password */}
//                 <div className=" space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPass ? "text" : "password"}
//                       {...register("confirmPassword")}
//                       placeholder="Confirm Password"
//                       className="w-full border border-gray-200 h-12 rounded-xl px-4 pr-12 focus:outline-none"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPass(!showConfirmPass)}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//                     >
//                       {showConfirmPass ? (
//                         <AiOutlineEyeInvisible size={20} />
//                       ) : (
//                         <AiOutlineEye size={20} />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer"
//                 >
//                   Sign up
//                 </button>
//               </form>

//               <div className="flex items-center my-6 gap-4">
//                 <span className="flex-grow h-px bg-gray-200"></span>
//                 <span className="text-gray-400 text-sm">Or Join With</span>
//                 <span className="flex-grow h-px bg-gray-200"></span>
//               </div>

//               <button className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center gap-3 bg-white cursor-pointer">
//                 <FcGoogle />
//                 Continue with Google
//               </button>

//               <p className="text-center text-gray-500 mt-6 text-sm">
//                 Already have an account?{" "}
//                 <button
//                   onClick={openLogin}
//                   className="text-[#FF2A24] font-medium cursor-pointer"
//                 >
//                   Log In
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Modal from "../Modal";
import { X } from "lucide-react"; 

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  openLogin: () => void;
}

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpModal({
  isOpen,
  onClose,
  openLogin,
}: SignUpModalProps) {
  const { register, handleSubmit, reset } = useForm<SignUpFormData>();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const router = useRouter();

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form Submitted:", data);
    onClose();
    reset();
  };

  return (
    <>
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
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src="/images/siginup.png"
                width={700}
                height={700}
                alt="provider"
                className="w-full h-full object-cover rounded-3xl hidden lg:block"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="flex items-center justify-center bg-white lg:-ml-16 rounded-2xl lg:rounded-l-4xl lg:rounded-r-2xl">
            <div className="w-full p-8 md:p-10 rounded-3xl">
              {/* Logo */}
              <div className="w-full flex justify-center mb-6">
                <Image
                  src="/images/logo.png"
                  width={50}
                  height={50}
                  alt="logo"
                />
              </div>

              {/* Title */}
              <h2 className="text-center text-[22px] font-semibold mb-7">
                Create an Account
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  className="w-full border border-gray-200 h-12 rounded-xl px-4 focus:outline-none"
                />

                {/* Password */}
                <div className="pace-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
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
                </div>

                {/* Confirm Password */}
                <div className=" space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
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
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl text-white font-medium bg-linear-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer"
                >
                  Sign up
                </button>
              </form>

              <div className="flex items-center my-6 gap-4">
                <span className="grow h-px bg-gray-200"></span>
                <span className="text-gray-400 text-sm">Or Join With</span>
                <span className="grow h-px bg-gray-200"></span>
              </div>

              <button className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center gap-3 bg-white cursor-pointer">
                <FcGoogle />
                Continue with Google
              </button>

              <p className="text-center text-gray-500 mt-6 text-sm">
                Already have an account?{" "}
                <button
                  onClick={openLogin}
                  className="text-[#FF2A24] font-medium cursor-pointer"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
