/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";

// JSON Data
const overViewData = {
  services: [
    {
      id: 1,
      title: "Party Productions",
      image: "https://i.ibb.co/1fzVrD6K/Rectangle-19.png",
      location: "Los Angeles, CA",
      date: "2022",
      description:
        "Professional DJ with 8+ years of experience specializing in children's parties, weddings, and corporate events. I bring high-energy entertainment with age-appropriate music and interactive games that keep the party going!",
      rating: 4.9,
      reviews: 156,
      category: "General DJ",
      price: 150,
    },
    {
      id: 2,
      title: "Party Wedding",
      image: "https://i.ibb.co.com/fdqDqJCg/Rectangle-19-1.png",
      location: "Los Angeles, CA",
      date: "2022",
      description:
        "Specializing in providing wedding entertainment with interactive games and fun music tailored to your big day!",
      rating: 4.8,
      reviews: 120,
      category: "Wedding",
      price: 150,
    },
    {
      id: 3,
      title: "Party Kids",
      image: "https://i.ibb.co.com/XxbZp4Wt/Rectangle-19-2.png",
      location: "Los Angeles, CA",
      date: "2022",
      description:
        "Create unforgettable memories at children's parties with fun music, games, and activities!",
      rating: 5.0,
      reviews: 80,
      category: "Kids Party",
      price: 1500,
    },
    {
      id: 4,
      title: "Party Corporate",
      image: "https://i.ibb.co.com/ycw3xZCF/Rectangle-19-3.png",
      location: "Los Angeles, CA",
      date: "2022",
      description:
        "Perfect DJ service for corporate events, team-building activities, and holiday parties with tailored playlists and games.",
      rating: 4.9,
      reviews: 75,
      category: "Corporate",
      price: 1500,
    },
    {
      id: 5,
      title: "Party Interactive",
      image: "https://i.ibb.co.com/1GmRjjfZ/Rectangle-19-4.png",
      location: "Los Angeles, CA",
      date: "2022",
      description:
        "Bringing fun and exciting interactive games for all types of events to keep guests entertained.",
      rating: 4.8,
      reviews: 90,
      category: "Entertainment",
      price: 150,
    },
    {
      id: 6,
      title: "Party Birthday",
      image: "https://i.ibb.co.com/fdqDqJCg/Rectangle-19-1.png",
      location: "Los Angeles, CA",
      date: "2022",
      description:
        "Celebrate birthdays with fun music, games, and activities that make everyone feel special!",
      rating: 4.9,
      reviews: 150,
      category: "Birthday",
      price: 150,
    },
  ],
};

export default function Projects() {
  return (
    <>
      {" "}
      <div className="px-4 sm:px-6">
        <h3 className="border-l-2 border-gray-400 pl-3 my-5">All Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {overViewData.services.map((service, index) => (
            <div key={index}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border p-5">
                {/* Image Section */}
                <div className="w-full h-[250px] relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                {/* Content Section */}
                <div className="flex justify-between items-center gap-4 mt-4">
                  <p className="truncate flex-1">{service.description}</p>

                  <Link href={`/client-profile/details/${service?.id}`}>
                    <button className="bg-[#DFE1E7] w-32 p-2 rounded-md cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
