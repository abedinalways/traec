// "use client";

// import { useAuthModal } from "@/app/context/AuthModalContext";
// import LogInModal from "./LogInModal";
// import SignUpModal from "./SignUpModal";
// import ForgotPasswordModal from "./ForgotPasswordModal";
// import OTPModal from "./OTPModal";
// import SetNewPasswordModal from "../SetNewPasswordModal";
// import PasswordSetSuccessfullyModal from "./PasswordSetSuccessfullyModal";

// export default function AuthModalRenderer() {
//   const {
//     openLogin,
//     setOpenLogin,
//     openSignup,
//     setOpenSignup,
//     openForgotPassword,
//     setOpenForgotPassword,
//     openOTP,
//     setOpenOTP,
//     openSetNewPassword,
//     setOpenSetNewPassword,
//     openPasswordSetSuccessfully,
//     setOpenPasswordSetSuccessfully,
//   } = useAuthModal();

//   const openSignupModal = () => {
//     setOpenSignup(true);
//     setOpenLogin(false);
//   };

//   const openLoginModal = () => {
//     setOpenLogin(true);
//     setOpenSignup(false);
//   };
//   const openForgotPasswordModal = () => {
//     setOpenForgotPassword(true);
//     setOpenLogin(false);
//   };
//   const openOTPModal = () => {
//     setOpenOTP(true);
//     setOpenForgotPassword(false);
//   };
//   const openSetNewPasswordModal = () => {
//     setOpenSetNewPassword(true);
//     setOpenOTP(false);
//   };

//   const openPasswordSetSuccessfullydModal = () => {
//     setOpenPasswordSetSuccessfully(true);
//     setOpenOTP(false);
//   };

//   return (
//     <>
//       <LogInModal
//         isOpen={openLogin}
//         onClose={() => setOpenLogin(false)}
//         openSignup={openSignupModal}
//         openForgotPassword={openForgotPasswordModal}
//       />
//       <SignUpModal
//         isOpen={openSignup}
//         onClose={() => setOpenSignup(false)}
//         openLogin={openLoginModal}
//       />
//       <ForgotPasswordModal
//         isOpen={openForgotPassword}
//         onClose={() => setOpenForgotPassword(false)}
//         openOTP={openOTPModal}
//       />
//       <OTPModal
//         isOpen={openOTP}
//         onClose={() => setOpenOTP(false)}
//         openSetNewPassword={openSetNewPasswordModal}
//       />
//       <SetNewPasswordModal
//         isOpen={openSetNewPassword}
//         onClose={() => setOpenSetNewPassword(false)}
//         openPasswordSetSuccessfully={openPasswordSetSuccessfullydModal}
//       />
//       <PasswordSetSuccessfullyModal
//         isOpen={openPasswordSetSuccessfully}
//         onClose={() => setOpenPasswordSetSuccessfully(false)}
//       />
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { useAuthModal } from "@/app/context/AuthModalContext";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import OTPModal from "./OTPModal";
import SetNewPasswordModal from "../SetNewPasswordModal";
import PasswordSetSuccessfullyModal from "./PasswordSetSuccessfullyModal";

export default function AuthModalRenderer() {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const {
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
  } = useAuthModal();

  const openSignupModal = () => {
    setOpenSignup(true);
    setOpenLogin(false);
  };

  const openLoginModal = () => {
    setOpenLogin(true);
    setOpenSignup(false);
    setOpenPasswordSetSuccessfully(false);
  };

  const openForgotPasswordModal = () => {
    setOpenForgotPassword(true);
    setOpenLogin(false);
  };

  const openOTPModal = () => {
    setOpenOTP(true);
    setOpenForgotPassword(false);
  };

  const openSetNewPasswordModal = () => {
    setOpenSetNewPassword(true);
    setOpenOTP(false);
  };

  const openPasswordSetSuccessfullydModal = () => {
    setOpenPasswordSetSuccessfully(true);
    setOpenSetNewPassword(false);
  };

  return (
    <>
      <LogInModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        openSignup={openSignupModal}
        openForgotPassword={openForgotPasswordModal}
      />

      <SignUpModal
        isOpen={openSignup}
        onClose={() => setOpenSignup(false)}
        openLogin={openLoginModal}
      />

      <ForgotPasswordModal
        isOpen={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
        openOTP={openOTPModal}
        setForgotPasswordEmail={setForgotPasswordEmail}
      />

      <OTPModal
        isOpen={openOTP}
        onClose={() => setOpenOTP(false)}
        email={forgotPasswordEmail}
        openSetNewPassword={openSetNewPasswordModal}
      />

      <SetNewPasswordModal
        isOpen={openSetNewPassword}
        onClose={() => setOpenSetNewPassword(false)}
        email={forgotPasswordEmail}
        openPasswordSetSuccessfully={openPasswordSetSuccessfullydModal}
      />

      <PasswordSetSuccessfullyModal
        isOpen={openPasswordSetSuccessfully}
        onClose={() => {
          setOpenPasswordSetSuccessfully(false);
          setForgotPasswordEmail("");
        }}
      />
    </>
  );
}