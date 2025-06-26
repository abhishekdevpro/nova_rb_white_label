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
} from "lucide-react";
import Link from "next/link";
import { pricingData } from "../../components/Data/PlanData";
import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("singlePass");
  const plans = ["freePlan", "singlePass"];
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

  const getPlanFeatures = (planId) => {
    const plan = pricingData[planId];
    const features = [];

    for (let i = 1; i <= 11; i++) {
      const featureKey = `feature${i}`;
      if (plan[featureKey]) {
        features.push(plan[featureKey]);
      }
    }

    return features;
  };
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl w-full mx-auto font-sans  bg-gradient-to-b from-white to-blue-200">
        {/* Intro Section */}
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
            Our flexible pricing is designed to support every stage of your job
            journey &mdash; whether you&apos;re starting fresh or leveling up.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div>
            <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
              {plans.map((planId) => {
                const plan = pricingData[planId];
                //  {console.log(plan,"plan")}
                if (plan.title === "Free Plan") return null;
                return (
                  <div
                    key={planId}
                    className={`border rounded-lg p-4 flex flex-col w-full md:w-64 relative ${
                      selectedPlan === planId
                        ? "border-blue-500 bg-blue-50"
                        : "bg-white"
                    }`}
                    onClick={() => handlePlanSelection(planId)}
                  >
                    {/* {plan.bestValue === "true" && (
                      <div className="absolute -top-3 right-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                        {t(pricingData.bestValueLabel)}
                      </div>
                    )} */}

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{plan.title}</h3>
                      <input
                        type="checkbox"
                        checked={selectedPlan === planId}
                        onChange={() => {}}
                        className="h-5 w-5 text-blue-500"
                      />
                    </div>

                    <div className="text-2xl font-bold mb-1">
                      {plan.price === "0"
                        ? pricingData.freeLabel
                        : `$${plan.price}${
                            plan.billingCycle !== "single"
                              ? `/${plan.billingCycle === "signle" ? "" : ""}`
                              : ""
                          }`}
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      {plan.billingCycle}
                    </div>

                    <div className="flex-grow">
                      <ul className="space-y-2 text-sm">
                        {getPlanFeatures(planId).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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
    <div className="flex space-x-3 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
