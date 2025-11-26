import React from "react";
import { IoMdLogOut } from "react-icons/io";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="grid grid-cols-1 md:min-w-lg mx-auto bg-white rounded-2xl">
        {/* RIGHT FORM */}
        <div className="flex items-center justify-center ">
          <div className="w-full flex flex-col justify-center items-center rounded-3xl">
            {/* Logo */}
            <div className="flex justify-center my-5 text-[#E9201D] border border-gray-300 p-1 rounded-full">
              <IoMdLogOut size={32} />
            </div>
            {/* Title */}
            <div className="py-1">
              <h2 className="text-center text-3xl  font-semibold ">Log Out</h2>
              <p className="py-3 text-center">
                Are you sure you want to log out?
              </p>
            </div>
          </div>
        </div>
        <div className="m-5 flex justify-between items-center gap-5">
          <button className="w-full bg-[#E9201D] border border-gray-200 rounded-2xl p-3 cursor-pointer text-white">
            Yes. Log Out
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-200 rounded-2xl p-3 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
