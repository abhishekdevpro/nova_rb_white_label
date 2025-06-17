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
import { toast } from "react-toastify";
import { AlertCircle, Menu, X } from "lucide-react";
import Image from "next/image";
import resumeImg from "./builderImages/GraphicDesignerResume.jpg";
import paypal from "./builderImages/paypal.png";
import logo from "./builderImages/logo.jpg";
import { ResumeContext } from "../components/context/ResumeContext";
// import PaymentButton from "./paymentbutton";
import { SaveLoader } from "../components/ResumeLoader/SaveLoader";

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});
// push check
export default function WebBuilder() {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [selectedPdfType, setSelectedPdfType] = useState("1");
  const [isFinished, setIsFinished] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const templateRef = useRef(null);
  const {
    resumeData,
    setResumeData,
    setHeaderColor,
    setBgColor,
    setSelectedFont,
    selectedFont,
    backgroundColorss,
    setResumeStrength,
    resumeStrength,
    exp,
  } = useContext(ResumeContext);
  const { token: paymentToken, improve } = router.query;
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // To fecth Resume Data
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

          if (response.data.status === "success") {
            const { data } = response.data;
            const parsedData = (data.ai_resume_parse_data);
            // console.log(parsedData, "parsedData");

            setResumeData(parsedData?.templateData);
            setResumeStrength(data?.resume_strenght_details);
            setResumeId(id);

            if (parsedData.templateData.templateDetails) {
              setBgColor(
                parsedData.templateData.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.templateData.templateDetails.backgroundColor
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

  // Sections of Resume
  const sections = [
    {
      label: "Personal Details",
      component: <PersonalInformation />,
      showErrorIcon: resumeStrength?.is_personal_info === false,
    },
    {
      label: "Social Links",
      component: <SocialMedia />,
      showErrorIcon: resumeStrength?.is_social === false,
    },
    {
      label: "Summary",
      component: <Summary />,
      showErrorIcon: resumeStrength?.is_personal_summery === false,
    },
    {
      label: "Education",
      component: <Education />,
      showErrorIcon: resumeStrength?.is_education === false,
    },
    {
      label: "Experience",
      component: <WorkExperience />,
      showErrorIcon: resumeStrength?.is_work_history === false,
    },
    {
      label: "Projects",
      component: <Projects />,
      showErrorIcon: resumeStrength?.is_project === false,
    },
    {
      label: "Skills",
      showErrorIcon: resumeStrength?.is_skills === false,
      component: Array.isArray(resumeData?.skills) ? (
        resumeData.skills.map((skill, index) => (
          <Skill title={skill.title} currentSkillIndex={index} key={index} />
        ))
      ) : (
        <div className="flex-col-gap-3 w-full md:mt-10 md:px-10">
          <h2 className="input-title text-black text-3xl">Skills</h2>
          <p className="text-black my-2">No skills data available.</p>
        </div>
      ),
      // component: <Skill  />
    },
    {
      label: "Languages",
      component: <Language />,
      showErrorIcon: resumeStrength?.is_languages === false,
    },
    {
      label: "Certifications",
      component: <Certification />,
      showErrorIcon: resumeStrength?.is_certifications === false,
    },
  ];

  // Naviagtion Btw section logic
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
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const nextSection = () => {
    handleFinish(false);
    if (currentSection < sections.length - 1) {
      handleSectionClick(currentSection + 1);
    }
  };

  const prevSection = () => {
    handleFinish();
    if (currentSection > 0) {
      handleSectionClick(currentSection - 1);
    }
  };

  // Payment Modal Logic
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    handleFinish();
    setShowModal(true);
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

      console.log("Payment Verification Response:", response);

      if (response.status === 200) {
        toast.success("Payment verified successfully!");
        await downloadAsPDF();
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
    }
  };
  const downloadAsPDF = async () => {
    setIsDownloading(true)
    try {
      await handleFinish();

      if (!resumeId) {
        // toast.error("Missing resume ID");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://apiwl.novajobs.us/api/user/download-resume/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
          responseType: "blob",
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data type:", typeof response.data);
      console.log(
        "Response data instanceof Blob:",
        response.data instanceof Blob
      );
      console.log("Blob size:", response.data.size);
      console.log("Blob type:", response.data.type);

      if (response.status === 200 && response.data instanceof Blob) {
        // Check if blob is valid
        if (response.data.size === 0) {
          toast.error("Received empty PDF file");
          return;
        }

        const url = window.URL.createObjectURL(response.data);
        console.log("Created URL:", url);

        const link = document.createElement("a");
        link.href = url;
        link.download = `resume_${resumeId}.pdf`;

        console.log("Link created:", link);
        console.log("Link href:", link.href);
        console.log("Link download:", link.download);

        document.body.appendChild(link);

        // Try to trigger download
        try {
          link.click();
          console.log("Link clicked successfully");
        } catch (clickError) {
          console.error("Click error:", clickError);
          // Fallback: try programmatic click
          const event = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          link.dispatchEvent(event);
        }

        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 1000);

        toast.success("Resume Downloaded Successfully");
      } else {
        console.error("Invalid response or blob");
        toast.error("Invalid PDF response");
      }
    } catch (error) {
      console.error("PDF generation error:", error?.response.status);
      toast.error(error?.response.status === 403? "Limit exhausted, please upgrade your plan"  :"Failed to download PDF");
    }finally {
    setIsDownloading(false); // Hide loader in all cases
  }
  };

  // Logic to save and update the Resume
  const handleFinish = async (showToast = true) => {
    if (!resumeData) return;
    const token = localStorage.getItem("token");
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
            keyAchievements: Array.isArray(exp.keyAchievements)
              ? exp.keyAchievements.filter((item) => item?.trim?.()) // filter out empty strings or undefined
              : exp.keyAchievements && exp.keyAchievements.trim?.()
              ? [exp.keyAchievements.trim()]
              : [],
            startYear: exp.startYear,
            endYear: exp.endYear,
            location: exp.location,
          })) || [],
        projects:
          resumeData.projects?.map((project) => ({
            title: project.title || "",
            link: project.link || "",
            description: project.description || "",
          keyAchievements: Array.isArray(exp.keyAchievements)
              ? exp.keyAchievements.filter((item) => item?.trim?.()) // filter out empty strings or undefined
              : exp.keyAchievements && exp.keyAchievements.trim?.()
              ? [exp.keyAchievements.trim()]
              : [],
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
    // console.log(resumeHtml);
    try {
      const id = router.query.id || resumeId;
      //  console.log(resumeHtml,"resume html");
      if (!id || !resumeHtml) {
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
  const handleClick = async () => {
    setLoading("save");
    try {
      await handleFinish(); // Ensure handleFinish is an async function
    } finally {
      setLoading(null);
    }
  };

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
  // To fecth user Details
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
        title="Nova Resume Builder - AI Resume Builder"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />
      {isDownloading && <SaveLoader loadingText="Downoading your resume.Please Wait" />}

      <div className="min-h-screen bg-gray-50 ">
        {!isFinished ? (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="w-full bg-gray-200 p-4 shadow-sm ">
              <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex w-full lg:w-auto gap-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentSection === 0}
                    className="w-40 h-10 rounded-lg bg-blue-950 text-white font-medium transition hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
                  >
                    {currentSection === sections.length - 1 ? "Finish" : "Next"}
                  </button>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                  <select
                    value={selectedFont}
                    onChange={handleFontChange}
                    className="w-40 h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white focus:ring-2 focus:ring-blue-800"
                  >
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Poppins">Poppins</option>
                  </select>

                  <div className="flex items-center gap-4">
                    <ColorPickers
                      selectmultiplecolor={backgroundColorss}
                      onChange={setBgColor}
                    />
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      setSelectedTemplate={setSelectedTemplate}
                      setSelectedPdfType={setSelectedPdfType}
                      selectedPdfType={selectedPdfType}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
              <div className="hidden md:flex justify-center items-center p-4">
                <nav className="bg-gray-100 rounded-lg p-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => prevSection()}
                      className="p-2 hover:bg-gray-200 rounded-lg "
                      disabled={currentSection === 0}
                    >
                      {/* Chevron Left Icon Here */}
                    </button>

                    <div className="flex-1 overflow-x-auto scrollbar-hide ">
                      <ul className="flex flex-row gap-3 items-center py-2 px-4  ">
                        {sections.map((section, index) => (
                          <li
                            key={index}
                            className={`flex items-center justify-between gap-2 px-4 py-2 cursor-pointer transition-all duration-200 rounded-lg border-2 
  ${
    currentSection === index
      ? "border-blue-800 bg-blue-950 text-white font-semibold shadow-md"
      : "border-blue-800 bg-white text-blue-800 hover:bg-blue-100"
  }`}
                            onClick={() => handleSectionClick(index)}
                          >
                            <span>{section.label}</span>
                            {improve && section.showErrorIcon && (
                              <AlertCircle className="text-red-500 w-5 h-5" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => nextSection()}
                      className="p-2 hover:bg-gray-200 rounded-lg "
                      disabled={currentSection === sections.length - 1}
                    >
                      {/* Chevron Right Icon Here */}
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            <div className="w-screen flex flex-col md:flex-row flex-grow  ">
              {/* <aside
                className={`fixed md:static left-0 top-0 h-full z-10 transform 
                                md:translate-x-0 transition-transform duration-300 ease-in-out 
                                w-64 bg-gray-100 border-r`}
              >
                <div className="sticky top-20 px-2 py-4 overflow-y-auto h-full">
                  <div className="mt-12 md:mt-0">
                    <Sidebar />
                  </div>
                </div>
              </aside> */}

              <main className="w-[40%] mx-auto md:p-4">
                <form>{sections[currentSection].component}</form>
              </main>

              <aside className="w-[60%] min-h-screen border-l bg-gray-50">
                <div className="sticky top-20 p-4">
                  <Preview
                    ref={templateRef}
                    selectedTemplate={selectedTemplate}
                  />
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="hidden md:flex w-screen px-8 py-4 justify-between items-center bg-white shadow">
              <div className="flex gap-4">
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
                <ColorPickers
                  selectmultiplecolor={backgroundColorss}
                  onChange={setBgColor}
                />
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  setSelectedPdfType={setSelectedPdfType}
                  selectedPdfType={selectedPdfType}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleClick}
                  className="bg-blue-950 text-white px-6 py-2 rounded-lg"
                >
                  {loading === "save" ? (
                    <SaveLoader loadingText="Saving" />
                  ) : (
                    "Save Resume"
                  )}
                </button>
                <button
                  onClick={downloadAsPDF}
                  // onClick={handleShowModal}
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg"
                >
                  {loading == "download" ? (
                    <SaveLoader loadingText="Downloading" />
                  ) : (
                    "Pay & Download"
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
                            <p className="text-sm text-gray-500">
                              Total Amount
                            </p>
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
                            {/* <PaymentButton /> */}

                            <div className="flex justify-center mt-6">
                              <button
                                onClick={createPayment}
                                type="button"
                                className="w-full bg-yellow-400 text-blue-800 font-bold  rounded-[50px] hover:bg-yellow-500 transition duration-200"
                              >
                                {loading == "download" ? (
                                  <SaveLoader loadingText="Downloading" />
                                ) : (
                                  <Image
                                    src={paypal}
                                    alt="paypal"
                                    className="h-10 w-auto m-auto"
                                  />
                                )}
                              </button>
                            </div>
                            {/* 
                            <div className="flex justify-center mt-6">
                              <button className="w-full bg-black text-white font-bold  rounded-[50px] transition duration-200  ">
                                <Image
                                  src={applepay}
                                  alt="apple pay"
                                  className=" w-auto m-auto h-10"
                                />
                              </button>
                            </div> */}
                            {/* <div className="flex justify-center mt-6 ">
                              <Image
                                src={poweredbypaypal}
                                alt="poweredbypaypal"
                                className="h-10 w-auto"
                              />
                            </div> */}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* <PayAndDownload resumeId={resumeId} token={token} PayerID={PayerID} userId={userId}/> */}
                <button
                  onClick={handleBackToEditor}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>

            <div className="z-10">
              <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
