"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

type Step1Data = {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

interface Step1Props {
  data: Step1Data;
  onNext: (values: Step1Data) => void;
}

const Step1Location = ({ data, onNext }: Step1Props) => {
  const form = useForm({
    defaultValues: {
      streetAddress: data.streetAddress || "",
      city: data.city || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
    },
  });

  const handleSubmit = (values: Step1Data) => {
    onNext(values); // Save Step 1 data and go to Step 2
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          {/* GRID SECTION */}
          <div className="grid grid-cols-2 gap-5">
            {/* Street Address */}
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="capitalize font-inter font-normal text-sm leading-6 tracking-[0.01em] text-[#4a4c56]">
                    street address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 pl-4 py-6"
                      placeholder="enter your street address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City / State / Zip */}
            <div className="grid grid-cols-3 col-span-2 gap-5">
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize font-inter font-normal text-sm leading-6 tracking-[0.01em] text-[#4a4c56]">
                      city
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 pl-4 py-6"
                        placeholder="enter your city"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize font-inter font-normal text-sm leading-6 tracking-[0.01em] text-[#4a4c56]">
                      state
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 pl-4 py-6"
                        placeholder="enter your state"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Zip Code */}
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize font-inter font-normal text-sm leading-6 tracking-[0.01em] text-[#4a4c56]">
                      zip code
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 pl-4 py-6"
                        placeholder="enter your zip code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter font-normal text-sm leading-6 tracking-[0.01em] text-[#4a4c56]">
                    first name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 pl-4 py-6"
                      placeholder="enter your first name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter font-normal text-sm leading-6 tracking-[0.01em] text-[#4a4c56]">
                    last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 pl-4 py-6"
                      placeholder="enter your last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter font-normal text-sm leading-6 tracking-[0.01em] text-[#4a4c56]">
                    email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 pl-4 py-6"
                      placeholder="enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter font-normal text-sm leading-6 tracking-[0.01em] text-[#4a4c56]">
                    phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 pl-4 py-6"
                      placeholder="enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-end">
            <Button
              type="submit"
              className="capitalize font-inter font-normal text-base leading-6 tracking-[0.01em] text-white p-6 cursor-pointer"
            >
              next
              <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step1Location;
