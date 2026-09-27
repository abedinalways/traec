import React from "react";
import { FaStar } from "react-icons/fa";
import { ServiceReview } from "@/app/api/services/serviceManagementApi";

function buildRatings(reviews: ServiceReview[]) {
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    const idx = Math.min(Math.max(r.rating - 1, 0), 4);
    counts[idx] += 1;
  });
  const total = reviews.length || 1;
  return [5, 4, 3, 2, 1].map((star) => ({
    label: `${star} Star${star === 1 ? "" : "s"}`,
    value: Math.round((counts[star - 1] / total) * 100),
    count: counts[star - 1],
  }));
}

function averageRating(reviews: ServiceReview[]) {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export default function CustomerReviewsSummary({
  reviews,
}: {
  reviews?: ServiceReview[];
}) {
  const list = reviews ?? [];
  const ratings = buildRatings(list);
  const avg = averageRating(list);

  const breakdown = [
    { title: "Communication", rating: avg },
    { title: "Service Quality", rating: avg },
    { title: "Value of Service", rating: avg },
    { title: "Performance", rating: avg },
  ];

  return (
    <div className="w-full bg-white rounded-xl border p-6 md:p-8 my-5">
        <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xl ${
                i < Math.round(avg) ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="ml-2">{avg.toFixed(1)}/5</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Rating Bars */}
        <div>
          {/* Review Rows */}
          {ratings.map((item) => (
            <div key={item.label} className="flex items-center mb-3">
              <span className="w-20 text-gray-600">{item.label}</span>
              <div className="flex-1 mx-3 bg-gray-200 h-2 rounded-full">
                <div
                  className="h-2 bg-[#FA9916] rounded-full"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
              <span className="w-10 text-gray-700 text-sm">({item.count})</span>
            </div>
          ))}
        </div>

        {/* Right Column: Rating Breakdown Box */}
        <div className="bg-[#FBFBFB] rounded-xl p-2">
          <h3 className="text-lg font-semibold mb-2">Rating Breakdown</h3>
          {breakdown.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-1 "
            >
              <span className="text-gray-700">{item.title}</span>
              <div className="flex items-center gap-2">
                <FaStar className="text-[#FA9916]" />
                <span className="font-medium">{item.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
