import React from "react";
import CategoryCarousel from "../reusable/CategoryCarousel";

const Featured = () => {
  return (
    <div className="custom-container py-16">
      <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-900 leading-tight font-[glory]">
        Featured{" "}
        <span className="text-gradient italic font-serif">Services</span>
      </h2>
      <div>
        <CategoryCarousel />
      </div>
    </div>
  );
};

export default Featured;
