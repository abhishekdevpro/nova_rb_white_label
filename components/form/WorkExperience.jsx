
// import React, { useContext, useState } from "react";
// import FormButton from "./FormButton";
// import { ResumeContext } from "../../pages/builder";
// import axios from 'axios';
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const quillModules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ align: [] }],
//   ],
// };

// const WorkExperience = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   const [searchValue, setSearchValue] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const token = localStorage.getItem("token")

//   const handleWorkExperience = (e, index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index][e.target.name] = e.target.value;
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const addWorkExperience = () => {
//     setResumeData({
//       ...resumeData,
//       workExperience: [
//         ...resumeData.workExperience,
//         {
//           company: "",
//           position: "",
//           description: "",
//           keyAchievements: "",
//           startYear: "",
//           endYear: "",
//         },
//       ],
//     });
//   };

//   const removeWorkExperience = (index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index] = newWorkExperience[newWorkExperience.length - 1];
//     newWorkExperience.pop();
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const handleAIAssist = async (index) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post('https://api.novajobs.us/api/user/ai-resume-profexp-data', {
//         key: "professional_experience",
//         keyword: "Genrate professional summary and Checklist of professional experience in manner of content and information",
//         content: resumeData.workExperience[index].position,
//       },{
//         headers:{
//           Authorization:token
//         }
//       });
      
//       handleDescriptionChange(response.data.data.resume_analysis.professional_summary, index);
//       handleResponsibilitiesChange(response.data.data.resume_analysis.responsibilities, index);

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDescriptionChange = (value, index) => {
//     handleWorkExperience({ target: { name: 'description', value } }, index);
//   };

//   const handleResponsibilitiesChange = (responsibilities, index) => {
//     handleWorkExperience({ target: { name: 'keyAchievements', value: responsibilities.join('\n') } }, index);
//   };

//   return (
//     <div className="flex-col-gap-2">
//       <h2 className="input-title text-black text-3xl">Work Experience</h2>
//       {resumeData.workExperience.map((workExperience, index) => (
//         <div key={index} className="f-col">
//           <label className="mt-2">Company</label>
//           <input
//             type="text"
//             placeholder="Company"
//             name="company"
//             className="w-full other-input border-black border"
//             value={workExperience.company}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <label className="mt-2">Job Title</label>
//           <input
//             type="text"
//             placeholder="Job Title"
//             name="position"
//             className="w-full other-input border-black border"
//             value={workExperience.position}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <div className="flex-wrap-gap-2">
//             <input
//               type="date"
//               placeholder="Start Year"
//               name="startYear"
//               className="other-input border-black border"
//               value={workExperience.startYear}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//             <input
//               type="date"
//               placeholder="End Year"
//               name="endYear"
//               className="other-input border-black border"
//               value={workExperience.endYear}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//           </div>
//           <div className="flex justify-between mb-2">
//             <label className="mt-2">Description</label>
//             <button
//               type="button"
//               className="border bg-black text-white px-3 rounded-3xl"
//               onClick={() => handleAIAssist(index)}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Loading...' : '+ AI Assist'}
//             </button>
//           </div>
//           {/* <textarea
//             type="text"
//             placeholder="Description"
//             name="description"
//             className="w-full other-input border-black border h-32"
//             value={workExperience.description}
//             maxLength="250"
//             onChange={(e) => handleWorkExperience(e, index)}
//           /> */}
//            <ReactQuill
//         placeholder="Description"
//         name="description"
//         className="w-full other-input border-black border h-32"
//         value={workExperience.description}
//         modules={quillModules}
//         onChange={(content) => handleWorkExperience({ target: { name: "description", value: content } }, index)}
//       />
         
         
//           <label className="mt-2">Key Achievements</label>
//           <ReactQuill
//             type="text"
//             placeholder="Key Achievements"
//             name="keyAchievements"
//             className="w-full other-input border-black border h-40"
//             value={workExperience.keyAchievements}
//             onChange={(e) => handleWorkExperience(e, index)}
//             modules={quillModules}
//           />
//         </div>
//       ))}
//       <FormButton
//         size={resumeData.workExperience.length}
//         add={addWorkExperience}
//         remove={removeWorkExperience}
//       />
//     </div>
//   );
// };

// export default WorkExperience;



import React, { useContext, useState } from "react";
import FormButton from "./FormButton";
import { ResumeContext } from "../../pages/builder";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ],
};

const WorkExperience = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index][name] = value;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleAIAssist = async (index) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const requestBody = {
      key: "professional_experience",
      keyword:
        "Generate professional summary and checklist of professional experience in a manner of content and information",
      content: resumeData.workExperience[index].position,
    };

    try {
      const response = await axios.post(
        "https://api.novajobs.us/api/user/ai-resume-profexp-data",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (
        response.data.status === "success" &&
        response.data.data?.resume_analysis
      ) {
        const { professional_summary, responsibilities } =
          response.data.data.resume_analysis;

        handleChange("description", professional_summary, index);
        handleChange(
          "keyAchievements",
          responsibilities.join("\n"),
          index
        );

        toast.success("AI Assistance successful!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get AI Assistance.");
    } finally {
      setLoading(false);
    }
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
    newWorkExperience.splice(index, 1);
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
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
            onChange={(e) =>
              handleChange(e.target.name, e.target.value, index)
            }
          />
          <label className="mt-2">Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className="w-full other-input border-black border"
            value={workExperience.position}
            onChange={(e) =>
              handleChange(e.target.name, e.target.value, index)
            }
          />
          <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="other-input border-black border"
              value={workExperience.startYear}
              onChange={(e) =>
                handleChange(e.target.name, e.target.value, index)
              }
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="other-input border-black border"
              value={workExperience.endYear}
              onChange={(e) =>
                handleChange(e.target.name, e.target.value, index)
              }
            />
          </div>
          <div className="flex justify-between mb-2">
            <label className="mt-2">Description</label>
            <button
              type="button"
              className="border bg-black text-white px-3 rounded-3xl"
              onClick={() => handleAIAssist(index)}
              disabled={loading}
            >
              {loading ? "Loading..." : "+ AI Assist"}
            </button>
          </div>
          <div className="w-full max-w-[23rem]">
            <ReactQuill
              placeholder="Description"
              name="description"
              className="w-full other-input border-black border h-auto"
              value={workExperience.description}
              onChange={(value) => handleChange("description", value, index)}
              modules={quillModules}
            />
            
          </div>
          <label className="mt-2">Key Achievements</label>
          <div className="w-full max-w-[23rem]">
            <ReactQuill
              placeholder="Key Achievements"
              name="keyAchievements"
              className="w-full other-input border-black border h-auto"
              value={workExperience.keyAchievements}
              onChange={(value) =>
                handleChange("keyAchievements", value, index)
              }
              modules={quillModules}
            />
          </div>
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
