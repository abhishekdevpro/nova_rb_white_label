"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateResume = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace this with your actual token
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://apiwl.novajobs.us/api/user/resume-create",
        {},
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      // Assuming the response contains the ID
      console.log(response);
      const { id } = response.data.data;

      // Navigate to the dynamic route
      router.push(`/dashboard/resume-builder/${id}`);
    } catch (err) {
      console.error("Error creating cover letter:", err);

      // ✅ Check for specific API error message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message); // fallback to generic error
      } else {
        setError("Failed to create cover letter. Please try again.");
      }
    } finally {
      setTimeout(() => {
      setLoading(false);
    }, 3000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-200 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Resume Builder</h1>
        <p className="mb-6 text-gray-600">
          Click the button below to create your resume.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleCreateResume}
          className={`px-6 py-3 text-white font-semibold rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Your Resume"}
        </button>
      </div>
    </main>
  );
}
