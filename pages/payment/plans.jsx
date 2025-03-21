// import Link from "next/link";
// import Navbar from "../Navbar/Navbar";

// import { CheckCircle, Lock } from "lucide-react";
// import { useRouter } from "next/router";
// import { PLAN_DATA } from "../../components/Data/PlanData";
// export default function PaymentPage() {
//   const router = useRouter();
//   const { selectedPlan } = router.query;
//   console.log(selectedPlan, "LLLL");
//   const plan = PLAN_DATA[selectedPlan] || "annual";
//   console.log(plan);
//   //  const priceWithoutCurrency = plan.price.replace('₹', '').split('/')[0].trim();
//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//         <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-6 md:flex">
//           {/* Left Section: Payment Form */}
//           <div className="md:w-2/3 p-6">
//             <h2 className="text-2xl font-bold mb-4">Payment information</h2>

//             {/* Card Information Section */}
//             <div className="mb-4">
//               <h3 className="font-semibold">Card information</h3>
//               <div className="flex items-center mt-2 space-x-2">
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9123 4567"
//                   className="w-2/3 p-3 border rounded-xl text-lg"
//                 />
//                 <div className="relative w-1/3">
//                   <input
//                     type="text"
//                     placeholder="123"
//                     className="w-full p-3 border rounded-xl text-lg"
//                   />
//                   <Lock
//                     className="absolute right-3 top-3 text-gray-400"
//                     size={20}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Cardholder Name */}
//             <div className="mb-4">
//               <h3 className="font-semibold">Cardholder name</h3>
//               <input
//                 type="text"
//                 placeholder="Jessica Claire"
//                 className="w-full p-3 border rounded-xl text-lg mt-2"
//               />
//             </div>

//             {/* Expiration Date */}
//             <div className="mb-4">
//               <h3 className="font-semibold">Expiration date</h3>
//               <div className="flex space-x-4 mt-2">
//                 <select className="w-1/2 p-3 border rounded-xl text-lg">
//                   <option>Month</option>
//                   <option>01 - January</option>
//                   <option>02 - February</option>
//                   <option>03 - March</option>
//                   <option>04 - April</option>
//                 </select>
//                 <select className="w-1/2 p-3 border rounded-xl text-lg">
//                   <option>Year</option>
//                   <option>2025</option>
//                   <option>2026</option>
//                   <option>2027</option>
//                 </select>
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <p className="text-sm text-gray-600 mt-4">
//               By clicking <strong>&quot;Start applying&quot;</strong> below, you
//               agree to our{" "}
//               <Link
//                 href="/footerr/TermsandConditions"
//                 className="text-blue-600 underline"
//               >
//                 Terms of Use
//               </Link>{" "}
//               and{" "}
//               <Link
//                 href="/footerr/PrivacyPolicy"
//                 className="text-blue-600 underline"
//               >
//                 Privacy Policy
//               </Link>
//               . You also understand that you will be billed{" "}
//               <strong>{plan.price}</strong>.{" "}
//               <strong>You can cancel at any time.</strong>
//             </p>

//             {/* Start Applying Button */}
//             <button className="mt-6 w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-700">
//               Start applying
//             </button>

//             {/* Secure Checkout */}
//             <div className="flex items-center mt-4 text-sm text-gray-600">
//               <Lock className="text-blue-500 mr-2" size={20} />
//               <span>SECURE CHECKOUT</span>
//             </div>
//           </div>

//           {/* Right Section: Review Order */}
//           <div className="md:w-1/3 bg-gray-100 p-6 rounded-xl mt-6 md:mt-0">
//             <h3 className="font-semibold text-lg">Review your order</h3>
//             <p className="text-gray-600 mt-2">
//               <strong>Plan:</strong> {plan.title}
//             </p>
//             {/* <ul className="mt-4 space-y-2">
//               {plan.features.map((feature, index) => (
//                 <li key={index} className="flex items-center">
//                   <CheckCircle className="text-blue-500 mr-2" />
//                   {feature}
//                 </li>
//               ))}
//             </ul> */}
//             <ul className="mt-4 space-y-2">
//               {plan?.features?.map((feature, index) => (
//                 <li key={index} className="flex items-center text-sm">
//                   <CheckCircle className="text-blue-500 mr-2" />
//                   {feature}
//                 </li>
//               ))}
//             </ul>

//             {/* Total Price */}
//             <div className="mt-6 bg-blue-600 text-white p-4 rounded-xl text-center text-lg font-semibold">
//               Total due today <br />
//               <span className="text-2xl">{plan.price}</span>
//             </div>

//             {/* Money-back Guarantee */}
//             {/* <p className="mt-4 text-gray-600 text-sm">
//               <strong>Money-back guarantee:</strong> Sonara offers an AI-powered
//               job application service and customized job recommendations. If
//               you're not satisfied with the service during the first 14 days,
//               contact us to get a refund.
//             </p> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import { Lock, CheckCircle } from "lucide-react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// import Navbar from "../Navbar/Navbar";

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
//     price: "19",
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
//     price: "29",
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
//   aiProYearly: {
//     title: "AI Pro Yearly",
//     price: "39",
//     billingCycle: "year",
//     bestValue: "true",
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
//     feature11: "Most Affordable ATS Optimization",
//   },
// };

// export default function PaymentPage() {
//   const router = useRouter();

//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [planDetails, setPlanDetails] = useState(null);

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
//       return `£${plan.price}`;
//     } else if (plan.billingCycle === "month") {
//       return `£${plan.price}/$"mo"`;
//     } else if (plan.billingCycle === "year") {
//       return `£${plan.price}/$"yr"`;
//     }

//     return `£${plan.price}`;
//   };

//   // Get renewal period text
//   const getRenewalText = (plan) => {
//     if (!plan) return "";

//     if (plan.billingCycle === "single") {
//       return t("one-time payment");
//     } else if (plan.billingCycle === "month") {
//       return t("every month");
//     } else if (plan.billingCycle === "year") {
//       return "every year";
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
//       setSelectedPlan("aiProYearly");
//       setPlanDetails(pricingData.aiProYearly);
//     }
//   }, [router.query]);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//         <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 md:flex">
//           {/* Left Section: Payment Form */}
//           <div className=" p-6">
//             {/* <h2 className="text-2xl font-bold mb-4">
//               {t("Payment information")}
//             </h2> */}

//             {/* <div className="mb-4">
//               <h3 className="font-semibold">{t("Card information")}</h3>
//               <div className="flex items-center mt-2 space-x-2">
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9123 4567"
//                   className="w-2/3 p-3 border rounded-lg text-lg"
//                 />
//                 <div className="relative w-1/3">
//                   <input
//                     type="text"
//                     placeholder="123"
//                     className="w-full p-3 border rounded-lg text-lg"
//                   />
//                   <Lock
//                     className="absolute right-3 top-3 text-gray-400"
//                     size={20}
//                   />
//                 </div>
//               </div>
//             </div> */}

//             {/* Cardholder Name */}
//             {/* <div className="mb-4">
//               <h3 className="font-semibold">{t("Cardholder name")}</h3>
//               <input
//                 type="text"
//                 placeholder="Jessica Claire"
//                 className="w-full p-3 border rounded-lg text-lg mt-2"
//               />
//             </div> */}

//             {/* Expiration Date */}
//             {/* <div className="mb-4">
//               <h3 className="font-semibold">{t("Expiration date")}</h3>
//               <div className="flex space-x-4 mt-2">
//                 <select className="w-1/2 p-3 border rounded-lg text-lg">
//                   <option>{t("Month")}</option>
//                   <option>01 - {t("January")}</option>
//                   <option>02 - {t("February")}</option>
//                   <option>03 - {t("March")}</option>
//                   <option>04 - {t("April")}</option>
//                   <option>05 - {t("May")}</option>
//                   <option>06 - {t("June")}</option>
//                   <option>07 - {t("July")}</option>
//                   <option>08 - {t("August")}</option>
//                   <option>09 - {t("September")}</option>
//                   <option>10 - {t("October")}</option>
//                   <option>11 - {t("November")}</option>
//                   <option>12 - {t("December")}</option>
//                 </select>
//                 <select className="w-1/2 p-3 border rounded-lg text-lg">
//                   <option>{t("Year")}</option>
//                   <option>2025</option>
//                   <option>2026</option>
//                   <option>2027</option>
//                   <option>2028</option>
//                   <option>2029</option>
//                   <option>2030</option>
//                 </select>
//               </div>
//             </div> */}
//             <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg mt-6 md:mt-0 ">
//               <h3 className="font-semibold text-lg">Review your order</h3>
//               <p className="text-gray-600 mt-2">
//                 <strong>Plan:</strong> {planDetails ? planDetails.title : ""}
//               </p>
//               <ul className="mt-4 space-y-2">
//                 {selectedPlan &&
//                   getPlanFeatures(selectedPlan).map((feature, index) => (
//                     <li key={index} className="flex items-start">
//                       <CheckCircle
//                         className="text-blue-500 mr-2 mt-1 flex-shrink-0"
//                         size={18}
//                       />
//                       <span>{feature}</span>
//                     </li>
//                   ))}

//                 {planDetails && planDetails.billingCycle !== "single" && (
//                   <li className="flex items-start">
//                     <CheckCircle
//                       className="text-blue-500 mr-2 mt-1 flex-shrink-0"
//                       size={18}
//                     />
//                     <span>
//                       Automatically renews {getRenewalText(planDetails)}.
//                     </span>
//                   </li>
//                 )}
//               </ul>

//               <div className="mt-6 bg-blue-700 text-white p-4 rounded-lg text-center text-lg font-semibold">
//                 Total due today <br />
//                 <span className="text-2xl">
//                   {planDetails ? formatPrice(planDetails) : ""}
//                 </span>
//               </div>
//             </div>
//             {/* Terms and Conditions */}
//             <p className="text-sm text-gray-600 mt-4">
//               By clicking <strong>&quot;Start applying&quot;</strong> below, you
//               agree to our
//               <a href="#" className="text-blue-500 underline">
//                 Terms of Use
//               </a>{" "}
//               and
//               <a href="#" className="text-blue-500 underline">
//                 Privacy Policy
//               </a>
//               . You also understand that you will be billed{" "}
//               <strong>{planDetails ? formatPrice(planDetails) : ""}</strong>,{" "}
//               which will automatically renew{" "}
//               {planDetails ? getRenewalText(planDetails) : ""}.{" "}
//               <strong>You can cancel at any time.</strong>
//             </p>

//             {/* Start Applying Button */}
//             <button className="mt-6 w-full bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg ">
//               Start applying
//             </button>

//             {/* Secure Checkout */}
//             <div className="flex items-center mt-4 text-sm text-gray-600">
//               <Lock className="text-blue-500 mr-2" size={20} />
//               <span>SECURE CHECKOUT</span>
//             </div>
//           </div>

//           {/* Right Section: Review Order */}
//           {/* <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg mt-6 md:mt-0">
//             <h3 className="font-semibold text-lg">{t("Review your order")}</h3>
//             <p className="text-gray-600 mt-2">
//               <strong>{t("Plan")}:</strong>{" "}
//               {planDetails ? t(planDetails.title) : ""}
//             </p>
//             <ul className="mt-4 space-y-2">
//               {selectedPlan &&
//                 getPlanFeatures(selectedPlan).map((feature, index) => (
//                   <li key={index} className="flex items-start">
//                     <CheckCircle
//                       className="text-blue-500 mr-2 mt-1 flex-shrink-0"
//                       size={18}
//                     />
//                     <span>{t(feature)}</span>
//                   </li>
//                 ))}

//               {planDetails && planDetails.billingCycle !== "single" && (
//                 <li className="flex items-start">
//                   <CheckCircle
//                     className="text-blue-500 mr-2 mt-1 flex-shrink-0"
//                     size={18}
//                   />
//                   <span>
//                     {t("Automatically renews")} {getRenewalText(planDetails)}.
//                   </span>
//                 </li>
//               )}
//             </ul>

//             <div className="mt-6 bg-blue text-white p-4 rounded-lg text-center text-lg font-semibold">
//               {t("Total due today")} <br />
//               <span className="text-2xl">
//                 {planDetails ? formatPrice(planDetails) : ""}
//               </span>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </>
//   );
// }

import { Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";

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
    feature11: "Most Affordable ATS Optimization",
  },
};

export default function PaymentPage() {
  const router = useRouter();
  const BASE_URL = "https://apiwl.novajobs.us";
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);

  // Get features for a plan
  const getPlanFeatures = (planId) => {
    const plan = pricingData[planId];
    const features = [];

    if (!plan) return [];

    for (let i = 1; i <= 11; i++) {
      const featureKey = `feature${i}`;
      if (plan[featureKey]) {
        features.push(plan[featureKey]);
      }
    }

    return features;
  };

  // Format price based on billing cycle
  const formatPrice = (plan) => {
    if (!plan) return "";

    if (plan.price === "0") {
      return pricingData.freeLabel;
    }

    if (plan.billingCycle === "single") {
      return `$${plan.price}`;
    } else if (plan.billingCycle === "month") {
      return `$${plan.price}/mo`;
    } else if (plan.billingCycle === "year") {
      return `$${plan.price}/yr`;
    }

    return `$${plan.price}`;
  };

  // Get renewal period text
  const getRenewalText = (plan) => {
    if (!plan) return "";

    if (plan.billingCycle === "single") {
      return "one-time payment";
    } else if (plan.billingCycle === "month") {
      return "every month";
    } else if (plan.billingCycle === "year") {
      return "every year";
    }

    return "";
  };
  useEffect(() => {
    // Ensure query parameters are available
    if (router.isReady && router.query.selectedPlan) {
      const planId = router.query.selectedPlan;
      setSelectedPlan(planId);
      setPlanDetails(pricingData[planId]); // Get the correct plan details
    } else {
      // Default to aiProYearly if no plan specified
      setSelectedPlan("aiProYearly");
      setPlanDetails(pricingData.aiProYearly);
    }
  }, [router.isReady, router.query]);

  // useEffect(() => {
  //   // Get plan from URL query
  //   if (router.query.plan) {
  //     const planId = router.query.plan;
  //     setSelectedPlan(planId);
  //     setPlanDetails(pricingData[planId]);
  //   } else {
  //     // Default to aiProYearly if no plan specified
  //     setSelectedPlan("aiProYearly");
  //     setPlanDetails(pricingData.aiProYearly);
  //   }
  // }, [router.query]);
  const handleCheckout = async () => {
    if (!selectedPlan) {
      toast.success("Please select a plan before proceeding.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please log in.");
      router.push("/login2"); // Redirect to login page if token is missing
      return;
    }
    // Map selectedPlan to the correct plan_id
    const planMapping = {
      // freePlan: 1,
      singlePass: 2,
      aiProMonth: 3,
      aiProYearly: 4,
    };

    const planId = planMapping[selectedPlan];

    try {
      // Show loading (optional)
      // setIsLoading(true);

      const response = await axios.post(
        `${BASE_URL}/api/user/payment/checkout`,
        {
          plan_id: planId,
        },
        {
          headers: {
            Authorization: token, // Add authentication header
          },
        }
      );

      if (response.status === 200) {
        toast.success("Payment successful! Redirecting...");
        // router.push("/success"); // Redirect after success
        window.location.href = response.data.url;
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "Error processing payment.");
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 md:flex">
          <div className=" p-6">
            <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg mt-6 md:mt-0 ">
              <h3 className="font-semibold text-lg">Review your order</h3>
              <p className="text-gray-600 mt-2">
                <strong>Plan:</strong> {planDetails ? planDetails.title : ""}
              </p>
              <ul className="mt-4 space-y-2">
                {selectedPlan &&
                  getPlanFeatures(selectedPlan).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle
                        className="text-blue-500 mr-2 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}

                {planDetails && planDetails.billingCycle !== "single" && (
                  <li className="flex items-start">
                    <CheckCircle
                      className="text-blue-500 mr-2 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <span>
                      Automatically renews {getRenewalText(planDetails)}.
                    </span>
                  </li>
                )}
              </ul>

              <div className="mt-6 bg-blue-700 text-white p-4 rounded-lg text-center text-lg font-semibold">
                Total due today <br />
                <span className="text-2xl">
                  {planDetails ? formatPrice(planDetails) : ""}
                </span>
              </div>
            </div>
            {/* Terms and Conditions */}
            <p className="text-sm text-gray-600 mt-4">
              By clicking <strong>&quot;Start applying&quot;</strong> below, you
              agree to our
              <a href="#" className="text-blue-500 underline">
                Terms of Use
              </a>{" "}
              and
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
              . You also understand that you will be billed{" "}
              <strong>{planDetails ? formatPrice(planDetails) : ""}</strong>,{" "}
              which will automatically renew{" "}
              {planDetails ? getRenewalText(planDetails) : ""}.{" "}
              <strong>You can cancel at any time.</strong>
            </p>

            {/* Start Applying Button */}

            <button
              onClick={handleCheckout}
              className={`mt-6 w-full text-white text-lg font-semibold py-3 rounded-lg ${
                selectedPlan === "freePlan"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
              disabled={selectedPlan === "freePlan"}
            >
              Start applying
            </button>

            {/* Secure Checkout */}
            <div className="flex items-center mt-4 text-sm text-gray-600">
              <Lock className="text-blue-500 mr-2" size={20} />
              <span>SECURE CHECKOUT</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
