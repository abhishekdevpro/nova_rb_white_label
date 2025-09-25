"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  getScanHistory,
  handleDuplicateScan,
  resumeAnalysis,
} from "../../components/services/scanService";
import Button from "../../components/ui/Button";
import { useModal } from "../../hooks/useModal";
import FormModal from "../../components/ui/FormModal";
import FullPageLoader from "../../components/ResumeLoader/Loader";

// ✅ Utility: Truncate text safely
const truncate = (text, max = 120) =>
  text?.length > max ? text.slice(0, max) + "..." : text || "";

export default function ScanHistory() {
  const router = useRouter();

  // ✅ State
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [duplicateResumeId, setDuplicateResumeId] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  // ✅ Modals
  const addJDModal = useModal(); // for adding new JD
  const viewJDModal = useModal(); // for viewing JD

  // ✅ Fetch scan history
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const list = await getScanHistory();
        setScans(list || []);
        setError("");
      } catch (e) {
        console.error("Failed to load scan history", e);
        setError("Failed to load scan history");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ✅ Handle duplicate scan
  const handleDuplicate = async (resume) => {
    try {
      const res = await handleDuplicateScan(resume.resume_id);

      if (res.data.code === 200 || res.data.status === "success") {
        setDuplicateResumeId(res.data.data.id);
        addJDModal.openModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while duplicating resume");
    }
  };

  // ✅ Handle resume analysis
  const handleResumeAnalysis = async () => {
    setScanning(true);
    addJDModal.closeModal();
    try {
      console.log("Analyzing resume ID:", duplicateResumeId);
      const res = await resumeAnalysis(duplicateResumeId, jobDescription);
      if (res.data.code === 200 || res.data.status === "success") {
        toast.success(res.data.message || "Resume analyzed successfully");
        router.push(`/match-report/${res.data.data.id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error while resume analysis"
      );
    } finally {
      setScanning(false);
    }
  };

  // ✅ Handle viewing JD
  const viewJobDescription = (jobDesc) => {
    setJobDescription(jobDesc);
    viewJDModal.openModal();
  };

  return (
    <>
      {scanning && <FullPageLoader isLoading={scanning} mode="scanner" />}

      <div className="container mx-auto md:p-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Resume Analysis History
        </h1>

        {/* Table Wrapper with scroll */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
            <table className="w-full min-w-full divide-y divide-gray-200">
              {/* Sticky Header */}
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {[
                    "Score",
                    "Job Title",
                    "Job Description",
                    "Scan Date",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Scrollable Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Loading */}
                {loading && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-sm text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                )}

                {/* Error */}
                {!loading && error && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-sm text-red-600"
                    >
                      {error}
                    </td>
                  </tr>
                )}

                {/* Empty */}
                {!loading && !error && scans.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-sm text-gray-500"
                    >
                      No records
                    </td>
                  </tr>
                )}

                {/* Data */}
                {!loading &&
                  !error &&
                  scans.map((item) => {
                    // const parsed =
                    //   (item.ai_resume_parse_data &&
                    //     (item.ai_resume_parse_data)) ||
                    //   {};
                    const position =
                      item.ai_resume_parse_data?.templateData?.position ||
                      "Job Title";

                    return (
                      <tr key={item.resume_id} className="hover:bg-gray-50">
                        {/* Score */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                              {item.resume_analysis_details.match_score
                                ?.percentage || "N.A"}
                            </div>
                          </div>
                        </td>

                        {/* Job Title */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <Link
                            href={`/match-report/${item.id}`}
                            className="text-blue-700 hover:underline"
                          >
                            {position}
                          </Link>
                        </td>

                        {/* Job Description */}
                        <td className="px-6 py-4 text-sm text-center text-gray-600 max-w-xl">
                          <Button
                            onClick={() =>
                              viewJobDescription(item.job_description)
                            }
                            variant={
                              item.job_description ? "outline" : "disabled"
                            }
                            disabled={!item.job_description}
                            size="sm"
                            className="disabled:cursor-not-allowed"
                          >
                            View JD
                          </Button>
                        </td>

                        {/* Scan Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString()
                            : "-"}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 flex gap-2 justify-center items-center">
                          <Button
                            startIcon={<Eye />}
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/match-report/${item.resume_id}`)}
                          >
                            View
                          </Button>
                          <Button
                            startIcon={<Copy />}
                            variant="outline"
                            size="sm"
                            onClick={() => handleDuplicate(item)}
                          >
                            Analyze with New JD
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Add New JD */}
      {addJDModal.isOpen && (
        <FormModal
          isOpen={addJDModal.isOpen}
          onClose={addJDModal.closeModal}
          onSubmit={handleResumeAnalysis}
          title="Add new Job Description"
          submitText="Resume Analysis"
          canSubmit={!!jobDescription.trim()}
        >
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste or add job description"
            className="h-64 w-full border rounded-lg p-3 text-sm"
          />
        </FormModal>
      )}

      {/* Modal: View JD */}
      {viewJDModal.isOpen && (
        <FormModal
          isOpen={viewJDModal.isOpen}
          onClose={viewJDModal.closeModal}
          title="Your Job Description"
          type="view"
        >
          <textarea
            value={jobDescription}
            readOnly
            className="h-64 w-full border rounded-lg p-3 text-sm bg-gray-50"
          />
        </FormModal>
      )}
    </>
  );
}
