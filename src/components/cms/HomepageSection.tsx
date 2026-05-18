"use client";

import { SearchIcon, CheckCircleIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getImageFallbackUrls } from "@/lib/getImageUrl";
import {
  HomeContent,
  useGetHomeContentQuery,
  useUpdateHomeContentMutation,
} from "@/app/api/admin/cmsContentApi";
import { getImageUrl } from "@/lib/getImageUrl";

type ImageKey = "image_1" | "image_2" | "image_3";

type HomeFormState = {
  heading: string;
  sub_heading: string;
  input_placeholder: string;
  button_text: string;
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const defaultFormState: HomeFormState = {
  heading: "",
  sub_heading: "",
  input_placeholder: "",
  button_text: "",
};

const getHomeContent = (response?: unknown): HomeContent | null => {
  const res = response as
    | HomeContent
    | {
        data?:
          | HomeContent
          | HomeContent[]
          | {
              content?: HomeContent;
              other_data?: unknown;
              data?: HomeContent;
            };
        content?: HomeContent;
      }
    | null
    | undefined;

  if (!res) return null;

  if ("content" in res && res.content) {
    return res.content;
  }

  if ("data" in res && res.data) {
    if (Array.isArray(res.data)) {
      return res.data[0] || null;
    }

    if (
      typeof res.data === "object" &&
      "content" in res.data &&
      res.data.content
    ) {
      return res.data.content;
    }

    if (typeof res.data === "object" && "data" in res.data && res.data.data) {
      return res.data.data;
    }

    if (
      typeof res.data === "object" &&
      ("heading" in res.data || "image_1" in res.data)
    ) {
      return res.data as HomeContent;
    }
  }

  if ("heading" in res || "image_1" in res) {
    return res as HomeContent;
  }

  return null;
};

const getErrorMessage = (err: unknown) => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (err as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return "Homepage content update failed. Please try again.";
};

function CmsPreviewImage({
  image,
  preview,
  fallback,
  cacheKey,
  alt,
}: {
  image?: string | null;
  preview?: string;
  fallback: string;
  cacheKey?: string | number;
  alt: string;
}) {
  const urls = preview
    ? [preview]
    : getImageFallbackUrls(image, fallback, cacheKey);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
  }, [image, preview, cacheKey]);

  return (
    <img
      src={urls[activeIndex] || fallback}
      alt={alt}
      className="h-full w-full rounded-xl object-cover"
      onError={() => {
        setActiveIndex((prev) => {
          if (prev + 1 < urls.length) {
            return prev + 1;
          }

          return prev;
        });
      }}
    />
  );
}

function HomepageSection() {
  const { data, isLoading, isError, refetch } = useGetHomeContentQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [updateHomeContent, { isLoading: isUpdating }] =
    useUpdateHomeContentMutation();

  const content = useMemo(() => getHomeContent(data), [data]);

  const [formState, setFormState] = useState<HomeFormState>(defaultFormState);

  // eslint-disable-next-line react-hooks/purity
  const [imageVersion, setImageVersion] = useState(Date.now());

  const [uploadedImages, setUploadedImages] = useState<
    Record<ImageKey, string | null>
  >({
    image_1: null,
    image_2: null,
    image_3: null,
  });

  const [selectedImages, setSelectedImages] = useState<
    Record<ImageKey, File | null>
  >({
    image_1: null,
    image_2: null,
    image_3: null,
  });

  const [imagePreviews, setImagePreviews] = useState<Record<ImageKey, string>>({
    image_1: "",
    image_2: "",
    image_3: "",
  });

  useEffect(() => {
    if (!content) return;

    setFormState({
      heading: content.heading || "",
      sub_heading: content.sub_heading || "",
      input_placeholder: content.input_placeholder || "",
      button_text: content.button_text || "",
    });

    setUploadedImages({
      image_1: content.image_1 || null,
      image_2: content.image_2 || null,
      image_3: content.image_3 || null,
    });

    setImageVersion(Date.now());
  }, [content]);

  useEffect(() => {
    const objectUrls: string[] = [];

    const nextPreviews: Record<ImageKey, string> = {
      image_1: "",
      image_2: "",
      image_3: "",
    };

    (["image_1", "image_2", "image_3"] as ImageKey[]).forEach((key) => {
      const file = selectedImages[key];

      if (file) {
        const previewUrl = URL.createObjectURL(file);
        nextPreviews[key] = previewUrl;
        objectUrls.push(previewUrl);
      }
    });

    setImagePreviews(nextPreviews);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImages]);

  const handleInputChange = (field: keyof HomeFormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (
    key: ImageKey,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!allowedImageTypes.includes(file.type)) {
      toast.error("Please upload JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be less than 2MB.");
      event.target.value = "";
      return;
    }

    setSelectedImages((prev) => ({
      ...prev,
      [key]: file,
    }));

    toast.success("Image selected. Click save to update.");
  };

  const clearSelectedImage = (key: ImageKey) => {
    setSelectedImages((prev) => ({
      ...prev,
      [key]: null,
    }));

    const input = document.getElementById(
      `home-${key}-upload`,
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  const resetFileInputs = () => {
    (["image_1", "image_2", "image_3"] as ImageKey[]).forEach((key) => {
      const input = document.getElementById(
        `home-${key}-upload`,
      ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }
    });
  };

  const getDisplayImage = (key: ImageKey, fallback: string) => {
    if (imagePreviews[key]) {
      return imagePreviews[key];
    }

    return getImageUrl(uploadedImages[key], fallback, imageVersion);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loadingToast = toast.loading("Updating homepage content...");

    try {
      const res = await updateHomeContent({
        heading: formState.heading,
        sub_heading: formState.sub_heading,
        input_placeholder: formState.input_placeholder,
        button_text: formState.button_text,
        image_1: selectedImages.image_1,
        image_2: selectedImages.image_2,
        image_3: selectedImages.image_3,
      }).unwrap();

      console.log("HOME UPDATE RESPONSE:", res);

      const updatedContentFromUpdate = getHomeContent(res);

      if (updatedContentFromUpdate) {
        setUploadedImages((prev) => ({
          image_1: updatedContentFromUpdate.image_1 || prev.image_1,
          image_2: updatedContentFromUpdate.image_2 || prev.image_2,
          image_3: updatedContentFromUpdate.image_3 || prev.image_3,
        }));
      }

      const freshResult = await refetch();

      console.log("HOME INDEX AFTER UPDATE:", freshResult.data);

      const freshContent = getHomeContent(freshResult.data);

      if (freshContent) {
        setFormState({
          heading: freshContent.heading || "",
          sub_heading: freshContent.sub_heading || "",
          input_placeholder: freshContent.input_placeholder || "",
          button_text: freshContent.button_text || "",
        });

        setUploadedImages((prev) => ({
          image_1:
            freshContent.image_1 ||
            updatedContentFromUpdate?.image_1 ||
            prev.image_1,
          image_2:
            freshContent.image_2 ||
            updatedContentFromUpdate?.image_2 ||
            prev.image_2,
          image_3:
            freshContent.image_3 ||
            updatedContentFromUpdate?.image_3 ||
            prev.image_3,
        }));
      }

      setImageVersion(Date.now());

      setSelectedImages({
        image_1: null,
        image_2: null,
        image_3: null,
      });

      resetFileInputs();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "Homepage content updated successfully.");
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log("HOME CONTENT UPDATE ERROR:", err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 min-h-screen font-[inter]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#030914]">
            Manage Homepage Sliders & Banners
          </h2>

          {isLoading ? (
            <p className="mt-1 text-[13px] text-gray-500">
              Loading homepage content...
            </p>
          ) : isError ? (
            <p className="mt-1 text-[13px] text-red-500">
              Failed to load homepage content.
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isUpdating || isLoading}
          className="rounded-lg bg-[#C4550C] px-8 py-3 text-white transition hover:bg-[#A94408] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdating ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {(["image_1", "image_2", "image_3"] as ImageKey[]).map((key, index) => (
          <div key={key} className="space-y-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
              <CmsPreviewImage
                image={uploadedImages[key]}
                preview={imagePreviews[key]}
                fallback={`/images/cms/img000${index + 1}.png`}
                cacheKey={imageVersion}
                alt={`Slide ${index + 1}`}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id={`home-${key}-upload`}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(event) => handleImageChange(key, event)}
              />

              <label
                htmlFor={`home-${key}-upload`}
                className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-[#1D2433] hover:bg-gray-50"
              >
                {selectedImages[key]
                  ? "Change Image"
                  : `Upload Image ${index + 1}`}
              </label>

              {selectedImages[key] ? (
                <button
                  type="button"
                  onClick={() => clearSelectedImage(key)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-gray-500 hover:bg-gray-50"
                >
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[13px] text-gray-500 mb-2 ml-1">
            Headline
          </label>
          <input
            className="w-full p-4 rounded-lg bg-white border-none shadow-sm text-[15px] focus:ring-1 focus:ring-blue-400 outline-none"
            value={formState.heading}
            onChange={(event) =>
              handleInputChange("heading", event.target.value)
            }
            placeholder="Enter homepage headline"
          />
        </div>

        <div>
          <label className="block text-[13px] text-gray-500 mb-2 ml-1">
            Sub Headline
          </label>
          <textarea
            className="w-full p-4 rounded-lg bg-white border-none shadow-sm text-[14px] leading-relaxed h-24 focus:ring-1 focus:ring-blue-400 outline-none resize-none"
            value={formState.sub_heading}
            onChange={(event) =>
              handleInputChange("sub_heading", event.target.value)
            }
            placeholder="Enter homepage sub headline"
          />
        </div>

        <div>
          <label className="block text-[13px] text-gray-500 mb-2 ml-1">
            CTA Input Placeholder
          </label>
          <div className="relative">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              className="w-full py-4 pl-11 pr-4 rounded-lg bg-white border-none shadow-sm text-[14px] focus:ring-1 focus:ring-blue-400 outline-none"
              value={formState.input_placeholder}
              onChange={(event) =>
                handleInputChange("input_placeholder", event.target.value)
              }
              placeholder="What type of Service do you need?"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-gray-500 mb-2 ml-1">
            CTA Button Text
          </label>
          <input
            className="w-full p-4 rounded-lg bg-white border-none shadow-sm text-[14px] focus:ring-1 focus:ring-blue-400 outline-none font-medium"
            value={formState.button_text}
            onChange={(event) =>
              handleInputChange("button_text", event.target.value)
            }
            placeholder="Find Event Services"
          />
        </div>

        <div className="flex flex-wrap gap-8 pt-2">
          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <CheckCircleIcon size={22} className="text-[#33ccff]" />
            <span>10,000+ Happy Customers</span>
          </div>

          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <StarIcon size={22} className="text-[#ffb400]" />
            <span>4.9/5 Average Rating</span>
          </div>

          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <CheckCircleIcon size={22} className="text-[#00d084]" />
            <span>500+ Verified Providers</span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default HomepageSection;
