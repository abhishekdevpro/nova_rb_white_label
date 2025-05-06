import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "../Constant/constant";

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
import { useTranslation } from "react-i18next";
import { ResumeContext } from "../context/ResumeContext";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
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
  const [Loading, setLoading] = useState(false);
  const [improveBy, setImproveBy] = useState(null); // Track selected improvement option
  const router = useRouter();
  const { resumeData } = useContext(ResumeContext);
  const { t } = useTranslation();
  const { selectedLang } = useContext(ResumeContext);
  const formatItems = [
    {
      label: t("formatting.bullet_points"),
      value: improvements?.formatting?.bullet_points_used,
      description: t("formatting.bullet_points_desc"),
    },
    {
      label: t("formatting.clear_headings"),
      value: improvements?.formatting?.clear_headings,
      description: t("formatting.clear_headings_desc"),
    },
    {
      label: t("formatting.consistent_font"),
      value: improvements?.formatting?.consistent_font,
      description: t("formatting.consistent_font_desc"),
    },
    {
      label: t("formatting.contact_info"),
      value: improvements?.formatting?.contact_info_visible,
      description: t("formatting.contact_info_desc"),
    },
    {
      label: t("formatting.clear_exp"),
      value: improvements?.formatting?.clear_experience,
      description: t("formatting.clear_exp_desc"),
    },
    {
      label: t("formatting.clear_summary"),
      value: improvements?.formatting?.clear_summary,
      description: t("formatting.clear_summary_desc"),
    },
  ];

  const handleATS = async () => {
    // if (!improveBy) return; // Don't proceed if no option is selected

    const token = localStorage.getItem("token");

    setLoading(true); // Ensure loading is set to true when the request starts
    if (!resumeData.position) {
      toast.error(t("job_title_required"));
      return;
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/api/user/ats-improve/${resumeId}?improve_by=${improveBy}&lang=${selectedLang}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data) {
        toast.success(response.message || t("toast.ats_success"));
        onClose();
        // router.push('/dashboard')
        window.location.reload();
      } else {
        toast.error(t("toast.no_response"));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || t("toast.error"));
    } finally {
      setLoading(false); // Ensure loading is set to false after the request finishes
    }
  };

  return (
    <div className="h-[600px] overflow-y-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-col">
        {/* Improvements Section */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("improvements.title")}
          </h3>
          <ul className="space-y-3">
            {improvements?.areas_for_improvement?.file_format && (
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                <p className="text-gray-700">
                  <span className="font-bold text-black">
                    {t("improvements.file_format")}:{" "}
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
                    {t("improvements.keyword_optimization")}:{" "}
                  </span>
                  {improvements.areas_for_improvement.keyword_optimization}
                </p>
              </li>
            )}
            {improvements?.areas_for_improvement?.section_order && (
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                <p className="text-gray-700">
                  <span className="font-bold text-black">
                    {" "}
                    {t("improvements.sectionOrder")}{" "}
                  </span>
                  {improvements.areas_for_improvement.section_order}
                </p>
              </li>
            )}
          </ul>
        </div>

        {/* Formatting Checklist */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("formatting.title")}
          </h3>
          <ul className="grid grid-cols-2 gap-4">
            {formatItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg"
              >
                <div
                  className={`rounded-full p-1.5 ${
                    item.value
                      ? "bg-blue-100 text-blue-600"
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
        <div className="w-full md:w-1/2 p-4 bg-blue-100 text-blue-700 rounded-lg">
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
        <h3 className="text-lg font-bold">{t("overall_comments")}</h3>
        <p>{improvements?.overall_comments}</p>
      </div>
      {/* Improvement Option Selection */}
      {/* <div className="flex flex-col gap-2 mt-4">
        <h4 className="font-medium text-gray-800">
          Select Improvement Method:
        </h4>
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
      <button
        onClick={handleATS}
        className={`mt-6 px-6 py-2 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
          improvements.ats_score === 10 || Loading
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        disabled={improvements.ats_score === 10 || Loading}
      >
        {Loading ? (
          <SaveLoader loadingText={t("button.improve")} />
        ) : (
          t("button.improve")
        )}
      </button>
    </div>
  );
};

const ResumeStrength = ({ score, strength, resumeId }) => {
  console.log("ResumeStrength received props:", {
    score,
    strength,
    resumeId,
    strengthKeys: strength ? Object.keys(strength) : [],
    strengthValues: strength ? Object.entries(strength).map(([key, value]) => `${key}: ${value}`) : []
  });
  const { selectedLang } = useContext(ResumeContext);
  const [showLoader, setShowLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const getSectionsList = (data) => {
    console.log("getSectionsList received data:", data);
    if (!data) {
      console.log("No data provided to getSectionsList");
      return [];
    }

    const sections = [
      {
        name: t("resumeStrength.sections.personalInformation"),
        completed: Boolean(data.is_personal_info),
        score: Number(data.personal_score) || 0,
        max_score: 15,
        icon: User,
      },
      {
        name: t("resumeStrength.sections.socialLinks"),
        completed: Boolean(data.is_social),
        score: Number(data.social_score) || 0,
        max_score: 5,
        icon: Share2,
      },
      {
        name: t("resumeStrength.sections.personalSummary"),
        completed: Boolean(data.is_personal_summery),
        score: Number(data.personal_summery_score) || 0,
        max_score: 10,
        icon: FileText,
      },
      {
        name: t("resumeStrength.sections.education"),
        completed: Boolean(data.is_education),
        score: Number(data.education_score) || 0,
        max_score: 10,
        icon: GraduationCap,
      },
      {
        name: t("resumeStrength.sections.workHistory"),
        completed: Boolean(data.is_work_history),
        score: Number(data.work_history_score) || 0,
        max_score: 15,
        icon: Briefcase,
      },
      {
        name: t("resumeStrength.sections.projects"),
        completed: Boolean(data.is_project),
        score: Number(data.project_score) || 0,
        max_score: 15,
        icon: FolderGit2,
      },
      {
        name: t("resumeStrength.sections.skills"),
        completed: Boolean(data.is_skills),
        score: Number(data.skills_score) || 0,
        max_score: 10,
        icon: Code2,
      },
      {
        name: t("resumeStrength.sections.languages"),
        completed: Boolean(data.is_languages),
        score: Number(data.languages_score) || 0,
        max_score: 5,
        icon: Languages,
      },
      {
        name: t("resumeStrength.sections.certification"),
        completed: Boolean(data.is_certifications),
        score: Number(data.certifications_score) || 0,
        max_score: 5,
        icon: Award,
      },
      {
        name: "ATS",
        completed: Boolean(data.is_ats_friendly),
        score: Number(data.ats_score) || 0,
        max_score: 10,
        icon: Search,
      },
    ];

    console.log("Generated sections list:", sections);
    return sections;
  };

  const sectionsList = getSectionsList(strength || {});
  console.log("Final sectionsList:", sectionsList);

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 50) return "bg-blue-500";
    return "bg-red-600";
  };

  const handleImproveResume = async () => {
    if (!resumeId) return;

    setShowLoader(true);

    try {
      const token = localStorage.getItem("token");
      // Call the API before navigating
      const response = await axios.get(
        `${BASE_URL}/api/user/auto-improve/${resumeId}?lang=${selectedLang}`,
        {
          headers: {
            Authorization: token, // Ensure correct auth header
          },
        }
      );

      // If API request is successful, navigate to the AI Builder page
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setTimeout(() => {
          router.push({
            pathname: `/dashboard/aibuilder/${resumeId}`,
            query: { improve: "true" },
          });
        }, 5000);
      } else {
        toast.error("Failed to improve resume. Please try again.");
      }
    } catch (error) {
      console.error("Error improving resume:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Try again."
      );
    } finally {
      setShowLoader(false);
    }
  };

  // If no data is available, show a message
  if (!strength) {
    return (
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-gray-600 text-center">
          {t("resumeStrength.noData") || "No resume strength data available"}
        </p>
      </div>
    );
  }

  return (
    <>
      {showLoader && <FullScreenLoader />}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TooltipContent
          improvements={strength?.ats_strenght || {}}
          resumeId={resumeId}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
          {/* Left Side: Score Display */}
          <div className="w-full md:w-auto">
            <h2 className="text-xl font-semibold mb-1">
              {t("resumeStrength.resumeStrength")}
            </h2>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-semibold">
                {Number(score) || 0}%
              </span>
            </div>
          </div>

          {/* Right Side: Improve Buttons */}
          <div className="w-full md:w-auto flex flex-col items-start md:items-end">
            <h3 className="text-xl font-semibold mb-1">
              {t("resumeStrength.fixResume")}
            </h3>
            <p className="text-gray-600">
              {t("resumeStrength.foundErrors", {
                errors: Number(strength?.total_errors) || 0,
              })}
            </p>
            <p className="text-gray-600 mb-2">{t("resumeStrength.useTool")}</p>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={handleImproveResume}
                disabled={!resumeId}
                className={`w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                  !resumeId ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {t("resumeStrength.improveResume")}
              </button>
              <button
                disabled={!resumeId}
                onClick={() => setIsModalOpen(true)}
                className={`w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                  !resumeId ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {t("resumeStrength.improveATS")}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {sectionsList.map((section) => {
            const Icon = section.icon;
            const currentScore = Number(section.score) || 0;
            const scoreColor = getScoreColor(currentScore, section.max_score);
            const isATS = section.name === "ATS";

            return (
              <div
                key={section.name}
                className="flex items-center gap-4 relative"
                style={{ cursor: isATS ? "pointer" : "default" }}
              >
                <Icon className="w-5 h-5 text-gray-600 flex-shrink-0" />

                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {section.name}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {`${((currentScore / section.max_score) * 100).toFixed(0)}%`}
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
