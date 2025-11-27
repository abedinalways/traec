import ProfileView from "@/components/reusable/ProfileView";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function page() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href={"/provider-account"}
        className="flex items-center max-w-38 rounded-sm p-2 text-sm border  text-gray-600 hover:text-black mb-4"
      >
        <MdKeyboardArrowLeft size={24} className="pt-1" />
        Back To Account
      </Link>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
      <p className="text-gray-500 mt-1 mb-8">
        Update your personal information
      </p>

      {/* Profile Image Section */}
      <ProfileView />

      {/* ---- BELOW SECTION: Form ---- */}
      <form className="bg-white rounded-xl mt-6 space-y-6">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm text-gray-700">Bio</label>
          <textarea
            rows={3}
            placeholder="e.g. Party enthusiast and mom who loves creating memorable celebrations for family and friends..."
            className="mt-1 w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
          ></textarea>
        </div>

        {/* Languages */}
        <div>
          <label className="text-sm text-gray-700">Languages</label>
          <input
            type="text"
            placeholder="English, Spanish"
            className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-black/90">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* Placeholder Component - replace with your actual code */
function ProfileImageSection() {
  return (
    <div className="text-gray-400">
      {/* Replace this with your real image upload section */}
      Your Profile Image Section Goes Here
    </div>
  );
}
