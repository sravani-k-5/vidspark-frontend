// import React from "react";
// import "./Myprofile.css"

// const UserProfile = () => {
//   const user = {
//     name: "Sravani kondapalli Sravani",
//     handle: "@sravanikondapallisravani",
//     bio: "Break the ice by uploading a video",
//     profileImage: "https://via.placeholder.com/80", // Replace with actual
//   };

//   return (
//     <div className="profile-page">

//       <div className="user-info">
//         <img src={user.profileImage} alt="Profile" className="profile-img" />
//         <div>
//           <h2>{user.name}</h2>
//           <p className="user-handle">{user.handle}</p>
//           <button className="edit-btn">Edit profile</button>
//         </div>
//       </div>

//       <div className="tabs">
//         <span className="active">Videos</span>
//         <span>Playlists</span>
//         <span>Likes</span>
//         <span>Shared</span>
//       </div>

//       <div className="empty-section">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/1034/1034131.png"
//           alt="empty"
//           className="empty-icon"
//         />
//         <p><strong>*awkward silence*</strong></p>
//         <p className="hint-text">{user.bio}</p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Myprofile.css";
import { Link } from "react-router-dom"; 
const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);

  // Load saved profile from localStorage or use defaults
  const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    name: "Sravani kondapalli Sravani",
    handle: "@sravanikondapallisravani",
    bio: "Break the ice by uploading a video",
    country: "India",
    profileImage: "https://via.placeholder.com/80"
  };

  const [user, setUser] = useState(savedProfile);
  const [formData, setFormData] = useState({
    username: savedProfile.handle,
    profileName: savedProfile.name,
    bio: savedProfile.bio,
    country: savedProfile.country,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      const updatedUser = {
        ...user,
        name: formData.profileName,
        handle: formData.username,
        bio: formData.bio,
        country: formData.country,
        profileImage: preview || user.profileImage
      };
      
      // Save complete profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Optional: Add API call here to save to backend
      // await api.updateProfile(formData);
      
      setShowModal(false);
      // Optional: Add toast notification for success
      // toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      // Optional: Add error handling/toast
      // toast.error('Failed to update profile');
    }
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <img src={user.profileImage} alt="Profile" className="profile-img" />
        <div>
          <h2>{user.name}</h2>
          <p className="user-handle">{user.handle}</p>
          <button className="edit-btn" onClick={() => setShowModal(true)}>Edit profile</button>
        </div>
      </div>

      <div className="tabs">
        <Link to="/videos" style={{textDecoration: 'none'}}>
          <span className="active">Videos</span>
        </Link>
        <Link to="/playlists" style={{textDecoration: 'none'}}>
          <span>Playlists</span>
        </Link>
        <Link to="/liked-videos" style={{textDecoration: 'none'}}>
          <span>Likes</span>
        </Link>
        <Link to="/shared-videos" style={{textDecoration: 'none'}}>
          <span>Share</span>
        </Link>
      </div>

      <div className="empty-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1034/1034131.png"
          alt="empty"
          className="empty-icon"
        />
        <p><strong>*awkward silence*</strong></p>
        <p className="hint-text">{user.bio}</p>
      </div>

      {/* 🟣 Modal for editing profile */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Profile details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="text-center mb-3">
              <div className="profile-img-container">
                <img 
                  src={preview || user.profileImage} 
                  alt="Profile preview" 
                  className="profile-img-preview"
                />
              </div>
              <Form.Label className="d-block text-center mt-2">
                <Button variant="outline-primary" as="span">
                  Change Photo
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="d-none"
                  />
                </Button>
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                readOnly
              />
              <Form.Text className="text-muted">
                URL: https://dailymotion.com/{formData.username.replace("@", "")}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Profile name</Form.Label>
              <Form.Control
                type="text"
                name="profileName"
                maxLength={50}
                value={formData.profileName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                maxLength={350}
                placeholder="Tell us about you"
                value={formData.bio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
                <option>Germany</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;

