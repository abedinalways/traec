'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

// --------------------------------------------------------------------
// Testimonial Data
// --------------------------------------------------------------------
interface Testimonial {
  id: string;
  name: string;
  title: string;
  avatar: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Albert Flores',
    title: 'CEO, ConcreteX',
    avatar: '/images/avatar01.png',
    review:
      '“Tour annual company gala was a huge success thanks to the amazing team we found on EventHub. Professional, reliable and creative - everything we needed in one place.”',
    rating: 5,
  },
  {
    id: '2',
    name: 'Jane Cooper',
    title: 'CEO, Aura Media',
    avatar: '/images/avatar02.png',
    review:
      '“Tour annual company gala was a huge success thanks to the amazing team we found on EventHub. Professional, reliable and creative - everything we needed in one place.”',
    rating: 5,
  },
];

// --------------------------------------------------------------------
// Carousel Item Wrapper
// --------------------------------------------------------------------
const CarouselItem: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => (
  <div className={`min-w-0 flex-[0_0_auto] w-full md:w-[550px] ${className}`}>
    {children}
  </div>
);

// --------------------------------------------------------------------
// Testimonial Carousel Component
// --------------------------------------------------------------------
const TestimonialCarousel = () => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Scroll functions
  const scrollNext = () => {
    carouselRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    carouselRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 relative px-3">
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-scroll no-scrollbar scroll-smooth"
      >
        {testimonials.map(item => (
          <CarouselItem key={item.id}>
            <Card className="rounded-2xl border p-6 bg-white">
              <CardContent className="space-y-4 p-0 relative">
                <div className="flex justify-between">
                  {/* Quote Icon */}
                  <Image
                    src="/images/quote.png"
                    width={60}
                    height={60}
                    alt=""
                    className="w-[60px] h-[60px]"
                  />
                  <div className="w-14 h-14 rounded-full overflow-hidden border">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-700 text-base leading-relaxed">
                  {item.review}
                </p>

                {/* Stars */}
                <div className="flex gap-1 pt-2">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* User */}
                <div className="flex items-center gap-3 pt-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.title}</p>
                  </div>
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
        className="absolute left-[-6] top-1/2 -translate-y-1/2 rounded-full btn-gradient text-white shadow-lg w-10 h-10"
      >
        <span className="text-xl">‹</span>
      </Button>

      <Button
        onClick={scrollNext}
        size="icon"
        className="absolute left-280 top-1/2 -translate-y-1/2 rounded-full btn-gradient text-white shadow-lg w-10 h-10"
      >
        <span className="text-xl">›</span>
      </Button>

      {/* HIDE SCROLLBAR */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;
