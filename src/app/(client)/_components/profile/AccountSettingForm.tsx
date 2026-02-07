"use client";

import { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Trash2, CircleAlert } from "lucide-react";
import { ActionDialog } from "@/components/reusable/ActionDialog";

type Labels = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

type DialogText = {
  deactivateTitle?: string;
  deactivateDescription?: string;
  deleteTitle?: string;
  deleteDescription?: string;
};

interface AccountSettingsFormProps {
  backUrl?: string;
  title?: string;
  subtitle?: string;
  labels?: Labels;
  // API functions (CUSTOM depending on page)
  onSavePassword?: () => void | Promise<void>;
  onDeactivate?: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  // Dialog custom text
  dialogText?: DialogText;
}

export default function AccountSettingsForm({
  backUrl = "/",
  title = "Account Settings",
  subtitle = "Manage your privacy, security, and account preferences",

  // Field labels
  labels = {
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
  },

  // API functions (CUSTOM depending on page)
  onSavePassword,
  onDeactivate,
  onDelete,

  // Dialog custom text
  dialogText = {
    deactivateTitle: "Deactivate Account",
    deactivateDescription: "Are you sure you want to deactivate your account?",
    deleteTitle: "Delete Account",
    deleteDescription:
      "Are you sure you want to permanently delete your account?",
  },
}: AccountSettingsFormProps) {
  const [isDeactivateDialog, setIsDeactivateDialog] = useState(false);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={backUrl}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} />
        Back To Account
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="text-gray-500 mt-1 mb-8">{subtitle}</p>

      {/* Password Form */}
      <form className="bg-white rounded-xl space-y-6">
        <div>
          <label className="text-sm text-gray-700">
            {labels.currentPassword}
          </label>
          <input
            type="password"
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">
              {labels.newPassword}
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">
              {labels.confirmPassword}
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onSavePassword}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-black/90"
        >
          Save Changes
        </button>
      </form>

      {/* Deactivate */}
      <div className="mt-12 border rounded-xl p-6 flex justify-between">
        <div>
          <h3 className="font-medium">Deactivate Account</h3>
          <p className="text-gray-500 text-sm">
            Temporarily disable your account.
          </p>
        </div>

        <button
          onClick={() => setIsDeactivateDialog(true)}
          className="border rounded-md px-4 py-2 hover:bg-gray-50"
        >
          Deactivate
        </button>
      </div>

      {/* Delete */}
      <div className="mt-6 border rounded-xl p-6 flex justify-between">
        <div>
          <h3 className="font-medium">Delete Account</h3>
          <p className="text-gray-500 text-sm">
            Permanently delete your account.
          </p>
        </div>

        <button
          onClick={() => setIsDeleteDialog(true)}
          className="bg-black text-white rounded-md px-4 py-2 hover:bg-black/90"
        >
          Delete
        </button>
      </div>

      {/* Deactivate Dialog */}
      <ActionDialog
        open={isDeactivateDialog}
        setOpen={setIsDeactivateDialog}
        icon={<CircleAlert className="h-7 w-7 text-red-500" />}
        title={dialogText.deactivateTitle!}
        description={dialogText.deactivateDescription!}
        confirmLabel="Deactivate"
        onConfirm={onDeactivate}
      />

      {/* Delete Dialog */}
      <ActionDialog
        open={isDeleteDialog}
        setOpen={setIsDeleteDialog}
        icon={<Trash2 className="h-7 w-7 text-red-500" />}
        title={dialogText.deleteTitle!}
        description={dialogText.deleteDescription!}
        confirmLabel="Delete"
        onConfirm={onDelete}
      />
    </div>
  );
}
