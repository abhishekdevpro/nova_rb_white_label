"use client";

import { useContext, useState, useEffect } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const IntroductionAndBodyForm = () => {
  const { coverLetterData, setCoverLetterData } =
    useContext(CoverLetterContext);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const {id} = useRouter()
  const handleBodyChange = (index, value) => {
    setCoverLetterData((prevData) => {
      const updatedBody = [...prevData.body];
      updatedBody[index] = value;
      return { ...prevData, body: updatedBody };
    });
  };

  const handleAIAssist = async (index) => {
    setLoadingIndex(index);
    setActiveIndex(index);
    setSelectedSuggestionIndex(0); // default to the first suggestion

    const { personalDetails } = coverLetterData;
    const { letterDetails } = coverLetterData;

    let endpoint = "";
    let payload = {};

    if (index === 0) {
      endpoint =
        `https://apiwl.novajobs.us/api/user/aisummery-section1-coverletter/${id}`;
      payload = {
        name: personalDetails.name,
        target_role: personalDetails.position,
        company_name: letterDetails.companyName,
        location: personalDetails.address,
      };
    } else if (index === 1) {
      endpoint =
        `https://apiwl.novajobs.us/api/user/aisummery-section2-coverletter/${id}`;
      payload = {
        target_role: personalDetails.position,
      };
    } else if (index === 2) {
      endpoint =
        `https://apiwl.novajobs.us/api/user/aisummery-section3-coverletter/${id}`;
      payload = {
        name: personalDetails.name,
        target_role: personalDetails.position,
        company_name: letterDetails.companyName,
      };
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setPopupContent("Unauthorized: No token found.");
        setPopupVisible(true);
        setLoadingIndex(null);
        return;
      }

      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = response.data.data;
      setPopupContent(
        data?.cover_letter_analysis?.professional_summaries?.join("\n\n") ||
          "No content received."
      );

      setPopupVisible(true);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      setPopupContent(message);
      setPopupVisible(true);
      console.error(error);
    } finally {
      setLoadingIndex(null);
    }
  };

  // const insertToParagraph = () => {
  //   if (activeIndex !== null) {
  //     handleBodyChange(activeIndex, popupContent);
  //     setPopupVisible(false);
  //   }
  // };
  const insertToParagraph = () => {
    if (activeIndex !== null && Array.isArray(splitContent)) {
      const selectedText = splitContent[selectedSuggestionIndex];
      handleBodyChange(activeIndex, selectedText || "");
      setPopupVisible(false);
    }
  };
  const splitContent = popupContent
    .split("\n\n")
    .filter((s) => s.trim() !== "");

  const paragraphTitles = [
    "Introduction: Stating Intent Clearly",
    "Hook: Why You’re a Fit",
    "Proof & Sign-Off: Show Value and Close Strong",
  ];

  return (
    <div className="p-4 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Cover Letter Sections
      </h2>

      {coverLetterData.body.map((paragraph, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-center">
            <label className="block text-black font-medium mb-2">
             {paragraphTitles[index] || `Paragraph ${index + 1}`}
            </label>
            <button
              onClick={() => handleAIAssist(index)}
              type="button"
              className="flex items-center gap-2 p-2 px-4 bg-black text-white rounded-lg text-sm mb-2 hover:bg-gray-800 transition-all duration-300"
              disabled={loadingIndex === index}
            >
              <Plus className="w-5 h-5" />
              <span>{loadingIndex === index ? "Loading..." : "AI Assist"}</span>
            </button>
          </div>

          <ReactQuill
            value={paragraph}
            onChange={(value) => handleBodyChange(index, value)}
            theme="snow"
            placeholder={`Write paragraph ${index + 1}`}
            className="bg-white"
          />
        </div>
      ))}

      {/* Popup Modal */}
      {/* {popupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
            <button
              onClick={() => setPopupVisible(false)}
              className="absolute top-2 right-2 text-black hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">AI Suggested Content</h3>
            {splitContent.map((text, idx) => (
              <label
                key={idx}
                className="flex items-start gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="ai-suggestion"
                  value={idx}
                  checked={selectedSuggestionIndex === idx}
                  onChange={() => setSelectedSuggestionIndex(idx)}
                  className="mt-1"
                />
                <span className="whitespace-pre-line">{text}</span>
              </label>
            ))}
            <div className="mt-4 flex justify-end">
              <button
                onClick={insertToParagraph}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {paragraphTitles[activeIndex+1] }
              </button>
            </div>
          </div>
        </div>
      )} */}
      {popupVisible && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
    <div className="bg-white max-w-4xl  rounded-lg p-6 relative max-h-[90vh] overflow-y-auto">
      <button
        onClick={() => setPopupVisible(false)}
        className="absolute top-2 right-2 text-black hover:text-red-600"
      >
        <X className="w-5 h-5" />
      </button>
      <h3 className="text-lg font-semibold mb-4">AI Suggested Content</h3>

      <div className="space-y-3">
        {splitContent.map((text, idx) => (
          <label
            key={idx}
            className="flex items-start gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="ai-suggestion"
              value={idx}
              checked={selectedSuggestionIndex === idx}
              onChange={() => setSelectedSuggestionIndex(idx)}
              className="mt-1"
            />
            <span className="whitespace-pre-line">{text}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={insertToParagraph}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {`Insert to ${paragraphTitles[activeIndex + 1]}`}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default IntroductionAndBodyForm;
