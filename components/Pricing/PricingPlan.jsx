"use client";
import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

import { useRouter } from "next/router";
const pricingData = {
  title: "Pricing Plans",
  subtitle: "Choose the plan that works best for you",
  intro:
    "Our pricing plans are designed to accommodate all your resume building needs.",
  bestValueLabel: "Best Value",
  freeLabel: "$0",

  plans: {
    freePlan: {
      title: "Free Plan",
      billingCycle: "Free Plan",
      subtitle: "For basic resume needs with AI support and ATS compatibility",
      price: 0,
      bestValue: false,
      buttonText: "Get Started",
      features: [
        "Access to 2 professional, ATS-friendly templates",
        "Unlimited edits — update anytime",
        "Download as PDF",
        "100 AI credits for resume and summary suggestions",
        "Cover letter included",
        "Built-in ATS-compliant formatting for better job match",
        "Best for entry-level job seekers or quick applications.",
      ],
    },
    singlePass: {
      title: "Single Pass",
      subtitle:
        "Professional templates, custom styling, and AI-powered support",
      price: 9.85,
      billingCycle: "Resume",
      bestValue: false,
      buttonText: "Get Started",
      features: [
        "Unlock 20 premium ATS-friendly resume templates",
        "Choose from 20+ color options",
        "Pick from 15+ modern fonts",
        "250 AI credits for writing support and optimization",
        "Cover letter included",
        "Download in PDF and DOC formats",
        "All formats are optimized for ATS (Applicant Tracking Systems)",
        "Perfect for job seekers who want strong first impressions.",
      ],
    },
  },
};

const PricingSection = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (planType) => {
    const token = localStorage.getItem("token");
    if (planType === "freePlan") {
      token
        ? router.push(`/dashboard`)
        : window.open(`https://novajobs.us/user/login`);
    } else {
      token
        ? router.push(`/payment`)
        : window.open(`https://novajobs.us/user/login`);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
          {Object.entries(pricingData.plans).map(([planType, plan]) => (
            <div
              key={planType}
              className="w-full max-w-md rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-gray-800"
            >
              <div className="p-6 border-b border-gray-100 text-center flex flex-col items-center justify-center">
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-3xl font-bold text-white">
                    {plan.price === 0
                      ? pricingData.freeLabel
                      : `$${plan.price}`}
                  </span>
                  {plan.billingCycle && (
                    <span className="text-white ml-1 text-sm">
                      /{plan.billingCycle}
                    </span>
                  )}
                </div>
                <p className="text-base font-normal text-white mb-2">
                  {plan.subtitle}
                </p>
              </div>

              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-white text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full mt-8 text-white border-2 border-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium py-3 px-4 rounded-lg transition duration-300"
                  onClick={() => handleClick(planType)}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
