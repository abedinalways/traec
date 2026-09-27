import { MapPinIcon } from "lucide-react";
import StarIcon from "../icons/StarIcon";
import Image from "next/image";

interface ProviderCardProps {
  name: string;
  role: string;
  location: string;
  rating: string;
  reviews: string;
  image: string;
}

const ProviderCard = ({
  name,
  role,
  location,
  rating,
  reviews,
  image,
}: ProviderCardProps) => (
  <div className="bg-white p-3 rounded-2xl shadow-sm flex flex-col gap-3">
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
      <Image src={image} alt={name} fill className="object-cover" unoptimized/>
    </div>
    <div className="px-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-[#1a2b4b] text-[16px]">{name}</h4>
        <span className="text-gray-400 text-[12px] font-medium">{role}</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-gray-500 text-[13px]">
          <MapPinIcon size={14} className="text-gray-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-[13px]">{rating}</span>
          <span className="text-gray-400 text-[13px]">({reviews})</span>
        </div>
      </div>
      <button className="w-full py-2.5 rounded-lg bg-[#f8fafc] text-[#1a2b4b] font-semibold text-[14px] border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer">
        View Profile
      </button>
    </div>
  </div>
);
export default ProviderCard;
