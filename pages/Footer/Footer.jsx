// import React from "react";
// import Image from "next/image";
// import logo from "../Footer/logo.png";
// import { useState } from "react";
// import axios from "axios";
// import Link from "next/link"; // Import Link from next/link
// import img from "../Footer/footer-img.jpg";
// import { BASE_URL } from "../../components/Constant/constant";
// import { useTranslation } from "react-i18next";
// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//  const { t } = useTranslation();
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent form default behavior

//     // Sending raw JSON data in the POST request
//     axios
//       .post(
//         `${BASE_URL}/api/user/user-subscribe`,
//         JSON.stringify({ email }), // Sending email in raw JSON
//         {
//           headers: {
//             "Content-Type": "application/json", // Specify raw JSON
//           },
//         }
//       )
//       .then((response) => {
//         // Handle the response, show a success message
//         setMessage("Subscribed successfully!");
//         toast.success("Subscribed successfully!");
//       })
//       .catch((error) => {
//         // Handle the error, show an error message
//         setMessage("Subscription failed. Please try again.");
//         console.error("Error subscribing:", error);
//       });
//   };

//   return (
//     <>
//       <footer className="bg-gray-300 text-black py-8" id="footerbg">
//         <div className="container mx-auto flex flex-col gap-7 justify-between px-6">
//           <div className="flex flex-wrap justify-between px-2 md:px-[65px]">
//             <div className="w-auto h mb-6 md:mb-0">
//               <Link href="/">
//                 <Image src={logo} alt="logo" className="h-12 w-[200px]" />
//               </Link>
//               <p className="text-lg text-bold px-5">
//                 Building Careers of Tomorrow
//               </p>
//             </div>
//             {/* <div className="flex flex-wrap justify-between px-2 md:px-[65px]">
//             <div className="w-auto h mb-6 md:mb-0">
//               <Link href="/">
//                 <Image src={img} alt="logo" className="h-20 w-[300px]" />
//               </Link>
//               </div>
//             </div> */}

//             <div className="w-full md:w-auto mb-6 md:mb-0">
//               <h2 className="text-lg font-semibold text-[#1C2957]">
//                 Get Our Weekly
//               </h2>
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col md:flex-row gap-3"
//               >
//                 <input
//                   type="email"
//                   placeholder="Type your email..."
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)} // Update the email state
//                   required
//                   className="p-2 rounded text-black"
//                 />
//                 <button
//                   type="submit"
//                   className="md:px-4 md:py-1 p-1 rounded-full bg-white text-black hover:bg-blue-500"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//               {message && <p>{message}</p>} {/* Display message */}
//             </div>
//           </div>
//           <br />
//           <div className="flex flex-wrap justify-around">
//             <div className="w-full md:w-auto mb-6 md:mb-0" id="footer">
//               <h2 className="text-lg font-bold text-[#1C2957]">nova job </h2>
//               <ul>
//                 <li>
//                   <Link href="/footers/Aboutus">
//                     <span>About Us</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/Careers">
//                     <span>Careers</span>
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link href="/footers/placement">
//                     <span>Placement Support</span>
//                   </Link>
//                 </li> */}
//                 <li>
//                   <Link href="https://blog.novajob.fr/">
//                     <span>Resources</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="w-full md:w-auto mb-6 md:mb-0">
//               <h2 className="text-lg font-bold text-[#1C2957]">Support</h2>
//               <ul>
//                 <li>
//                   <Link href="/footers/Salarytools">
//                     <span>Salary Tool</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/TermsandConditions">
//                     <span>Terms & Conditions</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/PrivacyPolicy">
//                     <span>Privacy Policy</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="w-full md:w-auto mb-6 md:mb-0">
//               <h2 className="text-lg font-bold text-[#1C2957]">
//                 Scope & Products
//               </h2>
//               <ul>
//                 <li>
//                   <Link href="/footers/AiResumeBuilder">
//                     <span>Ai Resume Builder</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/AiSkillTests">
//                     <span>Ai Skill Tests</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/AiCVParsing">
//                     <span>Ai CV Parsing</span>
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link href="">
//                     <span>White Labelling</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#">
//                     <span>Generative AI</span>
//                   </Link>
//                 </li> */}
//               </ul>
//             </div>
//             <div className="w-full md:w-auto mb-6 md:mb-0">
//               <h2 className="text-lg font-bold text-[#1C2957]">Ai Resources</h2>
//               <ul>
//                 <li>
//                   <Link href="/footers/AIEnhancedResumeAccuracy">
//                     <span>Ai - Resume Accuracy</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/AiResumeEnhancer">
//                     <span>Ai - Resume Enhancer</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/AiJobMatchApply">
//                     <span>Ai - Job Match & Apply</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="container text-base md:mx-auto text-center border-t border-white pt-6 mt-6">
//           <p className="text-[#1C2957] text-right">
//             &copy; Copyright By novajob.fr All Rights Reserved
//           </p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;
import React, { useContext } from "react";
import Image from "next/image";
import logo from "../Footer/logo.png";
import { useState } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link from next/link
import img from "../Footer/footer-img.jpg";
import { BASE_URL } from "../../components/Constant/constant";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ResumeContext } from "../../components/context/ResumeContext";
import axiosInstance from "../../components/utils/axiosInstance";
import SupportPopup from "./supportpopup";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { selectedLang } = useContext(ResumeContext);
  const [showPopup, setShowPopup] = useState(false);

  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default behavior

    // Sending raw JSON data in the POST request
    axiosInstance
      .post(
        `/api/user/user-subscribe?lang=${selectedLang}`,
        JSON.stringify({ email }), // Sending email in raw JSON
        {
          headers: {
            "Content-Type": "application/json", // Specify raw JSON
          },
        }
      )
      .then((response) => {
        // Handle the response, show a success message
        setMessage("Subscribed successfully!");
        toast.success(t("footer.toast_success"));
        setEmail("");
      })
      .catch((error) => {
        // Handle the error, show an error message
        setMessage("Subscription failed. Please try again.");
        console.error("Error subscribing:", error);
      });
  };

  return (
    <>
    
    </>
  );
};

export default Footer;
