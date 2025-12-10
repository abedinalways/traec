import React from "react";
import { Banner } from "../reusable/Banner";

const BrowseBanner = () => {
  return (
    <Banner
      title="Browse Event Services"
      subtitle="Find the perfect evoke for your party from hundreds of options"
      placeholder="What type of Service do you need?"
      decorationLeft="/left-decoration.png"
      decorationRight="/right-decoration.png"
      backgroundImage="/images/banner.png"
      buttons={[
        { label: "Catering" },
        { label: "DJ Services" },
        { label: "Decorators" },
        { label: "Rentals" },
        { label: "Photography" },
        { label: "Entertainment" },
      ]}
    />
  );
};

export default BrowseBanner;
