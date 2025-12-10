"use client";

import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  className,
}: {
  checked: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-5 w-5 rounded-sm border flex items-center justify-center transition",
        checked
          ? "bg-black border-black text-white"
          : "bg-white border-[#dfe1e7]",
        className
      )}
    >
      {checked && <CheckIcon className="h-3.5 w-3.5" />}
    </div>
  );
}
