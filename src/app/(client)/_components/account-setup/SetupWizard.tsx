"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { toast } from "sonner";

import { personalSchema, type PersonalForm } from "./schemas";
import type { Step } from "@/types/account-seetings";

import SetupHeader from "./SetupHeader";
import SetupProgress from "./SetupProgress";
import StepPersonalInfo from "./StepPersonalInfo";
import StepPreferences from "./StepPreferences";
import StepCompleted from "./StepCompleted";
import StepSelectPlan from "./StepSelectPlan";
import StepPayment from "./StepPayment";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetProviderConfigQuery, useGetServiceCategoriesQuery } from "@/app/api/provider/providerRegistrationApi";


const STORAGE_KEY = "provider_setup_wizard_v1";

type StoredWizardState = {
  step: Step;
  selectedPlanId: number | null;
  selectedCategoryIds: number[];
  values: Partial<PersonalForm>;
};

const getStepFromUrl = (value: string | null): Step => {
  const parsed = Number(value);

  if ([1, 2, 3, 4, 5].includes(parsed)) {
    return parsed as Step;
  }

  return 1;
};

export default function SetupWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: configData, isLoading: isConfigLoading } =
    useGetProviderConfigQuery();

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetServiceCategoriesQuery();

  const [step, setStepState] = React.useState<Step>(
    getStepFromUrl(searchParams.get("step")),
  );

  const [selectedPlanId, setSelectedPlanId] = React.useState<number | null>(
    null,
  );

  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<
    number[]
  >([]);

  const [stripePromise, setStripePromise] =
    React.useState<Promise<Stripe | null> | null>(null);

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
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const values = form.watch();

  const plans = configData?.data?.plans || [];
  const categories = categoriesData?.data || [];
  const selectedPlan =
    plans.find((plan) => plan.id === selectedPlanId) || plans[0];

  const cardShell =
    "rounded-lg border border-zinc-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)]";

  const setStep = (nextStep: Step) => {
    setStepState(nextStep);
    router.replace(`?step=${nextStep}`, { scroll: false });
  };

  React.useEffect(() => {
    if (!configData?.data?.stripe_public_key) return;

    setStripePromise(loadStripe(configData.data.stripe_public_key));
  }, [configData?.data?.stripe_public_key]);

  React.useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw) as StoredWizardState;

      if (saved.step) {
        setStepState(saved.step);
        router.replace(`?step=${saved.step}`, { scroll: false });
      }

      if (saved.selectedPlanId) {
        setSelectedPlanId(saved.selectedPlanId);
      }

      if (Array.isArray(saved.selectedCategoryIds)) {
        setSelectedCategoryIds(saved.selectedCategoryIds);
      }

      if (saved.values) {
        form.reset({
          firstName: saved.values.firstName || "",
          lastName: saved.values.lastName || "",
          email: saved.values.email || "",
          phone: saved.values.phone || "",
          street: saved.values.street || "",
          city: saved.values.city || "",
          state: saved.values.state || "",
          zip: saved.values.zip || "",

          
          password: "",
          confirmPassword: "",
        });
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [form, router]);

  React.useEffect(() => {
    const state: StoredWizardState = {
      step,
      selectedPlanId,
      selectedCategoryIds,
      values: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,

        
        password: "",
        confirmPassword: "",
      },
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [step, selectedPlanId, selectedCategoryIds, values]);

  React.useEffect(() => {
    if (!selectedPlanId && plans.length) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlanId]);

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const nextFromPlan = () => {
    if (!selectedPlanId) {
      toast.error("Please select a plan.");
      return;
    }

    setStep(2);
  };

  const nextFromPersonal = async () => {
    const ok = await form.trigger();

    if (!ok) {
      toast.error("Please complete all required personal information.");
      return;
    }

    setStep(3);
  };

  const nextFromPrefs = () => {
    if (!selectedCategoryIds.length) {
      toast.error("Please select at least one service category.");
      return;
    }

    setStep(4);
  };

  const handleCompleted = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setStep(5);
  };

  if (isConfigLoading || isCategoriesLoading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto w-full custom-container pt-6 bg-white">
          <SetupHeader />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[290px_1fr]">
            <Card className={cn(cardShell, "p-4")}>
              <SetupProgress step={1} />
            </Card>

            <Card className={cn(cardShell, "p-6")}>
              <p className="text-zinc-500">Loading setup configuration...</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!plans.length) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto w-full custom-container pt-6 bg-white">
          <SetupHeader />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[290px_1fr]">
            <Card className={cn(cardShell, "p-4")}>
              <SetupProgress step={1} />
            </Card>

            <Card className={cn(cardShell, "p-6")}>
              <p className="text-red-500">No provider plan found.</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full custom-container pt-6 bg-white">
        {step !== 5 && <SetupHeader />}

        {step !== 5 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[290px_1fr]">
            <Card className={cn(cardShell, "p-4")}>
              <SetupProgress step={step} />
            </Card>

            <Card className={cn(cardShell, "p-0")}>
              {step === 1 && (
                <StepSelectPlan
                  plans={plans}
                  selectedPlanId={selectedPlanId}
                  onSelectPlan={setSelectedPlanId}
                  onNext={nextFromPlan}
                />
              )}

              {step === 2 && (
                <StepPersonalInfo form={form} onNext={nextFromPersonal} />
              )}

              {step === 3 && (
                <StepPreferences
                  categories={categories}
                  selectedCategoryIds={selectedCategoryIds}
                  onToggleCategory={toggleCategory}
                  onNext={nextFromPrefs}
                />
              )}

              {step === 4 && selectedPlan && stripePromise && (
                <Elements stripe={stripePromise}>
                  <StepPayment
                    plan={selectedPlan}
                    values={values}
                    selectedCategoryIds={selectedCategoryIds}
                    onBack={() => setStep(3)}
                    onCompleted={handleCompleted}
                  />
                </Elements>
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
