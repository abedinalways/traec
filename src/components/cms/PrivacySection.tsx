"use client";

import { useEffect, useMemo, useState } from "react";
import { Save, X } from "lucide-react";
import { toast } from "sonner";

import EditIcon from "../icons/EditIcon";
import {
  PrivacyPolicyContent,
  PrivacyPolicyResponse,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "@/app/api/admin/privacyPolicyApi";

type PrivacyFormState = {
  title: string;
  description: string;
};

const defaultFormState: PrivacyFormState = {
  title: "",
  description: "",
};

const getPrivacyContent = (
  response?: PrivacyPolicyResponse,
): PrivacyPolicyContent | null => {
  if (!response) return null;

  if (response.privacy) {
    return response.privacy;
  }

  if (response.data) {
    if (
      typeof response.data === "object" &&
      "data" in response.data &&
      response.data.data
    ) {
      return response.data.data;
    }

    return response.data as PrivacyPolicyContent;
  }

  return null;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return fallback;
};

function PrivacySection() {
  const { data, isLoading, isError, refetch } = useGetPrivacyPolicyQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [updatePrivacyPolicy, { isLoading: isUpdating }] =
    useUpdatePrivacyPolicyMutation();

  const privacyContent = useMemo(() => getPrivacyContent(data), [data]);

  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] =
    useState<PrivacyFormState>(defaultFormState);

  useEffect(() => {
    if (!privacyContent) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormState({
      title: privacyContent.title || "",
      description: privacyContent.description || "",
    });
  }, [privacyContent]);

  const descriptionParagraphs = useMemo(() => {
    return formState.description
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [formState.description]);

  const handleChange = (field: keyof PrivacyFormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setFormState({
      title: privacyContent?.title || "",
      description: privacyContent?.description || "",
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!formState.title.trim()) {
      toast.error("Privacy policy title is required.");
      return;
    }

    if (!formState.description.trim()) {
      toast.error("Privacy policy description is required.");
      return;
    }

    const loadingToast = toast.loading("Updating privacy policy...");

    try {
      const res = await updatePrivacyPolicy({
        title: formState.title.trim(),
        description: formState.description.trim(),
      }).unwrap();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "Privacy policy updated successfully.");

      setIsEditing(false);
      await refetch();
    } catch (error) {
      toast.dismiss(loadingToast);
      console.log("PRIVACY POLICY UPDATE ERROR:", error);
      toast.error(getErrorMessage(error, "Failed to update privacy policy."));
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[16px] font-semibold mb-[18px]">
            Privacy Policy Editor
          </h2>

          {isLoading ? (
            <p className="mb-3 text-[13px] text-gray-500">
              Loading privacy policy...
            </p>
          ) : isError ? (
            <p className="mb-3 text-[13px] text-red-500">
              Failed to load privacy policy.
            </p>
          ) : null}
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-gray-500 hover:text-black transition-colors"
            title="Edit privacy policy"
          >
            <EditIcon />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 cursor-pointer"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isUpdating}
              className="flex items-center gap-2 rounded-lg bg-[#030914] px-5 py-2 text-[14px] font-medium text-white hover:bg-black disabled:opacity-60  cursor-pointer"
            >
              <Save size={16} />
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-[13px] font-medium text-gray-500">
              Title
            </label>
            <input
              type="text"
              value={formState.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Enter privacy policy title"
              className="w-full rounded-lg bg-white p-4 text-[18px] font-semibold text-[#1a2b4b] shadow-sm outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-medium text-gray-500">
              Description
            </label>
            <textarea
              value={formState.description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              placeholder="Enter privacy policy description"
              rows={14}
              className="w-full resize-none rounded-lg bg-white p-4 text-[16px] font-normal leading-7 text-[#777980] shadow-sm outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-[24px] font-bold text-[#1a2b4b] mb-4">
            {formState.title || "No privacy policy title found."}
          </h3>

          {descriptionParagraphs.length ? (
            descriptionParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-normal text-[16px] text-[#777980] mb-4 leading-7"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="font-normal text-[16px] text-[#777980]">
              No privacy policy description found.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default PrivacySection;
