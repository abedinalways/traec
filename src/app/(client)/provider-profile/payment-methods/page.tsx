"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { PiShieldWarningBold } from "react-icons/pi";
import { ActionDialog } from "@/components/reusable/ActionDialog";
import { useState } from "react";
import { AddCardDialog } from "@/components/profile/AddCardDialog";
import { StripeSetupDialog } from "@/components/profile/StripeSetupDialog";
import LeftIcon from "@/components/icons/LeftIcon";
import { useGetProviderStripeQuery } from "@/app/api/provider/providerStripeApi";

export default function Page() {
  const [isAddCardModal, setIsAddCardModal] = useState(false);
  const [isDeleteCardModal, setIsDeleteCardModal] = useState(false);
  const [isStripeSetupModal, setIsStripeSetupModal] = useState(false);

  const { data: stripeData, isLoading: isStripeLoading } =
    useGetProviderStripeQuery();

  const stripeMode = stripeData?.data?.stripe_mode ?? null;
  const stripePublicKey = stripeData?.data?.stripe_public_key ?? null;

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
    <div className="w-full max-w-4xl mx-auto px-4 py-10 font-[inter]">
      {/* Back Button */}
      <Link
        href={"/provider-profile"}
        className="flex items-center max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border text-gray-black-400 mb-4 text-[16px]"
      >
        <LeftIcon />
        Back To Account
      </Link>

      {/* Header */}
      <div className="flex md:flex-row flex-col items-start md:items-center gap-3 justify-start md:justify-between mb-6">
        {/* <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Payment Methods
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your payment methods for bookings
          </p>
        </div> */}

        {/* Add Card Button */}
        {/* <button
          onClick={() => setIsAddCardModal(true)}
          className="bg-black text-white cursor-pointer px-5 py-2 rounded-xl hover:bg-black/90 flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add Card
        </button> */}
      </div>

      {/* Card List */}
      

      {/* ============================= */}
      {/* STRIPE SETUP SECTION          */}
      {/* ============================= */}
      <div className="border rounded-xl p-6 mt-8 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
              <CreditCard className="text-purple-600" size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Stripe Payment Gateway
              </h3>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                Connect your Stripe account to accept online payments from
                customers. Your customers will pay securely via Stripe.
              </p>

              {/* Stripe Status Indicator */}
              {isStripeLoading ? (
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking Stripe status...
                </div>
              ) : stripePublicKey ? (
                <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
                  <CheckCircle2 size={18} />
                  <span>
                    Stripe connected —{" "}
                    <span className="font-medium uppercase">{stripeMode}</span>{" "}
                    mode
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-3 text-sm text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  <span>Stripe not configured yet</span>
                </div>
              )}
            </div>
          </div>

          {/* Setup / Edit Button */}
          <button
            onClick={() => setIsStripeSetupModal(true)}
            className="flex-shrink-0 bg-black text-white cursor-pointer px-5 py-2.5 rounded-xl hover:bg-black/90 text-sm font-medium transition"
          >
            {stripePublicKey ? "Edit Stripe Keys" : "Setup Stripe"}
          </button>
        </div>
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
      <StripeSetupDialog
        open={isStripeSetupModal}
        setOpen={setIsStripeSetupModal}
      />
    </div>
  );
}