"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";
import SocialInfo from "./SocialInfo";
import ImageWrapper from "./ImageWrapper";

const CoverLetter3 = ({}) => {
  const templateRef = useRef(null);
  const { coverLetterData, backgroundColorss, selectedFont } =
    useContext(CoverLetterContext);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };

  return (
    <div
      ref={templateRef}
      className=""
      style={{ fontFamily: `${selectedFont}` }}
    >
      <div
        className=" mx-auto p-4 "
        // style={{ backgroundColor: backgroundColorss || "white" }}
      >
        {/* Personal Information Section */}
        <div
          className=" flex justify-between p-4 gap-2 "
          style={{
            borderBottom: `2px solid ${backgroundColorss}`,
          }}
        >
          {/* Personal Information Section */}

          <div>
            <PersonalInfoWrapper
              personalDetails={coverLetterData?.personalDetails || {}}
              // headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
          <div>
            {coverLetterData?.photo && (
              <ImageWrapper
                src={coverLetterData.photo}
                className="w-32 h-32 rounded-full"
              />
            )}
          </div>
          <div>
            <SocialInfo
              personalDetails={coverLetterData?.personalDetails || {}}
              // headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
        </div>
      </div>
      <div className="px-4">
        {/* Letter Details Section */}
        <LetterDetailsWrapper
          letterDetails={coverLetterData?.letterDetails || {}}
          // editable={true}
          headerColor={"black"}
          className="p-4"
        />

        {/* Introduction and Body Section */}
        <IntroductionBodyWrapper
          // introduction={coverLetterData.introduction}
          body={coverLetterData.body}
          // closing={coverLetterData.closing}
          gratitude={coverLetterData.gratitude}
          signature={coverLetterData.signature}
          editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
        />
      </div>
    </div>
  );
};

export default CoverLetter3;
