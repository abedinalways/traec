"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import LocationIcon from "../icons/LocationIcon";
import { PublicCategoryItem, useGetPublicCategoriesQuery } from "@/app/api/categories/publicCategoryApi";


interface FiltersSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (value: string) => void;
}

export default function FiltersSidebar({
  activeCategory,
  onCategoryChange,
  onSearchChange,
}: FiltersSidebarProps) {
  const [openCategories, setOpenCategories] = useState(true);
  const [openRadius, setOpenRadius] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openLocation, setOpenLocation] = useState(true);


  const { data: categoryResponse } = useGetPublicCategoriesQuery();
  const categoriesList = categoryResponse?.data || [];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const locationTags = [
    "Banquet halls",
    "Beaches",
    "Ballrooms",
    "Villas",
    "Outdoor spaces",
  ];

  const toggleTag = (label: string) => {
    setSelectedTags((prev) =>
      prev.includes(label)
        ? prev.filter((tag) => tag !== label)
        : [...prev, label],
    );
  };

  return (
    <aside className="w-full md:w-72 bg-[#FBFCFD] rounded-3xl shadow-sm p-6 space-y-8 border border-gray-200 font-[inter]">
      <h2 className="text-xl font-semibold">Filters</h2>

      {/* Location */}
      <CollapsibleSection
        title="Location"
        isOpen={openLocation}
        onToggle={() => setOpenLocation((prev) => !prev)}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city, state, or zip code"
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300 placeholder:text-xs outline-none"
          />
          <LocationIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {locationTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              active={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Dynamic All Categories */}
      <CollapsibleSection
        title="All Categories"
        isOpen={openCategories}
        onToggle={() => setOpenCategories((prev) => !prev)}
      >
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {categoriesList.map((cat: PublicCategoryItem) => (
            <label
              key={cat.id}
              onClick={() =>
                onCategoryChange(activeCategory === cat.name ? "" : cat.name)
              }
              className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer select-none py-1 hover:text-black transition-colors"
            >
              <Checkbox checked={activeCategory === cat.name} />
              {cat.name}
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Search Radius */}
      <CollapsibleSection
        title="Search Radius"
        isOpen={openRadius}
        onToggle={() => setOpenRadius((prev) => !prev)}
      >
        <div className="relative">
          <select className="w-full h-12 pl-4 pr-10 rounded-xl border border-gray-300 appearance-none text-gray-700 outline-none">
            <option>Within 10 miles</option>
            <option>Within 20 miles</option>
            <option>Within 50 miles</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
          />
        </div>
      </CollapsibleSection>

      {/* Price Range */}
      <CollapsibleSection
        title="Price Range"
        isOpen={openPrice}
        onToggle={() => setOpenPrice((prev) => !prev)}
      >
        <div className="space-y-3">
          <Slider defaultValue={[200]} max={600} step={10} />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>$600</span>
          </div>
        </div>
      </CollapsibleSection>
    </aside>
  );
}

function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <button
        onClick={onToggle}
        className="flex justify-between w-full text-lg font-medium cursor-pointer items-center"
      >
        {title}
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isOpen && <div className="space-y-4">{children}</div>}
    </div>
  );
}

function Tag({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full cursor-pointer text-sm border transition-all duration-200 flex items-center gap-1 ${
        active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {active && (
        <Check size={14} className="bg-white text-black rounded-full p-0.5" />
      )}
      {label}
    </button>
  );
}
