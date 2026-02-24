"use client";

import React from "react";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/lib/utils";
import FormFieldInput from "./FormFieldInput";

type TextInputFieldProps = {
    label?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    inputClassName?: string;
} & React.ComponentProps<"input">;

export default function TextInputField({ label, required, error, helperText, className, inputClassName, ...props }: TextInputFieldProps) {
    return (
        <FormFieldInput label={label} required={required} error={error} helperText={helperText} className={className}>
            <Input {...props} className={cn("h-12 w-full rounded-[10px] border border-[#5B5A64] bg-transparent px-5 text-sm text-[#BEBEC8] placeholder:text-white/30 outline-none focus:border-[#5B5CFF]/60 focus:ring-2 focus:ring-[#5B5CFF]/10", inputClassName)} />
        </FormFieldInput>
    );
}
