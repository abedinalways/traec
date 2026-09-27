// "use client";

// import ReusableTableForAll from "./ReusableTableForAll";
// import EyeIcon from "@/icons/EyeIcon";
// import EditIcon from "@/icons/EditIcon";
// import DeleteIcon from "@/icons/DeleteIcon";
// import { SearchIcon } from "lucide-react";


// interface PromotionItem {
//   id: number;
//   name: string;
//   discount: string;
//   type: string;
//   startDate: string;
//   endDate: string;
//   status: "Active" | "Inactive";
// }

// const promotions: PromotionItem[] = [
//   {
//     id: 1,
//     name: "SUMMER 26",
//     discount: "25%",
//     type: "Flash Sale",
//     startDate: "05/12/2024",
//     endDate: "05/12/2024",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "SUMMER 26",
//     discount: "25%",
//     type: "Flash Sale",
//     startDate: "05/12/2024",
//     endDate: "05/12/2024",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "SUMMER 26",
//     discount: "25%",
//     type: "Flash Sale",
//     startDate: "05/12/2024",
//     endDate: "05/12/2024",
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "SUMMER 26",
//     discount: "25%",
//     type: "Flash Sale",
//     startDate: "05/12/2024",
//     endDate: "05/12/2024",
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "SUMMER 26",
//     discount: "25%",
//     type: "Flash Sale",
//     startDate: "05/12/2024",
//     endDate: "05/12/2024",
//     status: "Active",
//   },
// ];

// const columns = [
//   {
//     header: "Name",
//     render: (item: PromotionItem) => (
//       <span className="text-[14px] font-medium text-[#1D2433]">
//         {item.name}
//       </span>
//     ),
//   },
//   {
//     header: "Discount",
//     render: (item: PromotionItem) => (
//       <span className="rounded-md bg-[#E8F7F3] px-3 py-1 text-xs font-medium text-[#17A38B]">
//         {item.discount}
//       </span>
//     ),
//   },
//   {
//     header: "Type",
//     render: (item: PromotionItem) => (
//       <span className="text-sm text-gray-500">{item.type}</span>
//     ),
//   },
//   {
//     header: "Start Date",
//     render: (item: PromotionItem) => (
//       <span className="text-sm text-gray-500">{item.startDate}</span>
//     ),
//   },
//   {
//     header: "End Date",
//     render: (item: PromotionItem) => (
//       <span className="text-sm text-gray-500">{item.endDate}</span>
//     ),
//   },
//   {
//     header: "Status",
//     render: (item: PromotionItem) => (
//       <span className="rounded-md bg-blue-100 px-3 py-1 text-xs text-[#4895ff]">
//         {item.status}
//       </span>
//     ),
//   },
//   {
//     header: "Actions",
//     className: "text-right pr-6",
//     render: () => (
//       <div className="flex justify-end gap-2">
//         <button className="rounded-md bg-gray-100 p-2 hover:bg-gray-200">
//           <EyeIcon />
//         </button>
//         <button className="rounded-md bg-gray-100 p-2 hover:bg-gray-200">
//           <EditIcon />
//         </button>
//         <button className="rounded-md bg-red-100 p-2 hover:bg-red-200">
//           <DeleteIcon />
//         </button>
//       </div>
//     ),
//   },
// ];

// export default function PromotionManagementTable() {
//   return (
//     <div className="overflow-hidden rounded-2xl bg-white">
//       <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row xl:items-start">
//         <div>
//           <h2 className="text-lg font-semibold text-[#1D2433]">
//             Promotion Management
//           </h2>
//           <p className="text-sm text-gray-500">Control marketing campaigns</p>
//         </div>

//         <div className="flex flex-col gap-3 sm:flex-row">
//           <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2">
//             <SearchIcon className="h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
//             />
//           </div>

//           <select className="rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2 text-sm text-gray-500 outline-none">
//             <option>All Status</option>
//           </select>

//           <select className="rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2 text-sm text-gray-500 outline-none">
//             <option>Monthly</option>
//           </select>

//           <button className="rounded-lg bg-[#0B0F19] px-4 py-2 text-sm font-medium cursor-pointer text-white">
//             + Create Promotion
//           </button>
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-b-2xl border border-gray-200">
//         <ReusableTableForAll
//           columns={columns}
//           data={promotions}
//           rowKey={(row) => row.id}
//         />
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import ReusableTableForAll from "./ReusableTableForAll";
import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { SearchIcon, X } from "lucide-react";
import { PromotionItem } from "@/app/api/admin/promotionManagementApi";
import { useDeletePromotionMutation, useGetPromotionsQuery, useLazyGetPromotionDetailsQuery, useCreatePromotionMutation, useUpdatePromotionMutation } from "@/app/api/admin/promotionManagementApi";


export default function PromotionManagementTable() {
  const { data: promoResponse, isLoading } = useGetPromotionsQuery();
  const [createPromotion] = useCreatePromotionMutation();
  const [updatePromotion] = useUpdatePromotionMutation();
  const [deletePromotion] = useDeletePromotionMutation();
  const [triggerFetchDetails] = useLazyGetPromotionDetailsQuery();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Form Fields State
  const [formFields, setFormFields] = useState({
    name: "",
    discount: "",
    type: "percentage",
    start_date: "",
    end_date: "",
    status: "1",
  });

  const promotionsList = promoResponse?.data || [];

  // Open Modal Helpers
  const handleOpenCreate = () => {
    setModalMode("create");
    setFormFields({ name: "", discount: "", type: "percentage", start_date: "", end_date: "", status: "1" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = async (id: number) => {
    setSelectedId(id);
    setModalMode("edit");
    const res = await triggerFetchDetails(id).unwrap();
    if (res?.data) {
      setFormFields({
        name: res.data.name,
        discount: String(res.data.discount),
        type: res.data.type,
        start_date: res.data.start_date,
        end_date: res.data.end_date,
        status: String(res.data.status),
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenView = async (id: number) => {
    setModalMode("view");
    const res = await triggerFetchDetails(id).unwrap();
    if (res?.data) {
      setFormFields({
        name: res.data.name,
        discount: String(res.data.discount),
        type: res.data.type,
        start_date: res.data.start_date,
        end_date: res.data.end_date,
        status: String(res.data.status),
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      await deletePromotion(id);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formFields.name,
      discount: Number(formFields.discount),
      type: formFields.type,
      start_date: formFields.start_date,
      end_date: formFields.end_date,
      status: Number(formFields.status),
    };

    if (modalMode === "create") {
      await createPromotion(payload);
    } else if (modalMode === "edit" && selectedId) {
      await updatePromotion({ id: selectedId, payload });
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: "Name",
      render: (item: PromotionItem) => (
        <span className="text-[14px] font-medium text-[#1D2433]">{item.name}</span>
      ),
    },
    {
      header: "Discount",
      render: (item: PromotionItem) => (
        <span className="rounded-md bg-[#E8F7F3] px-3 py-1 text-xs font-medium text-[#17A38B]">
          {item.discount}%
        </span>
      ),
    },
    {
      header: "Type",
      render: (item: PromotionItem) => (
        <span className="text-sm text-gray-500 capitalize">{item.type}</span>
      ),
    },
    {
      header: "Start Date",
      render: (item: PromotionItem) => (
        <span className="text-sm text-gray-500">{item.start_date}</span>
      ),
    },
    {
      header: "End Date",
      render: (item: PromotionItem) => (
        <span className="text-sm text-gray-500">{item.end_date}</span>
      ),
    },
    {
      header: "Status",
      render: (item: PromotionItem) => (
        <span
          className={`rounded-md px-3 py-1 text-xs ${Number(item.status) === 1 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
            }`}
        >
          {Number(item.status) === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right pr-6",
      render: (item: PromotionItem) => (
        <div className="flex justify-end gap-2">
          <button onClick={() => handleOpenView(item.id)} className="rounded-md bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer">
            <EyeIcon />
          </button>
          <button onClick={() => handleOpenEdit(item.id)} className="rounded-md bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer">
            <EditIcon />
          </button>
          <button onClick={() => handleDelete(item.id)} className="rounded-md bg-red-100 p-2 hover:bg-red-200 cursor-pointer">
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      {/* Table Header Section */}
      <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row xl:items-start">
        <div>
          <h2 className="text-lg font-semibold text-[#1D2433]">Promotion Management</h2>
          <p className="text-sm text-gray-500">Control marketing campaigns</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2">
            <SearchIcon className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <select className="rounded-lg border border-gray-200 bg-[#F9FAFB] px-3 py-2 text-sm text-gray-500 outline-none">
            <option>All Status</option>
          </select>

          <button
            onClick={handleOpenCreate}
            className="rounded-lg bg-[#0B0F19] px-4 py-2 text-sm font-medium cursor-pointer text-white hover:bg-black transition-colors"
          >
            + Create Promotion
          </button>
        </div>
      </div>

      {/* Reusable Table Container */}
      <div className="overflow-hidden rounded-b-2xl border border-gray-200">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading Promotions Data...</div>
        ) : (
          <ReusableTableForAll columns={columns} data={promotionsList} rowKey={(row) => row.id} />
        )}
      </div>

      {/* =========================
         THEME BASED MODAL (CREATE / EDIT / VIEW)
      ========================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-[#1D2433] capitalize">
                {modalMode === "view" ? "Promotion Details" : `${modalMode} Promotion`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1.8 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  required
                  disabled={modalMode === "view"}
                  value={formFields.name}
                  onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                  placeholder="e.g. Eid Special Discount"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black disabled:bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    disabled={modalMode === "view"}
                    value={formFields.discount}
                    onChange={(e) => setFormFields({ ...formFields, discount: e.target.value })}
                    placeholder="20.5"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    disabled={modalMode === "view"}
                    value={formFields.type}
                    onChange={(e) => setFormFields({ ...formFields, type: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black disabled:bg-gray-50"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    disabled={modalMode === "view"}
                    value={formFields.start_date}
                    onChange={(e) => setFormFields({ ...formFields, start_date: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    disabled={modalMode === "view"}
                    value={formFields.end_date}
                    onChange={(e) => setFormFields({ ...formFields, end_date: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  disabled={modalMode === "view"}
                  value={formFields.status}
                  onChange={(e) => setFormFields({ ...formFields, status: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black disabled:bg-gray-50"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {modalMode === "view" ? "Close" : "Cancel"}
                </button>
                {modalMode !== "view" && (
                  <button
                    type="submit"
                    className="rounded-lg bg-[#0B0F19] px-4 py-2 text-sm font-medium text-white hover:bg-black cursor-pointer"
                  >
                    {modalMode === "edit" ? "Save Changes" : "Create"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}