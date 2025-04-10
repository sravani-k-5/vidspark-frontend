import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const FileUploadForm = ({ onClose }) => {
    console.log(onClose)
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
      await axios.post("http://localhost:3002/videoUpload", formData);
      toast.success("Video uploaded successfully!", { position: "top-center", autoClose: 2000 });

      // Close modal after success with delay
      setTimeout(() => {
        if (onClose) onClose();
      }, 2500);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video. Please try again.", { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Upload Video</h2>
          <Form>
            {/* File Upload */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Video</Form.Label>
              <Form.Control type="file" accept="video/*" onChange={handleFileChange} />
            </Form.Group>

            {/* Video Title */}
            <Form.Group controlId="videoTitle" className="mb-3">
              <Form.Label>Video Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            {/* Video Description */}
            <Form.Group controlId="videoDescription" className="mb-3">
              <Form.Label>Video Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* Video Category */}
            <Form.Group controlId="videoCategory" className="mb-3">
              <Form.Label>Video Category</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Technology">Technology</option>
                <option value="Gaming">Gaming</option>
              </Form.Select>
            </Form.Group>

            {/* Upload Button */}
            <Button variant="primary" type="button" className="w-100" onClick={handleUpload}>
              Upload Video
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUploadForm;
