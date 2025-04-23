// import { Lock, CheckCircle } from "lucide-react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { useTranslation } from "next-i18next";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { BASE_URL } from "../../components/Constant/constant";
// import { toast } from "react-toastify";
// import Link from "next/link";
// // Pricing data from your JSON
// const pricingData = {
//   title: "Pricing Plans",
//   subtitle: "Choose the plan that works best for you",
//   intro:
//     "Our pricing plans are designed to accommodate all your resume building needs.",
//   bestValueLabel: "Best Value",
//   freeLabel: "Free",
//   freePlan: {
//     title: "Free Plan",
//     billingCycle: "Free Plan",
//     price: "0",
//     bestValue: "false",
//     buttonText: "Get Started",
//     feature1: "Unlimited Resume Edits",
//     feature2: "Download in PDF",
//     feature3: "Interactive Dashboard",
//     feature4: "2 Unique Resume Templates",
//     feature5: "2 Color Options & 2 Fonts",
//     feature6: "Resume Parsing (ATS-Friendly)",
//     feature7: "French Language Support",
//     feature8: "Job Search & Career Resources",
//     feature9: "Cover Letter Builder",
//     feature10: "Job Alerts & Tracking",
//   },
//   singlePass: {
//     title: "Single Pass",
//     price: "9.99",
//     billingCycle: "single",
//     bestValue: "false",
//     buttonText: "Get Started",
//     feature1: "Everything in Free +",
//     feature2: "27 Unique Resume Templates",
//     feature3: "5 Color Options & 6 Fonts",
//     feature4: "Resume Parsing (ATS-Friendly)",
//     feature5: "Free Cover Letter Builder",
//     feature6: "AI Resume Score & Feedback",
//     feature7: "Skill Tests & Analysis",
//     feature8: "AI-Enabled Content",
//     feature9: "Auto-Improvement",
//     feature10: "ATS Optimization",
//   },
//   aiProMonth: {
//     title: "AI Pro Month",
//     price: "19.99",
//     billingCycle: "month",
//     bestValue: "false",
//     buttonText: "Get Started",
//     feature1: "Everything in Free +",
//     feature2: "37 Unique Resume Templates",
//     feature3: "8 Color Options & 6 Fonts",
//     feature4: "Resume Parsing (ATS-Friendly)",
//     feature5: "Free Cover Letter Builder",
//     feature6: "AI Resume Score & Feedback",
//     feature7: "Skill Tests & Analysis",
//     feature8: "AI-Enabled Content",
//     feature9: "Auto-Improvement",
//     feature10: "ATS Optimization",
//   },
// };

// export default function PaymentPage() {
//   const router = useRouter();
//   const { t } = useTranslation();
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [planDetails, setPlanDetails] = useState(null);
//   const [showPlanPurchase, setShowPlanPurchase] = useState(false);
//   // Get features for a plan
//   const getPlanFeatures = (planId) => {
//     const plan = pricingData[planId];
//     const features = [];

//     if (!plan) return [];

//     for (let i = 1; i <= 11; i++) {
//       const featureKey = `feature${i}`;
//       if (plan[featureKey]) {
//         features.push(plan[featureKey]);
//       }
//     }

//     return features;
//   };

//   // Format price based on billing cycle
//   const formatPrice = (plan) => {
//     if (!plan) return "";

//     if (plan.price === "0") {
//       return t(pricingData.freeLabel);
//     }

//     if (plan.billingCycle === "single") {
//       return `€${plan.price}`;
//     } else if (plan.billingCycle === "month") {
//       return `€${plan.price}/${t("plans.mo")}`;
//     }

//     return `€${plan.price}`;
//   };

//   // Get renewal period text
//   const getRenewalText = (plan) => {
//     if (!plan) return "";

//     if (plan.billingCycle === "single") {
//       return t("plans.one-time payment");
//     } else if (plan.billingCycle === "month") {
//       return t("plans.every month");
//     }

//     return "";
//   };

//   useEffect(() => {
//     // Get plan from URL query
//     if (router.query.plan) {
//       const planId = router.query.plan;
//       setSelectedPlan(planId);
//       setPlanDetails(pricingData[planId]);
//     } else {
//       // Default to aiProYearly if no plan specified
//       // setSelectedPlan("aiProYearly");
//       // setPlanDetails(pricingData.aiProYearly);
//     }
//   }, [router.query]);

//   const handleCheckout = async () => {
//     if (!selectedPlan) {
//       toast.success("Please select a plan before proceeding.");
//       return;
//     }
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Authentication required. Please log in.");
//       router.push("/login2"); // Redirect to login page if token is missing
//       return;
//     }
//     // Map selectedPlan to the correct plan_id
//     const planMapping = {
//       // freePlan: 1,
//       singlePass: 2,
//       aiProMonth: 3,
//       // aiProYearly: 4,
//     };

//     const planId = planMapping[selectedPlan];

//     try {
//       // Show loading (optional)
//       // setIsLoading(true);

//       const response = await axios.post(
//         `${BASE_URL}/api/user/payment/checkout`,
//         {
//           plan_id: planId,
//         },
//         {
//           headers: {
//             Authorization: token, // Add authentication header
//           },
//         }
//       );

//       if (response.status === 200) {
//         toast.success("Payment successful! Redirecting...");
//         // router.push("/success"); // Redirect after success
//         window.location.href = response.data.url;
//       } else {
//         throw new Error("Unexpected response from the server.");
//       }
//     } catch (error) {
//       console.error("Payment Error:", error);
//       toast.error(error.response?.data?.message || "Error processing payment.");
//     }
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//         <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 md:flex">
//           {/* Left Section: Payment Form */}
//           <div className=" p-6">
//             <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg mt-6 md:mt-0 ">
//               <h3 className="font-semibold text-lg">
//                 {t("plans.Review your order")}
//               </h3>
//               <p className="text-gray-600 mt-2">
//                 <strong>{t("plans.Plan")}:</strong>{" "}
//                 {planDetails ? t(planDetails.title) : ""}
//               </p>
//               <ul className="mt-4 space-y-2">
//                 {selectedPlan &&
//                   getPlanFeatures(selectedPlan).map((feature, index) => (
//                     <li key={index} className="flex items-start">
//                       <CheckCircle
//                         className="text-green-500 mr-2 mt-1 flex-shrink-0"
//                         size={18}
//                       />
//                       <span>{t(feature)}</span>
//                     </li>
//                   ))}

//                 {planDetails && planDetails.billingCycle !== "single" && (
//                   <li className="flex items-start">
//                     <CheckCircle
//                       className="text-green-500 mr-2 mt-1 flex-shrink-0"
//                       size={18}
//                     />
//                     <span>
//                       {t("plans.Automatically renews")}{" "}
//                       {getRenewalText(planDetails)}.
//                     </span>
//                   </li>
//                 )}
//               </ul>

//               <div className="mt-6 bg-[#00b38d] text-white p-4 rounded-lg text-center text-lg font-semibold">
//                 {t("plans.Total due today")} <br />
//                 <span className="text-2xl">
//                   {planDetails ? formatPrice(planDetails) : ""}
//                 </span>
//               </div>
//             </div>
//             {/* Terms and Conditions */}
//             <p className="text-sm text-gray-600 mt-4">
//               {t("plans.By clicking")}{" "}
//               <strong>&quot;{t("plans.Start applying")}&quot;</strong>{" "}
//               {t("plans.below, you agree to our")}{" "}
//               <Link
//                 href="/TermsandConditions"
//                 className="text-[#00b38d] underline"
//               >
//                 {t("plans.Terms of Use")}
//               </Link>{" "}
//               {t("plans.and")}{" "}
//               <Link
//                 href="/footers/PrivacyPolicy"
//                 className="text-[#00b38d] underline"
//               >
//                 {t("plans.Privacy Policy")}
//               </Link>
//               . {t("plans.You also understand that you will be billed")}{" "}
//               <strong>{planDetails ? formatPrice(planDetails) : ""}</strong>,{" "}
//               {t("plans.which will automatically renew")}{" "}
//               {planDetails ? getRenewalText(planDetails) : ""}.{" "}
//               <strong>{t("plans.You can cancel at any time.")}</strong>
//             </p>

//             <button
//               onClick={() => setShowPlanPurchase(true)}
//               className={`mt-6 w-full text-white text-lg font-semibold py-3 rounded-lg ${
//                 selectedPlan === "freePlan"
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-[#00b38d]"
//               }`}
//               disabled={selectedPlan === "freePlan"}
//             >
//               {t("plans.Start applying")}
//             </button>

//             {showPlanPurchase && (
//               <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//                 <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm text-center">
//                   <h2 className="text-lg font-semibold mb-4">
//                     {t("plan.confirm_title") || "Are you sure?"}
//                   </h2>
//                   <p className="mb-6">
//                     {t("plan.confirm_message") ||
//                       "Do you really want to purchase this plan?"}
//                   </p>
//                   <div className="flex justify-center gap-4">
//                     <button
//                       onClick={() => {
//                         handleCheckout();
//                         setShowPlanPurchase(false);
//                       }}
//                       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//                     >
//                       {t("plan.confirm_yes") || "Yes"}
//                     </button>
//                     <button
//                       onClick={() => setShowPlanPurchase(false)}
//                       className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
//                     >
//                       {t("plan.confirm_no") || "No, Go Back"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {/* Secure Checkout */}
//             <div className="flex items-center mt-4 text-sm text-gray-600">
//               <Lock className="text-green-500 mr-2" size={20} />
//               <span>{t("plans.SECURE CHECKOUT")}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { BASE_URL } from "../../components/Constant/constant";
import { toast } from "react-toastify";
import Link from "next/link";

export default function PaymentPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);
  const [showPlanPurchase, setShowPlanPurchase] = useState(false);

  // Extract features from i18n data
  const getPlanFeatures = (planKey) => {
    const features = [];
    for (let i = 1; i <= 11; i++) {
      const featureKey = `pricing.${planKey}.feature${i}`;
      const translatedFeature = t(featureKey);
      if (translatedFeature !== featureKey) {
        features.push(translatedFeature);
      }
    }
    return features;
  };

  const formatPrice = (planKey) => {
    const price = t(`pricing.${planKey}.price`);
    const billingCycle = t(`pricing.${planKey}.billingCycle`);
    if (price === "0") return t("pricing.freeLabel");

    if (billingCycle === "single") {
      return `€${price}`;
    } else if (billingCycle === "month") {
      return `€${price}/${t("plans.mo")}`;
    } else if (billingCycle === "year") {
      return `€${price}/${t("plans.yr")}`;
    }

    return `€${price}`;
  };

  const getRenewalText = (planKey) => {
    const billingCycle = t(`pricing.${planKey}.billingCycle`);
    if (billingCycle === "single") return t("plans.one-time payment");
    if (billingCycle === "month") return t("plans.every month");
    if (billingCycle === "year") return t("plans.every year");
    return "";
  };

  useEffect(() => {
    if (router.query.plan) {
      const planId = router.query.plan;
      setSelectedPlan(planId);
      setPlanDetails({
        title: t(`pricing.${planId}.title`),
        billingCycle: t(`pricing.${planId}.billingCycle`),
        price: t(`pricing.${planId}.price`),
      });
    }
  }, [router.query, t]);

  // const handleCheckout = async () => {
  //   if (!selectedPlan) {
  //     toast.success("Please select a plan before proceeding.");
  //     return;
  //   }
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Authentication required. Please log in.");
  //     router.push("/login2");
  //     return;
  //   }

  //   const planMapping = {
  //     singlePass: 2,
  //     aiProMonth: 3,
  //     // aiProYearly: 4, // add if needed
  //   };

  //   const planId = planMapping[selectedPlan];

  //   try {
  //     const response = await axios.post(
  //       `${BASE_URL}/api/user/payment/checkout`,
  //       { plan_id: planId },
  //       { headers: { Authorization: token } }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Payment successful! Redirecting...");
  //       window.location.href = response.data.url;
  //     } else {
  //       throw new Error("Unexpected response from the server.");
  //     }
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     toast.error(error.response?.data?.message || "Error processing payment.");
  //   }
  // };
  const handleCheckout = async () => {
    if (!selectedPlan) {
      toast.success(t("paymentss.selectPlan"));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(t("paymentss.authRequired"));
      router.push("/login2");
      return;
    }

    const planMapping = {
      singlePass: 2,
      aiProMonth: 3,
      // aiProYearly: 4,
    };

    const planId = planMapping[selectedPlan];

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/payment/checkout`,
        { plan_id: planId },
        { headers: { Authorization: token } }
      );

      if (response.status === 200 && response.data.url) {
        toast.success(t("paymentss.redirecting"));
        window.location.href = response.data.url;
      } else {
        toast.error(t("paymentss.alreadySubscribed"));
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || t("paymentss.genericError"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 md:flex">
          <div className="p-6">
            <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg mt-6 md:mt-0">
              <h3 className="font-semibold text-lg">
                {t("plans.Review your order")}
              </h3>
              <p className="text-gray-600 mt-2">
                <strong>{t("plans.Plan")}:</strong> {planDetails?.title || ""}
              </p>

              <ul className="mt-4 space-y-2">
                {selectedPlan &&
                  getPlanFeatures(selectedPlan).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle
                        className="text-green-500 mr-2 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}

                {planDetails?.billingCycle !== "single" && (
                  <li className="flex items-start">
                    <CheckCircle
                      className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <span>
                      {t("plans.Automatically renews")}{" "}
                      {getRenewalText(selectedPlan)}.
                    </span>
                  </li>
                )}
              </ul>

              <div className="mt-6 bg-[#00b38d] text-white p-4 rounded-lg text-center text-lg font-semibold">
                {t("plans.Total due today")} <br />
                <span className="text-2xl">
                  {selectedPlan ? formatPrice(selectedPlan) : ""}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              {t("plans.By clicking")}{" "}
              <strong>&quot;{t("plans.Start applying")}&quot;</strong>{" "}
              {t("plans.below, you agree to our")}{" "}
              <Link
                href="/TermsandConditions"
                className="text-[#00b38d] underline"
              >
                {t("plans.Terms of Use")}
              </Link>{" "}
              {t("plans.and")}{" "}
              <Link
                href="/footers/PrivacyPolicy"
                className="text-[#00b38d] underline"
              >
                {t("plans.Privacy Policy")}
              </Link>
              . {t("plans.You also understand that you will be billed")}{" "}
              <strong>{formatPrice(selectedPlan)}</strong>,{" "}
              {t("plans.which will automatically renew")}{" "}
              {getRenewalText(selectedPlan)}.{" "}
              <strong>{t("plans.You can cancel at any time.")}</strong>
            </p>

            <button
              onClick={() => setShowPlanPurchase(true)}
              className={`mt-6 w-full text-white text-lg font-semibold py-3 rounded-lg ${
                selectedPlan === "freePlan"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00b38d]"
              }`}
              disabled={selectedPlan === "freePlan"}
            >
              {t("plans.Start applying")}
            </button>

            {showPlanPurchase && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm text-center">
                  <h2 className="text-lg font-semibold mb-4">
                    {t("plan.confirm_title")}
                  </h2>
                  <p className="mb-6">{t("plan.confirm_message")}</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        handleCheckout();
                        setShowPlanPurchase(false);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      {t("plan.confirm_yes")}
                    </button>
                    <button
                      onClick={() => setShowPlanPurchase(false)}
                      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                    >
                      {t("plan.confirm_no")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center mt-4 text-sm text-gray-600">
              <Lock className="text-green-500 mr-2" size={20} />
              <span>{t("plans.SECURE CHECKOUT")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
