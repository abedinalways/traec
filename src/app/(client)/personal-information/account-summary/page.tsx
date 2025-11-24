"use client";
import React, { useState } from "react";
import PersonalInformationSuccessfullyModal from "../../_components/modal/PersonalInformationSuccessfullyModal";

export default function AccountSummaryPage() {
  const [
    openPersonalInformationSuccessfully,
    setOpenPersonalInformationSuccessfully,
  ] = useState(false);
  return (
    <div>
      <div className="my-3 border-b border-b-gray-300 pb-3">
        <h3 className="font-bold">Account Summary</h3>
        <p>Review Account Details</p>
      </div>
      <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="font-bold">Account Details</p>
        <p>Email: : Lisa William</p>
        <p>Email Address : garawiliama@qmail com</p>
        <p>Phone Number : (252) 555-0126</p>
        <p>Location : 2118 Thornridge Cir, London, Englande El 7AA</p>
        <p>Interested in: : DJ party</p>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end py-5">
        <button
          onClick={() => setOpenPersonalInformationSuccessfully(true)}
          type="submit"
          className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-900 cursor-pointer"
        >
          Setup Account
        </button>
      </div>
      <PersonalInformationSuccessfullyModal
        isOpen={openPersonalInformationSuccessfully}
        onClose={() => setOpenPersonalInformationSuccessfully(false)}
      />
    </div>
  );
}
