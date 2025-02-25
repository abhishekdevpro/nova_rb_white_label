// // import React, { useContext } from "react";
// // import { ResumeContext } from "../../pages/builder";
// // import FormButton from "./FormButton";

// // const Language = () => {
// //   const { resumeData, setResumeData } = useContext(ResumeContext);
// //   const skillType = "languages";
// //   const title = "Languages";
// //   const placeholder = "Language";

// //   const handleSkills = (e, index, skillType) => {
// //     const newSkills = [...resumeData[skillType]];
// //     newSkills[index] = e.target.value;
// //     setResumeData({ ...resumeData, [skillType]: newSkills });
// //   };

// //   const addSkill = () => {
// //     setResumeData({ ...resumeData, [skillType]: [...resumeData[skillType], ""] });
// //   };

// //   const removeSkill = (index) => {
// //     const newSkills = [...resumeData[skillType]];
// //     newSkills.splice(-1, 1);
// //     setResumeData({ ...resumeData, [skillType]: newSkills });
// //   };

// //   return (
// //     <div className="flex-col-gap-3 w-full mt-10 px-10">
// //       <h2 className="input-title text-white  text-3xl">
// //         {title || "Language"}
// //       </h2>
// //       {resumeData[skillType].map((skill, index) => (
// //         <div key={index} className="f-col">
// //           <input
// //             type="text"
// //             placeholder={placeholder}
// //             name="skill"
// //             className="w-full other-input border border-black"
// //             value={skill}
// //             onChange={(e) => handleSkills(e, index, skillType)}
// //           />
// //         </div>
// //       ))}
// //       <FormButton
// //         size={resumeData[skillType].length}
// //         add={addSkill}
// //         remove={removeSkill}
// //       />
// //     </div>
// //   );
// // };

// // export default Language;

// // import React, { useContext } from "react";
// // import { ResumeContext } from "../../pages/builder";
// // import FormButton from "./FormButton";

// // const Language = () => {
// //   const { resumeData, setResumeData } = useContext(ResumeContext);
// //   const skillType = "languages";
// //   const title = "Languages";

// //   const languageOptions = [
// //     "English",
// //     "Spanish",
// //     "French",
// //     "German",
// //     "Mandarin Chinese",
// //     "Japanese",
// //     "Hindi",
// //     "Arabic",
// //     "Portuguese",
// //     "Russian",
// //     "Italian",
// //     "Korean",
// //     "Other",
// //   ];

// //   const proficiencyOptions = [
// //     "Native",
// //     "Beginner (A1)",
// //     "Elementary (A2)",
// //     "Intermediate (B1)",
// //     "Upper Intermediate (B2)",
// //     "Advanced (C1)",
// //     "Proficient (C2)",
// //   ];

// //   const handleSkills = (e, index, field) => {
// //     const newSkills = [...resumeData[skillType]];
// //     newSkills[index] = { ...newSkills[index], [field]: e.target.value };
// //     setResumeData({ ...resumeData, [skillType]: newSkills });
// //   };

// //   const addSkill = () => {
// //     setResumeData({
// //       ...resumeData,
// //       [skillType]: [
// //         ...(resumeData[skillType] || []),
// //         { language: "", proficiency: "" },
// //       ],
// //     });
// //   };

// //   const removeSkill = () => {
// //     const newSkills = [...(resumeData[skillType] || [])];
// //     newSkills.pop();
// //     setResumeData({ ...resumeData, [skillType]: newSkills });
// //   };

// //   return (
// //     <div className="flex-col-gap-3 w-full mt-10 px-10">
// //       <h2 className="input-title text-white text-3xl">{title}</h2>
// //       <p className="text-gray-400 text-sm mb-4">
// //         If you are proficient in one or more languages, mention them in this
// //         section.
// //       </p>
// //       {resumeData[skillType]?.length > 0 ? (
// //         resumeData[skillType].map((skill, index) => (
// //           <div key={index} className="flex d-flex justify-between mb-4">
// //             <div>
// //               <label className="block text-sm font-medium text-white">
// //                 {index === 0 ? "First Language" : "Language"}
// //               </label>
// //               <select
// //                 className="w-full other-input border border-black mb-2"
// //                 value={skill.language}
// //                 onChange={(e) => handleSkills(e, index, "language")}
// //               >
// //                 <option value="" disabled>
// //                   Select Language
// //                 </option>
// //                 {languageOptions.map((lang, i) => (
// //                   <option key={i} value={lang}>
// //                     {lang}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-white">
// //                 Proficiency
// //               </label>
// //               <select
// //                 className="w-full other-input border border-black"
// //                 value={skill.proficiency}
// //                 onChange={(e) => handleSkills(e, index, "proficiency")}
// //               >
// //                 <option value="" disabled>
// //                   Select Proficiency
// //                 </option>
// //                 {proficiencyOptions.map((level, i) => (
// //                   <option key={i} value={level}>
// //                     {level}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p className="text-white">
// //           No languages added. Add a new language to get started.
// //         </p>
// //       )}
// //       <FormButton
// //         size={resumeData[skillType]?.length || 0}
// //         add={addSkill}
// //         remove={removeSkill}
// //       />
// //     </div>
// //   );
// // };

// // export default Language;

// import React, { useContext, useState } from "react";
// import FormButton from "./FormButton";
// import { ResumeContext } from "../context/ResumeContext";
// import { useRouter } from "next/router";
// import { ChevronDown, ChevronUp, AlertCircle, X } from "lucide-react";
// const Language = () => {
//   const { resumeData, setResumeData, resumeStrength } =
//     useContext(ResumeContext);
//   const skillType = "languages";
//   const title = "Languages";

//   const languageOptions = [
//     "English",
//     "Spanish",
//     "French",
//     "German",
//     "Mandarin Chinese",
//     "Japanese",
//     "Hindi",
//     "Arabic",
//     "Portuguese",
//     "Russian",
//     "Italian",
//     "Korean",
//     "Other",
//   ];

//   const proficiencyOptions = [
//     "Native Speaker",
//     "Fluent",
//     "Good ",
//     "Basic Knowledge",
//     "Just Starting",
//   ];
//   const router = useRouter();
//   const { improve } = router.query;
//   const [activeTooltip, setActiveTooltip] = useState(null);
//   const handleSkills = (e, index, field) => {
//     const newSkills = [...resumeData[skillType]];
//     newSkills[index] = { ...newSkills[index], [field]: e.target.value };
//     setResumeData({ ...resumeData, [skillType]: newSkills });
//   };

//   const addSkill = () => {
//     setResumeData({
//       ...resumeData,
//       [skillType]: [
//         ...(resumeData[skillType] || []),
//         { language: "", proficiency: "" },
//       ],
//     });
//   };

//   const removeSkill = () => {
//     const newSkills = [...(resumeData[skillType] || [])];
//     newSkills.pop();
//     setResumeData({ ...resumeData, [skillType]: newSkills });
//   };
//   const hasErrors = (index, field) => {
//     const workStrength = resumeStrength?.languages_strenght?.[index];
//     return (
//       workStrength &&
//       Array.isArray(workStrength[field]) &&
//       workStrength[field].length > 0
//     );
//   };
//   const getErrorMessages = (index, field) => {
//     const workStrength = resumeStrength?.languages_strenght?.[index];
//     return workStrength && Array.isArray(workStrength[field])
//       ? workStrength[field]
//       : [];
//   };
//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-black text-3xl">{title}</h2>
//       <p className="text-gray-400 text-sm mb-4">
//         If you are proficient in one or more languages, mention them in this
//         section.
//       </p>
//       {resumeData[skillType]?.length > 0 ? (
//         resumeData[skillType].map((skill, index) => (
//           <div key={index} className="flex justify-between gap-2 mb-4">
//             <div className="w-1/2">
//               <div className="relative mb-2">
//                 <label className="block text-sm font-medium text-white">
//                   {index === 0 ? "First Language" : "Language"}
//                 </label>
//                 <select
//                   // className="w-full other-input border border-black mb-2"
//                   className={`w-full other-input border  ${
//                     improve && hasErrors(index, "language")
//                       ? "border-red-500"
//                       : "border-black"
//                   }`}
//                   value={skill.language}
//                   onChange={(e) => handleSkills(e, index, "language")}
//                 >
//                   <option value="" disabled>
//                     Select Language
//                   </option>
//                   {languageOptions.map((lang, i) => (
//                     <option key={i} value={lang}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//                 {improve && hasErrors(index, "language") && (
//                   <button
//                     type="button"
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
//                     onClick={() =>
//                       setActiveTooltip(
//                         activeTooltip === `language-${index}`
//                           ? null
//                           : `language-${index}`
//                       )
//                     }
//                   >
//                     <AlertCircle className="w-5 h-5" />
//                   </button>
//                 )}
//                 {activeTooltip === `language-${index}` && (
//                   <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
//                     <div className="p-4 border-b border-gray-700">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <AlertCircle className="w-5 h-5 text-red-400" />
//                           <span className="font-medium text-black">
//                             Language Suggestion
//                           </span>
//                         </div>
//                         <button
//                           onClick={() => setActiveTooltip(null)}
//                           className="text-black transition-colors"
//                         >
//                           <X className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       {getErrorMessages(index, "language").map((msg, i) => (
//                         <div
//                           key={i}
//                           className="flex items-start space-x-3 mb-3 last:mb-0"
//                         >
//                           <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                           <p className="text-black text-sm">{msg}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-white">
//                 Proficiency
//               </label>
//               <select
//                 className="w-full other-input border border-black"
//                 value={skill.proficiency}
//                 onChange={(e) => handleSkills(e, index, "proficiency")}
//               >
//                 <option value="" disabled>
//                   Select Proficiency
//                 </option>
//                 {index === 0 ? (
//                   <option value="Native Speaker">Native Speaker</option>
//                 ) : (
//                   proficiencyOptions.map((level, i) => (
//                     <option key={i} value={level}>
//                       {level}
//                     </option>
//                   ))
//                 )}
//               </select>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-white">
//           No languages added. Add a new language to get started.
//         </p>
//       )}
//       <FormButton
//         size={resumeData[skillType]?.length || 0}
//         add={addSkill}
//         remove={removeSkill}
//       />
//     </div>
//   );
// };

// export default Language;

import React, { useContext, useState } from "react";
import FormButton from "./FormButton";
import { ResumeContext } from "../context/ResumeContext";
import { useRouter } from "next/router";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
  Trash,
  Globe2,
} from "lucide-react";

const Language = () => {
  const { resumeData, setResumeData, resumeStrength } =
    useContext(ResumeContext);
  const skillType = "languages";
  const title = "Languages";

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin Chinese",
    "Japanese",
    "Hindi",
    "Arabic",
    "Portuguese",
    "Russian",
    "Italian",
    "Korean",
    "Other",
  ];

  const proficiencyOptions = [
    "Native Speaker",
    "Fluent",
    "Good ",
    "Basic Knowledge",
    "Just Starting",
  ];

  const router = useRouter();
  const { improve } = router.query;
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleSkills = (e, index, field) => {
    const newSkills = [...resumeData[skillType]];
    newSkills[index] = { ...newSkills[index], [field]: e.target.value };
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      [skillType]: [
        ...(resumeData[skillType] || []),
        { language: "", proficiency: "" },
      ],
    });
  };

  const removeSkill = () => {
    const newSkills = [...(resumeData[skillType] || [])];
    newSkills.pop();
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const deleteLanguage = (indexToDelete) => {
    if (resumeData[skillType]?.length > 1) {
      const newLanguages = resumeData[skillType].filter(
        (_, index) => index !== indexToDelete
      );
      setResumeData({
        ...resumeData,
        [skillType]: newLanguages,
      });
    } else {
      alert("At least one language is required.");
    }
  };

  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.languages_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.languages_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };

  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <div className="flex items-center gap-3 mb-4">
        <Globe2 className="w-8 h-8 text-black" />
        <h2 className="input-title text-black text-3xl">{title}</h2>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        If you are proficient in one or more languages, mention them in this
        section.
      </p>

      {resumeData[skillType]?.length > 0 ? (
        resumeData[skillType].map((skill, index) => (
          
          <div
            key={index}
            className="bg-white rounded-lg p-2 mb-6 shadow-md border border-gray-300"
          >
            <div className="flex flex-wrap md:flex-nowrap justify-between items-end gap-6 ">
              {/* Language Selection */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    {index === 0 ? "First Language" : "Language"}
                  </label>
                  <select
                    className={`w-full border rounded-md p-2 transition-all duration-200 focus:ring-2 ${
                      improve && hasErrors(index, "language")
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-400 focus:ring-blue-500"
                    }`}
                    value={skill.language}
                    onChange={(e) => handleSkills(e, index, "language")}
                  >
                    <option value="" disabled>
                      Select Language
                    </option>
                    {languageOptions.map((lang, i) => (
                      <option key={i} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>

                  {/* Error Tooltip */}
                  {improve && hasErrors(index, "language") && (
                    <button
                      type="button"
                      className="absolute right-3 top-[55%] -translate-y-1/2 text-red-500 hover:text-red-600 transition"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `language-${index}`
                            ? null
                            : `language-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}

                  {activeTooltip === `language-${index}` && (
                    <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-300">
                      <div className="p-4 border-b border-gray-300 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="font-semibold text-gray-800">
                            Language Suggestion
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveTooltip(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-4">
                        {getErrorMessages(index, "language").map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 mb-2 last:mb-0"
                          >
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                            <p className="text-sm text-gray-700">{msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Proficiency Selection */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Proficiency
                </label>
                <select
                  className="w-full border border-gray-400 rounded-md p-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  value={skill.proficiency}
                  onChange={(e) => handleSkills(e, index, "proficiency")}
                >
                  <option value="" disabled>
                    Select Proficiency
                  </option>
                  {index === 0 ? (
                    <option value="Native Speaker">Native Speaker</option>
                  ) : (
                    proficiencyOptions.map((level, i) => (
                      <option key={i} value={level}>
                        {level}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteLanguage(index)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all flex items-center justify-center"
                type="button"
                title="Delete language"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white text-center py-4 bg-gray-800 rounded-lg">
          No languages added. Add a new language to get started.
        </p>
      )}
      <FormButton
        size={resumeData[skillType]?.length || 0}
        add={addSkill}
        remove={removeSkill}
      />
    </div>
  );
};

export default Language;
