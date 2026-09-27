"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AddCardDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSubmit?: () => void;
}

export function AddCardDialog({ open, setOpen, onSubmit }: AddCardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl w-full rounded-2xl px-8 py-10 font-[inter]">
        <DialogHeader>
          <h2 className="text-2xl font-semibold">Add New Card</h2>
          <p className="text-gray-500 text-sm -mt-1">
            Add New Card for booking.
          </p>
        </DialogHeader>

        {/* Form Box */}
        <div className="border rounded-2xl p-6 mt-4 space-y-6">
          <h3 className="font-medium">Card Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Number */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1241 2145 2145 3258"
                className="border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-black/10 outline-none"
              />
            </div>

            {/* Name on Card */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Name on Card</label>
              <input
                type="text"
                placeholder="John Doe"
                className="border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-black/10 outline-none"
              />
            </div>

            {/* Expiry */}
            <div className="flex flex-col py-3">
              <label className="text-sm text-gray-600 mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="02/25"
                className="border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-black/10 outline-none"
              />
            </div>

            {/* CVV */}
            <div className="flex flex-col py-3">
              <label className="text-sm text-gray-600 mb-2">CVV</label>
              <input
                type="text"
                placeholder="240"
                className="border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-black/10 outline-none"
              />
            </div>
            <div className="flex md:flex-row flex-col-reverse mt-2  gap-4">
              <Button
                variant="outline"
                className="rounded-xl w-full py-6 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                className="bg-black text-white w-full rounded-xl py-6 cursor-pointer hover:bg-black/90"
                onClick={() => {
                  onSubmit?.();
                  setOpen(false);
                }}
              >
                Add Card
              </Button>
            </div>
          </div>
        </div>

        {/* Buttons */}
      </DialogContent>
    </Dialog>
  );
}
