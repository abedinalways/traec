"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function BorderedChoice({
  checked,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  label: string;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "flex w-full items-center gap-3 rounded-[12px] border border-gray-200 px-4 py-3 text-left text-[12px] transition",
        checked ? "border-1 border-black bg-white " : " bg-white ",
        "hover:border-zinc-300",
      )}
    >
      <Checkbox checked={checked} />
      <span className="text-zinc-800 text-[16px] font-semibold">{label}</span>
    </button>
  );
}
