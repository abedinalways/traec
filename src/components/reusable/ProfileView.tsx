// import React from "react";
// import { Card } from "../ui/card";
// import Image from "next/image";
// import { CheckCircle } from "lucide-react";
// import { GrLocation } from "react-icons/gr";
// import { HiOutlineCalendarDateRange } from "react-icons/hi2";
// import { MdOutlineMailOutline } from "react-icons/md";

// export default function ProfileView() {
//   return (
//     <Card className="p-4 md:p-6  shadow-none flex flex-row items-center gap-6">
//       <Image
//         src="/images/featured06.png"
//         alt="Profile"
//         height={30}
//         width={30}
//         className="md:w-30 w-22 md:h-30 h-22 rounded-full object-cover"
//       />
//       <div className="flex-1 space-y-1">
//         <div className="flex items-center gap-2">
//           <h2 className="md:text-2xl text-xl font-semibold">Cameron Diana</h2>
//           <span className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-md">
//             <CheckCircle className="text-green-700" size={14} /> Verified
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <GrLocation />
//           <p className="text-gray-600 text-sm">Los Angeles, CA</p>
//           <HiOutlineCalendarDateRange />
//           <p className="text-gray-600 text-sm">
//             Los Angeles, CA Los Angeles, CA
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <MdOutlineMailOutline />
//           <p className="text-gray-600 text-sm">maria@email.com</p>
//         </div>
//       </div>
//     </Card>
//   );
// }

import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { GrLocation } from "react-icons/gr";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { MdOutlineMailOutline } from "react-icons/md";

interface ProfileCardProps {
  name: string;
  avatar: string;
  location: string;
  joined: string;
  email: string;
  verified?: boolean;
}

export default function ProfileCard({
  name,
  avatar,
  location,
  joined,
  email,
  verified = false,
}: ProfileCardProps) {
  return (
    <Card className="p-4 md:p-6 shadow-none flex flex-row items-center gap-6">
      <Image
        src={avatar}
        alt="Profile"
        height={30}
        width={30}
        className="md:w-30 w-22 md:h-30 h-22 rounded-full object-cover"
      />

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="md:text-2xl text-xl font-semibold">{name}</h2>
          {verified && (
            <span className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-md">
              <CheckCircle className="text-green-700" size={14} /> Verified
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <GrLocation />
          <p>{location}</p>
          <HiOutlineCalendarDateRange />
          <p>{joined}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MdOutlineMailOutline />
          <p>{email}</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Example Usage (TypeScript):
 *
 * <ProfileCard
 *    name="Cameron Diana"
 *    avatar="/images/featured06.png"
 *    location="Los Angeles, CA"
 *    joined="Joined Jan 2021"
 *    email="maria@email.com"
 *    verified={true}
 * />
 */
