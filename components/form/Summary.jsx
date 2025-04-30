import React, { useContext, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle, Loader, Loader2, X } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constant/constant";
import { useTranslation } from "react-i18next";
import ErrorPopup from "../utility/ErrorPopUp";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Summary = () => {
  const {
    resumeData,
    setResumeData,
    resumeStrength,
    setResumeStrength,
    selectedLang,
  } = useContext(ResumeContext);
  const { i18n, t } = useTranslation();

  const language = i18n.language;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAutoFixLoading, setIsAutoFixLoading] = useState(false);
  const router = useRouter();
  const { id, improve } = router.query;
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [errorPopup, setErrorPopup] = useState({
    show: false,
    message: "",
  });
  // console.log(resumeStrength.personal_summery_strenght.summery, ">>>>");
  const hasErrors = () => {
    return (
      resumeStrength?.personal_summery_strenght?.suggestions !== null ||
      resumeStrength?.personal_summery_strenght?.summery !== null
    );
  };

  const getSuggestions = () => {
    const suggestions = [];
    if (resumeStrength?.personal_summery_strenght?.suggestions) {
      suggestions.push(resumeStrength.personal_summery_strenght.suggestions);
    }
    if (resumeStrength?.personal_summery_strenght?.summery) {
      suggestions.push(resumeStrength.personal_summery_strenght.summery);
    }
    return suggestions;
  };

  const handleAutoFix = async () => {
    if (!resumeData.summary) return;

    setIsAutoFixLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/user/ai-summery?lang=${language}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: "summary",
            keyword: "auto improve",
            content: resumeData.summary,
            job_title: resumeData.position,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data.resume_analysis) {
          const updatedSummary = data.data.resume_analysis.professional_summary;

          if (updatedSummary) {
            setResumeData({
              ...resumeData,
              summary: updatedSummary,
            });

            // Clear errors
            if (resumeStrength?.personal_summery_strenght) {
              const updatedStrength = {
                ...resumeStrength,
                personal_summery_strenght: {
                  suggestions: null,
                  summery: null,
                },
              };
              setResumeStrength(updatedStrength);
            }
            setShowSuggestions(false);
          }
        }
      }
    } catch (error) {
      console.error("Error auto-fixing summary:", error);
    } finally {
      setIsAutoFixLoading(false);
    }
  };

  // const handleAIAssist = async () => {
  //   setLoading(true);
  //   setError(null);
  //   setSelectedSummaryIndex(null);

  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       `${BASE_URL}/api/user/ai-resume-summery-data/${id}?lang=${language}`,
  //       {
  //         key: "resumesummery",
  //         keyword: `professional summary in manner of description - ${Date.now()}`,
  //         content: resumeData.position,
  //         file_location: "",
  //         lang: selectedLang,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     if (
  //       response.data.status === "success" &&
  //       response.data.data?.resume_analysis?.professional_summaries
  //     ) {
  //       setSummaries(
  //         response.data.data.resume_analysis.professional_summaries || []
  //       );
  //       setShowPopup(true);
  //     } else {
  //       setError("Unable to fetch summaries. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error getting AI summaries:", error);
  //     // setError("An error occurred while fetching summaries. Please try again.");
  //     const errorMessage =
  //       error?.response?.data?.message ||
  //       "An error occurred while fetching summaries.";

  //     toast.error(errorMessage); // show toast with API message
  //     setError(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleAIAssist = async () => {
    setLoading(true);
    setError(null);
    setSelectedSummaryIndex(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/user/ai-resume-summery-data/${id}?lang=${language}`,
        {
          key: "resumesummery",
          keyword: `professional summary in manner of description - ${Date.now()}`,
          content: resumeData.position,
          file_location: "",
          lang: selectedLang,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const { status, message, data } = response.data;

      if (
        status === "success" &&
        data?.resume_analysis?.professional_summaries
      ) {
        setSummaries(data.resume_analysis.professional_summaries || []);
        setShowPopup(true);
        toast.success(message || "AI summaries fetched successfully.");
      } else {
        const fallbackMessage =
          message || "Unable to fetch summaries. Please try again.";
        toast.error(fallbackMessage);
        setError(fallbackMessage);
      }
    } catch (error) {
      console.error("Error getting AI summaries:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while fetching summaries.";
      toast.error(errorMessage);
      setErrorPopup({
        show: true,
        message:
          error.response?.data?.message ||
          "Your API Limit is Exhausted. Please upgrade your plan.",
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarySelect = (index) => {
    setSelectedSummaryIndex(index);
  };

  const handleAddSummary = () => {
    if (selectedSummaryIndex !== null) {
      setResumeData({
        ...resumeData,
        summary: summaries[selectedSummaryIndex],
      });
      setShowPopup(false);
    }
  };

  // const handleQuillChange = (content) => {
  //   setResumeData({
  //     ...resumeData,
  //     summary: content,
  //   });
  // };
  const handleQuillChange = (content) => {
    const plainText = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    if (plainText.length <= 1000) {
      setResumeData({
        ...resumeData,
        summary: content,
      });
      setLimitExceeded(false);
    } else {
      // Limit reached, cut off extra characters
      const allowedText = plainText.substring(0, 1000);
      setResumeData({
        ...resumeData,
        summary: allowedText,
      });
      setLimitExceeded(true);
    }
  };

  return (
    <div className="flex-col gap-3 w-full mt-10 px-10">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between mb-2 items-center">
          <div className="flex items-center gap-2">
            <h2 className="input-title text-black text-3xl">
              {t("resumeStrength.sections.personalSummary")}
            </h2>
            {improve && hasErrors() && (
              <button
                type="button"
                className="text-red-500 hover:text-red-600 transition-colors"
                onClick={() => setShowSuggestions(!showSuggestions)}
                aria-label="Show suggestions"
              >
                <AlertCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          <button
            type="button"
            className={`border px-4 py-2 rounded-3xl transition-colors ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={() => {
              if (resumeData?.position) {
                handleAIAssist();
              } else {
                toast.error(t("error.jobTitleRequired"));
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader />
                {t("loading")}
              </span>
            ) : (
              t("smartAssist")
            )}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* Suggestions Tooltip */}
        {showSuggestions && hasErrors() && (
          <div className="absolute z-50 left-8 mt-10 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="font-medium text-black">
                    Summary Suggestions
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAutoFix}
                    disabled={isAutoFixLoading}
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAutoFixLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      t("summarypersonal.suggestions.autoFix")
                    )}
                  </button>
                  <button
                    onClick={() => setShowSuggestions(false)}
                    className="text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              {/* {getSuggestions().map((msg, i) => (
                <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                  <p className="text-black text-sm">{msg}</p>
                </div>
              ))} */}
              <ul className="space-y-3">
                {resumeStrength.personal_summery_strenght.summery.map(
                  (msg, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></span>
                      <p className="text-black text-sm">{msg}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ReactQuill Editor */}
      <div className="grid-1 w-full">
        <ReactQuill
          placeholder={t("summary.placeholder")}
          value={resumeData.summary || ""}
          onChange={handleQuillChange}
          className="w-full other-input h-100 border-black border rounded"
          theme="snow"
          modules={{
            toolbar: [["bold", "italic", "underline"], ["clean"]],
          }}
        />

        <div className="text-sm text-gray-500 mt-1 text-right">
          {t("summary.charCount", {
            count: resumeData.summary?.replace(/<[^>]*>/g, "").length || 0,
          })}
        </div>

        {limitExceeded && (
          <div className="text-red-500 text-sm mt-1">
            {t("summary.charLimitExceeded") ||
              "Only 1000 characters are allowed."}
          </div>
        )}
      </div>

      {/* Popup/Modal for AI Summaries */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl">
            <h3 className="text-xl font-bold mb-4">
              {t("popup.selectSummary")}
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {summaries.map((summary, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="summary"
                    checked={selectedSummaryIndex === index}
                    onChange={() => handleSummarySelect(index)}
                    className="mt-1"
                  />
                  <p className="text-gray-800">{summary}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                {t("popup.close")}
              </button>
              <button
                onClick={handleAddSummary}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                disabled={selectedSummaryIndex === null}
              >
                {t("popup.add")}
              </button>
            </div>
          </div>
        </div>
      )}
      {errorPopup.show && (
        <ErrorPopup
          message={errorPopup.message}
          onClose={() => setErrorPopup({ show: false, message: "" })}
        />
      )}
    </div>
  );
};

export default Summary;
