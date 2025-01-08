// import React from "react";
import { useContext, useRef } from "react";
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
  FaYoutube,
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
import { ResumeContext } from "../context/ResumeContext";

import EducationSection from "./Education";
import { SummaryWrapper, TextWrapper } from "./Common";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";

// Importing draggable components dynamically
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);
const Template3 = () => {
  const { resumeData, setResumeData, headerColor,backgroundColorss } = useContext(ResumeContext);
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
    <div className="max-w-3xl mx-auto border-2 p-2 ">
      <header className="mb-6">
        <TextWrapper
          name={resumeData.name}
          position={resumeData.position}
          headerColor={backgroundColorss}
          orientation="column" // Use "column" for stacked layout
        />
        <ContactAndSocialMedia
          contactData={{
            teldata: resumeData.contactInformation,
            emaildata: resumeData.email,
            addressdata: resumeData.address,
          }}
          socialMediaData={resumeData.socialMedia}
          icons={icons}
          layout="row" // or "row"
          contactClass=""
          socialMediaClass=""
          className="items-start justify-start"
        />
      </header>

      <section className="mb-6">
        <SummaryWrapper
          summary={resumeData.summary}
          headerColor={"black"}
          editable={true} // Set to false if editing is not required
          className="mt-4"
        />
      </section>

      <section className="mb-6">
       
        <div className="col-span-2 space-y-2">
          <WorkExperience
            itemClassNames={{
              title:
                "text-lg font-bold mb-1 border-b-2 border-gray-300 editable",
              company: "font-semibold",
              position: "",
              location: "",
            }}
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />

          <ProjectsSection resumeData={resumeData} headerColor={backgroundColorss} />
        </div>
      </section>
      <section className="mb-6">
        

        <EducationSection
          itemClassNames={{
            school: "text-gray-600",
            degree: "text-xl font-semibold text-gray-800",
            location: "text-gray-800",
          }}
          headerColor={backgroundColorss}
          educationData={resumeData?.education}
          layout="row"
        />
      </section>

      <SkillsWrapper
        skills={resumeData.skills}
        headerColor={"black"}
        droppableId="skills-section-1"
        className="mt-4"
        layout="row"
      />
      {console.log(backgroundColorss,"fhgjh")}
      <Language title="Languages" languages={resumeData.languages}
             headerColor= {"black"}
            />
            

            <Certification
              title="Certifications"
              certifications={resumeData.certifications}
              hasBullet={false}
              headerColor= {"black"}
            />
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

export default Template3;
