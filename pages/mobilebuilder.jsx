import React, { useState, useRef, useEffect, useContext } from "react";
import Language from "../components/form/Language";
import axios from "axios";
import Meta from "../components/meta/Meta";
import dynamic from "next/dynamic";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { useRouter } from "next/router";
import Sidebar from "./dashboard/Sidebar";
import { toast } from "react-toastify";
import LoaderButton from "../components/utility/LoaderButton";
import useLoader from "../hooks/useLoader";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import resumeImg from "./builderImages/GraphicDesignerResume.jpg";
import poweredbypaypal from "./builderImages/poweredbypaypal.png";
import paypal from "./builderImages/paypal.png";
import logo from "./builderImages/logo.jpg";
import applepay from "./builderImages/apple-pay.png";
import { ResumeContext } from "../components/context/ResumeContext";
import PayAndDownload from "../components/PayDownload";
import { SaveLoader } from "../components/ResumeLoader/SaveLoader";
import Highlightmenubar from "../components/preview/highlightmenu";

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function MobileBuilder() {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [selectedPdfType, setSelectedPdfType] = useState("1");
  const [isFinished, setIsFinished] = useState(false);
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { token: paymentToken, improve } = router.query;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const templateRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [isDownloading, setisDownloading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const {
    resumeData,
    setResumeData,
    setHeaderColor,
    setBgColor,
    setSelectedFont,
    selectedFont,
    backgroundColorss,
    exp,
  } = useContext(ResumeContext);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (id && token) {
        try {
          const response = await axios.get(
            `https://apiwl.novajobs.us/api/user/resume-list/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.data.status === "success" && response.data.data) {
            const { data } = response.data;
            const parsedData = data.ai_resume_parse_data;

            setResumeData(parsedData.templateData || {});

            if (parsedData.templateData?.templateDetails) {
              setBgColor(
                parsedData.templateData.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.templateData.templateDetails.backgroundColor || ""
              );
              setSelectedTemplate(
                parsedData.templateData.templateDetails.templateId ||
                  "template1"
              );
            }
          }
        } catch (error) {
          console.error("Error fetching resume data:", error);
          toast.error("Failed to fetch resume data");
        }
      }
    };

    fetchResumeData();
  }, [router.query]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setResumeId(id);
  }, []);

  // sections in my resumes
  const sections = [
    { label: "Personal Details", component: <PersonalInformation /> },
    { label: "Social Links", component: <SocialMedia /> },
    { label: "Summary", component: <Summary /> },
    { label: "Education", component: <Education /> },
    { label: "Experience", component: <WorkExperience /> },
    { label: "Projects", component: <Projects /> },
    {
      label: "Skills",
      component: Array.isArray(resumeData?.skills) ? (
        resumeData.skills.map((skill, index) => (
          <Skill title={skill.title} key={index} />
        ))
      ) : (
        <p>No skills available</p>
      ),
    },
    { label: "Languages", component: <Language /> },
    { label: "Certifications", component: <Certification /> },
  ];

  // Naviagation Logic in sections
  const handleNext = () => {
    handleFinish(false);
    if (currentSection === sections.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    handleFinish(false);
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    handleFinish(false);
    setCurrentSection(index);
    setIsMobileMenuOpen(false);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  // Payment -> verify and Download Logic
  const createPayment = async (e) => {
    e.preventDefault(); // prevent form submit reload

    // const amount = 49;
    const id = router.query.id || localStorage.getItem("resumeId");
    const token = localStorage.getItem("token");
    try {
      const payload = {
        plan_id: "1",
        resume_id: id,
        name: `${formData.first_name} ${formData.last_name}`.trim(),
        email: formData.email,
        phone: formData.phone,
      };

      const response = await axios.post(
        "https://apiwl.novajobs.us/api/user/paypal/create-payment",
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(response, "from create payment");

      if (data && data.data) {
        console.log(data.order_id);
        setOrderId(data.order_id);
        localStorage.setItem("orderId", data.order_id);

        // Redirect to payment page
        window.location.href = data.data;
      } else {
        console.error("Payment URL not found");
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  useEffect(() => {
    const storedOrderId = localStorage.getItem("orderId");
    if (storedOrderId) {
      setOrderId(storedOrderId);
    }

    if (storedOrderId && paymentToken) {
      console.log(
        "Attempting to verify payment...",
        storedOrderId,
        paymentToken
      );
      verifyPayment();
    }
  }, [paymentToken]);

  const verifyPayment = async () => {
    try {
      const authToken = localStorage.getItem("token");

      if (!orderId || !paymentToken) {
        console.log("Missing order ID or payment token for verification");
        return;
      }

      console.log("Verifying payment with:", { orderId, paymentToken });

      const response = await axios.get(
        `https://apiwl.novajobs.us/api/user/paypal/verify-order?orderid=${orderId}&token=${paymentToken}`,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment Verification Response:", response.status);

      if (response.status === 200) {
        toast.success("Payment verified successfully!");
        await downloadAsPDF();
        // localStorage.removeItem("orderId")
        // Optionally redirect to success page or enable download
        // router.push("/payment-success");
      } else {
        toast.error("Payment verification failed. Please try again.");
        console.log("Verification failed response:", response.data);
        router.push("/payment-failed");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error(
        error?.response?.data?.message || "Payment verification failed"
      );
      //  localStorage.removeItem("orderId")
    }
  };
  const downloadAsBackend = async () => {
    setisDownloading(true);

    if (!templateRef.current) {
      toast.error("Template reference not found");
      setisDownloading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const htmlContent = templateRef.current.innerHTML;

      const fullHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;

      const response = await axios.post(
        `https://apiwl.novajobs.us/api/user/download-resume/${resumeId}?pdf_type=${selectedPdfType}`,
        {
          html: fullHtml,
          pdf_type: selectedPdfType, // ✅ Move pdf_type here
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation error:", error);

      const apiError = error.response?.data;
      const statusCode = error.response?.status;

      if (statusCode === 403) {
        setShowUpgradeModal(true); // Show upgrade popup
      } else if (apiError?.error) {
        toast.error(apiError.error);
      } else if (apiError?.message) {
        toast.error(apiError.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setisDownloading(false);
    }
  };

  const downloadAsPDF = () => {
    downloadAsBackend();
    handleFinish();
  };

  // Logic to save and update the resume
  const handleFinish = async (showToast = true) => {
    if (!resumeData) return;

    const templateData = {
      templateData: {
        name: resumeData.name || "",
        position: resumeData.position || "",
        contactInformation: resumeData.contactInformation || "",
        phone_code: resumeData.phone_code || "",
        email: resumeData.email || "",
        address: resumeData.address || "",
        profilePicture: resumeData.profilePicture || "",
        socialMedia:
          resumeData.socialMedia?.map((media) => ({
            socialMedia: media.platform || "",
            link: media.link || "",
            socialMedia: media.socialMedia || "",
          })) || [],
        summary: resumeData.summary || "",
        is_fresher: resumeData.is_fresher || false,
        education:
          resumeData.education?.map((edu) => ({
            school: edu.school || "",
            degree: edu.degree || "",
            startYear: edu.startYear || "",
            endYear: edu.endYear || "",
            location: edu.location || "",
          })) || [],
        workExperience:
          resumeData.workExperience?.map((exp) => ({
            company: exp.company,
            position: exp.position,
            description: exp.description,
            KeyAchievements: Array.isArray(exp.keyAchievements)
              ? exp.keyAchievements
              : [exp.keyAchievements],
            startYear: exp.startYear,
            endYear: exp.endYear,
            location: exp.location,
          })) || [],
        projects:
          resumeData.projects?.map((project) => ({
            title: project.title || "",
            link: project.link || "",
            description: project.description || "",
            keyAchievements: Array.isArray(project.keyAchievements)
              ? project.keyAchievements
              : [project.keyAchievements],
            startYear: project.startYear,
            endYear: project.endYear,
            name: project.name || "",
          })) || [],
        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills.map((skill) => ({
              title: skill.title || "",
              skills: skill.skills || [],
            }))
          : [],
        languages: resumeData.languages || [],
        certifications: resumeData.certifications || [],
        templateDetails: {
          templateId: selectedTemplate,
          backgroundColor: backgroundColorss || "",
          font: selectedFont || "Ubuntu",
        },
        no_of_experience: exp,
      },
    };

    const htmlContent = templateRef?.current?.innerHTML;
    if (!htmlContent) {
      // toast.error("Error: Template content is missing.");
      return;
    }

    const resumeHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;

    try {
      const id = router.query.id || resumeId;
      if (!id) {
        console.error("Resume ID not found.");
        toast.error("Error: Resume ID is missing.");
        return;
      }

      const url = `https://apiwl.novajobs.us/api/user/resume-update/${id}`;
      const response = await axios.put(
        url,
        { ...templateData, resume_html: resumeHtml },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        if (showToast) {
          toast.success(response.data.message || "Resume saved successfully.");
        }
      } else {
        toast.error(response.data.error || "Error while saving the resume.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
      console.error("Error updating resume:", error);
    }
  };

  const MobileNavigation = () => (
    <div className="fixed px-2 bottom-0 left-0 right-0 bg-white shadow-lg py-4 ">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="px-4 py-2 bg-blue-950 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          {sections[currentSection].label}
        </span>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
        >
          {currentSection === sections.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );

  const handleClick = async () => {
    setLoading(true);
    try {
      await handleFinish(); // Ensure handleFinish is an async function
    } finally {
      setLoading(false);
    }
  };
  const MobileMenu = () => (
    <div className="">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 p-4 pt-16">
          <div className="overflow-y-auto h-full">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => handleSectionClick(index)}
                className={`w-full p-3 mb-2 rounded-lg text-left ${
                  currentSection === index
                    ? "bg-blue-950 text-white"
                    : "bg-gray-100 text-blue-950"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const handleBackToEditor = () => {
    setIsFinished(false);
    setCurrentSection(0);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userProfileResponse = await axios.get(
          "https://apiwl.novajobs.us/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (userProfileResponse.data.status === "success") {
          const userData = userProfileResponse.data.data;
          setFormData((prevData) => ({
            ...prevData,
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            phone: userData.phone || "",
            email: userData.email || "",
          }));
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Meta
        title="Resume Intellect - AI Resume Builder"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />
      {isDownloading && (
        <SaveLoader loadingText="Downoading your resume.Please Wait" />
      )}
      <div className="w-full bg-gray-50 min-h-screen overflow-x-hidden">
        {!isFinished ? (
          <div className="bg-gray-50 flex flex-col">
            <div className="flex flex-col md:flex-row flex-grow">
              <main className="flex-1 h-full w-full mx-auto p-4 pb-10 mb-8 overflow-visible">
                <form>{sections[currentSection].component}</form>
              </main>
            </div>

            <MobileNavigation />
          </div>
        ) : (
          <>
            <div className="flex items-center absolute justify-center py-1 top-26 left-0 right-0 bg-white shadow-lg">
              <ColorPickers
                selectmultiplecolor={backgroundColorss}
                onChange={setBgColor}
              />
              <select
                value={selectedFont}
                onChange={handleFontChange}
                className="rounded-lg border-2 border-blue-800 px-1 py-2 font-bold bg-white text-blue-800"
              >
                <option value="Ubuntu">Ubuntu</option>
                <option value="Calibri">Calibri</option>
                <option value="Georgia">Georgia</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
              </select>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                setSelectedPdfType={setSelectedPdfType}
                selectedPdfType={selectedPdfType}
              />
            </div>
            <div className="">
              <Highlightmenubar />
              <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
            </div>

            <div className="flex items-center justify-center gap-4 p-2 fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              <button
                onClick={handleClick}
                className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-blue-800 cursor-not-allowed"
                    : "bg-blue-950 hover:bg-blue-900 active:bg-blue-800"
                } text-white transition-colors duration-200`}
                disabled={loading}
              >
                {loading ? <SaveLoader /> : "Save"}
              </button>
              {/* <PayAndDownload
                resumeId={resumeId}
                token={token}
                PayerID={PayerID}
              /> */}
              <button
                onClick={downloadAsPDF}
                // onClick={handleShowModal}
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg"
              >
                {isDownloading ? (
                  <SaveLoader loadingText="Downloading" />
                ) : (
                  "Download"
                )}
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
                          <h2 className="text-2xl font-bold text-gray-900">
                            $49
                          </h2>
                          <p className="text-sm text-gray-500">Total Amount</p>
                        </div>

                        <form>
                          <div className="mb-4">
                            <label className="block text-gray-800 mb-2">
                              👨🏻‍💼 Name
                            </label>
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
                            <label className="block text-gray-800 mb-2">
                              📧 Email
                            </label>
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
                            <label className="block text-gray-800 mb-2">
                              ☎️ Phone
                            </label>
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
                              onClick={createPayment}
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
              <button
                onClick={handleBackToEditor}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors bottom-btns"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Upgrade Required
            </h2>
            <p className="text-gray-600 mb-6">
              You’ve reached your download limit. Please upgrade your plan to
              continue.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/payment")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
