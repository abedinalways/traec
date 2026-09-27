"use client";

import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ProviderPlan } from "@/types/account-seetings";
import { cn } from "@/lib/utils";

export default function StepSelectPlan({
  plans,
  selectedPlanId,
  onSelectPlan,
  onNext,
}: {
  plans: ProviderPlan[];
  selectedPlanId: number | null;
  onSelectPlan: (id: number) => void;
  onNext: () => void;
}) {
  return (
    <div className="p-6 font-[inter]">
      <div className="text-[24px] font-semibold text-zinc-900">
        Choose Your Plan
      </div>

      <div className="mt-1 text-[16px] text-zinc-500">
        Select the plan that fits your business needs
      </div>

      <Separator className="my-5" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => {
          const active = selectedPlanId === plan.id;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelectPlan(plan.id)}
              className={cn(
                "relative min-h-[220px] rounded-2xl border p-5 text-left transition",
                active
                  ? "border-orange-700 gradient-bg"
                  : "border-zinc-200 bg-white hover:border-zinc-400",
              )}
            >
              {active ? (
                <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center cursor-pointer rounded-full bg-orange-300 text-white">
                  <Check className="h-4 w-4" />
                </span>
              ) : null}

              <span className="rounded-full bg-orange-300 px-3 py-1 text-xs font-semibold uppercase text-white">
                {plan.package}
              </span>

              <h3 className="mt-4 text-xl font-bold text-white">
                {plan.title}
              </h3>

              <div className="mt-2 flex items-end gap-1 text-white">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-white">/{plan.package}</span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                {plan.features?.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-white" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-black">Step 1 of 4</p>

        <Button
          type="button"
          disabled={!selectedPlanId}
          onClick={onNext}
          className="h-[48px] w-[100px] cursor-pointer rounded-md gradient-bg  text-white disabled:opacity-60"
        >
          Next <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
