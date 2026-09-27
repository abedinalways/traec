"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import EditIcon from "../icons/EditIcon";
import {
  FAQItem,
  FAQListResponse,
  useDeleteFaqMutation,
  useGetFaqsQuery,
  useSaveFaqMutation,
} from "@/app/api/admin/faqApi";

type FAQFormItem = {
  id?: number | string;
  question: string;
  answer: string;
};

const emptyFaq: FAQFormItem = {
  question: "",
  answer: "",
};

const getFaqList = (response?: FAQListResponse): FAQItem[] => {
  if (!response) return [];

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (
    response.data &&
    typeof response.data === "object" &&
    "data" in response.data &&
    Array.isArray(response.data.data)
  ) {
    return response.data.data;
  }

  if (Array.isArray(response.faqs)) {
    return response.faqs;
  }

  return [];
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

function FAQSection() {
  const { data, isLoading, isError, refetch } = useGetFaqsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [saveFaq, { isLoading: isSaving }] = useSaveFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const apiFaqs = useMemo(() => getFaqList(data), [data]);

  const [faqs, setFaqs] = useState<FAQFormItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFaqs(
      apiFaqs.map((faq) => ({
        id: faq.id,
        question: faq.question || "",
        answer: faq.answer || "",
      })),
    );
  }, [apiFaqs]);

  const handleChange = (
    index: number,
    field: keyof FAQFormItem,
    value: string,
  ) => {
    setFaqs((prev) =>
      prev.map((faq, faqIndex) =>
        faqIndex === index
          ? {
              ...faq,
              [field]: value,
            }
          : faq,
      ),
    );
  };

  const handleAddFaq = () => {
    setIsEditing(true);
    setFaqs((prev) => [...prev, { ...emptyFaq }]);
  };

  const handleSaveFaq = async (faq: FAQFormItem) => {
    if (!faq.question.trim()) {
      toast.error("Question is required.");
      return;
    }

    if (!faq.answer.trim()) {
      toast.error("Answer is required.");
      return;
    }

    const loadingToast = toast.loading("Saving FAQ...");

    try {
      const res = await saveFaq({
        id: faq.id || null,
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      }).unwrap();

      toast.dismiss(loadingToast);
      toast.success(res?.message || "FAQ saved successfully.");

      await refetch();
    } catch (error) {
      toast.dismiss(loadingToast);
      console.log("FAQ SAVE ERROR:", error);
      toast.error(getErrorMessage(error, "Failed to save FAQ."));
    }
  };

  const handleDeleteFaq = async (faq: FAQFormItem, index: number) => {
    if (!faq.id) {
      setFaqs((prev) => prev.filter((_, faqIndex) => faqIndex !== index));
      toast.success("FAQ removed.");
      return;
    }

    const confirmToastId = toast.warning("Delete this FAQ?", {
      description:
        "This action cannot be undone. The selected FAQ will be permanently removed.",
      duration: 8000,
      action: {
        label: "Delete",
        onClick: async () => {
          toast.dismiss(confirmToastId);

          const loadingToast = toast.loading("Deleting FAQ...");

          try {
            const res = await deleteFaq(faq.id!).unwrap();

            toast.dismiss(loadingToast);
            toast.success(res?.message || "FAQ deleted successfully.");

            await refetch();
          } catch (error) {
            toast.dismiss(loadingToast);
            console.log("FAQ DELETE ERROR:", error);

            toast.error(getErrorMessage(error, "Failed to delete FAQ."));
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss(confirmToastId);
        },
      },
    });
  };

  return (
    <div className="p-8 min-h-screen font-[inter]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[16px] font-bold text-[#000] mb-4">
            FAQ & Help Center
          </h3>

          <h2 className="text-[24px] font-extrabold text-[#000000] mb-1">
            Frequently Asked Questions
          </h2>

          <p className="text-[16px] text-[#777980]">
            Hear from satisfied customers and successful service providers.
          </p>

          {isLoading ? (
            <p className="mt-2 text-[13px] text-gray-500">Loading FAQs...</p>
          ) : isError ? (
            <p className="mt-2 text-[13px] text-red-500">
              Failed to load FAQs.
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddFaq}
            className="flex items-center gap-2 cursor-pointer rounded-lg bg-white px-4 py-2 text-[14px] font-medium text-[#1D2433] shadow-sm hover:bg-gray-50"
          >
            <Plus size={16} />
            Add FAQ
          </button>

          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="text-gray-500 hover:text-black transition-colors mt-1 cursor-pointer"
          >
            <EditIcon />
          </button>
        </div>
      </div>

      <div className="space-y-6 max-w-5xl">
        {!isLoading && !faqs.length ? (
          <div className="w-full bg-white p-4 rounded-[8px] shadow-sm border-none">
            <p className="text-[14px] text-[#777980]">
              No FAQ found. Click Add FAQ to create one.
            </p>
          </div>
        ) : null}

        {faqs.map((faq, index) => (
          <div key={faq.id || `new-${index}`} className="space-y-2">
            {isEditing ? (
              <input
                type="text"
                value={faq.question}
                onChange={(event) =>
                  handleChange(index, "question", event.target.value)
                }
                placeholder="Enter FAQ question"
                className="block w-full rounded-[8px] bg-white px-4 py-3 text-[14px] font-medium text-gray-700 shadow-sm outline-none focus:ring-1 focus:ring-blue-400"
              />
            ) : (
              <label className="block text-[14px] font-medium text-gray-500 ml-1">
                {faq.question || "Untitled question"}
              </label>
            )}

            <div className="w-full bg-white p-4 rounded-[8px] shadow-sm border-none">
              {isEditing ? (
                <textarea
                  value={faq.answer}
                  onChange={(event) =>
                    handleChange(index, "answer", event.target.value)
                  }
                  placeholder="Enter FAQ answer"
                  rows={4}
                  className="w-full resize-none text-[14px] text-[#4a4a4a] leading-relaxed outline-none"
                />
              ) : (
                <p className="text-[14px] text-[#4a4a4a] leading-relaxed">
                  {faq.answer || "No answer added yet."}
                </p>
              )}

              {isEditing ? (
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => handleSaveFaq(faq)}
                    className="flex items-center gap-2 rounded-lg bg-[#030914] px-4 py-2 text-[13px] font-medium text-white hover:bg-black disabled:opacity-60 cursor-pointer"
                  >
                    <Save size={15} />
                    {isSaving ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => handleDeleteFaq(faq, index)}
                    className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-200 disabled:opacity-60 cursor-pointer"
                  >
                    <Trash2 size={15} />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
