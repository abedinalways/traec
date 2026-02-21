import { z } from "zod";

export const forgotEmailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type ForgotEmailForm = z.infer<typeof forgotEmailSchema>;

export const otpSchema = z.object({
  otp: z.string().length(4, "Enter 4 digit OTP"),
});

export type OtpForm = z.infer<typeof otpSchema>;

export const setPasswordSchema = z
  .object({
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6, "Minimum 6 characters"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SetPasswordForm = z.infer<typeof setPasswordSchema>;
