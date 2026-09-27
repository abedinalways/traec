"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";

type AddonItem = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
};

type Step5Data = {
  addons: number[];
  totalPrice: number;
};

interface Step5Props {
  data: Step5Data;
  onNext: (values: Step5Data) => void;
  onPrevious: () => void;
}

const AVAILABLE_ADDONS: AddonItem[] = [
  {
    id: 1,
    title: "Generator Rental",
    subtitle: "For locations without power access",
    price: 75,
  },
  {
    id: 2,
    title: "Post-Event Cleaning",
    subtitle: "Deep cleaning after event",
    price: 75,
  },
  {
    id: 3,
    title: "Early Setup",
    subtitle: "Setup 2 hours before event start",
    price: 75,
  },
  {
    id: 4,
    title: "Party Attendant",
    subtitle: "Professional attendant for 4 hours",
    price: 75,
  },
];

export default function Step5Addons({ data, onNext, onPrevious }: Step5Props) {
  const form = useForm();

  const [selectedAddons, setSelectedAddons] = useState<number[]>(
    data.addons || [],
  );

  const toggleAddon = (id: number) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const totalPrice = selectedAddons.reduce((sum, id) => {
    const addon = AVAILABLE_ADDONS.find((a) => a.id === id);
    return addon ? sum + addon.price : sum;
  }, 0);

  const handleSubmit = () => {
    onNext({
      addons: selectedAddons,
      totalPrice,
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-9"
        >
          {/* Header */}
          <div className="space-y-4">
            <h2 className="font-inter font-medium text-lg text-black">
              Enhance Your Booking
            </h2>
            <p className="font-inter text-sm text-[#777980]">
              Add these optional services to make your event even better!
            </p>
          </div>

          {/* Add-ons list */}
          <div className="space-y-4">
            {AVAILABLE_ADDONS.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);

              return (
                <FormItem key={addon.id}>
                  <div
                    className={`flex items-center justify-between border rounded-xl p-5 cursor-pointer transition 
                      ${
                        isSelected
                          ? "border-black bg-[#fbfbfb]"
                          : "border-[#dfe1e7] hover:bg-[#fafafa]"
                      }`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleAddon(addon.id)}
                        className="mt-1"
                        onClick={(e) => e.stopPropagation()} // prevents double toggle
                      />

                      <div>
                        <h3 className="font-inter font-medium text-base text-black capitalize">
                          {addon.title}
                        </h3>
                        <p className="font-inter text-sm text-[#777980]">
                          {addon.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="font-inter font-medium text-base text-black">
                      +${addon.price}
                    </span>
                  </div>

                  <FormMessage />
                </FormItem>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              onClick={onPrevious}
              className="capitalize font-inter text-base text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] p-6 cursor-pointer"
            >
              <LeftArrow />
              previous
            </Button>

            <Button
              type="submit"
              className="capitalize font-inter text-base text-white p-6 w-[100px] h-[48px] cursor-pointer"
            >
              next
              <RightArrow />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
