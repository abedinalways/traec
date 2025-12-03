'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Keep 100% of your earnings',
  'Access to thousands of potential clients',
  'Professional profile and portfolio showcase',
  'Secure payment processing',
  '24/7 customer support',
];

export default function BusinessCard() {
  return (
    <Card
      className="
        w-full max-w-xl mx-auto rounded-2xl border-0
        bg-gradient-to-r from-orange-500 to-orange-300
        text-white p-10 shadow-xl
      "
    >
      <CardContent className="p-0">
        <h2 className="text-3xl font-semibold">
          Grow Your Business <br /> with{' '}
          <span className="italic font-serif">Evoke</span>
        </h2>

        <ul className="mt-6 space-y-3">
          {features.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>

        <Button
          variant="secondary"
          className="
            mt-8 text-orange-600 font-semibold
            bg-white hover:bg-orange-50
          "
        >
          Join as Service Provider
        </Button>
      </CardContent>
    </Card>
  );
}
