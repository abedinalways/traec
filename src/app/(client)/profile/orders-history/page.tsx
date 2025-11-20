// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { FiBox } from "react-icons/fi";
// import { FaHandHoldingDollar } from "react-icons/fa6";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { BiTask } from "react-icons/bi";

// export default function Page() {
//   // Dummy data for orders (You can replace with real API later)
//   const orders = [
//     {
//       id: 1,
//       title: "Sofia's 7th Birthday Pri...",
//       vendor: "Part Pro Rentals",
//       date: "1/15/2024",
//       price: 545,
//       status: "Complete",
//       thumbnail: "/images/orderWomanImg.png", // Replace with your image
//     },
//     {
//       id: 2,
//       title: "Sofia's 7th Birthday Pri...",
//       vendor: "Part Pro Rentals",
//       date: "1/15/2024",
//       price: 545,
//       status: "Complete",
//       thumbnail: "/images/orderWomanImg.png",
//     },
//     {
//       id: 3,
//       title: "Sofia's 7th Birthday Pri...",
//       vendor: "Part Pro Rentals",
//       date: "1/15/2024",
//       price: 545,
//       status: "Complete",
//       thumbnail: "/images/orderManImg.png",
//     },
//     {
//       id: 4,
//       title: "Sofia's 7th Birthday Pri...",
//       vendor: "Part Pro Rentals",
//       date: "1/15/2024",
//       price: 545,
//       status: "Progress",
//       thumbnail: "/images/orderWomanImg.png",
//     },
//   ];

//   return (
//     <div className="w-full max-w-5xl mx-auto px-4 py-10">
//       {/* Back Button */}
//       <Link
//         href="/profile"
//         className="flex items-center w-fit gap-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition mb-6"
//       >
//         <MdKeyboardArrowLeft size={20} />
//         Back To Account
//       </Link>

//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
//         <p className="text-gray-500 mt-1">View your past events and bookings</p>
//       </div>

//       {/* Stats Row */}
//       <div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
//             <FiBox
//               size={50}
//               className="p-2 border rounded-full text-gray-500"
//             />
//             <div>
//               <p className="text-3xl font-semibold">11</p>
//               <p className="text-[#4A4C56] font-medium mt-1">Past Orders</p>
//             </div>
//           </div>
//           <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
//             <BiTask
//               size={50}
//               className="p-2 border rounded-full text-gray-500"
//             />
//             <div>
//               <p className="text-3xl font-semibold">02</p>
//               <p className="text-[#4A4C56] font-medium mt-1">Completed</p>
//             </div>
//           </div>
//           <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
//             <AiOutlineLoading3Quarters
//               size={50}
//               className="p-2 border rounded-full text-gray-500"
//             />
//             <div>
//               <p className="text-3xl font-semibold">06</p>
//               <p className="text-[#4A4C56] font-medium mt-1">Pending</p>
//             </div>
//           </div>
//           <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
//             <FaHandHoldingDollar
//               size={50}
//               className="p-2 border rounded-full text-gray-500"
//             />
//             <div>
//               <p className="text-3xl font-semibold">$560</p>
//               <p className="text-gray-500 text-sm mt-1">Total Spend</p>
//             </div>
//           </div>
//         </div>

//         {/* Order List */}
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="border rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition"
//             >
//               {/* Thumbnail */}
//               <Image
//                 src={order.thumbnail}
//                 width={80}
//                 height={100}
//                 alt="Order Thumbnail"
//                 className="rounded-lg h-20 object-cover"
//               />

//               {/* Details */}
//               <div className="flex-1">
//                 <h3 className="font-medium text-gray-900">{order.title}</h3>
//                 <p className="text-[#4A4C56] font-medium">
//                   by <span className="text-blue-600">{order.vendor}</span>
//                 </p>
//               </div>

//               {/* Date */}
//               <div className="min-w-[200px]">
//                 <p className="text-[#777980] text-sm">Date</p>
//                 <p className="text-gray-700 font-medium">{order.date}</p>
//               </div>

//               {/* Price */}
//               <div className="min-w-[200px]">
//                 <p className="text-[#777980] text-sm">Price</p>
//                 <p className="text-gray-700 font-medium">${order.price}</p>
//               </div>

//               {/* Status */}
//               <div className="min-w-[200px]">
//                 <p className="text-[#777980] mb-1 text-sm">Status</p>
//                 <span
//                   className={`px-4 py-1 rounded-full text-sm font-medium ${
//                     order.status === "Complete"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-blue-100 text-blue-600"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiTask } from "react-icons/bi";

export default function Page() {
  // Dummy data for orders (You can replace with real API later)
  const orders = [
    {
      id: 1,
      title: "Sofia's 7th Birthday Pri...",
      vendor: "Part Pro Rentals",
      date: "1/15/2024",
      price: 545,
      status: "Complete",
      thumbnail: "/images/orderWomanImg.png", // Replace with your image
    },
    {
      id: 2,
      title: "Sofia's 7th Birthday Pri...",
      vendor: "Part Pro Rentals",
      date: "1/15/2024",
      price: 545,
      status: "Complete",
      thumbnail: "/images/orderWomanImg.png",
    },
    {
      id: 3,
      title: "Sofia's 7th Birthday Pri...",
      vendor: "Part Pro Rentals",
      date: "1/15/2024",
      price: 545,
      status: "Complete",
      thumbnail: "/images/orderManImg.png",
    },
    {
      id: 4,
      title: "Sofia's 7th Birthday Pri...",
      vendor: "Part Pro Rentals",
      date: "1/15/2024",
      price: 545,
      status: "Progress",
      thumbnail: "/images/orderWomanImg.png",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href="/profile"
        className="flex items-center w-fit gap-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition mb-6"
      >
        <MdKeyboardArrowLeft size={20} />
        Back To Account
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
        <p className="text-gray-500 mt-1">View your past events and bookings</p>
      </div>

      {/* Stats Row */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
            <FiBox
              size={50}
              className="p-2 border rounded-full text-gray-500"
            />
            <div>
              <p className="text-3xl font-semibold">11</p>
              <p className="text-[#4A4C56] font-medium mt-1">Past Orders</p>
            </div>
          </div>
          <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
            <BiTask
              size={50}
              className="p-2 border rounded-full text-gray-500"
            />
            <div>
              <p className="text-3xl font-semibold">02</p>
              <p className="text-[#4A4C56] font-medium mt-1">Completed</p>
            </div>
          </div>
          <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
            <AiOutlineLoading3Quarters
              size={50}
              className="p-2 border rounded-full text-gray-500"
            />
            <div>
              <p className="text-3xl font-semibold">06</p>
              <p className="text-[#4A4C56] font-medium mt-1">Pending</p>
            </div>
          </div>
          <div className="border rounded-xl p-5 flex items-center gap-4 text-center">
            <FaHandHoldingDollar
              size={50}
              className="p-2 border rounded-full text-gray-500"
            />
            <div>
              <p className="text-3xl font-semibold">$560</p>
              <p className="text-gray-500 text-sm mt-1">Total Spend</p>
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-4 flex flex-col gap-4 hover:bg-gray-50 transition lg:flex-row lg:items-center"
            >
              {/* Left: Thumbnail + Details */}
              <div className="flex items-center gap-4 lg:flex-1">
                <Image
                  src={order.thumbnail}
                  width={80}
                  height={100}
                  alt="Order Thumbnail"
                  className="rounded-lg h-20 w-16 object-cover shrink-0"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{order.title}</h3>
                  <p className="text-[#4A4C56] font-medium">
                    by{" "}
                    <span className="text-black underline">{order.vendor}</span>
                  </p>
                </div>
              </div>

              {/* Right: Meta Info (Date / Price / Status) */}
              <div className="flex flex-wrap gap-4 w-full lg:w-auto lg:flex-nowrap lg:gap-8">
                {/* Date */}
                <div className="flex-1 min-w-[130px] sm:min-w-[140px] lg:min-w-[200px]">
                  <p className="text-[#777980] text-sm">Date</p>
                  <p className="text-gray-700 font-medium">{order.date}</p>
                </div>

                {/* Price */}
                <div className="flex-1 min-w-[130px] sm:min-w-[140px] lg:min-w-[200px]">
                  <p className="text-[#777980] text-sm">Price</p>
                  <p className="text-gray-700 font-medium">${order.price}</p>
                </div>

                {/* Status */}
                <div className="flex-1 min-w-[130px] sm:min-w-[140px] lg:min-w-[200px]">
                  <p className="text-[#777980] mb-1 text-sm">Status</p>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === "Complete"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
