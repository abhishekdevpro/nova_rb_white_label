// 'use client'

// export default function UploadStep({ onNext, onBack, onChange, value }) {
//     return (
//       <div className="space-y-6">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">
//             Are you uploading an existing resume?
//           </h2>
//           <p className="mt-2 text-gray-600">
//             Just review, edit, and update it with new information
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <button
//             onClick={() => {
//               onChange('upload')
//               onNext()
//             }}
//             className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
//           >
//             <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-8 h-8 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//                 />
//               </svg>
//             </div>
//             <h3 className="font-bold mb-2">Yes, upload from my resume</h3>
//             <p className="text-gray-600 text-sm">
//               We will give you expert guidance to fill out your info and enhance your resume
//             </p>
//           </button>

//           <button
//             onClick={() => {
//               onChange('scratch')
//               onNext()
//             }}
//             className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
//           >
//             <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-8 h-8 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                 />
//               </svg>
//             </div>
//             <h3 className="font-bold mb-2">No, start from scratch</h3>
//             <p className="text-gray-600 text-sm">
//               We will guide you through the whole process so your skills can shine
//             </p>
//           </button>
//         </div>

//         <div className="flex justify-between mt-8">
//           <button
//             onClick={onBack}
//             className="px-6 py-2 border rounded-lg hover:bg-gray-50"
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     )
//   }

"use client";

import { FaUpload, FaFileAlt } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import DefaultResumeData from "../utility/DefaultResumeData";
import { ResumeContext } from "../context/ResumeContext";
import FullScreenLoader from '../ResumeLoader/Loader';

export default function UploadStep({ onNext, onBack, onChange, value }) {
  const router = useRouter();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const { setResumeData } = useContext(ResumeContext);
  const [showLoader, setShowLoader] = useState(false);
  const resumeId = router.query.id || localStorage.getItem("resumeId");
  if (!resumeId) {
    toast.error("Resume ID or token not found");
    return;
  }
  // const handleStartFromScratch = async () => {
  //   setShowLoadingAnimation(true);
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.post(
  //       'https://apiwl.novajobs.us/api/user/resume-create',
  //       {},
  //       { headers: { Authorization: token } }
  //     );

  //     if (response.data && response.data.data) {
  //       const { id, file_path, ai_resume_parse_data } = response.data.data;

  //       const parsedData = JSON.parse(ai_resume_parse_data).templateData;

  //       setResumeData(DefaultResumeData);
  //       localStorage.setItem('resumeData', JSON.stringify(parsedData));
  //       localStorage.setItem('resumeId', id);
  //       localStorage.setItem('location', file_path);

  //       router.push(`/dashboard/aibuilder/${id}`);
  //       setShowLoadingAnimation(false);
  //       // setEditingReady(true);
  //       // setShowOverlay(false);
  //       toast.success('Started from scratch successfully!');
  //     } else {
  //       throw new Error('Invalid response data format');
  //     }
  //   } catch (error) {
  //     console.error('Error creating resume from scratch:', error);
  //     toast.error('Failed to start from scratch');
  //     setShowLoadingAnimation(false);
  //   }
  // };

  const handleStartFromScratch =()=>{
  setShowLoader(true)
  setResumeData(DefaultResumeData);
  setTimeout(()=>{
    router.push(`/dashboard/aibuilder/${resumeId}`)
  },3000)
  
}

  return (
    <>
    {showLoader && <FullScreenLoader />}
    <div className="space-y-6 bg-gradient-to-b from-white to-blue-200">
      <div className="text-center bg-blue-700 pt-4 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-white">
          Are you uploading an existing resume?
        </h2>
        <p className="mt-2 text-white">
          Just review, edit, and update it with new information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => {
            onChange("upload");
            onNext();
          }}
          className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUpload className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="font-bold mb-2">Yes, upload from my resume</h3>
          <p className="text-gray-600 text-sm">
            We will give you expert guidance to fill out your info and enhance
            your resume
          </p>
        </button>

        <button
          onClick={handleStartFromScratch}
          className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaFileAlt className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="font-bold mb-2">No, start from scratch</h3>
          <p className="text-gray-600 text-sm">
            We will guide you through the whole process so your skills can shine
          </p>
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
    </>
  );
}
