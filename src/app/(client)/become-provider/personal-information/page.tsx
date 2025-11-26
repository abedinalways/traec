"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from "next/navigation";

type PersonalInformationType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state1: string;
  state2: string;
};

export default function PersonalInformationPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalInformationType>({ mode: "onBlur" });
  const router = useRouter();

  const onSubmit = (data: PersonalInformationType) => {
    console.log(data);
    reset();
    router.push("/become-provider/personal-information/preferences");
  };
  return (
    <div>
      <div className="my-3 border-b border-b-gray-300 pb-3">
        <h3 className="font-bold">Personal Information</h3>
        <p>Tell us a bit about yourself</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Street Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            className="w-full border rounded-lg p-3"
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              {...register("city", { required: "City is required" })}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              {...register("state1", { required: "State is required" })}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your state"
            />
            {errors.state1 && (
              <p className="text-red-500 text-sm">{errors.state1.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              {...register("state2", { required: "State is required" })}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your state"
            />
            {errors.state2 && (
              <p className="text-red-500 text-sm">{errors.state2.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 cursor-pointer"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
}
