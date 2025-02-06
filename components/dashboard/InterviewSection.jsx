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

import { MessageCircle } from "lucide-react";
import Link from "next/link";

const InterviewSection = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center">
        <div className="flex flex-col items-start md:flex-row md:items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <MessageCircle />
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
