"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { toast } from "sonner";

import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import BoxIcon from "@/components/icons/BoxIcon";
import StarIcon from "@/components/icons/StarIcon";

import ReusableTableForAll from "./ReusableTableForAll";
import { SellerProvider, useGetSellerProvidersQuery } from "@/app/api/admin/sellerProvidersApi";
import { useChangeUserStatusMutation, useDeleteUserMutation, useLazyGetUserDetailsQuery } from "@/app/api/admin/userActionsApi";

export default function SellerProvidersTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebounced] = useState("");
  const [status, setStatus] = useState("");
  const [period, setPeriod] = useState("");
  const [page, setPage] = useState(1);

  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);
  const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);

  // Modals States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editFormStatus, setEditFormStatus] = useState<"Active" | "Inactive">("Active");
  const [isUpdating, setIsUpdating] = useState(false);

  const [deleteUser] = useDeleteUserMutation();
  const [changeUserStatus] = useChangeUserStatusMutation();

  // Implemented Lazy endpoint trigger for both action items
  const [triggerFetchDetails, { data: fetchedDetails, isFetching: isFetchingDetails }] = useLazyGetUserDetailsQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    clearTimeout((handleSearchChange as { _t?: ReturnType<typeof setTimeout> })._t);
    (handleSearchChange as { _t?: ReturnType<typeof setTimeout> })._t = setTimeout(() => {
      setDebounced(e.target.value);
      setPage(1);
    }, 400);
  };

  const handleDelete = async (id: number) => {
    const toastId = toast("Are you sure you want to delete this seller?", {
      action: {
        label: "Delete",
        onClick: async () => {
          setLoadingDeleteId(id);
          try {
            await deleteUser(id).unwrap();
            toast.success("Seller deleted successfully.");
          } catch {
            toast.error("Failed to delete seller.");
          } finally {
            setLoadingDeleteId(null);
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => toast.dismiss(toastId) },
    });
  };

  const handleToggleStatus = async (id: number, current: "Active" | "Inactive") => {
    setLoadingStatusId(id);
    try {
      await changeUserStatus({ id, status: current === "Active" ? 0 : 1 }).unwrap();
      toast.success(`Status updated to ${current === "Active" ? "Inactive" : "Active"}.`);
    } catch {
      toast.error("Failed to update status.");
    } finally {
      setLoadingStatusId(null);
    }
  };

  // 1. Eye Button Click Handler (View Details)
  const handleOpenViewModal = async (id: number) => {
    try {
      setIsViewModalOpen(true);
      await triggerFetchDetails(id).unwrap();
    } catch {
      toast.error("Failed to load seller complete details.");
      setIsViewModalOpen(false);
    }
  };

  // 2. Edit Button Click Handler
  const handleOpenEditModal = async (id: number) => {
    try {
      setIsEditModalOpen(true);
      const res = await triggerFetchDetails(id).unwrap();
      setEditFormStatus(res.data.status);
    } catch {
      toast.error("Failed to load seller details for editing.");
      setIsEditModalOpen(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fetchedDetails?.data) return;

    if (editFormStatus === fetchedDetails.data.status) {
      toast.info("No changes made to status.");
      setIsEditModalOpen(false);
      return;
    }

    setIsUpdating(true);
    setIsEditModalOpen(false);

    try {
      const targetStatusValue = editFormStatus === "Active" ? 1 : 0;
      await changeUserStatus({ id: fetchedDetails.data.id, status: targetStatusValue }).unwrap();
      toast.success(`Seller status updated to ${editFormStatus} successfully.`);
    } catch (error: any) {
      if (error?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
      } else {
        toast.error("Failed to update seller status.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const { data, isLoading, isError } = useGetSellerProvidersQuery({
    search: debouncedSearch, status, period, page, per_page: 10,
  });

  const sellers = data?.data ?? [];
  const meta = data?.meta;
  const lastPage = meta?.last_page ?? 1;

  const columns = useMemo(() => [
    {
      header: "Seller",
      render: (seller: SellerProvider) => (
        <div className="flex items-center gap-3">
          {seller.image_url ? (
            <Image src={seller.image_url} alt={seller.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500">{seller.name.charAt(0).toUpperCase()}</div>
          )}
          <div>
            <div className="flex items-center gap-1 text-[14px] font-medium text-gray-800">
              {seller.name}
              <span className={`text-xs ${seller.status === "Active" ? "text-green-500" : "text-gray-400"}`}>●</span>
            </div>
            <p className="text-[13px] text-gray-500">{seller.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Products",
      render: (seller: SellerProvider) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="p-2 rounded-full border border-[#dcebff]"><BoxIcon /></span>
          {seller.products}
        </div>
      ),
    },
    {
      header: "Total Sales",
      render: (seller: SellerProvider) => <span className="text-gray-500 text-sm">{seller.total_sales}</span>,
    },
    {
      header: "Rating",
      render: () => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <StarIcon />
          <span>—</span>
        </div>
      ),
    },
    {
      header: "Status",
      render: (seller: SellerProvider) => (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleToggleStatus(seller.id, seller.status); }}
          disabled={loadingStatusId === seller.id}
          className={`px-3 py-1 text-xs rounded-md transition-colors cursor-pointer ${seller.status === "Active" ? "bg-blue-100 text-[#4895ff] hover:bg-blue-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"} disabled:opacity-50`}
        >
          {loadingStatusId === seller.id ? "..." : seller.status}
        </button>
      ),
    },
    {
      header: "Actions",
      className: "text-right pr-6",
      render: (seller: SellerProvider) => (
        <div className="flex justify-end gap-2">
          {/* EYE BUTTON INTEGRATED WITH useGetUserDetailsQuery */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleOpenViewModal(seller.id); }}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <EyeIcon />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleOpenEditModal(seller.id); }}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleDelete(seller.id); }}
            disabled={loadingDeleteId === seller.id}
            className="p-2 rounded-md bg-red-100 hover:bg-red-200 disabled:opacity-50 cursor-pointer"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [loadingDeleteId, loadingStatusId]);

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Seller/Providers</h2>
            <p className="text-sm text-gray-500">Oversee and control user accounts</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Search users..." value={search} onChange={handleSearchChange} className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none" />
            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="px-3 py-2 text-sm border border-gray-200 rounded-lg">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select value={period} onChange={(e) => { setPeriod(e.target.value); setPage(1); }} className="px-3 py-2 text-sm border border-gray-200 rounded-lg">
              <option value="">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {isLoading && <p className="text-center text-sm text-gray-400 py-8">Loading...</p>}
        {isError && <p className="text-center text-sm text-red-400 py-8">Failed to load sellers.</p>}

        {!isLoading && !isError && (
          <div className="border border-gray-200 rounded-b-2xl overflow-hidden">
            <ReusableTableForAll columns={columns} data={sellers} rowKey={(row) => row.id} />
            {lastPage > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <p className="text-sm text-gray-500">Page {page} of {lastPage} &mdash; {meta?.total ?? 0} total sellers</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Previous</button>
                  {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`px-3 py-1.5 text-sm rounded-lg border ${p === page ? "bg-[#4895ff] text-white border-[#4895ff]" : "border-gray-200 hover:bg-gray-50"}`}>{p}</button>
                  ))}
                  <button onClick={() => setPage((p) => Math.min(lastPage, p + 1))} disabled={page === lastPage} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 👁️ VIEW DETAILS MODAL FOR SELLER */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden transform scale-100 transition-all duration-300">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Seller/Provider Profile</h3>
              <button type="button" onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl p-1 cursor-pointer">&times;</button>
            </div>

            {isFetchingDetails ? (
              <div className="p-12 text-center text-sm text-gray-400">Loading complete seller profile...</div>
            ) : (
              fetchedDetails?.data && (
                <div className="p-6 space-y-4">
                  <div className="flex flex-col items-center text-center pb-4 border-b border-gray-100">
                    {fetchedDetails.data.image ? (
                      <Image src={fetchedDetails.data.image.startsWith('http') ? fetchedDetails.data.image : `http://10.10.9.53:8000/${fetchedDetails.data.image}`} alt={fetchedDetails.data.name} width={70} height={70} className="w-[70px] h-[70px] rounded-full object-cover border-2 border-[#4895ff] mb-2" unoptimized />
                    ) : (
                      <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500 mb-2">{fetchedDetails.data.name.charAt(0).toUpperCase()}</div>
                    )}
                    <h4 className="text-base font-semibold text-gray-800">{fetchedDetails.data.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded mt-1 font-medium ${fetchedDetails.data.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{fetchedDetails.data.status}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                    <div>
                      <span className="block text-xs font-medium text-gray-400">Email Address</span>
                      <span className="text-gray-700 break-all">{fetchedDetails.data.email}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-gray-400">Phone</span>
                      <span className="text-gray-700">{fetchedDetails.data.phone || "—"}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs font-medium text-gray-400">Store Address</span>
                      <span className="text-gray-700">{fetchedDetails.data.address || "No address listed"}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-gray-400">Total Products</span>
                      <span className="font-semibold text-gray-800">{fetchedDetails.data.stats?.total_orders ?? 0}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-gray-400">Total Revenue</span>
                      <span className="font-semibold text-gray-800">{fetchedDetails.data.stats?.total_spent ?? "—"}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="button" onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer">Close Profile</button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/*  DYNAMIC EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden transform scale-100 transition-all duration-300">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Edit Seller Status</h3>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-medium p-1 cursor-pointer">&times;</button>
            </div>

            {isFetchingDetails ? (
              <div className="p-10 text-center text-sm text-gray-400">Fetching provider details...</div>
            ) : (
              fetchedDetails?.data && (
                <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {fetchedDetails.data.image ? (
                      <Image src={fetchedDetails.data.image.startsWith('http') ? fetchedDetails.data.image : `http://10.10.9.53:8000/${fetchedDetails.data.image}`} alt={fetchedDetails.data.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500">{fetchedDetails.data.name.charAt(0).toUpperCase()}</div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">{fetchedDetails.data.name}</h4>
                      <p className="text-xs text-gray-500">{fetchedDetails.data.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Provider Account Status</label>
                    <select value={editFormStatus} onChange={(e) => setEditFormStatus(e.target.value as "Active" | "Inactive")} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-[#4895ff]">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                    <button type="submit" disabled={isUpdating} className="px-4 py-2 text-sm font-medium bg-[#4895ff] text-white rounded-lg hover:bg-[#3b82f6] disabled:opacity-50 cursor-pointer">{isUpdating ? "Saving..." : "Save Changes"}</button>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}