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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

type Step4Data = {
  preferences: string[];
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
      preferences: data.preferences || [],
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
            {/* Preferences - Checkbox List */}
            <FormField
              control={form.control}
              name="preferences"
              render={() => (
                <FormItem>
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56]">
                    your preferences
                  </FormLabel>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {preferencesList.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="preferences"
                        render={({ field }) => {
                          const isChecked = field.value?.includes(item);

                          return (
                            <FormItem
                              key={item}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, item]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (value: string) => value !== item
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm capitalize font-inter text-[#4a4c56]">
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Notes */}
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="capitalize font-inter text-sm text-[#4a4c56] mt-2">
                    additional notes
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="add any specific details"
                      className="p-4 text-black capitalize"
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
              className="capitalize font-inter text-base text-black bg-[#f6f8fa] hover:bg-[#f6f8fa] py-3 px-6"
            >
              <ChevronLeft />
              previous
            </Button>

            {/* Next */}
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

export default Step4Questionnaire;
