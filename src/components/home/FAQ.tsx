import React from "react";
import Accordion04 from "../ui/accordion04";

const FAQ = () => {
  return (
    <div className="bg-gradient-to-b from-[#FDF4F4] to-[#FCEFEF] py-10">
      <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-900 leading-tight font-[glory]">
        Frequently Asked{" "}
        <span className="text-gradient italic font-serif">Questions</span>
      </h2>
      <p className="text-gray-600 text-center text-sm md:text-md max-w-2xl mx-auto">
        Hear from satisfied customers and successful service providers.
      </p>
      <div className=" flex flex-col gap-4 px-4 md:px-0">
        <Accordion04 />
      </div>
    </div>
  );
};

export default FAQ;
