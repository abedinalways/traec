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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

const BookingForm = () => {
  const form = useForm();

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <div className="grid grid-cols-2 gap-5">
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
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 p-4"
                      placeholder="enter your street address"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 col-span-2 gap-5">
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
                        className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 p-4"
                        placeholder="enter your city"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 p-4"
                        placeholder="enter your state"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 p-4"
                        placeholder="enter your zip code"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 p-4"
                      placeholder="enter your first name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 p-4"
                      placeholder="enter your last name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 p-4"
                      placeholder="enter your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
                      className="placeholder:capitalize text-black font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 p-4"
                      placeholder="enter your phone number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="capitalize font-inter font-normal text-base leading-6 tracking-[0.01em] text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] cursor-pointer py-3 px-6"
            >
              <ChevronLeft />
              previous
            </Button>
            <Button
              type="submit"
              className="capitalize font-inter font-normal text-base leading-6 tracking-[0.01em] text-white py-3 px-6 cursor-pointer"
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

export default BookingForm;
