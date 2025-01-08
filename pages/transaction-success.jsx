
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SuccessPage() {
  const [token, setToken] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(false); // For loader state

  // Retrieve session_id (transactionId) and resume_id from URL path
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionIdFromUrl = urlParams.get('session_id');
    const resumeIdFromUrl = urlParams.get('resume_id');

    if (transactionIdFromUrl && resumeIdFromUrl) {
      setTransactionId(transactionIdFromUrl);
      setResumeId(resumeIdFromUrl);
    }
  }, []);

  // Retrieve token from localStorage
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const downloadFile = async () => {
    if (!token || !transactionId || !resumeId) {
      console.error("Missing required parameters.");
      return;
    }

    // Start the download process, set loading to true
    setLoading(true);
    

    try {
      // Construct the URL with transactionId and resumeId as part of the path
      const response = await axios.get(`https://api.novajobs.us/api/user/download-file/${transactionId}/${resumeId}`, {
        headers: {
          Authorization: token, // Include the authorization token
        },
        responseType: "blob", // Ensure the response is treated as a file
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Extract filename from response headers if provided
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
        : "downloaded_file.pdf";

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Show success notification once file is downloaded
      toast.success("Your resume has been downloaded successfully!");
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("Your Resume Already Downloaded");
    } finally {
      // Set loading to false once the download process is done
      setLoading(false);
    }
  };

  useEffect(() => {
    // Trigger download only when token, transactionId, and resumeId are available
    if (token && transactionId && resumeId) {
      downloadFile();
    }
  }, [token, transactionId, resumeId]);

  return (
    <>
      <div className="text-center my-5">
        <h1>💲 Transactions</h1>
        <p className="my-5" style={{ fontSize: "40px" }}>
          💵 Your Payment is Successful!
        </p>

        {/* Display loader only when download is in progress */}
        {loading && (
          <div>
            <p>Downloading your resume...</p>
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </>
  );
}
