// import { z } from "zod";

// export const forgotEmailSchema = z.object({
//   email: z.string().email("Enter a valid email"),
// });

// export type ForgotEmailForm = z.infer<typeof forgotEmailSchema>;

// export const otpSchema = z.object({
//   otp: z.string().length(4, "Enter 4 digit OTP"),
// });

// export type OtpForm = z.infer<typeof otpSchema>;

// export const setPasswordSchema = z
//   .object({
//     password: z.string().min(6, "Minimum 6 characters"),
//     confirmPassword: z.string().min(6, "Minimum 6 characters"),
//   })
//   .refine((d) => d.password === d.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export type SetPasswordForm = z.infer<typeof setPasswordSchema>;

import { z } from "zod";

export const personalSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(1, "Phone number is required"),
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip code is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });

export type PersonalForm = z.infer<typeof personalSchema>;