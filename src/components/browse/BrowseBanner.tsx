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
        
          { label: "Catering & Food Services" },
          { label: "Decor & Event Design" },
          { label: "Entertainment" },
          { label: "Photography & Videography" },
          { label: "Rentals" },
          { label: "Venues" },
        
      ]}
    />
  );
};

export default BrowseBanner;
