"use client";

import * as React from "react";
import Logo from "./Logo";


export default function StepOtp({
  email,
  onNext,
  onBack,
}: {
  email: string;
  onNext: (otp: string) => void;
  onBack: () => void;
}) {
  const [otp, setOtp] = React.useState<string[]>(["", "", "", ""]);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const [seconds, setSeconds] = React.useState(59);

  React.useEffect(() => {
    inputsRef.current?.[0]?.focus();
  }, []);

  React.useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  function setDigit(idx: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[idx] = v;
    setOtp(next);

    if (v && idx < 3) inputsRef.current[idx + 1]?.focus();
  }

  function onKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const next = [...otp];
        next[idx] = "";
        setOtp(next);
        return;
      }
      if (idx > 0) inputsRef.current[idx - 1]?.focus();
    }
  }

  const joined = otp.join("");
  const canSubmit = joined.length === 4;

  return (
    <div className="w-full max-w-[420px] rounded-xl border border-gray-200 bg-white px-8 py-8">
      <Logo/>

      <h2 className="text-center text-[24px] font-semibold">Enter OTP Code</h2>

      <div className="mt-5 flex justify-center gap-3">
        {otp.map((d, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            value={d}
            onChange={(e) => setDigit(idx, e.target.value)}
            onKeyDown={(e) => onKeyDown(idx, e)}
            inputMode="numeric"
            maxLength={1}
            className="h-11 w-11 rounded-md border border-gray-200 text-center text-[14px] focus:outline-none"
          />
        ))}
      </div>

      <div className="mt-4 text-center text-[14px] text-gray-500">
        Sent to <span className="text-gray-700">{email}</span>
      </div>

      <div className="mt-3 text-center text-[14px] text-gray-500">
        {seconds > 0 ? (
          <>
            Resend code in{" "}
            <span className="text-[#FF2A24] font-medium">{seconds}s</span>
          </>
        ) : (
          <button
            type="button"
            className="text-[#FF2A24] font-medium"
            onClick={() => setSeconds(59)}
          >
            Resend code
          </button>
        )}
      </div>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={() => onNext(joined)}
        className="mt-5 w-full h-10 rounded-md text-white font-medium bg-gradient-to-r from-[#FFAC47] to-[#FF2A24] cursor-pointer text-[16px] disabled:opacity-50"
      >
        Verify
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full text-center text-[16px] text-gray-500"
      >
        Back
      </button>
    </div>
  );
}
