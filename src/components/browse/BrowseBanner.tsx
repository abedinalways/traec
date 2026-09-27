"use client";


import { PublicCategoryItem, useGetPublicCategoriesQuery } from "@/app/api/categories/publicCategoryApi";
import { Banner } from "../reusable/Banner";

interface BrowseBannerProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const BrowseBanner = ({
  selectedCategory = "",
  onCategorySelect = () => {},
}: BrowseBannerProps) => {
  const { data: categoryResponse, isLoading } = useGetPublicCategoriesQuery();

  const categoriesList = categoryResponse?.data || [];

  const dynamicButtons = categoriesList.map((cat: PublicCategoryItem) => ({
    label: cat.name,
    onClick: () => {
      onCategorySelect(selectedCategory === cat.name ? "" : cat.name);
    },
  }));

  return (
    <Banner
      title="Browse Event Services"
      subtitle="Find the perfect evoke for your party from hundreds of options"
      placeholder="What type of Service do you need?"
      decorationLeft="/left-decoration.png"
      decorationRight="/right-decoration.png"
      backgroundImage="/images/banner.png"
      buttons={
        isLoading ? [{ label: "Loading Categories..." }] : dynamicButtons
      }
    />
  );
};

export default BrowseBanner;
