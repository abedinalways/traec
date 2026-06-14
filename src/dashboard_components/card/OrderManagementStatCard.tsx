// "use client";

// import UsersIcon from "@/icons/UsersIcon";

// const stats = [
//   { title: "Total Orders", value: "2.3M" },
//   { title: "Processing", value: "560" },
//   { title: "Active Orders", value: "200" },
//   { title: "Delivered", value: "80" },
// ];

// export default function OrderManagementStats() {
//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//       {stats.map((item) => (
//         <div
//           key={item.title}
//           className="rounded-2xl border border-gray-200 bg-white px-4 py-4"
//         >
//           <div className="mb-3 flex items-start justify-between">
//             <p className="text-[14px] md:text-[16px] text-gray-500">{item.title}</p>
//             <UsersIcon />
//           </div>

//           <h3 className="text-[20px] md:text-[32px] font-semibold text-[#1D2433]">
//             {item.value}
//           </h3>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import UsersIcon from "@/icons/UsersIcon";

interface StatsProps {
  summary?: {
    total_orders: number;
    processing: number;
    active_orders: number;
    delivered: number;
  };
}

export default function OrderManagementStats({ summary }: StatsProps) {
  const stats = [
    { title: "Total Orders", value: summary?.total_orders ?? 0 },
    { title: "Processing", value: summary?.processing ?? 0 },
    { title: "Active Orders", value: summary?.active_orders ?? 0 },
    { title: "Delivered", value: summary?.delivered ?? 0 },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div key={item.title} className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
          <div className="mb-3 flex items-start justify-between">
            <p className="text-[14px] md:text-[16px] text-gray-500">{item.title}</p>
            <UsersIcon />
          </div>
          <h3 className="text-[20px] md:text-[32px] font-semibold text-[#1D2433]">
            {item.value.toLocaleString()}
          </h3>
        </div>
      ))}
    </div>
  );
}