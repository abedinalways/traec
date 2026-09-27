"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useUpsertProviderStripeMutation,
  useGetProviderStripeQuery,
} from "@/app/api/provider/providerStripeApi";
import type { StripeUpsertPayload } from "@/types/provider-stripe";

interface StripeSetupDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

function StripeSetupForm({
  existingData,
  onSaved,
  onCancel,
}: {
  existingData: StripeUpsertPayload | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [stripeMode, setStripeMode] = useState<"test" | "live">(
    existingData?.stripe_mode ?? "test"
  );
  const [secretKey, setSecretKey] = useState(
    existingData?.stripe_secret_key ?? ""
  );
  const [publicKey, setPublicKey] = useState(
    existingData?.stripe_public_key ?? ""
  );
  const [showSecret, setShowSecret] = useState(false);
  const [showPublic, setShowPublic] = useState(false);

  const [upsertStripe, { isLoading: isSaving }] =
    useUpsertProviderStripeMutation();

  const handleSave = async () => {
    if (!secretKey.trim()) {
      toast.error("Stripe Secret Key is required.");
      return;
    }
    if (!publicKey.trim()) {
      toast.error("Stripe Public Key is required.");
      return;
    }

    try {
      const res = await upsertStripe({
        stripe_mode: stripeMode,
        stripe_secret_key: secretKey.trim(),
        stripe_public_key: publicKey.trim(),
      }).unwrap();

      toast.success(res.message || "Stripe keys saved successfully.");
      onSaved();
    } catch (err: unknown) {
      const errMsg =
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as { data?: { message?: string } }).data?.message ===
          "string"
          ? (err as { data: { message: string } }).data.message
          : "Failed to save Stripe keys.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="border rounded-2xl p-6 mt-4 space-y-6">
      {/* Stripe Mode Toggle */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Stripe Mode
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stripe_mode"
              value="test"
              checked={stripeMode === "test"}
              onChange={() => setStripeMode("test")}
              className="accent-black"
            />
            <span className="text-sm">Test Mode</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stripe_mode"
              value="live"
              checked={stripeMode === "live"}
              onChange={() => setStripeMode("live")}
              className="accent-black"
            />
            <span className="text-sm">Live Mode</span>
          </label>
        </div>
      </div>

      {/* Stripe Secret Key */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-2">
          Stripe Secret Key
        </label>
        <div className="relative">
          <input
            type={showSecret ? "text" : "password"}
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="sk_test_..."
            className="w-full border rounded-xl px-4 py-3 pr-12 text-gray-700 focus:ring-2 focus:ring-black/10 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowSecret(!showSecret)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Stripe Public Key */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-2">
          Stripe Public Key
        </label>
        <div className="relative">
          <input
            type={showPublic ? "text" : "password"}
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            placeholder="pk_test_..."
            className="w-full border rounded-xl px-4 py-3 pr-12 text-gray-700 focus:ring-2 focus:ring-black/10 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPublic(!showPublic)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPublic ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Info text */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-medium mb-1">Where to find your Stripe keys?</p>
        <p>
          Log in to your{" "}
          <a
            href="https://dashboard.stripe.com/apikeys"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            Stripe Dashboard
          </a>{" "}
          and navigate to Developers → API Keys. Use the publishable key
          and secret key from there.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse  gap-4 pt-2">
        <Button
          variant="outline"
          className="rounded-xl w-full py-6 cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-black text-white w-full rounded-xl py-6 cursor-pointer hover:bg-black/90 disabled:opacity-50"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : existingData ? (
            "Update Stripe Keys"
          ) : (
            "Save Stripe Keys"
          )}
        </Button>
      </div>
    </div>
  );
}

export function StripeSetupDialog({ open, setOpen }: StripeSetupDialogProps) {
  const { data: existingData, isLoading: isFetching } =
    useGetProviderStripeQuery(undefined, { skip: !open });

  const existing: StripeUpsertPayload | null = existingData?.data
    ? {
        stripe_mode: existingData.data.stripe_mode,
        stripe_secret_key: existingData.data.stripe_secret_key,
        stripe_public_key: existingData.data.stripe_public_key,
      }
    : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" w-full rounded-2xl px-8 py-10 font-[inter]">
        <DialogHeader>
          <h2 className="text-2xl font-semibold">Stripe Setup</h2>
          <p className="text-gray-500 text-sm -mt-1">
            Connect your Stripe account to receive payments.
          </p>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <StripeSetupForm
            existingData={existing}
            onSaved={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}