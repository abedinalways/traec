"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuthModal } from "@/app/context/AuthModalContext";
import DropDown from "../icons/DropDownIcon";

import { getDefaultRouteForRole, normalizeAuthRole } from "@/lib/auth/config";
import { getImageUrl } from "@/lib/getImageUrl";
import { useDispatch } from "react-redux";
import { useGetMeQuery, useLogoutUserMutation } from "@/app/api/auth/authapi";
import { baseApi } from "@/app/api/baseApi";

export default function Navbar() {
  const { setOpenLogin, setOpenSignup } = useAuthModal();

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data,
    isLoading: isMeLoading,
    isFetching: isMeFetching,
  } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();

  const user = data?.authenticated ? data.user : null;
  const role = normalizeAuthRole(user?.type);
  const dashboardHref = role ? getDefaultRouteForRole(role) : "/";

  const userFullName = user
    ? `${user.name || ""} ${user.last_name || ""}`.trim()
    : "";

 const userImage = getImageUrl(user?.image, "/images/browser/Avater.png");

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? "text-[#F92E25] font-semibold" : "text-black";
    }

    return pathname.startsWith(path)
      ? "text-[#FF2A24] font-semibold"
      : "text-black";
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      dispatch(baseApi.util.resetApiState());
      router.push("/");
      router.refresh();
    }
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
            href="/become-provider"
            className={isActive("/become-provider")}
          >
            Become a Provider
          </Link>
        </nav>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center relative w-[260px]">
          <Input
            placeholder="Search for party rentals"
            className="rounded-[32px] pl-4 pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>

        {/* Desktop Auth */}
        {isMeLoading || isMeFetching ? (
          <div className="hidden md:flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-24 h-4 rounded bg-gray-200 animate-pulse" />
          </div>
        ) : user ? (
          <div className="hidden md:flex items-center gap-3">
            <Link href={dashboardHref} className="flex items-center gap-2">
              <Image
                src={userImage}
                alt="profile"
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover"
              />

              <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                {userFullName || user.email || "User"} <DropDown />
              </span>
            </Link>

            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-sm gradient-bg text-white cursor-pointer px-4 py-2 rounded-lg disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <button
              type="button"
              onClick={() => setOpenLogin(true)}
              className="bg-white text-black text-sm cursor-pointer font-medium"
            >
              Sign In
            </button>

            <Button
              type="button"
              onClick={() => setOpenSignup(true)}
              className="rounded-[12px] px-6 text-white font-medium gradient-bg cursor-pointer"
            >
              Join Now
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden font-[inter]">
          <Sheet>
            <SheetTrigger asChild>
              <button type="button">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[260px] font-[inter]">
              <SheetHeader>
                <SheetTitle>Evoke</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col space-y-5 text-base font-medium px-4 font-[inter]">
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

                {/* Mobile Auth */}
                {isMeLoading || isMeFetching ? (
                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    <div className="w-24 h-4 rounded bg-gray-200 animate-pulse" />
                  </div>
                ) : user ? (
                  <div className="flex flex-col gap-4 pt-4">
                    <SheetClose asChild>
                      <Link
                        href={dashboardHref}
                        className="flex items-center gap-3"
                      >
                        <Image
                          src={userImage}
                          alt="profile"
                          width={28}
                          height={28}
                          className="w-7 h-7 rounded-full object-cover"
                        />

                        <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {userFullName || user.email || "User"} <DropDown />
                        </span>
                      </Link>
                    </SheetClose>

                    <Button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-60"
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 pt-4">
                    <Button type="button" onClick={() => setOpenLogin(true)}>
                      Sign In
                    </Button>

                    <Button type="button" onClick={() => setOpenSignup(true)}>
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
