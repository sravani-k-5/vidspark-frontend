// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Make sure you have axios installed
// import './music.css'
// const Music = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("https://vidspark-backend.onrender.com/videos?vidcategory=music") // Update with your actual API URL
//       .then((response) => {
//         setVideos(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching videos:", error);
//         setError("Failed to load videos");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading videos...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Music Videos</h2>
//       <div className="video-list">
//         {videos.length === 0 ? (
//           <p>No videos available</p>
//         ) : (
//           videos.map((video) => (
//             <div key={video.id} className="video-card">
//               <video width="300" controls>
//                 <source src={video.videoUrl} type="video/mp4" />
//               </video>
//               <p>{video.title}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Music;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaThumbsUp, FaShare } from "react-icons/fa"; // Import icons
// import "./music.css"

// const Music = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  

//   useEffect(() => {
//     axios
//       .get("https://vidspark-backend.onrender.com/videos?vidcategory=music") // Fetch only music category videos
//       .then((response) => {
//         setVideos(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching videos:", error);
//         setError("Failed to load videos");
//         setLoading(false);
//       });
//   }, []);

//   const toggleLikeVideo = async (videoId) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("User not authenticated. Please log in.");
//       return;
//     }

//     try {
//       const response = await fetch(`https://vidspark-backend.onrender.com/api/likeVideo/${videoId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       console.log("Server Response:", data);

//       if (response.status === 401) {
//         alert("Unauthorized. Please log in again.");
//         return;
//       }
//       if (response.status === 404) {
//         alert("User not found. Try logging in again.");
//         return;
//       }

//       // Update like status in the state
//       setVideos((prevVideos) =>
//         prevVideos.map((video) =>
//           video._id === videoId ? { ...video, liked: !video.liked } : video
//         )
//       );
//     } catch (error) {
//       console.error("Error liking video:", error);
//     }
//   };

//   const toggleShareVideo = async (videoId) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("User not authenticated. Please log in.");
//       return;
//     }

//     try {
//       const response = await fetch(`https://vidspark-backend.onrender.com/api/shareVideo/${videoId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       console.log("Server Response:", data);

//       if (response.status === 401) {
//         alert("Unauthorized. Please log in again.");
//         return;
//       }
//       if (response.status === 404) {
//         alert("User not found. Try logging in again.");
//         return;
//       }

//       // Update share status in the state
//       setVideos((prevVideos) =>
//         prevVideos.map((video) =>
//           video._id === videoId ? { ...video, shared: !video.shared } : video
//         )
//       );
//     } catch (error) {
//       console.error("Error sharing video:", error);
//     }
//   };

//   if (loading) return <p>Loading videos...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Music Videos</h2>
//       <div className="video-list">
//         {videos.length === 0 ? (
//           <p>No videos available</p>
//         ) : (
//           videos.map((video) => (
//             <div key={video._id} className="video-card">
//               <video width="300" controls>
//                 <source src={video.videoUrl} type="video/mp4" />
//               </video>
//               <p>{video.title}</p>
              
//               {/* Like & Share Buttons */}
//               <div className="buttons">
//                 <button className="like-button" onClick={() => toggleLikeVideo(video._id)}>
//                   <FaThumbsUp /> {video.liked ? "Liked" : "Like"}
//                 </button>
//                 <button className="share-button" onClick={() => toggleShareVideo(video._id)}>
//                   <FaShare /> {video.shared ? "Shared" : "Share"}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Music;


import { useState, useEffect } from "react";
import { FaThumbsUp, FaShare, FaTimes } from "react-icons/fa";
import "./music.css";

const Music = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch videos from the server
  const fetchVideos = async () => {
    try {
      const response = await fetch("https://vidspark-backend.onrender.com/videos?vidcategory=music");
      const data = await response.json();
      console.log(data)
      console.log("Fetched Videos:", data); // Debugging
      if (Array.isArray(data) && data.length > 0) {
        setVideos(data);
      } else {
        setError("No videos found or incorrect response format");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Like a video
  const toggleLikeVideo = async (videoId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }
    try {
      await fetch(`https://vidspark-backend.onrender.com/api/likeVideo/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId ? { ...video, liked: !video.liked } : video
        )
      );
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  // Share a video
  const toggleShareVideo = async (videoId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }
    try {
      await fetch(`https://vidspark-backend.onrender.com/api/shareVideo/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId ? { ...video, shared: !video.shared } : video
        )
      );
    } catch (error) {
      console.error("Error sharing video:", error);
    }
  };

  // Open video in theater mode
  const openTheaterMode = (video) => {
    setActiveVideo(video);
  };

  // Close theater mode
  const closeTheaterMode = () => {
    setActiveVideo(null);
  };

  return (
    <div className="video-section">
      {loading && <p>Loading videos...</p>}
      {error && <p className="error">{error}</p>}
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video._id} className="video-item">
            <video
              muted
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
              onClick={() => openTheaterMode(video)}
            >
              <source src={video.url} type="video/mp4" />
            </video>
            <h3>{video.vidtitle}</h3>
          </div>
        ))
      ) : (
        !loading && <p>No videos available</p>
      )}

      {/* Theater Mode Popup */}
      {activeVideo && (
        <div className="theater-overlay" onClick={closeTheaterMode}>
          <div className="theater-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeTheaterMode}>
              <FaTimes />
            </button>
            <video controls autoPlay className="theater-video">
              <source src={activeVideo.videoUrl} type="video/mp4" />
            </video>
            <div className="buttons">
              <button className="like-button" onClick={() => toggleLikeVideo(activeVideo._id)}>
                <FaThumbsUp /> {activeVideo.liked ? "Liked" : "Like"}
              </button>
              <button className="share-button" onClick={() => toggleShareVideo(activeVideo._id)}>
                <FaShare /> {activeVideo.shared ? "Shared" : "Share"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
