"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuccessPopup({ open }: { open: boolean }) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 py-10">
      <div className="w-full max-w-[520px] rounded-xl bg-white px-8 text-center shadow-lg py-12">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-orange-200">
          <Image src="/images/success.png" width={65} height={65} alt="logo" />
        </div>

        <div className="text-[24px] font-semibold text-[#00a63e]">
          Password set successfully!
        </div>
        <div className="mt-1 text-[16px] text-gray-500">
          You can now login with your new password.
        </div>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-5 cursor-pointer w-full h-10 rounded-md border border-gray-200 bg-white text-[12px] text-gray-700 flex items-center justify-center gap-2"
        >
          Go to Home page <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
