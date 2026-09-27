import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/account-seetings";

function StepDot({
  number,
  status,
}: {
  number: number;
  status: "done" | "active" | "todo";
}) {
  return (
    <div
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full text-[16px] font-semibold p-2",
        status === "done" && "gradient-bg  text-white border border-orange-500",
        status === "active" &&
          "border border-orange-500 bg-white text-orange-500",
        status === "todo" && "border border-zinc-200 bg-white text-zinc-500",
      )}
    >
      {status === "done" ? <Check className="h-5 w-5" /> : number}
    </div>
  );
}

function ProgressItem({
  number,
  title,
  subtitle,
  status,
}: {
  number: number;
  title: string;
  subtitle: string;
  status: "done" | "active" | "todo";
}) {
  return (
    <div className="flex gap-3">
      <StepDot number={number} status={status} />

      <div className="min-w-0">
        <div className="text-[16px] font-semibold text-zinc-900">{title}</div>
        <div className="text-[12px] font-normal leading-4 text-zinc-500">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export default function SetupProgress({ step }: { step: Step }) {
  const getStatus = (itemStep: number) => {
    if (step === itemStep) return "active";
    if (step > itemStep) return "done";
    return "todo";
  };

  return (
    <div>
      <div className="text-[16px] font-semibold text-zinc-900">
        Account Setup Progress
      </div>

      <div className="mt-4 space-y-4">
        <ProgressItem
          number={1}
          title="Select Plan"
          subtitle="Choose your provider plan"
          status={getStatus(1)}
        />

        <ProgressItem
          number={2}
          title="Personal Information"
          subtitle="Tell us a bit about yourself"
          status={getStatus(2)}
        />

        <ProgressItem
          number={3}
          title="Your Preferences"
          subtitle="Personalize your experience"
          status={getStatus(3)}
        />

        <ProgressItem
          number={4}
          title="Payment"
          subtitle="Complete secure payment"
          status={getStatus(4)}
        />
      </div>
    </div>
  );
}
