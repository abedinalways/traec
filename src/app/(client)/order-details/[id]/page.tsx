"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import NextArrow from "@/components/icons/NextArrow";
import MainOrder from "@/components/orderdetails/mainorder";
import QuickResponse from "@/components/orderdetails/quickreponse";
import RightCard from "@/components/orderdetails/rightcard";
import {
  RawOrder,
  useGetAdminOrderDetailsQuery,
} from "@/app/api/admin/orderApi";
import {
  useStoreReviewMutation,
  useReplyToReviewMutation,
} from "@/app/api/admin/reviewApi";
import { useUpdateOrderStatusMutation } from "@/app/api/admin/orderStatusApi";
import { Star } from "lucide-react";
import { toast } from "sonner";

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

const getRawStatus = (order: RawOrder): string => {
  return order.order_details?.status || order.status || "";
};

/* ─── Star Rating Component ─── */
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="cursor-pointer transition hover:scale-110"
        >
          <Star
            size={28}
            fill={star <= value ? "#FA9916" : "#E5E7EB"}
            className={star <= value ? "text-[#FA9916]" : "text-[#E5E7EB]"}
          />
        </button>
      ))}
    </div>
  );
}

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

  const rawStatus = (details?.status || order.status || "").toLowerCase();

  // Extract review data from order_details
  const existingReview = details?.review ?? null;
  const canReview = details?.can_review ?? false;
  const reviewId = details?.review_id ?? null;

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
    rawStatus,
    orderId: Number(order.id || (order as Record<string, unknown>).order_id || 0),

    // ── Review data ──
    existingReview,
    canReview,
    reviewId,
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

  // ─── Detect user role from cookie ───
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jr_auth_role="));
    setUserRole(cookie ? cookie.split("=")[1] : null);
  }, []);

  const isProvider = userRole === "provider";

  // ─── Order Status Update (provider only) ───
  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const handleCompleteOrder = async () => {
    try {
      const res = await updateOrderStatus({ id, status: "completed" }).unwrap();
      if (res.success || res.message) {
        toast.success(res.message || "Order completed successfully!");
      } else {
        toast.error("Failed to complete order.");
      }
    } catch {
      toast.error("Something went wrong while updating order status.");
    }
  };

  // ─── Review State ───
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [storeReview, { isLoading: isSubmitting }] = useStoreReviewMutation();

  // ─── Provider Reply State ───
  const [replyText, setReplyText] = useState("");
  const [replyToReview, { isLoading: isReplying }] = useReplyToReviewMutation();

  const isCompleted = orderDetails?.rawStatus === "completed";

  const handleSubmitReview = async () => {
    if (!rating || !reviewText.trim()) {
      toast.error("Please provide a rating and review text.");
      return;
    }
    try {
      const res = await storeReview({
        order_id: orderDetails!.orderId,
        review: reviewText.trim(),
        rating,
      }).unwrap();
      if (res.success || res.message) {
        toast.success(res.message || "Review submitted successfully!");
        setShowReviewForm(false);
        setReviewText("");
        setRating(0);
      } else {
        toast.error("Failed to submit review.");
      }
    } catch {
      toast.error("Something went wrong while submitting review.");
    }
  };

  const handleReplyToReview = async () => {
    const review = orderDetails?.existingReview;
    if (!review || !replyText.trim()) {
      toast.error("Please enter a reply.");
      return;
    }
    try {
      const res = await replyToReview({
        id: review.id,
        reply: replyText.trim(),
      }).unwrap();
      if (res.success || res.message) {
        toast.success(res.message || "Reply submitted successfully!");
        setReplyText("");
      } else {
        toast.error("Failed to submit reply.");
      }
    } catch (error: unknown) {
      const err = error as { status?: number | string; data?: { message?: string }; error?: string };
      const message =
        (err.data && err.data.message) ||
        (typeof err.error === "string" && err.error) ||
        "Something went wrong while submitting reply.";
      toast.error(message);
    }
  };

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
                rawStatus={orderDetails.rawStatus}
                // Provider sees "Mark as Completed" button; client does not
                onComplete={isProvider ? handleCompleteOrder : undefined}
                isUpdating={isProvider ? isUpdating : false}
              />
            </div>
          </div>

          {/* ─── Review Section (only for client, when order is completed and no review exists) ─── */}
          {!isProvider && isCompleted && !orderDetails.existingReview && !showReviewForm && (
            <div className="w-full max-w-3xl mt-10">
              <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center">
                <p className="text-gray-600 mb-3">
                  This order is completed. Share your experience!
                </p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-6 py-2.5 bg-black text-white rounded-lg font-medium cursor-pointer hover:opacity-90 transition"
                >
                  Write a Review
                </button>
              </div>
            </div>
          )}

          {/* ─── Review Form (only for client, when no review exists) ─── */}
          {!isProvider && isCompleted && !orderDetails.existingReview && showReviewForm && (
            <div className="w-full max-w-3xl mt-10">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>

                {/* Star Rating */}
                <div className="mb-4">
                  <label className="text-sm text-gray-600 block mb-2">
                    Rating
                  </label>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                {/* Review Text */}
                <div className="mb-4">
                  <label className="text-sm text-gray-600 block mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    placeholder="Describe your experience..."
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSubmitReview}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-black text-white rounded-lg font-medium cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                  <button
                    onClick={() => {
                      setShowReviewForm(false);
                      setReviewText("");
                      setRating(0);
                    }}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium cursor-pointer hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Existing Review Display (for both client & provider) ─── */}
          {orderDetails.existingReview && (
            <div className="w-full max-w-3xl mt-10">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Review</h3>

                {/* Show Rating */}
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={22}
                      fill={star <= orderDetails.existingReview!.rating ? "#FA9916" : "#E5E7EB"}
                      className={
                        star <= orderDetails.existingReview!.rating
                          ? "text-[#FA9916]"
                          : "text-[#E5E7EB]"
                      }
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {orderDetails.existingReview.review}
                </p>

                {/* Review Date */}
                <p className="text-xs text-gray-400 mb-4">
                  Reviewed on{" "}
                  {orderDetails.existingReview.reviewed_at
                    ? new Date(
                        orderDetails.existingReview.reviewed_at
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "—"}
                </p>

                {/* ── Provider Reply Section ── */}
                {isProvider ? (
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">
                      Your Reply
                    </h4>

                    {orderDetails.existingReview.has_replied &&
                    orderDetails.existingReview.reply ? (
                      <>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">
                          {orderDetails.existingReview.reply}
                        </p>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          disabled
                          placeholder="You have already replied to this review."
                          className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-100 cursor-not-allowed"
                        />
                        <button
                          disabled
                          className="mt-2 px-5 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed"
                        >
                          Reply Sent
                        </button>
                      </>
                    ) : (
                      <>
                        {orderDetails.existingReview.reply && (
                          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">
                            {orderDetails.existingReview.reply}
                          </p>
                        )}
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          placeholder="Write your reply to this review..."
                          className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                        <button
                          onClick={handleReplyToReview}
                          disabled={isReplying || !replyText.trim()}
                          className="mt-2 px-5 py-2 bg-black text-white rounded-lg text-sm font-medium cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isReplying ? "Sending..." : "Send Reply"}
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  /* ── Client sees reply if provider has replied ── */
                  orderDetails.existingReview.has_replied &&
                  orderDetails.existingReview.reply && (
                    <div className="border-t border-gray-100 pt-4 mt-2">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">
                        Provider's Reply
                      </h4>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        {orderDetails.existingReview.reply}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Quick Response */}
          {/* <div className="w-full max-w-3xl mt-10">
            <QuickResponse
              onSend={(message) => {
                console.log("Sent message:", message);
              }}
            />
          </div> */}
        </>
      )}
    </main>
  );
}