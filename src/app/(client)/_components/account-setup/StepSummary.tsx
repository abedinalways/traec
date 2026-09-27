"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { PersonalForm } from "./schemas";

export default function StepSummary({
  values,
  selectedServices,
  onShare,
}: {
  values: PersonalForm;
  selectedServices: string[];
  onShare: () => void;
}) {
  return (
    <div className="p-6">
      <div className="text-[24px] font-semibold text-zinc-900">
        Account Summary
      </div>
      <div className="mt-1 text-[16px] text-zinc-500">
        Review Account Details
      </div>

      <Separator className="my-5" />

      <div className="rounded-md border border-zinc-200 bg-white p-5">
        <div className="text-[16px] font-semibold text-zinc-900">
          Account Details
        </div>

        <div className="mt-4 space-y-2 text-[16px] text-zinc-700">
          <div>
            <span className="text-zinc-500">Name:</span>{" "}
            {values.firstName || "—"} {values.lastName || "—"}
          </div>
          <div>
            <span className="text-zinc-500">Email Address:</span>{" "}
            {values.email || "—"}
          </div>
          <div>
            <span className="text-zinc-500">Phone Number:</span>{" "}
            {values.phone || "—"}
          </div>
          <div>
            <span className="text-zinc-500">Location:</span>{" "}
            {values.street || "—"}, {values.city || "—"}, {values.state || "—"}{" "}
            {values.zip || "—"}
          </div>
          <div>
            <span className="text-zinc-500">Interested In:</span>{" "}
            {selectedServices.length
              ? selectedServices.join(", ")
              : "No preference"}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-5">
        <Button
          type="button"
          className="w-[153px] h-[48px] cursor-pointer rounded-md bg-black px-5 text-[16px] text-white hover:bg-black/90 font-[inter]"
          onClick={onShare}
        >
          Setup Account
        </Button>
      </div>
    </div>
  );
}
