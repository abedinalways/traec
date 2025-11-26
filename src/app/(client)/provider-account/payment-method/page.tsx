"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { FaCcMastercard } from "react-icons/fa";
import { GrShieldSecurity } from "react-icons/gr";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteCardModal from "../../_components/modal/DeleteCardModal";
import AddNewCardModal from "../../_components/modal/AddNewCardModal";

export default function PaymentMethodPage() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAddNewCardModal, setIsOpenAddNewCardModal] = useState(false);
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={"/profile"}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border  text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} className="pt-1" />
        Back To Account
      </Link>

      <div className="flex items-center justify-between my-5">
        <div>
          {" "}
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-900">
            Payment Methods
          </h1>
          <p className="text-gray-500">
            Manage your payment methods for bookings
          </p>
        </div>
        {/* Add Card Button */}
        <div>
          {" "}
          <button
            onClick={() => setIsOpenAddNewCardModal(true)}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-black/90 cursor-pointer"
          >
            Add Card
          </button>
        </div>
      </div>
      <Card className="p-4 md:p-6  shadow-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaCcMastercard size={32} />
            <div>
              <p>**********2466</p>
              <p>John Doe • Expires 12/26</p>
            </div>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => setIsOpenDelete(true)}
          >
            {" "}
            <RiDeleteBinLine size={32} />
          </button>
        </div>
      </Card>
      <Card className="p-4 md:p-6  shadow-none my-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaCcMastercard size={32} />
            <div>
              <p>**********2466</p>
              <p>John Doe • Expires 12/26</p>
            </div>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => setIsOpenDelete(true)}
          >
            {" "}
            <RiDeleteBinLine size={32} />
          </button>
        </div>
      </Card>

      <Card className="p-4 md:p-6  shadow-none ">
        <div className="flex items-center gap-2">
          <GrShieldSecurity size={32} />
          <p className="font-bold">Your Payment Information is Secure</p>
        </div>
        <p>
          All payment information is encrypted and stored securely, We never
          store your full card details on our servers. Your data is protected by
          industry-standard security measures.
        </p>
      </Card>
      {isOpenDelete && (
        <DeleteCardModal
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
        />
      )}

      {isOpenAddNewCardModal && (
        <AddNewCardModal
          isOpen={isOpenAddNewCardModal}
          onClose={() => setIsOpenAddNewCardModal(false)}
        />
      )}
    </div>
  );
}
