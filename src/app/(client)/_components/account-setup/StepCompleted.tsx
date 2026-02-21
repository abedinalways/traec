"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SuccessIcon from "@/components/icons/SuccessIcon";

export default function StepCompleted() {
  return (
    <div className="mt-40 flex justify-center">
      <div className="w-full max-w-[520px] text-center">
        <div className="mx-auto grid  place-items-center">
          <SuccessIcon/>
        </div>

        <div className="mt-6 text-[24px] font-semibold text-[#00a63e] ">
          Account Setup Completed
        </div>
        <div className="mt-1 text-[12px] text-zinc-500 ">
          Your account Created successfully!
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="outline"
            className="h-12 w-[384px] justify-center rounded-md border-zinc-200 bg-white text-[16px] cursor-pointer text-zinc-700"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home page <ChevronRight className=" h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
