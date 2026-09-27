"use client";

import { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Trash2, CircleAlert } from "lucide-react";
import { ActionDialog } from "@/components/reusable/ActionDialog";
import LeftIcon from "@/components/icons/LeftIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";

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
    deactivateTitle: "Account Deactivate",
    deactivateDescription: "Are you sure you want to deactivate your account?",
    deleteTitle: "Account Delete",
    deleteDescription:
      "Are you sure you want to permanently delete your account?",
  },
}: AccountSettingsFormProps) {
  const [isDeactivateDialog, setIsDeactivateDialog] = useState(false);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 font-[inter]">
      {/* Back Button */}
      <Link
        href={"/client-profile"}
        className="flex items-center font-normal max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border  text-gray-black-400 mb-4 text-[16px]"
      >
        <LeftIcon />
        Back To Account
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="text-gray-black-400 mt-1 mb-8">{subtitle}</p>

      {/* Password Form */}
      <form className="bg-white  space-y-6">
        <div>
          <label className="text-sm text-gray-700">
            {labels.currentPassword}
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="mt-1 w-full border border-gray-200 px-3 py-3 rounded-[12px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">
              {labels.newPassword}
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="mt-1 w-full border border-gray-200 px-3 py-3 rounded-[12px]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">
              {labels.confirmPassword}
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="mt-1 w-full border border-gray-200 px-3 py-3 rounded-[12px]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onSavePassword}
          className="bg-black cursor-pointer text-white w-[142px] h-[48px] shape-squircle rounded-[22px] hover:bg-black/90"
        >
          Save Changes
        </button>
      </form>

      {/* Deactivate */}
      <div className="mt-12 border rounded-[8px] p-6 flex justify-between">
        <div>
          <h3 className="font-semibold text-b text-[18px]">
            Deactivate Account
          </h3>
          <p className="text-gray-black-400 text-[16px]">
            Temporarily disable your account (reversible within 30 days)
          </p>
        </div>

        <button
          onClick={() => setIsDeactivateDialog(true)}
          className="border shape-squircle rounded-[22px] w-[109px] h-[46px] font-medium text-b hover:bg-gray-50 cursor-pointer"
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
          className="bg-black text-white  w-[143px] h-[46px] font-medium shape-squircle rounded-[22px] cursor-pointer hover:bg-black/90"
        >
          Delete Account
        </button>
      </div>

      {/* Deactivate Dialog */}
      <ActionDialog
        open={isDeactivateDialog}
        setOpen={setIsDeactivateDialog}
        icon={<DeleteIcon/>}
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
