import React from "react";
import BecomeProviderBanner from "../_components/becomeProvider/BecomeProviderBanner";
import FunctionCard from "@/components/reusable/FunctionCard";
import Experts from "@/components/home/Experts";
import FAQ from "@/components/home/FAQ";
import JoinAsProvider from "@/components/home/JoinAsProvider";

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
      <Experts />
      <JoinAsProvider />
      <FAQ />
    </div>
  );
}
