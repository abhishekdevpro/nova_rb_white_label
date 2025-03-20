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
  freeLabel: "Free",

  plans: {
    freePlan: {
      title: "Free Plan",
      billingCycle: "Free Plan",
      price: 0,
      bestValue: false,
      buttonText: "Get Started",
      features: [
        "Unlimited Resume Edits",
        "Download in PDF",
        "Interactive Dashboard",
        "2 Unique Resume Templates",
        "2 Color Options & 2 Fonts",
        "Resume Parsing (ATS-Friendly)",
        "French Language Support",
        "Job Search & Career Resources",
        "Cover Letter Builder",
        "Job Alerts & Tracking",
      ],
    },
    singlePass: {
      title: "Single Pass",
      price: 19,
      billingCycle: "single",
      bestValue: false,
      buttonText: "Get Started",
      features: [
        "Everything in Free +",
        "27 Unique Resume Templates",
        "5 Color Options & 6 Fonts",
        "Resume Parsing (ATS-Friendly)",
        "Free Cover Letter Builder",
        "AI Resume Score & Feedback",
        "Skill Tests & Analysis",
        "AI-Enabled Content",
        "Auto-Improvement",
        "ATS Optimization",
      ],
    },
    aiProMonth: {
      title: "AI Pro Month",
      price: 29,
      billingCycle: "month",
      bestValue: false,
      buttonText: "Get Started",
      features: [
        "Everything in Free +",
        "37 Unique Resume Templates",
        "8 Color Options & 6 Fonts",
        "Resume Parsing (ATS-Friendly)",
        "Free Cover Letter Builder",
        "AI Resume Score & Feedback",
        "Skill Tests & Analysis",
        "AI-Enabled Content",
        "Auto-Improvement",
        "ATS Optimization",
      ],
    },
    aiProYearly: {
      title: "AI Pro Yearly",
      price: 39,
      billingCycle: "year",
      bestValue: true,
      buttonText: "Get Started",
      features: [
        "Everything in Free +",
        "37 Unique Resume Templates",
        "8 Color Options & 6 Fonts",
        "Resume Parsing (ATS-Friendly)",
        "Free Cover Letter Builder",
        "AI Resume Score & Feedback",
        "Skill Tests & Analysis",
        "AI-Enabled Content",
        "Auto-Improvement",
        "ATS Optimization",
        // "Most Affordable ATS Optimization",
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
      token ? router.push("/dashboard") : router.push("/login");
    } else {
      token ? router.push(`/payment`) : router.push("/login");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl container mx-auto ">
        {/* <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 text-white">
            {pricingData.title}
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            {pricingData.intro}
          </p>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(pricingData.plans).map(([planType, plan]) => (
            <div
              key={planType}
              className=" rounded-xl shadow-md hover:shadow-lg bg-gray-800  dark:border-gray-600 transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.title}
                </h3>

                <div className="flex items-baseline mb-1">
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
                  className="w-full mt-8 text-white bg-primary-600 border hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 text-white font-medium py-3 px-4 rounded-lg transition duration-300 dark:text-white  dark:focus:ring-primary-900"
                  // className="text-white bg-primary-600 border hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
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
