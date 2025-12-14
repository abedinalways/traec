'use client'
import React, { useState } from "react";
import LocationCards from "../reusable/LocationCards";

import Location from "../reusable/Location";
export interface subLocations{
  title: string,
  locationLink:string
}
export interface location{
  locationTitle: string,
  subLocations:subLocations[]
}

const Locations = () => {
  const [location, setLocation] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52818154.485914975!2d-161.49965884503166!3d36.0992329627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1765705700904!5m2!1sen!2sbd"
  );
  const locationChange = (l:string) => {
   
    setLocation(l)
  }
  const locations: location[] = [
    {
      locationTitle: "United States",
      subLocations: [
        {
          title: "New York",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193596.26002786632!2d-74.14431287431229!3d40.697284634966785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1765703874703!5m2!1sen!2sbd",
        },
        {
          title: "New Maxico",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384343.608943247!2d-111.03637133248984!3d34.06892323013659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87185043e79852a9%3A0x46bf6e1a63359eba!2sNew%20Mexico%2C%20USA!5e0!3m2!1sen!2sbd!4v1765705436102!5m2!1sen!2sbd",
        },
        {
          title: "Chicago",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190256.40539445446!2d-88.04369246258665!3d41.8335447691588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sbd!4v1765707876083!5m2!1sen!2sbd",
        },
        {
          title: "Phoenix",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425348.1638893127!2d-112.4544351529188!3d33.60446041537156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f8354a1bac!2sPhoenix%2C%20AZ%2C%20USA!5e0!3m2!1sen!2sbd!4v1765708037810!5m2!1sen!2sbd",
        },
        {
          title: "Houston",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443004.1876684435!2d-95.79083432780504!3d29.836281472024876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX%2C%20USA!5e0!3m2!1sen!2sbd!4v1765707981907!5m2!1sen!2sbd",
        },
      ],
    },
    {
      locationTitle: "Canada",
      subLocations: [
        {
          title: "Toronto",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184551.90977283596!2d-79.54286439581442!3d43.718370958010574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sbd!4v1765708177778!5m2!1sen!2sbd",
        },
        {
          title: "Vancouver",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83327.3714840184!2d-123.2063040744417!3d49.25781819008981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0xbb9196ea9b81f38b!2sVancouver%2C%20BC%2C%20Canada!5e0!3m2!1sen!2sbd!4v1765708372604!5m2!1sen!2sbd",
        },
        {
          title: "Montreal",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178788.40365797063!2d-74.02368203738884!3d45.55899899773715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC%2C%20Canada!5e0!3m2!1sen!2sbd!4v1765708499747!5m2!1sen!2sbd",
        },
        {
          title: "Calgray",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d160599.89948968575!2d-114.25263993762802!3d51.027723346828274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB%2C%20Canada!5e0!3m2!1sen!2sbd!4v1765708601787!5m2!1sen!2sbd",
        },
        {
          title: "Ottawa",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359536.9778791152!2d-76.12989085719718!3d45.25016592628499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05b25f5113af%3A0x8a6a51e131dd15ed!2sOttawa%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sbd!4v1765708656275!5m2!1sen!2sbd",
        },
      ],
    },
    {
      locationTitle: "United Kingdom",
      subLocations: [
        {
          title: "London",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.83988672637!2d-0.2664034848794909!3d51.528739805029666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sbd!4v1765708760387!5m2!1sen!2sbd",
        },
        {
          title: "Manchester",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75993.0898134045!2d-2.3058627142804844!3d53.4723192880619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0xd9be143804fe6baa!2sManchester%2C%20UK!5e0!3m2!1sen!2sbd!4v1765708808466!5m2!1sen!2sbd",
        },
        {
          title: "Birmingham",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155455.27832608824!2d-2.028436134102095!3d52.49744370112938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d1b417173%3A0xca81fef0aeee7998!2sBirmingham%2C%20UK!5e0!3m2!1sen!2sbd!4v1765708876777!5m2!1sen!2sbd",
        },
        {
          title: "Glasgow",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71661.16367412191!2d-4.314858239659474!3d55.8555289289045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488815562056ceeb%3A0x71e683b805ef511e!2sGlasgow%2C%20UK!5e0!3m2!1sen!2sbd!4v1765708932881!5m2!1sen!2sbd",
        },
      ],
    },
    {
      locationTitle: "Australia",
      subLocations: [
        {
          title: "Sydney",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.7072578641!2d150.60233714782865!3d-33.847234937864414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sbd!4v1765709012161!5m2!1sen!2sbd",
        },
        {
          title: "Adelaide",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d418345.395853739!2d137.9873568912427!3d-34.99860864137356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab735c7c526b33f%3A0x4033654628ec640!2sAdelaide%20SA%2C%20Australia!5e0!3m2!1sen!2sbd!4v1765709066737!5m2!1sen!2sbd",
        },
        {
          title: "Melbourne",
          locationLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d402590.5160774512!2d144.72350083435018!3d-37.97156521036751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sbd!4v1765709138211!5m2!1sen!2sbd",
        }
      ],
    },
  ];
  return (
    <div className=" bg-[#FFFBF7] py-16 px-2 md:px-4 rounded-2xl">
      <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-900 leading-tight font-[glory]">
        Locations We{" "}
        <span className="text-gradient italic font-serif">Serve</span>
      </h2>
      <p className="text-gray-600 text-center text-sm md:text-md max-w-2xl mx-auto">
        Find top event professionals in major cities across the United States.
      </p>
      <div className="custom-container flex flex-col gap-4">
        <LocationCards locations={locations} locationChange={locationChange} />
        <div className="w-full h-full">
          <Location location={location} />
        </div>
      </div>
    </div>
  );
};

export default Locations;
