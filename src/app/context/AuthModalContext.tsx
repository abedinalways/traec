"use client";

import { createContext, useContext, useState } from "react";

type AuthModalContextType = {
  openLogin: boolean;
  setOpenLogin: (value: boolean) => void;

  openSignup: boolean;
  setOpenSignup: (value: boolean) => void;

  openForgotPassword: boolean;
  setOpenForgotPassword: (value: boolean) => void;

  openOTP: boolean;
  setOpenOTP: (value: boolean) => void;

  openSetNewPassword: boolean;
  setOpenSetNewPassword: (value: boolean) => void;

  openPasswordSetSuccessfully: boolean;
  setOpenPasswordSetSuccessfully: (value: boolean) => void;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [openSetNewPassword, setOpenSetNewPassword] = useState(false);
  const [openPasswordSetSuccessfully, setOpenPasswordSetSuccessfully] =
    useState(false);

  return (
    <AuthModalContext.Provider
      value={{
        openLogin,
        setOpenLogin,

        openSignup,
        setOpenSignup,

        openForgotPassword,
        setOpenForgotPassword,

        openOTP,
        setOpenOTP,

        openSetNewPassword,
        setOpenSetNewPassword,

        openPasswordSetSuccessfully,
        setOpenPasswordSetSuccessfully,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used inside AuthModalProvider");
  }
  return context;
}
