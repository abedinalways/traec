"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { location } from "../home/Locations";
interface LocationCards{
  locations: location[],
  locationChange:(l:string)=>void
}

export default function LocationCards({ locations, locationChange }:LocationCards) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
      {locations.map((location, index) => (
        <Card
          key={index}
          className="p-4 bg-[#F6F8FA63] shadow-sm border rounded-xl"
        >
          <CardContent className="p-0">
            <h2 className="font-medium text-lg mb-3">
              {location.locationTitle}
            </h2>

            <div className="flex flex-wrap gap-2 cursor-pointer">
              {location.subLocations?.map((city, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border border-orange-300 rounded-full text-sm text-gray-700"
                  onClick={()=>locationChange(city.locationLink)}
                >
                  {city.title}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
