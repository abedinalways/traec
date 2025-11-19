'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface BannerButton {
  label: string;
  onClick?: () => void;
}

interface EventBannerProps {
  title: string;
  subtitle?: string;
  placeholder?: string;
  buttons?: BannerButton[];
  className?: string;
  decorationLeft?: string; // image url
  decorationRight?: string; // image url
}

export function Banner({
  title,
  subtitle,
  placeholder = 'Search…',
  buttons = [],
  className,
  decorationLeft,
  decorationRight,
}: EventBannerProps) {
  return (
    <div
      className={cn(
        'relative w-full py-20 flex flex-col items-center text-center bg-gradient-to-r from-orange-50 to-white overflow-hidden',
        className
      )}
    >
      {/* Left Decoration */}
      {decorationLeft && (
        <Image
          src="/images/banner/right.png"
          alt="left"
          width={238}
          height={715}
          className="absolute left-0 top-25 opacity-90"
        />
      )}

      {/* Right Decoration */}
      {decorationRight && (
        <Image
          src="/images/banner/left.png"
          alt=""
          width={150}
          height={150}
          className="absolute right-0 bottom-10 opacity-70"
        />
      )}

      <Image
        src="/images/banner/star.png"
        alt=""
        width={50}
        height={50}
        className="absolute  top-4 opacity-100"
      />
      <Image
        src="/images/banner/mola.png"
        alt=""
        width={50}
        height={50}
        className="absolute  bottom-18 left-50 opacity-100"
      />

      <Image
        src="/images/banner/rocket.png"
        alt=""
        width={50}
        height={50}
        className="absolute  bottom-14 right-90 opacity-100"
      />

      <h1 className="md:text-5xl text-2xl font-bold text-gray-900 font-[glory]">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-gray-600 text-sm max-w-xl font-[inter]">
          {subtitle}
        </p>
      )}

      {/* Search Bar */}
      <div className="mt-8 w-full max-w-xl relative">
        <Input
          placeholder={placeholder}
          className="h-12 rounded-full pl-5 pr-12 bg-white border border-gray-200 shadow-sm"
        />
        <Button className="absolute top-1/2 right-2 -translate-y-1/2 h-9 w-9 rounded-full btn-gradient p-0">
          <Search className="h-4 w-4 text-white" />
        </Button>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            variant="outline"
            className="rounded-full border-gray-300 text-sm"
            onClick={btn.onClick}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
