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
          if (!response.data.data?.ai_resume_parse_data) {
            console.warn("No AI resume parse data found in response");
            setResumeData({});
            return;
          }

          try {
            // Check if response.data.data.ai_resume_parse_data is a string or already an object
            const parsedAIData =
              typeof response.data.data.ai_resume_parse_data === "string"
                ? JSON.parse(response.data.data.ai_resume_parse_data)
                : response.data.data.ai_resume_parse_data;

            if (parsedAIData?.templateData) {
              setResumeData(parsedAIData.templateData);
              console.log(">>>>>parse data", parsedAIData.templateData);

              // Set initial experience value if it exists (from backend)
              if (parsedAIData.templateData.no_of_experience) {
                const experienceValue =
                  parsedAIData.templateData.no_of_experience;
                onChange({
                  ...value,
                  experience: experienceValue,
                });
                setExp(experienceValue);
              }
            } else {
              console.warn("No template data found in parsed AI data");
              setResumeData({});
            }
          } catch (parseError) {
            console.error("Error parsing AI resume data:", parseError);
            toast.error(t("experienceStep.toast.errorParsingData"));
            setResumeData({});
          }
        } else {
          toast.error(response.data.message || "Failed to fetch resume data");
          setResumeData({});
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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-200 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            {t("experienceStep.title")}
          </h1>
          <p className="text-md md:text-lg text-[#4b5563] mb-10">
            {t("experienceStep.description")}
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
            {t("experienceStep.back")}
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
            {isLoading ? (
              <SaveLoader loadingText={t("experienceStep.saving")} />
            ) : (
              t("experienceStep.next")
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
