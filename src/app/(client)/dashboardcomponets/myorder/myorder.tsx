/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { RawOrder, useLazyGetAdminOrdersQuery } from "@/app/api/admin/orderApi";
import { useEffect } from "react";

type MyOrdersProps = {
  isActive?: boolean;
};

const fallbackImage = "/images/browser/img12.png";

const getOrdersArray = (response: unknown): RawOrder[] => {
  const res = response as {
    data?: RawOrder[] | { data?: RawOrder[]; orders?: RawOrder[] };
    orders?: RawOrder[];
  };

  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.orders)) return res.orders;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data?.orders)) return res.data.orders;

  return [];
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

const mapOrder = (order: RawOrder) => {
  const id = order.id || order.order_id || "";

  const providerName =
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
    id,
    image: getImageUrl(image),
    title:
      order.title ||
      order.event_title ||
      order.service_title ||
      order.service?.title ||
      `Order #${id}`,
    provider: `by ${providerName}`,
    price: formatPrice(
      order.amount_paid || order.amount || order.total || order.price,
    ),
    dueIn: order.due_in || order.due_date || "—",
    status: formatStatus(order.status),
    link: `/order-details/${id}`,
  };
};

export default function MyOrders({ isActive = true }: MyOrdersProps) {
  const [getOrders, { data, isLoading, isFetching, isError }] =
    useLazyGetAdminOrdersQuery();

  useEffect(() => {
    if (isActive) {
      getOrders(undefined);
    }
  }, [isActive, getOrders]);

  const orders = getOrdersArray(data).map(mapOrder);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 bg-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-1 h-4 bg-black rounded-full" />
          Active Orders ({orders.length})
        </h2>

        <button className="border px-3 py-2 rounded-lg text-sm flex items-center gap-1">
          Active orders
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {isLoading || isFetching ? (
          <p className="text-sm text-gray-500">Loading orders...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Failed to load orders.</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders found.</p>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}



function OrderCard({ order }: any) {
  return (
    <div className="w-full bg-white border rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <Image
            src={order.image}
            alt="event"
            width={70}
            height={70}
            className="rounded-lg object-cover"
          />

          <div>
            <p className="font-semibold text-sm">{order.title}</p>
            <p className="text-xs text-gray-500">{order.provider}</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10">
          {/* PRICE */}
          <div className="">
            <p className="text-xs text-gray-400 font-normal">Price</p>
            <p className="font-medium ">{order.price}</p>
          </div>

          {/* DUE IN */}
          <div className="">
            <p className="text-xs text-gray-400">Due In</p>
            <p className="font-semibold">{order.dueIn}</p>
          </div>

          {/* STATUS */}
          <div className="">
            <p className="text-xs text-gray-400">Status</p>
            <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
              {order.status}
            </span>
          </div>

          {/* VIEW DETAILS → LINK */}
          <Link
            href={order.link}
            className="text-[#4A4C56] text-sm underline whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
