import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
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
  const [loading, setLoading] = useState(false);
  // const [aisummary, setAiSummary] = useState({});

  // Update handleChange to handle the content directly
  const handleChange = (value) => {
    setResumeData({ ...resumeData, summary: value });
    
  };
  const postResumeSummary = async () => {
    if(resumeData?.position){
      console.log("This is job title in resume data in summary "+resumeData.position)
    }
    setLoading(true);
    const requestBody = {
      content: resumeData.position,
      file_location:"",
      key: "resumesummery",
      keyword: "professional summery in manner of description",
    };
  
    try {
      const response = await axios.post('https://api.novajobs.us/api/user/ai-resume-summery-data',
        requestBody,
       { headers: {
          'Content-Type': 'application/json', 
          'Authorization': localStorage.getItem('token'),
        },
      }
      );
      console.log('Response Data:', response.data);
      setLoading(true);
      if (response.data.status === "success" && 
        response.data.data?.resume_analysis?.professional_summary) {
      setResumeData({ 
        ...resumeData, 
        summary: response.data.data.resume_analysis.professional_summary 
      });
    }
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate summary.');
    }
    finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex-col-gap-2 mt-10">
      <div className="flex justify-between mb-2">
        <h2 className="input-title text-black  text-3xl">Summary</h2>
        <button
  type="button"
  className="border bg-black text-white px-3 rounded-3xl"
  onClick={postResumeSummary}
  disabled={loading}
>
  {loading ? "Generating..." : "+ AI Assist"}
</button>
      </div>

      <div className=" w-full max-w-[23rem]">
        {/* {
        
        aisummary?console.log("This is ai summary "+aisummary):console.log("couldn't find ai summary")
        } */}
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
