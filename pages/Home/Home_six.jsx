import React from "react";
import { useTranslation } from "react-i18next";
import PricingSection from "../../components/Pricing/PricingPlan";
import { Link } from "react-router-dom";
import { useRouter } from "next/router";

const Home_six = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="py-16 bg-gray-50">
      <div className="mx-auto max-w-screen-lg text-center mb-12">
        <h2 className="mb-6 text-4xl font-extrabold text-[#1C2957] tracking-tight border p-4 rounded-2xl border-gray-200">
          {t("choose_plan")}
        </h2>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      <div className="text-center">
        <button
          className="inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition duration-300 "
          onClick={() => router.push("/pricing")}
        >
          View all plans
        </button>
      </div>

      {/* Button for routing to Pricing page */}
      {/* <div className="text-center mt-8">
        <Link 
          to="/pricing" 
          className="inline-block px-8 py-3 text-lg font-medium text-white bg-[#1C2957] rounded-xl hover:bg-[#019b73] transition duration-300"
        >
          {t("view_all_plans")}
        </Link>
      </div> */}
    </div>
  );
};

export default Home_six;
