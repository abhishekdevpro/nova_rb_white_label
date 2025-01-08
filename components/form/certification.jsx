

import React, { useContext, useState } from "react";
// import { ResumeContext } from "../../pages/builder";
import { Plus, X, Award } from "lucide-react";
import { ResumeContext } from "../context/ResumeContext";

const Certification = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const skillType = "certifications";
  const [showSuggestions, setShowSuggestions] = useState(false);
  const toggleSuggestions = (e) => {
    e.preventDefault()
    setShowSuggestions((prev) => !prev);
  };

  const handleSkills = (e, index, skillType) => {
    const newSkills = [...resumeData[skillType]];
    newSkills[index] = e.target.value;
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    setResumeData({ ...resumeData, [skillType]: [...resumeData[skillType], ""] });
  };

  const removeSkill = (index) => {
    const newSkills = [...resumeData[skillType]];
    newSkills.splice(index, 1);
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const removeAllCertifications = () => {
    setResumeData({ ...resumeData, [skillType]: [] });
  };

  if (!resumeData[skillType] || resumeData[skillType].length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Certifications</h2>
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No certifications added yet</p>
            <button
              onClick={addSkill}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Certification
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-md p-2 md:p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Award className="h-6 w-6 text-blue-500" />
            Certifications
          </h2>
          <button
            onClick={addSkill}
            className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add 
          </button>
        </div>

        <div className="space-y-3 ">
          {resumeData[skillType].map((skill, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 transition-all duration-200"
            >
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Enter certification name"
                  value={skill}
                  onChange={(e) => handleSkills(e, index, skillType)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>
              <button
                onClick={() => removeSkill(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                aria-label="Remove certification"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {resumeData[skillType].length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center ">
              <button
                onClick={removeAllCertifications}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-all duration-200"
                aria-label="Remove all certifications"
              >
                <X className="h-4 w-4 mr-2" />
                Remove All Certifications
              </button>
              {resumeData.education_suggestions?.length > 0 && (
                <div className="relative">
                  <button
                    onClick={toggleSuggestions}
                    className="inline-flex items-center gap-2 px-4 py-2 text-red-600 rounded-full text-sm font-medium  transition-colors duration-200"
                  >
                    {resumeData.certifications_suggestions.length} Suggestions
                   
                  </button>

                  {showSuggestions && (
                    <div className="absolute right-0 bottom-full mb-2 w-72 bg-white border border-red-200 rounded-lg shadow-lg p-4 z-10">
                      <div className="text-red-600 font-medium mb-2">Suggested Improvements</div>
                      <ul className="space-y-2">
                        {resumeData.certifications_suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400 mt-2"></span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                      <div className="absolute bottom-[-8px] right-4 w-4 h-4 bg-white border-b border-r border-red-200 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;