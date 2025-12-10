"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ITestimonial {
  id: string;
  name: string;
  title: string;
  avatar: string;
  review: string;
  rating: number;
}

const testimonials: ITestimonial[] = [
  {
    id: "1",
    name: "Albert Flores",
    title: "CEO, ConcreteX",
    avatar: "/images/avatar01.png",
    review:
      "“Tour annual company gala was a huge success thanks to the amazing team we found on EventHub. Professional, reliable and creative - everything we needed in one place.”",
    rating: 5,
  },
  {
    id: "2",
    name: "Jane Cooper",
    title: "CEO, Aura Media",
    avatar: "/images/avatar02.png",
    review:
      "“Tour annual company gala was a huge success thanks to the amazing team we found on EventHub. Professional, reliable and creative - everything we needed in one place.”",
    rating: 5,
  },
];

const CarouselItem: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => (
  // use min-w instead of fixed width for better mobile behavior
  <div className={`shrink-0 max-w-[90%] md:max-w-[500px] ${className}`}>
    {children}
  </div>
);

const TestimonialCarousel = () => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: carouselRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: -carouselRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative md:mx-auto py-10">
      {/* SCROLLABLE WRAPPER */}
      <div
        ref={carouselRef}
        className="
          flex gap-6
          overflow-x-auto overflow-y-hidden
          no-scrollbar scroll-smooth px-6 -mx-6
          touch-pan-x
          snap-x snap-mandatory
        "
        // inline style to ensure iOS uses native momentum scrolling
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          // prevents parent from catching the overscroll on mobile
          overscrollBehaviorX: "contain",
        }}
      >
        {testimonials.map((item) => (
          <CarouselItem key={item.id}>
            <Card className="rounded-2xl border p-6 bg-white shadow-sm snap-start">
              <CardContent className="space-y-4 p-0 relative">
                <div className="flex justify-between items-start">
                  <Image
                    src="/images/quote.png"
                    width={60}
                    height={60}
                    alt=""
                    className="opacity-80"
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

                <p className="text-gray-700 text-base leading-relaxed">
                  {item.review}
                </p>

                <div className="flex gap-1 pt-2">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

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

      {/* LEFT BUTTON */}
      <Button
        onClick={scrollPrev}
        size="icon"
        className="
          hidden md:flex
          absolute -left-4 top-1/2 text-3xl pb-2 -translate-y-1/2
          rounded-full btn-gradient text-white shadow-lg
          w-10 h-10
        "
      >
        ‹
      </Button>

      {/* RIGHT BUTTON */}
      <Button
        onClick={scrollNext}
        size="icon"
        className="
          hidden md:flex
          text-3xl
          absolute -right-4 top-1/2 pb-2 -translate-y-1/2
          rounded-full btn-gradient text-white shadow-lg
          w-10 h-10
        "
      >
        ›
      </Button>

      {/* Mobile buttons (below carousel) */}
      <div className="flex justify-center mt-6 gap-4 md:hidden">
        <Button
          onClick={scrollPrev}
          className="rounded-full btn-gradient text-white w-10 h-10"
        >
          ‹
        </Button>
        <Button
          onClick={scrollNext}
          className="rounded-full btn-gradient text-white w-10 h-10"
        >
          ›
        </Button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        /* Helper class for touch pan (Tailwind doesn't include touch-action by default) */
        .touch-pan-x { touch-action: pan-x; }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;
