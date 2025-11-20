'use client';

import React from 'react';
import locations from '../../../public/data/locations.json';
import { Card, CardContent } from '@/components/ui/card';

export default function LocationCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
      {Object.entries(locations).map(([country, cities]) => (
        <Card key={country} className="p-4 shadow-sm border rounded-xl">
          <CardContent className="p-0">
            <h2 className="font-medium text-lg mb-3">{country}</h2>

            <div className="flex flex-wrap gap-2">
              {cities.map(city => (
                <span
                  key={city}
                  className="px-3 py-1 border border-orange-300 rounded-full text-sm text-gray-700"
                >
                  {city}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
