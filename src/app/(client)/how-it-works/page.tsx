import { Banner as Howbanner } from "@/components/reusable/Banner";
import Main from "@/components/howitwork/main";
import Banner from "@/components/howitwork/banner";
import Testimonial from "@/components/home/Testimonial";

export default function HowItWorks() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden  py-6 space-y-14">
      <Howbanner
        title="How Evoke Works"
        subtitle="From browsing to bouncing in just 4 simple steps. We make renting evokes easy, safe, and stress-free for your perfect party."
        decorationLeft="/images/banner/right.png"
        decorationRight="/images/banner/left.png"
        backgroundImage="/images/banner.png"
        haveSearchbar={false}
      />

      <div className="w-full max-w-7xl mx-auto overflow-x-hidden">
        <Main />
      </div>

      <div className="w-full max-w-7xl mx-auto overflow-x-hidden">
        <Banner />
      </div>

      <div className="w-full max-w-7xl mx-auto mb-10 overflow-x-hidden">
        <Testimonial />
      </div>
    </main>
  );
}
