
import React, { useContext, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
const Education = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [showSuggestions, setShowSuggestions] = useState(false);

 
  const handleEducation = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index][name] = value;
    setResumeData({ ...resumeData, education: newEducation });
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
    const newEducation = [...resumeData.education];
    const currentDate = newEducation[index][field] || "Aug,2020";
    const [_, year] = currentDate.split(",");
    const newMonth = e.target.value;
    newEducation[index][field] = `${newMonth},${year || ""}`;
    setResumeData({ ...resumeData, education: newEducation });
  };

  const handleYearChange = (e, index, field) => {
    const newEducation = [...resumeData.education];
    const currentDate = newEducation[index][field] || "Aug,2020";
    const [month, _] = currentDate.split(",");
    const newYear = e.target.value;
    newEducation[index][field] = `${month || ""},${newYear}`;
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          school: "",
          degree: "",
          startYear: "Aug,2020",
          endYear: "Jul,2024",
          location: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...resumeData.education];
    newEducation.splice(index, 1);
    setResumeData({ ...resumeData, education: newEducation });
  };
  const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev);
  };

  

  return (
    <div className="flex flex-col gap-6 mt-10 px-4 sm:px-8 lg:px-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
          Education
        </h2>
        <div className="relative">
          {resumeData.education_suggestions?.length > 0 && (
            <div
              className="text-red-500 font-medium cursor-pointer hover:text-red-600"
              onClick={toggleSuggestions}
            >
              {`${resumeData.education_suggestions.length} suggestions`}
              {showSuggestions && (
                <div className="absolute top-12 right-0 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                                        <div className="text-red-600 font-medium mb-2">Suggested Improvements</div>

                  <ul className="text-sm text-gray-800 list-disc pl-5 py-2">
                    {resumeData.education_suggestions.map(
                      (suggestion, index) => (
                        <li key={index} className="mb-1">
                          {suggestion}
                        </li>
                      )
                    )}
                  </ul>
                  {/* Tooltip arrow */}
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-300 rotate-45 transform" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {resumeData.education.map((education, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          <input
            type="text"
            placeholder="School"
            name="school"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={education.school}
            onChange={(e) => handleEducation(e, index)}
          />
          <input
            type="text"
            placeholder="Degree"
            name="degree"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={education.degree}
            onChange={(e) => handleEducation(e, index)}
          />
          {/* <div className="flex flex-wrap gap-4">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={education.startYear}
              onChange={(e) => handleEducation(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={education.endYear}
              onChange={(e) => handleEducation(e, index)}
            />
          </div> */}
           <div className="">
            <label className="text-black">Start Date</label>
            <div className="flex-wrap-gap-2">
              <select
                className="border-black border other-input  flex-1"
                value={(education.startYear || "Aug,2020").split(",")[0]}
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
                value={(education.startYear || "Aug,2020").split(",")[1]}
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
                value={(education.endYear || "Jul,2024").split(",")[0]}
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
                value={(education.endYear || "Jul,2024").split(",")[1]}
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
            value={education.location}
            onChange={(e) => handleEducation(e, index)}
          />
          
        </div>
      ))}

<FormButton
        size={resumeData.education.length}
        add={addEducation}
        remove={removeEducation}
      />

    </div>
  );
}

export default Education;





