import React, { useState } from "react";
import { FaFileUpload, FaDownload } from "react-icons/fa";
import axios from "axios";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputBlob, setOutputBlob] = useState(null);
  const [outputFileName, setOutputFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setOutputBlob(null);
    setOutputFileName(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${backendUrl}/api/files/upload`,
        formData,
        {
          responseType: "blob", // Expecting file back
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      setOutputBlob(blob);
      setOutputFileName(selectedFile.name.replace("Input", "Output"));
    } catch (err) {
      setError("File processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!outputBlob || !outputFileName) return;

    const url = window.URL.createObjectURL(outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Bank Statement Processor</h1>
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <label className="block mb-4">
          <span className="block mb-2 text-lg font-medium">
            Choose Input File:
          </span>
          <div className="relative w-full">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 pl-10 rounded bg-gray-800 text-white border border-gray-700 file:cursor-pointer"
            />
            <FaFileUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-center" />
          </div>
        </label>

        <button
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
        >
          {loading ? "Processing..." : "Get Processed File"}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {outputBlob && (
          <div className="mt-6 text-center">
            <p className="mb-2 text-green-400">File processed successfully!</p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              <FaDownload /> Download Output
            </button>
          </div>
        )}
        <p className="mt-4 text-gray-400 text-sm text-center">
          Supported formats: IDFC, Axis, HDFC, ICICI, and generic CSV files.
        </p>
        
      </div>
      <p className="mt-2 text-red-300 text-sm text-center">
          Note: Please ensure the file is named correctly (e.g., Input_*.csv). & according to input files, the output file may vary
        </p>
    </div>
  );
}
