import { useState } from "react";
import {
  CheckCircle,
  RefreshCw,
  Bell,
  Clock,
  Award,
  Briefcase,
  Send,
  Zap,
  Star,
} from "lucide-react";
import Link from "next/link";
import { pricingData } from "../../components/Data/PlanData";
import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("freemium");
  const router = useRouter();

  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
  };

  const goToNextPage = () => {
    // Pass the selected plan to the next page as a query parameter
    router.push({
      pathname: "/payment/plans",
      query: { plan: selectedPlan },
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <h2 className="text-lg md:text-xl font-semibold">
              ✨ Get Noticed – Apply Smarter, Not Harder
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Our AI-powered platform helps you discover and apply to the most
              relevant jobs — automatically and effortlessly, so you can land
              interviews faster.
            </p>
          </div>

          <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
            🎉 Great Job! You’re almost resume-ready 🎉
          </h2>
          <p className="text-gray-600 text-sm md:text-base text-center mt-2">
            {" "}
            Choose the perfect plan to unlock professional resume tools, cover
            letter support, and job tracking — all in one place.
          </p>
          {/* Pricing Section Title */}
          <div className="text-center my-8">
            <h2 className="text-2xl font-bold">Plans & Pricing</h2>
            <p className="text-gray-600 mt-2">
              Select a plan that fits your career goals.
            </p>

            <p className="text-gray-500 mt-1 max-w-xl mx-auto">
              Our flexible pricing is designed to support every stage of your
              job journey &mdash; whether you&apos;re starting fresh or leveling
              up.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {pricingData.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  selectedPlan === plan.id
                    ? "ring-4 ring-blue-500 ring-opacity-50 transform scale-105"
                    : ""
                } ${
                  plan.isDark
                    ? "bg-gray-900 text-white border-2 "
                    : "bg-white text-gray-900 border-2 border-gray-200"
                }`}
                onClick={() => handlePlanSelection(plan.id)}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 right-[-60px] transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                      {plan.id === "ultraelite" ? "Unlimited" : "Most Popular"}
                    </div>
                  </div>
                )}

                <div className="p-8">
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
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle
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

                  {/* Selection Indicator */}
                  <div className="text-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mx-auto ${
                        selectedPlan === plan.id
                          ? "bg-blue-600 border-blue-600"
                          : plan.isDark
                          ? "border-gray-400"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPlan === plan.id && (
                        <CheckCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features & Payment Section */}
          {/* Features & Payment Section */}
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {/* Features List */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
                All subscription features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature
                  icon={<Award className="text-green-500" />}
                  title="Expert-Crafted Professional Templates"
                  description="Access stunning resume templates built by industry experts to help you stand out instantly."
                />
                <Feature
                  icon={<CheckCircle className="text-green-500" />}
                  title="ATS-Compliant & Industry-Backed"
                  description="Every resume is designed to pass Applicant Tracking Systems and is reviewed against current hiring standards."
                />
                <Feature
                  icon={<Zap className="text-green-500" />}
                  title="AI Resume Correction & Assistance"
                  description="Let our AI fix formatting, grammar, and structure errors in real-time—no effort needed."
                />
                <Feature
                  icon={<Clock className="text-green-500" />}
                  title="AI-Assisted Resume Completion"
                  description="Finish your resume faster and smarter with intelligent content suggestions and section guidance."
                />
                <Feature
                  icon={<Briefcase className="text-green-500" />}
                  title="AI Skill Tests & Career Insights"
                  description="Evaluate your skills, identify gaps, and get tailored upskilling recommendations instantly."
                />
                <Feature
                  icon={<Bell className="text-green-500" />}
                  title="Daily Role Matches to Your Profile"
                  description="Receive curated job listings matched to your skills, experience, and career goals—right in your dashboard."
                />
                <Feature
                  icon={<Send className="text-green-500" />}
                  title="Multiply Your Applications, Effortlessly"
                  description="Apply to 10x more jobs in a fraction of the time using 1-click apply and auto-fill tools."
                />
                <Feature
                  icon={<RefreshCw className="text-green-500" />}
                  title="Save Hours Weekly with Automation"
                  description="Free up your schedule as our platform handles the repetitive job search tasks for you."
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={goToNextPage}
                  className="w-full bg-blue-800 text-white text-lg font-semibold py-3 rounded-lg"
                >
                  Next
                </button>
                <p className="text-gray-600 text-center mt-4">
                  <strong>“Got questions? </strong>
                  Contact our customer support team anytime. You can cancel your
                  subscription by email or online by reaching out to us at{" "}
                  <a
                    href="mailto:contact@novausjobs.us"
                    className="text-blue-600 hover:underline"
                  >
                    contact@novausjobs.us.
                  </a>
                  .”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Feature Component
function Feature({ icon, title, description }) {
  return (
    <div className="flex space-x-4 items-start  rounded-lg hover:bg-gray-50 transition-colors duration-200">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
