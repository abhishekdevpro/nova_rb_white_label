// import { ResumeContext } from "../context/ResumeContext";
// import FormButton from "./FormButton";
// import React, { useContext, useState } from "react";
// import { MdRemoveCircle } from "react-icons/md";
// import { AlertCircle, X } from "lucide-react";

// import { useRouter } from "next/router";
// import { useTranslation } from "react-i18next";
// const SOCIAL_MEDIA_OPTIONS = [
//   { name: "GitHub", baseUrl: "https://github.com/" },
//   { name: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
//   { name: "Twitter", baseUrl: "https://twitter.com/" },
//   { name: "Facebook", baseUrl: "https://facebook.com/" },
//   { name: "Instagram", baseUrl: "https://instagram.com/" },
//   { name: "Website", baseUrl: "https://" },
// ];

// const SocialMedia = () => {
//   const { t } = useTranslation();
//   const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
//     useContext(ResumeContext);
//   const [activeTooltip, setActiveTooltip] = useState(null);
//   const router = useRouter();
//   const { improve } = router.query;
//   // Handle the changes in social media dropdown and URL input
//   const handleSocialMedia = (e, index) => {
//     const newSocialMedia = [...resumeData.socialMedia];
//     newSocialMedia[index][e.target.name] = e.target.value.replace(
//       "https://",
//       ""
//     );
//     setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//   };

//   // Handle platform selection change and set default link
//   const handlePlatformChange = (index, platform) => {
//     const newSocialMedia = [...resumeData.socialMedia];

//     // Find the selected platform in the SOCIAL_MEDIA_OPTIONS array
//     const selectedPlatform = SOCIAL_MEDIA_OPTIONS.find(
//       (option) => option.name === platform
//     );

//     // Check if the selectedPlatform exists before trying to access baseUrl
//     if (selectedPlatform) {
//       newSocialMedia[index].socialMedia = platform;
//       newSocialMedia[index].link = selectedPlatform.baseUrl; // Set the default link for selected platform
//       setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//     } else {
//       console.error(
//         `Platform "${platform}" not found in SOCIAL_MEDIA_OPTIONS.`
//       );
//     }
//   };

//   // Add a new social media entry
//   const addSocialMedia = () => {
//     setResumeData({
//       ...resumeData,
//       socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
//     });
//   };

//   // Remove a social media entry
//   const removeSocialMedia = (index) => {
//     const newSocialMedia = [...resumeData.socialMedia];
//     newSocialMedia.splice(index, 1); // Remove the entry at the given index
//     setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//   };
//   const hasErrors = (index, field) => {
//     const workStrength = resumeStrength?.social_strenght?.[index];
//     return (
//       workStrength &&
//       Array.isArray(workStrength[field]) &&
//       workStrength[field].length > 0
//     );
//   };
//   const getErrorMessages = (index, field) => {
//     const workStrength = resumeStrength?.social_strenght?.[index];
//     return workStrength && Array.isArray(workStrength[field])
//       ? workStrength[field]
//       : [];
//   };
//   return (

//     <div className="flex-col flex gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-black text-3xl">
//         {t("builder_forms.social_media.title")}
//       </h2>
//       <h2 className="input-title text-black">
//         {t("builder_forms.social_media.subtitle")}
//       </h2>

//       {resumeData.socialMedia.map((socialMedia, index) => (
//         <div
//           key={index}
//           className="flex flex-col md:flex-row gap-2 w-full md:w-auto"
//         >
//           <select
//             className="other-input border-black bg-gray-200 font-semibold text-center w-1/3"
//             value={socialMedia.socialMedia || ""}
//             onChange={(e) => handlePlatformChange(index, e.target.value)}
//           >
//             <option value="">
//               {t("builder_forms.social_media.select_placeholder")}
//             </option>
//             {SOCIAL_MEDIA_OPTIONS.map((option) => (
//               <option key={option.name} value={option.name}>
//                 {option.name}
//               </option>
//             ))}
//           </select>

//           {/* Input for the username or link */}
//           <div className="relative mb-2">
//             <input
//               type="text"
//               placeholder={t("builder_forms.social_media.username_placeholder")}
//               name="link"
//               className={`w-full other-input border ${
//                 improve && hasErrors(index, "socialMedia")
//                   ? "border-red-500"
//                   : "border-black"
//               }`}
//               value={socialMedia.link.replace("https://", "")}
//               onChange={(e) => handleSocialMedia(e, index)}
//             />
//             {improve && hasErrors(index, "socialMedia") && (
//               <button
//                 type="button"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
//                 onClick={() =>
//                   setActiveTooltip(
//                     activeTooltip === `socialMedia-${index}`
//                       ? null
//                       : `socialMedia-${index}`
//                   )
//                 }
//               >
//                 <AlertCircle className="w-5 h-5" />
//               </button>
//             )}
//             {activeTooltip === `socialMedia-${index}` && (
//               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
//                 <div className="p-4 border-b border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <AlertCircle className="w-5 h-5 text-red-400" />
//                       <span className="font-medium text-black">
//                         {t("builder_forms.social_media.suggestion_title")}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => setActiveTooltip(null)}
//                       className="text-black transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   {getErrorMessages(index, "socialMedia").map((msg, i) => (
//                     <div
//                       key={i}
//                       className="flex items-start space-x-3 mb-3 last:mb-0"
//                     >
//                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                       <p className="text-black text-sm">{msg}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={() => removeSocialMedia(index)}
//             aria-label="Remove"
//             className="p-2 text-white bg-red-700 rounded-lg text-xl mb-2"
//           >
//             <MdRemoveCircle />
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={addSocialMedia}
//         className="p-2 text-white bg-black rounded-lg text-sm"
//       >
//         {t("builder_forms.social_media.add_section")}
//       </button>
//     </div>
//   );
// };

// export default SocialMedia;
import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import React, { useContext, useState } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { AlertCircle, X } from "lucide-react";

import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SOCIAL_MEDIA_OPTIONS = [
  { name: "GitHub", baseUrl: "https://github.com/" },
  { name: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
  { name: "Twitter", baseUrl: "https://twitter.com/" },
  { name: "Facebook", baseUrl: "https://facebook.com/" },
  { name: "Instagram", baseUrl: "https://instagram.com/" },
  { name: "Website", baseUrl: "https://" },
];

// Maximum character length for social media handles/URLs
const MAX_URL_LENGTH = 100;

const SocialMedia = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const router = useRouter();
  const { improve } = router.query;
  const [validationErrors, setValidationErrors] = useState({});
  const isValidUrl = (url, platform) => {
    // Find the platform to check its base URL
    const platformOption = SOCIAL_MEDIA_OPTIONS.find(
      (option) => option.name === platform
    );

    if (!platformOption) return false;

    // Check if the URL starts with the correct base URL
    const baseUrl = platformOption.baseUrl;
    const fullUrl = url.startsWith("https://") ? url : `https://${url}`;

    // For "Website", we only check if it's a valid URL format
    if (platform === "Website") {
      try {
        new URL(fullUrl);
        return true;
      } catch (err) {
        return false;
      }
    }

    // For other platforms, check if it starts with the correct base URL
    return fullUrl.startsWith(baseUrl) && fullUrl.length > baseUrl.length;
  };
  // Handle the changes in social media dropdown and URL input
  const handleSocialMedia = (e, index) => {
    const { name, value } = e.target;
    const newSocialMedia = [...resumeData.socialMedia];

    // Remove https:// prefix if present
    const cleanValue = value.replace("https://", "");

    // Check if URL exceeds max length
    if (cleanValue.length > MAX_URL_LENGTH) {
      setValidationErrors({
        ...validationErrors,
        [`${index}-${name}`]: `URL must be ${MAX_URL_LENGTH} characters or less`,
      });
      return; // Don't update state if validation fails
    }

    // Validate URL format if platform is selected
    if (name === "link" && newSocialMedia[index].socialMedia) {
      const isValid = isValidUrl(cleanValue, newSocialMedia[index].socialMedia);

      if (!isValid) {
        setValidationErrors({
          ...validationErrors,
          [`${index}-${name}`]: `Please enter a valid ${newSocialMedia[index].socialMedia} URL`,
        });
      } else {
        // Clear error if URL is valid
        const updatedErrors = { ...validationErrors };
        delete updatedErrors[`${index}-${name}`];
        setValidationErrors(updatedErrors);
      }
    }

    newSocialMedia[index][name] = cleanValue;
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
      // Set the default link for selected platform
      newSocialMedia[index].link = selectedPlatform.baseUrl.replace(
        "https://",
        ""
      );

      // Clear any existing errors for this field
      const updatedErrors = { ...validationErrors };
      delete updatedErrors[`${index}-link`];
      setValidationErrors(updatedErrors);

      setResumeData({ ...resumeData, socialMedia: newSocialMedia });
    } else {
      console.error(
        `Platform "${platform}" not found in SOCIAL_MEDIA_OPTIONS.`
      );
    }
  };

  // Add a new social media entry
  const addSocialMedia = () => {
    // Limit the number of social media entries to 5
    if (resumeData.socialMedia.length >= 5) {
      setValidationErrors({
        ...validationErrors,
        general: "Maximum of 5 social media profiles allowed",
      });
      setTimeout(() => {
        const updatedErrors = { ...validationErrors };
        delete updatedErrors.general;
        setValidationErrors(updatedErrors);
      }, 3000);
      return;
    }

    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  // Remove a social media entry
  const removeSocialMedia = (index) => {
    if (resumeData.socialMedia.length <= 1) {
      toast.warn("At least one social media profile is required");

      setValidationErrors({
        ...validationErrors,
        general: "At least one social media profile is required",
      });
      setTimeout(() => {
        const updatedErrors = { ...validationErrors };
        delete updatedErrors.general;
        setValidationErrors(updatedErrors);
      }, 3000);
      return; // Don't remove if it's the last one
    }
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia.splice(index, 1); // Remove the entry at the given index

    // Clear any errors related to this index
    const updatedErrors = {};
    Object.keys(validationErrors).forEach((key) => {
      if (!key.startsWith(`${index}-`)) {
        updatedErrors[key] = validationErrors[key];
      }
    });
    setValidationErrors(updatedErrors);

    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  const hasErrors = (index, field) => {
    // Check for both validation errors and resume strength errors
    const validationError = validationErrors[`${index}-${field}`];

    const workStrength = resumeStrength?.social_strenght?.[index];
    const strengthError =
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0;

    return validationError || strengthError;
  };

  const getErrorMessages = (index, field) => {
    // Get validation errors
    const validationError = validationErrors[`${index}-${field}`];
    const validationErrorArray = validationError ? [validationError] : [];

    // Get resume strength errors
    const workStrength = resumeStrength?.social_strenght?.[index];
    const strengthErrors =
      workStrength && Array.isArray(workStrength[field])
        ? workStrength[field]
        : [];

    // Combine both types of errors
    return [...validationErrorArray, ...strengthErrors];
  };

  return (
    <div className="flex-col flex gap-3 w-full mt-10 px-10 max-h-[400px] overflow-y-auto">
      <h2 className="input-title text-black text-3xl">
        {t("resumeStrength.sections.socialLinks")}
      </h2>
      <h2 className="input-title text-black">
        {t("builder_forms.social_media.subtitle")}
      </h2>
      {validationErrors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {validationErrors.general}
        </div>
      )}
      <div className="space-y-4">
        {resumeData.socialMedia.map((socialMedia, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-2 w-full md:w-auto"
          >
            <select
              className="other-input border-black bg-gray-200 font-semibold text-center w-1/3"
              value={socialMedia.socialMedia || ""}
              onChange={(e) => handlePlatformChange(index, e.target.value)}
            >
              <option value="">
                {t("builder_forms.social_media.select_placeholder")}
              </option>
              {SOCIAL_MEDIA_OPTIONS.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* Input for the username or link */}
            <div className="relative mb-2">
              <input
                type="text"
                placeholder={t(
                  "builder_forms.social_media.username_placeholder"
                )}
                name="link"
                className={`w-full other-input border ${
                  (improve && hasErrors(index, "socialMedia")) ||
                  validationErrors[`${index}-link`]
                    ? "border-red-500"
                    : "border-black"
                }`}
                value={socialMedia.link.replace("https://", "")}
                onChange={(e) => handleSocialMedia(e, index)}
                maxLength={MAX_URL_LENGTH}
              />
              {((improve && hasErrors(index, "socialMedia")) ||
                validationErrors[`${index}-link`]) && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                  onClick={() =>
                    setActiveTooltip(
                      activeTooltip === `socialMedia-${index}`
                        ? null
                        : `socialMedia-${index}`
                    )
                  }
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              )}
              {activeTooltip === `socialMedia-${index}` && (
                <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="font-medium text-black">
                          {t("builder_forms.social_media.suggestion_title")}
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTooltip(null)}
                        className="text-black transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    {validationErrors[`${index}-link`] && (
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                        <p className="text-gray-700 text-sm">
                          {validationErrors[`${index}-link`]}
                        </p>
                      </div>
                    )}
                    {improve &&
                      getErrorMessages(index, "socialMedia").map((msg, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 mb-3 last:mb-0"
                        >
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                          <p className="text-gray-700 text-sm">{msg}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeSocialMedia(index)}
              aria-label="Remove"
              className="p-2 mt-0 text-white bg-red-700 rounded-lg text-xl mb-4"
            >
              <MdRemoveCircle />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addSocialMedia}
        className="p-2 text-white bg-black rounded-lg text-sm"
      >
        {t("builder_forms.social_media.add_section")}
      </button>
    </div>
  );
};

export default SocialMedia;
