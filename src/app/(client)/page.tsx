/** @format */

import Banner from "@/components/home/Banner";
import Experts from "@/components/home/Experts";
import FAQ from "@/components/home/FAQ";
import Featured from "@/components/home/Featured";
import Functions from "@/components/home/Functions";

import JoinAsProvider from "@/components/home/JoinAsProvider";
import Locations from "@/components/home/Locations";
import Stories from "@/components/home/Stories";
import Testimonial from "@/components/home/Testimonial";

export default function Home() {
  return (
    <div className="relative">
      <Banner />
      <Featured/>
      <Functions/>
      <Stories />
      <Experts />
      <JoinAsProvider />
      <Locations />
      <Testimonial />
      <FAQ />
    </div>
  );
}
