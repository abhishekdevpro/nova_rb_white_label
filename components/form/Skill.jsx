
import React, { useContext, useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import { ResumeContext } from "../context/ResumeContext";

const Skill = ({ title }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev);
  };

  const handleSkill = (e, index, title) => {
    const newSkills = [
      ...resumeData.skills.find((skillType) => skillType.title === title)
        ?.skills,
    ];
    newSkills[index] = e.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ),
    }));
  };

  const addSkill = (title) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills, ""];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const removeSkill = (title, index) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills];
      newSkills.splice(index, 1);
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const removeAllSkills = (title) => {
    setResumeData((prevData) => {
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: [] } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  if (!skillType || skillType.skills.length === 0) {
    return (
      <div className="">
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-900">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-600 mb-4">No skills added yet</p>
            <button
              onClick={() => addSkill(title)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Skill
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-end items-center p-2 relative">
          {resumeData.skills_suggestions?.length > 0 && (
            <div
              className="text-red-500 font-medium cursor-pointer hover:text-red-600"
              onClick={toggleSuggestions}
            >
              {`${resumeData.skills_suggestions.length} suggestions`}

              {showSuggestions && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                  <div className="text-gray-700 font-medium mb-2">
                    Suggested Improvements
                  </div>

                  <ul className="text-sm text-gray-600 list-disc pl-5">
                    {resumeData.skills_suggestions.map((suggestion, index) => (
                      <li key={index} className="mb-1">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute top-[-8px] right-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={() => addSkill(title)}
            className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {skillType.skills.map((skill, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 transition-all duration-200"
            >
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder={`Enter ${title.toLowerCase()}`}
                  value={skill}
                  onChange={(e) => handleSkill(e, index, title)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>
              <button
                onClick={() => removeSkill(title, index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                aria-label="Remove skill"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {skillType.skills.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => removeAllSkills(title)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-all duration-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove All Skills
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skill;