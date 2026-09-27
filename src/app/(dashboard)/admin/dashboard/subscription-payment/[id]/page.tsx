"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetProviderSubscriptionViewQuery } from "@/app/api/admin/providerSubscriptionApi";

type SubscriptionHistory = {
  subscription_id?: number | null;
  stripe_subscription_id?: string | null;
  stripe_status?: string | null;
  provider_id?: number | null;
  provider_name?: string | null;
  provider_email?: string | null;
  plan?: string | null;
  quantity?: number | null;
  starts_at?: string | null;
  ends_at?: string | null;
  trial_ends_at?: string | null;
};

type ProviderSubscriptionDetails = {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  plan?: string | null;
  plan_package?: string | null;
  subscription_status?: string | null;
  stripe_id?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  trial_ends_at?: string | null;
  on_grace_period?: boolean | null;
  is_paused?: boolean | null;
  is_canceled?: boolean | null;
  subscription_history?: SubscriptionHistory[];
};

const getSubscription = (
  response: unknown,
): ProviderSubscriptionDetails | null => {
  const res = response as
    | ProviderSubscriptionDetails
    | {
        data?: ProviderSubscriptionDetails;
        subscription?: ProviderSubscriptionDetails;
      }
    | null;

  if (!res) return null;

  if ("data" in res && res.data) {
    return res.data;
  }

  if ("subscription" in res && res.subscription) {
    return res.subscription;
  }

  if ("id" in res) {
    return res as ProviderSubscriptionDetails;
  }

  return null;
};

const formatValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "—";

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
};

const formatStatus = (status?: string | null) => {
  if (!status) return "—";

  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ProviderSubscriptionDetailsPage() {
  const params = useParams();
  const id = String(params?.id || "");

  const { data, isLoading, isError } = useGetProviderSubscriptionViewQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const subscription = getSubscription(data);

  return (
    <div className="min-h-screen bg-[#eceff3] p-6 font-[inter]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1D2433]">
            Provider Subscription Details
          </h1>
          <p className="text-sm text-gray-500">
            View individual provider subscription information
          </p>
        </div>

        <Link
          href="/admin/dashboard/subscription-payment/subscription"
          className="rounded-lg bg-[#030914] px-4 py-2 text-sm font-medium text-white"
        >
          Back
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        {isLoading ? (
          <p className="text-sm text-gray-500">
            Loading subscription details...
          </p>
        ) : isError || !subscription ? (
          <p className="text-sm text-red-500">
            Failed to load subscription details.
          </p>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Info label="Subscription ID" value={subscription.id} />
              <Info label="Provider Name" value={subscription.name} />
              <Info label="Provider Email" value={subscription.email} />
              <Info label="Plan Name" value={subscription.plan} />
              <Info label="Plan Package" value={subscription.plan_package} />
              <Info
                label="Subscription Status"
                value={formatStatus(subscription.subscription_status)}
              />
              <Info label="Stripe Customer ID" value={subscription.stripe_id} />
              <Info label="Start Date" value={subscription.starts_at} />
              <Info label="End Date" value={subscription.ends_at} />
              <Info label="Trial Ends At" value={subscription.trial_ends_at} />
              <Info
                label="On Grace Period"
                value={subscription.on_grace_period}
              />
              <Info label="Paused" value={subscription.is_paused} />
              <Info label="Canceled" value={subscription.is_canceled} />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-5">
              <h2 className="text-[18px] font-semibold text-[#1D2433]">
                Subscription History
              </h2>

              {subscription.subscription_history?.length ? (
                <div className="mt-4 space-y-4">
                  {subscription.subscription_history.map((history, index) => (
                    <div
                      key={`${history.subscription_id || index}-${index}`}
                      className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-white p-4 md:grid-cols-2"
                    >
                      <Info
                        label="History Subscription ID"
                        value={history.subscription_id}
                      />
                      <Info
                        label="Stripe Subscription ID"
                        value={history.stripe_subscription_id}
                      />
                      <Info
                        label="Stripe Status"
                        value={formatStatus(history.stripe_status)}
                      />
                      <Info label="Provider ID" value={history.provider_id} />
                      <Info
                        label="Provider Name"
                        value={history.provider_name}
                      />
                      <Info
                        label="Provider Email"
                        value={history.provider_email}
                      />
                      <Info label="Plan" value={history.plan} />
                      <Info label="Quantity" value={history.quantity} />
                      <Info label="Starts At" value={history.starts_at} />
                      <Info label="Ends At" value={history.ends_at} />
                      <Info
                        label="Trial Ends At"
                        value={history.trial_ends_at}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">
                  No subscription history found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-[#F9FAFB] p-4">
      <p className="text-[12px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 break-words text-[15px] font-medium text-[#1D2433]">
        {formatValue(value)}
      </p>
    </div>
  );
}
