import React from 'react';
import TestimonialCarousel from '../reusable/TestimonialCarousel';

const Testimonial = () => {
  return (
    <div className=" bg-[#FFFBF7] py-16">
      <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-900 leading-tight font-[glory]">
        What Our{' '}
        <span className="text-gradient italic font-serif">Customers Say</span>
      </h2>
      <p className="text-gray-600 text-center text-sm md:text-md max-w-2xl mx-auto">
        Hear from satisfied customers and successful service providers.
      </p>
      <div className="custom-container flex flex-col gap-4 px-4 md:px-0">
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default Testimonial;