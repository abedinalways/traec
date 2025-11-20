// import Link from "next/link";
// import { MdKeyboardArrowLeft } from "react-icons/md";

// export default function Page() {
//   return (
//     <div className="w-full max-w-3xl mx-auto px-4 py-10">
//       {/* Back Button */}
//       <Link
//         href={"/profile"}
//         className="flex items-center max-w-38 rounded-sm p-2 text-sm border text-gray-600 hover:text-black mb-4"
//       >
//         <MdKeyboardArrowLeft size={24} className="pt-1" />
//         Back To Account
//       </Link>

//       {/* Page Title */}
//       <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
//       <p className="text-gray-500 mt-1 mb-8">
//         Manage your privacy, security, and account preferences
//       </p>

//       {/* Change Password Form */}
//       <form className="bg-white rounded-xl space-y-6">
//         {/* Current Password */}
//         <div>
//           <label className="text-sm text-gray-700">Current Password</label>
//           <input
//             type="password"
//             placeholder="Enter current password"
//             className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
//           />
//         </div>

//         {/* New Password & Confirm Password */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-gray-700">New Password</label>
//             <input
//               type="password"
//               placeholder="Enter new password"
//               className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-700">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Confirm password"
//               className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
//             />
//           </div>
//         </div>

//         {/* Save Button */}
//         <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-black/90">
//           Save Changes
//         </button>
//       </form>

//       {/* Deactivate Account */}
//       <div className="mt-12 border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h3 className="font-medium">Deactivate Account</h3>
//           <p className="text-gray-500 text-sm">
//             Temporarily disable your account (reversible within 30 days)
//           </p>
//         </div>

//         <button className="border rounded-md px-4 py-2 hover:bg-gray-50">
//           Deactivate
//         </button>
//       </div>

//       {/* Delete Account */}
//       <div className="mt-6 border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h3 className="font-medium">Delete Account</h3>
//           <p className="text-gray-500 text-sm">
//             Permanently delete your account and all data (irreversible)
//           </p>
//         </div>

//         <button className="bg-black text-white rounded-md px-4 py-2 hover:bg-black/90">
//           Delete Account
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Trash2, CircleAlert } from "lucide-react";
import { ActionDialog } from "@/components/reusable/ActionDialog";

export default function Page() {
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={"/profile"}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} />
        Back To Account
      </Link>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
      <p className="text-gray-500 mt-1 mb-8">
        Manage your privacy, security, and account preferences
      </p>

      {/* Change Password Form */}
      <form className="bg-white rounded-xl space-y-6">
        {/* Current Password */}
        <div>
          <label className="text-sm text-gray-700">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* New Password & Confirm Password */}
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
              placeholder="Enter confirm password"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="button"
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-black/90"
        >
          Save Changes
        </button>
      </form>

      {/* Deactivate Account Section */}
      <div className="mt-12 border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-medium">Deactivate Account</h3>
          <p className="text-gray-500 text-sm">
            Temporarily disable your account (reversible within 30 days)
          </p>
        </div>

        <button
          onClick={() => setOpenDeactivate(true)}
          className="border rounded-md cursor-pointer px-4 py-2 hover:bg-gray-50"
        >
          Deactivate
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="mt-6 border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-medium">Delete Account</h3>
          <p className="text-gray-500 text-sm">
            Permanently delete your account and all data (irreversible)
          </p>
        </div>

        <button
          onClick={() => setOpenDelete(true)}
          className="bg-black text-white cursor-pointer rounded-md px-4 py-2 hover:bg-black/90"
        >
          Delete Account
        </button>
      </div>

      {/* Reusable Deactivate Dialog */}
      <ActionDialog
        open={openDeactivate}
        setOpen={setOpenDeactivate}
        icon={<CircleAlert className="h-7 w-7 text-red-500" />}
        title="Account Deactivate"
        description="Are you sure you want to Deactivate your Account?"
        confirmLabel="Deactivate"
        onConfirm={() => {
          console.log("Account deactivated");
        }}
      />

      {/* Reusable Delete Dialog */}
      <ActionDialog
        open={openDelete}
        setOpen={setOpenDelete}
        icon={<Trash2 className="h-7 w-7 text-red-500" />}
        title="Account Delete"
        description="Are you sure you want to Delete your Account?"
        confirmLabel="Delete"
        onConfirm={() => {
          console.log("Account deleted");
        }}
      />
    </div>
  );
}
