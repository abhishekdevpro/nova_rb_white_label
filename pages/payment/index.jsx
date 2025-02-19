
import { useState } from "react";
import { CheckCircle, DollarSign, Bell, Clock, RefreshCw } from "lucide-react";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import { PLAN_DATA } from "../../components/Data/PlanData";


export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("resumeBuilder");

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl w-full mx-auto font-sans">
        {/* Intro Section */}
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ Expand your reach and multiply your job opportunities tenfold!
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Our AI-powered platform scans millions of job listings to deliver
            the most relevant openings, while our ATS-optimized resumes, crafted
            by industry experts, help you secure your dream job faster.
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
          Kudos! You are one step closer to success 🎉
        </h2>
        <div className="flex justify-between gap-2">
          <div>
            {/* Plan Selection */}
            <div className="flex flex-col md:flex-row justify-center mt-6 gap-4">
              {Object.values(PLAN_DATA).map((plan) => (
                <PlanCard
                  key={plan.id}
                  title={plan.title}
                  price={plan.price}
                  selected={selectedPlan === plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                />
              ))}
            </div>

            {/* Subscription Features */}
            <div className="border p-6 mt-6 rounded-lg bg-gray-100">
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm md:text-base">
                {PLAN_DATA[selectedPlan].features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
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
                  icon={<CheckCircle className="text-blue-900" />}
                  title="AI-Powered Job Matching"
                  description="Get real-time job recommendations tailored to your skills and experience."
                />
                <Feature
                  icon={<RefreshCw className="text-blue-900" />}
                  title="ATS-Optimized Resumes"
                  description="Professionally crafted resumes designed by experts to pass Applicant Tracking Systems (ATS)."
                />
                <Feature
                  icon={<Bell className="text-blue-900" />}
                  title="Instant Job Alerts"
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
              <div className="mt-6">
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
          </div>
        </div>
      </div>
    </>
  );
}

// Plan Card Component
function PlanCard({ title, price, selected, onClick }) {
  return (
    <button
      className={`p-4 border rounded-lg w-full md:w-36 text-center ${
        selected ? "border-blue-500 bg-blue-100" : "bg-white"
      }`}
      onClick={onClick}
    >
      <input type="checkbox" checked={selected} readOnly />
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-md font-bold">{price}</p>
    </button>
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