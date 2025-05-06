import React, { useContext } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { ResumeContext } from "../context/ResumeContext";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../Constant/constant";

const ImageWrapper = ({
  src,
  alt,
  defaultSize = 100,
  size,
  border = "2px",
  borderColor = "black",
}) => {
  const finalSize = size || defaultSize;

  // Function to handle the image source
  const getImageSrc = (url) => {
    if (!url) return null;

    // If it's a base64 image, return it as is
    if (url.startsWith('data:image')) {
      return url;
    }

    // If it's a URL, ensure it's properly formatted
    // If the URL already contains the base URL or https://, return it as is
    if (url.includes(BASE_URL) || url.startsWith('https://')) {
      return url;
    }

    // If it's a relative path, prepend the base URL
    const cleanPath = url.replace(/^\/+/, '');
    return `${BASE_URL}/${cleanPath}`;
  };

  // Get the formatted image source
  const imageSrc = getImageSrc(src);

  return (
    <div
      className="rounded-full overflow-hidden"
      style={{
        width: `${finalSize}px`,
        height: `${finalSize}px`,
        border: `${border} solid ${borderColor}`,
      }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt || "Profile image"}
          width={finalSize}
          height={finalSize}
          className="object-cover w-full h-full"
          unoptimized={true}
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
  );
};

ImageWrapper.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  defaultSize: PropTypes.number,
  size: PropTypes.number,
  border: PropTypes.string,
  borderColor: PropTypes.string,
};

ImageWrapper.defaultProps = {
  alt: "profile image",
  defaultSize: 100,
  border: "2px",
  borderColor: "black",
};

const TextWrapper = ({
  name,
  position,
  headerColor = "black",
  orientation = "column",
  className = "",
}) => {
  return (
    <div
      className={`flex ${
        orientation === "row" ? "flex-row " : "flex-col "
      }  ${className}`}
    >
      <h1
        contentEditable
        suppressContentEditableWarning
        className="text-2xl font-bold"
        style={{ color: headerColor }}
      >
        {name}
      </h1>
      <p
        contentEditable
        suppressContentEditableWarning
        className="text-lg font-semibold text-gray-700"
      >
        {position}
      </p>
    </div>
  );
};

TextWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  headerColor: PropTypes.string,
  orientation: PropTypes.oneOf(["row", "column"]),
  className: PropTypes.string,
};

TextWrapper.defaultProps = {
  position: "",
  headerColor: "black",
  orientation: "column",
  className: "",
};

const SummaryWrapper = ({
  summary,
  headerColor = "black",
  editable = true,
  className = "",
}) => {
  const { t } = useTranslation();
  const { backgroundColorss } = useContext(ResumeContext);
  return (
    summary &&
    summary.length > 0 && (
      <div className={`mb-1 ${className}`}>
        <h2
          style={{
            color: `${
              headerColor == "black" ? `${backgroundColorss}` : headerColor
            }`,
            borderBottom: `2px solid ${
              headerColor == "black" ? `${backgroundColorss}` : headerColor
            }`,
          }}
          className="text-lg font-bold mb-1 "
        >
          {t("resumePreview.summary")}
        </h2>
        {/* <p
        style={{color:headerColor}}
          className="break-words hover:outline-dashed hover:scale-105 hover:outline-2 hover:outline-gray-400"
          contentEditable={editable}
          suppressContentEditableWarning={true}
        >
          {summary}
        </p> */}
        <p
          style={{ color: headerColor }}
          className="break-words hover:outline-dashed hover:scale-105 hover:outline-2 hover:outline-gray-400"
          contentEditable={editable}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: summary }}
        ></p>
      </div>
    )
  );
};

SummaryWrapper.propTypes = {
  summary: PropTypes.string,
  headerColor: PropTypes.string,
  editable: PropTypes.bool,
  className: PropTypes.string,
};

SummaryWrapper.defaultProps = {
  summary: "",
  headerColor: "black",
  editable: true,
  className: "",
};

export { ImageWrapper, TextWrapper, SummaryWrapper };
