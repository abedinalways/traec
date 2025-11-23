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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

type Step2Data = {
  eventType: string;
  eventName: string;
  guestsCount: number;
  eventDuration: number;
  eventDescription: string;
};

interface Step2Props {
  data: Step2Data;
  onNext: (values: Step2Data) => void;
  onPrevious: () => void;
}

const Step2EventDetails = ({ data, onNext, onPrevious }: Step2Props) => {
  const form = useForm<Step2Data>({
    defaultValues: {
      eventType: data.eventType || "",
      eventName: data.eventName || "",
      guestsCount: data.guestsCount || 0,
      eventDuration: data.eventDuration || 0,
      eventDescription: data.eventDescription || "",
    },
  });

  const handleSubmit = (values: Step2Data) => {
    onNext(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <div className="grid grid-cols-2 gap-5">
            {/* Event Type */}
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    event type
                  </FormLabel>

                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger className="w-full py-6 text-black capitalize">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>

                      <SelectContent className="text-black capitalize">
                        <SelectGroup>
                          <SelectItem value="dj-party" className="p-4">
                            DJ Party
                          </SelectItem>
                          <SelectItem value="birthday" className="p-4">
                            Birthday Event
                          </SelectItem>
                          <SelectItem value="wedding" className="p-4">
                            Wedding DJ
                          </SelectItem>
                          <SelectItem value="corporate" className="p-4">
                            Corporate Event
                          </SelectItem>
                          <SelectItem value="school-event" className="p-4">
                            School Event / Prom
                          </SelectItem>
                          <SelectItem value="festival" className="p-4">
                            Festival / Outdoor Event
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Name */}
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    event name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your event name"
                      className="pl-4 py-6 text-black placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guest Count */}
            <FormField
              control={form.control}
              name="guestsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    expected guest count
                  </FormLabel>

                  <div className="relative">
                    {/* INPUT (user can type manually any number) */}
                    <Input
                      type="text"
                      min={1}
                      placeholder="Enter guest count"
                      className="pl-4 py-6 text-black w-full placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />

                    {/* DROPDOWN BUTTON */}
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="absolute right-0 top-0 h-full w-14 flex items-center justify-center border-0 rounded-none p-6 text-black bg-none">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="text-black capitalize max-h-60 overflow-y-auto">
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(
                          (num) => (
                            <SelectItem
                              value={String(num)}
                              key={num}
                              className="p-4"
                            >
                              {num}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Duration */}
            <FormField
              control={form.control}
              name="eventDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    event duration
                  </FormLabel>

                  <div className="relative">
                    {/* INPUT (user can type manually any number) */}
                    <Input
                      type="text"
                      min={1}
                      placeholder="eg. 8 (in hr)"
                      className="pl-4 py-6 text-black w-full placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />

                    {/* DROPDOWN BUTTON */}
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="absolute right-0 top-0 h-full w-14 flex items-center justify-center border-0 rounded-none p-6 text-black bg-none">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="text-black capitalize max-h-60 overflow-y-auto">
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(
                          (num) => (
                            <SelectItem
                              value={String(num)}
                              key={num}
                              className="p-4"
                            >
                              {num}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Description */}
            <FormField
              control={form.control}
              name="eventDescription"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    event description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write Something About Your Event"
                      className=" text-black min-h-[150px] pl-4 placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0"
                      {...field}
                    />
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
              className="capitalize font-inter font-normal text-base leading-6 tracking-[0.01em] text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] p-6"
            >
              <ChevronLeft />
              previous
            </Button>

            <Button
              type="submit"
              className="capitalize font-inter font-normal text-base leading-6 tracking-[0.01em] text-white p-6"
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

export default Step2EventDetails;
