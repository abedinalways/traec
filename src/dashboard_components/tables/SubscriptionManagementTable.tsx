"use client";

import Image from "next/image";
import Link from "next/link";
import ReusableTableForAll from "./ReusableTableForAll";
import EyeIcon from "@/icons/EyeIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { CrossIcon, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ProviderSubscription,
  useCancelProviderSubscriptionMutation,
  useGetAllProviderSubscriptionsQuery,
} from "@/app/api/admin/providerSubscriptionApi";
import { getImageUrl } from "@/lib/getImageUrl";
import { MdCancel, MdDelete, MdOutlineCancel } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const PER_PAGE = 5;

const getSubscriptions = (response: unknown): ProviderSubscription[] => {
  const res = response as {
    data?: ProviderSubscription[] | { data?: ProviderSubscription[] };
    subscriptions?: ProviderSubscription[];
  };

  if (Array.isArray(res?.data)) {
    return res.data;
  }

  if (Array.isArray(res?.data?.data)) {
    return res.data.data;
  }

  if (Array.isArray(res?.subscriptions)) {
    return res.subscriptions;
  }

  return [];
};

const getProviderName = (row: ProviderSubscription) => {
  return row.name || "Unknown Provider";
};

const getProviderEmail = (row: ProviderSubscription) => {
  return row.email || "No email found";
};

const getPlanName = (row: ProviderSubscription) => {
  return row.plan || "No plan";
};

const getBillingText = (row: ProviderSubscription) => {
  return row.plan_package || "—";
};

const getStatusText = (row: ProviderSubscription) => {
  return row.subscription_status || "Unknown";
};

const getStripeId = (row: ProviderSubscription) => {
  return row.stripe_id || "—";
};

const getStatusClass = (status: string) => {
  const normalized = status.toLowerCase();

  if (normalized.includes("active")) {
    return "bg-blue-100 text-[#4895ff]";
  }

  if (normalized.includes("cancel")) {
    return "bg-red-100 text-red-600";
  }

  if (normalized.includes("pause")) {
    return "bg-yellow-100 text-yellow-700";
  }

  if (normalized.includes("past") || normalized.includes("due")) {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-gray-100 text-gray-600";
};

const formatDate = (date?: string | null) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export default function SubscriptionManagementTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [billingFilter, setBillingFilter] = useState("All Billing");

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllProviderSubscriptionsQuery(
      {
        page,
        per_page: PER_PAGE,
      },
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const [cancelSubscription, { isLoading: isCancelling }] =
    useCancelProviderSubscriptionMutation();

  const subscriptions = useMemo(() => getSubscriptions(data), [data]);

  const meta = data?.meta;
  const currentPage = meta?.current_page || page;
  const lastPage = meta?.last_page || 1;
  const total = meta?.total || subscriptions.length;
  const from = meta?.from || (subscriptions.length ? 1 : 0);
  const to = meta?.to || subscriptions.length;

  const filteredSubscriptions = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return subscriptions.filter((item) => {
      const name = getProviderName(item).toLowerCase();
      const email = getProviderEmail(item).toLowerCase();
      const plan = getPlanName(item).toLowerCase();
      const status = getStatusText(item).toLowerCase();
      const billing = getBillingText(item).toLowerCase();
      const stripeId = getStripeId(item).toLowerCase();

      const matchesSearch =
        !keyword ||
        name.includes(keyword) ||
        email.includes(keyword) ||
        plan.includes(keyword) ||
        stripeId.includes(keyword);

      const matchesStatus =
        statusFilter === "All Status" || status === statusFilter.toLowerCase();

      const matchesBilling =
        billingFilter === "All Billing" ||
        billing === billingFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesBilling;
    });
  }, [subscriptions, search, statusFilter, billingFilter]);

  const handleCancel = async (
    row: ProviderSubscription,
    cancelType: "after_this_month" | "right_away",
  ) => {
    const message =
      cancelType === "right_away"
        ? "Are you sure you want to cancel this subscription immediately?"
        : "Are you sure you want to cancel this subscription after this month?";

    const confirmed = window.confirm(message);

    if (!confirmed) return;

    const loadingToast = toast.loading("Cancelling subscription...");

    try {
      const res = await cancelSubscription({
        id: row.id,
        cancel_type: cancelType,
      }).unwrap();

      await refetch();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "Subscription cancelled successfully.");
    } catch (error) {
      toast.dismiss(loadingToast);
      console.log("CANCEL SUBSCRIPTION ERROR:", error);
      toast.error("Failed to cancel subscription. Please try again.");
    }
  };

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > lastPage || nextPage === currentPage) return;
    setPage(nextPage);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleBillingChange = (value: string) => {
    setBillingFilter(value);
    setPage(1);
  };

  const pageNumbers = useMemo(() => {
    return Array.from({ length: lastPage }, (_, index) => index + 1);
  }, [lastPage]);

  const columns = [
    {
      header: "Provider / Email",
      render: (subscription: ProviderSubscription) => (
        <div className="flex items-center gap-3">
          <Image
            src={getImageUrl(subscription.image, "/images/table/img01.png")}
            alt={getProviderName(subscription)}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <div className="text-[14px] font-medium text-[#1D2433]">
              {getProviderName(subscription)}
            </div>
            <p className="text-[12px] text-gray-500">
              {getProviderEmail(subscription)}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Plan",
      render: (subscription: ProviderSubscription) => (
        <span className="rounded-md bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-[#6366F1]">
          {getPlanName(subscription)}
        </span>
      ),
    },
    {
      header: "Billing",
      render: (subscription: ProviderSubscription) => (
        <span className="text-sm text-gray-500 capitalize">
          {getBillingText(subscription)}
        </span>
      ),
    },
    {
      header: "Stripe ID",
      render: (subscription: ProviderSubscription) => (
        <span className="max-w-[140px] block truncate text-sm text-gray-500">
          {getStripeId(subscription)}
        </span>
      ),
    },
    {
      header: "Start Date",
      render: (subscription: ProviderSubscription) => (
        <span className="text-sm text-gray-500">
          {formatDate(subscription.starts_at)}
        </span>
      ),
    },
    {
      header: "End Date",
      render: (subscription: ProviderSubscription) => (
        <span className="text-sm text-gray-500">
          {formatDate(subscription.ends_at)}
        </span>
      ),
    },
    {
      header: "Status",
      render: (subscription: ProviderSubscription) => {
        const status = getStatusText(subscription);

        return (
          <span
            className={`rounded-md px-3 py-1 text-xs ${getStatusClass(status)}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      render: (subscription: ProviderSubscription) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/admin/dashboard/subscription-payment/${subscription.id}`}
            className="rounded-md bg-gray-100 p-2 hover:bg-gray-200"
            title="View details"
          >
            <EyeIcon />
          </Link>

          <button
            type="button"
            disabled={isCancelling || subscription.is_canceled === true}
            onClick={() => handleCancel(subscription, "after_this_month")}
            className="rounded-md bg-gray-100 p-2 hover:bg-gray-200 disabled:opacity-60 cursor-pointer"
            title="Cancel after this month"
          >
            <FcCancel/>
          </button>

          <button
            type="button"
            disabled={isCancelling || subscription.is_canceled === true}
            onClick={() => handleCancel(subscription, "right_away")}
            className="rounded-md bg-red-100 p-2 hover:bg-red-200 disabled:opacity-60 cursor-pointer"
            title="Cancel immediately"
          >
            <MdOutlineCancel />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row xl:items-start">
        <div>
          <h2 className="text-lg font-semibold text-[#1D2433]">
            Subscription Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage provider subscriptions and billing status
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2 text-sm text-gray-500 outline-none"
          >
            <option>All Status</option>
            <option>active</option>
            <option>canceled</option>
            <option>paused</option>
          </select>

          <select
            value={billingFilter}
            onChange={(event) => handleBillingChange(event.target.value)}
            className="rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2 text-sm text-gray-500 outline-none"
          >
            <option>All Billing</option>
            <option>monthly</option>
            <option>yearly</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-b-2xl border border-gray-200">
        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">
            Loading subscriptions...
          </div>
        ) : isError ? (
          <div className="p-6 text-sm text-red-500">
            Failed to load subscriptions.
          </div>
        ) : filteredSubscriptions.length ? (
          <ReusableTableForAll
            columns={columns}
            data={filteredSubscriptions}
            rowKey={(row) => row.id}
          />
        ) : (
          <div className="p-6 text-sm text-gray-500">
            No subscriptions found.
          </div>
        )}

        {!isLoading && !isError && total > 0 && (
          <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing {from} to {to} of {total} subscriptions
              {isFetching ? " • Updating..." : ""}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1 || isFetching}
                onClick={() => goToPage(currentPage - 1)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {pageNumbers.map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={isFetching}
                  onClick={() => goToPage(item)}
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    item === currentPage
                      ? "border-[#030914] bg-[#030914] text-white"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {item}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage >= lastPage || isFetching}
                onClick={() => goToPage(currentPage + 1)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
