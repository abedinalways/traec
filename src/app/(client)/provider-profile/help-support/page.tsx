import OrderHistory from "../../_components/profile/OrdersHistory";
import ProviderOrderHistory from "../../_components/profile/ProviderOrderHistory";

export default function Page() {
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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <ProviderOrderHistory
        backUrl="/provider-profile"
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
