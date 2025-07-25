import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  User,
  Share2,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Code2,
  Languages,
  Award,
  Search,
  Check,
  X,
  Circle,
} from "lucide-react";
import FullScreenLoader from "../ResumeLoader/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import { ResumeContext } from "../context/ResumeContext";
import ErrorPopup from "../utility/ErrorPopup";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const TooltipContent = ({ improvements, resumeId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [improveBy, setImproveBy] = useState(null); // Track selected improvement option
  const [errorPopup, setErrorPopup] = useState({
    show: false,
    message: "",
  });
  const router = useRouter();

  const formatItems = [
    {
      label: "Bullet Points Used",
      value: improvements?.formatting?.bullet_points_used,
      description: "Proper use of bullet points in resume sections",
    },
    {
      label: "Clear Headings",
      value: improvements?.formatting?.clear_headings,
      description: "Section headings are clear and well-defined",
    },
    {
      label: "Consistent Font",
      value: improvements?.formatting?.consistent_font,
      description: "Consistent font usage throughout the resume",
    },
    {
      label: "Contact Info Visible",
      value: improvements?.formatting?.contact_info_visible,
      description: "Contact information is clearly visible",
    },
    {
      label: "Clear Experience",
      value: improvements?.formatting?.clear_experience,
      description: "Work experience section is clearly structured and readable",
    },
    {
      label: "Clear Summary",
      value: improvements?.formatting?.clear_summary,
      description: "Summary section is well-written and clearly presented",
    },
  ];

  const handleATS = async () => {
    // if (!improveBy) return; // Don't proceed if no option is selected

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/user/ats-improve/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data) {
        toast.success(response.message || "ATS updated successfully");
        onClose();
        window.location.reload();
      } else {
        toast.error("No response data received");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data || "Something went wrong");
      if (error?.response?.status === 403) {
        setErrorPopup({
          show: true,
          message:
            error.response?.data?.message ||
            "Your API Limit is Exhausted. Please upgrade your plan.",
        });
      } else toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[600px] overflow-y-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Grid Layout for Improvements and Formatting Checklist */}
      <div className="flex flex-col">
        {/* Improvements Section */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {improvements?.areas_for_improvement?.file_format && (
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                <p className="text-gray-700">
                  <span className="font-bold text-black">
                    File Formatting:{" "}
                  </span>
                  {improvements.areas_for_improvement.file_format}
                </p>
              </li>
            )}
            {improvements?.areas_for_improvement?.keyword_optimization && (
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                <p className="text-gray-700">
                  <span className="font-bold text-black">
                    Keyword Optimization:{" "}
                  </span>
                  {improvements.areas_for_improvement.keyword_optimization}
                </p>
              </li>
            )}
            {improvements?.areas_for_improvement?.section_order && (
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                <p className="text-gray-700">
                  <span className="font-bold text-black">Section Order: </span>
                  {improvements.areas_for_improvement.section_order}
                </p>
              </li>
            )}
          </ul>
        </div>

        {/* Formatting Checklist */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Formatting Checklist
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formatItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg"
              >
                <div
                  className={`rounded-full p-1.5 ${
                    item.value
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.value ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-gray-700 font-medium">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Keywords Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-2 md:gap-6 mt-6">
        <div className="w-full md:w-1/2 p-4 bg-green-100 text-green-700 rounded-lg">
          <h4 className="font-bold text-lg">Keywords Found</h4>
          {improvements.keywords_found?.length > 0 ? (
            <ul className="list-disc list-inside">
              {improvements.keywords_found.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
            </ul>
          ) : (
            <p>No missing keywords</p>
          )}
        </div>
        <div className="w-full md:w-1/2 p-4 bg-red-100 text-red-700 rounded-lg">
          <h4 className="font-bold text-lg">Keywords Missing</h4>
          {improvements.keywords_missing?.length > 0 ? (
            <ul className="list-disc list-inside">
              {improvements.keywords_missing.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
            </ul>
          ) : (
            <p>No missing keywords</p>
          )}
        </div>
      </div>

      {/* Overall Comments */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mt-6 text-white">
        <h3 className="text-lg font-bold">Overall Comments</h3>
        <p>{improvements.overall_comments}</p>
      </div>

      {/* Improvement Option Selection */}
      {/* <div className="flex flex-col gap-2 mt-4">
        <h4 className="font-medium text-gray-800">Select Improvement Method:</h4>
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input
            type="radio"
            name="improveBy"
            value="jobtitle"
            checked={improveBy === "jobtitle"}
            onChange={() => setImproveBy("jobtitle")}
            className="text-blue-600 focus:ring-blue-500"
          />
          Improve by Job Title
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input
            type="radio"
            name="improveBy"
            value="overall"
            checked={improveBy === "overall"}
            onChange={() => setImproveBy("overall")}
            className="text-blue-600 focus:ring-blue-500"
          />
          Improve Overall
        </label>
      </div> */}

      {/* Submit Button */}
      <button
        onClick={handleATS}
        className={`mt-6 px-6 py-2 w-full bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
          improvements.ats_score === 10 || loading
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        disabled={improvements.ats_score === 10 || loading}
      >
        {loading ? (
          <SaveLoader loadingText="Proceed To Improve" />
        ) : (
          "Proceed To Improve...."
        )}
      </button>
      {errorPopup.show && (
        <ErrorPopup
          message={errorPopup.message}
          onClose={() => setErrorPopup({ show: false, message: "" })}
        />
      )}
    </div>
  );
};

const ResumeStrength = ({ score, strength, resumeId }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { resumeData } = useContext(ResumeContext);
  // console.log(resumeData,"resumeData");
  const getSectionsList = (data) => {
    if (!data) return [];
    return [
      {
        name: "Personal Information",
        completed: data.is_personal_info,
        score: data.personal_score,
        max_score: 15,
        icon: User,
      },
      {
        name: "Social Links",
        completed: data.is_social,
        score: data.social_score,
        max_score: 5,
        icon: Share2,
      },
      {
        name: "Personal Summary",
        completed: data.is_personal_summery,
        score: data.personal_summery_score,
        max_score: 10,
        icon: FileText,
      },
      {
        name: "Education",
        completed: data.is_education,
        score: data.education_score,
        max_score: 10,
        icon: GraduationCap,
      },
      {
        name: "Work History",
        completed: data.is_work_history,
        score: data.work_history_score,
        max_score: 15,
        icon: Briefcase,
      },
      {
        name: "Projects",
        completed: data.is_project,
        score: data.project_score,
        max_score: 15,
        icon: FolderGit2,
      },
      {
        name: "Skills",
        completed: data.is_skills,
        score: data.skills_score,
        max_score: 10,
        icon: Code2,
      },
      {
        name: "Languages",
        completed: data.is_languages,
        score: data.languages_score,
        max_score: 5,
        icon: Languages,
      },
      {
        name: "Certification",
        completed: data.is_certifications,
        score: data.certifications_score,
        max_score: 5,
        icon: Award,
      },
      {
        name: "ATS",
        completed: data.is_ats_friendly,
        score: data.ats_score,
        max_score: 10,
        icon: Search,
      },
    ];
  };

  const handleImproveResume = () => {
    setShowLoader(true);
    setTimeout(() => {
      router.push({
        pathname: `/dashboard/aibuilder/${resumeId}`,
        query: { improve: "true" },
      });
    }, 5000);
  };

  const sectionsList = getSectionsList(strength);

  const getScoreColor = (name, score, maxScore) => {
    const percentage = (score / maxScore) * 100;

    if (name === "ATS") {
      return percentage >= 50 ? "bg-green-500" : "bg-red-600";
    }

    return percentage >= 70 ? "bg-green-500" : "bg-red-600";
  };

  return (
    <>
      {showLoader && <FullScreenLoader />}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TooltipContent
          improvements={strength.ats_strenght}
          resumeId={resumeId}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex flex-col gap-2 md:flex-row  justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Resume Strength</h2>
            <div className="flex items-center gap-2">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-semibold">
                {score}%
              </span>
            </div>
          </div>

          <div className="flex flex-col item-start md:items-end">
            <h3 className="text-xl font-semibold mb-1">Fix Resume</h3>
            <p className="text-gray-600">
              We found{" "}
              <span className="font-bold font-lg text-red-400">
                {strength?.total_errors || 0} errors
              </span>{" "}
              in your resume.
            </p>
            <p className="text-gray-600 mb-2">
              Use our Resume Check tool to fix them.
            </p>
            <div className="flex flex-col md:flex-row gap-2">
              <button
                onClick={handleImproveResume}
                disabled={!resumeId}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                  !resumeId ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Improve Resume
              </button>
              {/* <button
                disabled={
                  strength.ats_score === 10  || !resumeId
                }
                onClick={() => {
                  if (!resumeData.position) {
                    toast.error("Job title is required");
                    return;
                  }
                  setIsModalOpen(true);
                }}
                className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
                  strength.ats_score === 10 || !resumeId
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Improve ATS
              </button> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectionsList.map((section) => {
            const Icon = section.icon;
            const currentScore = section.score || 0;
            const scoreColor = getScoreColor(
              section.name,
              currentScore,
              section.max_score
            );
            const isATS = section.name === "ATS";

            return (
              <div
                key={section.name}
                className="flex items-center gap-4 relative"
                // onClick={() => isATS && setIsModalOpen(true)}
                style={{ cursor: isATS ? "pointer" : "default" }}
              >
                <Icon className="w-5 h-5 text-gray-600 flex-shrink-0" />

                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {section.name}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {`${((currentScore / section.max_score) * 100).toFixed(
                        0
                      )} %`}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${scoreColor}`}
                      style={{
                        width: `${(currentScore / section.max_score) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResumeStrength;
