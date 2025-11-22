// components/GradientBullet.tsx
import { Check } from "lucide-react";

export default function GradientBullet() {
  return (
    <span
      className="
        w-4 h-4 flex items-center justify-center rounded-full
        bg-linear-to-br from-orange-300 to-red-500
        text-white
      "
    >
      <Check size={10} />
    </span>
  );
}
