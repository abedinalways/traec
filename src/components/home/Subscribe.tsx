'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Subscribe() {
  const [email, setEmail] = useState('');

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    toast.success("Thanks for subscribing! We'll keep you updated.");
    setEmail('');
  };

  return (
    <section className="z-50">
      <div className="mx-auto max-w-7xl px-4 py-2 md:py-12 z-20">
        <Card
          className={cn(
            'relative overflow-hidden border-none rounded-2xl',
            'bg-gradient-email text-white md:w-[920px] z-50'
          )}
        >
          {/* Decorative ribbons */}
          <div className="absolute inset-0 pointer-events-none ">
            <div className="absolute w-40 h-40 bg-orange-300 rounded-full blur-3xl top-10 left-10"></div>
            <div className="absolute w-40 h-40 bg-red-400 rounded-full blur-3xl bottom-10 right-10"></div>
          </div>

          <CardContent className="relative z-10 text-center md:p-6 p-2 md:space-y-4 space-y-2">
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
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900 placeholder:text-gray-500 md:w-full "
              />

              <Button
                type="submit"
                className="bg-white/70 hover:bg-white text-orange-700 font-medium md:px-6 px-2 "
              >
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
