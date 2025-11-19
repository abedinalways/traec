"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";

// -----------------------------
// TYPES
// -----------------------------
type AddonItem = {
  id: number;
  title: string;
  price: number;
};

type Step5Data = {
  addons: number[]; // Only store addon IDs
  totalPrice: number;
};

// --------------------------------------
// PLAN-BASED BASE PRICE (Example)
// --------------------------------------
const PLAN_BASE_PRICE = {
  basic: 100,
  standard: 150,
  premium: 200,
} as const;

type PlanType = keyof typeof PLAN_BASE_PRICE; // "basic" | "standard" | "premium"

interface Step5Props {
  data: Step5Data;
  onNext: (values: Step5Data) => void;
  onPrevious: () => void;
  plan: PlanType;
}

// -----------------------------
// AVAILABLE ADDONS (Fake Static Data)
// -----------------------------
const AVAILABLE_ADDONS: AddonItem[] = [
  { id: 1, title: "Extra Lighting Setup", price: 25 },
  { id: 2, title: "Premium Decoration", price: 40 },
  { id: 3, title: "DJ & Sound System", price: 70 },
  { id: 4, title: "Food Stall Add-on", price: 50 },
  { id: 5, title: "Live Photography", price: 90 },
];

// -----------------------------
// MAIN COMPONENT
// -----------------------------
const Step5Addons = ({ data, onNext, onPrevious, plan }: Step5Props) => {
  // only selection is stateful
  const [selectedAddons, setSelectedAddons] = useState<number[]>(
    data.addons || []
  );

  // derive price directly instead of useEffect + setState
  const basePrice = PLAN_BASE_PRICE[plan] ?? 0;

  const addonsCost = selectedAddons
    .map((id) => AVAILABLE_ADDONS.find((a) => a.id === id)?.price ?? 0)
    .reduce((a, b) => a + b, 0);

  const totalPrice = basePrice + addonsCost;

  const handleCheckboxToggle = (addonId: number) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSubmit = () => {
    onNext({
      addons: selectedAddons,
      totalPrice,
    });
  };

  return (
    <div>
      {/* Add-ons grid */}
      <div className="grid grid-cols-2 gap-5">
        {AVAILABLE_ADDONS.map((addon) => (
          <div
            key={addon.id}
            className="flex items-center justify-between border border-[#dfe1e7] rounded-lg p-4"
          >
            <div>
              <h2 className="font-inter font-medium text-base text-black capitalize">
                {addon.title}
              </h2>
              <p className="font-inter font-normal text-sm text-[#777980]">
                ${addon.price}
              </p>
            </div>

            <Checkbox
              checked={selectedAddons.includes(addon.id)}
              onCheckedChange={() => handleCheckboxToggle(addon.id)}
            />
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-6 p-4 border border-[#dfe1e7] rounded-lg flex justify-between items-center">
        <span className="font-inter font-medium text-base text-black">
          Total Price
        </span>
        <span className="font-inter font-semibold text-xl text-black">
          ${totalPrice}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-8">
        <Button
          onClick={onPrevious}
          className="capitalize font-inter text-base text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] py-3 px-6"
        >
          <ChevronLeft />
          previous
        </Button>

        <Button
          onClick={handleSubmit}
          className="capitalize font-inter text-base text-white py-3 px-6"
        >
          next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Step5Addons;
