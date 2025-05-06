"use client";

import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import { AlertCircle, X } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Certification = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const router = useRouter();
  const { improve } = router.query;
  const [validationErrors, setValidationErrors] = useState({});
  const skillType = "certifications";

  // Initialize certifications array if it doesn't exist
  React.useEffect(() => {
    if (!resumeData?.[skillType]) {
      setResumeData({
        ...resumeData,
        [skillType]: [{
          name: "",
          issuer: "",
          date: "",
          description: ""
        }]
      });
    }
  }, []);

  const handleCertification = (e, index) => {
    const { name, value } = e.target;
    const newCertifications = [...(resumeData?.[skillType] || [])];
    newCertifications[index] = { ...newCertifications[index], [name]: value };
    setResumeData({ ...resumeData, [skillType]: newCertifications });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      [skillType]: [
        ...(resumeData?.[skillType] || []),
        {
          name: "",
          issuer: "",
          date: "",
          description: ""
        }
      ]
    });
  };

  const removeCertification = (index) => {
    if ((resumeData?.[skillType] || []).length <= 1) {
      toast.warn(t("builder_forms.certification.errors.min_certification"));
      return;
    }
    const newCertifications = [...(resumeData?.[skillType] || [])];
    newCertifications.splice(index, 1);
    setResumeData({ ...resumeData, [skillType]: newCertifications });
  };

  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.certifications_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.certifications_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };

  return (
    <div className="w-full min-h-[100vh] bg-[#3a3860] px-10 py-10 rounded-tl-3xl">
      <h2 className="text-3xl font-bold text-white mb-6">
        {t("Certifications")}
      </h2>
      <div className="flex flex-col gap-4">
        {(resumeData?.[skillType] || []).map((certification, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              placeholder={t("builder_forms.certification.name")}
              name="name"
              className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              value={certification.name}
              onChange={(e) => handleCertification(e, index)}
            />
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 p-2 rounded-md flex items-center justify-center"
              onClick={() => removeCertification(index)}
              aria-label="Delete"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md font-semibold text-base hover:bg-gray-900 transition-colors"
        onClick={addCertification}
      >
        <span className="text-lg font-bold">+</span> {t("builder_forms.certification.add_section", "Add section")}
      </button>
    </div>
  );
};

export default Certification;
