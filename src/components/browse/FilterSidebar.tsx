"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, MapPin, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function FiltersSidebar() {
  const [openCategories, setOpenCategories] = useState(true);
  const [openCatering, setOpenCatering] = useState(true);
  const [openRadius, setOpenRadius] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);

  return (
    <aside className="w-full lg:w-68 bg-[#FBFCFD] rounded-3xl shadow-sm p-6 space-y-6 border border-gray-200">
      {/* Filters title */}
      <h2 className="text-xl font-semibold">Filters</h2>

      {/* Location Section */}
      <div className="space-y-2">
        <button className="flex justify-between w-full text-left text-gray-800 text-lg font-medium">
          Location
          <ChevronDown size={18} />
        </button>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city, state, or zip code"
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300"
          />
          <MapPin
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
        </div>

        {/* Location Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          <Tag label="Banquet halls" active />
          <Tag label="Beaches" active />
          <Tag label="Ballrooms" />
          <Tag label="Villas" />
          <Tag label="Outdoor spaces" />
        </div>
      </div>

      {/* All Categories Section */}
      <div className="space-y-2">
        <button
          onClick={() => setOpenCategories(!openCategories)}
          className="flex justify-between w-full text-left text-lg font-medium"
        >
          All Categories
          {openCategories ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {openCategories && (
          <div className="pl-3 space-y-1">
            {/* Catering Subcategory */}
            <button
              onClick={() => setOpenCatering(!openCatering)}
              className="flex items-center gap-2 py-1 text-gray-700"
            >
              {openCatering ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
              Catering
            </button>

            {openCatering && (
              <div className="pl-6 border-l border-gray-200 space-y-2">
                <CheckboxItem label="Full-service catering" defaultChecked />
                <CheckboxItem label="Private chefs" />
                <CheckboxItem label="Food Trucks" />
                <CheckboxItem label="Dessert Tables" />
              </div>
            )}

            <Category label="DJ Services" />
            <Category label="Decorators" />
            <Category label="Rentals" />
            <Category label="Photography" />
            <Category label="Entertainment" />
          </div>
        )}
      </div>

      {/* Search Radius Section */}
      <div className="space-y-2">
        <button
          onClick={() => setOpenRadius(!openRadius)}
          className="flex justify-between w-full text-lg font-medium"
        >
          Search Radius
          {openRadius ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        {openRadius && (
          <div className="relative">
            <select
              className="
                w-full h-12 pl-4 pr-10
                rounded-xl border border-gray-300 
                appearance-none text-gray-700
              "
            >
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
        )}
      </div>

      {/* Price Range Section */}
      <div>
        <button
          onClick={() => setOpenPrice(!openPrice)}
          className="flex justify-between w-full text-lg font-medium"
        >
          Price Range
          {openPrice ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        {openPrice && (
          <div className="mt-3 space-y-3">
            <Slider
              defaultValue={[40]}
              max={100}
              step={1}
              className="[&_.range]:bg-linear-to-r [&_.range]:from-orange-400 [&_.range]:to-pink-500"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>$500</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

/* Tag Component */
function Tag({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-sm border ${
        active
          ? "bg-white text-black flex items-center gap-1 border-black"
          : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {active && (
        <Check size={18} className="text-white p-0.5 bg-black rounded-full" />
      )}{" "}
      {label}
    </span>
  );
}

/* Category Row */
function Category({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 py-1 text-gray-700">
      <ChevronRight size={14} />
      {label}
    </button>
  );
}

/* Checkbox Item */
function CheckboxItem({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-gray-700 text-sm">
      <Checkbox checked={defaultChecked!} /> {label}
    </label>
  );
}
