import { useState, useContext, useEffect, useRef } from "react";
import PersonalInformation from "./PersonalInformation";
import LetterDetails from "./LetterDetails";
import IntroductionAndBodyForm from "./IntroductionAndBodyForm";
import ClosingGratitudeAndSignatureForm from "./ClosingGratitudeAndSignatureForm";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../Constant/constant";

const CoverLetterEditor = () => {
  const {
    coverLetterData,
    setCoverLetterData,
    backgroundColorss,
    selectedFont,
    setSelectedFont,
    setBgColor,
    setHeaderColor,
  } = useContext(CoverLetterContext);
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const templateRef = useRef(null);
  const [token, setToken] = useState(null);
  const [coverletterId, setCoverLetterId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isMobile, setIsMobile] = useState(false);
  // const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const steps = [
    { component: <PersonalInformation /> },
    { component: <LetterDetails /> },
    { component: <IntroductionAndBodyForm /> },
    {
      component: <ClosingGratitudeAndSignatureForm />,
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };
  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (id && token) {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/user/coverletter/${id}?lang=${language}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.data.status === "success") {
            const { data } = response.data;
            // console.log(data,"rnd");

            const parsedData = data.cover_letter_obj;

            setCoverLetterData(parsedData.coverletterInfo);

            if (parsedData?.coverletterInfo?.templateDetails) {
              setBgColor(
                parsedData.coverletterInfo.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.coverletterInfo.templateDetails.backgroundColor || ""
              );
              setSelectedTemplate(
                parsedData.coverletterInfo.templateDetails.templateId ||
                  "template1"
              );
            }
          }
        } catch (error) {
          console.error("Error fetching cover letter  data:", error);
          toast.error("Failed to fetch cover letter  data");
        }
      }
    };

    fetchResumeData();
  }, [router.query]);
  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setCoverLetterId(id);
  }, []);
  const formatCoverLetterData = (data) => {
    console.log(data, ">>>data");
    return {
      closing: data.closing || "",
      body: data.body || "",
      gratitude: data.gratitude || "",
      introduction: data.introduction || "",
      letterDetails: {
        companyName: data.letterDetails?.companyName || "",
        date: data.letterDetails?.date || "",
        jobTitle: data.letterDetails?.jobTitle || "",
        reference: data.letterDetails?.reference || "",
        salutation: data.letterDetails?.salutation || "",
      },

      signature: data.signature || "",
      templateDetails: {
        templateId: selectedTemplate,
        backgroundColor: backgroundColorss || "",
        font: selectedFont || "Ubuntu",
      },
      personalDetails: {
        name: data.personalDetails?.name || "",
        address: data.personalDetails?.address || "",
        email: data.personalDetails?.email || "",
        contact: data.personalDetails?.contact || "",
      },
    };
  };
  const handleFinish = async () => {
    if (!coverLetterData) return;
    const coverletterInfo = {
      coverletterInfo: formatCoverLetterData(coverLetterData),
    };
    console.log(coverLetterData, ">>>coverlettersdata");
    const htmlContent = templateRef?.current?.innerHTML;
    // if (!htmlContent) {
    //   toast.error("Error: Template content is missing.");
    //   return;
    // }

    const coverletterHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;
    try {
      const coverletterId = router.query.id || localStorage.getItem("id");
      if (!coverletterId) {
        toast.error("Cover Letter ID not found");
        return;
      }

      const response = await axios.put(
        `${BASE_URL}/api/user/coverletter/${coverletterId}?lang=${language}`,

        { ...coverletterInfo, cover_letter_html: coverletterHtml },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        // setIsSaved(true);
        // localStorage.setItem("isSaved", "true");
        toast.success(response.data.message || "Resume saved Successfully");
      } else {
        toast.error(response.data.error || "Error while saving the Resume");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    }
  };
  return (
    <div className="">
      {/* Render Current Step */}
      {steps[step].component}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className={`px-4 py-2 rounded-lg ${
            step === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#00b38d] text-white"
          }`}
        >
          {t("navigation.previous")}
        </button>
        {/* <button
          onClick={step === steps.length - 1 ? handleFinish : nextStep}
          className={`px-4 py-2 rounded-lg ${
            step === steps.length - 1
              ? "bg-[#00b38d] text-white"
              : "bg-[#00b38d] text-white"
          }`}
        >
          {step === steps.length - 1
            ? t("navigation.finish")
            : t("navigation.next")}
        </button> */}
        <button
          onClick={() => {
            if (step === steps.length - 1) {
              toast.info(t("navigation.toast.pleaseSaveCoverLetter")); // You can replace this with a hardcoded string if not using translations
            } else {
              nextStep();
            }
          }}
          className="px-4 py-2 rounded-lg bg-[#00b38d] text-white"
        >
          {step === steps.length - 1
            ? t("navigation.finish")
            : t("navigation.next")}
        </button>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
