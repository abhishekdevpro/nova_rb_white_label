import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ],
};

const Summary = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Update handleChange to handle the content directly
  const handleChange = (value) => {
    setResumeData({ ...resumeData, summary: value });
  };

  return (
    <div className="flex-col-gap-2 mt-10">
      <div className="flex justify-between mb-2">
        <h2 className="input-title text-black  text-3xl">Summary</h2>
        <button
          type="button"
          className="border bg-black text-white px-3 rounded-3xl"
        >
          + AI Assist
        </button>
      </div>

      <div className=" w-full max-w-[23rem]">
        <ReactQuill
          placeholder="Summary"
          name="summary"
          className="w-full other-input border-black border h-50"
          value={resumeData.summary}
          onChange={handleChange} // Pass the content directly
          // maxLength="500"
          modules={quillModules}
        />
      </div>
    </div>
  );
};

export default Summary;
