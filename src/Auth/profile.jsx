import React from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const user = {
    name: "Sravani kondapalli Sravani",
    handle: "@sravanikondapallisravani",
    bio: "Break the ice by uploading a video",
    profileImage: "https://via.placeholder.com/80", // Replace with actual
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="logo">DAILYMOTION</div>
        <input type="text" placeholder="Search" className="search-bar" />
        <div className="avatar-icon">👤</div>
      </header>

      <div className="user-info">
        <img src={user.profileImage} alt="Profile" className="profile-img" />
        <div>
          <h2>{user.name}</h2>
          <p className="user-handle">{user.handle}</p>
          <button className="edit-btn">Edit profile</button>
        </div>
      </div>

      <div className="tabs">
        <span className="active">Videos</span>
        <span>Playlists</span>
        <span>Following</span>
        <span>Bookmarks</span>
        <span>Likes</span>
        <span>Recently watched</span>
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
    </div>
  );
};

export default UserProfile;
