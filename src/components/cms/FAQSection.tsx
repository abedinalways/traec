import React from "react";
import { PencilIcon } from "lucide-react"; // Or your local icon path
import EditIcon from "../icons/EditIcon";

function FAQSection() {
  const faqs = [
    {
      question: "Do I need an account to use the platform?",
      answer:
        "Yes. To book a service or list your business, you need to create a free account. Buyers and service providers have separate profiles to keep things simple.",
    },
    {
      question: "How do payments work?",
      answer:
        "Yes. To book a service or list your business, you need to create a free account. Buyers and service providers have separate profiles to keep things simple.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes. To book a service or list your business, you need to create a free account. Buyers and service providers have separate profiles to keep things simple.",
    },
    {
      question: "Is this platform available worldwide?",
      answer:
        "Yes. To book a service or list your business, you need to create a free account. Buyers and service providers have separate profiles to keep things simple.",
    },
    {
      question: "Is this platform available worldwide?",
      answer:
        "Yes. To book a service or list your business, you need to create a free account. Buyers and service providers have separate profiles to keep things simple.",
    },
    {
      question: "Is this platform available worldwide?",
      answer:
        "Yes. To book a service or list your business, you need to create a free account. Buyers and service providers have separate profiles to keep things simple.",
    },
  ];

  return (
    <div className="p-8 min-h-screen font-[inter]">
      {/* Header Area */}
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
        </div>
        <button className="text-gray-500 hover:text-black transition-colors mt-1 cursor-pointer">
          <EditIcon/>
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-6 max-w-5xl">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-[14px] font-medium text-gray-500 ml-1">
              {faq.question}
            </label>
            <div className="w-full bg-white p-4 rounded-[8px] shadow-sm border-none">
              <p className="text-[14px] text-[#4a4a4a] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
