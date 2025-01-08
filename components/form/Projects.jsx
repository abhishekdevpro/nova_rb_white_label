import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import React, { useContext, useState } from "react";
// import { ResumeContext } from "../../pages/builder";

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev);
  };

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
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
    const newProjects = [...resumeData.projects];
    const currentDate = newProjects[index][field] || "Aug,2020";
    const [_, year] = currentDate.split(",");
    const newMonth = e.target.value;
    newProjects[index][field] = `${newMonth},${year || ""}`;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const handleYearChange = (e, index, field) => {
    const newProjects = [...resumeData.projects];
    const currentDate = newProjects[index][field] || "Aug,2020";
    const [month, _] = currentDate.split(",");
    const newYear = e.target.value;
    newProjects[index][field] = `${month || ""},${newYear}`;
    setResumeData({ ...resumeData, projects: newProjects });
  };
  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...(resumeData.projects || []),
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "Aug,2020",
          endYear: "Jul,2024",
        
          
        },
      ],
    });
  };

  const removeProjects = (index) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects[index] = newProjects[newProjects.length - 1];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  };

  // Ensure resumeData.projects is defined before mapping over it
  return (
    <div className="flex-col-gap-2 mt-10 p-4">
      {/* <h2 className="input-title text-black text-3xl">Projects</h2> */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
          Projects
        </h2>
        <div className="relative">
          {resumeData.education_suggestions?.length > 0 && (
            <div
              className="text-red-500 font-medium cursor-pointer hover:text-red-600"
              onClick={toggleSuggestions} // Toggle on click
            >
              {`${resumeData.projects_suggestions.length} suggestions`}

              {showSuggestions && (
                <div className="absolute right-0 bottom-full mb-2 w-64 bg-white border border-red-200 rounded-lg shadow-lg p-4 z-10">
                  <div className="text-red-600 font-medium mb-2">
                    Suggested Improvements
                  </div>

                  <ul className="text-sm text-gray-800 list-disc pl-5">
                    {resumeData.projects_suggestions.map(
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
      {resumeData.projects && resumeData.projects.length > 0 ? (
        resumeData.projects.map((project, index) => (
          <div key={index} className="f-col">
            <input
              type="text"
              placeholder="Project Name"
              name="name"
              className="w-full other-input border-black border"
              value={project.name}
              onChange={(e) => handleProjects(e, index)}
            />
            <input
              type="text"
              placeholder="Link"
              name="link"
              className="w-full other-input border-black border"
              value={project.link}
              onChange={(e) => handleProjects(e, index)}
            />
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              className="w-full other-input border-black border h-32"
              value={project.description}
              maxLength="250"
              onChange={(e) => handleProjects(e, index)}
            />
            <textarea
              type="text"
              placeholder="Key Achievements"
              name="keyAchievements"
              className="w-full other-input border-black border h-40"
              value={project.keyAchievements}
              onChange={(e) => handleProjects(e, index)}
            />
            {/* <div className="flex-wrap-gap-2">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className="other-input"
                value={project.startYear}
                onChange={(e) => handleProjects(e, index)}
              />
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className="other-input"
                value={project.endYear}
                onChange={(e) => handleProjects(e, index)}
              />
            </div> */}
 <div className="">
            <label className="text-black">Start Date</label>
            <div className="flex-wrap-gap-2">
              <select
                className="border-black border other-input  flex-1"
                value={(project.startYear || "Aug,2020").split(",")[0]}
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
                value={(project.startYear || "Aug,2020").split(",")[1]}
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
                value={(project.endYear || "Jul,2024").split(",")[0]}
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
                value={(project.endYear || "Jul,2024").split(",")[1]}
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
          </div>
        ))
      ) : (
        <p>No projects available. Add a new project to get started.</p>
      )}
      <FormButton
        size={resumeData.projects ? resumeData.projects.length : 0}
        add={addProjects}
        remove={removeProjects}
      />
    </div>
  );
};

export default Projects;
// import React, { useContext } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { ResumeContext } from "../../pages/builder";
// import { Plus, Minus, Link as LinkIcon } from "lucide-react";

// const Projects = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   const quillModules = {
//     toolbar: [
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["clean"]
//     ]
//   };

//   const handleProjects = (e, index, isQuill = false) => {
//     const newProjects = [...(resumeData.projects || [])];
//     if (isQuill) {
//       newProjects[index][e.target] = e.value;
//     } else {
//       newProjects[index][e.target.name] = e.target.value;
//     }
//     setResumeData({ ...resumeData, projects: newProjects });
//   };

//   const addProjects = () => {
//     setResumeData({
//       ...resumeData,
//       projects: [
//         ...(resumeData.projects || []),
//         {
//           name: "",
//           link: "",
//           description: "",
//           keyAchievements: "",
//           startYear: "",
//           endYear: "",
//         },
//       ],
//     });
//   };

//   const removeProjects = (index) => {
//     const newProjects = [...(resumeData.projects || [])];
//     newProjects.splice(index, 1);
//     setResumeData({ ...resumeData, projects: newProjects });
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Projects</h2>
//       </div>

//       <div className="space-y-8">
//         {resumeData.projects && resumeData.projects.length > 0 ? (
//           resumeData.projects.map((project, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Project Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={project.name}
//                     onChange={(e) => handleProjects(e, index)}
//                     placeholder="Enter project name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Project Link
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <LinkIcon className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="url"
//                       name="link"
//                       className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       value={project.link}
//                       onChange={(e) => handleProjects(e, index)}
//                       placeholder="https://..."
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     name="startYear"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={project.startYear}
//                     onChange={(e) => handleProjects(e, index)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     name="endYear"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={project.endYear}
//                     onChange={(e) => handleProjects(e, index)}
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <ReactQuill
//                   theme="snow"
//                   value={project.description}
//                   onChange={(value) =>
//                     handleProjects({ target: "description", value }, index, true)
//                   }
//                   modules={quillModules}
//                   className="h-48 mb-12"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Key Achievements
//                 </label>
//                 <ReactQuill
//                   theme="snow"
//                   value={project.keyAchievements}
//                   onChange={(value) =>
//                     handleProjects(
//                       { target: "keyAchievements", value },
//                       index,
//                       true
//                     )
//                   }
//                   modules={quillModules}
//                   className="h-48 mb-12"
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => removeProjects(index)}
//                   className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   <Minus className="h-4 w-4 mr-2" />
//                   Remove Project
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
//             <p className="text-gray-600">
//               No projects available. Add a new project to get started.
//             </p>
//           </div>
//         )}
//       </div>

//       <div className="mt-6">
//         <button
//           type="button"
//           onClick={addProjects}
//           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Project
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Projects;
