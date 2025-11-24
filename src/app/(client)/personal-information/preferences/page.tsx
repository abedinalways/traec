"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  services: string[];
  eventTypes: string[];
};

const SERVICES = [
  "DJ Services",
  "Entertainment",
  "Catering",
  "Photography",
  "Decorators",
  "Rentals",
];

const EVENT_TYPES = [
  "Graduation",
  "Holiday Party",
  "Corporate Event",
  "Baby Shower",
  "Wedding",
  "Other",
];

export default function PreferencesForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      services: [],
      eventTypes: [],
    },
  });
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    if (data.services.length === 0) {
      setError("services", {
        type: "manual",
        message: "Select at least one service",
      });
      return;
    }

    clearErrors("services");
    console.log("Form Submitted:", data);
    router.push("/personal-information/account-summary");
  };

  return (
    <div>
      <div className="my-3 border-b border-b-gray-300 pb-3">
        <h3 className="font-bold">Your Preferences</h3>
        <p className="text-gray-500">Personalize your experience</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* SERVICES */}
        <p className="text-sm font-medium mb-2">
          What services are you interested in?{" "}
          <span className="text-red-500">(Select at least one)</span>
        </p>

        {errors.services && (
          <p className="text-red-500 text-sm mb-2">{errors.services.message}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SERVICES.map((service) => (
            <label
              key={service}
              className={`flex items-center gap-3 border rounded-xl px-4 py-4 cursor-pointer transition ${
                false ? "border-black" : "border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                value={service}
                {...register("services")}
                className="w-5 h-5"
              />
              <span className="text-base">{service}</span>
            </label>
          ))}
        </div>

        {/* EVENT TYPES */}
        <p className="text-sm font-medium mb-2">
          What type of events do you usually host? (Optional)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {EVENT_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 border rounded-xl px-4 py-4 cursor-pointer border-gray-300"
            >
              <input
                type="checkbox"
                value={type}
                {...register("eventTypes")}
                className="w-5 h-5"
              />
              <span className="text-base">{type}</span>
            </label>
          ))}
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-900 cursor-pointer"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
}
