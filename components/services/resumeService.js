
import axios from "axios";
import { BASE_URL } from "../constant/constant";
export const createResume = async (selectedLang="en") => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://apiwl.novajobs.us/api/user/resume-create?lang=${selectedLang}`,
      {},
      {
        headers: {
          Authorization: `${token}`, // 👈 no extra space before token
        },
      }
    );

    return response.data; // return the full response data
  } catch (error) {
    console.error("Error creating resume:", error);
    throw error;
  }
};

export const resumeScan = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://apiwl.novajobs.us/api/user/resume-create`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response.data; // always return data layer
  } catch (error) {
    console.error("Error scanning resume:", error);
    throw error;
  }
};

export const CreateCV = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://apiwl.novajobs.us/api/user/coverletter?lang=${selectedLang}`,
      {},
      {
        headers: {
          Authorization: ` ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error creating resume:", err);
    throw error;
  }
};

const token = () => localStorage.getItem("token");

export const getResumes = async (lang) => {
  return axios.get(`${BASE_URL}/api/user/resume-list?lang=${lang}`, {
    headers: { Authorization: token() },
  });
};

export const deleteResume = async (id, lang) => {
  return axios.delete(`${BASE_URL}/api/user/resume-list/${id}?lang=${lang}`, {
    headers: { Authorization: token() },
  });
};

export const updateResumeTitle = async (id, newTitle) => {
  return axios.put(
    `${BASE_URL}/api/user/resume-details/${id}`,
    { resume_title: newTitle },
    { headers: { Authorization: token() } }
  );
};

export const duplicateResume = async (id) => {
  return axios.post(
    `${BASE_URL}/api/user/resumes/${id}/duplicate`,
    {},
    { headers: { Authorization: token() } }
  );
};
