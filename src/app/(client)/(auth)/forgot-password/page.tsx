export const dynamic = "force-dynamic";
import { Suspense } from "react";
import ForgotPasswordFlow from "./ForgotPasswordFlow";

export default function ForgotPasswordPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordFlow />
      </Suspense>
    </div>
  );
}
