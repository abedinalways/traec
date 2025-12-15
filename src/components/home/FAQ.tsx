import React from "react";
import Accordion04 from "../ui/accordion04";
import Subscribe from "./Subscribe";

const FAQ = () => {
  return (
    <div className="bg-linear-to-r from-[#faf3f0] to-[#f6e2e2] py-10 ">
      <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-900 leading-tight font-[glory]">
        Frequently Asked{" "}
        <span className="text-gradient italic font-serif">Questions</span>
      </h2>
      <p className="text-gray-600 text-center text-sm md:text-md max-w-2xl mx-auto  py-5">
        Hear from satisfied customers and successful service providers.
      </p>
      <div className=" flex flex-col gap-4 px-2 md:px-4 mx-auto max-w-3xl pt-10">
        <Accordion04 />
      </div>
      <div className="-mb-42 md:-mb-52 lg:-mb-56">
        <Subscribe />
      </div>
    </div>
  );
};

export default FAQ;
