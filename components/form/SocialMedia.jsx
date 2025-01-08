

import { ResumeContext } from "../context/ResumeContext";

import React, { useContext } from "react";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";

const SOCIAL_MEDIA_OPTIONS = [
  { name: "GitHub", baseUrl: "https://github.com/" },
  { name: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
  { name: "Twitter", baseUrl: "https://twitter.com/" },
  { name: "Facebook", baseUrl: "https://facebook.com/" },
  { name: "Instagram", baseUrl: "https://instagram.com/" },
  { name: "Website", baseUrl: "https://" },
];
const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // social media
  const handleSocialMedia = (e, index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index][e.target.name] = e.target.value.replace(
      "https://",
      ""
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };
// Handle platform selection change and set default link
const handlePlatformChange = (index, platform) => {
  const newSocialMedia = [...resumeData.socialMedia];

  // Find the selected platform in the SOCIAL_MEDIA_OPTIONS array
  const selectedPlatform = SOCIAL_MEDIA_OPTIONS.find(
    (option) => option.name === platform
  );

  // Check if the selectedPlatform exists before trying to access baseUrl
  if (selectedPlatform) {
    newSocialMedia[index].socialMedia = platform;
    newSocialMedia[index].link = selectedPlatform.baseUrl; // Set the default link for selected platform
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  } else {
    console.error(
      `Platform "${platform}" not found in SOCIAL_MEDIA_OPTIONS.`
    );
  }
};
  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  const removeSocialMedia = (index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia.splice(index, 1); // Remove the entry at the given index
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  return (
    <div className="flex flex-col gap-4 mt-10 p-4 items-center justify-center">
      <h2 className="input-title text-black text-3xl">Social Media</h2>
      <h2 className="input-title text-black text-lg">Please mention platform and their link</h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <select
            className="other-input border-black bg-gray-200 font-semibold text-center w-1/3"
            value={socialMedia.socialMedia || ""}
            onChange={(e) => handlePlatformChange(index, e.target.value)}
          >
            <option value="">Select </option>
            {SOCIAL_MEDIA_OPTIONS.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>

          {/* Input for the username or link */}
          <input
            type="text"
            placeholder="Username"
            name="link"
            className="other-input border-black border w-2/3"
            value={socialMedia.link.replace("https://", "")}
            onChange={(e) => handleSocialMedia(e, index)}
          />
          <button type="button" onClick={() => removeSocialMedia(index)}
            aria-label="Remove"
            className="p-2 text-white bg-red-700 rounded-lg text-xl mb-2">
            <MdRemoveCircle /> 
          </button>
        </div>
      ))}
        
      
       <div className=" mb-2">
        <button type="button" 
          aria-label="Add"
          className="p-2 text-white bg-black rounded-lg text-sm"   onClick={addSocialMedia}> 
        
         <span> ✙ Add section</span>
        </button>
       
      </div>
    </div>
  );
};

export default SocialMedia;


