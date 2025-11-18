import React from 'react';
import Masonry from '../reusable/Masonary'

const items = [
  {
    id: '1',
    img: '/images/stories/stories01.png',
    url: 'https://example.com/one',
    height: 384,
    title: 'Elegant Wedding Reception',
    author: 'by Sarah Johnson',
    tag: 'Wedding',
  },
  {
    id: '2',
    img: '/images/stories/stories02.png',
    url: 'https://example.com/two',
    height: 279,
    title: 'Corporate Gala Night',
    author: 'by David Park',
    tag: 'Corporate',
  },
  {
    id: '3',
    img: '/images/stories/stories03.png',
    url: 'https://example.com/three',
    height: 350,
    title: 'Birthday Celebration',
    author: 'by Elena Rodriguez',
    tag: 'Birthday',
  },
  {
    id: '4',
    img: '/images/stories/stories05.png',
    url: 'https://example.com/four',
    height: 424,
    title: 'Corporate Event',
    author: 'by Mila Miller',
    tag: 'Corporate',
  },
  {
    id: '5',
    img: '/images/stories/stories06.png',
    url: 'https://example.com/five',
    height: 353,
    title: 'Party Night',
    author: 'by Mila Miller',
    tag: 'Party',
  },
  {
    id: '6',
    img: '/images/stories/stories04.png',
    url: 'https://example.com/six',
    height: 319,
    title: 'Music Festival Setup',
    author: 'by Mike Chen',
    tag: 'Concert',
  },
];
const Stories = () => {
  return (
    <div className="w-full min-h-screen py-16 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recent Event Success{' '}
            <span className="text-transparent bg-clip-text text-gradient italic font-serif">
              Stories
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-md max-w-2xl mx-auto font-[inter]">
            Take a look at some of the amazing events our providers have created recently
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="w-full">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.08}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={1.02}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>

        
      </div>
    </div>
  );
};
 

export default Stories;