

import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import axios from "axios";

const Summary = () => {
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAIAssist = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const location = localStorage.getItem("location");

      const response = await axios.post(
        "https://api.resumeintellect.com/api/user/ai-resume-summery-data",
        {
          key: "resumesummery",
          keyword: "professional summery in manner of description",
          content: resumeData.position,
          file_location: location,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (
        response.data.status === "success" &&
        response.data.data?.resume_analysis?.professional_summary
      ) {
        setResumeData({
          ...resumeData,
          summary: response.data.data.resume_analysis.professional_summary,
        });
      } else {
        setError("Unable to generate summary. Please try again.");
      }
    } catch (error) {
      console.error("Error getting AI-assisted summary:", error);
      setError("An error occurred while generating the summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Safely access summary_suggestions with fallback to an empty array
  const summarySuggestions = resumeData.summary_suggestions || [];

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between mb-2">
          <h2 className="input-title text-black text-xl md:text-3xl">Summary</h2>
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
              <span className="flex items-center gap-2">Loading...</span>
            ) : (
              "+ AI Assist"
            )}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      </div>

      <div className="grid-1">
        <textarea
          placeholder="Enter your professional summary or use AI Assist to generate one"
          name="summary"
          className="w-full other-input h-80 border-black border p-4 rounded"
          value={resumeData.summary}
          onChange={handleChange}
          maxLength="500"
        />
        <div className="flex justify-between items-center mt-1">
          <div className="relative">
            {summarySuggestions.length > 0 && (
              <div
                className="text-red-500 font-medium cursor-pointer hover:text-red-600"
                onMouseEnter={() => setShowSuggestions(true)}
                onMouseLeave={() => setShowSuggestions(false)}
              >
                {`${summarySuggestions.length} suggestions`}

                {showSuggestions && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 bg-white border border-red-200 rounded-lg shadow-lg p-4 z-10">
                    <div className="text-red-600 font-medium mb-2">Suggested Improvements</div>

                    <div className="text-sm text-gray-800">
                      <ul className="space-y-2">
                        {summarySuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400 mt-2"></span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="absolute bottom-[-8px] left-4 w-4 h-4 bg-white border-b border-r border-red-200 transform rotate-45"></div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {resumeData.summary?.length || 0}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
