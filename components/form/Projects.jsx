import React, { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import FormButton from "./FormButton";
import { ResumeContext } from "../../pages/builder";
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

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleProjects = (value, index, fieldName) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][fieldName] = value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...(resumeData.projects || []),
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeProjects = (index) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects[index] = newProjects[newProjects.length - 1];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="flex-col-gap-2 mt-10">
      <h2 className="input-title text-black text-3xl">Projects</h2>
      {resumeData.projects && resumeData.projects.length > 0 ? (
        resumeData.projects.map((project, index) => (
          <div key={index} className="f-col">
            <input
              type="text"
              placeholder="Project Name"
              name="name"
              className="w-full other-input border-black border"
              value={project.name}
              onChange={(e) => handleProjects(e.target.value, index, "name")}
            />
            <input
              type="text"
              placeholder="Link"
              name="link"
              className="w-full other-input border-black border"
              value={project.link}
              onChange={(e) => handleProjects(e.target.value, index, "link")}
            />
            <ReactQuill
              value={project.description}
              onChange={(content) =>
                handleProjects(content, index, "description")
              }
              modules={quillModules}
              placeholder="Description"
              className="w-full other-input border-black border h-50"
            />
            <ReactQuill
              value={project.keyAchievements}
              onChange={(content) =>
                handleProjects(content, index, "keyAchievements")
              }
              modules={quillModules}
              placeholder="Key Achievements"
              className="w-full other-input border-black border h-50"
            />
            <div className="flex-wrap-gap-2">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className="other-input"
                value={project.startYear}
                onChange={(e) =>
                  handleProjects(e.target.value, index, "startYear")
                }
              />
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className="other-input"
                value={project.endYear}
                onChange={(e) =>
                  handleProjects(e.target.value, index, "endYear")
                }
              />
            </div>
          </div>
        ))
      ) : (
        <p>No projects available. Add a new project to get started.</p>
      )}
      <FormButton
        size={resumeData.projects ? resumeData.projects.length : 0}
        add={addProjects}
        remove={removeProjects}
      />
    </div>
  );
};

export default Projects;
