// services/coverLetterService.js
import axios from "axios";
import { BASE_URL } from "../constant/constant";

// Fetch all cover letters
export const fetchCoverLetters = async (token, lang) => {
  const response = await axios.get(
    `${BASE_URL}/api/user/coverletter?lang=${lang}`,
    { headers: { Authorization: token } }
  );
  return response?.data?.data || [];
};

// Delete a cover letter
export const deleteCoverLetter = async (id, token, lang) => {
  const response = await axios.delete(
    `${BASE_URL}/api/user/coverletter/${id}?lang=${lang}`,
    { headers: { Authorization: token } }
  );
  return response.data;
};

// Update cover letter title
export const updateCoverLetterTitle = async (id, title, token, lang) => {
  const response = await axios.put(
    `${BASE_URL}/api/user/coverletter-details/${id}?lang=${lang}`,
    { cover_letter_title: title },
    { headers: { Authorization: token } }
  );
  return response.data;
};

// Download cover letter
export const downloadCoverLetter = async (id, token, lang) => {
  const apiUrl = `${BASE_URL}/api/user/download-coverletter/${id}?lang=${lang}`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to download file");

  const blob = await response.blob();
  return blob;
};
