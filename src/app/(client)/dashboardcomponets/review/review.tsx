"use client";

import { Star, Pencil } from "lucide-react";

const reviewsData = [
  {
    id: 1,
    title: "Austin Bounce",
    subtitle: "Fall Festival Bounce House",
    order: "ORD-003",
    date: "Nov 29, 2024",
    rating: 3,
    userReview: null,
    providerResponse:
      "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
  },
  {
    id: 2,
    title: "Austin Bounce",
    subtitle: "Fall Festival Bounce House",
    order: "ORD-003",
    date: "Nov 29, 2024",
    rating: 5,
    userReview:
      "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
    providerResponse:
      "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
  },
  {
    id: 3,
    title: "Austin Bounce",
    subtitle: "Fall Festival Bounce House",
    order: "ORD-003",
    date: "Nov 29, 2024",
    rating: 4,
    userReview:
      "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
    providerResponse:
      "DJ Sarah was absolutely amazing! She kept all the kids entertained for the entire party. The music selection was perfect and she even taught them some fun dances. Highly recommended!",
  },
];

export default function ReviewPage() {
  const totalReviews = 156; 
  const avgRating = 4.9;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 font-[inter]">
      {/* ---------- Header ---------- */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-[16px] font-medium text-gray-800">All Reviews</h2>
        <div className="flex items-center gap-1">
          <Star fill="#FA9916" className="text-[#FA9916]" size={18} />
          <span className="font-bold text-gray-900">{avgRating}</span>
          <span className="text-gray-500 text-sm">
            ({totalReviews} reviews)
          </span>
        </div>
      </div>

      {/* ---------- Review Cards ---------- */}
      <div className="space-y-6">
        {reviewsData.map((item) => (
          <div
            key={item.id}
            className="w-full border border-gray-100 rounded-3xl p-6 shadow-sm bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-[16px]">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.subtitle}</p>
                <p className="text-gray-400 text-sm mt-1">
                  Order *{item.order} • {item.date}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                {/* 5 Star Rating System */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < item.rating ? "#FA9916" : "#E5E7EB"}
                      className={
                        i < item.rating ? "text-[#FA9916]" : "text-[#E5E7EB]"
                      }
                    />
                  ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full text-gray-600 text-[16px] font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                  <Pencil size={14} />{" "}
                  {item.userReview ? "Edit" : "Write Review"}
                </button>
              </div>
            </div>

            {/* User Review Section (If exists) */}
            {item.userReview && (
              <div className="mt-4 bg-[#FFF5E8]/50 border border-[#FEF0DC] rounded-2xl p-5">
                <p className="font-bold text-gray-800 text-[16px] mb-2">
                  Your Review:
                </p>
                <p className="text-gray-600 text-[16px] leading-relaxed">
                  {item.userReview}
                </p>
              </div>
            )}

            {/* Provider Response Section */}
            <div className="mt-4 bg-[#F0F9FF] border border-[#E0F2FE] rounded-2xl p-5">
              <p className="font-bold text-gray-800 text-[16px] mb-2">
                Provider Response:
              </p>
              <p className="text-gray-600 text-[16px] leading-relaxed">
                {item.providerResponse}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
