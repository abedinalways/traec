"use client";
import Image from "next/image";
import React from "react";

// --- Interfaces and Data (Using the JSON structure) ---

// Define the TypeScript interface for a single category item
interface Category {
  id: string;
  name: string;
  imageUrl: string;
  bgColorClass: string; // Tailwind class for the pastel background
}

// Data updated to use placeholder images that visually match the original screenshot content.
const categoriesData: Category[] = [
  {
    id: "dj_services",
    name: "DJ Services",
    // Placeholder for DJ mixing board
    imageUrl: "/images/featured01.png",
    bgColorClass: "bg-green-50", // Slightly more prominent light green
  },
  {
    id: "decorators",
    name: "Decorators",
    // Placeholder for wedding arch/decor
    imageUrl: "/images/featured02.png",
    bgColorClass: "bg-orange-50", // Light peach/pinkish background
  },
  {
    id: "catering",
    name: "Catering",
    // Placeholder for catered appetizers on a tray
    imageUrl: "/images/featured03.png",
    bgColorClass: "bg-cyan-50", // Light blue/mint background
  },
  {
    id: "rentals",
    name: "Rentals",
    // Placeholder for people holding hands/items
    imageUrl: "/images/featured04.png",
    bgColorClass: "bg-purple-50/70", // Light purple background
  },
  {
    id: "photography",
    name: "Photography",
    // Placeholder for a camera
    imageUrl: "/images/featured05.png",
    bgColorClass: "bg-pink-50", // Light pink background
  },
  {
    id: "entertainment",
    name: "Entertainment",
    // Placeholder for people partying/clubbing
    imageUrl: "/images/featured06.png",
    bgColorClass: "bg-indigo-50", // Light lavender background
  },
];

// Mock for CarouselItem - wraps content in a fixed card size for infinite stability
const CarouselItem: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => (
  // Using a fixed width of 200px for reliable infinite loop scrolling calculation
  <div className={`min-w-0 flex-[0_0_auto] w-[200px] ${className}`}>
    {children}
  </div>
);

// Mock for Card - the main container for each category
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <div
    className={`rounded-xl transition-shadow duration-300 overflow-hidden cursor-pointer bg-white ${className}`}
  >
    {children}
  </div>
);

// Mock for Button (Navigation)
const Button: React.FC<
  React.PropsWithChildren<{ onClick: () => void; className?: string }>
> = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg border border-gray-100 hover:scale-105 transition-all duration-200 ${className}`}
    aria-label="Navigation Button"
  >
    {children}
  </button>
);

const CategoryCarousel = () => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Define dimensions for infinite scroll stability
  const CARD_WIDTH = 200; // Matches w-[200px] in CarouselItem
  const GAP_WIDTH = 20; // Matches space-x-5 (1.25rem)
  const ITEM_WIDTH = CARD_WIDTH + GAP_WIDTH; // 220px total space per item
  const dataLength = categoriesData.length;
  const TRANSITION_WIDTH = dataLength * ITEM_WIDTH; // Width of one full block of data

  // Duplicate the data 3 times: [A][B][C] for seamless looping
  const categoriesToRender = React.useMemo(() => {
    return [...categoriesData, ...categoriesData, ...categoriesData];
  }, []);

  // Scrolls forward by one item's width
  const scrollNext = React.useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: ITEM_WIDTH, behavior: "smooth" });
    }
  }, [ITEM_WIDTH]);

  // Scrolls backward by one item's width
  const scrollPrev = React.useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -ITEM_WIDTH, behavior: "smooth" });
    }
  }, [ITEM_WIDTH]);

  // --- Auto-Run Logic (Scrolls every 3 seconds) ---
  React.useEffect(() => {
    // Only run the interval if the data is present
    if (categoriesData.length === 0) return;

    const intervalId = setInterval(scrollNext, 3000); // Scroll every 3 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [scrollNext]);

  // --- Infinite Wrap Logic (The key to seamless looping) ---
  const handleScroll = React.useCallback(() => {
    if (!carouselRef.current) return;

    const { scrollLeft } = carouselRef.current;

    // Check if we have scrolled past the middle block (Block B -> Block C)
    // If scrollLeft is greater than or equal to the start of the third block (2 * TRANSITION_WIDTH)
    if (scrollLeft >= 2 * TRANSITION_WIDTH) {
      // Jump instantly back to the beginning of the middle block (Block B)
      carouselRef.current.scrollLeft = TRANSITION_WIDTH;
    }

    // Check if we have scrolled backward into the first block (Block B -> Block A)
    // We check if it's less than the start of the middle block minus the width of one item
    else if (scrollLeft < TRANSITION_WIDTH - ITEM_WIDTH) {
      // Jump instantly to the equivalent position at the end of the middle block (Block B's last item)
      // This is necessary because `scrollBy` might overshoot the ideal wrap point when scrolling manually backwards.
      carouselRef.current.scrollLeft = 2 * TRANSITION_WIDTH - ITEM_WIDTH;
    }
  }, [TRANSITION_WIDTH, ITEM_WIDTH]);

  // Effect to set the initial scroll position to the start of the middle block (B)
  React.useEffect(() => {
    if (carouselRef.current) {
      // Wait for the layout to render, then jump to the middle block
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = TRANSITION_WIDTH;
        }
      }, 0);
    }
  }, [TRANSITION_WIDTH]);

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto font-[inter]">
      <div className="relative">
        <div
          ref={carouselRef}
          // Attach the infinite wrap logic to the scroll event
          onScroll={handleScroll}
          // Using space-x-5 (20px gap) for clean calculation: 200px card + 20px gap = 220px ITEM_WIDTH
          className="flex space-x-5 overflow-x-scroll no-scrollbar py-2 scroll-smooth touch-pan-x"
        >
          {categoriesToRender.map((category, index) => (
            <CarouselItem key={`${category.id}-${index}`}>
              {" "}
              {/* Unique key for duplicated items */}
              <Card>
                <div className="relative w-full h-[180px]">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="w-full h-full object-cover rounded-t-xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://placehold.co/600x400/CCCCCC/333333?text=Image+Error";
                    }}
                  />
                  <div className="absolute inset-0 shadow-[inset_0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-xl"></div>
                </div>

                <div
                  className={`py-3 px-2 text-center ${category.bgColorClass} rounded-b-xl border-t border-gray-100`}
                >
                  <p className="text-sm font-medium text-gray-800 select-none">
                    {category.name}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </div>

        {/* Manual Navigation Buttons - Remains functional for user interaction */}
        {/* Left Button */}
        <Button onClick={scrollPrev} className="left-[-19]">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </Button>

        {/* Right Button */}
        <Button onClick={scrollNext} className="right-[-22]">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Button>
      </div>

      {/* Hidden scrollbar styling for the flex container */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};
export default CategoryCarousel;
