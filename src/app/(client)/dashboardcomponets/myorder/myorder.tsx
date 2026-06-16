"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { RawOrder, useLazyGetAdminOrdersQuery } from "@/app/api/admin/orderApi";
import { useEffect } from "react";

type MyOrdersProps = {
  isActive?: boolean;
};

type MappedOrder = {
  id: string;
  image: string;
  title: string;
  provider: string;
  price: string;
  dueIn: string;
  status: string;
  rawStatus: string;
  link: string;
};

const fallbackImage = "/images/browser/img12.png";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getOrdersArray = (response: unknown): RawOrder[] => {
  const res = response as { data?: unknown; orders?: unknown };
  if (Array.isArray(res?.data)) return res.data as RawOrder[];
  if (Array.isArray(res?.orders)) return res.orders as RawOrder[];
  return [];
};

const getImageUrl = (image?: string | null): string => {
  if (!image) return fallbackImage;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) return image;
  return `/api/image?path=${encodeURIComponent(image)}`;
};

const formatStatus = (status?: string | null): string => {
  if (!status) return "Pending";
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// ─── Status colors ────────────────────────────────────────────────────────────

const statusColorMap: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  processing: "bg-blue-100 text-blue-700",
  inprogress: "bg-purple-100 text-purple-700",
  active: "bg-teal-100 text-teal-700",
  default: "bg-gray-100 text-gray-600",
};

const getStatusColor = (rawStatus?: string | null): string => {
  if (!rawStatus) return statusColorMap.default;
  const key = rawStatus.toLowerCase().replace(/[_\s]/g, "");
  return statusColorMap[key] || statusColorMap.default;
};

// ─── Mapper — uses INDEX API flat fields ──────────────────────────────────────

const mapOrder = (order: RawOrder): MappedOrder => {
  const id = String(order.order_id || order.id || "");
  const image = Array.isArray(order.service_image)
    ? order.service_image[0]
    : null;

  return {
    id,
    image: getImageUrl(image),
    title: order.event_name || `Order #${id}`,
    provider: `by ${order.order_by || "Unknown Provider"}`,
    price: order.price || "—",
    dueIn: order.due_in || "—",
    status: formatStatus(order.status),
    rawStatus: order.status || "",
    link: `/order-details/${id}`,
  };
};

// ─── Main Component ───────────────────────────────────────────────────────────

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
          Orders ({isLoading || isFetching ? "..." : orders.length})
        </h2>

        <button className="border px-3 py-2 rounded-lg text-sm flex items-center gap-1">
          All orders
          <ChevronDown size={16} />
        </button>
      </div>

      {/* List */}
      <div className="space-y-5">
        {isLoading || isFetching ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-24 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
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

// ─── Order Card ───────────────────────────────────────────────────────────────

function OrderCard({ order }: { order: MappedOrder }) {
  return (
    <div className="w-full bg-white border rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Image
            src={order.image}
            alt={order.title}
            width={70}
            height={70}
            className="rounded-lg object-cover flex-shrink-0"
          />
          <div>
            <p className="font-semibold text-sm">{order.title}</p>
            <p className="text-xs text-gray-500">{order.provider}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10">
          <div>
            <p className="text-xs text-gray-400 font-normal">Price</p>
            <p className="font-medium text-sm">{order.price}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Due In</p>
            <p className="font-semibold text-sm">{order.dueIn}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Status</p>
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(order.rawStatus)}`}
            >
              {order.status}
            </span>
          </div>

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
