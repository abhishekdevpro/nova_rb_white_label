"use client";
import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/router";
import { pricingData } from "../Data/PlanData";

const PricingSection = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (planId) => {
    const token = localStorage.getItem("token");
    if (planId === "freemium") {
      token
        ? router.push(`/dashboard`)
        : window.open(`https://novajobs.us/user/login`);
    } else {
      token
        ? router.push(`/payment`)
        : window.open(`https://novajobs.us/user/login`);
    }
  };

  if (!isMounted) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingData.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between h-full rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                plan.isDark
                  ? "bg-gray-900 text-white border-2"
                  : "bg-white text-gray-900 border-2 border-gray-200"
              } ${
                plan.isPopular ? "ring-4 ring-blue-500 ring-opacity-50" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 right-[-60px] transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    {plan.id === "ultraelite" ? "Unlimited" : "Most Popular"}
                  </div>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan Name */}
                <div className="text-center mb-6">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      plan.isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span
                      className={`text-4xl font-bold ${
                        plan.isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ${plan.price}
                    </span>
                    <span
                      className={`ml-2 text-lg ${
                        plan.isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      /month
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check
                        className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
                          plan.isDark ? "text-green-400" : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {typeof feature === "string" ? feature : feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => handleClick(plan.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      plan.isDark
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
