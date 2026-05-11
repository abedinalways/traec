// "use client";

// import { type UseFormReturn } from "react-hook-form";
// import type { PersonalForm } from "./schemas";
// import { ChevronRight } from "lucide-react";

// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function StepPersonalInfo({
//   form,
//   onNext,
// }: {
//   form: UseFormReturn<PersonalForm>;
//   onNext: () => void;
// }) {
//   return (
//     <div className="p-6 font-[inter]">
//       <div className="text-[24px] font-semibold text-zinc-900 ">
//         Personal Information
//       </div>
//       <div className="mt-1 text-[16px] text-zinc-500">
//         Tell us a bit about yourself
//       </div>

//       <Separator className="my-5" />

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onNext();
//         }}
//         className="space-y-4"
//       >
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div className="space-y-2">
//             <label className="text-[14px] text-zinc-600 my-4 ">
//               First Name
//             </label>
//             <Input
//               className="h-12 border-zinc-200 text-[12px] rounded-[32px]! shape-squircle "
//               placeholder="Enter your first name"
//               {...form.register("firstName")}
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-[14px] text-zinc-600 my-4">Last Name</label>
//             <Input
//               className="h-12 border-zinc-200 text-[12px] rounded-[32px]! shape-squircle "
//               placeholder="Enter your last name"
//               {...form.register("lastName")}
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-[14px] text-zinc-600 my-4">Email</label>
//             <Input
//               className="h-12 border-zinc-200 text-[12px] rounded-[32px]! shape-squircle "
//               placeholder="Enter your email"
//               {...form.register("email")}
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-[14px] text-zinc-600 my-4">
//               Phone Number
//             </label>
//             <Input
//               className="h-12 border-zinc-200 text-[12px] rounded-[32px]! shape-squircle "
//               placeholder="Enter your phone number"
//               {...form.register("phone")}
//             />
//           </div>
//         </div>

//         <div className="space-y-1">
//           <label className="text-[14px] text-zinc-600 my-4">
//             Street Address
//           </label>
//           <Input
//             className="h-12 border-zinc-200 text-[12px] rounded-[32px]! shape-squircle "
//             {...form.register("street")}
//           />
//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//           <div className="space-y-1">
//             <label className="text-[14px] text-zinc-600 my-4">City</label>
//             <Input
//               className="h-12 border-zinc-200 text-[12px] rounded-[32px]! shape-squircle "
//               {...form.register("city")}
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-[14px] text-zinc-600 my-4">State</label>
//             <Input
//               className="h-12 border-zinc-200 text-[12px] rounded-[32px]! shape-squircle "
//               placeholder="Enter your state"
//               {...form.register("state")}
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-[14px] text-zinc-600 my-4">Zip</label>
//             <Input
//               className="h-12 text-[12px] rounded-[32px]! shape-squircle"
//               placeholder="Enter your Zip code"
//               {...form.register("zip")}
//             />
//           </div>
//         </div>

//         <div className="flex justify-end pt-2">
//           <Button
//             type="submit"
//             className="w-[100px] h-[48px] cursor-pointer rounded-md bg-black px-5 text-[16px] text-white hover:bg-black/90 font-[inter]"

//           >
//             Next <ChevronRight className=" h-6 w-6 " />
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { type UseFormReturn } from "react-hook-form";
import type { PersonalForm } from "./schemas";
import { ChevronRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StepPersonalInfo({
  form,
  onNext,
}: {
  form: UseFormReturn<PersonalForm>;
  onNext: () => void;
}) {
  const {
    formState: { errors },
  } = form;

  return (
    <div className="p-6 font-[inter]">
      <div className="text-[24px] font-semibold text-zinc-900">
        Personal Information
      </div>

      <div className="mt-1 text-[16px] text-zinc-500">
        Tell us a bit about yourself
      </div>

      <Separator className="my-5" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="First Name" error={errors.firstName?.message}>
            <Input
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="Enter your first name"
              {...form.register("firstName")}
            />
          </Field>

          <Field label="Last Name" error={errors.lastName?.message}>
            <Input
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="Enter your last name"
              {...form.register("lastName")}
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <Input
              type="email"
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="Enter your email"
              {...form.register("email")}
            />
          </Field>

          <Field label="Phone Number" error={errors.phone?.message}>
            <Input
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="Enter your phone number"
              {...form.register("phone")}
            />
          </Field>
        </div>

        <Field label="Street Address" error={errors.street?.message}>
          <Input
            className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
            placeholder="Enter your street address"
            {...form.register("street")}
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="City" error={errors.city?.message}>
            <Input
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="City"
              {...form.register("city")}
            />
          </Field>

          <Field label="State" error={errors.state?.message}>
            <Input
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="State"
              {...form.register("state")}
            />
          </Field>

          <Field label="Zip" error={errors.zip?.message}>
            <Input
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="Zip code"
              {...form.register("zip")}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Password" error={errors.password?.message}>
            <Input
              type="password"
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="Password"
              {...form.register("password")}
            />
          </Field>

          <Field
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          >
            <Input
              type="password"
              className="h-12 rounded-[32px] border-zinc-200 text-[12px]"
              placeholder="Confirm password"
              {...form.register("confirmPassword")}
            />
          </Field>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="h-[48px] w-[100px] cursor-pointer rounded-md bg-black px-5 text-[16px] text-white hover:bg-black/90"
          >
            Next <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[14px] text-zinc-600">{label}</label>
      {children}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}