import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
const PayAndDownload = ({ resumeId, token, PayerID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const templateRef = useRef();

  useEffect(() => {
    if (PayerID) {
      verifyPayment();
    }
  }, [PayerID]);

  const downloadAsPDF = async (e) => {
    e.preventDefault();
    if (!templateRef.current) {
      toast.error("Template reference not found");
      return;
    }

    try {
      setIsLoading(true);

      // Get the HTML content from the template
      const htmlContent = templateRef.current.innerHTML;

      // Generate the full HTML for the PDF
      const fullContent = `
        <style>
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        </style>
        ${htmlContent}
      `;

      // API call to generate the PDF
      await axios.post(
        "https://api.novajobs.us/api/user/generate-pdf1",
        { html: fullContent },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      toast.success("PDF generation request sent successfully!");
      createPayment();
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error(
        error.response?.data?.message || "Failed to generate and open PDF"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const userID = localStorage.getItem("user_id");

  const createPayment = async () => {
    let PlanId = userID == 136 ? "4" : "1";

    const amount = 49;
    const id = router.query.id || localStorage.getItem("resumeId");
    try {
      setIsLoading(true);

      // Make the payment API call
      const payload = {
        amount,
        ResumeId: id,
        Token: token || "",
        PlanId: "1",
      };

      const response = await axios.post(
        "https://api.novajobs.us/api/user/paypal/create-payment",
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data && data.data) {
        // Store the order ID for later verification if needed
        const orderId = data.order_id;
        localStorage.setItem("orderid", orderId);

        // Redirect the user to PayPal URL to complete payment
        window.location.href = data.data;
      } else {
        console.error("Payment URL not found");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async () => {
    try {
      setIsLoading(true);

      const orderId = localStorage.getItem("orderid");

      if (orderId && token && PayerID) {
        const response = await axios.get(
          `https://api.novajobs.us/api/user/paypal/verify-order?orderid=${orderId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "success") {
          setPaymentVerified(true);
          toast.success("Payment verified successfully!");

          localStorage.removeItem("orderid");
          await downloadPDF(orderId, resumeId, token);
        } else {
          toast.error("Payment verification failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error(
        error?.response?.data?.message || "Payment verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async (orderId, resumeId, token) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://api.novajobs.us/api/user/download-file/${orderId}/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
          responseType: "blob", // Important for file download
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;

      // Set the file name
      link.setAttribute("download", `resume_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error("Failed to download the PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div ref={templateRef} className="hidden">
        {/* Place the resume template here */}
      </div>
      <button
        onClick={downloadAsPDF}
        className="bg-yellow-500 text-black px-6 py-2 rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Download"}
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className=" w-full max-w-4xl bg-white rounded-lg shadow-lg ">
            <div className="flex justify-between items-center p-2">
              <Image src={logo} alt="logo" className="h-10 w-auto" />
              <button
                className=" text-gray-600 hover:text-gray-800 z-20"
                onClick={handleCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 w-full p-4  ">
                <div className="w-[400px] h-[400px]">
                  <Image
                    src={resumeImg}
                    alt="resumeimg"
                    className="w- full h-full rounded-l-lg"
                  />
                </div>
              </div>

              <div className="md:w-1/2 w-full p-4 ">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">$49</h2>
                  <p className="text-sm text-gray-500">Total Amount</p>
                </div>

                <form>
                  <div className="mb-4">
                    <label className="block text-gray-800 mb-2">👨🏻‍💼 Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={`${formData.first_name} ${formData.last_name}`.trim()}
                      name="full name"
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-800 mb-2">📧 Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={formData.email}
                      required
                      name="email"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-800 mb-2">☎️ Phone</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                      disabled
                      type="number"
                      name="phone"
                      value={formData.phone}
                    />
                  </div>

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={downloadAsPDF}
                      type="submit"
                      className="w-full bg-yellow-400 text-blue-800 font-bold  rounded-[50px] hover:bg-yellow-500 transition duration-200"
                    >
                      <Image
                        src={paypal}
                        alt="paypal"
                        className="h-10 w-auto m-auto"
                      />
                    </button>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button className="w-full bg-black text-white font-bold  rounded-[50px] transition duration-200  ">
                      <Image
                        src={applepay}
                        alt="apple pay"
                        className=" w-auto m-auto h-10"
                      />
                    </button>
                  </div>
                  <div className="flex justify-center mt-6 ">
                    <Image
                      src={poweredbypaypal}
                      alt="poweredbypaypal"
                      className="h-10 w-auto"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayAndDownload;
