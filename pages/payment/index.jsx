import { useState } from "react";
import { CheckCircle, DollarSign, Bell, Clock, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("freePlan");
  const { t } = useTranslation();
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

  const planTypes = ["freePlan", "singlePass", "aiProMonth"];

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl w-full mx-auto font-sans">
        {/* Intro Section */}
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ {t("paymentplans.Cast a wider net – 10x your job applications")}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t("paymentplans.Our AI-powered platform scours")}
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
          {t("paymentplans.Kudos! You're one step closer to success")} 🎉
        </h2>

        {/* Pricing Section Title */}
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold">
            {t("paymentplans.Pricing Plans")}
          </h2>
          <p className="text-gray-600 mt-2">{t("paymentplans.title")}</p>
          <p className="text-gray-500 mt-1">{t("paymentplans.subtitle")}</p>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div>
            <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
              {planTypes.map((planType) => (
                <div
                  key={planType}
                  className={`border rounded-lg p-4 flex flex-col w-full md:w-64 relative ${
                    selectedPlan === planType
                      ? "border-[#00b38d] bg-green-50"
                      : "bg-white"
                  }`}
                  onClick={() => handlePlanSelection(planType)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">
                      {t(`pricing.${planType}.title`)}
                    </h3>
                    <input
                      type="checkbox"
                      checked={selectedPlan === planType}
                      onChange={() => {}}
                      className="h-5 w-5 text-[#00b38d]"
                    />
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {Number(t(`pricing.${planType}.price`)) === 0
                      ? t("pricing.freeLabel")
                      : `€${t(`pricing.${planType}.price`)}`}

                    {t(`pricing.${planType}.billingCycle`) && (
                      <span className="text-gray-500 ml-1 text-sm">
                        /{t(`pricing.${planType}.billingCycle`)}
                      </span>
                    )}
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-2 text-sm">
                      {Array.from({ length: 10 }).map((_, index) => {
                        const feature = t(
                          `pricing.${planType}.feature${index + 1}`
                        );
                        if (
                          !feature ||
                          feature === `pricing.${planType}.feature${index + 1}`
                        ) {
                          return null;
                        }
                        return (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Payment Section */}
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {/* Features List */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
                {t("paymentplans.All subscription features")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature
                  icon={<CheckCircle className="text-green-500" />}
                  title={t("paymentplans.Automate your job search")}
                  description={t(
                    "paymentplans.We continuously scan millions of openings to find your top matches."
                  )}
                />
                <Feature
                  icon={<RefreshCw className="text-green-500" />}
                  title={t("paymentplans.10x your job applications")}
                  description={t(
                    "paymentplans.Submit 10x as many applications with less effort than one manual application."
                  )}
                />
                <Feature
                  icon={<Bell className="text-green-500" />}
                  title={t("paymentplans.Wake up to your best matches")}
                  description={t(
                    "paymentplans.Start each day with a list of roles matched to your skills and preferences."
                  )}
                />
                <Feature
                  icon={<Clock className="text-green-500" />}
                  title={t("paymentplans.Save valuable hours every week")}
                  description={t(
                    "paymentplans.Reclaim your time by letting our AI handle the grunt work of job searching."
                  )}
                />
                <Feature
                  icon={<DollarSign className="text-green-500" />}
                  title={t("paymentplans.Money-back guarantee")}
                  description={t(
                    "paymentplans.If you are unhappy for any reason during the trial, just let us know - we'll refund your money."
                  )}
                />
                <Feature
                  icon={<CheckCircle className="text-green-500" />}
                  title={t("paymentplans.24/7 customer support")}
                  description={t(
                    "paymentplans.Get assistance anytime with our award-winning customer care service."
                  )}
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={goToNextPage}
                  className="w-full bg-[#00b38d] text-white text-lg font-semibold py-3 rounded-lg"
                >
                  {t("paymentplans.Next")}
                </button>
                <p className="text-gray-600 text-center mt-4">
                  <strong>{t("paymentplans.Got questions?")}</strong>{" "}
                  {t("paymentplans.Contact our 24/7 customer support.")}
                </p>
                <p className="text-gray-600 text-center">
                  {t(
                    "paymentplans.You may cancel by email, online, or by calling us toll-free at 855-695-3235."
                  )}
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
