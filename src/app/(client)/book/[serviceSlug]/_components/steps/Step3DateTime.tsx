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
import { CalendarDays, ChevronLeft, ChevronRight, Clock4 } from "lucide-react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useRef } from "react";

type Step3Data = {
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
};

interface Step3Props {
  data: Step3Data;
  onNext: (v: Step3Data) => void;
  onPrevious: () => void;
}

export default function Step3DateTime({
  data,
  onNext,
  onPrevious,
}: Step3Props) {
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const form = useForm<Step3Data>({
    defaultValues: {
      eventStartDate: data.eventStartDate || "",
      eventEndDate: data.eventEndDate || "",
      eventStartTime: data.eventStartTime || "",
      eventEndTime: data.eventEndTime || "",
    },
  });

  const handleSubmit = (values: Step3Data) => onNext(values);

  const inputStyle =
    "p-4 w-full rounded-lg border text-black placeholder:text-[#9ca3af] focus-visible:ring-0";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
        <div className="grid grid-cols-2 gap-5">
          {/* Event Start Date */}
          <FormField
            control={form.control}
            name="eventStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                  event start date
                </FormLabel>

                <div className="relative">
                  <Input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    {...field}
                    ref={(el) => {
                      field.ref(el);
                      startDateRef.current = el;
                    }}
                    className={clsx(inputStyle, "pl-4 py-6")}
                  />

                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] cursor-pointer"
                    onClick={() => startDateRef.current?.showPicker()}
                  >
                    <CalendarDays size={20} />
                  </span>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event End Date */}
          <FormField
            control={form.control}
            name="eventEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                  event end date
                </FormLabel>

                <div className="relative">
                  <Input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    {...field}
                    ref={(el) => {
                      field.ref(el);
                      endDateRef.current = el;
                    }}
                    className={clsx(inputStyle, "pl-4 py-6")}
                  />

                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] cursor-pointer"
                    onClick={() => endDateRef.current?.showPicker()}
                  >
                    <CalendarDays size={20} />
                  </span>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Time */}
          <FormField
            control={form.control}
            name="eventStartTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                  start time
                </FormLabel>

                <div className="relative">
                  <Input
                    type="time"
                    placeholder="00:00"
                    {...field}
                    ref={(el) => {
                      field.ref(el);
                      startTimeRef.current = el;
                    }}
                    className="pl-4 py-6 text-black w-full placeholder:text-[#9ca3af]"
                  />

                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] cursor-pointer"
                    onClick={() => startTimeRef.current?.showPicker()}
                  >
                    <Clock4 />
                  </span>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Time */}
          <FormField
            control={form.control}
            name="eventEndTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                  end time
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      type="time"
                      placeholder="00:00"
                      {...field}
                      ref={(el) => {
                        field.ref(el);
                        endTimeRef.current = el;
                      }}
                      className="pl-4 py-6 text-black w-full placeholder:text-[#9ca3af]"
                    />

                    <span
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] cursor-pointer"
                      onClick={() => endTimeRef.current?.showPicker()}
                    >
                      <Clock4 />
                    </span>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            onClick={onPrevious}
            className="capitalize font-inter text-base text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] p-6"
          >
            <ChevronLeft />
            previous
          </Button>

          <Button
            type="submit"
            className="capitalize font-inter text-base text-white p-6"
          >
            next
            <ChevronRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
