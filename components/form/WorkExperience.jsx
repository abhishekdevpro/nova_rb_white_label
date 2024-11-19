
import React, { useContext, useState } from "react";
import FormButton from "./FormButton";
import { ResumeContext } from "../../pages/builder";
import axios from 'axios';

const WorkExperience = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem("token")

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
        },
      ],
    });
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
      const response = await axios.post('https://api.novajobs.us/api/user/ai-resume-profexp-data', {
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
    <div className="flex-col-gap-2">
      <h2 className="input-title text-black text-3xl">Work Experience</h2>
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
          <div className="flex-wrap-gap-2">
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
          </div>
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