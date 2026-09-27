import Image from "next/image";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { getImageUrl } from "@/lib/getImageUrl";

type AdminGeneralSettingsForm = {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  bio: string;
  languages: string;
};

type GeneralInfoFormProps = {
  register: UseFormRegister<AdminGeneralSettingsForm>;
  errors: FieldErrors<AdminGeneralSettingsForm>;
  isLoading?: boolean;
  role?: string;
  image?: string | null;
  imagePreview?: string;
  selectedImage?: File | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveSelectedImage: () => void;
};

function GeneralInfoForm({
  register,
  errors,
  isLoading,
  role = "admin",
  image,
  imagePreview,
  selectedImage,
  onImageChange,
  onRemoveSelectedImage,
}: GeneralInfoFormProps) {
  const avatar =
    imagePreview || getImageUrl(image, "/images/profile/img01.png");

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-[18px] font-semibold text-[#030914]">
            Admin Profile Information
          </h3>
          <p className="mt-1 text-[14px] text-gray-500">
            Update your admin account information. 
          </p>
        </div>

        {/* Profile Image */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-[#F8FAFC] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border-2 border-[#ffcd71] bg-white">
                <Image
                  src={avatar}
                  alt="Admin profile"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="text-[15px] font-semibold text-[#1D2433]">
                  Profile Image
                </h4>
                <p className="mt-1 text-[12px] text-gray-500">
                  Upload JPG, PNG, or WEBP. Maximum size 2MB.
                </p>

                {selectedImage ? (
                  <p className="mt-1 max-w-[260px] truncate text-[12px] text-gray-500">
                    Selected: {selectedImage.name}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="admin-profile-image-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={onImageChange}
              />

              <label
                htmlFor="admin-profile-image-upload"
                className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-[#1D2433] hover:bg-gray-50"
              >
                {selectedImage ? "Change Image" : "Upload Image"}
              </label>

              {selectedImage ? (
                <button
                  type="button"
                  onClick={onRemoveSelectedImage}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-gray-500 hover:bg-gray-50"
                >
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              First Name
            </label>
            <input
              type="text"
              disabled={isLoading}
              {...register("name", { required: "First name is required" })}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100"
              placeholder="Enter first name"
            />
            {errors.name?.message && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              Last Name
            </label>
            <input
              type="text"
              disabled={isLoading}
              {...register("last_name", {
                required: "Last name is required",
              })}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100"
              placeholder="Enter last name"
            />
            {errors.last_name?.message && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              Email Address
            </label>
            <input
              type="email"
              readOnly
              {...register("email")}
              className="w-full h-12 rounded-xl border border-gray-200 bg-gray-100 px-4 text-[14px] text-gray-500 outline-none cursor-not-allowed"
              placeholder="Email address"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              Account Role
            </label>
            <input
              type="text"
              readOnly
              value={role}
              className="w-full h-12 rounded-xl border border-gray-200 bg-gray-100 px-4 text-[14px] capitalize text-gray-500 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              Phone Number
            </label>
            <input
              type="text"
              disabled={isLoading}
              {...register("phone")}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              Languages
            </label>
            <input
              type="text"
              disabled={isLoading}
              {...register("languages")}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100"
              placeholder="English, Spanish"
            />
            <p className="mt-1 text-[12px] text-gray-500">
              Separate multiple languages with commas.
            </p>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              Address
            </label>
            <input
              type="text"
              disabled={isLoading}
              {...register("address")}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100"
              placeholder="Enter address"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              City
            </label>
            <input
              type="text"
              disabled={isLoading}
              {...register("city")}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              State
            </label>
            <input
              type="text"
              disabled={isLoading}
              {...register("state")}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100"
              placeholder="Enter state"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              Zip Code
            </label>
            <input
              type="text"
              disabled={isLoading}
              {...register("zip_code")}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100"
              placeholder="Enter zip code"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[14px] font-medium text-[#1D2433] mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              disabled={isLoading}
              {...register("bio")}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[14px] text-[#030914] outline-none focus:border-[#030914] disabled:bg-gray-100 resize-none"
              placeholder="Write a short admin profile bio"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfoForm;
