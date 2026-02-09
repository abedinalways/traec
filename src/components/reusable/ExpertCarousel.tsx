'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';

// --- Interfaces and Data ---

interface Provider {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  location: string;
  rating: number;
  reviewCount: number;
}

const providersData: Provider[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Wedding Photographer',
    imageUrl:
      '/images/experts/experts01.png',
    location: 'New York NY',
    rating: 4.9,
    reviewCount: 234,
  },
  {
    id: '2',
    name: 'Jenny Wilson',
    title: 'Event Manager',
    imageUrl:
      '/images/experts/experts04.png',
    location: 'New York NY',
    rating: 4.9,
    reviewCount: 234,
  },
  {
    id: '3',
    name: 'Cody Fisher',
    title: 'DJ',
    imageUrl:
      '/images/experts/experts02.png',
    location: 'New York NY',
    rating: 4.9,
    reviewCount: 234,
  },
  {
    id: '4',
    name: 'Floyd Miles',
    title: 'Catering',
    imageUrl:
      '/images/experts/experts03.png',
    location: 'New York NY',
    rating: 4.9,
    reviewCount: 234,
  },
  {
    id: '5',
    name: 'Robert Fox',
    title: 'Decorator',
    imageUrl:
      '/images/experts/experts02.png',
    location: 'New York NY',
    rating: 4.9,
    reviewCount: 234,
  },
  {
    id: '6',
    name: 'Eleanor Pena',
    title: 'Entertainment',
    imageUrl:
      '/images/experts/experts04.png',
    location: 'New York NY',
    rating: 4.9,
    reviewCount: 234,
  },
];

// CarouselItem wrapper with fixed width for stable infinite scrolling
const CarouselItem: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => (
  <div className={`min-w-0 flex-[0_0_auto] w-[280px] ${className}`}>
    {children}
  </div>
);

const ExpertsCarousel: React.FC = () => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Define dimensions for infinite scroll stability
  const CARD_WIDTH = 280; // Matches w-[280px] in CarouselItem
  const GAP_WIDTH = 20; // Matches gap-5
  const ITEM_WIDTH = CARD_WIDTH + GAP_WIDTH; // 300px total space per item
  const dataLength = providersData.length;
  const TRANSITION_WIDTH = dataLength * ITEM_WIDTH; // Width of one full block of data

  // Duplicate the data 3 times: [A][B][C] for seamless looping
  const providersToRender = React.useMemo(() => {
    return [...providersData, ...providersData, ...providersData];
  }, []);

  // Scrolls forward by one item's width
  const scrollNext = React.useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: ITEM_WIDTH, behavior: 'smooth' });
    }
  }, [ITEM_WIDTH]);

  // Scrolls backward by one item's width
  const scrollPrev = React.useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -ITEM_WIDTH, behavior: 'smooth' });
    }
  }, [ITEM_WIDTH]);

  // --- Auto-Run Logic (Scrolls every 3 seconds) ---
  React.useEffect(() => {
    if (providersData.length === 0) return;

    const intervalId = setInterval(scrollNext, 3000);
    return () => clearInterval(intervalId);
  }, [scrollNext]);

  // --- Infinite Wrap Logic (The key to seamless looping) ---
  const handleScroll = React.useCallback(() => {
    if (!carouselRef.current) return;

    const { scrollLeft } = carouselRef.current;

    // Check if we have scrolled past the middle block (Block B -> Block C)
    if (scrollLeft >= 2 * TRANSITION_WIDTH) {
      carouselRef.current.scrollLeft = TRANSITION_WIDTH;
    }
    // Check if we have scrolled backward into the first block (Block B -> Block A)
    else if (scrollLeft < TRANSITION_WIDTH - ITEM_WIDTH) {
      carouselRef.current.scrollLeft = 2 * TRANSITION_WIDTH - ITEM_WIDTH;
    }
  }, [TRANSITION_WIDTH, ITEM_WIDTH]);

  // Effect to set the initial scroll position to the start of the middle block (B)
  React.useEffect(() => {
    if (carouselRef.current) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = TRANSITION_WIDTH;
        }
      }, 0);
    }
  }, [TRANSITION_WIDTH]);

  return (
    <div className="p-2  md:p-0 w-full max-w-7xl mx-auto font-sans">
      <div className="relative">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-scroll no-scrollbar py-2 scroll-smooth touch-pan-x"
        >
          {providersToRender.map((provider, index) => (
            <CarouselItem key={`${provider.id}-${index}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative w-full h-[200px] rounded-2xl">
                    <Image
                      fill
                      src={provider.imageUrl}
                      alt={provider.name}
                      className="w-full h-full object-cover p-2 rounded-2xl"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://placehold.co/400x400/CCCCCC/333333?text=No+Image';
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-4 space-y-2">
                    {/* Name */}
                    <h3 className="text-base font-semibold text-gray-900">
                      {provider.name}
                    </h3>

                    {/* Title */}
                    <p className="text-sm text-gray-600">{provider.title}</p>

                    {/* Location and Rating Row */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Location */}
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs">{provider.location}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {provider.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({provider.reviewCount})
                        </span>
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <Button
                      variant="outline"
                      className="w-full mt-3"
                      onClick={() => console.log('View profile:', provider.id)}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          onClick={scrollPrev}
          size="icon"
          variant="secondary"
          className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg border hover:bg-gray-50"
        >
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

        <Button
          onClick={scrollNext}
          size="icon"
          variant="secondary"
          className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg border hover:bg-gray-50"
        >
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

      {/* Hidden scrollbar styling */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ExpertsCarousel;
