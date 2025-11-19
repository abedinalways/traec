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

type Step3Data = {
  eventDate: string;
  startTime: string;
  endTime: string;
};

interface Step3Props {
  data: Step3Data;
  onNext: (values: Step3Data) => void;
  onPrevious: () => void;
}

const Step3DateTime = ({ data, onNext, onPrevious }: Step3Props) => {
  const form = useForm<Step3Data>({
    defaultValues: {
      eventDate: data.eventDate || "",
      startTime: data.startTime || "",
      endTime: data.endTime || "",
    },
  });

  const handleSubmit = (values: Step3Data) => {
    onNext(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <div className="grid grid-cols-2 gap-5">
            {/* Event Date */}
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    event date
                  </FormLabel>
                  <FormControl>
                    <Input type="date" className="p-4 text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Time */}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    start time
                  </FormLabel>
                  <FormControl>
                    <Input type="time" className="p-4 text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Time */}
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    end time
                  </FormLabel>
                  <FormControl>
                    <Input type="time" className="p-4 text-black" {...field} />
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
              className="capitalize font-inter text-base text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] py-3 px-6"
            >
              <ChevronLeft />
              previous
            </Button>

            <Button
              type="submit"
              className="capitalize font-inter text-base text-white py-3 px-6"
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

export default Step3DateTime;
