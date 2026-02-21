"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { personalSchema, type PersonalForm } from "./schemas";
import { type Step, SERVICES, INVESTOR_HELP } from "@/types/account-seetings";

import SetupHeader from "./SetupHeader";
import SetupProgress from "./SetupProgress";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import StepPersonalInfo from "./StepPersonalInfo";
import StepPreferences from "./StepPreferences";
import StepSummary from "./StepSummary";
import StepCompleted from "./StepCompleted";

export default function SetupWizard() {
  const [step, setStep] = React.useState<Step>(1);

  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [selectedInvestorHelp, setSelectedInvestorHelp] = React.useState<
    string[]
  >([]);

  const form = useForm<PersonalForm>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    mode: "onSubmit",
  });

  const values = form.watch();

  const cardShell =
    "rounded-lg border border-zinc-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)]";

  async function nextFromPersonal() {
    const ok = await form.trigger();
    if (!ok) return;
    setStep(2);
  }

  function nextFromPrefs() {
    setStep(3);
  }

  function shareAccount() {
    setStep(4);
  }

  function toggle(
    list: string[],
    setList: (v: string[]) => void,
    item: string,
  ) {
    setList(
      list.includes(item) ? list.filter((x) => x !== item) : [...list, item],
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="mx-auto w-full custom-container pt-6 bg-white">
        {/* ✅ Hide header only on completed page (step 4) */}
        {step !== 4 && <SetupHeader />}

        {step !== 4 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[290px_1fr]">
            <Card className={cn(cardShell, "p-4")}>
              <SetupProgress step={step} />
            </Card>

            <Card className={cn(cardShell, "p-0")}>
              {step === 1 && (
                <StepPersonalInfo form={form} onNext={nextFromPersonal} />
              )}

              {step === 2 && (
                <StepPreferences
                  services={SERVICES}
                  investorHelp={INVESTOR_HELP}
                  selectedServices={selectedServices}
                  selectedInvestorHelp={selectedInvestorHelp}
                  onToggleService={(s) =>
                    toggle(selectedServices, setSelectedServices, s)
                  }
                  onToggleInvestorHelp={(s) =>
                    toggle(selectedInvestorHelp, setSelectedInvestorHelp, s)
                  }
                  onNext={nextFromPrefs}
                />
              )}

              {step === 3 && (
                <StepSummary
                  values={values}
                  selectedServices={selectedServices}
                  onShare={shareAccount}
                />
              )}
            </Card>
          </div>
        ) : (
          <StepCompleted />
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
