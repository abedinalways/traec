"use client";

import { FormEvent, useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LeftIcon from "@/components/icons/LeftIcon";
import { useCreateProviderServiceMutation } from "@/app/api/provider/services/providerServiceApi";


type PricingTier = {
  service_type: "basic" | "standard" | "premium";
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const initialPricing: PricingTier[] = [
  {
    service_type: "basic",
    title: "Basic",
    price: "",
    duration: "",
    description: "",
    features: [""],
  },
  {
    service_type: "standard",
    title: "Standard",
    price: "",
    duration: "",
    description: "",
    features: [""],
  },
  {
    service_type: "premium",
    title: "Premium",
    price: "",
    duration: "",
    description: "",
    features: [""],
  },
];

const initialFaqs: FaqItem[] = [{ question: "", answer: "" }];

const allowedImageTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export default function Page() {
  const router = useRouter();

  const [createService, { isLoading }] = useCreateProviderServiceMutation();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [pricing, setPricing] = useState<PricingTier[]>(initialPricing);

  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);

  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const validateImage = (file: File) => {
    if (!allowedImageTypes.includes(file.type)) {
      toast.error("Only JPG, PNG or WEBP images are allowed.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return false;
    }

    return true;
  };

  const setImageAtIndex = (file: File, index: number) => {
    if (!validateImage(file)) return;

    const previewUrl = URL.createObjectURL(file);

    setImageFiles((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    setImagePreviews((prev) => {
      const updated = [...prev];

      if (updated[index]?.startsWith("blob:")) {
        URL.revokeObjectURL(updated[index] as string);
      }

      updated[index] = previewUrl;
      return updated;
    });
  };

  const handleSingleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageAtIndex(file, index);
    event.target.value = "";
  };

  const handleMultipleImageUpload = (files: FileList | null) => {
    if (!files?.length) return;

    const validFiles = Array.from(files).filter(validateImage);

    if (!validFiles.length) return;

    setImageFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      const updatedPreviews = [...imagePreviews];

      validFiles.forEach((file) => {
        const emptyIndex = updatedFiles.findIndex((item) => !item);

        if (emptyIndex === -1) return;

        const previewUrl = URL.createObjectURL(file);

        updatedFiles[emptyIndex] = file;

        if (updatedPreviews[emptyIndex]?.startsWith("blob:")) {
          URL.revokeObjectURL(updatedPreviews[emptyIndex] as string);
        }

        updatedPreviews[emptyIndex] = previewUrl;
      });

      setImagePreviews(updatedPreviews);
      return updatedFiles;
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });

    setImagePreviews((prev) => {
      const updated = [...prev];

      if (updated[index]?.startsWith("blob:")) {
        URL.revokeObjectURL(updated[index] as string);
      }

      updated[index] = null;
      return updated;
    });
  };

  const updatePricingField = (
    tierIndex: number,
    field: "price" | "duration" | "description",
    value: string,
  ) => {
    setPricing((prev) =>
      prev.map((tier, index) =>
        index === tierIndex ? { ...tier, [field]: value } : tier,
      ),
    );
  };

  const updatePricingFeature = (
    tierIndex: number,
    featureIndex: number,
    value: string,
  ) => {
    setPricing((prev) =>
      prev.map((tier, index) => {
        if (index !== tierIndex) return tier;

        const updatedFeatures = [...tier.features];
        updatedFeatures[featureIndex] = value;

        return {
          ...tier,
          features: updatedFeatures,
        };
      }),
    );
  };

  const addPricingFeature = (tierIndex: number) => {
    setPricing((prev) =>
      prev.map((tier, index) =>
        index === tierIndex
          ? {
            ...tier,
            features: [...tier.features, ""],
          }
          : tier,
      ),
    );
  };

  const removePricingFeature = (tierIndex: number, featureIndex: number) => {
    setPricing((prev) =>
      prev.map((tier, index) => {
        if (index !== tierIndex) return tier;

        const filteredFeatures = tier.features.filter(
          (_, index) => index !== featureIndex,
        );

        return {
          ...tier,
          features: filteredFeatures.length ? filteredFeatures : [""],
        };
      }),
    );
  };

  /* ─────────────────────── FAQ handlers ─────────────────────── */

  const updateFaqField = (
    faqIndex: number,
    field: "question" | "answer",
    value: string,
  ) => {
    setFaqs((prev) =>
      prev.map((faq, index) =>
        index === faqIndex ? { ...faq, [field]: value } : faq,
      ),
    );
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const removeFaq = (faqIndex: number) => {
    setFaqs((prev) => {
      const filtered = prev.filter((_, index) => index !== faqIndex);
      return filtered.length ? filtered : [{ question: "", answer: "" }];
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Service title is required.");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required.");
      return;
    }

    if (!description.trim()) {
      toast.error("Service description is required.");
      return;
    }

    const images = imageFiles.filter((file): file is File => Boolean(file));

    if (!images.length) {
      toast.error("Please upload at least one image.");
      return;
    }

    const pricingPayload = pricing.map((tier) => ({
      service_type: tier.service_type,
      price: tier.price.trim(),
      duration: tier.duration.trim(),
      description: tier.description.trim(),
      features: tier.features.filter((feature) => feature.trim()),
    }));

    const hasInvalidPricing = pricingPayload.some(
      (tier) => !tier.price || !tier.duration,
    );

    if (hasInvalidPricing) {
      toast.error("Please add price and duration for every pricing tier.");
      return;
    }

    const faqsPayload = faqs
      .map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      }))
      .filter((faq) => faq.question && faq.answer);

    const loadingToast = toast.loading("Creating service...");

    try {
      const response = await createService({
        title: title.trim(),
        category_id: categoryId,
        location: location.trim(),
        description: description.trim(),
        images,
        pricing: pricingPayload,
        faqs: faqsPayload,
      }).unwrap();

      toast.dismiss(loadingToast);
      toast.success(response?.message || "Service created successfully.");

      router.push("/provider-dashboard");
      router.refresh();
    } catch (error) {
      toast.dismiss(loadingToast);

      const errorMessage =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message ===
          "string"
          ? (error as { data: { message: string } }).data.message
          : "Service create failed. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-[inter]">
      {/* Back Button */}
      <Link
        href={"/provider-dashboard"}
        className="flex items-center max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border text-gray-black-400 mb-4 text-[16px]"
      >
        <LeftIcon />
        Back To Account
      </Link>

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold mb-3">Add Service</h1>
      <p className="text-gray-500 mb-6">
        Update your service details and pricing
      </p>

      {/* MAIN FORM BOX */}
      <form
        onSubmit={handleSubmit}
        className="border rounded-2xl p-6 bg-white shadow-sm"
      >
        {/* SECTION TITLE */}
        <h2 className="text-lg font-semibold mb-5">Service Details</h2>
        <p className="text-xs text-gray-500 mb-6">Tell us about your Service</p>

        {/* SERVICE INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Service Title */}
          <div>
            <label className="text-sm text-gray-600">Service Title</label>
            <input
              type="text"
              placeholder="Enter Service Name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full mt-1 border rounded-xl p-3 text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="w-full mt-1 border rounded-xl p-3 text-sm"
            >
              <option value="">Enter Category Name</option>
              <option value="1">Photography</option>
              <option value="2">Catering</option>
              <option value="3">Event Planning</option>
              <option value="4">Decoration</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full mt-1 border rounded-xl p-3 text-sm"
            />
          </div>

          {/* Event Duration */}
          <div>
            <label className="text-sm text-gray-600">Event Duration</label>
            <select
              value={pricing[0].duration}
              onChange={(event) => {
                const value = event.target.value;

                setPricing((prev) =>
                  prev.map((tier) => ({
                    ...tier,
                    duration: tier.duration || value,
                  })),
                );
              }}
              className="w-full mt-1 border rounded-xl p-3 text-sm"
            >
              <option value="">e.g 8 Hr</option>
              <option value="1 days">1 days</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
              <option value="8 Hr">8 Hr</option>
            </select>
          </div>
        </div>

        {/* About Service */}
        <div className="mb-8">
          <label className="text-sm text-gray-600">About Service</label>
          <textarea
            placeholder="Write here..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full mt-1 border rounded-xl p-3 text-sm h-28"
          />
        </div>

        {/* ===========================  
                PRICING TIERS  
        =========================== */}
        <h3 className="text-base font-semibold mb-3">Service Pricing Tiers</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {pricing.map((tier, index) => (
            <PricingCard
              key={tier.service_type}
              tierIndex={index}
              title={tier.title}
              tag={tier.service_type === "standard" ? "Most Popular" : ""}
              price={tier.price}
              duration={tier.duration}
              description={tier.description}
              features={tier.features}
              onChangeField={updatePricingField}
              onChangeFeature={updatePricingFeature}
              onAddFeature={addPricingFeature}
              onRemoveFeature={removePricingFeature}
            />
          ))}
        </div>

        {/* ===========================  
                MULTIPLE UPLOAD BOXES  
        =========================== */}
        <h3 className="text-sm font-medium mb-2">Upload Image</h3>

        <div className="flex gap-3 mb-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <label
              key={index}
              className="w-16 h-16 rounded-xl border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 relative"
            >
              {/* Hidden Input */}
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(event) => handleSingleImageUpload(event, index)}
              />

              {/* Show Preview or Plus Icon */}
              {imagePreviews[index] ? (
                <>
                  <img
                    src={imagePreviews[index] as string}
                    alt={`Service upload ${index + 1}`}
                    className="w-full h-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      removeImage(index);
                    }}
                    className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow"
                  >
                    <X size={12} />
                  </button>
                </>
              ) : (
                <Plus size={20} className="text-gray-400" />
              )}
            </label>
          ))}
        </div>

        {/* ===========================  
           UPDATED BIG DRAG & DROP BOX  
        =========================== */}
        <div
          className="border border-dashed rounded-xl py-10 text-center text-gray-600 text-sm mb-8 cursor-pointer"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleMultipleImageUpload(event.dataTransfer.files);
          }}
          onClick={() => document.getElementById("dragDropInput")?.click()}
        >
          <div className="flex justify-center mb-2">
            <Plus size={30} className="text-gray-400" />
          </div>

          <p className="text-gray-600 font-medium">Drag & drop Image here</p>

          <p className="text-xs text-gray-400 mt-1">
            Upload up to 5 photos (JPG, PNG, WEBP, max 5MB each)
          </p>

          <input
            type="file"
            id="dragDropInput"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            onChange={(event) => {
              handleMultipleImageUpload(event.target.files);
              event.target.value = "";
            }}
          />
        </div>

        {/* ===========================  
                FAQ SECTION  
        =========================== */}
        <h3 className="text-base font-semibold mb-3">
          Frequently Asked Questions
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Add common questions your customers might have about this service
        </p>

        <div className="space-y-3 mb-8">
          {faqs.map((faq, index) => (
            <FaqEditorItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              onChangeField={updateFaqField}
              onRemove={removeFaq}
            />
          ))}

          <button
            type="button"
            onClick={addFaq}
            className="flex items-center gap-1 border rounded-md px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
          >
            <Plus size={14} />
            Add FAQ
          </button>
        </div>

        {/* TOGGLES */}
        <div className="flex items-center gap-10 mb-6">
          <Toggle label="Feature this service" />
          <Toggle label="Service is active" />
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900 disabled:opacity-60"
          >
            {isLoading ? "Creating..." : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ===================================================
                SUB COMPONENTS
=================================================== */

function PricingCard({
  title,
  tag,
  tierIndex,
  price,
  duration,
  description,
  features,
  onChangeField,
  onChangeFeature,
  onAddFeature,
  onRemoveFeature,
}: {
  title: string;
  tag?: string;
  tierIndex: number;
  price: string;
  duration: string;
  description: string;
  features: string[];
  onChangeField: (
    tierIndex: number,
    field: "price" | "duration" | "description",
    value: string,
  ) => void;
  onChangeFeature: (
    tierIndex: number,
    featureIndex: number,
    value: string,
  ) => void;
  onAddFeature: (tierIndex: number) => void;
  onRemoveFeature: (tierIndex: number, featureIndex: number) => void;
}) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{title}</h3>

        {tag && (
          <span className="bg-black text-white px-2 py-1 rounded-md text-xs">
            {tag}
          </span>
        )}
      </div>

      <input
        type="text"
        placeholder="e.g $250"
        value={price}
        onChange={(event) =>
          onChangeField(tierIndex, "price", event.target.value)
        }
        className="w-full border rounded-xl p-3 text-sm mb-3"
      />

      <input
        type="text"
        placeholder="e.g 1 days"
        value={duration}
        onChange={(event) =>
          onChangeField(tierIndex, "duration", event.target.value)
        }
        className="w-full border rounded-xl p-3 text-sm mb-3"
      />

      <textarea
        placeholder="Write Description here..."
        value={description}
        onChange={(event) =>
          onChangeField(tierIndex, "description", event.target.value)
        }
        className="w-full border rounded-xl p-3 text-sm h-20 mb-3"
      />

      <label className="text-xs text-gray-500">Features</label>

      <div className="space-y-2 mt-2">
        {features.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              className="w-full border rounded-xl p-2 text-xs"
              placeholder="Enter feature..."
              value={item}
              onChange={(event) =>
                onChangeFeature(tierIndex, index, event.target.value)
              }
            />

            <button
              type="button"
              className="text-gray-400 hover:text-red-500"
              onClick={() => onRemoveFeature(tierIndex, index)}
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="border rounded-md px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
          onClick={() => onAddFeature(tierIndex)}
        >
          + Add Features
        </button>
      </div>
    </div>
  );
}

function FaqEditorItem({
  index,
  question,
  answer,
  onChangeField,
  onRemove,
}: {
  index: number;
  question: string;
  answer: string;
  onChangeField: (
    faqIndex: number,
    field: "question" | "answer",
    value: string,
  ) => void;
  onRemove: (faqIndex: number) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex items-start gap-3 mb-3">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="mt-2 w-6 h-6 flex-shrink-0 rounded-full border flex items-center justify-center text-gray-500 hover:bg-gray-50"
          aria-label={open ? "Collapse answer" : "Expand answer"}
        >
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <input
          type="text"
          placeholder="Enter question..."
          value={question}
          onChange={(event) =>
            onChangeField(index, "question", event.target.value)
          }
          className="w-full border rounded-xl p-3 text-sm"
        />

        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-gray-400 hover:text-red-500 mt-2 flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {open && (
        <textarea
          placeholder="Enter answer..."
          value={answer}
          onChange={(event) =>
            onChangeField(index, "answer", event.target.value)
          }
          className="w-full border rounded-xl p-3 text-sm h-20 ml-9"
          style={{ width: "calc(100% - 2.25rem)" }}
        />
      )}
    </div>
  );
}

function Toggle({ label }: { label: string }) {
  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`w-10 h-6 flex items-center rounded-full transition ${on ? "bg-black" : "bg-gray-300"
          }`}
      >
        <span
          className={`w-5 h-5 bg-white rounded-full shadow transform transition ${on ? "translate-x-4" : "translate-x-1"
            }`}
        />
      </button>

      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
