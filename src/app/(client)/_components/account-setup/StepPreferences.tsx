"use client";

import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import BorderedChoice from "./ui/BorderedChoice";

export default function StepPreferences({
  services,
  investorHelp,
  selectedServices,
  selectedInvestorHelp,
  onToggleService,
  onToggleInvestorHelp,
  onNext,
}: {
  services: readonly string[];
  investorHelp: readonly string[];
  selectedServices: string[];
  selectedInvestorHelp: string[];
  onToggleService: (s: string) => void;
  onToggleInvestorHelp: (s: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="p-6">
      <div className="text-[24px] font-semibold text-zinc-900">
        Your Preferences
      </div>
      <div className="mt-1 text-[16px] text-zinc-500">
        Personalize your experience
      </div>

      <Separator className="my-5" />

      <div className="space-y-6">
        <div>
          <div className="text-[14px] font-semibold text-zinc-600">
            What services are you interested in? (Select at least one)
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {services.map((s) => (
              <BorderedChoice
                key={s}
                checked={selectedServices.includes(s)}
                label={s}
                onCheckedChange={() => onToggleService(s)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-[12px] font-semibold text-zinc-900">
            What type Of events do you usually host? (Optional)
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {investorHelp.map((s) => (
              <BorderedChoice
                key={s}
                checked={selectedInvestorHelp.includes(s)}
                label={s}
                onCheckedChange={() => onToggleInvestorHelp(s)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="button"
            className="w-[100px] h-[48px] cursor-pointer rounded-md bg-black px-5 text-[16px] text-white hover:bg-black/90 font-[inter]"
            onClick={onNext}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
