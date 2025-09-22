// "use client"
// import { Mail } from "lucide-react";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import FullScreenLoader from "../ResumeLoader/Loader";

// const CoverLetterSection = ({ letterCount }) => {
//   const [showLoader, setShowLoader] = useState(false);
//   const router = useRouter();

//   const handleClick = () => {
//     setShowLoader(true);
//     setTimeout(() => {
//       router.push('/dashboard/cvletterlist');
//     }, 2000);
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
//       {showLoader && <FullScreenLoader />}

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-3">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
//           <div className="p-2 bg-green-100 rounded-lg">
//             <Mail className="w-6 h-6 text-green-600" />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Your Cover Letters</h3>
//             {letterCount !== undefined && (
//               <p className="text-gray-600">
//                 You have created {letterCount} cover letter{letterCount !== 1 ? 's' : ''}
//               </p>
//             )}
//           </div>
//         </div>
//         <button
//           onClick={handleClick}
//           className="w-full sm:w-auto px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap"
//         >
//           View Cover Letters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CoverLetterSection;

"use client";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ FIXED
import { useState } from "react";
import FullScreenLoader from "../ResumeLoader/Loader";
import Button from "../ui/Button";

const CoverLetterSection = ({ letterCount }) => {
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setShowLoader(true);
    setTimeout(() => {
      router.push("/dashboard/cvletterlist");
    }, 2000);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
      {showLoader && <FullScreenLoader />}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="p-2 bg-green-100 rounded-lg">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Your Cover Letters</h3>
            {letterCount !== undefined && (
              <p className="text-gray-600">
                You have created {letterCount} cover letter
                {letterCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={handleClick}
          variant="outline"
          className="w-full md:w-auto"
          // className="w-full sm:w-auto px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap"
        >
          View Cover Letters
        </Button>
      </div>
    </div>
  );
};

export default CoverLetterSection;
