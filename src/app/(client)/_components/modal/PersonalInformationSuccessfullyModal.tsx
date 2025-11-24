import React from "react";
import Modal from "./Modal";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonalInformationSuccessfullyModal({
  isOpen,
  onClose,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:min-w-lg mx-auto">
        {/* RIGHT FORM */}
        <div className="flex items-center justify-center bg-white rounded-2xl">
          <div className="w-full flex flex-col justify-center items-center p-8 rounded-3xl">
            {/* Logo */}
            <div className="w-full flex justify-center my-6">
              <Image
                src="/images/PersonalInformationSuccessfullyModal.png"
                width={100}
                height={100}
                alt="logo"
              />
            </div>

            {/* Title */}
            <div className="py-10">
              <h2 className="text-center text-3xl text-[#00A63E] font-semibold ">
                Account Setup Completed
              </h2>
              <p className="py-3 text-center">
                Your account Created successfully!
              </p>
            </div>
            <Link href={"/"}>
              {" "}
              <button className="flex w-full items-center gap-3 border border-gray-200 rounded-2xl p-4 cursor-pointer">
                Go to Home page
                <MdArrowForwardIos />
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
