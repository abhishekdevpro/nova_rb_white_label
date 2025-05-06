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
    <div className="flex-col gap-3 w-full mt-10 px-10 max-h-[400px] overflow-y-auto">
      <h2 className="input-title text-black text-3xl">
        {t("resumeStrength.sections.certifications")}
      </h2>
      {(resumeData?.[skillType] || []).map((certification, index) => (
        <div key={index} className="f-col justify-center">
          <div className="relative flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder={t("builder_forms.certification.name")}
              name="name"
              className={`w-full other-input border ${
                improve && hasErrors(index, "name")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={certification.name}
              onChange={(e) => handleCertification(e, index)}
            />
            {improve && hasErrors(index, "name") && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `name-${index}`
                      ? null
                      : `name-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="relative flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder={t("builder_forms.certification.issuer")}
              name="issuer"
              className={`w-full other-input border ${
                improve && hasErrors(index, "issuer")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={certification.issuer}
              onChange={(e) => handleCertification(e, index)}
            />
            {improve && hasErrors(index, "issuer") && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `issuer-${index}`
                      ? null
                      : `issuer-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="relative flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder={t("builder_forms.certification.date")}
              name="date"
              className={`w-full other-input border ${
                improve && hasErrors(index, "date")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={certification.date}
              onChange={(e) => handleCertification(e, index)}
            />
            {improve && hasErrors(index, "date") && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `date-${index}`
                      ? null
                      : `date-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="relative flex justify-center items-center gap-2">
            <textarea
              placeholder={t("builder_forms.certification.description")}
              name="description"
              className={`w-full other-input border ${
                improve && hasErrors(index, "description")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={certification.description}
              onChange={(e) => handleCertification(e, index)}
              rows={4}
            />
            {improve && hasErrors(index, "description") && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `description-${index}`
                      ? null
                      : `description-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ))}
      <FormButton
        size={(resumeData?.[skillType] || []).length}
        add={addCertification}
        remove={removeCertification}
      />
    </div>
  );
};

export default Certification;
