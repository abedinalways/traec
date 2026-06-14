"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import ReusableTableForAll from "./ReusableTableForAll";

import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import BoxIcon from "@/components/icons/BoxIcon";
import ListRightIcon from "@/icons/ListRightIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import SettingIcon from "@/icons/SettingsIcon";
import StarIcon from "@/components/icons/StarIcon";

import {
  OrderIndexResponse,
  OrderCustomerInfo,
  useLazyGetOrderDetailsQuery,
  useDeleteOrderUserMutation
} from "@/app/api/admin/orderManagementApi";

interface TableProps {
  apiData?: OrderIndexResponse;
  isLoading: boolean;
  isError: boolean;
  page: number;
  setPage: (page: number) => void;
}

export default function OrderManagementTable({ apiData, isLoading, isError, page, setPage }: TableProps) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);

  const [triggerFetchDetails, { data: fetchedDetails, isFetching: isFetchingDetails }] = useLazyGetOrderDetailsQuery();
  const [deleteOrderUser] = useDeleteOrderUserMutation();

  const handleOpenViewModal = async (id: number) => {
    try {
      setIsViewModalOpen(true);
      await triggerFetchDetails(id).unwrap();
    } catch {
      toast.error("Failed to load user live system insight.");
      setIsViewModalOpen(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    const toastId = toast("Are you sure you want to completely clear this client?", {
      action: {
        label: "Delete",
        onClick: async () => {
          setLoadingDeleteId(id);
          try {
            await deleteOrderUser(id).unwrap();
            toast.success("User removed successfully from database.");
          } catch {
            toast.error("An error occurred during user termination.");
          } finally {
            setLoadingDeleteId(null);
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => toast.dismiss(toastId) },
    });
  };

  const ordersList = useMemo(() => apiData?.data ?? [], [apiData]);
  const meta = apiData?.meta;
  const lastPage = meta?.last_page ?? 1;

  const columns = useMemo(() => [
    {
      header: "Name / Email",
      render: ({ customer_info }: { customer_info: OrderCustomerInfo }) => (
        <div className="flex items-center gap-3">
          {customer_info.image_url ? (
            <Image
              src={customer_info.image_url.startsWith("http") ? customer_info.image_url : `http://10.10.9.53:8000/${customer_info.image_url}`}
              alt={customer_info.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500">
              {customer_info.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1 text-[14px] font-medium text-gray-800">
              {customer_info.name}
              <span className="text-xs text-green-500">●</span>
            </div>
            <p className="text-[13px] text-gray-500">{customer_info.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      render: () => (
        <span className="rounded-md px-3 py-1 text-xs font-medium bg-[#E8F7F3] text-[#17A38B]">
          Customer
        </span>
      ),
    },
    {
      header: "Order Details",
      render: ({ customer_info }: { customer_info: OrderCustomerInfo }) => (
        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex flex-col items-center gap-1 text-sm">
            <span className="rounded-full border border-[#dcebff] p-2"><BoxIcon /></span>
            {customer_info.total_order}
          </div>
          <div className="flex flex-col items-center gap-1 text-sm">
            <span className="rounded-full border border-[#d7f5dd] p-2"><ListRightIcon /></span>
            {customer_info.complete_order}
          </div>
          <div className="flex flex-col items-center gap-1 text-sm">
            <span className="rounded-full border border-[#eadfff] p-2"><LoadingIcon /></span>
            {customer_info.pending_order}
          </div>
        </div>
      ),
    },
    {
      header: "Active Status",
      render: () => (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[16px] text-gray-600">
            <span className="rounded-full border border-red-200 p-2"><SettingIcon /></span>
            0
          </div>
          <div className="flex items-center gap-1 text-[16px] text-gray-600">
            <span className="rounded-full border border-orange-200 p-2"><StarIcon /></span>
            4.9
          </div>
        </div>
      ),
    },
    {
      header: "Total Spent",
      render: ({ customer_info }: { customer_info: OrderCustomerInfo }) => (
        <span className="text-sm text-gray-500">{customer_info.total_spent}</span>
      ),
    },
    {
      header: "Status",
      render: () => (
        <span className="rounded-[6px] bg-blue-100 px-3 py-1.5 text-xs text-[#4895ff]">
          Accepted
        </span>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      render: ({ customer_info }: { customer_info: OrderCustomerInfo }) => (
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => handleOpenViewModal(customer_info.id)}
            className="rounded-md bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer"
          >
            <EyeIcon />
          </button>
          <button type="button" className="rounded-md bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer">
            <EditIcon />
          </button>
          <button
            type="button"
            disabled={loadingDeleteId === customer_info.id}
            onClick={() => handleDeleteUser(customer_info.id)}
            className="rounded-md bg-red-100 p-2 hover:bg-red-200 disabled:opacity-40 cursor-pointer"
          >
            {loadingDeleteId === customer_info.id ? "..." : <DeleteIcon />}
          </button>
        </div>
      ),
    },
  ], [loadingDeleteId]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white relative">
      {isLoading && <p className="text-center text-sm text-gray-400 py-8">Loading live rows...</p>}
      {isError && <p className="text-center text-sm text-red-400 py-8">Failed to download system assets.</p>}

      {!isLoading && !isError && (
        <>
          <ReusableTableForAll columns={columns} data={ordersList} rowKey={(row) => row.customer_info.id} />


          {lastPage > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-500">
                Showing page <span className="font-medium text-gray-700">{page}</span> of <span className="font-medium text-gray-700">{lastPage}</span> ({meta?.total ?? 0} rows)
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                >
                  Previous
                </button>

                {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${p === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage(Math.min(lastPage, page + 1))}
                  disabled={page === lastPage}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* VIEW DETAILS MODAL */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">User Profile Details</h3>
              <button type="button" onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl p-1 cursor-pointer">&times;</button>
            </div>

            {isFetchingDetails ? (
              <div className="p-12 text-center text-sm text-gray-400">Loading live user summary...</div>
            ) : (
              fetchedDetails?.data && (
                <div className="p-6 space-y-4">
                  <div className="flex flex-col items-center text-center pb-4 border-b border-gray-100">
                    {fetchedDetails.data.customer.image ? (
                      <Image
                        src={fetchedDetails.data.customer.image.startsWith('http') ? fetchedDetails.data.customer.image : `http://10.10.9.53:8000/${fetchedDetails.data.customer.image}`}
                        alt={fetchedDetails.data.customer.name}
                        width={70}
                        height={70}
                        className="w-[70px] h-[70px] rounded-full object-cover border-2 border-[#4895ff] mb-2"
                        unoptimized
                      />
                    ) : (
                      <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500 mb-2">
                        {fetchedDetails.data.customer.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <h4 className="text-base font-semibold text-gray-800">{fetchedDetails.data.customer.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded mt-1 font-medium ${fetchedDetails.data.customer.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {fetchedDetails.data.customer.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                    <div>
                      <span className="block text-xs font-medium text-gray-400">Email Address</span>
                      <span className="text-gray-700 break-all">{fetchedDetails.data.customer.email}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-gray-400">Phone</span>
                      <span className="text-gray-700">{fetchedDetails.data.customer.phone || "—"}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs font-medium text-gray-400">Address</span>
                      <span className="text-gray-700">{fetchedDetails.data.customer.address || "No address provided"}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-gray-400">Total Orders</span>
                      <span className="font-semibold text-gray-800">{fetchedDetails.data.orders?.total_orders ?? 0}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-gray-400">Total Spent</span>
                      <span className="font-semibold text-gray-800">{fetchedDetails.data.payments?.total_spent ?? "—"}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="button" onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer">Close Window</button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}