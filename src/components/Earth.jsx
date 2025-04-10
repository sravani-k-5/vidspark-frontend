import { useState } from "react";
import {FaUserCircle,FaUser,FaVideo,FaSignOutAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Earth.css";
import { Button, Dropdown, Modal } from "react-bootstrap";
import FileUploadForm from "../profile/FileUpload";

const MainPage = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleVideoUpload = () => {
    setUploadModalOpen(true); 
    setDropdownOpen(false);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false); 
  };

  const handleAuthAction = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken(null);
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    navigate("/Myprofile");
  };

  return (
    <>
      <div>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="left-section">
              <h1>vidspark</h1>
            </div>

            <div className="search-form">
              <input
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                type="search"
              />
            </div>

            <div className="right-section">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  <FaUserCircle />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item onClick={handleProfileClick}>
                  <FaUser className="icon" /> My Profile
                </Dropdown.Item>
                  <Dropdown.Item onClick={handleVideoUpload}>
                    <FaVideo className="icon" /> Upload Video
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleAuthAction}>
                    <FaSignOutAlt className="icon" />
                    {token ? "Log Out" : "Log In"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
        <Modal show={uploadModalOpen} onHide={closeUploadModal}>
          <FileUploadForm onClose={closeUploadModal}/>
            <div>
              <Button variant="secondary" onClick={closeUploadModal}>Close</Button>
            </div>
        </Modal>
      </div>
    </>
  );
};

export default MainPage;
