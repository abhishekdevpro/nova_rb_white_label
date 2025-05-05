import React, { useContext, useState } from "react";
import { BASE_URL } from "../../../components/Constant/constant";
import { useTranslation } from "react-i18next";
import { ResumeContext } from "../../../components/context/ResumeContext";
import axiosInstance from "../../../components/utils/axiosInstance";
const ContactUs = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    remark: "",
  });
  const { selectedLang } = useContext(ResumeContext);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { t } = useTranslation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axiosInstance.post(
        `/api/user/contact-us?lang=${selectedLang}`,
        formData
      );

      const data = response.data;

      if (data.status !== "success") {
        throw new Error(t("form.error_message"));
      }

      setSuccessMessage(t("form.success_message"));
      setFormData({ name: "", phone: "", email: "", remark: "" });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-gray-100 py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2
          className="text-3xl font-bold text-center mb-8 sm:mb-12 text-[#1C2957]"
          id="phone"
        >
          {t("getintouch")}
        </h2>
        <p className="text-center mb-8 sm:mb-12">{t("contact_paragraph")}</p>
        {/* <div className="flex flex-col md:flex-row items-center justify-center gap-8 border border-blue-500 ">
          <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-6 ">
            <div className="flex items-center mb-4">
              <div className="text-3xl">✉</div>
              <h5 className="ml-3 text-slate-800 text-xl font-semibold"></h5>
            </div>
            <p className="block text-slate-600 leading-normal font-semibold mb-1">Email Us</p>
            <p className="block text-slate-600 leading-normal font-light mb-4 text-sm">We are here for help</p>
            <div className="">
              <button className="border px-3 p-2 rounded-lg">
                <a
                  href="mailto:info@novajob.fr"
                  className="text-slate-800 font-semibold text-sm hover:underline flex items-center"
                >
                  info@novajob.fr
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </button>
            </div>
          </div>

          <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="text-3xl">🗨</div>
            </div>
            <p className="block text-slate-600 leading-normal font-semibold mb-1">Message us</p>
            <p className="block text-slate-600 leading-normal font-light mb-4 text-sm">We are here to help</p>
            <button
              className="border px-3 p-2 rounded-lg"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              <span className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                Chat
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            {isFormVisible && (
              <div className="bg-white shadow-md border rounded-lg p-6 w-full mt-4 z-10">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Remark</label>
                    <textarea
                      name="remark"
                      value={formData.remark}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded-lg"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  {successMessage && <p className="text-blue-500 mb-2">{successMessage}</p>}
                  <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-lg">
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-6 flex-grow max-w-md">
            <div className="flex items-center mb-4">
              <div className="text-3xl"> 📞</div>
              <h5 className="ml-3 text-slate-800 text-xl font-semibold">
                {t("contact_us")}
              </h5>
            </div>
            <p className="text-slate-600 font-semibold mb-1">
              {t("we_are_here")}
            </p>
            <p className="text-slate-600 font-light mb-4 text-sm">
              {t("contact_anytime")}
            </p>
            <div>
              <button className="border px-3 py-2 rounded-lg">
                <a
                  href="tel:0625782947"
                  className="text-slate-800 font-semibold text-sm hover:underline flex items-center"
                >
                  0625782947
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </button>
            </div>
          </div>
          <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-6 flex-grow max-w-md">
            <div className="flex items-center mb-4">
              <div className="text-3xl">✉</div>
              <h5 className="ml-3 text-slate-800 text-xl font-semibold">
                {t("email_us")}
              </h5>
            </div>
            <p className="text-slate-600 font-semibold mb-1">
              {t("we_are_here")}
            </p>
            <p className="text-slate-600 font-light mb-4 text-sm">
              {t("contact_anytime")}
            </p>
            <div>
              <button className="border px-3 py-2 rounded-lg">
                <a
                  href="mailto:bonjour@cibli.fR"
                  className="text-slate-800 font-semibold text-sm hover:underline flex items-center"
                >
                  bonjour@cibli.fR
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </button>
            </div>
          </div>

          <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-6 flex-grow max-w-md">
            <div className="flex items-center mb-4">
              <div className="text-3xl">🗨</div>
              <h5 className="ml-3 text-slate-800 text-xl font-semibold">
                {t("message_us")}
              </h5>
            </div>
            <p className="text-slate-600 font-semibold mb-1">
              {t("we_are_here")}
            </p>
            <p className="text-slate-600 font-light mb-4 text-sm">
              {t("reach_out")}
            </p>
            <button
              className="border px-3 py-2 rounded-lg"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              <span className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                {t("chat")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>

            {isFormVisible && (
              <div className="bg-white shadow-md border rounded-lg p-6 w-full mt-4 z-10">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                      {t("form.phone")}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                      {t("form.remark")}
                    </label>
                    <textarea
                      name="remark"
                      value={formData.remark}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded-lg"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  {successMessage && (
                    <p className="text-blue-500 mb-2">{successMessage}</p>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-400 text-white px-4 py-2 rounded-lg"
                  >
                    {t("form.send")}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
