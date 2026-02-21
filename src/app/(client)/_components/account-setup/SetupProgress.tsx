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
        status === "done" && "text-white background-gradient border-orange-500",
        status === "active" &&
          "border border-orange-500 bg-white text-gradient",
        status === "todo" && "border border-zinc-200 bg-white text-zinc-500",
      )}
    >
      {number}
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
        <div className="text-[12px] font-normal leading-4 text-zinc-500">{subtitle}</div>
      </div>
    </div>
  );
}

export default function SetupProgress({ step }: { step: Step }) {
  const s1 = step === 1 ? "active" : step > 1 ? "done" : "todo";
  const s2 = step === 2 ? "active" : step > 2 ? "done" : "todo";
  const s3 = step === 3 ? "active" : step > 3 ? "done" : "todo";

  return (
    <div>
      <div className="text-[16px] font-semibold text-zinc-900">
        Account Setup Progress
      </div>

      <div className="mt-4 space-y-4 ">
        <ProgressItem
          number={1}
          title="Personal Information"
          subtitle="Tell us a bit about yourself"
          status={s1}
        />
        <ProgressItem
          number={2}
          title="Your Preferences"
          subtitle="Personalize your experience"
          status={s2}
        />
        <ProgressItem
          number={3}
          title="Account Summary"
          subtitle="Review Account Details"
          status={s3}
        />
      </div>
    </div>
  );
}
