"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import GradientBullet from "../howitwork/gradiantbullet";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // LEFT IMAGES – animate left → center
      gsap.utils.toArray(".how-image-left").forEach((img: any) => {
        gsap.fromTo(
          img,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              onEnter: () => gsap.to(img, { x: 0, opacity: 1, duration: 1 }),
              onEnterBack: () =>
                gsap.to(img, { x: 0, opacity: 1, duration: 1 }),
            },
          }
        );
      });

      // RIGHT IMAGES – animate right → center
      gsap.utils.toArray(".how-image-right").forEach((img: any) => {
        gsap.fromTo(
          img,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              onEnter: () => gsap.to(img, { x: 0, opacity: 1, duration: 1 }),
              onEnterBack: () =>
                gsap.to(img, { x: 0, opacity: 1, duration: 1 }),
            },
          }
        );
      });

      // TEXT – fade + float upward
      gsap.utils.toArray(".how-text").forEach((text: any) => {
        gsap.fromTo(
          text,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              onEnter: () =>
                gsap.to(text, { y: 0, opacity: 1, duration: 1 }),
              onEnterBack: () =>
                gsap.to(text, { y: 0, opacity: 1, duration: 1 }),
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        px-4 sm:px-6 md:px-10 lg:px-16 
        py-12 sm:py-16 
        max-w-6xl mx-auto 
        overflow-x-hidden
      "
    >
      {/* 01 Search & Browse */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <Image
          src="/images/searchone.png"
          alt="Search & Browse"
          width={300}
          height={300}
          className="
            mx-auto how-image-left
            w-full max-w-[260px] sm:max-w-[300px]
          "
        />

        <div className="how-text">
          <h2 className="text-orange-500 font-bold text-xl sm:text-2xl mb-3">
            01. Search & Browse
          </h2>

          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Find the perfect Evoke from our wide selection of bounce houses,
            water slides, and party equipment.
          </p>

          <ul className="text-gray-700 space-y-3 text-sm sm:text-base">
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Browse by category or theme
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Filter by price, age group, and features
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Read reviews from real customers
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              View detailed photos and specifications
            </li>
          </ul>
        </div>
      </div>

      {/* 02 Compare & Choose */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div className="order-2 md:order-1 how-text">
          <h2 className="text-orange-500 font-bold text-xl sm:text-2xl mb-3">
            02. Compare & Choose
          </h2>

          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Review verified providers, read customer reviews, and compare prices
            to find the best fit for your event.
          </p>

          <ul className="text-gray-700 space-y-3 text-sm sm:text-base">
            <li className="flex gap-3 items-start">
              <GradientBullet />
              All providers are background checked
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Compare pricing and availability
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Read verified customer reviews
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Check provider ratings and certifications
            </li>
          </ul>
        </div>

        <Image
          src="/images/compare.png"
          alt="Compare & Choose"
          width={300}
          height={300}
          className="
            mx-auto how-image-right 
            order-1 md:order-2 
            w-full max-w-[260px] sm:max-w-[300px]
          "
        />
      </div>

      {/* 03 Book & Schedule */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <Image
          src="/images/book.png"
          alt="Book & Schedule"
          width={300}
          height={300}
          className="
            mx-auto how-image-left 
            w-full max-w-[260px] sm:max-w-[300px]
          "
        />

        <div className="how-text">
          <h2 className="text-orange-500 font-bold text-xl sm:text-2xl mb-3">
            03. Book & Schedule
          </h2>

          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Secure your rental with easy online booking. Schedule delivery,
            setup, and pickup times that work for you.
          </p>

          <ul className="text-gray-700 space-y-3 text-sm sm:text-base">
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Instant booking confirmation
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Flexible delivery windows
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Setup and teardown included
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              24/7 customer support
            </li>
          </ul>
        </div>
      </div>

      {/* 04 Party Time */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 how-text">
          <h2 className="text-orange-500 font-bold text-xl sm:text-2xl mb-3">
            04. Party Time!
          </h2>

          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Enjoy your stress-free event while we handle the setup and
            teardown. Your guests will have a blast!
          </p>

          <ul className="text-gray-700 space-y-3 text-sm sm:text-base">
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Professional setup and safety check
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Clean and sanitized equipment
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Emergency contact support
            </li>
            <li className="flex gap-3 items-start">
              <GradientBullet />
              Hassle-free pickup after your event
            </li>
          </ul>
        </div>

        <Image
          src="/images/party.png"
          alt="Party Time"
          width={300}
          height={300}
          className="
            mx-auto how-image-right 
            order-1 md:order-2 
            w-full max-w-[260px] sm:max-w-[300px]
          "
        />
      </div>
    </section>
  );
}
