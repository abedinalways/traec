"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  
  Check,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import LocationIcon from "../icons/LocationIcon";



export default function FiltersSidebar() {
  const [openCategories, setOpenCategories] = useState(true);
  const [openRadius, setOpenRadius] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openLocation, setOpenLocation] = useState(true);


  /* Subcategory state */
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Catering: true,
    "DJ Services": false,
    Decorators: false,
    Rentals: false,
    Photography: false,
    Entertainment: false,
  });

  /* Location Tags */
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (label: string) => {
    setSelectedTags((prev) =>
      prev.includes(label)
        ? prev.filter((tag) => tag !== label)
        : [...prev, label],
    );
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const locationTags = [
    "Banquet halls",
    "Beaches",
    "Ballrooms",
    "Villas",
    "Outdoor spaces",
  ];

  const categoryData = {
    Catering: [
      "Full-service catering",
      "Private chefs",
      "Food Trucks",
      "Dessert Tables",
    ],
    "DJ Services": ["Wedding DJs", "Corporate DJs", "Private Party DJs"],
    Decorators: [
      "Wedding Decor",
      "Corporate Decor",
      "Floral Arrangements",
      "Lighting Design",
    ],
    Rentals: [
      "Furniture Rentals",
      "Tent Rentals",
      "Tableware",
      "Audio Equipment",
    ],
    Photography: [
      "Wedding Photography",
      "Event Photography",
      "Videography",
      "Drone Coverage",
    ],
    Entertainment: ["Live Bands", "Magicians", "Comedians", "Dancers"],
  };

  return (
    <aside className="w-full md:w-72 bg-[#FBFCFD] rounded-3xl shadow-sm p-6 space-y-8 border border-gray-200 font-[inter]">
      <h2 className="text-xl font-semibold">Filters</h2>

      <CollapsibleSection
        title="Location"
        isOpen={openLocation}
        onToggle={() => setOpenLocation((prev) => !prev)}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city, state, or zip code"
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300 placeholder:text-xs"
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

      <CollapsibleSection
        title="All Categories"
        isOpen={openCategories}
        onToggle={() => setOpenCategories((prev) => !prev)}
      >
        {Object.entries(categoryData).map(([section, options]) => (
          <SubCategory
            key={section}
            title={section}
            options={options}
            isOpen={openSections[section]}
            onToggle={() => toggleSection(section)}
          />
        ))}
      </CollapsibleSection>

      <CollapsibleSection
        title="Search Radius"
        isOpen={openRadius}
        onToggle={() => setOpenRadius((prev) => !prev)}
      >
        <div className="relative">
          <select className="w-full h-12 pl-4 pr-10 rounded-xl border border-gray-300 appearance-none text-gray-700">
            <option>Within 10 miles</option>
            <option>Within 20 miles</option>
            <option>Within 50 miles</option>
            <option>Within 100 miles</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Price Range"
        isOpen={openPrice}
        onToggle={() => setOpenPrice((prev) => !prev)}
      >
        <div className="space-y-3">
          <Slider defaultValue={[40]} max={100} step={1} />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>$500</span>
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
        className="flex justify-between w-full text-lg font-medium cursor-pointer"
      >
        {title}
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {isOpen && <div className="space-y-4">{children}</div>}
    </div>
  );
}

function SubCategory({
  title,
  options,
  isOpen,
  onToggle,
}: {
  title: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-gray-700 cursor-pointer"
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {title}
      </button>

      {isOpen && (
        <div className="pl-6 border-l border-gray-200 space-y-2 mt-2">
          {options.map((option) => (
            <CheckboxItem key={option} label={option} />
          ))}
        </div>
      )}
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
          : "bg-white text-gray-700 border-gray-300 hover:border-black"
      }`}
    >
      {active && (
        <Check size={14} className="bg-white text-black rounded-full p-0.5" />
      )}
      {label}
    </button>
  );
}

function CheckboxItem({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      onClick={() => setChecked((prev) => !prev)}
      className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer select-none"
    >
      <Checkbox checked={checked} />
      {label}
    </label>
  );
}
