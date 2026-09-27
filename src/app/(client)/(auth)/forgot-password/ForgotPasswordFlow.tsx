"use client";

import * as React from "react";
import StepForgotEmail from "./StepForgotEmail";
import StepOtp from "./StepOtp";
import StepSetNewPassword from "./StepSetNewPassword";
import SuccessPopup from "./SuccessPopup";

type Step = 1 | 2 | 3;

export default function ForgotPasswordFlow() {
  const [step, setStep] = React.useState<Step>(1);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  return (
    <div className="mt-20 py-20 bg-white flex items-center justify-center px-4 font-[inter]">
      {step === 1 && (
        <StepForgotEmail
          defaultEmail={email}
          onNext={(e) => {
            setEmail(e);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepOtp
          email={email}
          onBack={() => setStep(1)}
          onNext={(code) => {
            setOtp(code);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <StepSetNewPassword
          onBack={() => setStep(2)}
          onNext={() => {
        
            setSuccess(true);
          }}
        />
      )}

      <SuccessPopup open={success} />
    </div>
  );
}
