"use client";

import { useMemo, useState } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ChevronLeft, ChevronRight, Mail, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type {
  ProviderPlan,
  RegisterProviderPayload,
} from "@/types/account-seetings";
import type { PersonalForm } from "./schemas";
import { useRegisterProviderMutation } from "@/app/api/provider/providerRegistrationApi";


type StepPaymentProps = {
  plan: ProviderPlan;
  values: PersonalForm;
  selectedCategoryIds: number[];
  onBack: () => void;
  onCompleted: () => void;
};

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

const getApiErrorMessage = (err: unknown) => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (err as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return "Something went wrong. Please try again.";
};

export default function StepPayment({
  plan,
  values,
  selectedCategoryIds,
  onBack,
  onCompleted,
}: StepPaymentProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [registerProvider, { isLoading }] = useRegisterProviderMutation();

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingPayload, setPendingPayload] =
    useState<RegisterProviderPayload | null>(null);
  const [pendingEmail, setPendingEmail] = useState(values.email);

  const selectedServiceText = useMemo(() => {
    return `${selectedCategoryIds.length} service${
      selectedCategoryIds.length > 1 ? "s" : ""
    } selected`;
  }, [selectedCategoryIds.length]);

  const buildPayload = (paymentMethodId: string): RegisterProviderPayload => {
    return {
      name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.street,
      city: values.city,
      state: values.state,
      zip_code: values.zip,
      password: values.password,
      password_confirmation: values.confirmPassword,
      category_id: selectedCategoryIds,
      plan_id: plan.id,
      payment_method: paymentMethodId,
    };
  };

  const validateBeforePayment = () => {
    if (!values.firstName || !values.lastName || !values.email) {
      toast.error("Please complete your personal information first.");
      return false;
    }

    if (!values.password || !values.confirmPassword) {
      toast.error("Password is required. Please go back and enter password.");
      return false;
    }

    if (values.password !== values.confirmPassword) {
      toast.error("Password and confirm password do not match.");
      return false;
    }

    if (!selectedCategoryIds.length) {
      toast.error("Please select at least one service category.");
      return false;
    }

    if (!plan?.id) {
      toast.error("Please select a provider plan.");
      return false;
    }

    return true;
  };

  const handleSendOtp = async () => {
    if (!validateBeforePayment()) return;

    if (!stripe || !elements) {
      toast.error("Stripe is not ready yet. Please wait a moment.");
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);

    if (!cardNumber) {
      toast.error("Card input is not ready.");
      return;
    }

    const loadingToast = toast.loading("Processing payment method...");

    try {
      const paymentResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
        billing_details: {
          name: `${values.firstName} ${values.lastName}`.trim(),
          email: values.email,
          phone: values.phone,
          address: {
            line1: values.street,
            city: values.city,
            state: values.state,
            postal_code: values.zip,
          },
        },
      });

      if (paymentResult.error || !paymentResult.paymentMethod) {
        toast.dismiss(loadingToast);
        toast.error(paymentResult.error?.message || "Payment method failed.");
        return;
      }

      const payload = buildPayload(paymentResult.paymentMethod.id);

      const res = await registerProvider(payload).unwrap();

      toast.dismiss(loadingToast);

      if (res?.data?.requires_verification) {
        setPendingPayload(payload);
        setPendingEmail(res.data.email || values.email);
        setOtpModalOpen(true);
        toast.success(res?.message || "OTP sent to your email.");
        return;
      }

      toast.success(res?.message || "Provider registration completed.");
      onCompleted();
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("REGISTER PROVIDER FIRST CALL ERROR:", err);
      toast.error(getApiErrorMessage(err));
    }
  };

  const handleResendOtp = async () => {
    if (!pendingPayload) {
      await handleSendOtp();
      return;
    }

    const loadingToast = toast.loading("Resending OTP...");

    try {
      const res = await registerProvider(pendingPayload).unwrap();

      toast.dismiss(loadingToast);

      if (res?.data?.requires_verification) {
        setPendingEmail(res.data.email || pendingPayload.email);
        toast.success(res?.message || "OTP resent to your email.");
        return;
      }

      toast.success(res?.message || "Provider registration completed.");
      setOtpModalOpen(false);
      onCompleted();
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("RESEND OTP ERROR:", err);
      toast.error(getApiErrorMessage(err));
    }
  };

  const handleConfirmOtp = async () => {
    if (!pendingPayload) {
      toast.error("Registration data missing. Please try again.");
      return;
    }

    if (!otp.trim() || otp.trim().length !== 4) {
      toast.error("Please enter the 4-digit OTP.");
      return;
    }

    const loadingToast = toast.loading(
      "Verifying OTP and completing registration...",
    );

    try {
      const res = await registerProvider({
        ...pendingPayload,
        otp: otp.trim(),
      }).unwrap();

      toast.dismiss(loadingToast);

      toast.success(res?.message || "Provider registration completed.");

      setOtp("");
      setPendingPayload(null);
      setOtpModalOpen(false);

      onCompleted();
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("OTP VERIFY ERROR:", err);
      toast.error(getApiErrorMessage(err));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const current = otp.padEnd(4, " ").split("");

    current[index] = digit || " ";
    const nextOtp = current.join("").replace(/\s/g, "");

    setOtp(nextOtp);

    if (digit) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <>
      <div className="p-6 font-[inter]">
        <div className="text-[24px] font-semibold text-zinc-900">
          Payment Details
        </div>

        <div className="mt-1 text-[16px] text-zinc-500">
          Secure payment powered by Stripe
        </div>

        <Separator className="my-5" />

        <div className="mb-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
            📋 {plan.title} - ${plan.price}/{plan.package}
          </span>

          <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
            🏷️ {selectedServiceText}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Card Number
            </label>

            <div className="h-12 rounded-xl border border-zinc-200 px-4 py-3">
              <CardNumberElement options={stripeElementOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Expiry Date
              </label>

              <div className="h-12 rounded-xl border border-zinc-200 px-4 py-3">
                <CardExpiryElement options={stripeElementOptions} />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                CVC
              </label>

              <div className="h-12 rounded-xl border border-zinc-200 px-4 py-3">
                <CardCvcElement options={stripeElementOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-[48px] w-[100px] cursor-pointer rounded-md"
          >
            <ChevronLeft className="h-5 w-5" /> Back
          </Button>

          <p className="text-sm text-zinc-400">Step 4 of 4</p>

          <Button
            type="button"
            disabled={isLoading || !stripe}
            onClick={handleSendOtp}
            className="h-[48px] w-[140px] cursor-pointer rounded-md gradient-bg  text-white disabled:opacity-60"
          >
            {isLoading ? "Processing..." : "Send OTP"}
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {otpModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-xl">
            <button
              type="button"
              onClick={() => setOtpModalOpen(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <Mail className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-center text-xl font-semibold text-zinc-900">
              Check Your Email
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-zinc-500">
              We sent a 4-digit code to{" "}
              <span className="font-semibold text-zinc-700">
                {pendingEmail}
              </span>
              . Enter it below to complete registration.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index]) {
                      const prevInput = document.getElementById(
                        `otp-${index - 1}`,
                      );
                      prevInput?.focus();
                    }
                  }}
                  className="h-14 w-14 rounded-xl border border-zinc-200 text-center text-xl font-semibold outline-none focus:border-zinc-900"
                />
              ))}
            </div>

            <Button
              type="button"
              disabled={isLoading}
              onClick={handleConfirmOtp}
              className="mt-5 h-12 w-full rounded-xl gradient-bg cursor-pointer text-white disabled:opacity-60"
            >
              {isLoading ? "Verifying..." : "Confirm & Register"}
            </Button>

            <p className="mt-4 text-center text-sm text-zinc-400">
              Didn&apos;t receive it?{" "}
              <button
                type="button"
                disabled={isLoading}
                onClick={handleResendOtp}
                className="font-semibold text-zinc-900 underline disabled:opacity-60"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
