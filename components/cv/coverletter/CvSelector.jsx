import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cvletter1 from "./cvimgs/cvletter1.png";
import cvletter2 from "./cvimgs/cvletter2.png";
import cvletter3 from "./cvimgs/cvletter3.png";
import cvletter4 from "./cvimgs/cvletter4.png";
import cvletter5 from "./cvimgs/cvletter5.png";
import cvletter6 from "./cvimgs/cvletter6.png";

import axios from "axios";
import Link from "next/link";
const TemplateSelector = ({
  selectedTemplate,
  setSelectedTemplate,
  selectedPdfType,
  setSelectedPdfType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState(null);
  const [templateId, setTemplateId] = useState(selectedTemplate);
  const isBasicUser = userData?.plan_id === 1;
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false);
  const templates = [
    { key: "template1", imageUrl: cvletter1, pdfType: 4 },
    { key: "template2", imageUrl: cvletter2, pdfType: 2 },
    { key: "template3", imageUrl: cvletter3, pdfType: 3 },
    { key: "template4", imageUrl: cvletter4, pdfType: 3 },
    { key: "template5", imageUrl: cvletter5, pdfType: 4 },
    { key: "template6", imageUrl: cvletter6, pdfType: 4 },
  ];
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Unauthorized. Please log in.");
          return;
        }

        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/user-profile`,
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success") {
          const user = response.data.data;
          setUserData(user);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        // setStatus("Inactive");
      }
    };

    fetchUserProfile();
  }, []);
  useEffect(() => {
    const selectedIndex = templates.findIndex(
      (template) => template.key == selectedTemplate
    );
    if (selectedIndex !== -1) {
      setSelectedPdfType(templates[selectedIndex].pdfType);
      setCurrentIndex(selectedIndex);
    }
    setTemplateId(selectedTemplate);
  }, [selectedTemplate]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleTemplateClick = (templateKey) => {
    setSelectedTemplate(templateKey);
    setSelectedPdfType(templateKey.pdfType);
    setTemplateId(templateKey);
    closeModal();
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? templates.length - 3 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === templates.length - 3 ? 0 : prevIndex + 1
    );
  };

  const getDisplayedTemplates = () => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(templates.length, currentIndex + 2);
    return templates.slice(start, end);
  };

  return (
    <div className="font-sans">
      <button
        onClick={openModal}
        className="hidden md:block rounded-lg border-2 m-2 border-blue-900 px-5 py-2 font-bold bg-white text-blue-900"
      >
        <span>Selected: {templateId || "template1"}</span>
      </button>
      <button
        onClick={openModal}
        className="block md:hidden rounded-lg border-2 m-2 border-pink-600 px-5 py-2 font-bold bg-white text-pink-600"
      >
        Template
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/75 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-5xl relative shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-lg font-bold mb-4 text-center border rounded-3xl py-2 text-white bg-gray-800">
              Select a Template
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {templates.map((template, index) => {
                const isDisabled = isBasicUser && index > 1;
                const isSelected = template.key === templateId;

                return (
                  <div
                    key={template.key}
                    onClick={() => {
                      if (isDisabled) {
                        toast.info("Upgrade your plan to use this template.");
                        return;
                      }
                      handleTemplateClick(template.key);
                    }}
                    className={`relative cursor-pointer transition-transform duration-200 ${
                      isSelected ? "scale-105" : "hover:scale-105"
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div
                      className={`rounded-xl p-2 border-2 transition-colors duration-300 ${
                        isSelected
                          ? "border-blue-600 bg-blue-100"
                          : "border-transparent hover:border-blue-300"
                      }`}
                    >
                      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                        <Image
                          src={template.imageUrl}
                          alt={template.key}
                          fill
                          className="object-fill"
                        />
                        {isDisabled && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 text-white text-sm font-semibold flex items-center justify-center rounded-lg">
                            🔒 Upgrade to use
                          </div>
                        )}
                      </div>
                      <div
                        className={`mt-2 text-center py-2 px-4 rounded-md transition-colors duration-300 ${
                          isSelected
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-gray-600 group-hover:text-blue-600"
                        }`}
                      >
                        {template.key}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isBasicUser && (
                <div className="text-center mt-6">
                  <Link href={"/payment"}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
                      Upgrade Your Plan to Unlock All Templates
                    </button>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={closeModal}
              className="w-full mt-4 sm:w-auto px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
