"use client";

import { Star, Pencil, ChevronRight } from "lucide-react";

export default function ReviewPage() {
  const reviews = [
    {
      title: "Austin Bounce",
      subtitle: "Fall Festival Bounce House",
      order: "ORD-003",
      date: "Nov 23, 2024",
      rating: 5,
      review:
        "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
      providerResponse:
        "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
    },
    {
      title: "Austin Bounce",
      subtitle: "Fall Festival Bounce House",
      order: "ORD-003",
      date: "Nov 23, 2024",
      rating: 5,
      review:
        "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
      providerResponse:
        "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
    },
  ];

  return (
    <div className="w-full bg-white p-5 rounded-xl pb-10">

      {/* ---------- Header ---------- */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <h2 className="text-lg font-semibold">All Reviews</h2>

        <div className="flex items-center gap-2 text-yellow-500 font-semibold">
          <Star fill="#F6C700" className="text-yellow-400" size={18} />
          <span className="text-black">4.9</span>
          <span className="text-gray-500 text-sm">(156 reviews)</span>
        </div>
      </div>

      {/* ---------- Review Cards ---------- */}
      <div className="space-y-6">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="
              w-full 
              border 
              bg-white 
              rounded-2xl 
              shadow-sm 
              p-5 
              bg-[#FEF0DC]
            "
          >
            {/* Top Section */}
            <div className="flex flex-wrap justify-between items-start gap-3">
              <div className="w-full sm:w-auto">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-gray-500 text-sm">{item.subtitle}</p>

                {/* Order + Date */}
                <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
                  <ChevronRight size={14} />
                  <span>
                    Order “{item.order}” • {item.date}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                {/* Rating Stars */}
                <div className="flex text-yellow-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      fill="#F6C700"
                      className="text-yellow-400"
                      size={18}
                    />
                  ))}
                </div>

                {/* Edit Button */}
                <button className="flex items-center gap-1 px-3 py-1 border rounded-full text-gray-600 text-sm hover:bg-gray-50">
                  <Pencil size={14} /> Edit
                </button>
              </div>
            </div>

            {/* YOUR REVIEW */}
            <div className="mt-4">
              <p className="font-semibold text-gray-800 mb-1">Your Review:</p>

              <div className="bg-[#FEF0DC] border p-3 rounded text-gray-700 text-sm leading-relaxed">
                {item.review}
              </div>
            </div>

            {/* PROVIDER RESPONSE */}
            <div className="mt-4">
              <p className="font-semibold text-gray-800 mb-1">Provider Response:</p>

              <div className="bg-[#F8FAFC] border p-3 rounded text-sm text-gray-700 leading-relaxed">
                {item.providerResponse}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
