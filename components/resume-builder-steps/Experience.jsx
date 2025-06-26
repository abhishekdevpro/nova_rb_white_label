import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import { ResumeContext } from "../context/ResumeContext";

export default function ExperienceStep({ onNext, onBack, onChange, value }) {
  const router = useRouter();
  const { resumeData, setResumeData, exp, setExp } = useContext(ResumeContext);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [hasClickedExperience, setHasClickedExperience] = useState(false); // ✅ NEW

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const experiences = [
    { id: "none", label: "No Experience" },
    { id: "less-3", label: "Less Than 3 Years" },
    { id: "3-5", label: "3-5 Years" },
    { id: "5-10", label: "5-10 Years" },
    { id: "10-plus", label: "10+ Years" },
  ];

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeId = router.query.id || localStorage.getItem("resumeId");
        if (!resumeId || !token) {
          toast.error("Resume ID or token not found");
          return;
        }

        const response = await axios.get(
          `https://apiwl.novajobs.us/api/user/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code === 200 || response.data.status === "success") {
          const parsedAIData = response.data.data.ai_resume_parse_data;

          setResumeData(parsedAIData.templateData);
          console.log(">>>>>parse data", parsedAIData.templateData);

          // Set initial experience value if it exists (from backend)
          if (parsedAIData.templateData.no_of_experience) {
            const experienceValue = parsedAIData.templateData.no_of_experience;
            onChange({
              ...value,
              experience: experienceValue,
            });
            setExp(experienceValue);
          }
        } else {
          toast.error(response.data.message || "Failed to fetch resume data");
        }
      } catch (error) {
        toast.error(error?.message || "Error fetching resume data.");
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [router.query.id, token]);

  const formatResumeData = (data) => {
    return {
      ...data,
      no_of_experience: value.experience,
    };
  };

  const handleSaveExperience = async () => {
    if (!hasClickedExperience) {
      // ✅ Only allow after manual click
      toast.error("Please select an experience level before proceeding.");
      return;
    }

    if (!resumeData) {
      toast.error("Resume data not loaded yet. Please wait.");
      return;
    }

    setExp(value.experience);

    const templateData = {
      templateData: formatResumeData(resumeData),
    };

    setIsLoading(true);

    try {
      const resumeId = router.query.id || localStorage.getItem("resumeId");
      if (!resumeId) {
        toast.error("Resume ID not found.");
        return;
      }

      const response = await axios.put(
        `https://apiwl.novajobs.us/api/user/resume-update/${resumeId}`,
        templateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        toast.success(
          response.data.message || "Experience saved successfully."
        );
        onNext();
      } else {
        toast.error(
          response.data.error || "Error while saving the experience."
        );
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(exp, "no-of exp");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-200 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            How long have you been working?
          </h1>
          <p className="text-md md:text-lg text-[#4b5563] mb-10">
            We will find the best templates for your experience level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full">
          {experiences.map((experience) => (
            <button
              key={experience.id}
              onClick={() => {
                onChange({ ...value, experience: experience.id });
                setExp(experience.id);
                setHasClickedExperience(true); // ✅ Set true when user clicks
              }}
              className={`w-full p-6 text-left rounded-xl border-2 flex items-center justify-between text-blue-700 font-semibold transition-all${
                value.experience === experience.id
                  ? "border-blue-700 bg-[#e6f0f5]"
                  : "border-[#e5e7eb] hover:border-blue-700"
              }`}
            >
              {experience.label}
              <span className="text-lg">→</span>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700
           font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Back
          </button>

          <button
            onClick={handleSaveExperience}
            disabled={loading || isLoading} // ✅ Disable only if loading or saving
            className={`px-8 py-3 rounded-lg font-medium transition-all shadow-md
         ${
           loading || isLoading
             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
             : "bg-blue-700 text-white hover:bg-blue-800"
         }`}
          >
            {isLoading ? <SaveLoader loadingText="Saving....." /> : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
}

// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// import { SaveLoader } from "../ResumeLoader/SaveLoader";
// import { ResumeContext } from "../context/ResumeContext";

// const ExperienceStep = ({ onNext, onBack, onChange, value }) => {
//   const router = useRouter();
//   const { resumeData, setResumeData, exp, setExp } = useContext(ResumeContext);
//   const [loading, setLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const [resumeId, setResumeId] = useState(null);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const experiences = [
//     { id: "fresher", label: "No Experience" },
//     { id: "Less Than 3 Years", label: "Less Than 3 Years" },
//     { id: "3-5 Years", label: "3-5 Years" },
//     { id: "5-10 Years", label: "5-10 Years" },
//     { id: "10+ Years", label: "10+ Years" },
//   ];

//   // Set the resume ID from router query or localStorage when router is ready
//   useEffect(() => {
//     if (router.isReady) {
//       const id = router.query.id || localStorage.getItem("resumeId");
//       setResumeId(id);
//       console.log("Resume ID set:", id);
//     }
//   }, [router.isReady, router.query.id]);

//   // Fetch resume data when resumeId and token are available
//   useEffect(() => {
//     const fetchResumeData = async () => {
//       try {
//         if (!resumeId) {
//           console.log("Resume ID not available yet, waiting...");
//           return;
//         }

//         if (!token) {
//           toast.error("Authentication token not found");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `https://apiwl.novajobs.us/api/user/resume-list/${resumeId}`,
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );

//         if (response.data.code === 200 || response.data.status === "success") {
//           try {
//             const parsedAIData = response.data.data.ai_resume_parse_data;

//             console.log("Resume data fetched successfully:", parsedAIData);

//             if (parsedAIData && parsedAIData.templateData) {
//               // console.log("Template data:", parsedAIData.templateData);
//               setResumeData(parsedAIData.templateData);

//               // Set initial experience value if it exists
//               if (parsedAIData.templateData.no_of_experience) {
//                 const experienceValue =
//                   parsedAIData.templateData.no_of_experience;
//                 // console.log("Setting experience value:", experienceValue);

//                 onChange({
//                   ...value,
//                   experience: experienceValue,
//                 });

//                 // Also set it in the context
//                 setExp(experienceValue);
//               } else {
//                 console.log("No experience data found in template data");
//               }
//             } else {
//               console.log("No template data found in parsedAIData");
//             }
//           } catch (parseError) {
//             console.error("Error parsing AI data:", parseError);
//             toast.error("Error parsing resume data");
//           }
//         } else {
//           toast.error(response.data.message || "Failed to fetch resume data");
//           console.error("API error:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching resume:", error);
//         toast.error("Error connecting to the server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (resumeId && token) {
//       fetchResumeData();
//     }
//   }, [resumeId, token]);

//   const formatResumeData = (data) => {
//     // Add the no_of_experience field directly to the data object
//     return {
//       ...data,
//       no_of_experience: value?.experience || exp,
//     };
//   };

//   const handleSaveExperience = async () => {
//     if (!resumeData) {
//       toast.error("No resume data available");
//       return;
//     }

//     if (!value || !value.experience) {
//       toast.error("Please select an experience level before proceeding");
//       return;
//     }

//     // Update exp in context
//     setExp(value.experience);

//     const templateData = {
//       templateData: formatResumeData(resumeData),
//     };

//     console.log("Saving experience data:", templateData);
//     setIsLoading(true);

//     try {
//       // Get ID from state or fall back to router/localStorage
//       const id =
//         resumeId || router.query.id || localStorage.getItem("resumeId");

//       if (!id) {
//         toast.error("Resume ID not found");
//         setIsLoading(false);
//         return;
//       }

//       console.log(`Updating resume with ID: ${id}`);

//       const response = await axios.put(
//         `https://apiwl.novajobs.us/api/user/resume-update/${id}`,
//         templateData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         }
//       );

//       if (response.data.code === 200 || response.data.status === "success") {
//         setIsSaved(true);
//         toast.success(response.data.message || "Experience saved Successfully");
//         onNext();
//       } else {
//         toast.error(response.data.error || "Error while saving the experience");
//         console.error("API error during save:", response.data);
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Error updating resume!"
//       );
//       console.error("Error updating resume:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   console.log("Current experience value:", exp);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-200  py-12">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Tell Us About Your Experience
//           </h2>
//           <p className="text-xl text-gray-600">
//             We will customize your resume based on your experience level
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h3 className="text-2xl font-bold text-gray-900">
//                 How long have you been working?
//               </h3>
//               <p className="mt-2 text-gray-600">
//                 We will find the best templates for your experience level.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {experiences.map((experience) => (
//                 <button
//                   key={experience.id}
//                   onClick={() => {
//                     onChange({ ...value, experience: experience.id });
//                     // Also update the exp in context when a button is clicked
//                     setExp(experience.id);
//                   }}
//                   className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
//                     value?.experience === experience.id ||
//                     (!value?.experience && exp === experience.id)
//                       ? "border-blue-600 bg-blue-50"
//                       : "border-gray-200 hover:border-blue-400"
//                   }`}
//                 >
//                   <span className="block text-lg font-medium">
//                     {experience.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end mt-12">
//           {/* <button
//             onClick={onBack}
//             className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700
//               font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
//           >
//             Back
//           </button> */}
//           <button
//             onClick={handleSaveExperience}
//             disabled={loading || value.experience === "2"}
//             className={`px-8 py-3 bg-blue-600 text-white rounded-xl font-medium transition-all shadow-lg
//               ${
//                 loading || value.experience === "2"
//                   ? "opacity-70 cursor-not-allowed"
//                   : "hover:bg-blue-700 hover:shadow-xl"
//               }`}
//           >
//             {isLoading ? <SaveLoader loadingText="Saving" /> : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExperienceStep;
