import React from "react";
import BecomeProviderBanner from "../_components/becomeProvider/BecomeProviderBanner";
import FunctionCard from "@/components/reusable/FunctionCard";

export default function BecomeProviderPage() {
  return (
    <div>
      <BecomeProviderBanner />
      <div className="bg-[#FFF5E8] py-20">
        <h2 className="text-4xl lg:text-5xl font-bold text-center">
          How Evoke{" "}
          <span className="text-gradient italic font-serif">Works</span>
        </h2>
        <p className=" mt-4 max-w-lg mx-auto text-center font-[inter] ">
          Join InFlatables and connect with thousands of customers looking for
          your party services
        </p>
        <div className="custom-container">
          <FunctionCard />
        </div>
      </div>
      <div className="custom-container py-10">
        <div
          className="
    border-b-2 border-r-2 border-transparent  bg-linear-to-r from-[#FF2A24] to-[#FFAC47] 
            [mask:border-box] rounded-lg "
        >
          <div className="bg-white rounded-lg p-4">Your content</div>
          <div className="bg-white rounded-lg p-4">Your content</div>
          <div className="bg-white rounded-lg p-4">Your content</div>
          <div className="bg-white rounded-lg p-4">Your content</div>
        </div>
      </div>
    </div>
  );
}
