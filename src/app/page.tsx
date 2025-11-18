import Banner from "@/components/home/Banner";
import Experts from "@/components/home/Experts";
import Featured from "@/components/home/Featured";
import Functions from "@/components/home/Functions";
import JoinAsProvider from "@/components/home/JoinAsProvider";
import Stories from "@/components/home/Stories";


export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
      <Functions/>
      <Stories/>
      <Experts />
      <JoinAsProvider/>
    </div>
  );
}
