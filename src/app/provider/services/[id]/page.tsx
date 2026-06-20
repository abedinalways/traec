"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, MapPin, Tag, User, Calendar } from "lucide-react";
import LeftIcon from "@/components/icons/LeftIcon";
import { useGetProviderServiceDetailsQuery } from "@/app/provider/providerServiceApi";

export default function Page() {
  const params = useParams<{ id: string }>();
  const serviceId = params?.id;

  const { data, isLoading, isError } = useGetProviderServiceDetailsQuery(
    serviceId as string,
    {
      skip: !serviceId,
    },
  );

  const service = data?.data;

  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 font-[inter]">
        <p className="text-sm text-gray-500">Loading service details...</p>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 font-[inter]">
        <Link
          href={"/provider-dashboard"}
          className="flex items-center max-w-[168px] shape-squircle rounded-[22px] p-2 text-sm border text-gray-black-400 mb-4 text-[16px]"
        >
          <LeftIcon />
          Back To Account
        </Link>
        <p className="text-sm text-red-500">
          Failed to load service details. Please try again.
        </p>
      </div>
    );
  }

  const images = service.images?.length
    ? service.images
    : service.image_url
      ? [service.image_url]
      : [];

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
      <h1 className="text-2xl font-semibold mb-1">
        {service.title || "Untitled Service"}
      </h1>
      <p className="text-gray-500 mb-6">View service details and pricing</p>

      {/* MAIN BOX */}
      <div className="border rounded-2xl p-6 bg-white shadow-sm">
        {/* ===========================
                IMAGE GALLERY
        =========================== */}
        {images.length > 0 ? (
          <div className="mb-8">
            <div className="w-full h-80 rounded-2xl overflow-hidden border bg-gray-50 mb-3">
              <img
                src={images[activeImage]}
                alt={service.title || "Service image"}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                      activeImage === index
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-80 rounded-2xl border border-dashed flex items-center justify-center text-gray-400 text-sm mb-8">
            No images available
          </div>
        )}

        {/* ===========================
                META INFO
        =========================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {service.category && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Tag size={16} className="text-gray-400" />
              <span>{service.category}</span>
            </div>
          )}

          {service.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-gray-400" />
              <span>{service.location}</span>
            </div>
          )}

          {service.provider_name && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User size={16} className="text-gray-400" />
              <span>{service.provider_name}</span>
            </div>
          )}

          {service.created_at && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-gray-400" />
              <span>{service.created_at}</span>
            </div>
          )}
        </div>

        {/* ===========================
                DESCRIPTION
        =========================== */}
        <h2 className="text-lg font-semibold mb-2">About Service</h2>
        <p className="text-sm text-gray-600 mb-8 whitespace-pre-line">
          {service.description || "No description provided."}
        </p>

        {/* ===========================
                PRICING TIERS
        =========================== */}
        {service.pricings && service.pricings.length > 0 && (
          <>
            <h3 className="text-base font-semibold mb-3">
              Service Pricing Tiers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {service.pricings.map((tier, index) => (
                <PricingViewCard
                  key={index}
                  type={tier.type || tier.service_type || `Tier ${index + 1}`}
                  price={tier.price}
                  duration={tier.duration}
                  description={tier.description}
                  features={tier.features}
                  highlighted={(tier.type || tier.service_type) === "standard"}
                />
              ))}
            </div>
          </>
        )}

        {/* ===========================
                FAQ SECTION
        =========================== */}
        {service.faqs && service.faqs.length > 0 && (
          <>
            <h3 className="text-base font-semibold mb-3">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {service.faqs.map((faq) => (
                <FaqViewItem
                  key={faq.id ?? faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ===================================================
                SUB COMPONENTS
=================================================== */

function PricingViewCard({
  type,
  price,
  duration,
  description,
  features,
  highlighted,
}: {
  type: string;
  price?: string | number | null;
  duration?: string | null;
  description?: string | null;
  features?: string[] | null;
  highlighted?: boolean;
}) {
  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{title}</h3>

        {highlighted && (
          <span className="bg-black text-white px-2 py-1 rounded-md text-xs">
            Most Popular
          </span>
        )}
      </div>

      <p className="text-2xl font-semibold mb-1">{price ? `$${price}` : "—"}</p>

      {duration && <p className="text-xs text-gray-500 mb-3">{duration}</p>}

      {description && (
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      )}

      {features && features.length > 0 && (
        <ul className="space-y-1 mt-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="text-xs text-gray-600 flex items-start gap-2"
            >
              <span className="mt-1 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FaqViewItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <span className="text-sm font-medium text-gray-800">{question}</span>

        <span
          className={`w-6 h-6 flex-shrink-0 rounded-full border flex items-center justify-center text-gray-500 transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 -mt-1">
          <p className="text-sm text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
}
