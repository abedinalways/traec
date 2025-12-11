import React from "react";
import { FaStar } from "react-icons/fa";

export default function CustomerReviewsSummary() {
  const ratings = [
    { label: "5 Stars", value: 90, count: 31 },
    { label: "4 Stars", value: 30, count: 8 },
    { label: "3 Stars", value: 20, count: 6 },
    { label: "2 Stars", value: 10, count: 4 },
    { label: "1 Star", value: 5, count: 1 },
  ];

  const breakdown = [
    { title: "Communication", rating: 4.7 },
    { title: "Service Quality", rating: 4.5 },
    { title: "Value of Service", rating: 4.6 },
    { title: "Performance", rating: 4.8 },
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
                i < 5 ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="ml-2">4.6/5</span>
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
