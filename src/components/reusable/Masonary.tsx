'use client';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = () =>
    values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () =>
      queries.forEach(q =>
        matchMedia(q).removeEventListener('change', handler)
      );
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  author?: string;
  tag?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  enableScrollAnimation?: boolean;
  scrollAnimationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'mixed';
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 1.02,
  blurToFocus = true,
  colorShiftOnHover = false,
  enableScrollAnimation = true,
  scrollAnimationType = 'mixed',
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)'],
    [3, 2, 1],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 20;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = (child.height * columnWidth) / 400;
      const y = colHeights[col];
      colHeights[col] += height + gap;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  // ⭐ NEW — FIX FOR SMALL SCREEN HEIGHT COLLAPSE
  const totalHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map(item => item.y + item.h));
  }, [grid]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;

      const element = document.querySelector(selector);
      if (!element) return;

      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      // Initial animation
      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: item.x,
            y: item.y + 100,
            width: item.w,
            height: item.h,
            scale: 0.8,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            scale: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto',
        });
      }

      // Scroll animations (only after mount)
      if (enableScrollAnimation && hasMounted.current) {
        const trigger = ScrollTrigger.create({
          trigger: selector,
          start: 'top bottom-=100',
          end: 'bottom top+=100',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            gsap.fromTo(
              selector,
              { opacity: 0, y: item.y + 50 },
              { opacity: 1, y: item.y, duration: 0.8, ease: 'power3.out' }
            );
          },
          onLeaveBack: () => {
            gsap.to(selector, {
              opacity: 0,
              y: item.y + 50,
              duration: 0.5,
              ease: 'power2.in',
            });
          },
        });

        scrollTriggersRef.current.push(trigger);
      }
    });

    hasMounted.current = true;

    return () => {
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [
    grid,
    imagesReady,
    stagger,
    animateFrom,
    blurToFocus,
    duration,
    ease,
    enableScrollAnimation,
    scrollAnimationType,
  ]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.4,
        ease: 'power2.out',
        zIndex: 10,
      });
    }

    const textOverlay = element.querySelector('.text-overlay') as HTMLElement;
    if (textOverlay) {
      gsap.to(textOverlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        zIndex: 1,
      });
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Wedding':
        return 'bg-gradient-to-r from-orange-500 to-pink-500';
      case 'Corporate':
        return 'bg-gradient-to-r from-orange-600 to-red-500';
      case 'Birthday':
        return 'bg-gradient-to-r from-orange-500 to-yellow-500';
      case 'Concert':
        return 'bg-gradient-to-r from-orange-500 to-purple-500';
      case 'Party':
        return 'bg-gradient-to-r from-orange-600 to-pink-600';
      default:
        return 'bg-gradient-to-r from-orange-500 to-red-500';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: totalHeight }} // ⭐ FIX APPLIED HERE
    >
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content cursor-pointer"
          style={{
            willChange: 'transform, width, height, opacity',
            zIndex: 1,
          }}
          onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {item.tag && (
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white ${getTagColor(
                    item.tag
                  )}`}
                >
                  {item.tag}
                </span>
              </div>
            )}

            {(item.title || item.author) && (
              <div className="text-overlay absolute bottom-0 left-0 right-0 p-5 text-white opacity-90">
                {item.title && (
                  <h3 className="text-xl font-bold mb-1.5 leading-tight">
                    {item.title}
                  </h3>
                )}
                {item.author && (
                  <p className="text-sm font-light opacity-90">{item.author}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
