"use client";

import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Trash2 } from "lucide-react";
import { PiShieldWarningBold } from "react-icons/pi";
import { ActionDialog } from "@/components/reusable/ActionDialog";
import { useState } from "react";
import { AddCardDialog } from "@/components/profile/AddCardDialog";

export default function Page() {
  const [isAddCardModal, setIsAddCardModal] = useState(false);
  const [isDeleteCardModal, setIsDeleteCardModal] = useState(false);

  const cards = [
    {
      id: 1,
      last4: "2466",
      name: "John Doe",
      exp: "12/26",
      brand: "/images/master-card.png",
    },
    {
      id: 2,
      last4: "4257",
      name: "John Doe",
      exp: "12/26",
      brand: "/images/master-card.png",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={"/client-profile"}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} />
        Back To Account
      </Link>

      {/* Header */}
      <div className="flex md:flex-row flex-col items-start md:items-center gap-3 justify-start md:justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Payment Methods
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your payment methods for bookings
          </p>
        </div>

        {/* Add Card Button */}
        <button
          onClick={() => setIsAddCardModal(true)}
          className="bg-black text-white cursor-pointer px-5 py-2 rounded-xl hover:bg-black/90 flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add Card
        </button>
      </div>

      {/* Card List */}
      <div className="space-y-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <Image src={card.brand} alt="card brand" width={46} height={46} />

              <div>
                <p className="text-lg font-semibold tracking-wider">
                  ********{card.last4}
                </p>
                <p className="text-gray-500 text-sm">
                  {card.name} • Expires {card.exp}
                </p>
              </div>
            </div>

            {/* DELETE CARD BUTTON (KEPT!) */}
            <button
              onClick={() => setIsDeleteCardModal(true)}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-md transition"
            >
              <Trash2 className="text-gray-500 hover:text-black" size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Security Info Box */}
      <div className="border rounded-xl p-6 mt-8 bg-white flex gap-4">
        <div className="w-10 h-10">
          <PiShieldWarningBold size={26} />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            Your Payment Information is Secure
          </h3>
          <p className="text-gray-500 text-sm mt-1 leading-relaxed">
            All payment information is encrypted and stored securely. We never
            store your full card details on our servers. Your data is protected
            by industry-standard security measures.
          </p>
        </div>
      </div>

      <ActionDialog
        open={isDeleteCardModal}
        setOpen={setIsDeleteCardModal}
        icon={<Trash2 className="h-7 w-7 text-red-500" />}
        title="Card Delete"
        description="Are you sure you want to delete this payment method?"
        confirmLabel="Delete"
        onConfirm={() => {
          console.log("Card deleted");
        }}
      />
      <AddCardDialog
        open={isAddCardModal}
        setOpen={setIsAddCardModal}
        onSubmit={() => {
          console.log("Card Added");
        }}
      />
    </div>
  );
}
