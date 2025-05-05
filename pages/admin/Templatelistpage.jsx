import React, { useState } from "react";
import CoverLetterListPage from "./coverletterlist";
import Resumelistpage from "./resumelist";
import { useTranslation } from "react-i18next";

const Templatelistpage = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("resume");

  return (
    <div className="p-4 md:p-6 flex flex-col items-center mt-10">
      {/* Toggle Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setActiveTab("resume")}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === "resume"
              ? "bg-[#1C2957] text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {t("admin.templatelist.myResume")}
        </button>
        <button
          onClick={() => setActiveTab("coverLetter")}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === "coverLetter"
              ? "bg-[#1C2957] text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {t("admin.templatelist.myCoverLetter")}
        </button>
      </div>

      {/* Conditional Rendering */}
      <div className="w-full flex justify-center">
        {activeTab === "resume" ? <Resumelistpage /> : <CoverLetterListPage />}
      </div>
    </div>
  );
};

export default Templatelistpage;
