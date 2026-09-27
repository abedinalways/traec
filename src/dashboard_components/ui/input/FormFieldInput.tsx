
"use client";

import React from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
    label?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
    children: React.ReactNode;
};

export default function FormFieldInput({ label, required, error, helperText, className, children }: FormFieldProps) {
    return (
        <div className={cn("w-full flex flex-col gap-1.5", className)}>
            {label ? <label className="text-xs text-white/60">{label}{required ? <span className="text-red-400"> *</span> : null}</label> : null}
            {children}
            {error ? <p className="text-xs text-red-400">{error}</p> : helperText ? <p className="text-xs text-white/40">{helperText}</p> : null}
        </div>
    );
}
