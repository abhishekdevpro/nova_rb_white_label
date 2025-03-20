// import { useState } from "react";
// import { CheckCircle, DollarSign, Bell, Clock, RefreshCw } from "lucide-react";
// import Link from "next/link";
// import Navbar from "../Navbar/Navbar";
// import { PLAN_DATA } from "../../components/Data/PlanData";

// export default function Payment() {
//   const [selectedPlan, setSelectedPlan] = useState("resumeBuilder");

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 max-w-6xl w-full mx-auto font-sans">
//         {/* Intro Section */}
//         <div className="bg-blue-100 p-4 rounded-lg text-center">
//           <h2 className="text-lg md:text-xl font-semibold">
//             ✨ Expand your reach and multiply your job opportunities tenfold!
//           </h2>
//           <p className="text-gray-600 text-sm md:text-base">
//             Our AI-powered platform scans millions of job listings to deliver
//             the most relevant openings, while our ATS-optimized resumes, crafted
//             by industry experts, help you secure your dream job faster.
//           </p>
//         </div>

//         <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
//           Kudos! You are one step closer to success 🎉
//         </h2>
//         <div className="flex justify-between gap-2">
//           <div>
//             {/* Plan Selection */}
//             <div className="flex flex-col md:flex-row justify-center mt-6 gap-4">
//               {Object.values(PLAN_DATA).map((plan) => (
//                 <PlanCard
//                   key={plan.id}
//                   title={plan.title}
//                   price={plan.price}
//                   selected={selectedPlan === plan.id}
//                   onClick={() => setSelectedPlan(plan.id)}
//                 />
//               ))}
//             </div>

//             {/* Subscription Features */}
//             <div className="border p-6 mt-6 rounded-lg bg-gray-100">
//               <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm md:text-base">
//                 {PLAN_DATA[selectedPlan].features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           {/* Features & Payment Section */}
//           <div className="flex flex-col md:flex-row gap-6 mt-8">
//             {/* Features List */}
//             <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
//               <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
//                 All subscription features
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Feature
//                   icon={<CheckCircle className="text-blue-900" />}
//                   title="AI-Powered Job Matching"
//                   description="Get real-time job recommendations tailored to your skills and experience."
//                 />
//                 <Feature
//                   icon={<RefreshCw className="text-blue-900" />}
//                   title="ATS-Optimized Resumes"
//                   description="Professionally crafted resumes designed by experts to pass Applicant Tracking Systems (ATS)."
//                 />
//                 <Feature
//                   icon={<Bell className="text-blue-900" />}
//                   title="Instant Job Alerts"
//                   description="Stay ahead with real-time notifications about new job openings that match your profile."
//                 />
//                 <Feature
//                   icon={<Clock className="text-blue-900" />}
//                   title="Expert Resume Assistance"
//                   description="Get personalized resume reviews and improvements from industry professionals."
//                 />
//                 <Feature
//                   icon={<DollarSign className="text-blue-900" />}
//                   title="Career Community & Networking"
//                   description="Connect with industry peers, mentors, and recruiters to enhance your career opportunities."
//                 />
//                 <Feature
//                   icon={<CheckCircle className="text-blue-900" />}
//                   title="One-Click Applications"
//                   description="Apply faster and more efficiently with seamless, single-click job applications."
//                 />
//               </div>
//               <div className="mt-6">
//                 <Link href={`/payment/plans/?selectedPlan=${selectedPlan}`}>
//                   <button className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-700">
//                     Next
//                   </button>
//                 </Link>
//                 <p className="text-gray-600 text-center mt-4">
//                   <strong>Got questions?</strong> Contact our customer support.
//                 </p>
//                 <p className="text-gray-600 text-center">
//                   You may cancel via email at{" "}
//                   <a
//                     href="mailto:customersupport@novajobs.us"
//                     className="text-blue-500 underline"
//                   >
//                     customersupport@novajobs.us
//                   </a>
//                   .
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Plan Card Component
// function PlanCard({ title, price, selected, onClick }) {
//   return (
//     <button
//       className={`p-4 border rounded-lg w-full md:w-36 text-center ${
//         selected ? "border-blue-500 bg-blue-100" : "bg-white"
//       }`}
//       onClick={onClick}
//     >
//       <input type="checkbox" checked={selected} readOnly />
//       <p className="text-sm font-semibold">{title}</p>
//       <p className="text-md font-bold">{price}</p>
//     </button>
//   );
// }

// // Feature Component
// function Feature({ icon, title, description }) {
//   return (
//     <div className="flex space-x-3 items-start">
//       <div className="mt-1">{icon}</div>
//       <div>
//         <p className="font-semibold">{title}</p>
//         <p className="text-gray-600 text-sm">{description}</p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { CheckCircle, DollarSign, Bell, Clock, RefreshCw } from "lucide-react";

import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";

// Pricing data from your JSON
const pricingData = {
  title: "Pricing Plans",
  subtitle: "Choose the plan that works best for you",
  intro:
    "Our pricing plans are designed to accommodate all your resume building needs.",
  bestValueLabel: "Best Value",
  freeLabel: "Free",
  freePlan: {
    title: "Free Plan",
    billingCycle: "Free Plan",
    price: "0",
    bestValue: "false",
    buttonText: "Get Started",
    feature1: "Unlimited Resume Edits",
    feature2: "Download in PDF",
    feature3: "Interactive Dashboard",
    feature4: "2 Unique Resume Templates",
    feature5: "2 Color Options & 2 Fonts",
    feature6: "Resume Parsing (ATS-Friendly)",
    feature7: "French Language Support",
    feature8: "Job Search & Career Resources",
    feature9: "Cover Letter Builder",
    feature10: "Job Alerts & Tracking",
  },
  singlePass: {
    title: "Single Pass",
    price: "19",
    billingCycle: "single",
    bestValue: "false",
    buttonText: "Get Started",
    feature1: "Everything in Free +",
    feature2: "27 Unique Resume Templates",
    feature3: "5 Color Options & 6 Fonts",
    feature4: "Resume Parsing (ATS-Friendly)",
    feature5: "Free Cover Letter Builder",
    feature6: "AI Resume Score & Feedback",
    feature7: "Skill Tests & Analysis",
    feature8: "AI-Enabled Content",
    feature9: "Auto-Improvement",
    feature10: "ATS Optimization",
  },
  aiProMonth: {
    title: "AI Pro Month",
    price: "29",
    billingCycle: "month",
    bestValue: "false",
    buttonText: "Get Started",
    feature1: "Everything in Free +",
    feature2: "37 Unique Resume Templates",
    feature3: "8 Color Options & 6 Fonts",
    feature4: "Resume Parsing (ATS-Friendly)",
    feature5: "Free Cover Letter Builder",
    feature6: "AI Resume Score & Feedback",
    feature7: "Skill Tests & Analysis",
    feature8: "AI-Enabled Content",
    feature9: "Auto-Improvement",
    feature10: "ATS Optimization",
  },
  aiProYearly: {
    title: "AI Pro Yearly",
    price: "39",
    billingCycle: "year",
    bestValue: "true",
    buttonText: "Get Started",
    feature1: "Everything in Free +",
    feature2: "37 Unique Resume Templates",
    feature3: "8 Color Options & 6 Fonts",
    feature4: "Resume Parsing (ATS-Friendly)",
    feature5: "Free Cover Letter Builder",
    feature6: "AI Resume Score & Feedback",
    feature7: "Skill Tests & Analysis",
    feature8: "AI-Enabled Content",
    feature9: "Auto-Improvement",
    feature10: "ATS Optimization",
    // feature11: "Most Affordable ATS Optimization",
  },
};

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("freePlan");

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

  // Extract plans from the pricing data
  const plans = ["freePlan", "singlePass", "aiProMonth", "aiProYearly"];

  // Get features for a plan
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
      <div className="p-6 max-w-7xl w-full mx-auto font-sans">
        {/* Intro Section */}
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ Cast a wider net – 10x your job applications
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Our AI-powered platform scours millions of jobs to continuously find
            and apply to relevant job openings until you&apos;re hired.
          </p>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
          Kudos! You&apos;re one step closer to success 🎉
        </h2>

        {/* Pricing Section Title */}
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold">{pricingData.title}</h2>
          <p className="text-gray-600 mt-2">{pricingData.subtitle}</p>
          <p className="text-gray-500 mt-1">{pricingData.intro}</p>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div>
            {/* Pricing Plans */}
            <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
              {plans.map((planId) => {
                const plan = pricingData[planId];
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
                              ? `/${
                                  plan.billingCycle === "month" ? "mo" : "yr"
                                }`
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

            {/* Selected Plan Features */}
            {/* <div className="border p-6 mt-6 rounded-lg bg-gray-100">
              <h3 className="font-semibold mb-4">{t("Selected Plan Features")}</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm md:text-base">
                {getPlanFeatures(selectedPlan).map((feature, idx) => (
                  <li key={idx}>{t(feature)}</li>
                ))}
              </ul>
            </div> */}
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
                  icon={<CheckCircle className="text-blue-900" />}
                  title="AI-Powered Job Matching"
                  description="Get real-time job recommendations tailored to your skills and experience."
                />
                <Feature
                  icon={<RefreshCw className="text-blue-900" />}
                  title="ATS-Optimized Resumes"
                  description="Professionally crafted resumes designed by experts to pass Applicant Tracking Systems (ATS). "
                />
                <Feature
                  icon={<Bell className="text-blue-900" />}
                  title="Instant Job Alerts "
                  description="Stay ahead with real-time notifications about new job openings that match your profile."
                />
                <Feature
                  icon={<Clock className="text-blue-900" />}
                  title="Expert Resume Assistance"
                  description="Get personalized resume reviews and improvements from industry professionals."
                />
                <Feature
                  icon={<DollarSign className="text-blue-900" />}
                  title="Career Community & Networking"
                  description="Connect with industry peers, mentors, and recruiters to enhance your career opportunities."
                />
                <Feature
                  icon={<CheckCircle className="text-blue-900" />}
                  title="One-Click Applications"
                  description="Apply faster and more efficiently with seamless, single-click job applications."
                />
              </div>
              <div className=" mt-6">
                <Link href={`/payment/plans/?selectedPlan=${selectedPlan}`}>
                  <button className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-700">
                    Next
                  </button>
                </Link>
                <p className="text-gray-600 text-center mt-4">
                  <strong>Got questions?</strong> Contact our customer support.
                </p>
                <p className="text-gray-600 text-center">
                  You may cancel via email at{" "}
                  <a
                    href="mailto:customersupport@novajobs.us"
                    className="text-blue-500 underline"
                  >
                    customersupport@novajobs.us
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Payment Section */}
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
