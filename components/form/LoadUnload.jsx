
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// import { ResumeContext } from "../../pages/builder";
import { toast } from "react-toastify";
import DefaultResumeData from "../utility/DefaultResumeData";
import { ResumeContext } from "../context/ResumeContext";

const LoadUnload = () => {
  const { setResumeData } = useContext(ResumeContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [editingReady, setEditingReady] = useState(false);

  const router = useRouter();

  const fetchResumeDetails = async (resumeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://api.resumeintellect.com/api/user/resume-list/${resumeId}`, {
        headers: { Authorization: token },
      });

      const resumeData = response.data.data;
      if (!resumeData || !resumeData.file_path || !resumeData.ai_resume_parse_data) {
        console.error("Resume data not found in API response");
        return;
      }

      const parsedData = JSON.parse(resumeData.ai_resume_parse_data);
      setResumeData(parsedData.templateData);
      localStorage.setItem("resumeData", JSON.stringify(parsedData.templateData));
      localStorage.setItem("resumeId", resumeData.id);
      localStorage.setItem("location", resumeData.file_path);

      router.push(`/dashboard/aibuilder/${resumeData.id}`);
      setShowOverlay(false);
    } catch (error) {
      console.error("Error fetching resume details:", error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchResumeDetails(router.query.id);
    }

    const currentUrl = window.location.href;
    if (currentUrl.includes("dashboard/aibuilder/") && currentUrl.includes("t=success")) {
      setShowOverlay(false);
    }
  }, [router.query.id]);

  const handleBack = () => {
    router.back();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    setLoading(true);
    setShowLoadingAnimation(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://api.resumeintellect.com/api/user/resume-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          toast.info(`Upload progress: ${percentCompleted}%`);
        },
      });

      const resumeData = response.data.data[0];
      if (!resumeData || !resumeData.resume_parse_data) {
        toast.error("Resume data not found in API response");
        setLoading(false);
        setShowLoadingAnimation(false);
        return;
      }

      const parsedData = JSON.parse(resumeData.resume_parse_data);
      setResumeData(parsedData.templateData);
      localStorage.setItem("resumeData", JSON.stringify(parsedData.templateData));
      localStorage.setItem("resumeId", resumeData.id);
      localStorage.setItem("location", resumeData.file_path);

      toast.success("File uploaded successfully");
      setIsUploaded(true);
      setLoading(false);
      setShowLoadingAnimation(false);
      setEditingReady(true);
      setShowOverlay(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
      setLoading(false);
      setShowLoadingAnimation(false);
    }
  };

  const handleStartFromScratch = async () => {
    setShowLoadingAnimation(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.resumeintellect.com/api/user/resume-create",
        {},
        { headers: { Authorization: token } }
      );

      if (response.data && response.data.data) {
        const { id, file_path, ai_resume_parse_data } = response.data.data;

        const parsedData = JSON.parse(ai_resume_parse_data).templateData;

        setResumeData(DefaultResumeData);
        localStorage.setItem("resumeData", JSON.stringify(parsedData));
        localStorage.setItem("resumeId", id);
        localStorage.setItem("location", file_path);

        router.push(`/dashboard/aibuilder/${id}`);
        setShowLoadingAnimation(false);
        setEditingReady(true);
        setShowOverlay(false);
        toast.success("Started from scratch successfully!");
      } else {
        throw new Error("Invalid response data format");
      }
    } catch (error) {
      console.error("Error creating resume from scratch:", error);
      toast.error("Failed to start from scratch");
      setShowLoadingAnimation(false);
    }
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <>
      {/* Loading Animation Overlay */}
      {showLoadingAnimation && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-sm p-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>
          <div className="text-white text-center max-w-md">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6">Processing Your Resume</h3>
            <div className="space-y-4 text-base sm:text-lg md:text-xl">
              <p className="flex items-center justify-center gap-2">
                <span className="text-green-400">✓</span> Reading resume information
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-green-400">✓</span> Analyzing content
              </p>
              <p className="animate-pulse">Optimizing for industry standards...</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Upload Overlay */}
      {showOverlay && !isUploaded && !showLoadingAnimation && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden relative">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="absolute top-4 left-4 sm:top-6 sm:left-6 text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group"
            >
              <FaArrowLeft className="text-lg sm:text-xl group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden sm:inline font-medium">Back</span>
            </button>
            
            {/* Close Button */}
            <button
              onClick={closeOverlay}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-600 hover:text-red-600 transition-all duration-300"
            >
              <span className="text-xl font-medium hover:rotate-90 inline-block transition-transform duration-300">✕</span>
            </button>

            <div className="p-2 md:p-12">
              {!editingReady ? (
                <>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 mt-6 sm:mt-8 md:mt-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent text-center">
                    Lets Build Your Resume
                  </h1>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg text-center">
                    Choose how you like to get started
                  </p>

                  <div className=" flex flex-col lg:flex-row items-stretch justify-center gap-2 md:gap-6">
                    {/* Upload Option */}
                    <div className="flex-1 p-2 md:p-6  border-2 border-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:border-blue-200 ">
                      <div className="mb-4 sm:mb-6">
                        <FaCloudUploadAlt className="mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-blue-500" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Upload Existing Resume</h2>
                      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-center">
                        We will analyze your existing resume and help you enhance it with expert guidance
                      </p>

                      <div className="flex flex-col items-center gap-4">
                        <label className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg text-sm sm:text-base">
                          <span className="flex items-center gap-2">
                            <FaCloudUploadAlt className="text-lg sm:text-xl" />
                            Select PDF Resume
                          </span>
                          <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
                        </label>

                        <button
                          className={`w-full px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base
                            ${loading 
                              ? "bg-gray-400 cursor-not-allowed" 
                              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}`}
                          onClick={handleUpload}
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="animate-spin">⟳</span> Uploading...
                            </span>
                          ) : "Upload Resume"}
                        </button>
                      </div>
                    </div>

                    {/* Start Fresh Option */}
                    <div className="flex-1 md:p-6 p-2 border-2 border-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:border-blue-200">
                      <div className="mb-4 sm:mb-6">
                        <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Start Fresh</h2>
                      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-center">
                        Begin with a blank template and create your perfect resume from scratch
                      </p>
                      <button
                        onClick={handleStartFromScratch}
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg mt-8 sm:mt-12 text-sm sm:text-base"
                      >
                        Start from Scratch
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-blue-600">Ready to Edit!</h2>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg">Your resume is ready for customization</p>
                  <button
                    onClick={closeOverlay}
                    className="px-6 sm:px-8 py-2 sm:py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                  >
                    Start Editing
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
);


};

export default LoadUnload;