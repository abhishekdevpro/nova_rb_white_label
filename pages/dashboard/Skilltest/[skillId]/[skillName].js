// pages/testpaper/[skillId]/[skillName].js

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "../../../../components/Constant/constant";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ResumeContext } from "../../../../components/context/ResumeContext";
import { toast } from "react-toastify";
import { Check } from "lucide-react";

const Testpaper = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { skillId, skillName } = router.query; // Access dynamic route params

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});
  const [skillAssessmentId, setSkillAssessmentId] = useState(null);
  const { selectedLang } = useContext(ResumeContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login2"); // Redirect to login if no token is found
      return;
    }

    // Fetch questions when skillId and skillName are available
    if (skillId && skillName) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(
            ` ${BASE_URL}/api/user/skill-assessment?skill_id=${parseInt(
              skillId
            )}&skill_name=${encodeURIComponent(
              skillName
            )}&lang=${selectedLang}`,
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          );
          const { questions, skill_assessment_id } = response.data.data;
          setQuestions(questions);
          setSkillAssessmentId(skill_assessment_id);
          setLoading(false);
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Error fetching questions";

          toast.error(errorMessage);
          console.error("Error fetching questions:", error);
          setError(errorMessage);
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [skillId, skillName, router]);

  const handleAnswerChange = (questionIndex, answer) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        user_answer: answer,
      };
      return updatedQuestions;
    });
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const jobSeekerId = 1; // Replace with the actual JobSeekerId if needed

    if (!token) {
      router.push("/login2");
      return;
    }

    try {
      const response = await axios.put(
        ` ${BASE_URL}/api/user/skill-assessment/${skillAssessmentId}?lang=${selectedLang}`,
        {
          user_id: parseInt(jobSeekerId, 10),
          skill_id: parseInt(skillId, 10),
          skill_name: skillName,
          questions: questions.map((question) => ({
            ...question,
            user_answer: question.user_answer || "",
          })),
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const { results } = response.data.data;
      setResults(results);
      setShowResults(true);

      // Store results in local storage
      localStorage.setItem(
        "testResults",
        JSON.stringify({
          skillName,
          totalQuestions: results.total_question,
          rightAnswers: results.right_answer,
          wrongAnswers: results.wrong_answer,
          percentage: results.Percentage,
        })
      );
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError(error.message || "Error submitting answers");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleBack = () => {
    router.back("skilltest"); // Navigate back to the previous page
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
        <div className="flex flex-col items-center">
          {/* Loader Spinner */}
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-violet-500"></div>

          {/* Text Content */}
          <h2 className="text-white text-2xl font-semibold mt-6 text-center">
            {t("testPaper.processingRequest")}
          </h2>
          <p className="text-red-500 text-lg font-medium mt-2 text-center">
            {t("testPaper.dontCloseWindow")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {/* {t("testPaper.error")} */}
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl flex h-screen justify-center items-center mx-auto">
      <div className="flex-1 py-24 bg-white border-2 border-gray-200 shadow-xl rounded-2xl px-5">
        {showResults ? (
          <div className="w-100 bg-white d-flex justify-content-center align-items-center text-center">
            <div
              className="w-75 d-flex flex-column align-items-center p-20 font-bold border-2 rounded-lg"
              style={{ gap: "12px" }}
            >
              <h3>
                {" "}
                {t("testPaper.totalQuestions")}: {results.total_question}
              </h3>
              <h3 className="m-2">
                {" "}
                {t("testPaper.rightAnswer")}: {results.right_answer}
              </h3>
              <h3>
                {" "}
                {t("testPaper.wrongAnswer")}: {results.wrong_answer}
              </h3>
              <h3 className="m-2">
                {t("testPaper.percentage")}: {Math.floor(results.Percentage)}%
              </h3>
              <button
                className="p-2 bg-[#1C2957] rounded-md text-white hover:bg-[#1C2957] mt-4"
                onClick={handleBack}
              >
                {t("testPaper.back")}
              </button>
            </div>
          </div>
        ) : (
          <>
            {questions.length > 0 && (
              <>
                {/* <h1 className="text-2xl mb-4 ms-20">
                  {questions[currentQuestionIndex].question}
                </h1> */}
                <h1 className="text-2xl mb-4 ms-20">
                  {currentQuestionIndex + 1}:{" "}
                  {questions[currentQuestionIndex].question}
                </h1>

                <div className="space-y-3 mb-8">
                  {questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                          questions[currentQuestionIndex].user_answer === option
                            ? "border-[#1C2957] bg-blue-50 ring-2 ring-blue-200"
                            : "border-gray-200"
                        }`}
                        onClick={() =>
                          handleAnswerChange(currentQuestionIndex, option)
                        }
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 border ${
                                questions[currentQuestionIndex].user_answer ===
                                option
                                  ? "bg-[#1C2957] border-[#1C2957]"
                                  : "border-gray-400"
                              }`}
                            >
                              {questions[currentQuestionIndex].user_answer ===
                                option && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                          <label className="text-gray-700 cursor-pointer select-none">
                            {option}
                          </label>
                        </div>
                      </div>
                    )
                  )}
                </div>
                {/* <ul className="mb-4">
                  {questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <li key={index} className="mb-2 ms-20">
                        <input
                          type="radio"
                          // id={`option-${index}`}
                          id={`option-${
                            questions[currentQuestionIndex]?.id || index
                          }-${index}`}
                          name={`option-${questions[currentQuestionIndex].id}`}
                          value={option}
                          checked={
                            questions[currentQuestionIndex].user_answer ===
                            option
                          }
                          onChange={() =>
                            handleAnswerChange(
                              questions[currentQuestionIndex].id,
                              option
                            )
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`option-${index}`}>{option}</label>
                      </li>
                    )
                  )}
                </ul> */}
                <div className="flex justify-between">
                  <button
                    className={`p-2 bg-[#1C2957] rounded-md text-white hover:bg-[#1C2957] mt-4 ${
                      currentQuestionIndex === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#1C2957]"
                    }`}
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    {t("testPaper.previous")}
                  </button>
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-700"
                      onClick={handleSubmit}
                    >
                      {t("testPaper.submit")}
                    </button>
                  ) : (
                    <button
                      className="p-2 bg-[#1C2957] rounded-md text-white hover:bg-[#1C2957] mt-4"
                      onClick={handleNext}
                    >
                      {t("testPaper.next")}
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Testpaper;
