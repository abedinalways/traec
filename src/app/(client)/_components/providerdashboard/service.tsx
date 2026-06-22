"use client";

import Link from "next/link";
import { Star, X, Plus } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/getImageUrl";

import { useRouter } from "next/navigation";
import { ProviderService, useGetProviderServicesQuery, useUpdateProviderServiceMutation } from "@/app/api/provider/services/providerServiceApi";



/* ─────────────────────── helpers ─────────────────────── */

type ServiceSectionProps = { services?: ProviderService[] };


const getServices = (response?: unknown): ProviderService[] => {
  const res = response as {
    data?: { services?: ProviderService[] } | ProviderService[];
    services?: ProviderService[];
  };
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray((res?.data as { services?: ProviderService[] })?.services))
    return (res.data as { services: ProviderService[] }).services;
  if (Array.isArray(res?.services)) return res.services;
  return [];
};

const getServiceImage = (service: ProviderService) => {
  if (Array.isArray(service.images) && service.images.length > 0)
    return service.images[0];
  return service.image || null;
};

const getServicePrice = (service: ProviderService) => {
  const pricing = service.pricings || service.pricing || [];
  const firstPrice = pricing?.[0]?.price;
  if (firstPrice === null || firstPrice === undefined || firstPrice === "")
    return "—";
  return `$${firstPrice}`;
};

/* ─────────────────────── types ─────────────────────── */

type PricingTier = {
  service_type: "basic" | "standard" | "premium";
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
};

const buildInitialPricing = (service: ProviderService): PricingTier[] => {
  const tiers: Array<{
    service_type: "basic" | "standard" | "premium";
    title: string;
  }> = [
      { service_type: "basic", title: "Basic" },
      { service_type: "standard", title: "Standard" },
      { service_type: "premium", title: "Premium" },
    ];

  const pricing = service.pricings || service.pricing || [];

  return tiers.map(({ service_type, title }) => {
    const existing = pricing.find(
      (p) => (p.service_type || p.type) === service_type,
    );
    return {
      service_type,
      title,
      price: String(existing?.price ?? ""),
      duration: existing?.duration ?? "",
      description: existing?.description ?? "",
      features:
        existing?.features && existing.features.length > 0
          ? existing.features
          : [""],
    };
  });
};

const allowedImageTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

/* ═══════════════════════════════════════════════════════
EDIT MODAL
═══════════════════════════════════════════════════════ */

function EditServiceModal({
  service,
  onClose,
  onSuccess,
}: {
  service: ProviderService;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [updateService, { isLoading }] = useUpdateProviderServiceMutation();

  const [title, setTitle] = useState(service.title ?? "");
  const [categoryId, setCategoryId] = useState(
    String(service.category_id ?? ""),
  );
  const [location, setLocation] = useState(service.location ?? "");
  const [description, setDescription] = useState(service.description ?? "");
  const [pricing, setPricing] = useState<PricingTier[]>(
    buildInitialPricing(service),
  );


  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(() => {
    const existing = Array.isArray(service.images) ? service.images : [];
    return [
      existing[0] ?? null,
      existing[1] ?? null,
      existing[2] ?? null,
      existing[3] ?? null,
      existing[4] ?? null,
    ];
  });

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

  const handleSingleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !validateImage(file)) return;
    const url = URL.createObjectURL(file);
    setImageFiles((prev) => {
      const u = [...prev];
      u[index] = file;
      return u;
    });
    setImagePreviews((prev) => {
      const u = [...prev];
      if (u[index]?.startsWith("blob:"))
        URL.revokeObjectURL(u[index] as string);
      u[index] = url;
      return u;
    });
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => {
      const u = [...prev];
      u[index] = null;
      return u;
    });
    setImagePreviews((prev) => {
      const u = [...prev];
      if (u[index]?.startsWith("blob:"))
        URL.revokeObjectURL(u[index] as string);
      u[index] = null;
      return u;
    });
  };

  const updatePricingField = (
    i: number,
    field: "price" | "duration" | "description",
    value: string,
  ) =>
    setPricing((prev) =>
      prev.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)),
    );

  const updatePricingFeature = (ti: number, fi: number, value: string) =>
    setPricing((prev) =>
      prev.map((t, idx) => {
        if (idx !== ti) return t;
        const f = [...t.features];
        f[fi] = value;
        return { ...t, features: f };
      }),
    );

  const addPricingFeature = (ti: number) =>
    setPricing((prev) =>
      prev.map((t, idx) =>
        idx === ti ? { ...t, features: [...t.features, ""] } : t,
      ),
    );

  const removePricingFeature = (ti: number, fi: number) =>
    setPricing((prev) =>
      prev.map((t, idx) => {
        if (idx !== ti) return t;
        const filtered = t.features.filter((_, i) => i !== fi);
        return { ...t, features: filtered.length ? filtered : [""] };
      }),
    );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Service title is required.");
    if (!categoryId) return toast.error("Please select a category.");
    if (!location.trim()) return toast.error("Location is required.");
    if (!description.trim()) return toast.error("Description is required.");

    const pricingPayload = pricing.map((t) => ({
      service_type: t.service_type,
      price: t.price.trim(),
      duration: t.duration.trim(),
      description: t.description.trim(),
      features: t.features.filter((f) => f.trim()),
    }));

    if (pricingPayload.some((t) => !t.price || !t.duration))
      return toast.error(
        "Please add price and duration for every pricing tier.",
      );

    const newImages = imageFiles.filter(Boolean) as File[];

    const loading = toast.loading("Updating service...");
    try {
      const res = await updateService({
        id: service.id,
        title: title.trim(),
        category_id: categoryId,
        location: location.trim(),
        description: description.trim(),
        images: newImages,
        pricing: pricingPayload,
        faqs: (service.faqs || []).map(f => ({ question: f.question, answer: f.answer })),
      }).unwrap();

      toast.dismiss(loading);
      toast.success(res?.message || "Service updated successfully.");
      onSuccess();
    } catch (err: unknown) {
      toast.dismiss(loading);
      const msg =
        typeof err === "object" &&
          err !== null &&
          "data" in err &&
          typeof (err as { data?: { message?: string } }).data?.message ===
          "string"
          ? (err as { data: { message: string } }).data.message
          : "Update failed. Please try again.";
      toast.error(msg);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 py-10 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 font-[inter]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Edit Service</h1>
            <p className="text-gray-500 text-sm mt-1">
              Update your service details and pricing
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border rounded-2xl p-6 bg-white shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-1">Service Details</h2>
          <p className="text-xs text-gray-500 mb-6">
            Tell us about your Service
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="text-sm text-gray-600">Service Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Service Name"
                className="w-full mt-1 border rounded-xl p-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full mt-1 border rounded-xl p-3 text-sm"
              >
                <option value="">Enter Category Name</option>
                <option value="1">Photography</option>
                <option value="2">Catering</option>
                <option value="3">Event Planning</option>
                <option value="4">Decoration</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location"
                className="w-full mt-1 border rounded-xl p-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Event Duration</label>
              <select
                value={pricing[0]?.duration ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setPricing((prev) =>
                    prev.map((t) => ({ ...t, duration: t.duration || val })),
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

          <div className="mb-8">
            <label className="text-sm text-gray-600">About Service</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write here..."
              className="w-full mt-1 border rounded-xl p-3 text-sm h-28"
            />
          </div>

          {/* Pricing Tiers */}
          <h3 className="text-base font-semibold mb-3">
            Service Pricing Tiers
          </h3>
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

          {/* Image Upload */}
          <h3 className="text-sm font-medium mb-2">Upload Image</h3>
          <div className="flex gap-3 mb-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <label
                key={index}
                className="w-16 h-16 rounded-xl border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 relative"
              >
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => handleSingleImageUpload(e, index)}
                />
                {imagePreviews[index] ? (
                  <>
                    <img
                      src={imagePreviews[index] as string}
                      alt={`upload ${index + 1}`}
                      className="w-full h-full rounded-xl object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
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

          {/* Toggles */}
          <div className="flex items-center gap-10 mb-6">
            <Toggle label="Feature this service" />
            <Toggle label="Service is active" defaultOn />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-6 py-3 rounded-xl text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900 disabled:opacity-60 text-sm"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SERVICE SECTION
═══════════════════════════════════════════════════════ */

export default function ServiceSection({
  services: propServices = [],
}: ServiceSectionProps) {
  const { data, isLoading, isError, refetch } = useGetProviderServicesQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [editingService, setEditingService] = useState<ProviderService | null>(
    null,
  );

  const apiServices = getServices(data);
  const services = apiServices.length > 0 ? apiServices : propServices;
  const router = useRouter();
  return (
    <div className="pt-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-gray-800 text-lg">
          Services ({services.length})
        </h2>
        <Link href="/addservice">
          <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-medium">
            + Add Service
          </button>
        </Link>
      </div>

      {isLoading && (
        <div className="border rounded-xl p-5 bg-white text-sm text-gray-500">
          Loading services...
        </div>
      )}

      {isError && !isLoading && (
        <div className="border rounded-xl p-5 bg-white text-sm text-red-500">
          Failed to load services.
        </div>
      )}

      {!isLoading && !isError && services.length === 0 && (
        <div className="border rounded-xl p-5 bg-white text-sm text-gray-500">
          No services found.
        </div>
      )}

      {!isLoading && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="border rounded-xl p-4 bg-white shadow-sm w-full flex justify-between items-start gap-3"
            >
              <div className="flex gap-3">
                <img
                  src={getImageUrl(
                    getServiceImage(service),
                    "/images/img01.png",
                    service.updated_at || service.id,
                  )}
                  alt={service.title || "Service"}
                  className="rounded-full object-cover w-12 h-12 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "/images/img01.png";
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {service.title || "Untitled Service"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {service.description || "No description available"}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-yellow-600 mt-2">
                    <Star
                      size={14}
                      className="fill-yellow-500 text-yellow-500"
                    />
                    4.9
                    <span className="text-gray-500">(0)</span>
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => setEditingService(service)}
                      className="border px-3 py-1 rounded-md text-xs text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/provider/services/${service.id}`)
                      }
                      className="border px-3 py-1 rounded-md text-xs text-gray-700 hover:bg-gray-50"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-red-500 flex-shrink-0">
                {getServicePrice(service)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingService && (
        <EditServiceModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onSuccess={() => {
            setEditingService(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}

/* ─────────────────────── sub-components ─────────────────────── */

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
    i: number,
    f: "price" | "duration" | "description",
    v: string,
  ) => void;
  onChangeFeature: (ti: number, fi: number, v: string) => void;
  onAddFeature: (ti: number) => void;
  onRemoveFeature: (ti: number, fi: number) => void;
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
        onChange={(e) => onChangeField(tierIndex, "price", e.target.value)}
        className="w-full border rounded-xl p-3 text-sm mb-3"
      />
      <input
        type="text"
        placeholder="e.g 1 days"
        value={duration}
        onChange={(e) => onChangeField(tierIndex, "duration", e.target.value)}
        className="w-full border rounded-xl p-3 text-sm mb-3"
      />
      <textarea
        placeholder="Write Description here..."
        value={description}
        onChange={(e) =>
          onChangeField(tierIndex, "description", e.target.value)
        }
        className="w-full border rounded-xl p-3 text-sm h-20 mb-3"
      />
      <label className="text-xs text-gray-500">Features</label>
      <div className="space-y-2 mt-2">
        {features.map((item, fi) => (
          <div key={fi} className="flex gap-2">
            <input
              type="text"
              className="w-full border rounded-xl p-2 text-xs"
              placeholder="Enter feature..."
              value={item}
              onChange={(e) => onChangeFeature(tierIndex, fi, e.target.value)}
            />
            <button
              type="button"
              className="text-gray-400 hover:text-red-500"
              onClick={() => onRemoveFeature(tierIndex, fi)}
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

function Toggle({
  label,
  defaultOn = false,
}: {
  label: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`w-10 h-6 flex items-center rounded-full transition ${on ? "bg-black" : "bg-gray-300"}`}
      >
        <span
          className={`w-5 h-5 bg-white rounded-full shadow transform transition ${on ? "translate-x-4" : "translate-x-1"}`}
        />
      </button>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
