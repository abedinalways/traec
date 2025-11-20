import React from "react";
import { Banner } from "../reusable/Banner";

const BrowseBanner = () => {
  return (
    <Banner
      title="Browse Event Services"
      subtitle="Find the perfect service for your party from hundreds of options"
      placeholder="What type of Service do you need?"
      bannerRocket="/images/banner/rocket.png"
      bannerStar="/images/banner/star.png"
      bannerMola="/images/banner/mola.png"
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
