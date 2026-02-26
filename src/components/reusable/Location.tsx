"use client";

import React, { useState } from "react";

interface LocationProps {
  location: string;
}

const Location = ({ location }: LocationProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-[418px] rounded-xl overflow-hidden font-[inter]">
      {/* Skeleton */}
      {loading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-gray-200">
          <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      )}

      {/* Google Map */}
      <iframe
        src={location}
        width="100%"
        height="418"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-xl"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default Location;
