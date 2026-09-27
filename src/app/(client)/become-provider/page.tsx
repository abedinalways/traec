import React from "react";
import BecomeProviderBanner from "../_components/becomeProvider/BecomeProviderBanner";

import Experts from "@/components/home/Experts";

import JoinAsProvider from "@/components/home/JoinAsProvider";
import FunctionCards from "../_components/becomeProvider/FunctionCards";
import ProviderFAQ from "@/components/reusable/ProviderFAQ";

export default function BecomeProviderPage() {
  return (
    <div>
      <BecomeProviderBanner />
      <div className="bg-[#FFF5E8] py-20 font-[inter]">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-[glory]">
          How Evoke{" "}
          <span className="text-gradient font-[brittney]">Works</span>
        </h2>
        <p className=" mt-4 max-w-lg mx-auto text-center font-[inter] ">
          Join InFlatables and connect with thousands of customers looking for
          your party services
        </p>
        <div className="custom-container">
          <FunctionCards/>
        </div>
      </div>
      <Experts />
      <JoinAsProvider />
      <ProviderFAQ />
    </div>
  );
}
