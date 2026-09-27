
import { Suspense } from "react";
import OrderHistory from "../../_components/profile/OrdersHistory";
export const dynamic = "force-dynamic";

const orders = [
  {
    id: 1,
    title: "Sofia's 7th Birthday Pri...",
    vendor: "Part Pro Rentals",
    date: "1/15/2024",
    price: 545,
    status: "Complete",
    thumbnail: "/images/orderWomanImg.png",
  },
  {
    id: 2,
    title: "Sofia's 7th Birthday Pri...",
    vendor: "Part Pro Rentals",
    date: "1/15/2024",
    price: 545,
    status: "Complete",
    thumbnail: "/images/orderWomanImg.png",
  },
  {
    id: 3,
    title: "Sofia's 7th Birthday Pri...",
    vendor: "Part Pro Rentals",
    date: "1/15/2024",
    price: 545,
    status: "Complete",
    thumbnail: "/images/orderManImg.png",
  },
  {
    id: 4,
    title: "Sofia's 7th Birthday Pri...",
    vendor: "Part Pro Rentals",
    date: "1/15/2024",
    price: 545,
    status: "Progress",
    thumbnail: "/images/orderWomanImg.png",
  },
];


function OrdersHistoryContent() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <OrderHistory
        backUrl="/client-profile"
        title="Order History"
        subtitle="View your past events and bookings"
        stats={{
          pastOrders: 11,
          completed: 2,
          pending: 6,
          totalSpend: 560,
        }}
        orders={orders}
      />
    </div>
  );
}


export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">Loading orders history...</div>
      }
    >
      <OrdersHistoryContent />
    </Suspense>
  );
}
