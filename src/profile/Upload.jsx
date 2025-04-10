import { useState } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Upload.css"; // Importing CSS file

const Upload = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title || !description || !category) {
      toast.error("Please fill all fields and select a video file.", { position: "top-center", autoClose: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("source", selectedFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    try {
      await axios.post("https://vidspark-backend.onrender.com/videoUpload", formData);
      toast.success("Video uploaded successfully!", { position: "top-center", autoClose: 2000 });

      // Close modal after success with delay
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video. Please try again.", { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Toast notifications */}
        <ToastContainer />

        <div className="modal-header">
          <h2>Upload Video</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="upload-area">
          <FaCloudUploadAlt className="upload-icon" />
          <p>Select a file to upload</p>
          <input type="file" accept="video/*" style={{ display: "none" }} id="fileInput" onChange={handleFileSelect} />
          <button className="upload-btn" onClick={() => document.getElementById("fileInput").click()}>
            Select Video Files
          </button>
          {selectedFile && <p className="file-name">Selected: {selectedFile?.name}</p>}

          <form className="upload-form">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Video Title" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Video Description" />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="Category (e.g. Comedy, Horror)" />
          </form>

          <button className="upload-btn" onClick={handleUpload}>Upload</button>
          <button className="close-upload-btn" onClick={onClose}>
            <FaTimes /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
