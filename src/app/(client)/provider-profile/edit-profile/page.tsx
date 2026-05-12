

"use client";

import LeftIcon from "@/components/icons/LeftIcon";
import ProfileCard from "@/components/reusable/ProfileCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ProfileUpdatePayload,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/app/api/profile/profileUpdateApi";
import { toast } from "sonner";

// Shadcn UI Imports
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getImageUrl } from "@/lib/getImageUrl";

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
  password: string;
  password_confirmation: string;
};

// Language Options
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

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formatJoinedDate = (date?: string | null) => {
  if (!date) return "Joined recently";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Joined recently";
  }

  return `Joined ${parsedDate.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  })}`;
};

const getErrorMessage = (err: unknown) => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (err as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return "Profile update failed. Please try again.";
};

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
  const user = data?.authenticated ? data.user : null;

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
        password: "",
        password_confirmation: "",
      },
    });

  const languagesValue = watch("languages");

  useEffect(() => {
    if (!user) return;

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
      password: "",
      password_confirmation: "",
    });
  }, [user, reset]);

  useEffect(() => {
    if (user?.image) {
      setUploadedImagePath(user.image);
    }
  }, [user?.image]);

  useEffect(() => {
    if (!selectedImage) return;

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
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
  console.log(avatar, "where is my image?=======================")
  // console.log(location, "===========================")

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

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
    toast.success("Image selected. Click Save Changes to update.");
  };

  const onSubmit = async (formData: ProfileFormData) => {
    const wantsPasswordChange =
      formData.password.trim() || formData.password_confirmation.trim();

    if (wantsPasswordChange) {
      if (formData.password !== formData.password_confirmation) {
        toast.error("Password and confirm password do not match.");
        return;
      }

      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters.");
        return;
      }
    }

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
      ...(wantsPasswordChange
        ? {
            password: formData.password,
            password_confirmation: formData.password_confirmation,
          }
        : {}),
    };

    const loadingToast = toast.loading("Updating profile...");

    try {
      const res = await updateProfile(payload).unwrap();

      const updatedImage = res?.user?.image;

      if (updatedImage) {
        setUploadedImagePath(updatedImage);
      }

      await refetch();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "Profile updated successfully.");

      setSelectedImage(null);
      setImagePreview("");

      const input = document.getElementById(
        "profile-image-upload",
      ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }

      reset({
        ...formData,
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("PROFILE UPDATE ERROR:", err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 font-[inter]">
      {/* Back Button */}
      <Link
        href={"/provider-profile"}
        className="flex items-center max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border  text-gray-black-400 mb-4 text-[16px]"
      >
        <LeftIcon />
        Back To Account
      </Link>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
      <p className="text-gray-500 mt-1 mb-8">
        Update your personal information
      </p>

      {/* Profile Image Section */}
      <ProfileCard
        name={isLoading ? "Loading..." : fullName || "User"}
        avatar={avatar}
        location={location || "Location not added"}
        joined={formatJoinedDate(user?.created_at)}
        email={user?.email || "Email not found"}
        verified={true}
      />

      {/* Image Upload Action */}
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

          {selectedImage ? (
            <span className="max-w-[180px] truncate text-xs text-gray-500">
              {selectedImage.name}
            </span>
          ) : null}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl mt-6 space-y-6"
      >
        {/* First & Last Name */}
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
            placeholder="e.g. Party enthusiast and mom who loves creating memorable celebrations for family and friends..."
            className="mt-1 w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
            {...register("bio")}
          ></textarea>
        </div>

        {/* Languages - Shadcn Select */}
        <div>
          <label className="text-sm text-gray-700">Languages</label>
          <Select
            onValueChange={(value) => {
              const currentLanguages = languagesValue
                ? languagesValue.split(", ").filter(Boolean)
                : [];
              let newLanguages: string[];

              if (currentLanguages.includes(value)) {
                newLanguages = currentLanguages.filter(
                  (lang) => lang !== value,
                );
              } else {
                newLanguages = [...currentLanguages, value];
              }

              setValue("languages", newLanguages.join(", "));
            }}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select languages..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languageOptions.map((lang) => {
                  const isSelected = languagesValue?.includes(lang) || false;
                  return (
                    <SelectItem key={lang} value={lang}>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="accent-black pointer-events-none"
                        />
                        {lang}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Click on languages to select / deselect multiple
          </p>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Optional"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("password")}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Optional"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
              {...register("password_confirmation")}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-black cursor-pointer text-white px-6 py-2 rounded-md hover:bg-black/90 disabled:opacity-60"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}