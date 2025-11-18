import Banner from "@/components/sections/Banner";
import Experts from "@/components/sections/Experts";
import Featured from "@/components/sections/Featured";
import Functions from "@/components/sections/Functions";
import Stories from "@/components/sections/Stories";

export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
      <Functions />
      <Stories />
      <Experts/>
    </div>
  );
}
