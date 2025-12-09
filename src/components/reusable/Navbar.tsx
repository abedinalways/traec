"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuthModal } from "@/app/context/AuthModalContext";

export default function Navbar() {
  const { setOpenLogin, setOpenSignup } = useAuthModal();
  return (
    <header className="w-full fixed px-2 md:px-4 top-0 left-0 bg-white z-50 font-[inter]">
      <div className="custom-container mx-auto flex items-center justify-between py-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={34} height={34} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/browse">Browse</Link>
          <Link href="/how-it-works">How it Works</Link>
          <Link href="/providers">Providers</Link>
          <Link href="/become-provider">Become a Provider</Link>
        </nav>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center relative w-[260px]">
          <Input
            placeholder="Search for party rentals"
            className="rounded-full pl-4 pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Button
            onClick={() => setOpenLogin(true)}
            className="text-sm font-medium hover:bg-white cursor-pointer bg-white text-black"
          >
            Sign In
          </Button>
          {/* Gradient Button */}{" "}
          <Button
            onClick={() => setOpenSignup(true)}
            className="rounded-full px-6 text-white font-medium btn-gradient cursor-pointer"
          >
            Join Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden mx-4">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[260px]">
              <SheetHeader>
                <SheetTitle>Evoke</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col space-y-5 text-base font-medium px-4">
                <SheetClose asChild>
                  <Link href="/">Home</Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/browse">Browse</Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/how-it-works">How it Works</Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/providers">Providers</Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/become-provider">Become a Provider</Link>
                </SheetClose>

                {/* Mobile Search */}
                <div className="relative mt-4">
                  <Input
                    placeholder="Search…"
                    className="rounded-full pl-4 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>

                {/* Mobile Auth */}
                <div className="pt-6 flex flex-col gap-4 ">
                  <Button
                    onClick={() => setOpenLogin(true)}
                    className="rounded-full text-white font-medium btn-gradient"
                  >
                    Sign In
                  </Button>{" "}
                  <Button
                    onClick={() => setOpenSignup(true)}
                    className="rounded-full text-white font-medium btn-gradient"
                  >
                    Join Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
