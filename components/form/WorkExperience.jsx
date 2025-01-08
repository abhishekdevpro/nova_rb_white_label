
import React, { useContext, useState } from "react";
import FormButton from "./FormButton";
// import { ResumeContext } from "../context/ResumeContext";
import axios from 'axios';
import { ResumeContext } from "../context/ResumeContext";

const WorkExperience = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem("token")
   const [showSuggestions, setShowSuggestions] = useState(false);
   const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev);
  };

  const handleWorkExperience = (e, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
          startYear: "Aug,2020",
          endYear: "Jul,2024",
          location: "",
        },
      ],
    });
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleMonthChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const currentDate = newWorkExperience[index][field] || "Aug,2020";
    const [_, year] = currentDate.split(",");
    const newMonth = e.target.value;
    newWorkExperience[index][field] = `${newMonth},${year || ""}`;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };
  
  const handleYearChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const currentDate = newWorkExperience[index][field] || "Aug,2020";
    const [month, _] = currentDate.split(",");
    const newYear = e.target.value;
    newWorkExperience[index][field] = `${month || ""},${newYear}`;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };
  

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index] = newWorkExperience[newWorkExperience.length - 1];
    newWorkExperience.pop();
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleAIAssist = async (index) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://api.resumeintellect.com/api/user/ai-resume-profexp-data', {
        key: "professional_experience",
        keyword: "Genrate professional summary and Checklist of professional experience in manner of content and information",
        content: resumeData.workExperience[index].position,
      },{
        headers:{
          Authorization:token
        }
      });
      
      handleDescriptionChange(response.data.data.resume_analysis.professional_summary, index);
      handleResponsibilitiesChange(response.data.data.resume_analysis.responsibilities, index);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDescriptionChange = (value, index) => {
    handleWorkExperience({ target: { name: 'description', value } }, index);
  };

  const handleResponsibilitiesChange = (responsibilities, index) => {
    handleWorkExperience({ target: { name: 'keyAchievements', value: responsibilities.join('\n') } }, index);
  };

  return (
    <div className="flex-col-gap-2 p-2">
      <div className="flex justify-between items-center">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
        Work Experience
      </h2>
      <div className="relative">
              {resumeData.education_suggestions?.length > 0 && (
                <div
                  className="text-red-500 font-medium cursor-pointer hover:text-red-600"
                  onClick={toggleSuggestions} // Toggle on click
                >
                  {`${resumeData.workExperience_suggestions.length} suggestions`}

                  {showSuggestions && (
                    <div className="absolute right-0 bottom-full mb-2 w-64 bg-white border border-red-200 rounded-lg shadow-lg p-4 z-10">
                                            <div className="text-red-600 font-medium mb-2">Suggested Improvements</div>

                      <ul className="text-sm text-gray-800 list-disc pl-5">
                        {resumeData.workExperience_suggestions.map(
                          (suggestion, index) => (
                            <li key={index} className="mb-1">
                              {suggestion}
                            </li>
                          )
                        )}
                      </ul>
                      <div className="absolute bottom-[-8px] right-4 w-4 h-4 bg-white border-b border-r border-red-200 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
      </div>


      {resumeData.workExperience.map((workExperience, index) => (
        <div key={index} className="f-col">
          <label className="mt-2">Company</label>
          <input
            type="text"
            placeholder="Company"
            name="company"
            className="w-full other-input border-black border"
            value={workExperience.company}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <label className="mt-2">Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className="w-full other-input border-black border"
            value={workExperience.position}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          {/* <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="other-input border-black border"
              value={workExperience.startYear}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="other-input border-black border"
              value={workExperience.endYear}
              onChange={(e) => handleWorkExperience(e, index)}
            />
          </div> */}
            <div className="">
  <label className="text-black">Start Date</label>
  <div className="flex-wrap-gap-2">
    <select
      className="border-black border other-input flex-1"
      value={(workExperience.startYear || "Aug,2020").split(",")[0]}
      onChange={(e) => handleMonthChange(e, index, "startYear")}
    >
      <option value="">Month</option>
      {months.map((month, idx) => (
        <option key={idx} value={month}>
          {month}
        </option>
      ))}
    </select>
    <select
      className="other-input border-black border flex-1"
      value={(workExperience.startYear || "Aug,2020").split(",")[1]}
      onChange={(e) => handleYearChange(e, index, "startYear")}
    >
      <option value="">Year</option>
      {years.map((year, idx) => (
        <option key={idx} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
  <label className="text-black">End Date</label>
  <div className="flex-wrap-gap-2">
    <select
      className="other-input border-black border flex-1"
      value={(workExperience.endYear || "Jul,2024").split(",")[0]}
      onChange={(e) => handleMonthChange(e, index, "endYear")}
    >
      <option value="">Month</option>
      {months.map((month, idx) => (
        <option key={idx} value={month}>
          {month}
        </option>
      ))}
    </select>
    <select
      className="other-input border-black border flex-1"
      value={(workExperience.endYear || "Jul,2024").split(",")[1]}
      onChange={(e) => handleYearChange(e, index, "endYear")}
    >
      <option value="">Year</option>
      {years.map((year, idx) => (
        <option key={idx} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
</div>

          <label className="mt-2 text-black">Location</label>
          <input
            type="text"
            placeholder="Location"
            name="location"
            className="w-full other-input border-black border"
            value={workExperience.location}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <div className="flex justify-between mb-2">
            <label className="mt-2">Description</label>
            <button
              type="button"
              className="border bg-black text-white px-3 rounded-3xl"
              onClick={() => handleAIAssist(index)}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : '+ AI Assist'}
            </button>
          </div>
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            className="w-full other-input border-black border h-32"
            value={workExperience.description}
            maxLength="250"
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <label className="mt-2">Key Achievements</label>
          <textarea
            type="text"
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full other-input border-black border h-40"
            value={workExperience.keyAchievements}
            onChange={(e) => handleWorkExperience(e, index)}
          />
        </div>
      ))}
      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />
    </div>
  );
};

export default WorkExperience;

