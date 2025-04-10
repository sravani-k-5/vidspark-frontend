import { useState, useEffect } from "react";
import { FaTimes, FaComment, FaThumbsUp, FaShare, FaLink, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./videocontent.css";

const VideoContent = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Fetch videos from the server
  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:3002/videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const toggleLikeVideo = async (videoId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("User not authenticated. Please log in.");

    try {
      const response = await fetch(`http://localhost:3002/api/likeVideo/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const updatedVideo = await response.json();
        setVideos(prevVideos => 
          prevVideos.map(video => 
            video._id === videoId ? updatedVideo : video
          )
        );
        if (activeVideo?._id === videoId) {
          setActiveVideo(updatedVideo);
        }
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const toggleSharePopup = () => {
    setShowSharePopup(!showSharePopup);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeVideo?.url || '');
    alert('Link copied to clipboard!');
  };

  const openTheaterMode = (video) => {
    setActiveVideo(video);
  };

  const closeTheaterMode = () => {
    setActiveVideo(null);
    setShowSharePopup(false);
  };

  return (
    <div className="video-section">
      {videos.map((video) => (
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
      ))}

      {activeVideo && (
        <div className="theater-overlay" onClick={closeTheaterMode}>
          <div className="theater-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeTheaterMode}>
              <FaTimes />
            </button>
            <video 
              controls 
              autoPlay 
              className="theater-video"
            >
              <source src={activeVideo.url} type="video/mp4" />
            </video>
            <div className="buttons">
              <button 
                className={`like-button ${activeVideo.liked ? 'liked' : ''}`} 
                onClick={() => toggleLikeVideo(activeVideo._id)}
              >
                <FaThumbsUp /> {activeVideo.liked ? "Liked" : "Like"}
              </button>
              <button className="share-button" onClick={toggleSharePopup}>
                <FaShare /> Share
              </button>
              <button className="comment-button" onClick={() => setShowComments(!showComments)}>
                <FaComment /> Comment
              </button>
            </div>

            {showSharePopup && (
              <div className="share-popup">
                <div className="share-popup-header">
                  <h3>Share</h3>
                  <button className="close-popup" onClick={toggleSharePopup}>
                    <FaTimes />
                  </button>
                </div>
                <div className="share-options">
                  <button className="share-option" onClick={copyToClipboard}>
                    <FaLink className="share-icon" />
                    <span>Copy link</span>
                  </button>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${activeVideo.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="share-option"
                  >
                    <FaFacebook className="share-icon facebook" />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${activeVideo.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="share-option"
                  >
                    <FaTwitter className="share-icon twitter" />
                    <span>Twitter</span>
                  </a>
                  <a 
                    href={`https://wa.me/?text=${activeVideo.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="share-option"
                  >
                    <FaWhatsapp className="share-icon whatsapp" />
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href={`mailto:?body=${activeVideo.url}`}
                    className="share-option"
                  >
                    <FaEnvelope className="share-icon email" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoContent;
