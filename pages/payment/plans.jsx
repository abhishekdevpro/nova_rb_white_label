import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import {
  ArrowLeft,
  CheckCircle,
  Loader,
  Lock,
  Star,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/router";
import { pricingData } from "../../components/Data/PlanData";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { plan: selectedPlan } = router.query;
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Find the selected plan from the new array structure
  const plan = pricingData.find((p) => p.id === selectedPlan) || pricingData[0];

  // Format price with currency
  const formattedPrice = `$${plan.price}`;

  const handleConfirmClick = () => {
    setShowPopup(true);
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  const handleCheckout = async () => {
    setShowPopup(false);
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://apiwl.novajobs.us/api/user/payment/checkout`,
        {
          plan_id: plan.planId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        if (response.data?.url) {
          toast.success("Payment successful! Redirecting...");
          window.location.href = response.data.url;
        } else if (response.data?.message) {
          toast.info(response.data.message); // 👈 shows API message like "user has subscription active already"
        } else {
          toast.error("Unexpected response from the server. No URL returned.");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition duration-200"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to plans
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section: Plan Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {plan.name} Plan
                </h2>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-blue-600">
                    ${plan.price}
                  </span>
                  <span className="text-xl text-gray-600 ml-2">/month</span>
                </div>
                {plan.isPopular && (
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What&apos;s included:
                </h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        {typeof feature === "string" ? feature : feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Section: Review Order */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Review your order
              </h3>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Selected Plan:</span>
                  <span className="font-semibold text-gray-900">
                    {plan.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Billing Cycle:</span>
                  <span className="font-semibold text-gray-900">Monthly</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${plan.price}
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-blue-600 text-white p-6 rounded-xl text-center mb-6">
                <p className="text-lg font-semibold mb-2">Total due today</p>
                <span className="text-3xl font-bold">{formattedPrice}</span>
              </div>

              {/* Checkout button */}
              <button
                onClick={handleConfirmClick}
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  loading
                    ? "opacity-75 cursor-not-allowed"
                    : "transform hover:scale-105"
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader className="mr-2 animate-spin" size={18} />
                    Processing...
                  </span>
                ) : (
                  <>
                    <Lock className="mr-2" size={18} />
                    Proceed to Secure Checkout
                    <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </button>

              {/* Money-back Guarantee */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 mb-1">
                      Money-back guarantee
                    </p>
                    <p className="text-sm text-green-700">
                      14-day satisfaction guarantee. If you are not satisfied,
                      contact us for a full refund.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  <strong>Questions?</strong> Contact our support team at{" "}
                  <a
                    href="mailto:contact@novausjobs.us"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    contact@novausjobs.us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Confirm Payment
            </h3>
            <p className="text-gray-700 mb-6">
              You are about to proceed with the payment for the{" "}
              <strong>{plan.name}</strong> plan for{" "}
              <strong>{formattedPrice}</strong>. Would you like to continue?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancelPopup}
                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 font-semibold flex items-center justify-center"
              >
                <Lock className="mr-2" size={16} />
                Proceed
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
