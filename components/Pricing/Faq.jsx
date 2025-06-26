"use client";

import { useState } from "react";

const faqData = {
  title: "Frequently Asked Questions",
  subtitle: "Find answers to common questions about our services and plans.",
  faqs: [
    {
      question:
        "How does the 7-day trial subscription period work? Do I get full access with the trial?",
      answer:
        "Yes! The trial gives you 100% access to all resume tools, templates, cover letters, and download formats.",
    },
    {
      question: "Do you have a money-back guarantee?",
      answer:
        "Yes. We offer a no-questions-asked 7-day money-back guarantee. If you purchase a plan and decide within 7 days that it wasn’t worth it, we’ll give you a refund.",
    },
    {
      question: "Can I change my plan?",
      answer:
        "Yes, you can upgrade, downgrade, or cancel your plan at any time from the app. If you need help, reach out to us using the link below.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We offer resume building, career counseling, and job placement assistance.",
    },
  ],
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-4">{faqData.title}</h2>
      <p className="text-gray-600 text-center mb-8">{faqData.subtitle}</p>
      <div className="space-y-6">
        {faqData.faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg bg-white">
            <div
              onClick={() => handleToggle(index)}
              className="cursor-pointer p-6 bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {faq.question}
              </h3>
            </div>
            {activeIndex === index && (
              <div className="p-6 bg-gray-50">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
