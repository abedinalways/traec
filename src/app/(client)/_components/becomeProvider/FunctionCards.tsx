import React from "react";
// Import Lucide icons to match the design style

import Image from "next/image";


interface CardItem {
  step: string;
  title: string;
  icon: string;
  description: string;
}



const cards: CardItem[] = [
  {
    step: "01.",
    title: "Create Your Profile",
    icon: "/images/users.png",
    description: "Set up your account and choose your service category",
  },
  {
    step: "02.",
    title: "Build Your Listing",
    icon: "/images/listing.png",
    description: "Create compelling service packages with pricing",
  },
  {
    step: "03.",
    title: "Start Earning",
    icon: "/images/money.png",
    description: "Receive bookings and grow your business.",
  },
  
];

const ProcessCard: React.FC<{ data: CardItem }> = ({ data }) => {
 

  const gradientBorderClass =
    "border-b-2 border-r-2 border-transparent  bg-linear-to-r from-[#FFAC47] to-[#FF2A24] bg-linear-to-b from-[#FFAC47] to-[#FF2A24] rounded-md ";

  return (
    <div className={gradientBorderClass}>
      <div className="bg-white p-6  h-full relative overflow-hidden rounded-md font-[inter]">
        <div className="absolute top-0 left-0 w-32 h-32 -translate-x-8 -translate-y-8 pointer-events-none">
          <Image
            src="/images/ellipse.png"
            fill
            alt="bg"
            className="object-contain opacity-80"
          />
        </div>

        <div className="relative w-16 h-16 mb-6 z-10">
          <div className="absolute inset-0 rounded-xl bg-white shadow-inner-xl" />

          <div
            className="absolute inset-0 rounded-xl opacity-60"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255, 204, 189, 0.5), rgba(255, 255, 255, 0) 70%)",
              boxShadow: "0 0 10px rgba(255, 170, 150, 0.3)",
            }}
          />

          <div className="relative flex items-center justify-center w-full h-full p-2 ">
            <Image src={data.icon} alt={data.title} width={32} height={32} />
          </div>
        </div>

        {/* Step Number and Title */}
        <div className="mb-4 flex items-center gap-2 relative z-10">
          {/* Step Number: Orange, italic, semi-bold to match the screenshot */}
          <p className="text-red-500 italic font-semibold text-lg leading-none font-serif">
            {data.step}
          </p>
          {/* Title: Black, bold, larger font */}
          <h3 className="text-[20px] font-bold text-gray-800 leading-snug">
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

const FunctionCards = () => {
  return (
    <div className="flex justify-evenly py-16 font-sans antialiased ">
      <div className="w-full max-w-7xl">
        {/* The responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {cards.map((stepData) => (
            <ProcessCard key={stepData.step} data={stepData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunctionCards;
