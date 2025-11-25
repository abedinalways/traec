"use client";
import { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import AccountDeactivateModal from "../../_components/modal/AccountDeactivateModal";
import AccountDeleteModal from "../../_components/modal/AccountDeleteModal";

export default function Page() {
  const [isOpenDeactivate, setIsOpenDeactivate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={"/profile"}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} className="pt-1" />
        Back To Account
      </Link>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
      <p className="text-gray-500 mt-1 mb-8">
        Manage your privacy, security, and account preferences
      </p>

      {/* Change Password Form */}
      <form className="bg-white rounded-xl space-y-6">
        <div>
          <label className="text-sm text-gray-700">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Enter Confirm password"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-black/90">
          Save Changes
        </button>
      </form>

      {/* Deactivate Account */}
      <div className="mt-12 border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-medium">Deactivate Account</h3>
          <p className="text-gray-500 text-sm">
            Temporarily disable your account (reversible within 30 days)
          </p>
        </div>

        <button
          onClick={() => setIsOpenDeactivate(true)}
          className="border rounded-md px-4 py-2 hover:bg-gray-50"
        >
          Deactivate
        </button>
      </div>

      {/* Delete Account */}
      <div className="mt-6 border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-medium">Delete Account</h3>
          <p className="text-gray-500 text-sm">
            Permanently delete your account and all data (irreversible)
          </p>
        </div>

        <button
          onClick={() => setIsOpenDelete(true)}
          className="bg-black text-white rounded-md px-4 py-2 hover:bg-black/90"
        >
          Delete Account
        </button>
      </div>

      {/* Modal Only Shows When isOpen === true */}
      {isOpenDeactivate && (
        <AccountDeactivateModal
          isOpen={isOpenDeactivate}
          onClose={() => setIsOpenDeactivate(false)}
        />
      )}

      {isOpenDelete && (
        <AccountDeleteModal
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
        />
      )}
    </div>
  );
}
