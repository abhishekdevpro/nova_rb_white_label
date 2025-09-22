import axios from "axios";
// import axiosInstance from "../utils/axiosInstance";

const getAuthHeaders = () => ({
  Authorization: localStorage.getItem("token"),
});

export const getJobTitle = async () => {
  const res = await axios.get(`https://apiwl.novajobs.us/api/user/job-title`);
  return res.data;
};

export const getCountries = async () => {
  const res = await axios.get("https://apiwl.novajobs.us/api/user/countries");
  return res.data;
};

export const getLocations = async () => {
  const res = await axios.get(`https://apiwl.novajobs.us/api/user/locations`);
  return res.data;
};

export const getScanHistory = async () => {
  const res = await axios.get(
    `https://apiwl.novajobs.us/api/user/resume-list?is_resume_analysis=true`,
    {
      headers: getAuthHeaders(), // ✅ fixed
    }
  );

  return res?.data?.data || [];
};

export const handleDuplicateScan = async (resumeId) => {
  const res = await axios.post(
    `https://apiwl.novajobs.us/api/user/resumes/${resumeId}/duplicate?is_resume_analysis=true`,
    {},
    {
      headers: getAuthHeaders(), // ✅ fixed
    }
  );

  return res;
};

export const resumeAnalysis = async (id, jobDescription) => {
  const res = await axios.post(
    `https://apiwl.novajobs.us/api/user/resumes/${id}/scan`,
    {
      job_description: jobDescription,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return res; // return full response payload
};
