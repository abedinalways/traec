/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import GeneralInfoForm from "./GeneralInforForm";
import NotificationSettings from "./NotificationSettings";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/app/api/profile/profileUpdateApi";

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

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const getErrorMessage = (err: unknown) => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (err as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return "Profile update failed. Please try again.";
};

export default function GeneralSettingsSection() {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminGeneralSettingsForm>({
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

  const handleRemoveSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview("");

    const input = document.getElementById(
      "admin-profile-image-upload",
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  const onSubmit = async (formData: AdminGeneralSettingsForm) => {
    const languages = formData.languages
      .split(",")
      .map((language) => language.trim())
      .filter(Boolean);

    const payload = {
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
    };

    const loadingToast = toast.loading("Updating general settings...");

    try {
      const res = await updateProfile(payload).unwrap();

      const updatedImage = res?.user?.image || res?.data?.user?.image;

      if (updatedImage) {
        setUploadedImagePath(updatedImage);
      }

      await refetch();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "General settings updated successfully.");

      setSelectedImage(null);
      setImagePreview("");

      const input = document.getElementById(
        "admin-profile-image-upload",
      ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("ADMIN GENERAL SETTINGS UPDATE ERROR:", err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div
      className="p-8 min-h-screen"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="mb-6">
        <h2 className="text-[16px] font-bold text-[#030914]">
          General Settings
        </h2>
        <p className="mt-1 text-[14px] text-gray-500">
          Manage admin profile information and platform contact details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GeneralInfoForm
          register={register}
          errors={errors}
          isLoading={isLoading}
          role={user?.type || "admin"}
          image={uploadedImagePath || user?.image || null}
          imagePreview={imagePreview}
          selectedImage={selectedImage}
          onImageChange={handleImageChange}
          onRemoveSelectedImage={handleRemoveSelectedImage}
        />

        <NotificationSettings />

        <button
          type="submit"
          disabled={isUpdating || isLoading}
          className="bg-[#030914] text-white px-8 py-3 rounded-lg font-medium text-[15px] hover:bg-black transition-all cursor-pointer disabled:opacity-60"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
