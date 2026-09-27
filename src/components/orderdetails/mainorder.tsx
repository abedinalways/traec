"use client";

import React from "react";
import { MappedQuestionnaireItem } from "@/app/(client)/order-details/[id]/page";

type MainOrderProps = {
  id?: string;
  placedBy?: string | null;
  eventName?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  eventType?: string | null;
  eventDetailName?: string | null;
  duration?: string | null;
  guests?: number | string | null;
  serviceDescription?: string | null;
  questionnaire?: MappedQuestionnaireItem[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatKey = (key: string): string =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

// ─── Sub-components ───────────────────────────────────────────────────────────

const Row = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => {
  if (!value) return null;
  return (
    <p>
      <span className="font-semibold">{label} : </span>
      {value}
    </p>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border rounded-xl p-5 bg-white shadow-sm mb-8">
    <h3 className="font-semibold text-gray-900 text-lg mb-4">{title}</h3>
    <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
      {children}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MainOrder({
  id,
  placedBy,
  eventName,
  fullName,
  email,
  phone,
  location,
  eventType,
  eventDetailName,
  duration,
  guests,
  serviceDescription,
  questionnaire,
}: MainOrderProps) {
  const displayEventName = eventName || `Order #${id}`;
  const displayPlacedBy = placedBy || "Unknown";

  const hasContact = fullName || email || phone || location;
  const hasEvent =
    eventType || eventDetailName || duration || guests || serviceDescription;
  const hasQA = questionnaire && questionnaire.length > 0;

  return (
    <div className="w-full bg-white py-2">
      {/* ── Order Started ── */}
      <div className="border rounded-xl p-5 bg-white shadow-sm mb-8">
        <h2 className="font-semibold text-lg text-gray-900 mb-1">
          Order Started
        </h2>
        <p className="text-gray-600 text-sm">
          Order placed by{" "}
          <span className="font-semibold">{displayPlacedBy}</span> for{" "}
          <span className="font-semibold">{displayEventName}.</span>
        </p>
      </div>

      {/* ── Location & Contact ── */}
      {hasContact && (
        <Section title="Location & Contact">
          <Row label="Full Name" value={fullName} />
          <Row label="Email Address" value={email} />
          <Row label="Phone Number" value={phone} />
          <Row label="Location" value={location} />
        </Section>
      )}

      {/* ── Event Details ── */}
      {hasEvent && (
        <Section title="Event Details">
          <Row label="Event Type" value={eventType} />
          <Row label="Event Name" value={eventDetailName} />
          <Row label="Duration" value={duration} />
          <Row label="Guests" value={guests} />
          {serviceDescription && (
            <p>
              <span className="font-semibold block mb-1">Description :</span>
              {serviceDescription}
            </p>
          )}
        </Section>
      )}

      {/* ── Questionnaire ── */}
      {hasQA && (
        <div className="border rounded-xl p-5 bg-white shadow-sm mb-8">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">
            Questionnaire
          </h3>
          <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
            {questionnaire!.map((item, index) => (
              <div key={item.key}>
                <p className="font-semibold">
                  {index + 1}. {formatKey(item.key)}
                </p>
                <p className="mt-1 text-gray-600">{item.question}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
