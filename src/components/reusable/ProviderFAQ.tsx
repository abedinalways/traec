import React from "react";
import Accordion04 from "../ui/accordion04";


const ProviderFAQ = () => {
  return (
    <div className="bg-gradient-to-b from-[#FDF4F4] to-[#FCEFEF] py-10">
      <h2 className="text-4xl md:text-[48px] text-center font-bold text-gray-900 leading-tight font-[glory]">
        Frequently Asked{" "}
        <span className="text-gradient italic font-[glory] font-semibold px-1">
          Questions
        </span>
      </h2>
      <p className="text-gray-600 text-center text-sm md:text-md max-w-2xl mx-auto  py-5">
        Hear from satisfied customers and successful service providers.
      </p>
      <div className=" flex flex-col gap-4 px-2 md:px-4 mx-auto max-w-3xl pt-10">
        <Accordion04 />
      </div>
      
    </div>
  );
};

export default ProviderFAQ;
