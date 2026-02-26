import React from "react";
import TestimonialCarousel from "../reusable/TestimonialCarousel";

const Testimonial = () => {
  return (
    <div className=" bg-[#FFFBF7] py-16">
      <h2 className="text-4xl md:text-[48px] text-center font-bold text-gray-900 leading-tight font-[glory]">
        What Our{" "}
        <span className="text-gradient font-[brittney]">Customers Say</span>
      </h2>
      <p className="text-gray-600 text-center text-sm md:text-md max-w-2xl mx-auto font-[inter]">
        Hear from satisfied customers and successful service providers.
      </p>
      <div className="custom-container flex flex-col gap-4 px-6 md:px-8">
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default Testimonial;
