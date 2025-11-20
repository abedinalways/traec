/** @format */

import Image from "next/image";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
// JSON Data
const overViewData = {
  reviews: [
    {
      id: 20,
      title: "Party Anniversary",
      image: "https://i.ibb.co.com/ycw3xZCF/Rectangle-19-3.png",
      location: "Los Angeles, CA",
      date: "2022",
      rating: 3,
      reviews: 45,
      category: "Anniversary",
      likes: 13,
      name: "Kathryn Murphy",
      serviceName: "Kids Birthday Party DJ Package",
      description:
        "Professional DJ with 8+ years of experience specializing in children's parties, weddings, and corporate events.  I bring high-energy entertainment with age-appropriate music and interactive games that keep the party going",
    },
    {
      id: 21,
      title: "Party Anniversary",
      image: "https://i.ibb.co.com/ycw3xZCF/Rectangle-19-3.png",
      location: "Los Angeles, CA",
      date: "2022",
      rating: 4.9,
      reviews: 45,
      category: "Anniversary",
      likes: 13,
      name: "Kathryn Murphy",
      serviceName: "Kids Birthday Party DJ Package",
      description:
        "Professional DJ with 8+ years of experience specializing in children's parties, weddings, and corporate events.  I bring high-energy entertainment with age-appropriate music and interactive games that keep the party going",
    },
  ],
};

export default function Reviews() {
  return (
    <>
      <div className='px-4 sm:px-6'>
        <h3 className='border-l-2 border-gray-400 pl-3 my-5'>All Reviews</h3>
        {/* Existing Reviews */}
        {overViewData.reviews.map((review, index) => (
          <div
            key={index}
            className='space-y-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm my-4'>
            <div className='flex gap-3 items-start'>
              <Image
                src='https://i.ibb.co.com/bMnhwC9c/Ellipse-71.png'
                alt='Reviewer'
                width={52}
                height={52}
                className='object-contain'
              />
              <div>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='font-semibold text-lg'>{review.name}</h3>
                    <p>2 days ago</p>
                  </div>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <button className='p-2 border border-gray-200 rounded-md my-4'>
                  {review.serviceName}
                </button>
                <p className='text-gray-700'>{review.description}</p>
                <p className='flex items-center gap-2 mt-4'>
                  <AiOutlineLike /> Helpful ({review.likes})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
