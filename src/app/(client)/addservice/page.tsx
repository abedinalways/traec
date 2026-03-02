"use client";

import { useState } from "react";
import { ChevronLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import LeftIcon from "@/components/icons/LeftIcon";

export default function Page() {
  const [basicFeatures, setBasicFeatures] = useState([""]);
  const [standardFeatures, setStandardFeatures] = useState([""]);
  const [premiumFeatures, setPremiumFeatures] = useState([""]);

  // IMAGE UPLOAD STATE (5 boxes)
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  // Upload Action for a Single Box
  const handleSingleImageUpload = (e: any, index: number) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate Type
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Only JPG/PNG files allowed");
      return;
    }

    // Validate Size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB");
      return;
    }

    // Read File
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...images];
      updated[index] = reader.result as string;
      setImages(updated);
    };
    reader.readAsDataURL(file);
  };

  // Remove image from box
  const removeImage = (index: number) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-[inter]">
      {/* Back Button */}
      <Link
        href={"/provider-dashboard"}
        className="flex items-center max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border  text-gray-black-400 mb-4 text-[16px]"
      >
        <LeftIcon />
        Back To Account
      </Link>

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold mb-3">Add Service</h1>
      <p className="text-gray-500 mb-6">
        Update your service details and pricing
      </p>

      {/* MAIN FORM BOX */}
      <div className="border rounded-2xl p-6 bg-white shadow-sm">
        {/* SECTION TITLE */}
        <h2 className="text-lg font-semibold mb-5">Service Details</h2>
        <p className="text-xs text-gray-500 mb-6">Tell us about your Service</p>

        {/* SERVICE INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Service Title */}
          <div>
            <label className="text-sm text-gray-600">Service Title</label>
            <input
              type="text"
              placeholder="Enter Service Name"
              className="w-full mt-1 border rounded-xl p-3 text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select className="w-full mt-1 border rounded-xl p-3 text-sm">
              <option>Enter Category Name</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full mt-1 border rounded-xl p-3 text-sm"
            />
          </div>

          {/* Event Duration */}
          <div>
            <label className="text-sm text-gray-600">Event Duration</label>
            <select className="w-full mt-1 border rounded-xl p-3 text-sm">
              <option>e.g 8 Hr</option>
            </select>
          </div>
        </div>

        {/* About Service */}
        <div className="mb-8">
          <label className="text-sm text-gray-600">About Service</label>
          <textarea
            placeholder="Write here..."
            className="w-full mt-1 border rounded-xl p-3 text-sm h-28"
          ></textarea>
        </div>

        {/* ===========================  
                PRICING TIERS  
        =========================== */}
        <h3 className="text-base font-semibold mb-3">Service Pricing Tiers</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <PricingCard
            title="Basic"
            features={basicFeatures}
            setFeatures={setBasicFeatures}
          />

          <PricingCard
            title="Standard"
            tag="Most Popular"
            features={standardFeatures}
            setFeatures={setStandardFeatures}
          />

          <PricingCard
            title="Premium"
            features={premiumFeatures}
            setFeatures={setPremiumFeatures}
          />
        </div>

        {/* ===========================  
                MULTIPLE UPLOAD BOXES  
        =========================== */}
        <h3 className="text-sm font-medium mb-2">Upload Image</h3>

        <div className="flex gap-3 mb-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <label
              key={index}
              className="w-16 h-16 rounded-xl border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 relative"
            >
              {/* Hidden Input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSingleImageUpload(e, index)}
              />

              {/* Show Preview or Plus Icon */}
              {images[index] ? (
                <>
                  <img
                    src={images[index] as string}
                    className="w-full h-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow"
                  >
                    <X size={12} />
                  </button>
                </>
              ) : (
                <Plus size={20} className="text-gray-400" />
              )}
            </label>
          ))}
        </div>

        {/* ===========================  
           UPDATED BIG DRAG & DROP BOX  
        =========================== */}
        <div
          className="border border-dashed rounded-xl py-10 text-center text-gray-600 text-sm mb-8 cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleSingleImageUpload(
              { target: { files: e.dataTransfer.files } },
              0,
            );
          }}
          onClick={() => document.getElementById("dragDropInput")?.click()}
        >
          <div className="flex justify-center mb-2">
            <Plus size={30} className="text-gray-400" />
          </div>

          <p className="text-gray-600 font-medium">Drag & drop Image here</p>

          <p className="text-xs text-gray-400 mt-1">
            Upload up to 5 photos (JPG, PNG, max 5MB each)
          </p>

          <input
            type="file"
            id="dragDropInput"
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => handleSingleImageUpload(e, 0)}
          />
        </div>

        {/* TOGGLES */}
        <div className="flex items-center gap-10 mb-6">
          <Toggle label="Feature this service" />
          <Toggle label="Service is active" />
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900">
            Create Service
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================================================
                SUB COMPONENTS
=================================================== */

function PricingCard({ title, tag, features, setFeatures }: any) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{title}</h3>
        {tag && (
          <span className="bg-black text-white px-2 py-1 rounded-md text-xs">
            {tag}
          </span>
        )}
      </div>

      <input
        type="text"
        placeholder="e.g $250"
        className="w-full border rounded-xl p-3 text-sm mb-3"
      />

      <textarea
        placeholder="Write Description here..."
        className="w-full border rounded-xl p-3 text-sm h-20 mb-3"
      ></textarea>

      <label className="text-xs text-gray-500">Features</label>

      <div className="space-y-2 mt-2">
        {features.map((item: string, index: number) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              className="w-full border rounded-xl p-2 text-xs"
              placeholder="Enter feature..."
              value={item}
              onChange={(e) => {
                const updated = [...features];
                updated[index] = e.target.value;
                setFeatures(updated);
              }}
            />

            <button
              className="text-gray-400 hover:text-red-500"
              onClick={() => {
                const updated = features.filter((_: string, i: number) => i !== index);
                setFeatures(updated);
              }}
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <button
          className="border rounded-md px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
          onClick={() => setFeatures([...features, ""])}
        >
          + Add Features
        </button>
      </div>
    </div>
  );
}

function Toggle({ label }: any) {
  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setOn(!on)}
        className={`w-10 h-6 flex items-center rounded-full transition ${
          on ? "bg-black" : "bg-gray-300"
        }`}
      >
        <span
          className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
            on ? "translate-x-4" : "translate-x-1"
          }`}
        ></span>
      </button>

      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
