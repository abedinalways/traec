import {
  PencilIcon,
  SearchIcon,
  CheckCircleIcon,
  StarIcon,
} from "lucide-react"; // Assuming lucide-react or similar for icons
import Image from "next/image";
import EditIcon from "../icons/EditIcon";

function HomepageSection() {
  return (
    <div className=" p-8 min-h-screen font-[inter] ">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#030914]">
          Manage Homepage Sliders & Banners
        </h2>
        <button className="text-gray-600 hover:text-black transition-colors cursor-pointer">
          <EditIcon/>
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[1, 2, 3].map((id) => (
          <div key={id} className="relative aspect-[16/9] w-full">
            <Image
              src={`/images/cms/img000${id}.png`}
              alt={`Slide ${id}`}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        ))}
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Headline */}
        <div>
          <label className="block text-[13px] text-gray-500 mb-2 ml-1">
            Headline
          </label>
          <input
            className="w-full p-4 rounded-lg bg-white border-none shadow-sm text-[15px] focus:ring-1 focus:ring-blue-400 outline-none"
            defaultValue="Elevate Your Event with Premium Evoke"
          />
        </div>

        {/* Sub Headline */}
        <div>
          <label className="block text-[13px] text-gray-500 mb-2 ml-1">
            Sub Headline
          </label>
          <textarea
            className="w-full p-4 rounded-lg bg-white border-none shadow-sm text-[14px] leading-relaxed h-24 focus:ring-1 focus:ring-blue-400 outline-none resize-none"
            defaultValue="Discover everything you need to plan the perfect event from DJs, caterers, and decorators to venues, rentals, and entertainment. Connect with trusted providers and bring your celebration vision to life effortlessly."
          />
        </div>

        {/* CTA 1 */}
        <div>
          <label className="block text-[13px] text-gray-500 mb-2 ml-1">
            CTA Button
          </label>
          <div className="relative">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              className="w-full py-4 pl-11 pr-4 rounded-lg bg-white border-none shadow-sm text-[14px] focus:ring-1 focus:ring-blue-400 outline-none"
              placeholder="What type of Service do you need?"
            />
          </div>
        </div>

        {/* CTA 2 */}
        <div>
          <label className="block text-[13px] text-gray-500 mb-2 ml-1">
            CTA Button
          </label>
          <input
            className="w-full p-4 rounded-lg bg-white border-none shadow-sm text-[14px] focus:ring-1 focus:ring-blue-400 outline-none font-medium"
            defaultValue="Find Event Services"
          />
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-8 pt-2">
          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <CheckCircleIcon size={22} className="text-[#33ccff]" />
            <span>10,000+ Happy Customers</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <StarIcon size={22} className="text-[#ffb400]" />
            <span>4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <CheckCircleIcon size={22} className="text-[#00d084]" />
            <span>500+ Verified Providers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageSection;
