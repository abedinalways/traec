"use client";
import { usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

export default function PersonalInformationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <div className="my-10">
      <div className="custom-container mx-auto">
        <button className="border border-gray-300 p-1 flex items-center gap-3 mt-5 rounded-md cursor-pointer">
          <IoIosArrowBack /> Back to Service
        </button>
        <h3 className="text-2xl font-bold pt-6">Set Up Your Evoke Account</h3>
        <p className="pb-3">
          Just a few quick steps to set up your InFlatables account.
        </p>
        <div className="flex flex-col lg:flex-row gap-5 ">
          <div className="w-full lg:w-[30%]">
            <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p>Account Setup Progress</p>
              <div className="flex items-center gap-2 pt-4">
                <button
                  className={`p-2 rounded-full border border-[#FFAC47] text-[#FFAC47] ${
                    isActive(
                      "/become-provider/personal-information/preferences"
                    ) ||
                    isActive(
                      "/become-provider/personal-information/account-summary"
                    )
                      ? "bg-linear-to-r from-[#FFAC47] to-[#FF2A24] border border-[#FFAC47] text-white"
                      : ""
                  }`}
                >
                  <RiNumber1 />
                </button>
                <div>
                  <p className="font-bold">Personal Information</p>
                  <p>Tell us a bit about yourself</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <button
                  className={`${
                    isActive(
                      "/become-provider/personal-information/preferences"
                    )
                      ? "p-2 rounded-full border border-[#FFAC47] text-[#FFAC47]"
                      : "p-2 rounded-full border border-gray-300"
                  }  ${
                    isActive(
                      "/become-provider/personal-information/account-summary"
                    )
                      ? "bg-linear-to-r from-[#FFAC47] to-[#FF2A24] border border-[#FFAC47] text-white"
                      : ""
                  }`}
                >
                  <RiNumber2 />
                </button>
                <div>
                  <p className="font-bold">Your Preferences</p>
                  <p>Personalize your experience</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <button
                  className={`${
                    isActive(
                      "/become-provider/personal-information/account-summary"
                    )
                      ? "p-2 rounded-full border border-[#FFAC47] text-[#FFAC47]"
                      : "p-2 rounded-full border border-gray-300"
                  }`}
                >
                  <RiNumber3 />
                </button>
                <div>
                  <p className="font-bold">Account Summary</p>
                  <p>Review Account Details</p>
                </div>
              </div>
            </div>
          </div>
          <main className="w-full lg:w-[70%]">
            <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
