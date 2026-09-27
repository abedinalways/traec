"use client";
import React, { useState } from "react";
import BrowseBanner from "@/components/browse/BrowseBanner";
import ServiceListing from "@/components/browse/ServiceListing";

const BrowsePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="font-[inter]">
      <BrowseBanner
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <ServiceListing />
    </div>
  );
};

export default BrowsePage;
