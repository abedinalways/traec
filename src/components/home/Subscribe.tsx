"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Subscribe() {
  const [email, setEmail] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Thanks for subscribing! We'll keep you updated.");
    setEmail("");
  };

  return (
    <section className="z-50">
      <div className="mx-auto max-w-3xl mt-10 px-4 py-6 md:py-14 z-20">
        <div
          className={cn(
            "relative overflow-hidden border-none rounded-2xl",
            "bg-gradient-email text-white w-full md:w-[920px] h-auto md:h-[244px]"
          )}
        >
          {/* Background Image */}
          <div className="absolute  py-2 inset-0 z-0">
            <Image
              src="/images/subs.png"
              alt="Subscribe"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <CardContent className="relative z-10 text-center  md:p-12 p-4 space-y-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold">
                Stay Updated with Evoke
              </h2>
              <p className="mt-2 text-xs md:text-md text-white/90">
                Get the latest updates on new services, special offers, and
                event planning tips.
              </p>
            </div>

            {/* Input + Button */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row justify-center gap-3 md:max-w-xl mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900 placeholder:text-gray-500 sm:w-full"
              />

              <Button
                type="submit"
                className="bg-white/80 hover:bg-white text-orange-700 font-semibold md:px-6 px-4"
              >
                Subscribe
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </section>
  );
}
