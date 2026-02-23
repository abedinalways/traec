import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

import RightGreenIcon from "../icons/RightGreenIcon";
import LocationIcon from "../icons/LocationIcon";
import CalendarIcon from "../icons/CalendarIcon";

import EmailIcon from "../icons/EmailIcon";

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
    <Card className="p-4 md:p-6 shadow-none flex md:flex-row items-center gap-6 font-[inter]">
      <Image
        src={avatar}
        alt="Profile"
        height={112}
        width={112}
        className="rounded-full object-cover"
      />

      <div className="flex-1 space-y-2">
        <div className="inline-block md:flex items-center gap-2">
          <h2 className="md:text-[28px] text-2xl font-semibold">{name}</h2>
          {verified && (
            <span className="flex items-center justify-center w-fit gap-1 text-[16px] bg-[#eefaf0] text-[#2dab57] px-2 py-1 rounded-md">
              <RightGreenIcon /> Verified
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[#4a4c56] text-xs md:text-[16px]">
          <LocationIcon />
          <p>{location}</p>
          <CalendarIcon />
          <p>{joined}</p>
        </div>

        <div className="flex items-center gap-2 text-[#4a4c56] text-xs md:text-[16px]">
          <EmailIcon />
          <p>{email}</p>
        </div>
      </div>
    </Card>
  );
}


