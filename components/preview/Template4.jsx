// import React from "react";
import {useContext, useRef} from "react";
// import { ResumeContext } from "../context/ResumeContext";
import { ResumeContext } from "../context/ResumeContext";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight,FaLink,
    FaUnderline,
  } from "react-icons/fa";
  import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
  import dynamic from "next/dynamic";

import EducationSection from "./Education";

import { SummaryWrapper, TextWrapper } from "./Common";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";

  // Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
const Template4 = () => {
    const { resumeData, setResumeData,headerColor,backgroundColorss } = useContext(ResumeContext);
    const templateRef = useRef(null);

    const extractHtml = () => {
        const htmlContent = templateRef.current?.outerHTML;
        console.log(htmlContent);
        return htmlContent;
    };
    const icons = [
        { name: "github", icon: <FaGithub /> },
        { name: "linkedin", icon: <FaLinkedin /> },
        { name: "twitter", icon: <FaTwitter /> },
        { name: "facebook", icon: <FaFacebook /> },
        { name: "instagram", icon: <FaInstagram /> },
        { name: "youtube", icon: <FaYoutube /> },
        { name: "website", icon: <CgWebsite /> },
      ];
    
  return (
    <div ref={templateRef} className="flex flex-col md:flex-row max-w-4xl mx-auto my-5 ">
     <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">

      <TextWrapper
                      name={resumeData.name}
                      position={resumeData.position}
                      className="justify-start items-start"
                      headerColor={backgroundColorss}
                      orientation="column" // Use "column" for stacked layout
                    />
      <SummaryWrapper
            summary={resumeData.summary}
            headerColor={"black"}
            editable={true} // Set to false if editing is not required
            className="mt-4"
          />

 <WorkExperience
                   itemClassNames={{
                    title: "text-lg font-bold mb-1 border-b-2 border-gray-300 editable", 
                    company:"font-semibold",
                    position:"content",
                    location:"sub-content",
                   
                  }} resumeData={resumeData} headerColor={backgroundColorss} />
                   <ProjectsSection
                    resumeData={resumeData} headerColor={backgroundColorss} />
    </div>

    <div className="flex-1 p-5 bg-gray-100" style={{ backgroundColor: backgroundColorss }}>
      <div className="mb-6">
        <h4 className="text-xl font-bold  text-[#818cf8] mb-3 border-b border-gray-300 pb-1"  style={{
              color: "#FFF",
              borderBottom: `2px solid #FFF`,
            }}>Contact</h4>
        <ContactAndSocialMedia
      contactData={{
        teldata: resumeData.contactInformation,
        emaildata: resumeData.email,
        addressdata: resumeData.address,
      }}
      socialMediaData={resumeData.socialMedia}
      icons={icons}
      layout="column" // or "row"
      contactClass=""
      socialMediaClass=""
       textColor="text-white"
    />
      </div>

     
       <SkillsWrapper
                   
                    skills={resumeData.skills}
                    headerColor={"white"}
                    droppableId="skills-section-1"
                    className="mt-4"
                  />

      <div className="mb-6">
        {resumeData.education.length > 0 && (
          <div className="">
           
             <EducationSection
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="column"
              educationData={resumeData?.education}
              headerColor={backgroundColorss?"white":"black"}
              
            />
          </div>
          
        )}

      </div>

    </div>
  </div>
  );
};

const A4PageWrapper = ({ children }) => {
    const alertA4Size = () => {
      const preview = document.querySelector(".preview");
      const previewHeight = preview.offsetHeight;
      console.log(previewHeight);
      if (previewHeight > 1122) {
        alert("A4 size exceeded");
      }
    };
  
    return (
      <div className="w-8.5in border p-3" onLoad={alertA4Size}>
        {children}
      </div>
    );
  
  };

export default Template4;
