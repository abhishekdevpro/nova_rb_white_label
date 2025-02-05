// import React from 'react';
// import { MessageCircle } from 'lucide-react';

// const InterviewSection = () => {
//   return (
//     <div className="border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
//           <div className="p-2 bg-purple-100 rounded-lg">
//             <MessageCircle className="w-6 h-6 text-purple-600" />
//           </div>
//           <div className="w-full sm:w-auto">
//             <h3 className="text-lg font-semibold mb-2 sm:mb-1">Ace Your Interview</h3>
//             <p className="text-gray-600 max-w-md">
//               Learn and practice your skills with our partner site, Big Interview.
//               Prep by reviewing common interview questions and receive personalized A.I. feedback.
//             </p>
//           </div>
//         </div>
//         <button className="w-full sm:w-auto px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap">
//         Visit Resources
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InterviewSection;

import Link from "next/link";

const InterviewSection = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Clear Your Interview</h3>
            <p className="text-gray-600 max-w-md">
              Gain insights from our expert-written resources and receive weekly
              updates straight to your inbox.
            </p>
          </div>
        </div>
        <Link href={`https://blog.resumeintellect.com/`}>
          <button className="w-full sm:w-auto px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap">
            Visit Resources
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewSection;
