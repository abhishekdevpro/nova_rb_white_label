
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Edit } from "lucide-react";

import SidebarStrength from "./SidebarStrength";
import ResumeStrength from "./ResumeStrength";
// import { BASE_URL } from "../components/Constant/constant";
import Button from "../../components/ui/Button";
import FullPageLoader from "../../components/ResumeLoader/Loader";
import { useModal } from "../../hooks/useModal";
import FormModal from "../../components/ui/FormModal";
import { BASE_URL } from "../../components/Constant/constant.js";
import Navbar from "../Navbar/Navbar";

const Index = () => {
  // 🔹 State Management
  const [activeTab, setActiveTab] = useState(0);
  const [resumeStrength, setResumeStrength] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const [editedJobDescription, setEditedJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scaning, setScaning] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  // 🔹 Custom modal hook
  const EditJD = useModal();

  const tabs = ["Resume", "Job Description"];

  /**
   * Fetch resume strength and details
   */
  const getResumeStrength = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please login again.");
      return;
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/api/user/resume-list/${id}?lang=en`,
        {
          headers: { Authorization: token },
        }
      );

      if (res.data.code === 200 || res.data.status === "success") {
        const data = res.data.data;

        setResumeId(data.id);
        setResumeStrength(data);
        setJobDescription(data.job_description);

        // 🔹 If no job description exists, open modal automatically
        if (!data.job_description) {
          setEditedJobDescription("");
          EditJD.openModal();
        }
      }
    } catch (error) {
      console.error("❌ Error fetching resume strength:", error);
      toast.error("Failed to load resume details.");
    }
  };

  useEffect(() => {
    if (id) getResumeStrength();
  }, [id]);

  /**
   * Open the edit modal with current JD
   */
  const handleEditJobDescription = () => {
    setEditedJobDescription(jobDescription || "");
    EditJD.openModal();
  };

  /**
   * Save Job Description update
   */
  const handleSaveJobDescription = async () => {
    if (!editedJobDescription.trim()) {
      toast.error("Job description cannot be empty");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${BASE_URL}/api/user/resume-jobdescription/${resumeId}`,
        { job_description: editedJobDescription },
        {
          headers: { Authorization: token, "Content-Type": "application/json" },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setJobDescription(editedJobDescription);
        EditJD.closeModal();
        toast.success("Job description updated successfully");
      } else {
        toast.error(
          response.data.message || "Failed to update job description"
        );
      }
    } catch (error) {
      console.error("❌ Error updating job description:", error);
      toast.error(
        error.response?.data?.message || "Error updating job description"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Run Resume Match Analysis
   */
  const handleResumeMatchAnalysis = async () => {
    setScaning(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${BASE_URL}/api/user/resumes/${id}/scan`,
        { job_description: editedJobDescription },
        { headers: { Authorization: token } }
      );

      if (res.data?.code === 200 || res.data?.status === "success") {
        const data = res.data.data;
        setResumeId(data.id);
        setResumeStrength(data);
        setJobDescription(data.job_description);
        setActiveTab(0);
        EditJD.closeModal();
        toast.success("Resume Match analysis completed!");
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      console.error("❌ Error during Resume Match analysis:", error);
      toast.error("Error while performing analysis.");
    } finally {
      setScaning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-20">
              {resumeStrength ? (
                <SidebarStrength
                  resumeId={resumeId}
                  strengths={resumeStrength}
                />
              ) : (
                <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
                  Loading strengths...
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b bg-gray-50">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 text-md font-semibold transition-colors duration-200 ${
                      activeTab === index
                        ? "text-teal-600 border-b-2 border-teal-600 bg-white"
                        : "text-gray-500 hover:text-teal-600"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {activeTab === 0 ? (
                  resumeStrength ? (
                    <ResumeStrength strengths={resumeStrength} />
                  ) : (
                    <p className="text-gray-500">Loading resume details...</p>
                  )
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Job Description
                      </h2>
                      <Button
                        onClick={handleEditJobDescription}
                        startIcon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {jobDescription || "No job description provided."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Description Edit Modal */}
      {EditJD.isOpen && (
        <FormModal
          isOpen={EditJD.isOpen}
          onClose={EditJD.closeModal}
          onSubmit={handleResumeMatchAnalysis}
          title="Edit Your Job Description"
          submitText="Resume Analysis"
          cancelText="Close"
          canSubmit={!!editedJobDescription.trim()}
        >
          <textarea
            value={editedJobDescription}
            onChange={(e) => setEditedJobDescription(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter job description..."
          />
        </FormModal>
      )}

      {/* Loader for analysis */}
      {scaning && <FullPageLoader isLoading={scaning} mode="scanner" />}
    </div>
  );
};

export default Index;
