"use client";

import { useParams } from "next/navigation";
import NextArrow from "@/components/icons/NextArrow";
import MainOrder from "@/components/orderdetails/mainorder";
import QuickResponse from "@/components/orderdetails/quickreponse";
import RightCard from "@/components/orderdetails/rightcard";
import {
  RawOrder,
  useGetAdminOrderDetailsQuery,
} from "@/app/api/admin/orderApi";

const fallbackImage = "/images/browser/img12.png";

type TimelineStatus = "done" | "pending";

type TimelineStep = {
  label: string;
  time: string;
  status: TimelineStatus;
};

const normalizeTimelineStatus = (status?: string | null): TimelineStatus => {
  if (status === "done") return "done";
  return "pending";
};

const getOrderDetails = (response: unknown): RawOrder | null => {
  const res = response as {
    data?: RawOrder;
    order?: RawOrder;
  };

  return res?.data || res?.order || null;
};

const getImageUrl = (image?: string | null) => {
  if (!image) return fallbackImage;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/")) {
    return image;
  }

  return `/api/image?path=${encodeURIComponent(image)}`;
};

const formatPrice = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "—";

  const numericValue = Number(value);

  if (!Number.isNaN(numericValue)) {
    return `$${numericValue}`;
  }

  return String(value);
};

const formatStatus = (status?: string | null) => {
  if (!status) return "Pending";

  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
};

const buildTimeline = (order: RawOrder): TimelineStep[] => {
  if (Array.isArray(order.timeline) && order.timeline.length > 0) {
    return order.timeline.map(
      (item): TimelineStep => ({
        label: item.label || "Order update",
        time: item.time || "—",
        status: normalizeTimelineStatus(item.status),
      }),
    );
  }

  return [
    {
      label: "Order placed",
      time: order.created_at || "—",
      status: "done",
    },
    {
      label: formatStatus(order.status),
      time: order.updated_at || "—",
      status: "done",
    },
    {
      label: "Complete order",
      time: order.completed_at || "—",
      status: order.completed_at ? "done" : "pending",
    },
  ];
};

const mapOrderDetails = (order: RawOrder) => {
  const id = order.id || order.order_id || "";

  const vendorName =
    order.provider_name ||
    order.vendor_name ||
    [order.provider?.name, order.provider?.last_name]
      .filter(Boolean)
      .join(" ") ||
    [order.service?.provider?.name, order.service?.provider?.last_name]
      .filter(Boolean)
      .join(" ") ||
    "Unknown Provider";

  const image =
    order.image ||
    order.event_image ||
    order.service?.image ||
    order.service?.images?.[0] ||
    null;

  return {
    eventImage: getImageUrl(image),
    eventTitle:
      order.title ||
      order.event_title ||
      order.service_title ||
      order.service?.title ||
      `Order #${id}`,
    vendorName,
    orderStatus: formatStatus(order.status),
    orderNumber: order.order_number || `#${id}`,
    completedDate: formatDate(order.completed_at || order.updated_at),
    amountPaid: formatPrice(
      order.amount_paid || order.amount || order.total || order.price,
    ),
    timeline: buildTimeline(order),
  };
};

export default function OrderdetailsPage() {
  const params = useParams();
  const id = String(params?.id || "");

  const { data, isLoading, isError } = useGetAdminOrderDetailsQuery(id, {
    skip: !id,
  });

  const rawOrder = getOrderDetails(data);
  const orderDetails = rawOrder ? mapOrderDetails(rawOrder) : null;

  return (
    <main className="custom-container min-h-screen bg-white px-4 sm:px-6 md:px-10 lg:px-16 py-8 font-[inter]">
      {/* HEADER BREADCRUMB */}
      <p className="text-[16px] text-gray-500 mb-6 flex items-center gap-1">
        My orders{" "}
        <span className="text-gray-400 ">
          <NextArrow />
        </span>{" "}
        Order Details
      </p>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading order details...</p>
      ) : isError || !orderDetails ? (
        <p className="text-sm text-red-500">Order details not found.</p>
      ) : (
        <>
          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT SIDE – MAIN ORDER DETAILS */}
            <div className="lg:col-span-2 space-y-8">
              <MainOrder />
            </div>

            {/* RIGHT SIDE – STATUS CARD */}
            <div className="lg:col-span-1 pt-11">
              <RightCard
                eventImage={orderDetails.eventImage}
                eventTitle={orderDetails.eventTitle}
                vendorName={orderDetails.vendorName}
                orderStatus={orderDetails.orderStatus}
                orderNumber={orderDetails.orderNumber}
                completedDate={orderDetails.completedDate}
                amountPaid={orderDetails.amountPaid}
                timeline={orderDetails.timeline}
              />
            </div>
          </div>

          {/* QUICK RESPONSE BOX UNDER BOTH COLUMNS */}
          <div
            className="custom-container w-full max-w-3xl mx-auto mt-10"
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            <QuickResponse
              onSend={(message) => {
                console.log("Sent message:", message);
              }}
            />
          </div>
        </>
      )}
    </main>
  );
}
