// export default function ExperienceStep({ onNext, onChange, value }) {
//     const experiences = [
//       { id: 'none', label: 'No Experience' },
//       { id: 'less-3', label: 'Less Than 3 Years' },
//       { id: '3-5', label: '3-5 Years' },
//       { id: '5-10', label: '5-10 Years' },
//       { id: '10-plus', label: '10+ Years' },
//     ]

//     return (
//       <>
//        <div className="space-y-6">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">How long have you been working?</h2>
//           <p className="mt-2 text-gray-600">We will find the best templates for your experience level.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {experiences.map((exp) => (
//             <button
//               key={exp.id}
//               onClick={() => {
//                 onChange(exp.id)
//                 onNext()
//               }}
//               className={`p-4 rounded-lg border-2 transition-all ${
//                 value === exp.id
//                   ? 'border-green-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-green-400'
//               }`}
//             >
//               {exp.label}
//             </button>
//           ))}
//         </div>
//       </div>
//       </>

//     )
//   }

// import { useTranslation } from "react-i18next";
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// import { SaveLoader } from "../ResumeLoader/SaveLoader";
// import { ResumeContext } from "../context/ResumeContext";
// import { BASE_URL } from "../Constant/constant";
// import Link from "next/link";
// export default function ExperienceStep({ onNext, onBack, onChange, value }) {
//   const { t } = useTranslation();
//   const router = useRouter();
//   const { resumeData, setResumeData, exp, setExp } = useContext(ResumeContext);
//   const [loading, setLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const experiences = [
//     { id: "none", label: t("experienceStep.options.none") },
//     { id: "less-3", label: t("experienceStep.options.less-3") },
//     { id: "3-5", label: t("experienceStep.options.3-5") },
//     { id: "5-10", label: t("experienceStep.options.5-10") },
//     { id: "10-plus", label: t("experienceStep.options.10-plus") },
//   ];
//   useEffect(() => {
//     const fetchResumeData = async () => {
//       try {
//         const resumeId = router.query.id || localStorage.getItem("resumeId");
//         if (!resumeId || !token) {
//           toast.error("Resume ID or token not found");
//           return;
//         }

//         const response = await axios.get(
//           `${BASE_URL}/api/user/resume-list/${resumeId}`,
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );

//         if (response.data.code == 200 || response.data.status == "success") {
//           const parsedAIData = JSON.parse(
//             response.data.data.ai_resume_parse_data
//           );
//           setResumeData(parsedAIData.templateData);
//           console.log(">>>>>parse data", parsedAIData.templateData);
//           // Set initial experience value if it exists
//           if (parsedAIData.templateData.no_of_experience) {
//             const experienceValue = parsedAIData.templateData.no_of_experience;
//             onChange({
//               ...value,
//               experience: experienceValue,
//             });
//             // Also set it in the context
//             setExp(experienceValue);
//           }
//         } else {
//           toast.error(response.data.message || "Failed to fetch resume data");
//         }
//       } catch (error) {
//         toast.error(error?.message || "Error fetching resume data");
//         console.error("Error fetching resume:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResumeData();
//   }, [router.query.id, token]);
//   const formatResumeData = (data) => {
//     // Add the no_of_experience field directly to the data object
//     return {
//       ...data,
//       no_of_experience: value.experience,
//     };
//   };
//   const handleSaveExperience = async () => {
//     if (!value.experience) {
//       toast.error("Please select an experience level before proceeding");
//       return;
//     }

//     if (!resumeData) {
//       toast.error("Resume data not loaded yet. Please wait.");
//       return;
//     }

//     // Update exp in context
//     setExp(value.experience);

//     const templateData = {
//       templateData: formatResumeData(resumeData),
//     };

//     setIsLoading(true);

//     try {
//       const resumeId = router.query.id || localStorage.getItem("resumeId");
//       if (!resumeId) {
//         toast.error("Resume ID not found");
//         return;
//       }

//       const response = await axios.put(
//         `${BASE_URL}/api/user/resume-update/${resumeId}`,
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
//       }
//     } catch (error) {
//       toast.error(error?.message || "Error updating resume!");
//       console.error("Error updating resume:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const handleSaveExperience = async () => {
//   //   if (!value.experience) {
//   //     toast.error("Please select an experience level before proceeding");
//   //     return;
//   //   }
//   //   if (!resumeData) return;
//   //   // Update exp in context
//   //   setExp(value.experience);

//   //   const templateData = {
//   //     templateData: formatResumeData(resumeData),
//   //   };

//   //   setIsLoading(true);

//   //   try {
//   //     const resumeId = router.query.id || localStorage.getItem("resumeId");
//   //     if (!resumeId) {
//   //       toast.error("Resume ID not found");
//   //       return;
//   //     }

//   //     const response = await axios.put(
//   //       `${BASE_URL}/api/user/resume-update/${resumeId}`,
//   //       templateData,
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: token,
//   //         },
//   //       }
//   //     );

//   //     if (response.data.code === 200 || response.data.status === "success") {
//   //       setIsSaved(true);
//   //       // localStorage.setItem("isSaved", "true");
//   //       toast.success(response.data.message || "Experience saved Successfully");
//   //       onNext();
//   //     } else {
//   //       toast.error(response.data.error || "Error while saving the experience");
//   //     }
//   //   } catch (error) {
//   //     toast.error(error?.message || "Error updating resume!");
//   //     console.error("Error updating resume:", error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   console.log(exp, "no-of exp");
//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900">
//           {t("experienceStep.title")}
//         </h2>
//         <p className="mt-2 text-gray-600">{t("experienceStep.description")}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {experiences.map((experience) => (
//           <button
//             key={experience.id}
//             onClick={() => {
//               onChange({ ...value, experience: experience.id });
//               // Also update the exp in context when a button is clicked
//               setExp(experience.id);
//             }}
//             className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
//               value.experience === experience.id
//                 ? "border-green-600 bg-greeb-50"
//                 : "border-gray-200 hover:border-green-400"
//             }`}
//           >
//             <span className="block text-lg font-medium">
//               {experience.label}
//             </span>
//           </button>
//         ))}
//       </div>
//       <div className="flex justify-between mt-12">
//         <Link href="/dashboard/resume-builder/">
//           <button
//             onClick={onBack}
//             className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700
//               font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
//           >
//             {t("experienceStep.back")}
//           </button>
//         </Link>
//         <button
//           onClick={handleSaveExperience}
//           disabled={loading || !value.experience} // ✅ disable if loading OR no experience selected
//           className={`px-8 py-3 bg-green-600 text-white rounded-xl font-medium transition-all shadow-lg
//     ${
//       loading || !value.experience // ✅ update the disabled styling too
//         ? "opacity-70 cursor-not-allowed"
//         : "hover:bg-green-700 hover:shadow-xl"
//     }`}
//         >
//           {isLoading ? (
//             <SaveLoader loadingText={t("experienceStep.saving")} />
//           ) : (
//             t("experienceStep.next")
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import { ResumeContext } from "../context/ResumeContext";
import { BASE_URL } from "../Constant/constant";
import Link from "next/link";

export default function ExperienceStep({ onNext, onBack, onChange, value }) {
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const router = useRouter();
  const { resumeData, setResumeData, exp, setExp } = useContext(ResumeContext);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [hasClickedExperience, setHasClickedExperience] = useState(false); // ✅ NEW

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const experiences = [
    { id: "none", label: t("experienceStep.options.none") },
    { id: "less-3", label: t("experienceStep.options.less-3") },
    { id: "3-5", label: t("experienceStep.options.3-5") },
    { id: "5-10", label: t("experienceStep.options.5-10") },
    { id: "10-plus", label: t("experienceStep.options.10-plus") },
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
          `${BASE_URL}/api/user/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code === 200 || response.data.status === "success") {
          const parsedAIData = JSON.parse(
            response.data.data.ai_resume_parse_data
          );
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
        toast.error(
          error?.message || t("experienceStep.toast.errorFetchingResume")
        );
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
      toast.error(t("experienceStep.toast.selectExperience"));
      return;
    }

    if (!resumeData) {
      toast.error(t("experienceStep.toast.resumeDataNotLoaded"));
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
        toast.error(t("experienceStep.toast.resumeIdNotFound"));
        return;
      }

      const response = await axios.put(
        `${BASE_URL}/api/user/resume-update/${resumeId}?lang=${language}`,
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
          response.data.message || t("experienceStep.toast.experienceSaved")
        );
        onNext();
      } else {
        toast.error(
          response.data.error || t("experienceStep.toast.errorSavingExperience")
        );
      }
    } catch (error) {
      toast.error(
        error?.message || t("experienceStep.toast.errorUpdatingResume")
      );
      console.error("Error updating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(exp, "no-of exp");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("experienceStep.title")}
        </h2>
        <p className="mt-2 text-gray-600">{t("experienceStep.description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {experiences.map((experience) => (
          <button
            key={experience.id}
            onClick={() => {
              onChange({ ...value, experience: experience.id });
              setExp(experience.id);
              setHasClickedExperience(true); // ✅ Set true when user clicks
            }}
            className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
              value.experience === experience.id
                ? "border-green-600 bg-green-50"
                : "border-gray-200 hover:border-green-400"
            }`}
          >
            <span className="block text-lg font-medium">
              {experience.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-12">
        <Link href="/dashboard/resume-builder/">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
              font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            {t("experienceStep.back")}
          </button>
        </Link>
        <button
          onClick={handleSaveExperience}
          disabled={loading || isLoading} // ✅ Disable only if loading or saving
          className={`px-8 py-3 bg-green-600 text-white rounded-xl font-medium transition-all shadow-lg 
            ${
              loading || isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-green-700 hover:shadow-xl"
            }`}
        >
          {isLoading ? (
            <SaveLoader loadingText={t("experienceStep.saving")} />
          ) : (
            t("experienceStep.next")
          )}
        </button>
      </div>
    </div>
  );
}
