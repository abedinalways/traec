"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useEffect, useState } from "react";

type LoginData = {
  name?: string;
  email?: string;
};

export default function Navbar() {
  const { setOpenLogin } = useAuthModal();
  const pathname = usePathname();

  const [user, setUser] = useState<LoginData | null>(null);

  // useEffect(() => {
  //   const savedData = localStorage.getItem("loginData");
  //   if (savedData) {
  //     setUser(JSON.parse(savedData));
  //   }
  // }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? "text-[#F92E25] font-semibold" : "text-black";
    }

    return pathname.startsWith(path)
      ? "text-[#FF2A24] font-semibold"
      : "text-black";
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-white z-50 font-[inter] px-2">
      <div className="custom-container mx-auto flex items-center justify-between py-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={34} height={34} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          <Link href="/browse" className={isActive("/browse")}>
            Browse
          </Link>
          <Link href="/how-it-works" className={isActive("/how-it-works")}>
            How it Works
          </Link>
          <Link href="/providers" className={isActive("/providers")}>
            Providers
          </Link>
          <Link
            href="/"
            className={isActive("/become-provider")}
          >
            Become a Provider
          </Link>
        </nav>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center relative w-[260px]">
          <Input
            placeholder="Search for party rentals"
            className="rounded-full pl-4 pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>

        {/* Desktop Auth */}
        {user ? (
          <Link
            href="/client-profile"
            className="hidden md:flex items-center gap-2"
          >
            <Image
              src="/images/browser/img07.png"
              alt="profile"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium text-gray-900">
              {user.name || "John Doe"}
            </span>
          </Link>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <Button
              onClick={() => setOpenLogin(true)}
              className="bg-white text-black hover:bg-white text-sm font-medium"
            >
              Sign In
            </Button>

            <Link href="/signin">
              <Button className="rounded-[12px] px-6 text-white font-medium gradient-bg">
                Join Now
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
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
                  <Link href="/" className={isActive("/")}>
                    Home
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/browse" className={isActive("/browse")}>
                    Browse
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/how-it-works"
                    className={isActive("/how-it-works")}
                  >
                    How it Works
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/providers" className={isActive("/providers")}>
                    Providers
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/become-provider"
                    className={isActive("/become-provider")}
                  >
                    Become a Provider
                  </Link>
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
                {user ? (
                  <Link href="/client-profile">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/browser/img07.png"
                        alt="profile"
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {user.name || "John Doe"}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="pt-6 flex flex-col gap-4">
                    <Button
                      onClick={() => setOpenLogin(true)}
                      className="rounded-full text-white font-medium btn-gradient"
                    >
                      Sign In
                    </Button>

                    <Button className="rounded-[12px] text-white font-medium btn-gradient">
                      Join Now
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
