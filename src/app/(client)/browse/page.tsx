import BrowseBanner from '@/components/browse/BrowseBanner';
import ServiceListing from '@/components/browse/ServiceListing';

import React from 'react';

const BrowsePage = () => {
  return (
    <div className='font-[inter]'>
      <BrowseBanner />
      <ServiceListing/>
    </div>
  );
};

export default BrowsePage;