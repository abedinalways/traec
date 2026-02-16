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
      <div className="mx-auto max-w-3xl px-4  z-20 subs-background rounded-2xl my-6">
        <div
          className={cn(
            "relative overflow-hidden border-none rounded-2xl",
            "bg-gradient-email text-white w-full md:max-w-3xl h-auto md:h-[244px]",
          )}
        >
          {/* Background Image */}
          <div className="absolute  py-2 inset-0 z-0">
            <Image
              src="/images/abcd.png"
              alt="abec"
              width={134}
              height={722}
              className="rotate-[-52.26] w-1/2"
            />
          </div>
          <div className="absolute left-80 py-2 inset-0 z-0">
            <Image
              src="/images/abc.png"
              alt="abec"
              width={134}
              height={722}
              className="rotate-[-52.26] w-1/2"
            />
          </div>

          {/* Content */}
          <CardContent className="relative z-10 text-center  md:p-12 p-4 space-y-2">
            <div>
              <h2 className="text-lg md:text-[32px] font-semibold font-[inter]">
                Stay Updated with Evoke
              </h2>
              <p className="mt-2 text-xs md:text-md text-white/90">
                Get the latest updates on new services, special offers, <br />
                and event planning tips
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
                className="bg-white text-gray-900 placeholder:text-gray-400 sm:w-full placeholder:font-[inter]"
              />

              <Button
                type="submit"
                className="bg-white hover:bg-white font-semibold text-orange-400 md:px-6 px-4 font-[inter]"
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
