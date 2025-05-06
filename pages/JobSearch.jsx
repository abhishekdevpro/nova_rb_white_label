
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import axiosInstance from "../components/utils/axiosInstance";

const JobSearch = () => {
  const { t } = useTranslation();
  const [jobResults, setJobResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     console.log("called");
  //     try {
  //       const response = await fetch(
  //         "https://api.novajob.fr/api/user/job-list"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch job data");
  //       }
  //       const data = await response.json();
  //       console.log(response, ">>>data");
  //       setJobResults(data.data);
  //     } catch (err) {
  //       setError(t("jobsearch.error_message"));
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchJobs();
  // }, [t]);
  useEffect(() => {
    const fetchJobs = async () => {
      console.log("called");
      try {
        const response = await axiosInstance.get("/api/user/job-list");
        console.log(response, ">>>data");
        setJobResults(response.data.data);
      } catch (err) {
        console.error(err);
        setError(t("jobsearch.error_message"));
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [t]);

  const handleTitleClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };
  console.log(jobResults, ">>>>>>>job result");
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("jobsearch.my_jobs")}
        </h1>
      </div>

      <div className="bg-gray-100 p-4">
        {loading && (
          <div className="mt-6 text-center">{t("jobsearch.loading")}</div>
        )}
        {error && <div className="mt-6 text-center text-red-500">{error}</div>}
        {!loading && !error && jobResults.length > 0 && (
          <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobResults.map((job) => (
              <div
                key={job.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <h3
                  className="text-xl font-semibold text-[#1C2957] cursor-pointer"
                  onClick={() => handleTitleClick(job)}
                >
                  {job.job_title}
                </h3>
                <p className="text-sm text-gray-600">{job.company_name}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
                <a
                  href={job.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1C2957] hover:underline mt-2 block"
                >
                  {t("jobsearch.apply_now")}
                </a>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && jobResults.length === 0 && (
          <div className="mt-6 text-center">{t("jobsearch.no_jobs_found")}</div>
        )}
      </div>

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedJob.job_title}</h2>
            <p className="mb-4">{selectedJob.job_description}</p>
            <div className="flex justify-end">
              <a
                href={selectedJob.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1C2957] text-white py-2 px-4 rounded-lg mr-2"
              >
                {t("jobsearch.apply_now")}
              </a>
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                {t("myresume.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
