"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

type Step4Data = {
  partyTheme: string;
  musicPreference: string;
  mustPlaySongs: string;
  partyGames: string;
  entranceStyle: string;
  additionalNotes: string;
};

interface Step4Props {
  data: Step4Data;
  onNext: (values: Step4Data) => void;
  onPrevious: () => void;
}

const preferencesList = [
  "loud music",
  "quiet environment",
  "indoor setup",
  "outdoor setup",
  "extra lighting",
  "no lighting",
];

const Step4Questionnaire = ({ data, onNext, onPrevious }: Step4Props) => {
  const form = useForm<Step4Data>({
    defaultValues: {
      partyTheme: data.partyTheme || "",
      musicPreference: data.musicPreference || "",
      mustPlaySongs: data.mustPlaySongs || "",
      partyGames: data.partyGames || "",
      entranceStyle: data.entranceStyle || "",
      additionalNotes: data.additionalNotes || "",
    },
  });

  const handleSubmit = (values: Step4Data) => {
    onNext(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <div className="space-y-6">
            {/* 1. What is your Party Theme? */}
            <FormField
              control={form.control}
              name="partyTheme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    1. What is your Party Theme?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Princess, Disco, Superhero"
                      className="pl-4 py-6 text-black placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. What kind of music you Preference? */}
            <FormField
              control={form.control}
              name="musicPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    2. What kind of music you Preference?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e g. , Kids' Pop, Disney, Family Hits, 80S/90s, Bollywood, Latin"
                      className="pl-4 py-6 text-black placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. What are your Must-Play Songs? */}
            <FormField
              control={form.control}
              name="mustPlaySongs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    3. What are your Must-Play Songs?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any songs that must be played"
                      className="pl-4 text-black placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 min-h-[140px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4. Do you want Dance Party Games included? */}
            <FormField
              control={form.control}
              name="partyGames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    4. Do you want Dance Party Games included?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any games that must be included"
                      className="pl-4 text-black placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 min-h-[140px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 5. How would you like the birthday child’s entrance to be? */}
            <FormField
              control={form.control}
              name="entranceStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    5. How would you like the birthday child’s entrance to be?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write the description"
                      className="pl-4 text-black placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 min-h-[140px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 6. Addition Notes */}
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56] mt-2">
                    6. Additional Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any extra preferences, timing notes, parking/ loading info, or special instructions?"
                      className="pl-4 t-black placeholder:capitalize font-normal text-base leading-6 tracking-[0.01em] focus-visible:ring-0 min-h-[140px]"
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
            {/* Previous */}
            <Button
              type="button"
              onClick={onPrevious}
              className="capitalize font-inter text-base text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] p-6"
            >
              <ChevronLeft />
              previous
            </Button>

            {/* Next */}
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
    </div>
  );
};

export default Step4Questionnaire;
