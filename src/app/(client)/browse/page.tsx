import BrowseBanner from '@/components/browse/BrowseBanner';
import ServiceListing from '@/components/browse/ServiceListing';

import React from 'react';

const BrowsePage = () => {
  return (
    <>
      <BrowseBanner />
      <ServiceListing/>
    </>
  );
};

export default BrowsePage;