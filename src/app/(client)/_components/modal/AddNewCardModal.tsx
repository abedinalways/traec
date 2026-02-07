"use client";
import { useForm } from "react-hook-form";

interface CardFormData {
  cardNumber: string;
  nameOnCard: string;
  expiry: string;
  cvv: number;
}

interface AddNewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: CardFormData) => void;
}

export default function AddNewCardModal({
  onClose,
  onSubmitSuccess,
}: AddNewCardModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormData>();

  const onSubmit = (data: CardFormData) => {
    onSubmitSuccess?.(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 md:p-10 shadow-lg animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Add New Card</h2>
            <p className="text-gray-500 text-sm">Add New Card for booking.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="font-medium text-lg">Card Information</h3>

          {/* Card Number + Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Card Number</label>
              <input
                type="text"
                placeholder="1241 2145 2145 3258"
                className="mt-1 w-full rounded-md border px-4 py-3"
                {...register("cardNumber", { required: true })}
              />
              {errors.cardNumber && (
                <p className="text-red-600 text-xs">Card number is required</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-700">Name on Card</label>
              <input
                type="text"
                placeholder="Millan"
                className="mt-1 w-full rounded-md border px-4 py-3"
                {...register("nameOnCard", { required: true })}
              />
              {errors.nameOnCard && (
                <p className="text-red-600 text-xs">Name is required</p>
              )}
            </div>
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Expiry Date</label>
              <input
                type="text"
                placeholder="02/25"
                className="mt-1 w-full rounded-md border px-4 py-3"
                {...register("expiry", { required: true })}
              />
              {errors.expiry && (
                <p className="text-red-600 text-xs">Expiry date required</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-700">CVV</label>
              <input
                type="number"
                placeholder="240"
                className="mt-1 w-full rounded-md border px-4 py-3"
                {...register("cvv", { required: true })}
              />
              {errors.cvv && (
                <p className="text-red-600 text-xs">CVV is required</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="border rounded-md py-3 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white py-3 rounded-md hover:bg-gray-900"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
