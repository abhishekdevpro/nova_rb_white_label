
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Link from "next/link";
// // import { useRouter } from "next/router";
// // import FullScreenLoader from "../ResumeLoader/Loader";

// // // Loader Component

// // const ResumeStrength = ({ score, strength, resumeId }) => {
// //   const [showLoader, setShowLoader] = useState(false);
// //   const router = useRouter();

// //   const getSectionsList = (data) => {
// //     if (!data) return [];
// //     return [
// //       {
// //         name: "Personal Information",
// //         completed: data.is_personal_info,
// //         score: data.personal_score,
// //       },
// //       {
// //         name: "Personal Summary",
// //         completed: data.is_personal_summery,
// //         score: data.personal_summery_score,
// //       },
// //       {
// //         name: "Education",
// //         completed: data.is_education,
// //         score: data.education_score,
// //       },
// //       {
// //         name: "Work History",
// //         completed: data.is_work_history,
// //         score: data.work_history_score,
// //       },
// //       {
// //         name: "Skills",
// //         completed: data.is_skills,
// //         score: data.skills_score,
// //       },
// //     ];
// //   };

// //   // const handleImproveResume = () => {
// //   //   setShowLoader(true);
// //   //   setTimeout(() => {
// //   //     router.push(`/dashboard/aibuilder/${resumeId}`);
// //   //   }, 5000);
// //   // };
// //   const handleImproveResume = () => {
// //     setShowLoader(true);
// //     setTimeout(() => {
// //       router.push({
// //         pathname: `/dashboard/aibuilder/${resumeId}`,
// //         query: {
// //           improve: "true", // Example query parameter
// //         },
// //       });
// //     }, 5000);
// //   };

// //   const sectionsList = getSectionsList(strength);

// //   return (
// //     <>
// //       {showLoader && <FullScreenLoader />}
// //       <div className="bg-blue-50 p-6 rounded-lg mb-6">
// //         <div className="flex justify-between items-start mb-4">
// //           <div>
// //             <h2 className="text-xl font-semibold mb-1">Resume Strength</h2>
// //             <div className="flex items-center gap-2">
// //               <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-semibold">
// //                 {score}
// //               </span>
// //             </div>
// //           </div>

// //           <div className="flex flex-col items-end">
// //             <h3 className="text-xl font-semibold mb-1">Fix Resume</h3>
// //             <p className="text-gray-600">
// //               We found{" "}
// //               <span className="font-bold">{strength.total_errors} errors</span>{" "}
// //               in your resume.
// //             </p>
// //             <p className="text-gray-600">
// //               Use our Resume Check tool to fix them.
// //             </p>
// //             <button
// //               onClick={handleImproveResume}
// //               disabled={!resumeId}
// //               className={`mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
// //                 !resumeId ? "opacity-50 cursor-not-allowed" : ""
// //               }`}
// //             >
// //               Improve Resume
// //             </button>
// //           </div>
// //         </div>

// //         <div className="space-y-3">
// //           {sectionsList.map((section) => (
// //             <div key={section.name} className="flex items-center gap-2">
// //               <div
// //                 className={`p-1 rounded-full ${
// //                   section.completed
// //                     ? "bg-green-100 text-green-600"
// //                     : "bg-red-100 text-red-600"
// //                 }`}
// //               >
// //                 {section.completed ? (
// //                   <svg
// //                     className="w-4 h-4"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M5 13l4 4L19 7"
// //                     />
// //                   </svg>
// //                 ) : (
// //                   <svg
// //                     className="w-4 h-4"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M6 18L18 6M6 6l12 12"
// //                     />
// //                   </svg>
// //                 )}
// //               </div>
// //               <span className="text-gray-700">{section.name}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // // Add this to your global CSS or Tailwind config

// // export default ResumeStrength;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import FullScreenLoader from "../ResumeLoader/Loader";
// import { CheckCircle2, XCircle } from "lucide-react";

// const ResumeStrength = ({ score, strength, resumeId }) => {
//   const [showLoader, setShowLoader] = useState(false);
//   const router = useRouter();

//   const getSectionsList = (data) => {
//     if (!data) return [];
//     return [
//       {
//         name: "Personal Information",
//         completed: data.is_personal_info,
//         score: data.personal_score,
//       },
//       {
//         name: "Personal Summary",
//         completed: data.is_personal_summery,
//         score: data.personal_summery_score,
//       },
//       {
//         name: "Education",
//         completed: data.is_education,
//         score: data.education_score,
//       },
//       {
//         name: "Work History",
//         completed: data.is_work_history,
//         score: data.work_history_score,
//       },
//       {
//         name: "Skills",
//         completed: data.is_skills,
//         score: data.skills_score,
//       },
//     ];
//   };

//   const handleImproveResume = () => {
//     setShowLoader(true);
//     setTimeout(() => {
//       router.push({
//         pathname: `/dashboard/aibuilder/${resumeId}`,
//         query: {
//           improve: "true",
//         },
//       });
//     }, 5000);
//   };

//   const sectionsList = getSectionsList(strength);

//   return (
//     <>
//       {showLoader && <FullScreenLoader />}
//       <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-6">
//         <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0 mb-4">
//           <div className="text-center sm:text-left">
//             <h2 className="text-xl font-semibold mb-1">Resume Strength</h2>
//             <div className="flex items-center justify-center sm:justify-start gap-2">
//               <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-semibold">
//                 {score}
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
//             <h3 className="text-xl font-semibold mb-1">Fix Resume</h3>
//             <p className="text-gray-600">
//               We found{" "}
//               <span className="font-bold text-red-500 text-lg">{strength.total_errors} errors</span>{" "}
//               in your resume.
//             </p>
//             <p className="text-gray-600">
//               Use our Resume Check tool to fix them.
//             </p>
//             <button
//               onClick={handleImproveResume}
//               disabled={!resumeId}
//               className={`mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto ${
//                 !resumeId ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               Improve Resume
//             </button>
//           </div>
//         </div>

//         <div className="space-y-3">
//           {sectionsList.map((section) => (
//             <div key={section.name} className="flex items-center gap-2">
//               <div
//                 className={`${
//                   section.completed
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {section.completed ? (
//                   <CheckCircle2 className="w-5 h-5" />
//                 ) : (
//                   <XCircle className="w-5 h-5" />
//                 )}
//               </div>
//               <span className="text-gray-700">{section.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResumeStrength;


import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  User,
  Share2,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Code2,
  Languages,
  Award,
  Search,
  Check,
  X,
  Circle,
} from "lucide-react";
import FullScreenLoader from "../ResumeLoader/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const TooltipContent = ({ improvements,resumeId,onClose}) => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter()

  const formatItems = [
    {
      label: 'Bullet Points Used',
      value: improvements?.formatting?.bullet_points_used,
      description: 'Proper use of bullet points in resume sections'
    },
    {
      label: 'Clear Headings',
      value: improvements?.formatting?.clear_headings,
      description: 'Section headings are clear and well-defined'
    },
    {
      label: 'Consistent Font',
      value: improvements?.formatting?.consistent_font,
      description: 'Consistent font usage throughout the resume'
    },
    {
      label: 'Contact Info Visible',
      value: improvements?.formatting?.contact_info_visible,
      description: 'Contact information is clearly visible'
    }
  ];
  const handleATS = async () => {
    const token = localStorage.getItem("token");
    
    setLoading(true);  // Ensure loading is set to true when the request starts
  
    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/user/ats-improve/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      if (response.data) {
        toast.success(response.message || "ATS updated successfully");
        onClose();
        // router.push('/dashboard')
        window.location.reload();

      } else {
        toast.error("No response data received");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);  // Ensure loading is set to false after the request finishes
    }
  };
  
  


  return (
    
    <div className="h-[600px] overflow-y-auto p-6 bg-gray-50 rounded-lg shadow-md">
  {/* Grid Layout for Improvements and Formatting Checklist */}
  <div className="flex flex-col">
    
    {/* Improvements Section */}
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Areas for Improvement
      </h3>
      <ul className="space-y-3">
        {improvements?.areas_for_improvement?.file_format && (
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
            <p className="text-gray-700">
              <span className="font-bold text-black">File Formatting: </span> 
              {improvements.areas_for_improvement.file_format}
            </p>
          </li>
        )}
        {improvements?.areas_for_improvement?.keyword_optimization && (
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
            <p className="text-gray-700">
              <span className="font-bold text-black">Keyword Optimization: </span> 
              {improvements.areas_for_improvement.keyword_optimization}
            </p>
          </li>
        )}
        {improvements?.areas_for_improvement?.section_order && (
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
            <p className="text-gray-700">
              <span className="font-bold text-black">Section Order: </span> 
              {improvements.areas_for_improvement.section_order}
            </p>
          </li>
        )}
      </ul>
    </div>

    {/* Formatting Checklist */}
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Formatting Checklist
      </h3>
      <ul className="grid grid-cols-2 gap-4">
        {formatItems.map((item, index) => (
          <li key={index} className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <div 
              className={`rounded-full p-1.5 ${
                item.value 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {item.value ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-gray-700 font-medium">{item.label}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Keywords Section */}
  <div className="flex justify-between items-start gap-6 mt-6">
    <div className="w-1/2 p-4 bg-green-100 text-green-700 rounded-lg">
      <h4 className="font-bold text-lg">Keywords Found</h4>
      {improvements.keywords_found?.length >0 ? (
        <ul className="list-disc list-inside">
          {improvements.keywords_found.map((keyword, index) => (
        <li key={index}>{keyword}</li>
      ))}
        </ul>
      ):<p>No missing keywords</p>}
    </div>
    <div className="w-1/2 p-4 bg-red-100 text-red-700 rounded-lg">
  <h4 className="font-bold text-lg">Keywords Missing</h4>
  {improvements.keywords_missing?.length > 0 ? (
    <ul className="list-disc list-inside">
      {improvements.keywords_missing.map((keyword, index) => (
        <li key={index}>{keyword}</li>
      ))}
    </ul>
  ) : (
    <p>No missing keywords</p>
  )}
</div>

  </div>

  {/* Overall Comments */}
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mt-6 text-white">
    <h3 className="text-lg font-bold">Overall Comments</h3>
    <p>{improvements.overall_comments}</p>
  </div>
  <button
  onClick={handleATS}
  className={`mt-6 px-6 py-2 w-full bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${improvements.ats_score === 10 || Loading ? "opacity-50 cursor-not-allowed" : ""}`}
  disabled={improvements.ats_score === 10 || Loading} // Button is disabled during loading and when ATS score is 10
>
  {Loading ? (
    <div className="flex justify-center items-center">
      <Circle /> {/* Assuming this is your loader component */}
    </div>
  ) : (
    "Proceed To Improve...."
  )}
</button>

</div>

  );
};

const ResumeStrength = ({ score, strength, resumeId }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  console.log(strength.ats_strenght, "strength");

  const getSectionsList = (data) => {
    if (!data) return [];
    return [
      {
        name: "Personal Information",
        completed: data.is_personal_info,
        score: data.personal_score,
        max_score: 15,
        icon: User,
      },
      {
        name: "Social Links",
        completed: data.is_social,
        score: data.social_score,
        max_score: 5,
        icon: Share2,
      },
      {
        name: "Personal Summary",
        completed: data.is_personal_summery,
        score: data.personal_summery_score,
        max_score: 10,
        icon: FileText,
      },
      {
        name: "Education",
        completed: data.is_education,
        score: data.education_score,
        max_score: 10,
        icon: GraduationCap,
      },
      {
        name: "Work History",
        completed: data.is_work_history,
        score: data.work_history_score,
        max_score: 15,
        icon: Briefcase,
      },
      {
        name: "Projects",
        completed: data.is_project,
        score: data.project_score,
        max_score: 15,
        icon: FolderGit2,
      },
      {
        name: "Skills",
        completed: data.is_skills,
        score: data.skills_score,
        max_score: 10,
        icon: Code2,
      },
      {
        name: "Languages",
        completed: data.is_languages,
        score: data.languages_score,
        max_score: 5,
        icon: Languages,
      },
      {
        name: "Certification",
        completed: data.is_certifications,
        score: data.certifications_score,
        max_score: 5,
        icon: Award,
      },
      {
        name: "ATS",
        completed: data.is_ats_friendly,
        score: data.ats_score,
        max_score: 10,
        icon: Search,
      },
    ];
  };

  const handleImproveResume = () => {
    setShowLoader(true);
    setTimeout(() => {
      router.push({
        pathname: `/dashboard/aibuilder/${resumeId}`,
        query: { improve: "true" },
      });
    }, 5000);
  };

 
  const sectionsList = getSectionsList(strength);

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return "bg-green-500";
    return "bg-red-600";
  };

  return (
    <>
      {showLoader && <FullScreenLoader />}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TooltipContent improvements={strength.ats_strenght} resumeId={resumeId} onClose={() => setIsModalOpen(false)} />
      </Modal>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Resume Strength</h2>
            <div className="flex items-center gap-2">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-semibold">
                {score}%
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="text-xl font-semibold mb-1">Fix Resume</h3>
            <p className="text-gray-600">
              We found{" "}
              <span className="font-bold font-lg text-red-400">
                {strength?.total_errors || 0} errors
              </span>{" "}
              in your resume.
            </p>
            <p className="text-gray-600 mb-2">
              Use our Resume Check tool to fix them.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleImproveResume}
                disabled={!resumeId}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                  !resumeId ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Improve Resume
              </button>
              <button 
             disabled={strength.ats_score === 10}
              onClick={()=>setIsModalOpen(true)}
              className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${!strength.ats_score === 10}?"opacity-50 cursor-not-allowed" :""}`}>
                Improve ATS
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {sectionsList.map((section) => {
            const Icon = section.icon;
            const currentScore = section.score || 0;
            const scoreColor = getScoreColor(currentScore, section.max_score);
            const isATS = section.name === "ATS";

            return (
              <div
                key={section.name}
                className="flex items-center gap-4 relative"
                // onClick={() => isATS && setIsModalOpen(true)}
                style={{ cursor: isATS ? 'pointer' : 'default' }}
              >
                <Icon className="w-5 h-5 text-gray-600 flex-shrink-0" />

                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {section.name}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {`${((currentScore / section.max_score) * 100).toFixed(
                        0
                      )} %`}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${scoreColor}`}
                      style={{
                        width: `${(currentScore / section.max_score) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResumeStrength;