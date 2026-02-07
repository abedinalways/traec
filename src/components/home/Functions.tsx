import React from "react";
import FunctionCard from "../reusable/FunctionCard";

const Functions = () => {
  return (
    <div className="bg-[#fdf7ee] px-2 md:px-4 py-12 mx-2 md:mx-0">
      <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-900 leading-tight font-[glory]">
        How Evoke <span className="text-gradient italic font-serif">Works</span>
      </h2>
      <p className="text-sm md:text-md text-center font-[inter]">
        Simple steps to book trusted event professionals from DJs and <br />{" "}
        caterers to decorators and venues all in one place.
      </p>
      <div className="custom-container">
        <FunctionCard />
      </div>
    </div>
  );
};

export default Functions;
