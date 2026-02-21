"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SetupHeader() {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="py-2 border-zinc-200 px-3 text-[12px] text-zinc-700 rounded-[12px] cursor-pointer"
        onClick={() => window.history.back()}
      >
        <ChevronLeft className="mr-1 h-3.5 w-3.5" />
        Back to Service
      </Button>

      <div className="mt-4">
        <h1 className="text-2xl font-semibold text-zinc-900 font-[inter]">
          Set Up Your Evoke Account
        </h1>
        <p className="mt-1 text-[16px] font-normal text-gray-400">
          Just a few quick steps to set up your InFistables account.
        </p>
      </div>
    </>
  );
}
