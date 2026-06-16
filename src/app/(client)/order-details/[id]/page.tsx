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

export type MappedQuestionnaireItem = {
  key: string;
  question: string;
};

const getOrderDetails = (response: unknown): RawOrder | null => {
  const res = response as { data?: RawOrder; order?: RawOrder };
  return res?.data || res?.order || null;
};

const getImageUrl = (image?: string | null): string => {
  if (!image) return fallbackImage;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) return image;
  return `/api/image?path=${encodeURIComponent(image)}`;
};

const formatStatus = (status?: string | null): string => {
  if (!status) return "Pending";
  return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const buildTimeline = (order: RawOrder): TimelineStep[] => {
  const details = order.order_details;
  return [
    {
      label: "Order Placed",
      time: details?.order_number || "—",
      status: "done",
    },
    {
      label: formatStatus(details?.status),
      time: "—",
      status: "done",
    },
    {
      label: "Complete Order",
      time: details?.end_date || "—",
      status: details?.status === "completed" ? "done" : "pending",
    },
  ];
};

const mapOrderDetails = (order: RawOrder) => {
  const id = String(order.id || "");
  const details = order.order_details;
  const contact = order["location & contact"];
  const evDets = order.event_details;
  const started = order.order_started;

  // questionnaire is Record<string, string> — convert to array
  const questionnaire: MappedQuestionnaireItem[] = order.questionnaire
    ? Object.entries(order.questionnaire).map(([key, question]) => ({
        key,
        question,
      }))
    : [];

  return {
    // ── RightCard ──
    eventImage: getImageUrl(details?.service_image?.[0] ?? null),
    eventTitle: details?.event_name || started?.event_name || `Order #${id}`,
    vendorName: details?.order_by || started?.order_by || "Unknown",
    orderStatus: formatStatus(details?.status),
    orderNumber: details?.order_number || `#${id}`,
    completedDate: details?.end_date || "—",
    amountPaid: details?.amount_paid || "—",
    timeline: buildTimeline(order),

    // ── MainOrder ──
    id,
    placedBy: started?.order_by || details?.order_by || null,
    eventName: started?.event_name || details?.event_name || null,
    fullName: contact?.full_name || null,
    email: contact?.email || null,
    phone: contact?.phone || null,
    location: contact?.address || null,
    eventType: evDets?.event_type || null,
    eventDetailName: evDets?.event_name || null,
    duration: evDets?.duration || null,
    guests: evDets?.guests || null,
    serviceDescription: evDets?.description || null,
    questionnaire,
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
      {/* Breadcrumb */}
      <p className="text-[16px] text-gray-500 mb-6 flex items-center gap-1">
        My orders{" "}
        <span className="text-gray-400">
          <NextArrow />
        </span>{" "}
        Order Details
      </p>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full h-28 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : isError || !orderDetails ? (
        <p className="text-sm text-red-500">Order details not found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">
              <MainOrder
                id={orderDetails.id}
                placedBy={orderDetails.placedBy}
                eventName={orderDetails.eventName}
                fullName={orderDetails.fullName}
                email={orderDetails.email}
                phone={orderDetails.phone}
                location={orderDetails.location}
                eventType={orderDetails.eventType}
                eventDetailName={orderDetails.eventDetailName}
                duration={orderDetails.duration}
                guests={orderDetails.guests}
                serviceDescription={orderDetails.serviceDescription}
                questionnaire={orderDetails.questionnaire}
              />
            </div>

            {/* RIGHT */}
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

          {/* Quick Response */}
          <div className="w-full max-w-3xl mt-10">
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
