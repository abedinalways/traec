"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import ServiceBreadcrumb from "../[serviceSlug]/_components/ServiceBreadcrumb";
import TrackIcon from "@/components/icons/TrackIcon";
import PeopleIcon from "@/components/icons/PeopleIcon";
import Location from "@/components/icons/Location";
import CalendarIcons from "@/components/icons/CalendarIcons";
import ClockIcons from "@/components/icons/ClockIcons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useBooking } from "../context/BookingContext";
import { useCreateOrderMutation } from "@/app/api/booking/bookingApi";
import { useGetProviderConfigQuery } from "@/app/api/provider/providerRegistrationApi";
import { toast } from "sonner";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

/* =========================
   Stripe Payment Form
   ========================= */
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripeElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#111827",
      "::placeholder": {
        color: "#c4cbd5",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
};

function StripePaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();

  const { bookingData, serviceId, pricingId } = useBooking();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handlePay = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe is not ready. Please wait.");
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      toast.error("Card input not found.");
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading("Processing payment...");

    try {
      // 1. Create Stripe PaymentMethod
      const paymentResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
        billing_details: {
          name: `${bookingData.step1.firstName} ${bookingData.step1.lastName}`.trim(),
          email: bookingData.step1.email,
          phone: bookingData.step1.phoneNumber,
          address: {
            line1: bookingData.step1.streetAddress,
            city: bookingData.step1.city,
            state: bookingData.step1.state,
            postal_code: bookingData.step1.zipCode,
          },
        },
      });

      if (paymentResult.error || !paymentResult.paymentMethod) {
        toast.dismiss(loadingToast);
        toast.error(paymentResult.error?.message || "Payment method failed.");
        setIsProcessing(false);
        return;
      }

      const paymentMethodId = paymentResult.paymentMethod.id;

      // 2. Build the order payload matching the API requirement
      const payload = {
        service_id: serviceId,
        service_pricing_id: pricingId,
        address: bookingData.step1.streetAddress,
        city: bookingData.step1.city,
        state: bookingData.step1.state,
        zip_code: bookingData.step1.zipCode,
        first_name: bookingData.step1.firstName,
        last_name: bookingData.step1.lastName,
        email: bookingData.step1.email,
        phone: bookingData.step1.phoneNumber,
        event_name: bookingData.step2.eventName,
        guest_count: bookingData.step2.guestsCount,
        event_duration: `${bookingData.step2.eventDuration} hours`,
        event_description: bookingData.step2.eventDescription,
        event_start_date: bookingData.step3.eventStartDate,
        event_end_date: bookingData.step3.eventEndDate,
        start_time: bookingData.step3.eventStartTime,
        end_time: bookingData.step3.eventEndTime,
        question_one: bookingData.step4.partyTheme,
        question_two: bookingData.step4.musicPreference,
        question_three: bookingData.step4.mustPlaySongs,
        question_four: bookingData.step4.partyGames,
        question_five: bookingData.step4.entranceStyle,
        question_six: bookingData.step4.additionalNotes,
        include_order_ids: bookingData.step5.addons,
        agree_terms: true,
        payment_method: "stripe",
        payment_method_id: paymentMethodId,
      };

      // 3. Submit order to backend
      const res = await createOrder(payload).unwrap();

      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success(res.message || "Booking confirmed successfully!");
        setOrderNumber(res.data?.order_number || "");
        setBookingConfirmed(true);
        onSuccess();
      } else {
        toast.error(res.message || "Failed to create order.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("CHECKOUT ERROR:", err);
      const errMsg =
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as { data?: { message?: string } }).data?.message ===
          "string"
          ? (err as { data: { message: string } }).data.message
          : "Something went wrong. Please try again.";
      toast.error(errMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="text-center py-20">
        <div>
          <Image
            src="/images/profile/img111.png"
            alt="Booking Confirmed"
            width={94}
            height={94}
            className="mx-auto mb-6"
          />
        </div>
        <h2 className="text-green-600 text-2xl font-bold">
          Booking Confirmed!
        </h2>
        <p className="text-[16px]">
          Your party rental has been successfully booked!
        </p>
        <span className="inline-block mt-2 rounded-full border border-green-400 p-2 text-[14px]">
          Order ID #{orderNumber}
        </span>
        <button className="mt-6 bg-black cursor-pointer text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto">
          Download Receipt <MdOutlineFileDownload />
        </button>

        <Link href="/order-details">
          <button className="mt-4 border px-6 py-3 cursor-pointer rounded-lg flex items-center gap-2 mx-auto">
            Go to order page <IoIosArrowForward />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT SIDE - Payment Form */}
      <div className="lg:w-[68%] space-y-4">
        {/* Payment Method */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" defaultChecked />
              <span className="text-sm">Credit/Debit Card (Stripe)</span>
            </label>
          </div>
        </div>

        {/* Card Information */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Card Information</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600">Card Number</label>
              <div className="mt-1 h-12 rounded-xl border border-zinc-200 px-4 py-3">
                <CardNumberElement options={stripeElementOptions} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600">Expiry Date</label>
                <div className="mt-1 h-12 rounded-xl border border-zinc-200 px-4 py-3">
                  <CardExpiryElement options={stripeElementOptions} />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600">CVC</label>
                <div className="mt-1 h-12 rounded-xl border border-zinc-200 px-4 py-3">
                  <CardCvcElement options={stripeElementOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Additional Options</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded" />
              Save card for future bookings.
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded" />
              Send me rebooking reminders for annual events.
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - ORDER SUMMARY */}
      <div className="lg:w-[32%]">
        <div className="border border-gray-200 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold">Order Summary</h3>

          <div className="bg-[#FAF5EF] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 grid place-content-center rounded-md bg-gradient-to-r from-[#FFAC47] to-[#FF2A24]">
                <TrackIcon />
              </div>
              <div>
                <p className="text-sm font-medium">Event Booking</p>
                <p className="text-xs text-gray-500">
                  {bookingData.step2.eventName || "Event"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <CalendarIcons />{" "}
              {bookingData.step3.eventStartDate || "N/A"} &ndash;{" "}
              {bookingData.step3.eventEndDate || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <ClockIcons />{" "}
              {bookingData.step3.eventStartTime || "N/A"} &ndash;{" "}
              {bookingData.step3.eventEndTime || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Location /> {bookingData.step1.city},{" "}
              {bookingData.step1.state}
            </p>
            <p className="flex items-center gap-2">
              <PeopleIcon /> {bookingData.step1.firstName}{" "}
              {bookingData.step1.lastName}
            </p>
          </div>

          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span>
                $
                {bookingData.step5.totalPrice -
                  bookingData.step5.addons.length * 75}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Add-ons:</span>
              <span>${bookingData.step5.addons.length * 75}</span>
            </div>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total Amount</span>
            <span>${bookingData.step5.totalPrice}</span>
          </div>

          <button
            onClick={handlePay}
            disabled={isProcessing || !stripe}
            className="w-full bg-black text-white py-3 rounded-lg mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Parent Checkout Page
   ========================= */
export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "basic";

  const { data: configData } = useGetProviderConfigQuery();
  const stripePublicKey = configData?.data?.stripe_public_key;

  const [stripePromise, setStripePromise] =
    React.useState<Promise<Stripe | null> | null>(null);

  React.useEffect(() => {
    if (!stripePublicKey) return;
    setStripePromise(loadStripe(stripePublicKey));
  }, [stripePublicKey]);

  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="my-10 font-[inter]">
      <div className="custom-container mx-auto">
        <ServiceBreadcrumb step={2} />

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Checkout</h2>
          <p className="text-sm text-gray-500">
            Your payment information is secure and encrypted
          </p>
        </div>

        {stripePromise ? (
          <Elements stripe={stripePromise}>
            <StripePaymentForm onSuccess={() => setConfirmed(true)} />
          </Elements>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Loading payment system...
          </div>
        )}
      </div>
    </div>
  );
}