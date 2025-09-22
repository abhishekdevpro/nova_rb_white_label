import React, { useState, useEffect, useContext } from "react";
import { Download, Edit, Trash, Plus } from "lucide-react";
import { useRouter } from "next/router";
import FullScreenLoader from "../../components/ResumeLoader/Loader";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ResumeContext } from "../../components/context/ResumeContext";
import Button from "../ui/Button";

import {
  fetchCoverLetters,
  deleteCoverLetter,
  updateCoverLetterTitle,
  downloadCoverLetter,
} from "../services/coverLetterService";

const MyCvLetter = () => {
  const { t } = useTranslation();
  const [coverletters, setCoverLetters] = useState([]);
  const [deletecoverletterId, setDeletecoverletterId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCoverLetter, setCurrentCoverLetter] = useState(null);
  const [newCoverLetterTitle, setNewCoverLetterTitle] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const { selectedLang } = useContext(ResumeContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCoverLetters(token, selectedLang)
        .then((data) => {
          if (data.length === 0) {
            toast.info("No cover letters");
          }
          setCoverLetters(data);
        })
        .catch((error) => {
          console.error("Error fetching cover letters:", error);
          toast.error("Error fetching cover letter list");
        });
    }
  }, [selectedLang]);

  const handleEdit = (id) => {
    router.push(`/dashboard/cvaibuilder/${id}`);
  };

  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const blob = await downloadCoverLetter(id, token, selectedLang);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download the file. Please try again later.");
    }
  };

  const handleDeleteCvLetter = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await deleteCoverLetter(
        deletecoverletterId,
        token,
        selectedLang
      );
      if (res.code === 200 || res.status === "success") {
        toast.success("Coverletter Deleted successfully");
        setIsDeleteModalOpen(false);
        setCoverLetters(
          coverletters.filter((c) => c.id !== deletecoverletterId)
        );
      }
    } catch (error) {
      console.error("Error deleting cover letter:", error);
      toast.error("Error deleting cover letter");
    }
  };

  const handleOpenEditModal = (coverletter) => {
    setCurrentCoverLetter(coverletter);
    setNewCoverLetterTitle(coverletter.cover_letter_title);
    setIsEditModalOpen(true);
  };

  const handleUpdateCvLetterTitle = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await updateCoverLetterTitle(
        currentCoverLetter.id,
        newCoverLetterTitle,
        token,
        selectedLang
      );
      toast.success(res.message || "Coverletter Title updated successfully");
      setIsEditModalOpen(false);
      setCoverLetters((prev) =>
        prev.map((c) =>
          c.id === currentCoverLetter.id
            ? { ...c, cover_letter_title: newCoverLetterTitle }
            : c
        )
      );
    } catch (error) {
      console.error("Error updating cover letter title:", error);
      toast.error("Error updating cover letter title");
    }
  };

  const handleCreate = () => {
    setShowLoader(true);
    setTimeout(() => {
      router.push("/dashboard/cv-builder");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {showLoader && <FullScreenLoader />}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My CoverLetters</h1>
        <Button
          onClick={handleCreate}
          // className="flex items-center px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium shadow-sm"
          startIcon={<Plus />}
        >
          Create New CoverLetter
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto max-h-96 overflow-y-scroll">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Modifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coverletters.length > 0 ? (
                coverletters.map((coverletter, index) => (
                  <tr key={coverletter.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">
                          {coverletter.cover_letter_title}
                        </span>
                        <Button
                          onClick={() => handleOpenEditModal(coverletter)}
                          // className="text-teal-700 hover:text-blue-800"
                          startIcon={<Edit />}
                          variant="outline"
                          size="sm"
                        ></Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(coverletter.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(coverletter.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => handleEdit(coverletter.id)}
                          // className="text-teal-700 hover:text-teal-800 transition-colors duration-200"
                          startIcon={<Edit />}
                          variant="outline"
                        >
                          {/* <Edit className="w-5 h-5" /> */}
                        </Button>
                        <Button
                          onClick={() => {
                            setIsDeleteModalOpen(true);
                            setDeletecoverletterId(coverletter.id);
                          }}
                          startIcon={<Trash className="w-5 h-5" />}
                          variant="outline"
                          className="text-red-700"
                          // className="text-red-600 hover:text-red-800"
                        ></Button>
                        <Button
                          // onClick={() => handleDownload(coverletter.id)}
                          // className="text-teal-700 hover:text-teal-800 transition-colors duration-200"
                          startIcon={<Download className="w-5 h-5" />}
                          variant="outline"
                        ></Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Please create your coverLetter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t("mycvletter.delete_confirm")}
            </h2>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                {t("mycvletter.cancel")}
              </button>
              <button
                onClick={handleDeleteCvLetter}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                {t("mycvletter.delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t("mycvletter.edit_cover_letter_title")}
            </h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCoverLetterTitle}
              onChange={(e) => setNewCoverLetterTitle(e.target.value)}
              placeholder={t("mycvletter.enter_new_title")}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                {t("mycvletter.cancel")}
              </button>
              <button
                onClick={handleUpdateCvLetterTitle}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-teal-700"
              >
                {t("mycvletter.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCvLetter;
