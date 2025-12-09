"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`relative text-white ${className || ""}`}>
      {/* Background image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={"/images/footer.png"}
          alt="footer background"
          priority
          fill
          style={{
            objectFit: "cover",
            filter: "brightness(0.28) contrast(0.9)",
          }}
        />
      </div>

      <div className="custom-container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 md:mt-30 mt-50">
          {/* Left column - brand + description + socials */}
          <div className="md:col-span-4 text-white">
            <div className="flex  flex-col  items-start gap-3">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={34}
                  height={34}
                />
              </Link>
              <p className="mt-2 text-sm text-gray-200/90 max-w-[22rem]">
                Your one-stop marketplace for event planning services. From DJs
                and caterers to venues and decorators, find everything you need
                to make your event unforgettable.
              </p>
              <div></div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button variant="ghost" className="p-2 rounded-full">
                <Twitter size={16} />
              </Button>
              <Button variant="ghost" className="p-2 rounded-full">
                <Instagram size={16} />
              </Button>
              <Button variant="ghost" className="p-2 rounded-full">
                <Facebook size={16} />
              </Button>
              <Button variant="ghost" className="p-2 rounded-full">
                <Linkedin size={16} />
              </Button>
            </div>
          </div>

          {/* Center columns - Pages & Utility Pages */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-4">Pages</h4>
              <ul className="space-y-3 text-sm text-gray-200">
                <li>
                  <Link href="#" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Providers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Become a Provider
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Utility Pages</h4>
              <ul className="space-y-3 text-sm text-gray-200">
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Licenses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Change Log
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column - Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mb-4">Contact Us</h4>
            <div className="text-sm text-gray-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Mail size={16} />
                </div>
                <div>info@evoke.com</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Phone size={16} />
                </div>
                <div>+7xxxxxxxxx</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <MapPin size={16} />
                </div>
                <div>123 Education Street, Suite 456</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-gray-300 w-full text-center hidden md:flex justify-center">
          <p>Copyright Evoke · All rights reserved.</p>
        </div>

        {/* Small screen layout - make sure copyright aligned center */}
        <div className="mt-10 md:hidden text-center text-xs text-gray-300">
          Copyright Evoke · All rights reserved.
        </div>
      </div>
    </footer>
  );
}
