// import React, { useState } from 'react';
// // import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import ProfilePage from './Profile';
// import { FaBars } from 'react-icons/fa'; // Import hamburger icon

// const DashboardLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       <div className="w-full shadow-md">
//         <ProfilePage />
//       </div>
//       <div className="flex flex-1 w-full  mt-4 bg-white shadow-md rounded-lg overflow-hidden">
//         {/* Hamburger icon for mobile view */}
//         <div className="md:hidden">
//           <button onClick={toggleSidebar} className="p-4 focus:outline-none">
//             <FaBars className="text-2xl" />
//           </button>
//         </div>

//         {/* Sidebar */}
//         <div className={`md:w-64 flex-shrink-0 md:block  ${isSidebarOpen ? 'block' : 'hidden'}`}>
//           <Sidebar onClose={closeSidebar} />
//         </div>

//         {/* Content area */}
//         <div className="flex-1 w-full max-w-8xl p-4 overflow-auto">
//           {/* <Outlet /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { useEffect, useState } from "react";
import CoverLetterSection from "../../components/dashboard/CoverLetterSection";
import InterviewSection from "../../components/dashboard/InterviewSection";
import ResumeStrength from "../../components/dashboard/ResumeStrength";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import MyResume from "./MyResume";

import FullScreenLoader from "../../components/ResumeLoader/Loader";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
// import MyJobs from "./myjobs";
// import JobSearch from "./jobsearch";

export default function DashboardPage() {
  const [strength, setStrength] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const resumeStrength = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/user/resume-list/0?resume_default=true`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data?.code === 200 || response.data?.status === "success") {
        setStrength(response.data.data?.resume_strenght_details || null);
        setResumeId(response.data.data?.resume_id || null);
      } else {
        setStrength(null);
        setResumeId(null);
      }
    } catch (err) {
      setError(err.message);
      setStrength(null);
      setResumeId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resumeStrength();
    // Set up an interval to refresh data every 5 minutes
    const interval = setInterval(resumeStrength, 300000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Show the loader while loading
  if (loading) {
    return <FullScreenLoader />;
  }

  const handleCreateCoverLetter = () => {
    setTimeout(() => {
      router.push("/dashboard/cv-builder");
    }, 2000);
  };
  const handleCreateResume = () => {
    setTimeout(() => {
      router.push("/dashboard/resume-builder");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full p-4">
        {/* Create New Resume Button */}
        <button
          onClick={handleCreateResume}
          className="flex  items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md w-full md:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Resume
        </button>

        {/* Create New Cover Letter Button */}
        <button
          onClick={handleCreateCoverLetter}
          className="flex items-center px-6 py-3 justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md w-full md:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Cover Letter
        </button>

        {/* My Profile Dashboard Button */}
        <Link href="https://novajobs.us/user/jobs-profile">
          <button className="flex items-center px-6 py-3 justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md w-full md:w-auto">
            My Profile Dashboard
          </button>
        </Link>
      </div>
      <div className="flex flex-col max-w-7xl mx-auto md:flex-row min-h-screen bg-white border p-4">
        {/* Sidebar */}

        <Sidebar
          score={strength?.resume_strenght || 0}
          resumeId={resumeId || null}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <button
              onClick={handleCreateResume}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-[#369984] transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" /> Create New Resume
            </button>
            <button
              onClick={handleCreateCoverLetter}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" /> Create New Cover Letters
            </button>
            <button
              onClick={handleMyDashboard}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200 font-medium shadow-sm"
            >
              My Profile Dashboard
            </button>
          </div> */}

          <h1 className="text-2xl font-bold mb-6">
            Your Recommended Next Steps
          </h1>
          <ResumeStrength
            score={strength?.resume_strenght || 0}
            strength={strength || {}}
            resumeId={resumeId || null}
          />
          <InterviewSection />
          <CoverLetterSection />
        </main>
      </div>
      <MyResume />

      {/* <JobSearch /> */}
    </>
  );
}
