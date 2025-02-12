import React, { useContext, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle, X } from "lucide-react";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Summary = () => {
  const { resumeData, setResumeData, resumeStrength } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const { improve} = router.query;

  const hasErrors = () => {
    return resumeStrength?.personal_summery_strenght?.suggestions !== null ||
           resumeStrength?.personal_summery_strenght?.summery !== null;
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

  const handleAIAssist = async () => {
    setLoading(true);
    setError(null);
    setSelectedSummaryIndex(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/user/ai-resume-summery-data",
        {
          key: "resumesummery",
          keyword: `professional summary in manner of description - ${Date.now()}`,
          content: resumeData.position,
          file_location: "",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (
        response.data.status === "success" &&
        response.data.data?.resume_analysis?.professional_summaries
      ) {
        setSummaries(response.data.data.resume_analysis.professional_summaries);
        setShowPopup(true);
      } else {
        setError("Unable to fetch summaries. Please try again.");
      }
    } catch (error) {
      console.error("Error getting AI summaries:", error);
      setError("An error occurred while fetching summaries. Please try again.");
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

  const handleQuillChange = (content) => {
    setResumeData({
      ...resumeData,
      summary: content,
    });
  };

  return (
    <div className="flex-col gap-3 w-full mt-10 px-10">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between mb-2 items-center">
          <div className="flex items-center gap-2">
            <h2 className="input-title text-black text-3xl">Summary</h2>
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
            onClick={handleAIAssist}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "+ Smart Assist"
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
                <span className="font-medium text-black">Summary Suggestions</span>
              </div>
              <button
                 onClick={() => setShowSuggestions(false)}
                className="text-black  transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {getSuggestions().map((msg, i) => (
              <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                <p className="text-black text-sm">{msg}</p>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>

      {/* ReactQuill Editor */}
      <div className="grid-1 w-full">
        <ReactQuill
          placeholder="Enter your professional summary or use Smart Assist to generate one"
          value={resumeData.summary || ""}
          onChange={handleQuillChange}
          className="w-full other-input h-100 border-black border rounded"
          theme="snow"
          modules={{
            toolbar: [["bold", "italic", "underline"], ["clean"]],
          }}
        />
        <div className="text-sm text-gray-500 mt-1 text-right">
          {resumeData.summary?.length || 0}/500
        </div>
      </div>

      {/* Popup/Modal for AI Summaries */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl">
            <h3 className="text-xl font-bold mb-4">Select a Summary</h3>
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
                Close
              </button>
              <button
                onClick={handleAddSummary}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                disabled={selectedSummaryIndex === null}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;