
"use client";

import LeftIcon from "@/components/icons/LeftIcon";
import ProfileCard from "@/components/reusable/ProfileCard";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ProfileUpdatePayload,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/app/api/profile/profileUpdateApi";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/getImageUrl";
import { useGetServiceCategoriesQuery } from "@/app/api/provider/providerRegistrationApi";
import { Eye, EyeOff, Lock } from "lucide-react";

type ProfileFormData = {
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

type PasswordFormData = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Bengali",
  "Turkish",
  "Dutch",
  "Swedish",
  "Polish",
  "Greek",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Malay",
  "Filipino",
  "Hebrew",
  "Persian",
];

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formatJoinedDate = (date?: string | null) => {
  if (!date) return "Joined recently";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Joined recently";
  return `Joined ${parsedDate.toLocaleString("en-US", { month: "short", year: "numeric" })}`;
};

const getErrorMessage = (err: unknown) => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (err as { data?: { message?: string } }).data;
    if (typeof data?.message === "string") return data.message;
  }
  return "Something went wrong. Please try again.";
};

/* ─────────────────────────────────────────────
   Password visibility toggle hook
───────────────────────────────────────────── */
function usePasswordToggle() {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible((v) => !v);
  const inputType = visible ? "text" : "password";
  const Icon = visible ? EyeOff : Eye;
  return { inputType, toggle, Icon };
}

/* ─────────────────────────────────────────────
   Separate Password Section Component
───────────────────────────────────────────── */
function ChangePasswordSection() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const current = usePasswordToggle();
  const newPass = usePasswordToggle();
  const confirm = usePasswordToggle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>({
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const newPasswordValue = watch("new_password");

  const onSubmit = async (data: PasswordFormData) => {
    if (data.new_password.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (data.new_password !== data.new_password_confirmation) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    const loadingToast = toast.loading("Updating password...");
    try {
      const res = await changePassword({
        current_password: data.current_password,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      }).unwrap();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "Password updated successfully.");
      reset();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="rounded-xl border bg-white p-6 mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Lock size={16} className="text-gray-600" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Change Password
          </h2>
          <p className="text-xs text-gray-400">Update your account password</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Password */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Current Password
            </label>
            <div className="relative mt-1">
              <input
                type={current.inputType}
                placeholder="Enter current password"
                className="w-full rounded-md border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                {...register("current_password", { required: true })}
              />
              <button
                type="button"
                onClick={current.toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <current.Icon size={15} />
              </button>
            </div>
            {errors.current_password && (
              <p className="mt-1 text-[11px] text-red-500">Required</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={newPass.inputType}
                placeholder="Min. 8 characters"
                className="w-full rounded-md border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                {...register("new_password", { required: true, minLength: 8 })}
              />
              <button
                type="button"
                onClick={newPass.toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <newPass.Icon size={15} />
              </button>
            </div>
            {errors.new_password?.type === "required" && (
              <p className="mt-1 text-[11px] text-red-500">Required</p>
            )}
            {errors.new_password?.type === "minLength" && (
              <p className="mt-1 text-[11px] text-red-500">Min. 8 characters</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                type={confirm.inputType}
                placeholder="Repeat new password"
                className="w-full rounded-md border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                {...register("new_password_confirmation", {
                  required: true,
                  validate: (v) =>
                    v === newPasswordValue || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={confirm.toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <confirm.Icon size={15} />
              </button>
            </div>
            {errors.new_password_confirmation?.type === "required" && (
              <p className="mt-1 text-[11px] text-red-500">Required</p>
            )}
            {errors.new_password_confirmation?.type === "validate" && (
              <p className="mt-1 text-[11px] text-red-500">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer text-white px-5 py-2 text-sm rounded-md gradient-bg disabled:opacity-60"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Edit Profile Page
───────────────────────────────────────────── */
export default function EditProfilePage() {
  const { data, isLoading, refetch } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null,
  );
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const user = data?.authenticated ? data.user : null;

  const { data: categoriesData } = useGetServiceCategoriesQuery();
  const categories = categoriesData?.data || [];

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<ProfileFormData>({
      defaultValues: {
        name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        bio: "",
        languages: "",
      },
    });

  const languagesValue = watch("languages");
  const selectedLanguages = languagesValue
    ? languagesValue.split(", ").filter(Boolean)
    : [];

  const initializedUserIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user) return;
    if (initializedUserIdRef.current === user.id) return;
    initializedUserIdRef.current = user.id;

    reset({
      name: user.name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      zip_code: user.zip_code || "",
      bio: user.bio || "",
      languages: Array.isArray(user.languages) ? user.languages.join(", ") : "",
    });

    if (Array.isArray(user.category_id)) {
      setSelectedCategoryIds(user.category_id);
    }
  }, [user, reset]);

  useEffect(() => {
    if (user?.image) setUploadedImagePath(user.image);
  }, [user?.image]);

  useEffect(() => {
    if (!selectedImage) return;
    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

  const fullName = user
    ? `${user.name || ""} ${user.last_name || ""}`.trim()
    : "";
  const location = [user?.city, user?.state].filter(Boolean).join(", ");
  const avatar =
    imagePreview ||
    getImageUrl(
      uploadedImagePath || user?.image,
      "/images/provider-profile-img.svg",
    );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate type & size
    if (!allowedImageTypes.includes(file.type)) {
      toast.error("Please upload a valid image file: JPG, PNG, or WEBP.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be less than 2MB.");
      event.target.value = "";
      return;
    }

    setSelectedImage(file);
    console.log("Image set:", file); // ✅ Debug
    toast.success("Image selected. Click Save Changes to update.");
  };

  const handleAddLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;
    if (!selectedLanguages.includes(value)) {
      setValue("languages", [...selectedLanguages, value].join(", "));
    }
    e.target.value = "";
  };

  const handleRemoveLanguage = (lang: string) => {
    setValue(
      "languages",
      selectedLanguages.filter((l) => l !== lang).join(", "),
    );
  };

  const toggleCategory = useCallback((id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const onSubmit = async (formData: ProfileFormData) => {
    const languages = formData.languages
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload: ProfileUpdatePayload = {
      name: formData.name,
      last_name: formData.last_name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip_code,
      bio: formData.bio,
      languages,
      image: selectedImage,
      category_id: selectedCategoryIds,
    };

    const loadingToast = toast.loading("Updating profile...");

    try {
      const res = await updateProfile(payload).unwrap();
      const updatedImage = res?.user?.image;
      if (updatedImage) setUploadedImagePath(updatedImage);

      await refetch();
      toast.dismiss(loadingToast);
      toast.success(res?.message || "Profile updated successfully.");
      setSelectedImage(null);
      setImagePreview("");

      const input = document.getElementById(
        "profile-image-upload",
      ) as HTMLInputElement | null;
      if (input) input.value = "";

      reset({ ...formData });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 font-[inter]">
      {/* Back */}
      <Link
        href={"/provider-profile"}
        className="flex items-center max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border text-gray-black-400 mb-4 text-[16px]"
      >
        <LeftIcon />
        Back To Account
      </Link>

      <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
      <p className="text-gray-500 mt-1 mb-8">
        Update your personal information
      </p>

      {/* ✅ Change Password — separate section at top */}
      <ChangePasswordSection />

      {/* Profile Card */}
      <ProfileCard
        name={isLoading ? "Loading..." : fullName || "User"}
        avatar={avatar}
        location={location || "Location not added"}
        joined={formatJoinedDate(user?.created_at)}
        email={user?.email || "Email not found"}
        verified={true}
      />

      {/* Image Upload */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Profile Image</p>
          <p className="text-xs text-gray-500">
            Upload JPG, PNG, or WEBP. Maximum size 2MB.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            id="profile-image-upload"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profile-image-upload"
            className="cursor-pointer rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Upload Image
          </label>
          {selectedImage && (
            <span className="max-w-[180px] truncate text-xs text-gray-500">
              {selectedImage.name}
            </span>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl mt-6 space-y-6"
      >
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">First Name</label>
            <input
              type="text"
              readOnly
              placeholder="Enter your first name"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("name")}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Last Name</label>
            <input
              type="text"
              readOnly
              placeholder="Enter your last name"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("last_name")}
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              readOnly
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("email")}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("phone")}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm text-gray-700">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            {...register("address")}
          />
        </div>

        {/* City, State, Zip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-700">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("city")}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">State</label>
            <input
              type="text"
              placeholder="Enter your state"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("state")}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Zip Code</label>
            <input
              type="text"
              placeholder="Enter your zip code"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("zip_code")}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm text-gray-700">Bio</label>
          <textarea
            rows={3}
            placeholder="e.g. Party enthusiast and mom who loves creating memorable celebrations..."
            className="mt-1 w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
            {...register("bio")}
          />
        </div>

        {/* Languages */}
        <div>
          <label className="text-sm text-gray-700">Languages</label>
          <select
            className="mt-1 w-full rounded-md border px-4 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
            defaultValue=""
            onChange={handleAddLanguage}
          >
            <option value="" disabled>
              Select a language...
            </option>
            {languageOptions
              .filter((lang) => !selectedLanguages.includes(lang))
              .map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
          </select>
          {selectedLanguages.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedLanguages.map((lang) => (
                <span
                  key={lang}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-700"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(lang)}
                    className="text-gray-400 hover:text-red-400 transition leading-none text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-gray-400 italic">
              No languages selected yet.
            </p>
          )}
        </div>

        {/* Categories */}
        <div>
          <label className="text-sm text-gray-700">Categories</label>
          <p className="text-xs text-gray-400 mt-0.5 mb-3">
            Select the service categories you offer
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {categories.map((category) => {
              const isChecked = selectedCategoryIds.includes(category.id);
              return (
                <div
                  key={category.id}
                  role="checkbox"
                  aria-checked={isChecked}
                  onClick={() => toggleCategory(category.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150 select-none
                    ${isChecked ? "border-black bg-black/5 text-black" : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"}`}
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0
                    ${isChecked ? "bg-black border-black" : "border-gray-300"}`}
                  >
                    {isChecked && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M1.5 5L3.8 7.5L8.5 2.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              );
            })}
          </div>
          {selectedCategoryIds.length === 0 && (
            <p className="mt-2 text-xs text-gray-400 italic">
              No categories selected yet.
            </p>
          )}
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="cursor-pointer text-white px-6 py-2 rounded-md gradient-bg disabled:opacity-60"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}



