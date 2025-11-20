import React from "react";
// Import Lucide icons to match the design style
import { Search, Users, Calendar, Star, LucideIcon } from "lucide-react";
import Image from "next/image";

// --- Interfaces and Data (Updated for array type) ---

// Define the structure for a single card item
interface CardItem {
  step: string;
  title: string;
  icon: keyof typeof iconMap; // Ensure icon names match keys in iconMap
  description: string;
}

// Map string keys to Lucide icons for dynamic rendering
const iconMap = {
  Search,
  Users,
  Calendar,
  Star,
};

// Use the data structure provided by the user (corrected to be an array of CardItem)
const cards: CardItem[] = [
  {
    step: "01.",
    title: "Browse Evoke",
    icon: "Search",
    description:
      "Review provider profiles, check availability, and compare prices. View photos and read customer reviews.",
  },
  {
    step: "02.",
    title: "Compare & Choose",
    icon: "Users",
    description:
      "Review provider profiles, check availability, and compare prices. View photos and read customer reviews.",
  },
  {
    step: "03.",
    title: "Book & Schedule",
    icon: "Calendar",
    description:
      "Secure your rental with easy online booking. Schedule delivery, setup, and pickup times that work for you.",
  },
  {
    step: "04.",
    title: "Party & Review",
    icon: "Star",
    description:
      "Enjoy your stress-free event while we handle the setup and takedown. Your guests will have a blast!",
  },
];

// --- Custom Card Component ---

/**
 * Renders a single card with the specific gradient border and icon styling.
 */
const ProcessCard: React.FC<{ data: CardItem }> = ({ data }) => {
  const IconComponent = iconMap[data.icon] as LucideIcon;

  // Custom Tailwind class to generate the soft orange gradient border effect
  const gradientBorderClass =
    "p-[1px] rounded-2xl bg-gradient-to-br from-orange-200/50 via-red-200/80 to-orange-100/90";

  return (
    // Outer div creates the gradient border effect
    <div className={gradientBorderClass}>
      {/* Inner div contains the card content */}
      <div className="bg-white p-6 rounded-[calc(1rem-1px)] h-full transition-shadow duration-300 hover:shadow-xl hover:shadow-orange-50/50 relative overflow-hidden">
        {/* Background ellipse image positioned at top-left corner */}
        <div className="absolute top-0 left-0 w-32 h-32 -translate-x-8 -translate-y-8 pointer-events-none">
          <Image
            src="/images/ellipse.png"
            fill
            alt="bg"
            className="object-contain opacity-80"
          />
        </div>

        {/* Icon Area: Circle with inner gradient glow */}
        <div className="relative w-16 h-16 mb-6 z-10">
          <div className="absolute inset-0 rounded-xl bg-white shadow-inner-xl" />

          {/* Custom element for the glowing peach/orange background effect under the icon */}
          <div
            className="absolute inset-0 rounded-xl opacity-60"
            style={{
              // Gradient to match the soft glow around the icon circle
              background:
                "radial-gradient(circle at 50% 50%, rgba(255, 204, 189, 0.5), rgba(255, 255, 255, 0) 70%)",
              boxShadow: "0 0 10px rgba(255, 170, 150, 0.3)",
            }}
          />

          {/* Icon container - centered within the glow */}
          <div className="relative flex items-center justify-center w-full h-full p-2">
            <IconComponent
              className="w-6 h-6 text-orange-500"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* Step Number and Title */}
        <div className="mb-4 flex items-center gap-2 relative z-10">
          {/* Step Number: Orange, italic, semi-bold to match the screenshot */}
          <p className="text-red-500 italic font-semibold text-lg leading-none font-serif">
            {data.step}
          </p>
          {/* Title: Black, bold, larger font */}
          <h3 className="text-xl font-semibold text-gray-800 leading-snug">
            {data.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 relative z-10">
          {data.description}
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---

const FunctionCard = () => {
  return (
    <div className="flex items-center justify-center py-16 font-sans antialiased">
      <div className="w-full max-w-7xl">
        {/* The responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((stepData) => (
            <ProcessCard key={stepData.step} data={stepData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;
