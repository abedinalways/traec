"use client";

import React from "react";

export default function MainOrder() {
  return (
    <main className="min-h-screen w-full bg-white px-6 md:px-16 py-10">
      {/* Breadcrumb */}
      {/* <p className="text-gray-500 text-sm mb-4">
        My orders <span className="text-gray-400">›</span> Order Details
      </p> */}

      {/* Order Started Box */}
      <div className="border rounded-xl p-5 bg-white shadow-sm mb-8">
        <h2 className="font-semibold text-lg text-gray-900 mb-1">Order Started</h2>
        <p className="text-gray-600 text-sm">
          Order placed by <span className="font-semibold">Sara William</span> for{" "}
          <span className="font-semibold">Emma’s 7th Birthday Party.</span>
        </p>
      </div>

      {/* Location & Contact */}
      <div className="border rounded-xl p-5 bg-white shadow-sm mb-8">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Location & Contact</h3>

        <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
          <p>
            <span className="font-semibold">Full Name :</span> Lisa William
          </p>
          <p>
            <span className="font-semibold">Email Address :</span> garawilliam@gmail.com
          </p>
          <p>
            <span className="font-semibold">Phone Number :</span> (252) 555-0126
          </p>
          <p>
            <span className="font-semibold">Location :</span> 2118 Thornridge Cir,
            London, England E1 7AA
          </p>
        </div>
      </div>

      {/* Event Details */}
      <div className="border rounded-xl p-5 bg-white shadow-sm mb-8">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Event Details</h3>

        <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
          <p>
            <span className="font-semibold">Event Type :</span> Birthday
          </p>
          <p>
            <span className="font-semibold">Event Name :</span> Emma’s 7th Birthday Party
          </p>
          <p>
            <span className="font-semibold">Duration :</span> 8 hr
          </p>
          <p>
            <span className="font-semibold">Guests :</span> 25
          </p>

          <p>
            <span className="font-semibold block mb-1">Description :</span>
            Emmas 7th Birthday Party will be a fun-filled celebration with music,
            games, and activities for kids. The event will include themed decorations,
            entertainment, and plenty of space for the 25 guests to enjoy. The party is
            scheduled to run for 8 hours, ensuring time for setup, activities, food, and
            wrap-up.
          </p>
        </div>
      </div>

      {/* Questionnaire */}
      <div className="border rounded-xl p-5 bg-white shadow-sm mb-8">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Questionnaire</h3>

        <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
          {/* Question 1 */}
          <div>
            <p className="font-semibold">
              1. What is your Party Theme?
            </p>
            <p className="mt-1">
              Theme: Princess & Unicorn Theme
            </p>
          </div>

          {/* Question 2 */}
          <div>
            <p className="font-semibold">
              2. What kind of music you Preference?
            </p>
            <p className="mt-1">
              Preferred Genres: Kids’ Pop, Disney, Family Hits, 90s Dance
            </p>
          </div>

          {/* Question 3 */}
          <div>
            <p className="font-semibold">
              3. What are your Must-Play Songs?
            </p>
            <p className="mt-1">
              Must-Play Songs: “Let It Go”, “Happy”, “We Don’t Talk About Bruno”,
              “Shake It Off”
            </p>
          </div>

          {/* Question 4 */}
          <div>
            <p className="font-semibold">
              4. Do you want Dance Party Games included?
            </p>
            <p className="mt-1">
              Freeze Dance, Musical Chairs, Limbo
            </p>
          </div>

          {/* Question 5 */}
          <div>
            <p className="font-semibold">
              5. How would you like the birthday child’s entrance to be?
            </p>
            <p className="mt-1">
              Emma walks in with “A Whole New World” playing, spotlight on her,
              bubbles filling the room, and friends cheering.
            </p>
          </div>

          {/* Question 6 */}
          <div>
            <p className="font-semibold">
              6. Additional Notes
            </p>

            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Setup 1 hour early for sound check</li>
              <li>Parking available at the front gate</li>
              <li>Avoid loud bass-heavy tracks (kids attending)</li>
              <li>Play “Happy Birthday Remix” at 3:00 PM during cake cutting</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
