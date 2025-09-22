"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ResumeContext } from "../../components/context/ResumeContext";
import { Edit, Trash, Plus, Eye, Copy, Loader2 } from "lucide-react";
import Button from "../../components/ui/Button";
import { useModal } from "../../hooks/useModal";

import {
  getResumes,
  deleteResume,
  updateResumeTitle,
  duplicateResume,
  createResume,
} from "../../components/services/resumeService";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import FormModal from "../../components/ui/FormModal";

const MyResume = () => {
  // const { t } = useTranslation();
  const { selectedLang } = useContext(ResumeContext);
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // modals
  const deleteModal = useModal();
  const editModal = useModal();
  const duplicateModal = useModal();

  useEffect(() => {
    (async () => {
      try {
        const res = await getResumes(selectedLang);
        const list = res?.data.data || [];
        if (list.length === 0) toast.info("Create your first resume.");
        setResumes(list);
      } catch (error) {
        console.error("Error fetching resume list:", error);
        toast.error("Failed to fetch resumes.");
      }
    })();
  }, [selectedLang]);

  const handleEdit = (resumeId) => {
    router.push(`/dashboard/aibuilder/${resumeId}`);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteResume(currentResume.resume_id, selectedLang);
      if (res.data.code === 200 || res.data.status === "success") {
        toast.success(res.data.message || "Resume Deleted Successfully");
        setResumes((prev) => prev.filter((r) => r.resume_id !== currentResume.resume_id));
        deleteModal.closeModal();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data.message || "Error while updating the title"
      );
    }
  };

  const handleUpdateTitle = async (newTitle) => {
    try {
      const res = await updateResumeTitle(currentResume.resume_id, newTitle);
      if (res.data.code === 200 || res.data.status === "success") {
        toast.success(res.data.message || "Title updated successfully");
        setResumes((prev) =>
          prev.map((r) =>
            r.resume_id === currentResume.resume_id ? { ...r, resume_title: newTitle } : r
          )
        );
        editModal.closeModal();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data.message || "Error while updating the title"
      );
    }
  };

  const handleDuplicate = async () => {
    try {
      const res = await duplicateResume(currentResume.resume_id);
      if (res.data.code === 200 || res.data.status === "success") {
        toast.success("Resume duplicated successfully");
        router.push(`/dashboard/aibuilder/${res.data.data.resume_id}`);
      }
      duplicateModal.closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to duplicate resume");
    }
  };

  const handleCreateResume = async () => {
    setLoading(true);
    try {
      const res = await createResume(selectedLang);
      if (res.code === 200 || res.status === "success") {
        router.push(`/dashboard/resume-builder/${res.data.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error while creating resume"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-3 md:p-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          My Resumes
        </h1>

        <Button
          onClick={handleCreateResume}
          startIcon={loading ? <Loader2 className="animate-spin" /> : <Plus />}
        >
          {loading ? "Creating..." : "Create New Resume"}
        </Button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
        {/* Scroll wrapper for small screens */}
        <div className="overflow-x-auto">
          {/* Fixed Header */}
          <div className="bg-gray-50 border-b border-gray-200 min-w-[800px]">
            <div className="grid grid-cols-6 gap-4 px-4 sm:px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <div className="text-center">Sr.no.</div>
              <div>My Resumes</div>
              <div className="text-center">Modifications</div>
              <div className="text-center">Created </div>
              <div className="text-center">Strength</div>
              <div className="text-center">Actions</div>
            </div>
          </div>

          {/* Scrollable Body */}
          <div
            className="max-h-96 md:max-h-[60vh] overflow-y-auto min-w-[800px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 #f1f5f9",
            }}
          >
            {resumes.length > 0 ? (
              resumes.map((resume, index) => (
                <div
                  key={resume.resume_id}
                  className="grid grid-cols-6 gap-4 px-4 sm:px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 items-center"
                >
                  {/* Sr. No */}
                  <div className="text-sm text-gray-500 text-center">
                    {index + 1}.
                  </div>

                  {/* Resume Title */}
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm text-gray-900 truncate">
                      {resume.resume_title || "Untitled"}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentResume(resume);
                        editModal.openModal();
                      }}
                      className="text-teal-700 hover:text-teal-800 p-1 rounded hover:bg-teal-50 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Modified Date */}
                  <div className="text-sm text-gray-500 text-center">
                    {new Date(resume.updated_at).toLocaleDateString()}
                  </div>

                  {/* Created Date */}
                  <div className="text-sm text-gray-500 text-center">
                    {new Date(resume.created_at).toLocaleDateString()}
                  </div>

                  {/* Strength */}
                  <div className="text-center">
                    {resume.resume_strenght_details?.resume_strenght ? (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          resume.resume_strenght_details.resume_strenght > 60
                            ? "bg-green-100 text-teal-700"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {resume.resume_strenght_details.resume_strenght}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center space-x-2 ">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(resume.id)}
                      startIcon={<Edit className="text-green-500" />}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      startIcon={<Trash className="text-red-500" />}
                      onClick={() => {
                        setCurrentResume(resume);
                        deleteModal.openModal();
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/match-report/${resume.id}`)}
                      startIcon={<Eye />}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentResume(resume);
                        duplicateModal.openModal();
                      }}
                      startIcon={<Copy />}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500 text-lg">
                  Please upload your resume
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        onConfirm={handleDelete}
        title={"Delete Resume"}
        message="Are you sure you want to delete this resume? This action cannot be undone."
        confirmText={"Delete"}
        type="danger"
      />

      {/* Edit Modal */}
      <FormModal
        isOpen={editModal.isOpen}
        onClose={editModal.closeModal}
        onSubmit={() => handleUpdateTitle(currentResume?.resume_title)}
        title={"Edit Resume Title"}
        submitText={"save"}
      >
        <input
          type="text"
          value={currentResume?.resume_title || ""}
          onChange={(e) =>
            setCurrentResume((prev) => ({
              ...prev,
              resume_title: e.target.value,
            }))
          }
          className="w-full border rounded px-3 py-2"
          placeholder={"Enter resume title"}
        />
      </FormModal>

      {/* Duplicate Modal */}
      <ConfirmationModal
        isOpen={duplicateModal.isOpen}
        onClose={duplicateModal.closeModal}
        onConfirm={handleDuplicate}
        title="Duplicate Resume"
        message="Are you sure you want to duplicate this resume?"
        confirmText="Duplicate"
        type="info"
      />
    </div>
  );
};

export default MyResume;
