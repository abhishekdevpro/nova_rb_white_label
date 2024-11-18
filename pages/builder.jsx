import React, { useState, useRef, createContext ,useEffect} from "react";
import Language from "../components/form/Language";
import axios from "axios";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import dynamic from "next/dynamic";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import ColorPicker from './ColorPicker';
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { PDFExport } from '@progress/kendo-react-pdf';
import LoadUnload from "../components/form/LoadUnload";
import MyResume from "./dashboard/MyResume";
import Modal from "../components/Modal"; // Import the modal
import Link from "next/link";
import { useRouter } from "next/router";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

const ResumeContext = createContext(DefaultResumeData);
import toast from "react-hot-toast";
import Sidebar from "./dashboard/Sidebar";

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder({ onClose }) {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [formClose, setFormClose] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  const [headerColor, setHeaderColor] = useState("");
  const [backgroundColorss, setBgColor] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isFinished, setIsFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    // Extract resumeId from URL
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const id = path.split("/").pop(); // Get the last part of the URL
      setResumeId(id);

      // Fetch resume data from the API using resumeId
      const fetchResumeData = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `https://api.resumeintellect.com/api/user/resume-list/${id}`,
            {
              headers: { Authorization: token },
            }
          );
          const resumeData = response.data.data;
          console.log("resumeData>>>>>", resumeData);
          if (
            !resumeData ||
            // !resumeData.file_path ||
            !resumeData.ai_resume_parse_data
          ) {
            console.error("Resume data not found in API response");
            return;
          }

          const parsedData = JSON.parse(resumeData.ai_resume_parse_data);
          setResumeData(parsedData.templateData);
        } catch (error) {
          console.error("Error fetching resume data:", error);
        }
      };

      if (id) {
        fetchResumeData();
      }
    }
  }, []);

  const handleDownloadResume = () => {
    const amount = 49; // Fixed price

    // Ensure the resumeId is valid
    if (!resumeId) {
      console.error("Resume ID is not available");
      return;
    }

    // Create the download payload
    const payload = {
      amount,
      ResumeId: resumeId, // Ensure the field name matches the API expectation
      Token: token || "", // Ensure the field name matches the API expectation
    };

    // Make the API call to initiate download

    axios
      .post(
        "https://api.resumeintellect.com/api/user/paypal/create-payment",
        payload,
        {
          headers: { "Content-Type": "application/json" }, // Use JSON content type
        }
      )

      .then((response) => {
        const data = response.data;
        if (data && data.data) {
          // Redirect to the PayPal URL provided in the response
          window.location.href = data.data;
        }
        if (data && data.order_id) {
          localStorage.setItem("orderid", data.order_id);
        }
        console.log(data.order_id);
      })
      .catch((error) => console.error("Payment Error:", error));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const sections = [
    { label: "Details", component: <PersonalInformation /> },
    { label: "Social", component: <SocialMedia /> },
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
    { label: "Language", component: <Language /> },
    { label: "Certification", component: <Certification /> },
  ];

  const handleNext = async () => {
    await handleFinish();
    if (currentSection === sections.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handleBackToPrevious = async () => {
    await handleFinish();
    setIsFinished(false);
  };

  const handlePrevious = async () => {
    await handleFinish();
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = async (index) => {
    await handleFinish();
    setCurrentSection(index);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const pdfExportComponent = useRef(null);
  const downloadAsPDF = () => {
    // if (pdfExportComponent.current) {
    //   pdfExportComponent.current.save();
    //   router.push('/dashboard/page')
    // }
  };

  const pdfExportOptions = {
    paperSize: "A4",
    fileName: "resume.pdf",
    author: resumeData.firstName + " " + resumeData.lastName,
    creator: "ATSResume Builder",
    date: new Date(),
    scale: 0.7,
    forcePageBreak: ".page-break",
  };

  const router = useRouter();
  const { id } = router.query;
  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Clear the token
  //   setIsLoggedIn(false); // Update login state
  // };
  const getLinkClassName = (path) => {
    return router.pathname === path
      ? "flex items-center p-2 bg-slate-900 border-b-2 rounded font-semibold text-white"
      : "flex items-center p-2 hover:bg-indigo-100  border-b-2 rounded font-semibold  ";
  };
  const saveResume = async () => {
    // Logic to save the resume, e.g., API call to save data
    // await saveResumeAPI(resumeData);
    console.log("Resume saved!");
  };
  console.log(">>>>>ResumeData", resumeData);
  const handleFinish = async () => {
    if (!resumeData) return;

    // Map resumeData into the required templateData format
    const templateData = {
      templateData: {
        ...resumeData,
        workExperience:
          resumeData.workExperience?.map((exp) => ({
            company: exp.company || "",
            position: exp.position || "",
            description: exp.description || "",
            KeyAchievements: Array.isArray(exp.keyAchievements)
              ? exp.keyAchievements
              : [exp.keyAchievements || ""], // Ensure it's an array
            startYear: exp.startYear || "",
            endYear: exp.endYear || "",
          })) || [],
        projects:
          resumeData.projects?.map((project) => ({
            title: project.title || "",
            link: project.link || "",
            description: project.description || "",
            keyAchievements: Array.isArray(project.keyAchievements)
              ? project.keyAchievements
              : [project.keyAchievements || ""], // Ensure it's an array
            startYear: project.startYear || "",
            endYear: project.endYear || "",
            name: project.name || "",
          })) || [],
        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills.map((skill) => ({
              title: skill.title || "",
              skills: skill.skills || [],
            }))
          : [],
      },
    };

    try {
      // Check if `id` is available, otherwise get it from local storage
      const id = router.query.id || localStorage.getItem("resumeId");
      if (!id) {
        console.error("Resume ID not found.");
        return;
      }

      const url = `https://api.resumeintellect.com/api/user/resume-update/${id}`;
      const response = await axios.put(url, templateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log("Resume updated successfully:", response.data);
      // Uncomment below if you need to redirect after updating
      // if (response.data) {
      //   router.push('/dashboard/ai-resume-builder');
      // }
      await saveResume(); // Save the resume
      toast.success("Your resume has been saved in 'My Resume'");
    } catch (error) {
      console.error("Error updating resume:", error);
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.");
    }
  };

  // const getTargetElement = () => document.getElementById("content-pdf");
  const getTargetElement = () => {
    const targetElement = document.getElementById("preview-section"); //("content-pdf");
    if (!targetElement) {
      console.error("Preview section not found.");
      return null;
    }

    // Apply the additional classes to all <h2> tags and elements with the "pdf-icon" class
    const h2Elements = targetElement.querySelectorAll(".border-b-2");
    const iconElements = targetElement.querySelectorAll(".pdf-icon");
    const mainHeadingElements = targetElement.querySelectorAll(".main-heading");
    // Store the original classes so they can be restored later
    h2Elements.forEach((h2) => h2.classList.add("pb-2"));
    iconElements.forEach((icon) => icon.classList.add("pt-4"));
    mainHeadingElements.forEach((div) => div.classList.add("pb-2"));
    const style = document.createElement("style");
    style.setAttribute("data-custom", "pdf-styles");
    style.innerHTML = `
    #preview-section ul {
      list-style: none; /* Hides default markers */
      padding-left: 0;
    }

    #preview-section li {
      position: relative;
      padding-left: 1.5em; /* Spacing for custom marker */
    }

    #preview-section li::before {
      content: '• ';
      position: absolute;
      left: 0;
      top: -0.05em; /* Move the marker upwards */
    }
  `;

    // Append the style to the head to apply the styles dynamically
    document.head.appendChild(style);

    return targetElement;
  };

  const handleDownload = async () => {
    setLoading(true); // Show loader when download starts

    await handleFinish();
    try {
      const targetElement = await getTargetElement();
      const options = {
        resolution: Resolution.HIGH,
        canvas: { qualityRatio: 1 },
        overrides: { canvas: { useCORS: true } },
      };

      // Generate the PDF
      await generatePDF(() => targetElement, options);

      // Revert modifications by removing the added classes
      const h2Elements = targetElement.querySelectorAll(".border-b-2");
      const iconElements = targetElement.querySelectorAll(".pdf-icon");
      const mainHeadingElements =
        targetElement.querySelectorAll(".main-heading");
      h2Elements.forEach((h2) => h2.classList.remove("pb-2"));
      iconElements.forEach((icon) => icon.classList.remove("pt-4"));
      mainHeadingElements.forEach((div) => div.classList.remove("pb-2"));
      const styleElement = document.querySelector(
        'style[data-custom="pdf-styles"]'
      );
      if (styleElement) styleElement.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setLoading(false); // Hide loader
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
          headerColor,
          backgroundColorss,
        }}
      >
        <Meta
          title="ATSResume | Get hired with an ATS-optimized resume"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
          keywords="ATS-friendly, Resume optimization..."
        />

        {!isFinished && (
          <div className="flex">
            <LoadUnload />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <MyResume />
            </Modal>
            <div className="relative">
              {/* Toggle button for smaller screens */}
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 text-black bg-indigo-100 fixed top-4 left-4 z-50 rounded"
              >
                ☰
              </button>

              {/* Sidebar */}
              {/* <div
                className={`bg-white h-screen p-4 border-r border-gray-200 md:block fixed md:relative top-0 left-0 transition-transform duration-300 ease-in-out ${
                  isSidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full md:translate-x-0"
                }`}
              >
                <ul className="space-y-2 mt-4">
                  <li>
                    <Link
                      href=""
                      className="flex items-center p-2 bg-indigo-100 border-b-2 border-slate-900 font-semibold text-black"
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-10">🖥️</span>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/page"
                      className={getLinkClassName("/dashboard/page")}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">👤</span>
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="aibuilder"
                      className={getLinkClassName("/dashboard/aibuilder")}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">🤖</span>
                      <span>AI Resume Builder</span>
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      setIsModalOpen(true);
                      toggleSidebar();
                    }}
                  >
                    <span className="mx-2">📑</span>
                    <span>Resumes List</span>
                  </li>
                  <li>
                    <Link
                      href="notification"
                      className={getLinkClassName("/dashboard/notification")}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">🔔</span>
                      <span>Notifications</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="skilltest"
                      className={getLinkClassName("/dashboard/skilltest")}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">📝</span>
                      <span>Skill Test</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="addrefferal"
                      className={getLinkClassName("/dashboard/addrefferal")}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">👥</span>
                      <span>Add Referral</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="skillhistorylist"
                      className={getLinkClassName(
                        "/dashboard/skillhistorylist"
                      )}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">📊</span>
                      <span>Skill History</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="reffrerallistpage"
                      className={getLinkClassName(
                        "/dashboard/reffrerallistpage"
                      )}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">👥</span>
                      <span>Referral List</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="paymentpage"
                      className={getLinkClassName("/dashboard/paymentpage")}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">💳</span>
                      <span>Payment</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="password"
                      className={getLinkClassName("/dashboard/password")}
                      onClick={() => {
                        onClose();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">🔑</span>
                      <span>Change Password</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="flex items-center p-2 hover:bg-indigo-100 border-b-2 rounded font-semibold"
                      onClick={() => {
                        handleLogout();
                        toggleSidebar();
                      }}
                    >
                      <span className="mr-2">🔓</span>
                      <span>Log Out</span>
                    </Link>
                  </li>
                </ul>
              </div> */}
              <Sidebar />
            </div>
            <div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  className="rounded-lg border-2 bg-blue-950  w-full lg:w-40 text-white px-10 py-1"
                >
                  Previous
                </button>

                <aside
                  className={`h-full bg-gray-100 p-4  transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 ease-in-out`}
                >
                  <ul className="flex space-x-2 text-center">
                    {sections.map((section, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 cursor-pointer ${
                          currentSection === index
                            ? "rounded-lg border-2 border-blue-800 font-bold bg-blue-950 text-white px-10 py-1"
                            : "rounded-lg border-2 bg-white border-blue-800  text-blue-800 px-10 py-1"
                        }`}
                        onClick={() => handleSectionClick(index)}
                      >
                        {section.label}
                      </li>
                    ))}
                  </ul>
                </aside>
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-lg px-10 font-bold bg-blue-500 w-full lg:w-40 text-white p-1"
                >
                  {currentSection === sections.length - 1 ? "Finish" : "Next"}
                </button>
              </div>

              <div className="lg:flex justify-center bg-gray-200 p-2 px-5">
                {/* <button
                type="button"
                onClick={toggleSidebar}
                className="p-2 bg-blue-900 text-white rounded-lg"
              >
                {isSidebarOpen ? "☰" : "☰"}
              </button> */}
                {/* <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  className="rounded-lg border-2 bg-blue-950  w-full lg:w-40 text-white px-10 py-1"
                >
                  Previous
                </button> */}

                <div className="lg:flex gap- content-center  justify-between bg-gray-200 p-1 px-5 lg:block hidden">
                  <select
                    value={selectedFont}
                    onChange={handleFontChange}
                    className="rounded-lg border-2 border-blue-800 font-bold text-blue-800 lg:block hidden m-2  px-5 py-2  bg-white  "
                  >
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Poppins">Poppins</option>
                  </select>

                  <ColorPicker
                    selectedColor={headerColor}
                    onChange={setHeaderColor}
                  />
                  <ColorPickers
                    selectmultiplecolor={backgroundColorss}
                    onChange={setBgColor}
                  />
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                  />
                </div>

                {/* <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-lg px-10 font-bold bg-blue-500 w-full lg:w-40 text-white p-1"
                >
                  {currentSection === sections.length - 1 ? "Finish" : "Next"}
                </button> */}
              </div>

              <div
                className="flex flex-col md:flex-row md:mx-auto md:h-screen overflow-y-auto"
                style={{ fontFamily: selectedFont }}
              >
                {/* <div className="flex">
                <aside
                  className={` h-full bg-gray-100 p-4  z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
                >
                  <ul className="space-y-2 text-center">
                    {sections.map((section, index) => (
                      <li
                        key={index}
                        className={`p-2 cursor-pointer ${currentSection === index ? "rounded-3xl border-y-2 border-blue-800 font-bold bg-blue-950 text-white" : "border-2 bg-white border-blue-800 rounded-3xl text-blue-800"}`}
                        onClick={() => handleSectionClick(index)}
                      >
                        {section.label}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div> */}

                <form className=" p-3">
                  {sections[currentSection].component}
                </form>

                <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
                  <div className="bg-white lg:block hidden">
                    <Preview selectedTemplate={selectedTemplate} />
                  </div>
                </PDFExport>
              </div>
            </div>
          </div>
        )}
        {isFinished && (
          <div className="">
            <div className="lg:flex lg:justify-between  bg-gray-200 p-2 px-5">
              <div className="lg:flex  gap-4 flex-row justify-center bg-gray-200">
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="rounded-lg border-2 border-blue-800 lg:px-8 p-2 m-2 font-bold bg-white text-blue-800"
                >
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
                <ColorPicker
                  selectedColor={headerColor}
                  onChange={setHeaderColor}
                />
                <ColorPickers
                  selectmultiplecolor={backgroundColorss}
                  onChange={setBgColor}
                />
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                />
              </div>

              <button
                type="button"
                onClick={handleFinish}
                // disabled={isFinished} // Optional, disable if already finished
                className="bg-blue-950 text-white px-5 py-2 p-1  rounded-lg"
              >
                Save
              </button>

              {loading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64 align-middle text-white font-semibold text-lg">
                    Loading...
                  </div>
                </div>
              )}

              <button
                type="button"
                className="rounded-lg px-10 lg:ms-2 font-bold bg-blue-950 text-white p-1"
                onClick={handleDownload}
                disabled={loading}
              >
                Pay & Download
              </button>
              <button
                type="button"
                className="rounded-lg px-10 lg:ms-2 font-bold bg-blue-950 text-white p-1"
                onClick={handleBackToPrevious}
              >
                Back to previous
              </button>
            </div>

            <div className="overflow-y-auto md:h-screen mx-auto">
              {/* <PDFExport ref={pdfExportComponent} {...pdfExportOptions}> */}
              <div className="bg-white" style={{ fontFamily: selectedFont }}>
                <Preview selectedTemplate={selectedTemplate} />
              </div>
              {/* </PDFExport> */}
            </div>
          </div>
        )}
      </ResumeContext.Provider>
    </>
  );
}



export { ResumeContext };